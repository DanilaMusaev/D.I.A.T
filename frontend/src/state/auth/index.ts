import { create } from 'zustand';
import type { AuthActions, AuthState, User } from './types';
import AuthService from '../../api/AuthService';

export const useAuthState = create<AuthState & AuthActions>((set) => ({
    user: {} as User,
    isAuth: false,
    isLoading: true,
    registration: async (email, password) => {
        set({ isLoading: true });
        const userData = await AuthService.registration(email, password);

        set({ user: userData, isAuth: true, isLoading: false });
    },
    login: async (email, password) => {
        set({ isLoading: true });

        const userData = await AuthService.login(email, password);

        set({ user: userData, isAuth: true, isLoading: false });
    },
    checkAuth: async () => {
        set({ isLoading: true });
        const ok = await AuthService.checkAuth();
        console.log('AUTH OK: ', ok);
        set({ isAuth: ok, isLoading: false });
    },
}));
