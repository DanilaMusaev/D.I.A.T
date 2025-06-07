import arrowDown from '../../assets/img/icons/arrow-down.svg';
import './noGambleYet.scss';

/**
 * Компонента с анимацией, отображаемая до прокрутки персонажа, с указанием на место, где это можно сделать
 */
function NoGambleYet() {
    return (
        <>
            <div className="no-gambling__title">
                <h2 className="title-2">Press the button to Gamble</h2>
            </div>
            <div className="no-gambling__icon">
                <img src={arrowDown} alt="" />
            </div>
        </>
    );
}

export default NoGambleYet;
