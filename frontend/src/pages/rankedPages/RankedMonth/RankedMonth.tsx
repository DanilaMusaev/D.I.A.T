import GotPTSDaily from './GotPTSDaily/GotPTSDaily';
import './rankedMonth.scss';
import StatPointLine from './StatPointLine/StatPointLine';
import { useRatingStore } from '../../../state/rating';
import { useEffect } from 'react';
import { useAuthState } from '../../../state/auth';

function RankedMonth() {
    // Данные из state
    const monthRating = useRatingStore((state) => state.monthData);
    // Actions из state
    const getMonthRating = useRatingStore((state) => state.getMonthRating);
    // state пользователя
    const user = useAuthState((state) => state.user);

    // Массив для генерации линий статистики
    const statPoints = Array.from(
        { length: (2200 - 0) / Math.abs(200) + 1 },
        (_, i) => 0 + i * 200
    );
    // Предзагрузка данных
    useEffect(() => {
        // Подгрузка данных
        getMonthRating(user.id);
    }, []);

    return (
        <div className="ranked-month">
            <div className="container">
                <div className="ranked-month__inner">
                    <div className="ranked-month__title">
                        <h2 className="title-2">
                            Statistics in the rating for the month:
                        </h2>
                    </div>
                    <div className="ranked-month__stats-table">
                        <div className="ranked-month__stat-points">
                            {statPoints.reverse().map((stat) => (
                                <StatPointLine key={stat} Points={stat} />
                            ))}
                        </div>
                        <div className="ranked-month__stat-lines">
                            {statPoints.map((_, i) => {
                                if (i === statPoints.length - 1) {
                                    return (
                                        <div
                                            key={i}
                                            className="ranked-month__stat-line ranked-month__stat-line--wide"
                                        ></div>
                                    );
                                } else {
                                    return (
                                        <div
                                            key={i}
                                            className="ranked-month__stat-line"
                                        ></div>
                                    );
                                }
                            })}
                        </div>
                        <div className="ranked-month__stat-gotPTS">
                            {monthRating.map((rankedDay) => (
                                <GotPTSDaily
                                    key={rankedDay.dayFrom}
                                    rankedPoints={rankedDay.ptsEarned}
                                    date={rankedDay.dayFrom}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RankedMonth;
