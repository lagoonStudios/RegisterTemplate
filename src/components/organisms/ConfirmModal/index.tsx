import Button from "../../atoms/Button";
import Div from "../../atoms/Div";
import Span from "../../atoms/Span";
import { IConfirmModal } from "./ConfirmModal.types";

export default function ConfirmModal({ data, onSubmit }: IConfirmModal) {
  return <Div customClassNames="z-10 absolute w-full h-full bg-gray-500/70 flex justify-center items-center">
    <Div customClassNames="bg-white w-4/5 lg:w-2/5 h-3/6 px-4 flex flex-col justify-center items-center gap-3 rounded-lg">
      <Span customClassNames="font-bold text-xl md:text-2xl mb-3">Confirmación</Span>
      <Span customClassNames="font-base text-base md:text-xl">Documento de Identidad: <strong>{data?.id}</strong></Span>
      <Span customClassNames="font-base text-base md:text-xl">Correo Electronico: <strong>{data?.email}</strong></Span>

      <Span customClassNames="font-base text-base md:text-lg my-3">Esta seguro de que son correctos sus datos?</Span>
      <Button
        onClick={() => onSubmit()}
        onClickValue={true}
        customClassNames="bg-medium-turquoise p-4 w-full lg:w-96 rounded-full text-white text-lg"
        type="button"
      >
        Aceptar
      </Button>
    </Div>
  </Div>
}