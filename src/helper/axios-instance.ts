import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 1000,
  timeoutErrorMessage: 'Occorreu um erro ao tentar se conectar ao servidor',
});

export default axiosInstance;
