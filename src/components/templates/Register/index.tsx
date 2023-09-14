import {
  setDoc,
  doc,
  getDoc
} from "firebase/firestore";
import toastNotify from 'react-hot-toast';
import { useFormik } from "formik";
import * as Yup from "yup";

import Button from "../../atoms/Button";
import Div from "../../atoms/Div";
import H1 from "../../atoms/H1";
import Input from "../../atoms/Input/Input";
import Main from "../../atoms/Main";
import Span from "../../atoms/Span";
import Spinner from "../../molecules/Spinner";

import { firestore } from "../../../config/firebase";
import { sendEmail } from "./Register.functions";
import { useState } from "react";
import { inputClass } from "./Register.constants";
import { IRegister } from "./Register.types";
import ConfirmModal from "../../organisms/ConfirmModal";

export default function Register({ setState }: IRegister) {
  // --- Hooks -----------------------------------------------------------------
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Este Campo es requerido"),
    id: Yup.number().typeError('Ingresa un documento válido').min(0, 'Ingresa un documento válido').required("Este Campo es requerido"),
    email: Yup.string().trim().email("Ingresa un correo válido").required("Este Campo es requerido"),
  });
  const formik = useFormik({
    initialValues: { name: "", email: "", id: "" },
    onSubmit: async () => setModal(true),
    validationSchema,
  });
  // --- END: Hooks ------------------------------------------------------------

  // --- Local state -----------------------------------------------------------
  const [isOpenModal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const IsNameError = Boolean(formik.errors.name);
  const IsEmailError = Boolean(formik.errors.email);
  const IsIdError = Boolean(formik.errors.id);
  // --- END: Local state ------------------------------------------------------

  // --- Refs ------------------------------------------------------------------
  // --- END: Refs -------------------------------------------------------------

  // --- Redux -----------------------------------------------------------------
  // --- END: Redux ------------------------------------------------------------

  // --- Side effects ----------------------------------------------------------
  // --- END: Side effects -----------------------------------------------------

  // --- Data and handlers -----------------------------------------------------

  const onSubmit = () => {
    setModal(false);
    setLoading(true);
    getDoc(doc(firestore, 'Registers', formik.values.id)).then(
      async (res) => {
        if (res.exists() === false) {
          await setDoc(doc(firestore, 'Registers', formik.values.id), {
            name: formik.values.name,
            email: formik.values.email.trim(),
            id: formik.values.id,
            donative: true,
            attendance: false,
          }).then(() => {
            setState(2);
            setLoading(false);
            toastNotify.success('Datos registrado Exitosamente!');
            sendEmail(formik.values.name, formik.values.email, formik.values.id);
          }).catch(() => {
            setLoading(false);
            toastNotify.error('Error Registrando Datos');
          });
        } else {
          toastNotify.error('El usuario ya está registrado');
          setLoading(false);
        }
      });
  };

  const onCancel = () => {
    setModal(false);
    setLoading(false);
  };
  // --- END: Data and handlers ------------------------------------------------
  return (
    <>
      {isOpenModal && <ConfirmModal onCancel={onCancel} onSubmit={onSubmit} data={{ email: formik.values.email, id: formik.values.id }} />}
      <Main customClassNames="bg-mint-cream h-screen flex flex-1 justify-center items-center">
        <Div customClassNames="flex flex-col lg:grid lg:grid-cols-5 h-5/6 w-4/5">
          <Div customClassNames="bg-register bg-cover bg-no-repeat lg:col-span-2 flex flex-1 xs:max-lg:rounded-t-lg lg:rounded-l-lg" />
          <form
            onSubmit={formik.handleSubmit}
            className="bg-white lg:col-span-3 p-5 flex flex-col justify-center items-center gap-8 xs:max-lg:rounded-b-lg lg:rounded-r-lg"
          >
            <H1 customClassNames="text-2xl font-bold mt-5">Formato de Registro</H1>
            <Div customClassNames="flex flex-col w-full px-5 gap-9 justify-center">
              <Div customClassNames="flex flex-col gap-1">
                <Span>Nombre Completo</Span>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formik.values.name}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  customClassNames={inputClass(IsNameError)}
                />
                {formik.touched.name && IsNameError && <Span customClassNames="text-red-600">{formik.errors.name}</Span>}
              </Div>
              <Div customClassNames="flex flex-col gap-1">
                <Span>Documento de Identidad</Span>
                <Div customClassNames="flex flex-row gap-2">
                  <Span>V-</Span>
                  <Input
                    id="id"
                    name="id"
                    type="text"
                    pattern="\d*"
                    value={formik.values.id}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    customClassNames={inputClass(IsIdError)}
                  />
                </Div>
                {formik.touched.id && IsIdError && <Span customClassNames="text-red-600">{formik.errors.id}</Span>}
              </Div>
              <Div customClassNames="flex flex-col gap-1">
                <Span>Correo Electronico</Span>
                <Input
                  id="email"
                  name="email"
                  type="text"
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  customClassNames={inputClass(IsEmailError)}
                />
                {formik.touched.email && IsEmailError && <Span customClassNames="text-red-600">{formik.errors.email}</Span>}
              </Div>
            </Div>
            <Button
              onClick={() => { }}
              onClickValue={true}
              customClassNames="bg-mint py-4 w-11/12 rounded-lg text-white text-lg"
              type="submit"
              isDisabled={loading}
            >
              {loading ? <Spinner /> : 'Completar Registro'}
            </Button>
          </form>
        </Div>
      </Main>
    </>
  );
}