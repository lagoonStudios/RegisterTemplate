import classNames from 'classnames';
import { IInput } from './Input.types';

/**
 * @param {string | undefined} src - string that uses to render image
 * @param {Value | Mapping | Argument[]} customClassNames - Object with custom props for the classnames
 * @param {string} alt - string display when image not load correctly or complete
 * @returns JSX/HTML Element
 */
export default function Input({
  name,
  customClassNames,
  type,
  onChange,
  max,
  min,
  placeholder,
  pattern
}: IInput): JSX.Element {
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
    <input
      name={name}
      type={type}
      max={max}
      min={min}
      className={classNames(customClassNames)}
      onChange={onChange}
      placeholder={placeholder}
      pattern={pattern}
    />
  );
}
