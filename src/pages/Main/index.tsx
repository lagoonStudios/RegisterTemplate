import { useState } from 'react';
import Login from '../../components/templates/Login';
import Register from '../../components/templates/Register';
import { EState } from './Main.types';

export default function Main() {
  // --- Hooks -----------------------------------------------------------------
  // --- END: Hooks ------------------------------------------------------------

  // --- Local state -----------------------------------------------------------
  const [state, setState] = useState(EState.Login)
  // --- END: Local state ------------------------------------------------------

  // --- Refs ------------------------------------------------------------------
  // --- END: Refs -------------------------------------------------------------

  // --- Redux -----------------------------------------------------------------
  // --- END: Redux ------------------------------------------------------------

  // --- Side effects ----------------------------------------------------------
  // --- END: Side effects -----------------------------------------------------

  // --- Data and handlers -----------------------------------------------------  
  // --- END: Data and handlers ------------------------------------------------
  return <>
    {state === EState.Login ? <Login setState={setState}/> : <Register />}
  </>
}