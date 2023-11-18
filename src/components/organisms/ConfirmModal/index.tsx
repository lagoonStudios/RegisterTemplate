import Button from "@/components/atoms/Button";
import Div from "@/components/atoms/Div";
import Span from "@/components/atoms/Span";
import { IConfirmModal } from "./ConfirmModal.types";

export default function ConfirmModal({ data, onSubmit, onCancel }: IConfirmModal) {
  return <Div customClassNames="z-10 fixed w-full h-full bg-gray-500/70 flex justify-center items-center">
    <Div customClassNames="bg-white w-4/5 lg:w-2/5 p-4 lg:py-12 flex flex-col justify-center items-center rounded-lg">
      <Div customClassNames="flex w-full justify-end">
        <Button
          onClick={() => onCancel()}
          onClickValue={true}
          customClassNames="bg-transparent font-semibold border w-8 h-8 rounded-full border border-black"
          type="button"
        >
          X
        </Button>
      </Div>
      <Div customClassNames="flex flex-col gap-5 justify-center items-center text-center px-3 w-full">
        <Span customClassNames="font-bold text-xl md:text-2xl mb-2">Confirmación</Span>
        <Div customClassNames="grid grid-cols-2 gap-5 overflow-y-auto justify-center items-center">
          <Span customClassNames="font-base text-base md:text-md break-all flex flex-col">Nombre: <strong>{data?.name}</strong></Span>
          <Span customClassNames="font-base text-base md:text-md break-all flex flex-col">Documento de Identidad: <strong>V-{data?.id}</strong></Span>
          <Span customClassNames="font-base text-base md:text-md break-all flex flex-col">Correo Electronico: <strong>{data?.email}</strong></Span>
          <Span customClassNames="font-base text-base md:text-md break-all flex flex-col">Numero de Telefono: <strong>{data?.phoneNumber}</strong></Span>
          <Span customClassNames="font-base text-base md:text-md break-all flex flex-col">Tipo de Entrada: <strong>{data?.ticketType}</strong></Span>
          <Span customClassNames="font-base text-base md:text-md break-all flex flex-col">Tipo de Pago: <strong>{data?.paymentType}</strong></Span>
          <Span customClassNames="font-base text-base md:text-md break-all flex flex-col">Referencia: <strong>{data?.reference}</strong></Span>
        </Div>
        <Button
          onClick={() => onSubmit()}
          onClickValue={true}
          customClassNames="bg-yellow p-2 mt-3 w-5/12 lg:w-96 rounded-xl text-black text-lg font-bold shadow-submitButton"
          type="button"
        >
          Aceptar
        </Button>
      </Div>

    </Div>
  </Div>
}