import { useMemo } from "react";
import Select, { SingleValue } from "react-select";

import Button from "@/components/atoms/Button";
import Div from "@/components/atoms/Div";
import H1 from "@/components/atoms/H1";

import { IAdminForm } from "./AdminForm.types";
import { submitButtonClasses, backButtonClasses } from "./AdminForm.constants";
import Span from "@/components/atoms/Span";
import Input from "@/components/atoms/Input/Input";
import Spinner from "@/components/molecules/Spinner";

export default function AdminForm({
  users,
  onPrintPage,
  setState,
  setUserSelected,
  setStartDate,
  setEndDate,
  loading
}: IAdminForm) {
  // --- Local state -----------------------------------------------------------
  // --- END: Local state ------------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const handleReportsData = () => onPrintPage();

  const usersOptions = useMemo(() => {
    return [{ label: "Todas las cajas", value: "all" }, ...users?.map((user) => ({ label: user.name, value: user?.id }))];
  }, [users]);
  // --- END: Data and handlers ------------------------------------------------
  return (
    <Div customClassNames="bg-white flex flex-col rounded-3xl border-4 border-black items-center p-5 py-16 h-max">
      <Div customClassNames="flex flex-col justify-between items-start w-full p-5">
        <H1 customClassNames="text-2xl font-bold">Panel de Administrador</H1>
        <H1 customClassNames="text-xl font-semi bold">Reportes de Generales / usuario</H1>
      </Div>
      <Div customClassNames="flex flex-col w-full gap-2 justify-center p-8">
        <Div customClassNames="flex flex-col lg:grid lg:grid-cols-2 gap-8">
          <Div customClassNames="flex flex-col gap-2">
            <Span customClassNames="font-bold text-lg">Usuario</Span>
            <Select
              isSearchable={false}
              name="user"
              options={usersOptions}
              onChange={(
                e: SingleValue<{
                  value: string;
                  label: string;
                }>
              ) => {
                if (e) setUserSelected({ label: e.label, value: e.value });
              }}
              isDisabled={loading}
            />
          </Div>
          <Div customClassNames="col-start-1 flex flex-col gap-2">
            <Span customClassNames="font-bold text-lg">Fecha de inicio</Span>
            <Input
              type="date"
              id="startDate"
              name="startDate"
              onChange={(e) => {
                if (e.target.valueAsDate) setStartDate(e.target.valueAsDate);
              }}
              customClassNames="border p-1"
              disabled={loading}
            />
          </Div>
          <Div customClassNames="flex flex-col gap-2">
            <Span customClassNames="font-bold text-lg">Fecha de finalización</Span>
            <Input
              type="date"
              id="endDate"
              name="endDate"
              onChange={(e) => {
                if (e.target.valueAsDate) setEndDate(e.target.valueAsDate);
              }}
              customClassNames="border p-1"
              disabled={loading}
            />
          </Div>
        </Div>
      </Div>
      <Div customClassNames="flex flex-col lg:flex-row gap-4 lg:gap-12 mt-14">
        <Button onClick={() => setState(1)} onClickValue={true} customClassNames={backButtonClasses()} type="button">
          Volver
        </Button>
        <Button onClick={handleReportsData} onClickValue={true} customClassNames={submitButtonClasses()} type="button" isDisabled={loading}>
          {loading ? <Spinner/> :"Completar"}
        </Button>
      </Div>
    </Div>
  );
}
