import logoImg from './../../assets/img/icons/apex-logo.svg';
import './logo.scss';

/**
 * Элемент логотипа приложения
 */
function Logo() {
    return (
        <h4 className="logo">
            DI
            <img src={logoImg} alt="A" />T
        </h4>
    );
}

export default Logo;
