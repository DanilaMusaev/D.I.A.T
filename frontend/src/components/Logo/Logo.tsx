import { useNavigate } from 'react-router';
import logoImg from './../../assets/img/icons/apex-logo.svg';
import './logo.scss';
import { LinkRoutes } from '../../routes/consts';

/**
 * Элемент логотипа приложения
 */
function Logo() {
    const navigate = useNavigate();

    return (
        <h4 onClick={() => navigate(LinkRoutes.GAMBLING_ROUTE_LINK)} className="logo">
            DI
            <img src={logoImg} alt="A" />T
        </h4>
    );
}

export default Logo;
