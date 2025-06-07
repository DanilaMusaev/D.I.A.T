import { Navigate, Route, Routes } from 'react-router';
import { diatRoutes } from '../../routes/routes';
import { AppRoutes } from '../../routes/consts';

const AppRouter = () => {
    return (
        <Routes>
            {diatRoutes.map(({ path, Component }) => {
                return <Route key={path} path={path} element={<Component />} />;
            })}
            <Route path="*" element={<Navigate to={AppRoutes.SOON_ROUTE} />} />
        </Routes>
    );
};

export default AppRouter;
