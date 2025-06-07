import { useNavigate } from 'react-router';
import GamblingCard from '../../../components/GamblingCard/GamblingCard';
import data from '../../../data/gamblingCardInfo.ts';
import './gamblingPage.scss';

function GamblingPage() {
    const navigate = useNavigate();

    return (
        <section className="gambling">
            <div className="container">
                <div className="gambling__inner">
                    <div className="gambling__title">
                        <h2 className="title-1">The Choice Is Yours...</h2>
                    </div>
                    <div className="gambling__cards">
                        {data.map((cardData) => (
                            <GamblingCard
                                key={cardData.id}
                                nameMode={cardData.gameMode}
                                imagePath={cardData.pathToImg}
                                onClick={() =>
                                    navigate(cardData.gamblingPagePath)
                                }
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default GamblingPage;
