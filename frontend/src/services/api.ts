import axios from 'axios';
import { Appointment, Employee, Department } from '../types/types';

const API_URL = 'http://localhost:5000/api';

// Function to get CSRF token from cookie
function getCsrfToken() {
  const name = 'csrftoken';
  let cookieValue = null;
  
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

// Add request interceptor to include CSRF token
api.interceptors.request.use(config => {
  // Only add CSRF token for non-GET requests
  if (config.method !== 'get') {
    config.headers['X-CSRFToken'] = getCsrfToken();
  }
  return config;
});

// API functions
export const appointmentApi = {
  getAll: () => api.get<Appointment[]>('/appointments/'),
  getById: (id: number) => api.get<Appointment>(`/appointments/${id}/`),
  create: (data: Partial<Appointment>) => api.post<Appointment>('/appointments/', data),
  update: (id: number, data: Partial<Appointment>) => 
    api.put<Appointment>(`/appointments/${id}/`, data),
  delete: (id: number) => api.delete(`/appointments/${id}/`),
};

export const employeeApi = {
  getAll: () => api.get<Employee[]>('/employees/'),
  getById: (id: number) => api.get<Employee>(`/employees/${id}/`),
};

export const departmentApi = {
  getAll: () => api.get<Department[]>('/departments/'),
  getById: (id: number) => api.get<Department>(`/departments/${id}/`),
  getEmployeesByDepartment: (id: number) => api.get<Employee[]>(`/departments/${id}/employees`),
};

// export const getDepartments = () => api.get<Department[]>('/departments/');
// export const getEmployees = () => api.get<Employee[]>('/employees/');
// export const getAppointments = () => api.get<Appointment[]>('/appointments/');

// export const createAppointment = (data: Partial<Appointment>) => api.post('/appointments/', data);
// export const updateAppointment = (id: number, data: Partial<Appointment>) => api.put(`/appointments/${id}/`, data);
// export const deleteAppointment = (id: number) => api.delete(`/appointments/${id}/`);

export default api;