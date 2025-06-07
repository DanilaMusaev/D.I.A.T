import './gambleBtn.scss';

/**
 * Тип для Gamble кнопки
 */
interface GambleBtnProps {
    onClick: VoidFunction
}

/**
 * Компонент Gamble кнопки
 */
function GambleBtn({ onClick }: GambleBtnProps) {
    return (
        <button onClick={onClick} className="gamble-btn">
            <span className="gamble-btn__trapezoid"></span>
            Gamble
            <span className="gamble-btn__orange-line"></span>
        </button>
    );
}

export default GambleBtn;
