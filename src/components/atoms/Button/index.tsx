import classNames from 'classnames';
import { IButton } from './Button.types';
/**
 * @param {React.ReactDOM} children - Elements to render inside parent component
 * @param {Value | Mapping | Argument[]} customClassNames - Object with custom props for the classnames
 * @param {Function} onClick - custom function to the onClick Prop Button
 * @param {string | number | boolean | object} onClickValue - value to pass to the onClick function
 * @returns JSX/HTML Element wraps React Node Element that comes from the parent
 */
export default function Button({
  children,
  customClassNames,
  onClick,
  onClickValue,
  isDisabled,
  type
}: IButton): JSX.Element {
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
    <button
      type={type ?? 'button'}
      className={classNames(customClassNames)}
      onClick={() => onClick(onClickValue)}
      disabled={isDisabled}>
      {children}
    </button>
  );
}
