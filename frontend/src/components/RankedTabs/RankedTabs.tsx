import { LinkRoutes } from '../../routes/consts';
import SubTab from '../SubTab/SubTab';
import './rankedTabs.scss';

function RankedTabs() {
    return (
        <div className="ranked-tabs">
            <SubTab linkPath={LinkRoutes.RATING_DAILY_LINK} clipSide="left">
                daily
            </SubTab>
            <SubTab linkPath={LinkRoutes.RATING_MONTH_LINK} clipSide="between">
                month
            </SubTab>
            <SubTab linkPath={LinkRoutes.RATING_SEASONS_LINK} clipSide="right">
                seasons
            </SubTab>
        </div>
    );
}

export default RankedTabs;
