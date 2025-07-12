import { create } from 'zustand';
import type { PacksActions, PacksState } from './types';
import PacksService from '../../api/PacksService/PacksService';

export const usePacksStore = create<PacksState & PacksActions>((set) => ({
    packs: 0,
    error: null,
    getPacksQTY: async (userId) => {
        try {
            // Получаем данные о количестве открытых паков с сервера
            const packsQTYfromDB = await PacksService.getPacksByUserId(userId);
            // Меняем значение в state
            set({ packs: packsQTYfromDB, error: null });
        } catch (error) {
            set({
                error:
                    error instanceof Error
                        ? error.message
                        : 'Failed to fetch data',
            });
        }
    },
    updatePacksQTY: async (userId, packsQTY) => {
        try {
            // Обновляем данные о количестве паков на сервере.
            const updatedPacksFromDB = await PacksService.updatePacksByUserId(
                userId,
                packsQTY
            );
            // Меняем значение в state
            set({ packs: updatedPacksFromDB, error: null });
        } catch (error) {
            set({
                error:
                    error instanceof Error
                        ? error.message
                        : 'Failed during update data',
            });
        }
    },
    clearError: async () => set({ error: null }),
}));
