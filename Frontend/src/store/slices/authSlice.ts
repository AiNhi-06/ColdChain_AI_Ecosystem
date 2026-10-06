import { create } from 'zustand';
import type { User } from '../../types';
import { identityService } from '../../services/identityService';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loadProfile: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: localStorage.getItem('auth_token'),
  isAuthenticated: !!localStorage.getItem('auth_token'),
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await identityService.login({ email, password });
      localStorage.setItem('auth_token', data.token);
      set({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : 'Login failed',
        isLoading: false,
      });
    }
  },

  logout: async () => {
    try {
      await identityService.logout();
    } finally {
      localStorage.removeItem('auth_token');
      set({ user: null, token: null, isAuthenticated: false });
    }
  },

  loadProfile: async () => {
    if (!get().token) return;
    set({ isLoading: true });
    try {
      const { data } = await identityService.getProfile();
      set({ user: data, isLoading: false });
    } catch {
      set({ user: null, token: null, isAuthenticated: false, isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
}));