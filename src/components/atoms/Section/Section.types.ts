import { Argument, Value, Mapping } from 'classnames';

export interface ISection {
  children: React.ReactNode;
  customClassNames?: Argument[] | Value | Mapping;
}
