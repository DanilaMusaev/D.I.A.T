import { create } from 'zustand';
import type { RatingActions, RatingState } from './types';
import RatingService from '../../api/RatingService/RatingService';
import { createInitialStats } from '../../utils/calculateStats/someUtils';
import { calcPlayerStats } from '../../utils/calculateStats/calcStats';
import type {
    MonthRatingType,
    SeasonRatingType,
} from '../../api/RatingService/types';

export const useRatingStore = create<RatingState & RatingActions>((set) => ({
    monthData: [] as MonthRatingType[],
    currentRP: 0,
    matchesQTY: 0,
    ernLostRP: 0,
    seasonsData: {} as SeasonRatingType,
    playerStats: createInitialStats(),
    firstSplitStats: createInitialStats(),
    secondSplitStats: createInitialStats(),
    error: null,
    getCurrentRating: async (userId) => {
        try {
            // Получаем данные о количестве открытых паков с сервера
            const currentRatingData = await RatingService.getCurrentRating(
                userId
            );
            // Меняем значение в state
            set({
                currentRP: currentRatingData.current_rating,
                playerStats: calcPlayerStats(currentRatingData.current_rating),
                matchesQTY: currentRatingData.today_matches_count,
                ernLostRP: currentRatingData.today_total,
                error: null,
            });
        } catch (error) {
            set({
                error:
                    error instanceof Error
                        ? error.message
                        : 'Failed to fetch current data',
            });
        }
    },
    getMonthRating: async (userId) => {
        try {
            const monthRatingData = await RatingService.getMonthRating(userId);
            set({
                monthData: monthRatingData,
                error: null,
            });
        } catch (error) {
            set({
                error:
                    error instanceof Error
                        ? error.message
                        : 'Failed to fetch current data',
            });
        }
    },
    getSeasonRating: async (userId) => {
        try {
            const seasonRatingData = await RatingService.getSeasonRating(
                userId
            );
            set({
                seasonsData: seasonRatingData,
                firstSplitStats: calcPlayerStats(
                    seasonRatingData.first_half_sum
                ),
                secondSplitStats: calcPlayerStats(
                    seasonRatingData.second_half_sum
                ),
                error: null,
            });
        } catch (error) {
            set({
                error:
                    error instanceof Error
                        ? error.message
                        : 'Failed to fetch current data',
            });
        }
    },
    updateCurrentRating: async (ptsCount, userId) => {
        try {
            // Обновляем данные о количестве паков на сервере.
            const updatedRatingFromAPI =
                await RatingService.updateCurrentRating(ptsCount, userId);
            // Меняем значение в state
            set((state) => ({
                ...state,
                currentRP: updatedRatingFromAPI,
                playerStats: calcPlayerStats(updatedRatingFromAPI),
                ernLostRP: state.ernLostRP + ptsCount,
                matchesQTY: state.matchesQTY + 1,
                error: null,
            }));
        } catch (error) {
            set({
                error:
                    error instanceof Error
                        ? error.message
                        : 'Failed to fetch current data',
            });
        }
    },
    clearError: async () => set({ error: null }),
}));
