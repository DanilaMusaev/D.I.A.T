import { Navigate, Route, Routes } from 'react-router';
import { diatRoutes, noAuthRoutes } from '../../routes/routes';
import { AppRoutes, NoAuthRoutes } from '../../routes/consts';
import RankedPage from '../../pages/rankedPages/RankedPage/RankedPage';
import RankedDaily from '../../pages/rankedPages/RankedDaily/RankedDaily';
import RankedMonth from '../../pages/rankedPages/RankedMonth/RankedMonth';
import RankedSeasons from '../../pages/rankedPages/RankedSeasons/RankedSeasons';
import { useAuthState } from '../../state/auth';
import { useEffect } from 'react';

const AppRouter = () => {
    const isAuth = useAuthState((state) => state.isAuth);
    const checkAuth = useAuthState((state) => state.checkAuth);

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <Routes>
            {isAuth ? (
                <>
                    {diatRoutes.map(({ path, Component }) => {
                        return (
                            <Route
                                key={path}
                                path={path}
                                element={<Component />}
                            />
                        );
                    })}
                    <Route path={AppRoutes.RATING_ROUTE}>
                        <Route element={<RankedPage />}>
                            <Route
                                path={AppRoutes.RATING_ROUTE_DAILY}
                                element={<RankedDaily />}
                            />
                            <Route
                                path={AppRoutes.RATING_ROUTE_MONTH}
                                element={<RankedMonth />}
                            />
                            <Route
                                path={AppRoutes.RATING_ROUTE_SEASONS}
                                element={<RankedSeasons />}
                            />
                        </Route>
                    </Route>
                    <Route
                        path="*"
                        element={<Navigate to={AppRoutes.ERROR_ROUTE} />}
                    />
                </>
            ) : (
                <>
                    {noAuthRoutes.map(({ path, Component }) => {
                        return (
                            <Route
                                key={path}
                                path={path}
                                element={<Component />}
                            />
                        );
                    })}
                    <Route
                        path={`${AppRoutes.RATING_ROUTE}/*`}
                        element={<Navigate to={NoAuthRoutes.NO_AUTH_ROUTE} />}
                    />
                    <Route
                        path={AppRoutes.PACKS_ROUTE}
                        element={<Navigate to={NoAuthRoutes.NO_AUTH_ROUTE} />}
                    />
                    <Route
                        path="*"
                        element={<Navigate to={NoAuthRoutes.ERROR_ROUTE} />}
                    />
                </>
            )}
        </Routes>
    );
};

export default AppRouter;
