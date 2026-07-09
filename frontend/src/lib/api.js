import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getVendors = async () => {
  try {
    const response = await api.get('/api/vendors');
    return response.data;
  } catch (error) {
    console.error('Error fetching vendors:', error);
    throw error;
  }
};

export const login = async (credentials) => {
  const response = await api.post('/api/auth/login', credentials);
  return response.data;
};

export default api;
