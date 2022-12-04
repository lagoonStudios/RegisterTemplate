import { useFormik } from 'formik';
import * as Yup from 'yup';

import Button from "../../atoms/Button";
import Div from "../../atoms/Div";
import H1 from "../../atoms/H1";
import Input from "../../atoms/Input/Input";
import Main from "../../atoms/Main";
import { ILogin } from './Login.types';

export default function Login({ setState }: ILogin) {
  // --- Hooks -----------------------------------------------------------------
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Required'),
    password: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
  })
  const formik = useFormik({
    initialValues: { username: '', password: '' },
    onSubmit: (values) => {
      setState(1);
    },
    validationSchema,
  });
  // --- END: Hooks ------------------------------------------------------------

  // --- Local state -----------------------------------------------------------
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
    <Main customClassNames="bg-desktop h-screen flex flex-1 justify-center items-center">
      <form onSubmit={formik.handleSubmit} className="bg-white w-4/5 lg:w-2/5 h-3/5 lg:h-4/5 lg:p-5 flex flex-col items-center gap-10 justify-center">
        <H1 customClassNames="text-3xl">Inicio de Sesión</H1>
        <Div customClassNames="flex flex-col w-full px-5 gap-10 justify-center items-center">
          <Input
            id='username'
            name="username"
            type="text"
            value={formik.values.username}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            customClassNames="w-full rounded-xl bg-gray-200 p-2 lg:p-5 text-lg"
            placeholder="Usuario"
          />
          <Input
            id='password'
            name="password"
            type="password"
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            customClassNames="w-full rounded-xl bg-gray-200 p-2 lg:p-5 text-lg"
            placeholder="Contraseña"
          />
          <Button
            onClick={() => { }}
            onClickValue={true}
            customClassNames="bg-medium-turquoise p-4 w-full lg:w-96 rounded-lg text-white text-lg"
            type='submit'
          >
            Ingresar
          </Button>
        </Div>
      </form>
    </Main>
  </>
}