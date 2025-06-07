import arrowLeft from '../../assets/img/icons/arrow-left.svg';
import { useNavigate } from 'react-router';
import { AppRoutes } from '../../routes/consts';
import './backBtn.scss';

/**
 * Компонент кнопки назад
 */
function BackBtn() {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(AppRoutes.GAMBLING_ROUTE)}
            className="back-btn"
        >
            <img className="back-btn__arrow" src={arrowLeft} alt="" />
            Back
        </button>
    );
}

export default BackBtn;
