interface StatPointLineProps {
    Points: number;
}

function StatPointLine({ Points }: StatPointLineProps) {
    return <div className="ranked-month__stat-point">{Points}</div>;
}

export default StatPointLine;
