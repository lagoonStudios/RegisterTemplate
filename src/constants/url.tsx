export type TUrl = {
  [key: string]: string;
};

export type TUrlResponse = {
  id: number;
  slug: string;
  src: string;
};

export const BASE_URL = process.env.REACT_APP_BASE_URL ?? '';

export const TEMP_URL_ASSETS = 'assets/';
