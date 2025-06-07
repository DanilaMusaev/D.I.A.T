import { NavLink } from 'react-router';
import './tabBtn.scss';

/**
 * Тип для пропсов Таб/ссылки в шапке
 */
interface TabBtnProps {
    children: React.ReactNode;
    linkPath: string;
}

/**
 * Таб/ссылка в шапке страницы.
 */
function TabBtn({ children, linkPath }: TabBtnProps) {

    // Чтобы стили при нажатии менялись, мб не надо будет даже
    // const navLinkClasses = ({ isActive }: { isActive: boolean }): string => {
    //     return `tab ${isActive ? 'active' : ''}`;
    // };

    return (
        <>
            <NavLink to={linkPath} className={'tab'}>
                {children}
            </NavLink>
        </>
    );
}

export default TabBtn;
