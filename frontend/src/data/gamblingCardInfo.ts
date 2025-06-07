import { AppRoutes } from '../routes/consts';

/**
 * Тип объекта с информацией о карточке-ссылке на страницу с gambling
 */
interface CardInfo {
    id: string;
    gameMode: string;
    gamblingPagePath: AppRoutes;
    pathToImg: string;
}

/**
 * Массив с информацией о карточках-ссылках на страницы с gambling
 */
const cardsData: Array<CardInfo> = [
    {
        id: 'c01',
        gameMode: 'solos',
        gamblingPagePath: AppRoutes.GAMBLING_SOLOS_ROUTE,
        pathToImg: '/src/assets/img/for-gambilng-cards/solos-alter.webp',
    },
    {
        id: 'c02',
        gameMode: 'duos',
        gamblingPagePath: AppRoutes.GAMBLING_DUOS_ROUTE,
        pathToImg: '/src/assets/img/for-gambilng-cards/duos.webp',
    },
    {
        id: 'c03',
        gameMode: 'trios',
        gamblingPagePath: AppRoutes.GAMBLING_TRIOS_ROUTE,
        pathToImg: '/src/assets/img/for-gambilng-cards/trios.webp',
    },
];

export default cardsData;
