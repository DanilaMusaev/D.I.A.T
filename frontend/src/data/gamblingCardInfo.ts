import { LinkRoutes } from '../routes/consts';

/**
 * Тип объекта с информацией о карточке-ссылке на страницу с gambling
 */
interface CardInfo {
    id: string;
    gameMode: string;
    gamblingPagePath: LinkRoutes;
    pathToImg: string;
}

/**
 * Массив с информацией о карточках-ссылках на страницы с gambling
 */
const cardsData: Array<CardInfo> = [
    {
        id: 'c01',
        gameMode: 'solos',
        gamblingPagePath: LinkRoutes.GAMBLING_SOLOS_LINK,
        pathToImg: '/src/assets/img/for-gambilng-cards/solos-alter.webp',
    },
    {
        id: 'c02',
        gameMode: 'duos',
        gamblingPagePath: LinkRoutes.GAMBLING_DUOS_LINK,
        pathToImg: '/src/assets/img/for-gambilng-cards/duos.webp',
    },
    {
        id: 'c03',
        gameMode: 'trios',
        gamblingPagePath: LinkRoutes.GAMBLING_TRIOS_LINK,
        pathToImg: '/src/assets/img/for-gambilng-cards/trios.webp',
    },
];

export default cardsData;
