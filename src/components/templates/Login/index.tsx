import { useFormik } from 'formik';
import * as Yup from 'yup';

import Button from "../../atoms/Button";
import Div from "../../atoms/Div";
import H1 from "../../atoms/H1";
import Input from "../../atoms/Input/Input";
import Main from "../../atoms/Main";
import { ILogin } from './Login.types';
import { users } from '../../../constants/users';
import { useState } from 'react';
import Spinner from '../../molecules/Spinner';
import Span from '../../atoms/Span';
import { inputClass, inputContainerClass } from './Login.constants';

export default function Login({ setState }: ILogin) {
  // --- Hooks -----------------------------------------------------------------
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Este Campo es requerido'),
    password: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Este Campo es requerido'),
  })
  const formik = useFormik({
    initialValues: { username: '', password: '' },
    onSubmit: (values) => {
      setLoading(true);
      let compare = users.find((v) => { return v.UserName === values.username && v.Password === values.password });
      setTimeout(() => {
        if (compare !== undefined)
          setState(1)
        setLoading(false)
      }, 2500);
    },
    validationSchema,
  });
  // --- END: Hooks ------------------------------------------------------------

  // --- Local state -----------------------------------------------------------
  const [loading, setLoading] = useState(false);
  const IsPassawordError:boolean = Boolean(formik.errors.password);
  const IsUsernameError:boolean = Boolean(formik.errors.username);
  // --- END: Local state ------------------------------------------------------

  // --- Refs ------------------------------------------------------------------
  // --- END: Refs -------------------------------------------------------------

  // --- Redux -----------------------------------------------------------------
  // --- END: Redux ------------------------------------------------------------

  // --- Side effects ----------------------------------------------------------
  // --- END: Side effects -----------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  // --- END: Data and handlers ------------------------------------------------
  return <>
    <Main customClassNames="bg-mint-cream h-screen flex flex-1 justify-center items-center">
      <form onSubmit={formik.handleSubmit} className="bg-white w-4/5 lg:w-2/5 h-3/5 lg:h-4/5 lg:p-5 flex flex-col items-center gap-5 md:gap-10 justify-center rounded-lg overflow-y-scroll">
        <H1 customClassNames="text-3xl">Inicio de Sesión</H1>
        <Div customClassNames={inputContainerClass(IsUsernameError || IsPassawordError)}>
          <Input
            id='username'
            name="username"
            type="text"
            value={formik.values.username}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            customClassNames={inputClass(IsUsernameError)}
            placeholder="Usuario"
          />
          {IsUsernameError && <Span customClassNames="text-red-600">{formik?.errors?.username}</Span>}
          <Input
            id='password'
            name="password"
            type="password"
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            customClassNames={inputClass(IsPassawordError)}
            placeholder="Contraseña"
          />
          {IsPassawordError && <Span customClassNames="text-red-600">{formik?.errors?.password}</Span>}
          <Button
            onClick={() => { }}
            onClickValue={true}
            customClassNames="bg-mint p-4 mt-3 w-full lg:w-96 rounded-full text-white text-lg"
            type='submit'
            isDisabled={loading}
          >
            {loading ? <Spinner /> : 'Ingresar'}
          </Button>
        </Div>
      </form>
    </Main>
  </>
}