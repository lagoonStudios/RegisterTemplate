import { useState } from "react";
import Login from "../../components/templates/Login";
import Register from "../../components/templates/Register";
import Success from "../../components/templates/Success";
import { EState } from "./Main.types";
import { useAuthentication } from "@/hooks/auth";

export default function Main() {
  // --- Hooks -----------------------------------------------------------------
  const user = useAuthentication();
  // --- END: Hooks ------------------------------------------------------------

  // --- Local state -----------------------------------------------------------
  const [state, setState] = useState(EState.Login);

  const COMPONENTS = {
    0: <Login setState={setState} />,
    1: user ? <Register setState={setState} /> : <Login setState={setState} />,
    2: <Success setState={setState} />,
  };
  // --- END: Local state ------------------------------------------------------

  // --- Refs ------------------------------------------------------------------
  // --- END: Refs -------------------------------------------------------------

  // --- Redux -----------------------------------------------------------------
  // --- END: Redux ------------------------------------------------------------

  // --- Side effects ----------------------------------------------------------
  // --- END: Side effects -----------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  // --- END: Data and handlers ------------------------------------------------
  return <>{COMPONENTS[state]}</>;
}
