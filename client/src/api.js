import axios from 'axios';

// Use environment variable for production, empty for dev proxy
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export async function fetchTasks() {
  try {
    const { data } = await api.get('/api/tasks');
    return data;
  } catch (error) {
    throw new Error('Failed to fetch tasks');
  }
}

export async function addTask(title) {
  try {
    const { data } = await api.post('/api/tasks', { title });
    return data;
  } catch (error) {
    throw new Error('Failed to add task');
  }
}

export async function updateTask(id, updates) {
  try {
    const { data } = await api.put(`/api/tasks/${id}`, updates);
    return data;
  } catch (error) {
    throw new Error('Failed to update task');
  }
}

export async function deleteTask(id) {
  try {
    const { data } = await api.delete(`/api/tasks/${id}`);
    return data;
  } catch (error) {
    throw new Error('Failed to delete task');
  }
}
