// ============================================
// API CLIENT
// Axios instance with base URL and interceptors
// ============================================

import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add token to all requests
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If 401 (unauthorized), clear token and redirect to login
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// ============ AUTH APIs ============

export const authAPI = {
  signup: (data) => api.post('/api/auth/signup', data),
  login: (data) => api.post('/api/auth/login', data),
  getCurrentUser: () => api.get('/api/auth/me'),
  logout: () => api.post('/api/auth/logout'),
};

// ============ WHATSAPP APIs ============

export const whatsappAPI = {
  connect: () => api.post('/api/whatsapp/connect'),
  getQR: () => api.get('/api/whatsapp/qr'),
  getStatus: () => api.get('/api/whatsapp/status'),
  disconnect: () => api.post('/api/whatsapp/disconnect'),
};

// ============ QUERY APIs ============

export const queryAPI = {
  getRecentChats: (limit = 10) => api.get(`/api/query/chats/recent?limit=${limit}`),
  getAllChats: () => api.get('/api/query/chats'),
  queryChat: (query) => api.post('/api/query', { query }),
  getChat: (chatId) => api.get(`/api/query/chats/${chatId}`),
  summarizeChat: (chatId) => api.post(`/api/query/summarize/${chatId}`),
};

export default api;