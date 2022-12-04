import classNames from 'classnames';
import { IIFrame } from './Iframe.types';

/**
 * @param {React.ReactDOM} children - Elements to render inside parent component
 * @param {Value | Mapping | Argument[]} customClassNames - Object with custom props for the classnames
 * @param {string | undefined} src - string that uses to render HTML Iframe Content
 * @param {string} id - string for id iframe prop
 * @param {string} title - string for title iframe prop
 * @returns JSX/HTML Element
 */
export default function Iframe({
  children,
  customClassNames,
  src,
  id,
  title,
  keyComponent,
}: IIFrame) {
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
    <iframe
      className={classNames(customClassNames)}
      src={src}
      id={id}
      title={title}
      key={keyComponent}>
      {children}
    </iframe>
  );
}
