import { ChangeEventHandler, FocusEventHandler } from 'react';
import { Argument, Value, Mapping } from 'classnames';

export type IInput = {
  id: string;
  name: string;
  type: string;
  value?: string;
  min?: number;
  max?: number;
  placeholder?: string;
  customClassNames?: Argument[] | Value | Mapping;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange: ChangeEventHandler<HTMLInputElement>;
  pattern?: string
};
