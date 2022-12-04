import classNames from 'classnames';
import { IAnchor } from './Anchor.types';

/**
 * @param {React.ReactDOM} children - Elements to render inside parent component
 * @param {Value | Mapping | Argument[]} customClassNames - Object with custom props for the classnames
 * @returns JSX/HTML Element wraps React Node Element that comes from the parent
 */
export default function Anchor({ children, customClassNames, href }: IAnchor) {
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
  return (
    <a className={classNames(customClassNames)} target="_blank" href={href} rel="noreferrer">
      {children}
    </a>
  );
}
