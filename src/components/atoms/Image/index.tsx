import classNames from 'classnames';
import { IImage } from './Image.types';

/**
 * @param {string | undefined} src - string that uses to render image
 * @param {Value | Mapping | Argument[]} customClassNames - Object with custom props for the classnames
 * @param {string} alt - string display when image not load correctly or complete
 * @returns JSX/HTML Element
 */
export default function Image({ src, customClassNames, alt }: IImage): JSX.Element {
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
  return <img src={src} className={classNames(customClassNames)} alt={alt} />;
}
