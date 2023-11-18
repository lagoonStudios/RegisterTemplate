import { useEffect } from "react";
import Main from "@/components/atoms/Main";
import { eventId } from "@/constants/config";
import { IRegister } from "./Reports.types";
import { useAuthentication, useReports } from "@/hooks/auth";

export default function Reports({ setState, paymentTypes, ticketTypes }: IRegister) {
  // --- Hooks -----------------------------------------------------------------
  const { user } = useAuthentication();
  const data = useReports({ id: user?.uid ?? "", eventId });
  // --- END: Hooks ------------------------------------------------------------

  // --- Side effects ----------------------------------------------------------
  useEffect(() => console.log("Data", data), [data])
  // --- END: Side effects -----------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  // --- END: Data and handlers ------------------------------------------------
  return (
    <Main customClassNames="bg-white h-screen flex flex-col justify-center items-center p-10 gap-8">

    </Main>
  );
}
