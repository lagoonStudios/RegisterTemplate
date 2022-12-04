import axios, { AxiosResponse } from 'axios';
import { axiosClient } from '../../config/axios';

export function fetchURLS(): Promise<AxiosResponse> {
  return axiosClient.get('items/URL');
}

export function fetchProducts(): Promise<AxiosResponse> {
  return axiosClient.get('items/Product');
}

export async function fetchMenus(): Promise<AxiosResponse> {
  return axiosClient.get('items/Menu');
}

export function fetchSpecificMenus(): Promise<AxiosResponse> {
  return axiosClient.get('items/Menu?fields[]=*.Product_id.*.related_Product_id.*.*.*');
}

export function fetchCountry(): Promise<AxiosResponse> {
  return axios.get('https://api.country.is/');
}

export function fetchToken(): Promise<AxiosResponse> {
  return axios.get(
    'https://bwg.betradar.com/soap-wallet-rest/login?username=sportradar9&password=sportradar9',
  );
}
