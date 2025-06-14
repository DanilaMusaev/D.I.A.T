import { create } from 'zustand';
import type { RatingActions, RatingState } from './types';
import RatingService from '../../api/RatingService';
import { createInitialStats } from '../../utils/calculateStats/someUtils';
import { calcPlayerStats } from '../../utils/calculateStats/calcStats';

export const useRatingStore = create<RatingState & RatingActions>((set) => ({
    currentRP: 0,
    matchesQTY: [0, 0],
    ernLostRP: 0,
    playerStats: createInitialStats(),
    getCurrentRating: async (userId) => {
        // Получаем данные о количестве открытых паков с сервера
        const currentRatingFromAPI = await RatingService.getCurrentRating(
            userId
        );
        // Меняем значение в state
        set((state) => ({
            ...state,
            currentRP: currentRatingFromAPI,
            playerStats: calcPlayerStats(currentRatingFromAPI),
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
            matchesQTY: [state.matchesQTY[0] + 1, state.matchesQTY[1] + 1],
        }));
    },
}));
