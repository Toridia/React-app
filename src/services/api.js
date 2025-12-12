import axios from 'axios';

// URL для API (поменять на свой)
const API_BASE_URL = 'http://localhost:3001/api';

// Конфигурация axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Добавляем токен авторизации к запросам
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API для аутентификации
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
};

// API для групп
export const groupsAPI = {
  getAll: () => api.get('/groups'),
  getById: (id) => api.get(`/groups/${id}`),
  create: (groupData) => api.post('/groups', groupData),
  update: (id, groupData) => api.put(`/groups/${id}`, groupData),
  delete: (id) => api.delete(`/groups/${id}`),
  addMember: (groupId, userId) => api.post(`/groups/${groupId}/members`, { userId }),
  removeMember: (groupId, userId) => api.delete(`/groups/${groupId}/members/${userId}`),
  getMembers: (groupId) => api.get(`/groups/${groupId}/members`),
};

// API для календаря
export const calendarAPI = {
  getEvents: (groupId, params) => api.get(`/groups/${groupId}/events`, { params }),
  createEvent: (groupId, eventData) => api.post(`/groups/${groupId}/events`, eventData),
  updateEvent: (groupId, eventId, eventData) => api.put(`/groups/${groupId}/events/${eventId}`, eventData),
  deleteEvent: (groupId, eventId) => api.delete(`/groups/${groupId}/events/${eventId}`),
};

export default api;
