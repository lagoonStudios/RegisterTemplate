import { Argument, Value, Mapping } from 'classnames';

export interface IDiv {
  children?: React.ReactNode;
  customClassNames?: Argument[] | Value | Mapping;
}
