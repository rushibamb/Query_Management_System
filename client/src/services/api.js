import axios from 'axios';
import { getToken, clearAuth } from '../utils/authStorage';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to attach JWT token to Authorization headers automatically
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to format errors and handle expired sessions (401 Unauthorized)
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // 401 represents unauthorized expired/invalid session states
    if (error.response && error.response.status === 401) {
      clearAuth();
      const currentPath = window.location.pathname;
      if (currentPath !== '/login' && currentPath !== '/register') {
        toast.error('Your session has expired. Please sign in again.');
        // Redirect to login using window.location to trigger a clean route state
        window.location.href = '/login';
      }
    }

    // Standard error formatting
    const message = error.response?.data?.message || 'Something went wrong. Please try again.';
    return Promise.reject({
      message,
      status: error.response?.status,
      errors: error.response?.data?.errors || []
    });
  }
);

export default api;
