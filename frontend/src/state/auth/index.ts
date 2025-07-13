import { create } from 'zustand';
import type { AuthActions, AuthState, User } from './types';
import AuthService from '../../api/AuthService/AuthService';

export const useAuthState = create<AuthState & AuthActions>((set) => ({
    user: {} as User,
    isAuth: false,
    isLoading: true,
    error: null,
    registration: async (email, password) => {
        try {
            set({ isLoading: true });
            const userData = await AuthService.registration(email, password);
            set({ user: userData, isAuth: true, error: null });
        } catch (error) {
            set({
                error:
                    error instanceof Error
                        ? error.message
                        : 'Registration failed',
            });
        } finally {
            set({ isLoading: false });
        }
    },
    login: async (email, password) => {
        try {
            set({ isLoading: true });
            const userData = await AuthService.login(email, password);
            set({ user: userData, isAuth: true });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Login failed',
            });
        } finally {
            set({ isLoading: false });
        }
    },
    checkAuth: async () => {
        try {
            set({ isLoading: true });
            const resData = await AuthService.checkAuth();
            set({ isAuth: true, user: resData, error: null });
        } catch (error) {
            set({
                isAuth: false,
                error:
                    error instanceof Error
                        ? error.message
                        : 'Authorization failed',
            });
        } finally {
            set({ isLoading: false });
        }
    },
    clearError: async () => set({ error: null }),
}));
