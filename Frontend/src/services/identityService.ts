import api from './api';
import type { LoginRequest, LoginResponse, User } from '../types';

export const identityService = {
  login: (data: LoginRequest) =>
    api.post<LoginResponse>('/identity/auth/login', data),

  logout: () =>
    api.post('/identity/auth/logout'),

  getProfile: () =>
    api.get<User>('/identity/auth/profile'),
};