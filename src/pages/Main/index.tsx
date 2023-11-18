import { useState } from "react";
import { EState } from "./Main.types";
import { useAuthentication, usePaymentTypes, useTicketTypes } from "@/hooks/auth";
import WrapperComponent from "@/components/templates/WrapperComponent";

export default function Main() {
  // --- Hooks -----------------------------------------------------------------
  const { user } = useAuthentication();
  const paymentData = usePaymentTypes();
  const ticketData = useTicketTypes();
  // --- END: Hooks ------------------------------------------------------------

  // --- Local state -----------------------------------------------------------
  const [state, setState] = useState(EState.Login);
  // --- END: Local state ------------------------------------------------------

  return (
    <WrapperComponent
      paymentTypes={paymentData}
      ticketTypes={ticketData}
      setState={setState}
      state={state}
      user={user}
    />
  );
}
