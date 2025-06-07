import BackBtn from '../../../components/BackBtn/BackBtn';
import GambleBtn from '../../../components/GambleBtn/GambleBtn';
import GambleCharacter from '../../../components/GambleCharacter/GambleCharacter';
import NoGambleYet from '../../../components/NoGambleYet/NoGambleYet';
import data from '../../../data/gamblingCharacter';
import type { Character } from '../../../data/gamblingCharacter';
import '../gambleSDTPage.scss';
import { useGambleStates } from '../../../hooks/gambleStates';

function GambleSolosPage() {
    const [isGamble, character, clickToGamble] = useGambleStates<Character>(
        1,
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
                                    Character you’re playing:
                                </h2>
                            </div>
                            <div className="gambling-solos__characters">
                                {!Array.isArray(character) && (
                                    <GambleCharacter character={character} />
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

export default GambleSolosPage;
