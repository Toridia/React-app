// Константы для API
const API_BASE_URL = 'http://localhost:3001/api';

// Основная функция для всех запросов
const apiRequest = async (endpoint, options = {}) => {
  // Получаем токен авторизации
  const token = localStorage.getItem('authToken');
  
  // Подготавливаем заголовки
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  // Добавляем токен если есть
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  // Подготавливаем тело запроса
  let body = options.body;
  if (body && typeof body === 'object') {
    body = JSON.stringify(body);
  }
  
  // Формируем полный URL
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Конфигурация запроса
  const config = {
    method: options.method || 'GET',
    headers,
    ...(body && { body }),
  };
  
  try {
    console.log(`Отправка запроса: ${config.method} ${url}`);
    
    const response = await fetch(url, config);
    
    // Проверяем статус ответа
    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}`;
      
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        // Не удалось распарсить JSON с ошибкой
      }
      
      throw new Error(errorMessage);
    }
    
    // Проверяем есть ли тело ответа
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    
    return null; // Для ответов без тела (например, 204 No Content)
    
  } catch (error) {
    console.error('Ошибка API запроса:', error);
    throw error;
  }
};

// Вспомогательные функции для конкретных методов
const get = (endpoint, params = {}) => {
  let url = endpoint;
  
  // Добавляем query параметры если есть
  if (Object.keys(params).length > 0) {
    const queryParams = new URLSearchParams(params);
    url += `?${queryParams.toString()}`;
  }
  
  return apiRequest(url, { method: 'GET' });
};

const post = (endpoint, data = {}) => {
  return apiRequest(endpoint, {
    method: 'POST',
    body: data,
  });
};

const put = (endpoint, data = {}) => {
  return apiRequest(endpoint, {
    method: 'PUT',
    body: data,
  });
};

const del = (endpoint) => {
  return apiRequest(endpoint, {
    method: 'DELETE',
  });
};

// ========== API ДЛЯ АУТЕНТИФИКАЦИИ =========
export const authAPI = {
  login: (credentials) => post('/auth/login', credentials),
  register: (userData) => post('/auth/register', userData),
  logout: () => post('/auth/logout'),
};

// ========== API ДЛЯ ГРУПП =========
export const groupsAPI = {
  getAll: () => get('/groups'),
  getById: (id) => get(`/groups/${id}`),
  create: (groupData) => post('/groups', groupData),
  update: (id, groupData) => put(`/groups/${id}, groupData`),
  delete: (id) => del(`/groups/${id}`),
  addMember: (groupId, userId) => post(`/groups/${groupId}/members, { userId }`),
  removeMember: (groupId, userId) => del(`/groups/${groupId}/members/${userId}`),
  getMembers: (groupId) => get(`/groups/${groupId}/members`),
};

// ========== API ДЛЯ КАЛЕНДАРЯ ==========
export const calendarAPI = {
  getEvents: (groupId, params = {}) => get(`/groups/${groupId}/events, params`),
  createEvent: (groupId, eventData) => post(`/groups/${groupId}/events, eventData`),
  updateEvent: (groupId, eventId, eventData) => put(`/groups/${groupId}/events/${eventId}, eventData`),
  deleteEvent: (groupId, eventId) => del(`/groups/${groupId}/events/${eventId}`),
};

// Экспорт основной функции для кастомных запросов
export { apiRequest, get, post, put, del };