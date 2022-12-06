import Button from "../../atoms/Button";
import Div from "../../atoms/Div";
import H1 from "../../atoms/H1";
import Main from "../../atoms/Main";
import { ISuccess } from './Success.types';

export default function Login({ setState }: ISuccess) {
  // --- Hooks -----------------------------------------------------------------
  // --- END: Hooks ------------------------------------------------------------

  // --- Local state -----------------------------------------------------------
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
    <Main customClassNames="bg-desktop h-screen flex flex-1 justify-center items-center">
      <Div customClassNames="bg-white w-4/5 lg:w-2/5 h-3/5 lg:h-4/5 lg:p-5 flex flex-col items-center gap-10 justify-center rounded-lg">
        <H1 customClassNames="text-3xl">Datos Registrados Exitosamente</H1>
        <Div customClassNames="flex flex-col w-full px-5 gap-10 justify-center items-center">
          <Button
            onClick={() => setState(1)}
            onClickValue={true}
            customClassNames="bg-medium-turquoise p-4 w-full lg:w-96 rounded-full text-white text-lg"
            type='submit'
          >
            Volver al Formulario
          </Button>
        </Div>
      </Div>
    </Main>
  </>
}