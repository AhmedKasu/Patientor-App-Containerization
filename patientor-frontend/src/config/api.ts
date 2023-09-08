import axios from 'axios';
import { apiBaseUrl } from '../constants';

const api = axios.create({
  baseURL: apiBaseUrl,
});

api.defaults.withCredentials = true;

export default api;
