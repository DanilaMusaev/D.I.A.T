import type { JSX } from 'react';
import GamblingPage from '../pages/gamblingPages/GamblingPage/GamblingPage';
import GambleSolosPage from '../pages/gamblingPages/GambleSolosPage/GambleSolosPage';
import GambleDuosPage from '../pages/gamblingPages/GambleDuosPage/GambleDuosPage';
import GambleTriosPage from '../pages/gamblingPages/GambleTriosPage/GambleTriosPage';
import { AppRoutes, NoAuthRoutes } from './consts';
import PacksPage from '../pages/PacksPage/PacksPage';
import Auth from '../pages/authPages/Auth/Auth';
import ErrorPage from '../pages/SoonPage/errorPage';
import NoAuth from '../pages/NoAuthPage/NoAuthPage';

/**
 * Тип для роута
 */
interface DIATRouteType {
    path: AppRoutes;
    Component: () => JSX.Element;
}

/**
 * Типы роутов для неавторизованных пользователей
 */
interface DIATNoAuthRouteType {
    path: NoAuthRoutes;
    Component: () => JSX.Element;
}

export const noAuthRoutes: Array<DIATNoAuthRouteType> = [
    {
        path: NoAuthRoutes.LOGIN_ROUTE,
        Component: Auth,
    },
    {
        path: NoAuthRoutes.REGISTRATION_ROUTE,
        Component: Auth,
    },
    {
        path: NoAuthRoutes.GAMBLING_ROUTE,
        Component: GamblingPage,
    },
    {
        path: NoAuthRoutes.GAMBLING_SOLOS_ROUTE,
        Component: GambleSolosPage,
    },
    {
        path: NoAuthRoutes.GAMBLING_DUOS_ROUTE,
        Component: GambleDuosPage,
    },
    {
        path: NoAuthRoutes.GAMBLING_TRIOS_ROUTE,
        Component: GambleTriosPage,
    },
    {
        path: NoAuthRoutes.ERROR_ROUTE,
        Component: ErrorPage,
    },
    {
        path: NoAuthRoutes.NO_AUTH_ROUTE,
        Component: NoAuth,
    },
];

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
        Component: PacksPage,
    },
    {
        path: AppRoutes.ERROR_ROUTE,
        Component: ErrorPage,
    },
];
