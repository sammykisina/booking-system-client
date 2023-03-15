import { API } from './api';
import { UserData as LoginData, RegisterData } from '../types/typings.t';

const AuthAPI = {
  login: async (data: LoginData) => API.post('/auth/login', data),
  registerUser: async (data: RegisterData) => API.post('/auth/register', data),
  getProfile: async (userId: number) => API.get(`/users/${userId}/profile`),
};

export default AuthAPI;
