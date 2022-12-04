import { Argument, Value, Mapping } from 'classnames';

export interface IImage {
  src?: string;
  customClassNames?: Argument[] | Value | Mapping;
  alt: string;
}
