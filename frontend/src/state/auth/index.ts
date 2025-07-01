import { create } from 'zustand';
import type { AuthActions, AuthState, User } from './types';
import AuthService from '../../api/AuthService';

export const useAuthState = create<AuthState & AuthActions>((set) => ({
    user: {} as User,
    isAuth: false,
    registration: async (email, password) => {
        const userData = await AuthService.registration(email, password);

        set((state) => ({
            ...state,
            user: userData,
            isAuth: true,
        }));
    },
    login: async (email, password) => {
        const userData = await AuthService.registration(email, password);

        set((state) => ({
            ...state,
            user: userData,
            isAuth: true,
        }));
    },
    checkAuth: async () => {
        const ok = await AuthService.checkAuth();

        if (ok) {
            set((state) => ({
                ...state,
                isAuth: true,
            }));
        }
    },
}));
