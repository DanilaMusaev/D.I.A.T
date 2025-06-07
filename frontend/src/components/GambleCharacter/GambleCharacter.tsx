import { type Character } from '../../data/gamblingCharacter';
import './gambleCharacter.scss';

/**
 * Тип пропсов для компоненты с выпавшим персонажем
 */
interface GambleCharacterProps {
    character: Character;
}

/**
 * Компонент отображающий выпавшего персонажа
 */
function GambleCharacter({ character }: GambleCharacterProps) {
    return (
        <div className="gambleCharacter">
            <img
                className="gambleCharacter__picture"
                src={character.pathToImg}
                alt=""
            />
            <p className="gambleCharacter__character-name">
                {character.characterName}
            </p>
        </div>
    );
}

export default GambleCharacter;
