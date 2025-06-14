import type { PlayerStats } from '../../utils/calculateStats/types';

/**
 * Тип состояния паков
 */
export interface RatingState {
    currentRP: number;
    matchesQTY: [number, number];
    ernLostRP: number;
    playerStats: PlayerStats;
}
/**
 * Типы для actions состояния паков
 */
export interface RatingActions {
    getCurrentRating: (userId: number) => Promise<void>;
    updateCurrentRating: (ptsCount: number, userId: number) => Promise<void>;
}
