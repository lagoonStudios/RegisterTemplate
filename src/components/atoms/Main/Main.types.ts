import { Argument, Value, Mapping } from 'classnames';

export interface IMain {
  children: React.ReactNode;
  customClassNames?: Argument[] | Value | Mapping;
}
