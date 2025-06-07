import BackBtn from '../../../components/BackBtn/BackBtn';
import NoGambleYet from '../../../components/NoGambleYet/NoGambleYet';
import GambleCharacter from '../../../components/GambleCharacter/GambleCharacter';
import type { Character } from '../../../data/gamblingCharacter';
import data from '../../../data/gamblingCharacter';
import { useGambleStates } from '../../../hooks/gambleStates';
import GambleBtn from '../../../components/GambleBtn/GambleBtn';
import '../gambleSDTPage.scss';

function GambleDuosPage() {
    const [isGamble, character, clickToGamble] = useGambleStates<Character>(
        2,
        data
    );

    return (
        <section className="gambling-solos">
            <div className="container">
                <div className="gambling-solos__inner">
                    <div className="gambling-solos__back-btn">
                        <BackBtn />
                    </div>
                    {isGamble === 'no-gamble' && <NoGambleYet />}
                    {isGamble === 'gamble' && (
                        <>
                            <div className="gambling-solos__title">
                                <h2 className="title-2">
                                    Character's you’re playing:{' '}
                                </h2>
                            </div>
                            <div className="gambling-solos__characters">
                                {Array.isArray(character) && (
                                    <>
                                        <GambleCharacter
                                            character={character[0]}
                                        />
                                        <GambleCharacter
                                            character={character[1]}
                                        />
                                    </>
                                )}
                            </div>
                        </>
                    )}
                    <div className="gambling-solos__gamble-btn">
                        <GambleBtn onClick={() => clickToGamble()} />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default GambleDuosPage;
