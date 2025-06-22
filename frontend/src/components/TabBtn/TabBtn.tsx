import { NavLink, useLocation } from 'react-router';
import './tabBtn.scss';

/**
 * Тип для пропсов Таб/ссылки в шапке
 */
interface TabBtnProps {
    children: React.ReactNode;
    linkPath: string;
    additionalActivePaths?: string[];
}

/**
 * Таб/ссылка в шапке страницы.
 */
function TabBtn({
    children,
    linkPath,
    additionalActivePaths = [],
}: TabBtnProps) {
    // Чтобы стили при нажатии менялись
    const navLinkClasses = ({ isActive }: { isActive: boolean }): string => {
        const currentPath = useLocation().pathname;

        const isAdditionalActive = additionalActivePaths.some(
            (path) => currentPath.startsWith(path) || currentPath === path
        );

        return `tab ${isActive || isAdditionalActive ? 'active' : ''}`;
    };

    return (
        <>
            <NavLink to={linkPath} className={navLinkClasses} end>
                {children}
            </NavLink>
        </>
    );
}

export default TabBtn;
