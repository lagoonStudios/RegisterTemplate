import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { useFormik } from "formik";
import * as Yup from "yup";

import Button from "../../atoms/Button";
import Div from "../../atoms/Div";
import H1 from "../../atoms/H1";
import Input from "../../atoms/Input/Input";
import Main from "../../atoms/Main";
import Span from "../../atoms/Span";

import { firestore } from "../../../config/firebase";
import { sendEmail } from "./Register.functions";

export default function Register() {
  // --- Hooks -----------------------------------------------------------------
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    id: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });
  const formik = useFormik({
    initialValues: { name: "", email: "", id: "" },
    onSubmit: async (values) => {
      const q = query( collection(firestore, "Registers"), where("id", "==", values.id) );
      const unsubscribe = onSnapshot(
        q,
        async (querySnapshot) => {
          if (querySnapshot.size == 0) {
            await addDoc(collection(firestore, "Registers"), {
              name: values.name,
              email: values.email,
              id: values.id,
              donative: true,
              attendance: false,
            }).then((e) => {
              unsubscribe();
              sendEmail(values.name, values.email, values.id);
            });
          } else return;
        },
        (err) => {
          console.log("error: ", err);
        }
      );
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
  return (
    <>
      <Main customClassNames="bg-desktop h-screen flex flex-1 justify-center items-center">
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white w-4/5 lg:w-2/5 h-4/5 p-5 flex flex-col justify-center items-center gap-5"
        >
          <H1 customClassNames="text-2xl">Formato de Registro</H1>
          <Div customClassNames="flex flex-col flex-1 w-full px-5 gap-5 justify-center">
            <Span>Nombre</Span>
            <Input
              id="name"
              name="name"
              type="text"
              value={formik.values.name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              customClassNames="w-full border-b-2 border-black"
            />
            <Span>Correo Electronico</Span>
            <Input
              id="email"
              name="email"
              type="text"
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              customClassNames="w-full border-b-2 border-black"
            />
            <Span>Documento de Identidad</Span>
            <Input
              id="id"
              name="id"
              type="text"
              value={formik.values.id}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              customClassNames="w-full border-b-2 border-black"
            />
            <Span>Tipo de Donativo</Span>
          </Div>
          <Button
            onClick={() => {}}
            onClickValue={true}
            customClassNames="bg-medium-turquoise p-4 w-full lg:w-96 rounded-lg text-white text-lg"
            type="submit"
          >
            Registrar
          </Button>
        </form>
      </Main>
    </>
  );
}
