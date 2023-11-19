import { useEffect, useMemo } from "react";

import Login from "@/components/templates/Login";
import Register from "@/components/templates/Register";
import Success from "@/components/templates/Success";
import Reports from "@/components/templates/Reports";
import { EState } from "@/pages/Main/Main.types";
import { IWrapperComponent } from "./WrapperComponent.types";

export default function WrapperComponent({ user, state, setState, paymentTypes, ticketTypes }: IWrapperComponent) {
  // --- Local state -----------------------------------------------------------
  const COMPONENTS = {
    0: <Login setState={setState} />,
    1: <Register setState={setState} paymentTypes={paymentTypes} ticketTypes={ticketTypes} />,
    2: <Success setState={setState} />,
  };
  // --- END: Local state ------------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const component = useMemo(() => {
    if (user && state === EState.Login) return COMPONENTS[EState.Register];
    else if (user === undefined) return COMPONENTS[EState.Login];

    return COMPONENTS[state];
  }, [user, state, paymentTypes, ticketTypes]);
  // --- END: Data and handlers ------------------------------------------------
  
  return <>{component}</>;
}
