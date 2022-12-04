import { useFormik } from "formik";
import * as Yup from 'yup';

import Button from "../../components/atoms/Button";
import Div from "../../components/atoms/Div";
import H1 from "../../components/atoms/H1";
import Input from "../../components/atoms/Input/Input";
import Main from "../../components/atoms/Main";
import Span from "../../components/atoms/Span";

export default function Register(){
  // --- Hooks -----------------------------------------------------------------
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    id: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
  })
  const formik = useFormik({
    initialValues: { name: '', email: '', id: '' },
    onSubmit: (values) => {
      console.log(values);
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
      <form onSubmit={formik.handleSubmit} className="bg-white w-4/5 lg:w-2/5 h-4/5 p-5 flex flex-col justify-center items-center gap-5">
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
          type='submit'
        >
          Registrar
        </Button>
      </form >      
    </Main>
  </>
}