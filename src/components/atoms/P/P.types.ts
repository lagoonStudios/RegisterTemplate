import { Argument, Value, Mapping } from 'classnames';

export interface IPElement {
  children: React.ReactNode;
  customClassNames?: Argument[] | Value | Mapping;
}
