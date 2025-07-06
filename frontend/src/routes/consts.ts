// Здесь файл со всякими константными объектами/штуками

/**
 * Перечисление всех роутов приложения
 */
export const enum AppRoutes {
    GAMBLING_ROUTE = '/',
    PACKS_ROUTE = '/packs',
    RATING_ROUTE = '/rating',
    GAMBLING_SOLOS_ROUTE = '/gambling-solos',
    GAMBLING_DUOS_ROUTE = '/gambling-duos',
    GAMBLING_TRIOS_ROUTE = '/gambling-trios',
    RATING_ROUTE_DAILY = 'daily',
    RATING_ROUTE_MONTH = 'month',
    RATING_ROUTE_SEASONS = 'seasons',
    ERROR_ROUTE = '/not-found',
}

export const enum NoAuthRoutes {
    LOGIN_ROUTE = '/login',
    REGISTRATION_ROUTE = '/registration',
    GAMBLING_ROUTE = '/',
    GAMBLING_SOLOS_ROUTE = '/gambling-solos',
    GAMBLING_DUOS_ROUTE = '/gambling-duos',
    GAMBLING_TRIOS_ROUTE = '/gambling-trios',
    ERROR_ROUTE = '/not-found',
    NO_AUTH_ROUTE = '/no-auth',
}

export const enum LinkRoutes {
    GAMBLING_ROUTE_LINK = '/',
    GAMBLING_SOLOS_LINK = '/gambling-solos',
    GAMBLING_DUOS_LINK = '/gambling-duos',
    GAMBLING_TRIOS_LINK = '/gambling-trios',
    PACKS_ROUTE_LINK = '/packs',
    RATING_DAILY_LINK = '/rating/daily',
    RATING_MONTH_LINK = '/rating/month',
    RATING_SEASONS_LINK = '/rating/seasons',
}
