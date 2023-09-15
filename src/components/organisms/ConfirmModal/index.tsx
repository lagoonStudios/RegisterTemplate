import Button from "../../atoms/Button";
import Div from "../../atoms/Div";
import Span from "../../atoms/Span";
import { IConfirmModal } from "./ConfirmModal.types";

export default function ConfirmModal({ data, onSubmit, onCancel }: IConfirmModal) {
  return <Div customClassNames="z-10 absolute w-full h-full bg-gray-500/70 flex justify-center items-center">
    <Div customClassNames="bg-white w-4/5 lg:w-2/5 h-1/2 lg:h-3/6 p-4 lg:py-2 flex flex-col justify-center items-center rounded-lg">
      <Div customClassNames="flex w-full flex-1 justify-end relative">
        <Button
          onClick={() => onCancel()}
          onClickValue={true}
          customClassNames="bg-transparent font-semibold border w-8 h-8 rounded-full border border-black"
          type="button"
        >
          X
        </Button>
      </Div>
      <Div customClassNames="flex flex-col h-72 md:h-96 gap-5 justify-center items-center text-center px-10">
        <Span customClassNames="font-bold text-xl md:text-2xl mb-3">Confirmación</Span>
        <Span customClassNames="font-base text-base md:text-xl">Documento de Identidad: <strong>V-{data?.id}</strong></Span>
        <Span customClassNames="font-base text-base md:text-xl">Correo Electronico: <strong>{data?.email}</strong></Span>
        <Button
          onClick={() => onSubmit()}
          onClickValue={true}
          customClassNames="bg-mint p-4 w-full lg:w-52 rounded-lg text-white text-lg"
          type="button"
        >
          Aceptar
        </Button>
      </Div>

    </Div>
  </Div>
}