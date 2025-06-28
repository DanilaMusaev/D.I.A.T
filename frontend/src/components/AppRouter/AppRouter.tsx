import { Navigate, Route, Routes } from 'react-router';
import { diatRoutes } from '../../routes/routes';
import { AppRoutes, NoAuthRoutes } from '../../routes/consts';
import RankedPage from '../../pages/rankedPages/RankedPage/RankedPage';
import RankedDaily from '../../pages/rankedPages/RankedDaily/RankedDaily';
import RankedMonth from '../../pages/rankedPages/RankedMonth/RankedMonth';
import RankedSeasons from '../../pages/rankedPages/RankedSeasons/RankedSeasons';
import Auth from '../../pages/authPages/Auth/Auth';

const AppRouter = () => {
    return (
        <Routes>
            <Route path={NoAuthRoutes.LOGIN_ROUTE} element={<Auth />} />
            {diatRoutes.map(({ path, Component }) => {
                return <Route key={path} path={path} element={<Component />} />;
            })}
            <Route path={AppRoutes.RATING_ROUTE}>
                <Route element={<RankedPage />}>
                    <Route path={AppRoutes.RATING_ROUTE_DAILY} element={<RankedDaily />} />
                    <Route path={AppRoutes.RATING_ROUTE_MONTH} element={<RankedMonth />} />
                    <Route path={AppRoutes.RATING_ROUTE_SEASONS} element={<RankedSeasons />} />
                </Route>
            </Route>
            <Route path="*" element={<Navigate to={AppRoutes.SOON_ROUTE} />} />
        </Routes>
    );
};

export default AppRouter;
