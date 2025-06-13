import arrowLeft from '../../assets/img/icons/arrow-left.svg';
import { useNavigate } from 'react-router';
import { LinkRoutes } from '../../routes/consts';
import './backBtn.scss';

/**
 * Компонент кнопки назад
 */
function BackBtn() {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(LinkRoutes.GAMBLING_ROUTE_LINK)}
            className="back-btn"
        >
            <img className="back-btn__arrow" src={arrowLeft} alt="" />
            Back
        </button>
    );
}

export default BackBtn;
