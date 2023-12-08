import { useState } from "react";
import { EState } from "./Main.types";
import { useAuthentication, usePaymentTypes, useTicketTypes, useUsers } from "@/hooks/auth";
import WrapperComponent from "@/components/templates/WrapperComponent";

export default function Main() {
  // --- Hooks -----------------------------------------------------------------
  const { user } = useAuthentication();
  const paymentData = usePaymentTypes();
  const ticketData = useTicketTypes();
  const users = useUsers()
  // --- END: Hooks ------------------------------------------------------------

  // --- Local state -----------------------------------------------------------
  const [state, setState] = useState(EState.Login);
  // --- END: Local state ------------------------------------------------------

  return (
    <WrapperComponent
      paymentTypes={paymentData}
      ticketTypes={ticketData?.filter((ticket) => ticket?.disabled === false)}
      users={users}
      setState={setState}
      state={state}
      user={user}
    />
  );
}
