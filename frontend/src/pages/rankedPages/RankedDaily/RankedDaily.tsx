import { useState, useEffect, type ChangeEvent, type MouseEvent } from 'react';
import { RANK_BUDGES_OBJ } from '../../../data/rankedBudges';
import { calcPlayerStats } from '../../../utils/calculateStats/calcStats';
import type { PlayerStats } from '../../../utils/calculateStats/types';
import './rankedDaily.scss';
import { getRankBudget } from '../../../helpers/getRankBudge';
import { createInitialStats } from '../../../utils/calculateStats/someUtils';
import RatingService from '../../../api/RatingService';

function RankedDaily() {
    const [currentRP, setCurrentRP] = useState(0);
    const [matchesQTY, setMatchesQTY] = useState<number[]>([0, 0]);
    const [ernLostRP, setErnLostRP] = useState(0);
    const [playerStats, setPlayerStats] = useState<PlayerStats>(
        createInitialStats()
    );
    const [inputRP, setInputRP] = useState<string>('');

    function handleClick(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        console.log(RatingService.getCurrentRating(1));
        // const inputValue = Number(inputRP.current.value) + Number(currentRP);
        // setMatchesQTY((currArr) => {
        //     return [currArr[0] + 1, currArr[1] + 1];
        // });
        // const data = {
        //     currRP: inputValue,
        //     totalMatches: Number(matchesQTY[1] + 1),
        // };
        // const requestOptions = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data),
        // };
        // fetch('http://localhost:8000/api/update_rankedRP', requestOptions).then(
        //     () => console.log('RP was rewrite')
        // );
        // setCurrentRP(inputValue);
        // setPlayerStats(calcPlayerStats(inputValue));
        // setErnLostRP(
        //     (current) => Number(current) + Number(inputRP.current.value)
        // );
    }

    useEffect(() => {
        // fetch('http://localhost:8000/api/ranked-rp')
        //     .then((res) => res.json())
        //     .then((result) => {
        //         setCurrentRP(result.currRP);
        //         setPlayerStats(calcPlayerStats(result.currRP));
        //         setMatchesQTY((currArr) => {
        //             return [currArr[0], result.totalMatches];
        //         });
        //         console.log(result);
        //     });
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
