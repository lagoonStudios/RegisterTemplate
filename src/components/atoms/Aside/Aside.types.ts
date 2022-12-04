import { Argument, Value, Mapping } from 'classnames';

export interface IAside {
  children: React.ReactNode;
  customClassNames?: Argument[] | Value | Mapping;
}
