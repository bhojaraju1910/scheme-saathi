import axios from 'axios';
import { mockAuthService, mockSchemeService } from './mockApi';

// Determine initial mode: check localStorage or environment variable
const MODE_KEY = 'scheme_saathi_api_mode';
export const getApiMode = () => localStorage.getItem(MODE_KEY) || 'real';
export const setApiMode = (mode) => {
  localStorage.setItem(MODE_KEY, mode);
  window.dispatchEvent(new Event('api-mode-changed'));
};

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const realAxios = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 8000
});

// Attach JWT token to real requests
realAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem('scheme_saathi_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  async register(data) {
    if (getApiMode() === 'mock') {
      return mockAuthService.register(data);
    }
    try {
      const res = await realAxios.post('/auth/register', data);
      if (res.data.token) {
        localStorage.setItem('scheme_saathi_token', res.data.token);
      }
      return res.data;
    } catch (err) {
      // If server unreachable, fallback with clear error
      const msg = err.response?.data?.message || err.message || 'Registration failed';
      throw new Error(msg);
    }
  },

  async login(data) {
    if (getApiMode() === 'mock') {
      return mockAuthService.login(data);
    }
    try {
      const res = await realAxios.post('/auth/login', data);
      if (res.data.token) {
        localStorage.setItem('scheme_saathi_token', res.data.token);
      }
      return res.data;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Login failed';
      throw new Error(msg);
    }
  },

  async getCurrentUser() {
    if (getApiMode() === 'mock') {
      return mockAuthService.getCurrentUser();
    }
    const token = localStorage.getItem('scheme_saathi_token');
    if (!token) return null;
    try {
      const res = await realAxios.get('/auth/me');
      return res.data.user;
    } catch {
      localStorage.removeItem('scheme_saathi_token');
      return null;
    }
  },

  async updateProfile(profileData) {
    if (getApiMode() === 'mock') {
      return mockAuthService.updateProfile(profileData);
    }
    const res = await realAxios.put('/auth/profile', { profile: profileData });
    return res.data.user;
  },

  async logout() {
    if (getApiMode() === 'mock') {
      return mockAuthService.logout();
    }
    localStorage.removeItem('scheme_saathi_token');
  }
};

export const schemeService = {
  async matchSchemes(payload) {
    if (getApiMode() === 'mock') {
      return mockSchemeService.matchSchemes(payload);
    }
    try {
      const res = await realAxios.post('/schemes/match', payload);
      return res.data;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to fetch schemes';
      throw new Error(msg);
    }
  },

  async getSchemeById(id) {
    if (getApiMode() === 'mock') {
      return mockSchemeService.getSchemeById(id);
    }
    const res = await realAxios.get(`/schemes/${id}`);
    return res.data;
  }
};
