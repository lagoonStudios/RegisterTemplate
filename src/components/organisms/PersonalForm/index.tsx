import { useMemo } from "react";
import Select, { SingleValue } from "react-select";

import { searchIcon, sideImageForm } from "@/assets";

import Button from "@/components/atoms/Button";
import Div from "@/components/atoms/Div";
import H1 from "@/components/atoms/H1";
import Span from "@/components/atoms/Span";
import Input from "@/components/atoms/Input/Input";
import Image from "@/components/atoms/Image";
import Spinner from "@/components/molecules/Spinner";
import { inputClass } from "@/components/templates/Login/Login.constants";

import { IPersonalForm } from "./PersonalForm.types";
import { submitButtonClasses } from "./PersonlaForm.constants";

export default function PersonalForm({ formik, loading, paymentTypes, ticketTypes, setState }: IPersonalForm) {
  // --- Local state -----------------------------------------------------------
  const IsValid = Boolean(Object.keys(formik.errors).length === 0);
  // --- END: Local state ------------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const paymentOptions = useMemo(() => paymentTypes?.map(({ label, id }) => ({ label, value: id })), [paymentTypes]);
  const ticketOptions = useMemo(() => ticketTypes?.map(({ label, id }) => ({ label, value: id })), [ticketTypes]);

  const errors = useMemo(() => {
    if (IsValid) return null;

    return {
      name: formik.errors.name,
      email: formik.errors.email,
      id: formik.errors.id,
      phoneNumber: formik.errors.phoneNumber,
      paymentType: formik.errors.paymentType,
      ticketType: formik.errors.ticketType,
      reference: formik.errors.reference,
    };
  }, [formik]);

  const inputs = useMemo(() => {
    return [
      {
        label: "Nombre Completo",
        value: formik.values.name,
        id: "name",
        name: "name",
        type: "text",
        customClassNames: inputClass(errors?.name),
        errors: errors?.name,
      },
      {
        label: "Documento de Identidad",
        value: formik.values.id,
        id: "id",
        name: "id",
        type: "text",
        customClassNames: inputClass(errors?.id),
        errors: errors?.id,
      },
      {
        label: "Correo Electronico",
        value: formik.values.email,
        id: "email",
        name: "email",
        type: "text",
        customClassNames: inputClass(errors?.email),
        errors: errors?.email,
      },
      {
        label: "Numero de Telefono",
        value: formik.values.phoneNumber,
        id: "phoneNumber",
        name: "phoneNumber",
        type: "text",
        customClassNames: inputClass(errors?.phoneNumber),
        errors: errors?.phoneNumber,
      },
      {
        label: "Referencia",
        value: formik.values.reference,
        id: "reference",
        name: "reference",
        type: "text",
        customClassNames: inputClass(errors?.reference),
        errors: errors?.reference,
      },
    ];
  }, [errors]);
  // --- END: Data and handlers ------------------------------------------------
  return (
    <>
      <Div customClassNames="block lg:hidden lg:col-span-2">
        <Image src={sideImageForm} alt="sideImage" customClassNames="w-full aspect-[0.5]" />
      </Div>
      <Div customClassNames="bg-white flex flex-col rounded-3xl border-4 border-black items-center lg:col-span-3 py-5">
        <Div customClassNames="flex justify-between items-center w-full p-5">
          <H1 customClassNames="text-2xl font-bold flex-1">Formato de Registro</H1>
          <Button
            customClassNames="bg-veronica text-white flex flex-row gap-2 h-min items-center p-2 rounded-lg text-lg shadow-submitButton"
            type="button"
            onClick={() => setState(3)}
            onClickValue={true}
          >
            <Span customClassNames="hidden lg:inline">Reporte</Span>
            <Image src={searchIcon} alt="search" />
          </Button>
        </Div>
        <Div customClassNames="flex flex-col w-full gap-8 justify-center p-8 pb-0">
          {inputs
            .slice(0, inputs.length - 1)
            .map(({ label, name, id, type, value, customClassNames, errors }, index) => (
              <Div customClassNames="flex flex-col" key={`input-${index + 1}`}>
                <Div customClassNames="w-full flex items-left">
                  <Span customClassNames="font-bold">{label}</Span>
                </Div>
                <Input
                  id={id}
                  name={name}
                  type={type}
                  value={value}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  customClassNames={customClassNames}
                />
                {errors && <Span customClassNames="text-red-600">{errors}</Span>}
              </Div>
            ))}
          <Div customClassNames="lg:p-3"></Div>
          <Div customClassNames="flex flex-col">
            <Div customClassNames="w-full flex items-left">
              <Span customClassNames="font-bold">Tipo de Entrada</Span>
            </Div>
            <Select
              isSearchable={false}
              name="ticketType"
              options={ticketOptions}
              onChange={(
                e: SingleValue<{
                  value: string;
                  label: string;
                }>
              ) => formik?.setFieldValue("ticketType", e?.value)}
            />
            {errors?.ticketType && <Span customClassNames="text-red-600">{errors?.ticketType}</Span>}
          </Div>
          <Div customClassNames="flex flex-col">
            <Div customClassNames="w-full flex items-left">
              <Span customClassNames="font-bold">Metodo de Pago</Span>
            </Div>
            <Select
              isSearchable={false}
              name="paymentType"
              options={paymentOptions}
              onChange={(
                e: SingleValue<{
                  value: string;
                  label: string;
                }>
              ) => formik?.setFieldValue("paymentType", e?.value)}
            />
            {errors?.paymentType && <Span customClassNames="text-red-600">{errors?.paymentType}</Span>}
          </Div>
          {inputs.slice(inputs.length - 1).map(({ label, name, id, type, value, customClassNames, errors }, index) => (
            <Div customClassNames="flex flex-col" key={`input-${index + 1}-last`}>
              <Div customClassNames="w-full flex items-left">
                <Span customClassNames="font-bold">{label}</Span>
              </Div>
              <Input
                id={id}
                name={name}
                type={type}
                value={value}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                customClassNames={customClassNames}
              />
              {errors && <Span customClassNames="text-red-600">{errors}</Span>}
            </Div>
          ))}
        </Div>
        <Button
          onClick={() => {}}
          onClickValue={true}
          customClassNames={submitButtonClasses()}
          type="submit"
        >
          {loading ? <Spinner /> : "Completar Pago"}
        </Button>
      </Div>
      <Div customClassNames="hidden lg:block lg:col-span-2">
        <Image src={sideImageForm} alt="sideImage" customClassNames="w-full aspect-[0.5]" />
      </Div>
    </>
  );
}
