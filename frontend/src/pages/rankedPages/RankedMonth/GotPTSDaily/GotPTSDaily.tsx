import './GotPTSDaily.scss';

interface GotPTSDailyProps {
    rankedPoints: number;
    date: string;
}

function GotPTSDaily({ rankedPoints, date }: GotPTSDailyProps) {
    return (
        <div className="ranked-month__stat-gotPTS-daily">
            <div className="ranked-month__stat-gotPTS-daily-RP">
                {rankedPoints} <span>RP</span>
            </div>
            <div
                style={{ height: `calc(0.23 * ${rankedPoints}px)` }}
                className="ranked-month__stat-gotPTS-daily-rectangle"
            ></div>
            <div className="ranked-month__stat-gotPTS-daily-date">{date}</div>
        </div>
    );
}

export default GotPTSDaily;
