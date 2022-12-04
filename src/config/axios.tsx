import axios from 'axios';
import { BASE_URL } from '../constants/url';

const baseURL = BASE_URL;

export const axiosClient = axios.create({
  baseURL,
});
