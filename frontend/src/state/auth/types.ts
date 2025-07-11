export type Email = `${string}@${string}.${string}`;

export interface User {
    id: number;
    email: Email;
}

export interface AuthState {
    user: User;
    isAuth: boolean;
    isLoading: boolean;
}

export interface AuthActions {
    registration: (email: Email, password: string) => Promise<void>;
    login: (email: Email, password: string) => Promise<void>;
    checkAuth: () => Promise<void>;
}
