import { Argument, Value, Mapping } from 'classnames';

export interface IHeader {
  children: React.ReactNode;
  customClassNames?: Argument[] | Value | Mapping;
}
