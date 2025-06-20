import type { MonthRatingType } from '../../api/types/api-types';
import type { PlayerStats } from '../../utils/calculateStats/types';

/**
 * Тип состояния паков
 */
export interface RatingState {
    currentRP: number;
    matchesQTY: number;
    ernLostRP: number;
    playerStats: PlayerStats;
    monthData: Array<MonthRatingType>;
}
/**
 * Типы для actions состояния паков
 */
export interface RatingActions {
    getCurrentRating: (userId: number) => Promise<void>;
    getMonthRating: (userId: number) => Promise<void>;
    updateCurrentRating: (ptsCount: number, userId: number) => Promise<void>;
}
