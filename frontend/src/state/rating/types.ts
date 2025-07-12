import type {
    MonthRatingType,
    SeasonRatingType,
} from '../../api/RatingService/types';
import type { PlayerStats } from '../../utils/calculateStats/types';

/**
 * Тип состояния для рейтинга
 */
export interface RatingState {
    currentRP: number;
    matchesQTY: number;
    ernLostRP: number;
    playerStats: PlayerStats;
    monthData: Array<MonthRatingType>;
    seasonsData: SeasonRatingType;
    firstSplitStats: PlayerStats;
    secondSplitStats: PlayerStats;
    error: string | null;
}
/**
 * Типы для actions состояния рейтинга
 */
export interface RatingActions {
    getCurrentRating: (userId: number) => Promise<void>;
    getMonthRating: (userId: number) => Promise<void>;
    getSeasonRating: (userId: number) => Promise<void>;
    updateCurrentRating: (ptsCount: number, userId: number) => Promise<void>;
    clearError: () => Promise<void>;
}
