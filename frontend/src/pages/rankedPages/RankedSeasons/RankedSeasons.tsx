import { useEffect, useState } from 'react';
import { RANK_BUDGES_OBJ } from '../../../data/rankedBudges';
import Select from '../../../components/Select/Select';
import './rankedSeasons.scss';
import { useRatingStore } from '../../../state/rating';
import { useAuthState } from '../../../state/auth';

function RankedSeasons() {
    // Состояния из state
    const seasonsData = useRatingStore((state) => state.seasonsData);
    const firstHalfData = useRatingStore((state) => state.firstSplitStats);
    const secondHalfData = useRatingStore((state) => state.secondSplitStats);
    const getSeasonsRating = useRatingStore((state) => state.getSeasonRating);
    // state пользователя
    const user = useAuthState((state) => state.user);
    // Состояние для селекта
    const [selectedValue, setSelectedValue] = useState<string>('option1');

    useEffect(() => {
        // Получение данных
        getSeasonsRating(user.id);
    }, []);

    const options = [
        { itemText: 'Season 25', itemValue: 's25' },
        { itemText: 'Season 24', itemValue: 's24' },
        { itemText: 'Season 23', itemValue: 's23' },
    ];

    return (
        <div className="ranked-seasons">
            <Select
                options={options}
                value={selectedValue}
                onChange={(value) => setSelectedValue(value)}
                style={{
                    width: 560,
                }}
            />
            <div className="ranked-seasons_rankStats">
                <div className="ranked-seasons_stats">
                    <div className="ranked-seasons_stat">
                        <h3 className="ranked-seasons_statTitle">
                            TOTAL MATCHES
                        </h3>
                        <div className="ranked-seasons_statValue">
                            {seasonsData.negative_count +
                                seasonsData.positive_count}
                        </div>
                    </div>
                    <div className="ranked-seasons_stat">
                        <h3 className="ranked-seasons_statTitle">
                            MATCHES IN THE PLUS
                        </h3>
                        <div className="ranked-seasons_statValue">
                            {seasonsData.positive_count}
                        </div>
                    </div>
                    <div className="ranked-seasons_stat">
                        <h3 className="ranked-seasons_statTitle">
                            MATCHES IN THE MINUS
                        </h3>
                        <div className="ranked-seasons_statValue">
                            {seasonsData.negative_count}
                        </div>
                    </div>
                </div>
                <div className="ranked-seasons_splits">
                    <div className="ranked-seasons_split">
                        <div className="ranked-seasons_splitName">Split 1</div>
                        <img
                            src={
                                RANK_BUDGES_OBJ[
                                    `${firstHalfData.curTier}${firstHalfData.curDiv}`
                                ]
                            }
                            className="ranked-seasons_splitBudge"
                            alt="rank"
                        />
                        <div className="ranked-seasons_splitRank">
                            {`${firstHalfData.curTier} ${firstHalfData.curDiv}`}
                        </div>
                    </div>
                    <div className="ranked-seasons_split">
                        <div className="ranked-seasons_splitName">Split 2</div>
                        <img
                            src={
                                RANK_BUDGES_OBJ[
                                    `${secondHalfData.curTier}${secondHalfData.curDiv}`
                                ]
                            }
                            className="ranked-seasons_splitBudge"
                            alt="rank"
                        />
                        <div className="ranked-seasons_splitRank">
                            {`${secondHalfData.curTier} ${secondHalfData.curDiv}`}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RankedSeasons;
