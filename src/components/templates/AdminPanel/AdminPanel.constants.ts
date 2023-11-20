import * as Yup from "yup";

export const inputClass = (IsError: boolean) => ({
  "w-full border-b border-black p-1 outline-none focus:border-mint": true,
  "border-red-600": IsError,
});

export const formatValues = {
  name: Yup.string().required("Este Campo es requerido").max(64, "Maximo 64 caracteres"),
  id: Yup.number()
    .typeError("Ingresa un documento válido")
    .min(0, "Ingresa un documento válido")
    .required("Este Campo es requerido")
    .test("len", "Maximo 12 caracteres", (val) => String(val)?.length < 12),
  email: Yup.string()
    .trim()
    .email("Ingresa un correo válido")
    .required("Este Campo es requerido")
    .max(64, "Maximo 64 caracteres"),
  phoneNumber: Yup.number()
    .typeError("Ingresa un numero válido")
    .required("Este Campo es requerido")
    .test("len", "Maximo 14 caracteres", (val) => String(val)?.length < 14),
  paymentType: Yup.string().required("Este Campo es requerido"),
  ticketType: Yup.string().required("Este Campo es requerido"),
  reference: Yup.string().required("Este Campo es requerido"),
};

export const initialValues = {
  name: "",
  email: "",
  id: "",
  phoneNumber: "",
  paymentType: "",
  ticketType: "",
  reference: "",
};
