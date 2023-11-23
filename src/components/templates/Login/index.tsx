import * as Yup from "yup";
import { useState } from "react";
import toastNotify from "react-hot-toast";
import { useFormik } from "formik";

import { logIn } from "@/hooks/auth";

import { ILogin } from "./Login.types";
import { inputClass, inputContainerClass } from "./Login.constants";

import H1 from "@/components/atoms/H1";
import Div from "@/components/atoms/Div";
import Span from "@/components/atoms/Span";
import Main from "@/components/atoms/Main";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input/Input";
import Spinner from "@/components/molecules/Spinner";
import Image from "@/components/atoms/Image";

import { sideImage, loginTopButtons, tdhLogo } from "@/assets";

const validTempUsers = [
  "paolaromano2021@gmail.com",
  "pablo.ruiz3098@gmail.com",
  "joseleoc123@gmail.com",
  "rafaeljoserivascalderon@gmail.com",
];

export default function Login({ setState }: ILogin) {
  // --- Hooks -----------------------------------------------------------------
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Este Campo es requerido").email("Este campo debe ser un correo valido"),
    password: Yup.string().min(2, "Contraseña Muy Corta!").max(50, "Too Long!").required("Este Campo es requerido"),
  });
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: (values) => {
      setLoading(true);
      if (validTempUsers.includes(values.email))
        logIn(values.email, values.password)
          .then(
            () => setState(1),
            (err) =>
              //TODO Handle login error
              console.log("err login: ", err)
          )
          .finally(() => setLoading(false));
      else {
        toastNotify.error("Usuario Inhabilitado");
        setLoading(false);
      }
    },
    validationSchema,
  });
  // --- END: Hooks ------------------------------------------------------------

  // --- Local state -----------------------------------------------------------
  const [loading, setLoading] = useState(false);
  const IsPassawordError: boolean = Boolean(formik.errors.password);
  const IsemailError: boolean = Boolean(formik.errors.email);
  // --- END: Local state ------------------------------------------------------

  return (
    <Main customClassNames="bg-desktop bg-cover bg-no-repeat bg-center h-full flex flex-col justify-center items-center p-10 gap-8">
      <Div customClassNames="w-full flex flex-row justify-between items-center font-bold">
        <Image src={tdhLogo} alt="logo" customClassNames="w-32" />
        <Span>Contacto</Span>
      </Div>
      <form
        onSubmit={formik.handleSubmit}
        className="bg-transparent flex flex-col lg:grid lg:grid-cols-5 h-2/4 w-full lg:w-10/12 gap-20"
      >
        <Div customClassNames="lg:col-span-2">
          <Image src={sideImage} alt="sideImage" customClassNames="w-full aspect-[0.6]" />
        </Div>
        <Div customClassNames="bg-white border border-2 rounded-3xl border-black lg:col-span-3 gap-5 w-full">
          <Div customClassNames="w-full border-b-2 border-black h-10 p-3">
            <Image src={loginTopButtons} alt="login" />
          </Div>
          <Div customClassNames="flex flex-col justify-center items-center h-full p-5">
            <H1 customClassNames="text-3xl mb-20 font-bold">Bienvenido</H1>
            <Div customClassNames={inputContainerClass(IsemailError || IsPassawordError)}>
              <Div customClassNames="w-full flex items-left">
                <Span customClassNames="font-bold">Correo electronico</Span>
              </Div>
              <Input
                id="email"
                name="email"
                type="email"
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                customClassNames={inputClass(IsemailError)}
              />
              {IsemailError && <Span customClassNames="text-red-600">{formik?.errors?.email}</Span>}
              <Div customClassNames="w-full flex items-left">
                <Span customClassNames="font-bold">Contraseña</Span>
              </Div>
              <Input
                id="password"
                name="password"
                type="password"
                value={formik.values.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                customClassNames={inputClass(IsPassawordError)}
              />
              {IsPassawordError && <Span customClassNames="text-red-600">{formik?.errors?.password}</Span>}
              <Button
                onClick={() => {}}
                onClickValue={true}
                customClassNames="bg-yellow p-3 mt-10 w-full lg:w-96 rounded-xl text-black text-lg font-bold shadow-submitButton"
                type="submit"
                isDisabled={loading}
              >
                {loading ? <Spinner /> : "Iniciar Sesión"}
              </Button>
            </Div>
          </Div>
        </Div>
      </form>
    </Main>
  );
}
