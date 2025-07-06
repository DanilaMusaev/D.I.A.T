import type { Email } from "../state/auth/types";

export default function isEmail(string: string): string is Email {
    return /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(string);
}