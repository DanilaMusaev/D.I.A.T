import { LinkRoutes } from '../../routes/consts';
import TabBtn from '../TabBtn/TabBtn';
import './headerTabs.scss';

/**
 * Объединяющий все Табы в шапке элемент
 */
function HeaderTabs() {
    return (
        <nav className="nav_tabs">
            <TabBtn linkPath={LinkRoutes.GAMBLING_ROUTE_LINK}>Gambling</TabBtn>
            <TabBtn linkPath={LinkRoutes.PACKS_ROUTE_LINK}>Packs</TabBtn>
            <TabBtn linkPath={LinkRoutes.RATING_DAILY_LINK}>Rating</TabBtn>
        </nav>
    );
}

export default HeaderTabs;
