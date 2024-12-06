import axios from 'axios';
import { store } from './store';

// Creating axios instance
const apiClient = axios.create({
  baseURL: 'https://wallet.b.goit.study/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Adding the interceptor for all axios requests
apiClient.interceptors.request.use(
  config => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default apiClient;
