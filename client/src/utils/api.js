
import axios from 'axios';

// In development we leave REACT_APP_API_URL unset so requests go to `/api` and
// are forwarded to the backend by the CRA dev-server proxy ("proxy" in package.json).
// Set REACT_APP_API_URL (e.g. http://localhost:5000/api) to talk to the API directly.
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
});

// Attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jt_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401 globally
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('jt_token');
      localStorage.removeItem('jt_user');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default api;