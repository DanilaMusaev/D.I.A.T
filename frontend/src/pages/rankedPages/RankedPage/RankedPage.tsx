import RankedTabs from '../../../components/RankedTabs/RankedTabs';
import { Outlet } from 'react-router';
import './rankedPage.scss';

function RankedPage() {

    return (
        <section className="ranked">
            <div className="container">
                <div className="ranked__inner">
                    <RankedTabs />
                    <Outlet />
                </div>
            </div>
        </section>
    );
}

export default RankedPage;
