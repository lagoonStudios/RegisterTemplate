import { Argument, Mapping, Value } from 'classnames';

export interface IButton {
  onClick: (e: string | number | boolean | object) => void;
  onClickValue: string | number | boolean | object;
  customClassNames?: Value | Mapping | Argument[];
  children: React.ReactNode;
  isDisabled?: boolean;
  type?: "button" | "submit" | "reset";
}
