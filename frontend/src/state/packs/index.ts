import { create } from 'zustand';
import type { PacksActions, PacksState } from './types';
import PacksService from '../../api/PacksService';

export const usePacksStore = create<PacksState & PacksActions>((set) => ({
    packs: 0,
    getPacksQTY: async (userId) => {
        // Получаем данные о количестве открытых паков с сервера
        const packsQTYfromDB = await PacksService.getPacksByUserId(userId);
        // Меняем значение в state
        set((state) => ({
            ...state,
            packs: packsQTYfromDB,
        }));
    },
    updatePacksQTY: async (userId, packsQTY) => {
        // Обновляем данные о количестве паков на сервере.
        const updatedPacksFromDB = await PacksService.updatePacksByUserId(
            userId,
            packsQTY
        );
        // Меняем значение в state
        set((state) => ({
            ...state,
            packs: updatedPacksFromDB,
        }));
    },
}));
