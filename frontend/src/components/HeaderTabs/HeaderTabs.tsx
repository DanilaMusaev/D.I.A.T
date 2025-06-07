import { AppRoutes } from '../../routes/consts';
import TabBtn from '../TabBtn/TabBtn';
import './headerTabs.scss';

/**
 * Объединяющий все Табы в шапке элемент
 */
function HeaderTabs() {
    return (
        <nav className="nav_tabs">
            <TabBtn linkPath={AppRoutes.GAMBLING_ROUTE}>Gambling</TabBtn>
            <TabBtn linkPath={AppRoutes.PACKS_ROUTE}>Packs</TabBtn>
            <TabBtn linkPath={AppRoutes.RATING_ROUTE}>Rating</TabBtn>
        </nav>
    );
}

export default HeaderTabs;
