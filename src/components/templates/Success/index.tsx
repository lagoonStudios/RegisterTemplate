import Button from "@/components/atoms/Button";
import Div from "@/components/atoms/Div";
import H1 from "@/components/atoms/H1";
import Main from "@/components/atoms/Main";
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
    <Main customClassNames="bg-desktop bg-cover bg-no-repeat bg-center h-screen flex flex-col justify-center items-center p-10 gap-8">
      <Div customClassNames="bg-white w-4/5 lg:w-2/5 h-2/5 lg:h-full lg:p-5 flex flex-col items-center gap-10 justify-center rounded-lg">
        <H1 customClassNames="text-center text-xl md:text-3xl">Datos Registrados Exitosamente</H1>
        <Div customClassNames="flex flex-col w-full px-5 gap-10 justify-center items-center">
          <Button
            onClick={() => setState(1)}
            onClickValue={true}
            customClassNames="bg-erin p-2 lg:p-3 mt-3 w-8/12 lg:w-96 rounded-xl text-black text-lg font-semibold shadow-submitButton"
            type='submit'
          >
            Volver al Formulario
          </Button>
        </Div>
      </Div>
    </Main>
  </>
}