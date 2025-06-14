import { useState, useEffect, type ChangeEvent, type MouseEvent } from 'react';
import { useRatingStore } from '../../../state/rating';
import { RANK_BUDGES_OBJ } from '../../../data/rankedBudges';
import { getRankBudget } from '../../../helpers/getRankBudge';
import './rankedDaily.scss';

function RankedDaily() {
    // Из state берутся необходимые поля
    const currentRP = useRatingStore((state) => state.currentRP);
    const matchesQTY = useRatingStore((state) => state.matchesQTY);
    const ernLostRP = useRatingStore((state) => state.ernLostRP);
    const playerStats = useRatingStore((state) => state.playerStats);
    // А также нужные actions
    const getCurrentRating = useRatingStore((state) => state.getCurrentRating);
    const updateCurrentRating = useRatingStore(
        (state) => state.updateCurrentRating
    );
    // Управляемое состояние для поля ввода
    const [inputRP, setInputRP] = useState<string>('');

    function handleClick(event: MouseEvent<HTMLButtonElement>) {
        // Отмена стандартного поведения
        event.preventDefault();
        // Id пользователя, которому надо получить количество паков (Пока что хардкод, так как нет авторизации)
        const userId = 1;
        // Запрос на обновление рейтинга на сервере
        updateCurrentRating(Number(inputRP), userId)
            .then(() => {
                setInputRP('');
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        // Id пользователя, которому надо получить количество паков (Пока что хардкод, так как нет авторизации)
        const userId = 1;
        // Отправка запроса на получение количества паков
        getCurrentRating(userId);
    }, []);

    return (
        <div className="ranked-daily">
            <div className="ranked-daily__overall">
                <div className="ranked-daily__block">
                    <h4 className="ranked-daily__block-title">Current RP:</h4>
                    <div className="ranked-daily__block-content">
                        <img
                            src={
                                RANK_BUDGES_OBJ[
                                    `${playerStats.curTier}${playerStats.curDiv}`
                                ]
                            }
                            alt=""
                        />
                        <div className="ranked-daily__stat">
                            <div className="ranked-daily__stat-text">
                                {`${playerStats.curTier} ${playerStats.curDiv}`}
                            </div>
                            <div className="ranked-daily__nowRP">
                                {currentRP}
                                <span className="ranked-daily__RP-text">
                                    RP
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ranked-daily__block">
                    <h4 className="ranked-daily__block-title">
                        To the next Division:
                    </h4>
                    <div className="ranked-daily__block-content">
                        <div className="ranked-daily-text">Before</div>
                        <img
                            src={RANK_BUDGES_OBJ[getRankBudget(playerStats)]}
                            alt=""
                        />
                        <div className="ranked-daily__stat">
                            <div className="ranked-daily__stat-text">
                                Remains
                            </div>
                            <div className="ranked-daily__remainsRP">
                                {playerStats.UntilNextDivRP}
                                <span className="ranked-daily__RP-text">
                                    RP
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ranked-daily__block">
                    <h4 className="ranked-daily__block-title">
                        To the next Tier:
                    </h4>
                    <div className="ranked-daily__block-content">
                        <div className="ranked-daily-text">Before</div>
                        <img
                            src={RANK_BUDGES_OBJ[`${playerStats.nextTier}IV`]}
                            alt=""
                        />
                        <div className="ranked-daily__stat">
                            <div className="ranked-daily__stat-text">
                                Remains
                            </div>
                            <div className="ranked-daily__remainsRP">
                                {playerStats.UntilNextTier}
                                <span className="ranked-daily__RP-text">
                                    RP
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="ranked-daily__session">
                <div className="ranked-daily__block">
                    <h4 className="ranked-daily__block-title">
                        Earned/lost RP this match:
                    </h4>
                    <form className="ranked-daily__form" action="/">
                        <input
                            id="ri1"
                            type="number"
                            className="ranked-daily__input"
                            placeholder="Enter a number"
                            min={0}
                            max={500}
                            value={inputRP}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setInputRP(e.target.value)
                            }
                        />
                    </form>
                    <div className="ranked-daily__btn">
                        <button onClick={handleClick} className="apply-btn">
                            Apply
                        </button>
                    </div>
                </div>
                <div className="ranked-daily__block">
                    <h4 className="ranked-daily__block-title">
                        Matches played this session:
                    </h4>
                    <div className="ranked-daily__session-stats">
                        {matchesQTY[0]}
                        <span>Matches</span>
                    </div>
                </div>
                <div className="ranked-daily__block">
                    <h4 className="ranked-daily__block-title">
                        Earned/lost RP this session:
                    </h4>
                    <div className="ranked-daily__session-stats">
                        {ernLostRP}
                        <span>RP</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RankedDaily;
