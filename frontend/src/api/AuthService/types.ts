import type { Email } from '../../state/auth/types';

export interface AuthTypeBody {
    email: Email;
    password: string;
}

export interface AuthTypeResponse {
    id: number;
    email: Email;
}
