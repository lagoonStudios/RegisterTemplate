import { useEffect, useMemo, useState } from "react";

import H1 from "@/components/atoms/H1";
import Div from "@/components/atoms/Div";
import Main from "@/components/atoms/Main";
import Span from "@/components/atoms/Span";
import Image from "@/components/atoms/Image";

import { tdhLogo } from "@/assets/index";
import { eventId } from "@/constants/config";
import { Ticket } from "@/models/app.models";

import { useAuthentication, useReports } from "@/hooks/auth";
import { IRegister } from "./Reports.types";

export default function Reports({ paymentTypes, ticketTypes, reference }: IRegister) {
  // --- Local state -----------------------------------------------------------
  const date = new Date();
  const [data, setData] = useState<Ticket[]>([]);
  // --- END: Local state ------------------------------------------------------

  // --- Hooks -----------------------------------------------------------------
  const { user } = useAuthentication();
  // --- END: Hooks ------------------------------------------------------------

  // --- Side effects ----------------------------------------------------------
  useEffect(() => {
    if (user?.uid) useReports({ id: user?.uid || "", eventId }).then((res) => setData(res));
  }, [user?.uid]);
  // --- END: Side effects -----------------------------------------------------

  const ticketMounts = useMemo(() => {
    const generalTicket = ticketTypes?.find((ticketType) => ticketType.label.toLowerCase() === "general");
    const VIPTicket = ticketTypes?.find((ticketType) => ticketType.label.toLowerCase() === "vip");
    
    const generalTickets = data?.filter((ticket: Ticket) => ticket?.ticketTypeId === generalTicket?.id);
    const VIPTickets = data?.filter((ticket: Ticket) => ticket?.ticketTypeId === VIPTicket?.id);

    const mountsGeneral: { [k in string]: number } = {};
    const mountsVIP: { [k in string]: number } = {};
    const mountsTotal: { [k in string]: number } = {};

    paymentTypes?.forEach((payment) => {
      generalTickets?.forEach((ticket: Ticket) => {
        if (ticket?.paymentTypeId === payment?.id) {
          const newMount = mountsGeneral[payment?.label] ? mountsGeneral[payment?.label] : 0;
          const newTotalMount = mountsTotal[payment?.label] ? mountsTotal[payment?.label] : 0;
          mountsGeneral[payment?.label] = newMount + 1;
          mountsTotal[payment?.label] = newTotalMount + 1;
        }
      });

      VIPTickets?.forEach((ticket: Ticket) => {
        if (ticket?.paymentTypeId === payment?.id) {
          const newMount = mountsVIP[payment?.label] ? mountsVIP[payment?.label] : 0;
          const newTotalMount = mountsTotal[payment?.label] ? mountsTotal[payment?.label] : 0;  
          mountsVIP[payment?.label] = newMount + 1;
          mountsTotal[payment?.label] = newTotalMount + 1;  
        }
      });
    });

    return {
      general: mountsGeneral,
      vip: mountsVIP,
      total: mountsTotal,
    };
  }, [data, paymentTypes, ticketTypes]);

  return (
    <Main customClassNames="bg-white h-screen flex flex-col justify-center items-center p-10 gap-8 hidden print:block pt-2 px-2" reference={reference}>
      <Div customClassNames="w-11/12 flex-1 items-center flex flex-col gap-14">
        <Div customClassNames="w-full items-center grid grid-cols-3 gap-2 text-xl font-bold">
          <Image src={tdhLogo} alt="tdh" />
          <Div customClassNames="flex flex-col gap-2 text-center">
            <H1>INGRESO DIARIO</H1>
            <h2>
              {date.getDate()}/{date.getMonth()}/{date.getFullYear()}
            </h2>
          </Div>
        </Div>
        <Div customClassNames="flex justify-between w-full p-3 border-b border-blue-800">
          <Span customClassNames="font-bold">Caja: {user?.email}</Span>
          <h2>
            {date.getDate()}/{date.getMonth()}/{date.getFullYear()}
          </h2>
        </Div>

        <Div customClassNames="grid grid-cols-5 justify-center text-center w-full flex-1">
          <Span customClassNames="col-start-2 font-bold">Transferencia $</Span>
          <Span customClassNames="font-bold">Transferencia Bs</Span>
          <Span customClassNames="font-bold">Efectivo $</Span>
          <Span customClassNames="font-bold">Efectivo Bs</Span>

          <Span customClassNames="border-b-2 border-blue-800 font-bold text-left p-5">General</Span>
          <Span customClassNames="text-center border-b-2 border-blue-800 font-bold text-left p-5">
            {ticketMounts?.general?.["Dólares en transferencia"] ?? 0}
          </Span>
          <Span customClassNames="text-center border-b-2 border-blue-800 font-bold text-left p-5">
            {ticketMounts?.general?.["Bolívares por transferencia"] ?? 0}
          </Span>
          <Span customClassNames="text-center border-b-2 border-blue-800 font-bold text-left p-5">
            {ticketMounts?.general?.["Dólares en efectivo"] ?? 0}
          </Span>
          <Span customClassNames="text-center border-b-2 border-blue-800 font-bold text-left p-5">
            {ticketMounts?.general?.["Bolívares en efectivo"] ?? 0}
          </Span>
          <Span customClassNames="border-b-2 border-blue-800 font-bold text-left p-5">VIP</Span>
          <Span customClassNames="text-center border-b-2 border-blue-800 font-bold text-left p-5">
            {ticketMounts?.vip?.["Dólares en transferencia"] ?? 0}
          </Span>
          <Span customClassNames="text-center border-b-2 border-blue-800 font-bold text-left p-5">
            {ticketMounts?.vip?.["Bolívares por transferencia"] ?? 0}
          </Span>
          <Span customClassNames="text-center border-b-2 border-blue-800 font-bold text-left p-5">
            {ticketMounts?.vip?.["Dólares en efectivo"] ?? 0}
          </Span>
          <Span customClassNames="text-center border-b-2 border-blue-800 font-bold text-left p-5">
            {ticketMounts?.vip?.["Bolívares en efectivo"] ?? 0}
          </Span>
          <Span customClassNames="border-b-2 border-blue-800 font-bold text-left p-5">Totales</Span>
          <Span customClassNames="text-center border-b-2 border-blue-800 font-bold text-left p-5">
            {ticketMounts?.total?.["Dólares en transferencia"] ?? 0}
          </Span>
          <Span customClassNames="text-center border-b-2 border-blue-800 font-bold text-left p-5">
            {ticketMounts?.total?.["Bolívares por transferencia"] ?? 0}
          </Span>
          <Span customClassNames="text-center border-b-2 border-blue-800 font-bold text-left p-5">
            {ticketMounts?.total?.["Dólares en efectivo"] ?? 0}
          </Span>
          <Span customClassNames="text-center border-b-2 border-blue-800 font-bold text-left p-5">
            {ticketMounts?.total?.["Bolívares en efectivo"] ?? 0}
          </Span>
        </Div>
        <Div customClassNames="grid grid-cols-4 items-center justify-center w-full text-center">
          <Div customClassNames="flex flex-col gap-5 font-bold">
            <Span>Transferencia $</Span>
            <Span>{ticketMounts?.total?.["Dólares en transferencia"] ?? 0}</Span>
          </Div>
          <Div customClassNames="flex flex-col gap-5 font-bold">
            <Span>Transferencia Bs</Span>
            <Span>{ticketMounts?.total?.["Bolívares por transferencia"] ?? 0}</Span>
          </Div>
          <Div customClassNames="flex flex-col gap-5 font-bold">
            <Span>Efectivo $</Span>
            <Span>{ticketMounts?.total?.["Dólares en efectivo"] ?? 0}</Span>
          </Div>
          <Div customClassNames="flex flex-col gap-5 font-bold">
            <Span>Efectivo Bs</Span>
            <Span>{ticketMounts?.total?.["Bolívares en efectivo"] ?? 0}</Span>
          </Div>
        </Div>
      </Div>
    </Main>
  );
}
