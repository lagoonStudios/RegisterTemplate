import {
  collection,
  addDoc,
  /* query,
  where,
  onSnapshot, */
} from "firebase/firestore";
import Select from 'react-select';
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
import { customStyles, inputClass, options } from "./Register.constants";
import { IRegister } from "./Register.types";

export default function Register({ setState }: IRegister) {
  // --- Hooks -----------------------------------------------------------------
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Este Campo es requerido"),
    id: Yup.number().typeError('Ingresa un documento válido').min(0, 'Ingresa un documento válido').required("Este Campo es requerido"),
    email: Yup.string().email("Ingresa un correo válido").required("Este Campo es requerido"),
  });
  const formik = useFormik({
    initialValues: { name: "", email: "", id: "" },
    onSubmit: async (values) => {
      setLoading(true);
      await addDoc(collection(firestore, "Registers"), {
        name: values.name,
        email: values.email,
        id: values.id,
        donative: true,
        donative_type: donative_type?.value,
        attendance: false,
      }).then(() => {
        setState(2);
        setLoading(false);
        toastNotify.success('Datos registrado Exitosamente!');
        sendEmail(values.name, values.email, values.id);
      }).catch(() => {
        setLoading(false);
        toastNotify.error('Error Registrando Datos');
      });
      /* const q = query(collection(firestore, "Registers"), where("id", "==", values.id));
      const unsubscribe = onSnapshot(
        q,
        async (querySnapshot) => {
          if (querySnapshot.size === 0) {
            await addDoc(collection(firestore, "Registers"), {
              name: values.name,
              email: values.email,
              id: values.id,
              donative: true,
              donative_type: donative_type?.value,
              attendance: false,
            }).then(() => {
              setState(2);
              unsubscribe();
              setLoading(false);
              toastNotify.success('Datos registrado Exitosamente!');
              sendEmail(values.name, values.email, values.id);
            }).catch(() => {
              setLoading(false);
              toastNotify.error('Error Registrando Datos');
            });
          } else {
            unsubscribe();
            setLoading(false);
            toastNotify.error('Este usuario ya fue registrado');
          };
        },
        (err) => {
          console.log("error: ", err);
          toastNotify.error('Error Registrando Datos');
        }
      ); */
    },
    validationSchema,
  });
  // --- END: Hooks ------------------------------------------------------------

  // --- Local state -----------------------------------------------------------
  const [donative_type, setDonative] = useState(options[0]);
  const [loading, setLoading] = useState(false);
  const IsError = 
    Boolean(formik.errors.name) || 
    Boolean(formik.errors.email) || 
    Boolean(formik.errors.id);
  // --- END: Local state ------------------------------------------------------

  // --- Refs ------------------------------------------------------------------
  // --- END: Refs -------------------------------------------------------------

  // --- Redux -----------------------------------------------------------------
  // --- END: Redux ------------------------------------------------------------

  // --- Side effects ----------------------------------------------------------
  // --- END: Side effects -----------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const handler = (e: any) => setDonative(e);
  // --- END: Data and handlers ------------------------------------------------
  return (
    <>
      <Main customClassNames="bg-desktop h-screen flex flex-1 justify-center items-center">
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white w-4/5 lg:w-2/5 h-5/6 p-5 flex flex-col justify-center items-center gap-5 rounded-lg"
        >
          <H1 customClassNames="text-2xl font-bold mt-5">Formato de Registro</H1>
          <Div customClassNames="flex flex-col flex-1 w-full px-5 gap-5 justify-center">
            <Span>Nombre</Span>
            <Input
              id="name"
              name="name"
              type="text"
              value={formik.values.name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              customClassNames={inputClass(IsError)}
            />
            {formik.errors.name && <Span customClassNames="text-red-600">{formik.errors.name}</Span>}
            <Span>Correo Electronico</Span>
            <Input
              id="email"
              name="email"
              type="text"
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              customClassNames={inputClass(IsError)}
            />
            {formik.errors.name && <Span customClassNames="text-red-600">{formik.errors.email}</Span>}
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
                customClassNames={inputClass(IsError)}
              />
            </Div>
            {formik.errors.name && <Span customClassNames="text-red-600">{formik.errors.id}</Span>}
            <Span>Tipo de Donativo</Span>
            <Select
              options={options}
              styles={customStyles}
              onChange={(e) => handler(e)}
              defaultValue={options[0]}
            />
          </Div>
          <Button
            onClick={() => { }}
            onClickValue={true}
            customClassNames="bg-medium-turquoise p-4 w-full lg:w-96 rounded-full text-white text-lg"
            type="submit"
            isDisabled={loading}
          >
            {loading ? <Spinner /> : 'Registrar'}
          </Button>
        </form>
      </Main>
    </>
  );
}
