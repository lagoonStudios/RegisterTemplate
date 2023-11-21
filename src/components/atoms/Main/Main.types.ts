import { Argument, Value, Mapping } from 'classnames';
import { ForwardedRef } from 'react';

export interface IMain {
  children: React.ReactNode;
  customClassNames?: Argument[] | Value | Mapping;
  reference?: ForwardedRef<HTMLDivElement>;
}
