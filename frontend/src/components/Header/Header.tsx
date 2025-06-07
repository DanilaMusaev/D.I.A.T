import HeaderTabs from '../HeaderTabs/HeaderTabs';
import Logo from '../Logo/Logo';
import './header.scss';

/**
 * Элемент шапки
 */
function Header() {
    return (
        <header className="header">
            <div className="container">
                <div className="header__inner">
                    <div className="header__logo">
                        <Logo />
                    </div>
                    <div className="header__nav">
                        <HeaderTabs />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
