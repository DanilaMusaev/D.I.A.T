import './gamblingCard.scss';

interface GamblingCardProps {
    nameMode: string;
    imagePath: string,
    onClick: VoidFunction
}

function GamblingCard({ nameMode, imagePath, onClick }: GamblingCardProps) {
    const bgStyle = {
        background: `linear-gradient( 0deg, rgba(50, 50, 50, 0.85), rgba(50, 50, 50, 0.85)), url(${imagePath})`,
        backgroundPosition: `20%`,
        backgroundSize: `cover`,
        backgroundRepeat: `no-repeat`,
    };
    return (
        <article onClick={onClick} style={bgStyle} className="gambling-card">
            <div className="gambling-card__name">
                Apex
                <span className="gambling-card__withLines">Legends</span>
                <span className="gambling-card__mode">{nameMode}</span>
            </div>
        </article>
    );
}

export default GamblingCard;
