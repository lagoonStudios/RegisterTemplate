import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

import Div from "@/components/atoms/Div";
import Span from "@/components/atoms/Span";
import Main from "@/components/atoms/Main";
import Button from "@/components/atoms/Button";
import Image from "@/components/atoms/Image";
import AdminForm from "@/components/organisms/AdminForm";

import { tdhLogo } from "@/assets";
import { IRegister } from "./AdminPanel.types";
import { logOut, useAuthentication } from "@/hooks/auth";
import Reports from "../../organisms/Reports";
import { getUserName } from "../Register/Register.functions";

export default function AdminPanel({ setState, paymentTypes, ticketTypes, users }: IRegister) {
  
  // --- Local state -----------------------------------------------------------
  const [loading, setLoading] = useState<boolean>(false);
  const [isCompleted, setComplete] = useState<boolean>(false);
  const [userSelected, setUserSelected] = useState({ label: "Todas las cajas", value: "all" });
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  // --- END: Local state ------------------------------------------------------
  
  // --- Data and handlers -----------------------------------------------------
  const onLogout = () => {
    setState(0);
    logOut();
  };
  
  /* const onPrintPage = () => handlePrint(); */
  const onPrintPage = () => setLoading(true);
  // --- END: Data and handlers ------------------------------------------------

  // --- Hooks -----------------------------------------------------------------
  const { user } = useAuthentication();

  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    copyStyles: true,
    documentTitle: `Reporte_${new Date().toISOString().slice(0, 10)}_${getUserName(userSelected?.value ?? '',users)}`,
  });
  // --- END: Hooks ------------------------------------------------------------
  return (
    <>
      <Reports
        userId={userSelected.value}
        paymentTypes={paymentTypes}
        ticketTypes={ticketTypes}
        users={users}
        reference={componentRef}
        endDate={endDate}
        startDate={startDate}
        loading={loading}
        setLoading={setLoading}
        isCompleted={isCompleted}
        setComplete={setComplete}
        onPrintPage={() => handlePrint()}
      />
      <Main customClassNames="bg-desktop bg-cover bg-no-repeat bg-center h-screen flex flex-col justify-center items-center p-10 gap-8">
        <Div customClassNames="w-full flex flex-row justify-between items-center font-bold">
          <Image src={tdhLogo} alt="logo" customClassNames="w-32" />
          <Div customClassNames="flex flex-row justify-between items-center gap-3">
            <Span customClassNames="hidden lg:inline">{user?.email}</Span>
            <Span customClassNames="hidden lg:inline">Panel de Administrador</Span>
            <Button onClick={() => onLogout()} onClickValue="">
              Cerrar Sesion
            </Button>
          </Div>
        </Div>

        <Div customClassNames="bg-transparent flex flex-col w-full gap-5">
          <AdminForm
            onPrintPage={onPrintPage}
            users={users}
            setState={setState}
            setUserSelected={setUserSelected}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            loading={loading}
          />
        </Div>
      </Main>
    </>
  );
}
