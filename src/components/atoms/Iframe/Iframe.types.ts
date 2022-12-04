import { Argument, Mapping, Value } from 'classnames';

export interface IIFrame {
  src?: string;
  title?: string;
  id?: string;
  customClassNames?: Value | Mapping | Argument[];
  children?: React.ReactNode;
  keyComponent: string;
}
