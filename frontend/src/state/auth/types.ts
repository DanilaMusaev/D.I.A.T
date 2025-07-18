export type Email = `${string}@${string}.${string}`;

export interface User {
    id: number;
    email: Email;
}

export interface AuthState {
    user: User;
    isAuth: boolean;
    isLoading: boolean;
    error: string | null;
}

export interface AuthActions {
    registration: (email: Email, password: string) => Promise<boolean>;
    login: (email: Email, password: string) => Promise<boolean>;
    checkAuth: () => Promise<void>;
    clearError: () => Promise<void>;
}
