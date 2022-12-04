import { Argument, Value, Mapping } from 'classnames';

export interface IFooter {
  children: React.ReactNode;
  customClassNames?: Argument[] | Value | Mapping;
}
