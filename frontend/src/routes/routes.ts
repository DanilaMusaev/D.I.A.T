import type { JSX } from 'react';
import GamblingPage from '../pages/gamblingPages/GamblingPage/GamblingPage';
import SoonPage from '../pages/SoonPage/SoonPage';
import GambleSolosPage from '../pages/gamblingPages/GambleSolosPage/GambleSolosPage';
import GambleDuosPage from '../pages/gamblingPages/GambleDuosPage/GambleDuosPage';
import GambleTriosPage from '../pages/gamblingPages/GambleTriosPage/GambleTriosPage';
import { AppRoutes } from './consts';
import PacksPage from '../pages/PacksPage/PacksPage';

/**
 * Тип для роута
 */
interface DIATRouteType {
    path: AppRoutes;
    Component: () => JSX.Element;
}

// Список маршрутов для страниц
export const diatRoutes: Array<DIATRouteType> = [
    {
        path: AppRoutes.GAMBLING_ROUTE,
        Component: GamblingPage,
    },
    {
        path: AppRoutes.GAMBLING_SOLOS_ROUTE,
        Component: GambleSolosPage,
    },
    {
        path: AppRoutes.GAMBLING_DUOS_ROUTE,
        Component: GambleDuosPage,
    },
    {
        path: AppRoutes.GAMBLING_TRIOS_ROUTE,
        Component: GambleTriosPage,
    },
    {
        path: AppRoutes.PACKS_ROUTE,
        Component: PacksPage
    },
    {
        path: AppRoutes.SOON_ROUTE,
        Component: SoonPage,
    },
];
