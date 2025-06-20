import { create } from 'zustand';
import type { RatingActions, RatingState } from './types';
import RatingService from '../../api/RatingService';
import { createInitialStats } from '../../utils/calculateStats/someUtils';
import { calcPlayerStats } from '../../utils/calculateStats/calcStats';
import type { MonthRatingType } from '../../api/types/api-types';

export const useRatingStore = create<RatingState & RatingActions>((set) => ({
    monthData: [] as MonthRatingType[],
    currentRP: 0,
    matchesQTY: 0,
    ernLostRP: 0,
    playerStats: createInitialStats(),
    getCurrentRating: async (userId) => {
        // Получаем данные о количестве открытых паков с сервера
        const currentRatingData = await RatingService.getCurrentRating(userId);
        // Меняем значение в state
        set((state) => ({
            ...state,
            currentRP: currentRatingData.current_rating,
            playerStats: calcPlayerStats(currentRatingData.current_rating),
            matchesQTY: currentRatingData.today_matches_count,
            ernLostRP: currentRatingData.today_total,
        }));
    },
    getMonthRating: async (userId) => {
        const monthRatingData = await RatingService.getMonthRating(userId);

        set((state) => ({
            ...state,
            monthData: monthRatingData,
        }));
    },
    updateCurrentRating: async (ptsCount, userId) => {
        // Обновляем данные о количестве паков на сервере.
        const updatedRatingFromAPI = await RatingService.updateCurrentRating(
            ptsCount,
            userId
        );
        // Меняем значение в state
        set((state) => ({
            ...state,
            currentRP: updatedRatingFromAPI,
            playerStats: calcPlayerStats(updatedRatingFromAPI),
            ernLostRP: state.ernLostRP + ptsCount,
            matchesQTY: state.matchesQTY + 1,
        }));
    },
}));
