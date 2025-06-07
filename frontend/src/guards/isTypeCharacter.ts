import type { Character } from '../data/gamblingCharacter';

export const isTypeCharacter = (value: unknown): value is Character => {
    if (
        value &&
        typeof value === 'object' &&
        'characterName' in value &&
        'pathToImg' in value
    ) {
        return true;
    } else {
        return false;
    }
};
