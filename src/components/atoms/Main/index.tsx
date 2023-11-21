import classNames from 'classnames';
import { IMain } from './Main.types';

/**
 * @param {React.ReactDOM} children - Elements to render inside parent component
 * @param {Value | Mapping | Argument[]} customClassNames - Object with custom props for the classnames
 * @returns JSX/HTML Element wraps React Node Element that comes from the parent t
 */

export default function Main({ children, customClassNames, reference = undefined }: IMain) {
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
  return <main className={classNames(customClassNames)} ref={reference}>{children}</main>;
}
