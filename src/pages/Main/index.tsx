import { useMemo, useState } from "react";
import Login from "../../components/templates/Login";
import Register from "../../components/templates/Register";
import Success from "../../components/templates/Success";
import { EState } from "./Main.types";
import { useAuthentication } from "@/hooks/auth";

export default function Main() {
  // --- Hooks -----------------------------------------------------------------
  const { user } = useAuthentication();
  // --- END: Hooks ------------------------------------------------------------

  // --- Local state -----------------------------------------------------------
  const [state, setState] = useState(EState.Login);

  const COMPONENTS = {
    0: <Login setState={setState} />,
    1: <Register setState={setState} />,
    2: <Success setState={setState} />,
  };
  // --- END: Local state ------------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const component = useMemo(() => {
    if (user && state !== EState.Success) return COMPONENTS[EState.Register]

    else if(user === undefined) return COMPONENTS[EState.Login]

    return COMPONENTS[state]
  }, [user, state])
  // --- END: Data and handlers ------------------------------------------------

  return <>{component}</>;
}
