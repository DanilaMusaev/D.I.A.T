import { useState } from 'react';
import { RANK_BUDGES_OBJ } from '../../../data/rankedBudges';
import Select from '../../../components/Select/Select';
import './rankedSeasons.scss';

function RankedSeasons() {
    const [selectedValue, setSelectedValue] = useState<string>('option1');

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
                        <div className="ranked-seasons_statValue">241</div>
                    </div>
                    <div className="ranked-seasons_stat">
                        <h3 className="ranked-seasons_statTitle">
                            MATCHES IN THE PLUS
                        </h3>
                        <div className="ranked-seasons_statValue">140</div>
                    </div>
                    <div className="ranked-seasons_stat">
                        <h3 className="ranked-seasons_statTitle">
                            MATCHES IN THE MINUS
                        </h3>
                        <div className="ranked-seasons_statValue">101</div>
                    </div>
                </div>
                <div className="ranked-seasons_splits">
                    <div className="ranked-seasons_split">
                        <div className="ranked-seasons_splitName">Split 1</div>
                        <img
                            src={RANK_BUDGES_OBJ['PlatinumIII']}
                            className="ranked-seasons_splitBudge"
                            alt="rank"
                        />
                        <div className="ranked-seasons_splitRank">
                            Platinum III
                        </div>
                    </div>
                    <div className="ranked-seasons_split">
                        <div className="ranked-seasons_splitName">Split 2</div>
                        <img
                            src={RANK_BUDGES_OBJ['DiamondIV']}
                            className="ranked-seasons_splitBudge"
                            alt="rank"
                        />
                        <div className="ranked-seasons_splitRank">
                            Diamond IV
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RankedSeasons;
