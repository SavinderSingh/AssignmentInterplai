import axios from 'axios';

const BASE_URL = `https://api.publicapis.org/`;

const AxiosBase = axios.create({
  baseURL: BASE_URL,
});

AxiosBase.interceptors.request.use(
  async config => {
    return config;
  },
  error => {
    Promise.reject(error);
  },
);

export default AxiosBase;
