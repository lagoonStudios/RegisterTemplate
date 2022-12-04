import { Argument, Value, Mapping } from 'classnames';

export interface IAnchor {
  children: React.ReactNode;
  customClassNames?: Argument[] | Value | Mapping;
  href: string;
}
