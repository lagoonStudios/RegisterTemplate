import { Argument, Mapping, Value } from 'classnames';

export interface ISpan {
  customClassNames?: Value | Mapping | Argument[];
  children: React.ReactNode;
}
