import { Navigate, Route, Routes } from 'react-router';
import { diatRoutes, noAuthRoutes } from '../../routes/routes';
import { AppRoutes, NoAuthRoutes } from '../../routes/consts';
import RankedPage from '../../pages/rankedPages/RankedPage/RankedPage';
import RankedDaily from '../../pages/rankedPages/RankedDaily/RankedDaily';
import RankedMonth from '../../pages/rankedPages/RankedMonth/RankedMonth';
import RankedSeasons from '../../pages/rankedPages/RankedSeasons/RankedSeasons';
import { useAuthState } from '../../state/auth';
import { useEffect, useRef, useState } from 'react';
import GlobalLoader from '../globalLoader/GlobalLoader';

const AppRouter = () => {
    const isAuth = useAuthState((state) => state.isAuth);
    const isAuthLoading = useAuthState((state) => state.isLoading);
    const checkAuth = useAuthState((state) => state.checkAuth);
    // Локальное состояние для искусственной задержки, во избежание "мелькания" UI
    const [showLoader, setShowLoader] = useState(false);
    const loaderStartTime = useRef(0);

    // Проверка авторизации один раз при загрузке страницыю
    useEffect(() => {
        checkAuth();
    }, []);

    // Задержка для избежания мелькания UI
    useEffect(() => {
        if (isAuthLoading) {
            // Фиксируем время начала загрузки
            loaderStartTime.current = Date.now();
            setShowLoader(true); // Показываем лоадер сразу
        } else {
            // Вычисляем оставшееся время для минимальной продолжительности (например, 500 мс)
            const elapsed = Date.now() - loaderStartTime.current;
            const remainingTime = Math.max(500 - elapsed, 0);

            // Скрываем лоадер только после истечения минимального времени
            const timer = setTimeout(() => setShowLoader(false), remainingTime);
            return () => clearTimeout(timer);
        }
    }, [isAuthLoading]);

    if (isAuthLoading || showLoader) {
        return <GlobalLoader />;
    }

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
