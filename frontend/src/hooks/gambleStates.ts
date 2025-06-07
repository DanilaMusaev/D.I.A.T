import { useState } from 'react';
import { shuffleArray } from '../utils/shuffleArray';

// Тип литеральных строк для состояния
type isGambleType = 'no-gamble' | 'gamble';

export function useGambleStates<T>(
    count: 1 | 2 | 3,
    data: T[]
): [isGambleType, T, VoidFunction] | [isGambleType, T[], VoidFunction] {
    // Состояние, показывающее, была ли предпринята попытка прокрутки персонажа
    const [isGamble, setIsGamble] = useState<isGambleType>('no-gamble');
    if (count === 1) {
        // Состояние, отвечающее за выпавшего персонажа
        const [character, setCharacter] = useState<T>({} as T);

        // Функция, меняющая состояния прокрутки и персонажа
        function clickToGamble() {
            // Сменяем состояние на gamble(Что персонаж уже был как минимум один раз про-gamble'н)
            setIsGamble('gamble');
            // Шафлим массив для gamble персонажа
            const chrNumber = shuffleArray(count);
            // Проверяем различные ситуации
            if (count === 1 && !Array.isArray(chrNumber)) {
                setCharacter(data[chrNumber]);
            }
        }

        return [isGamble, character, clickToGamble];
    } else if (count === 2) {
        const [character, setCharacter] = useState<T[]>([]);

        // Функция, меняющая состояния прокрутки и персонажа
        function clickToGamble() {
            // Сменяем состояние на gamble(Что персонаж уже был как минимум один раз про-gamble'н)
            setIsGamble('gamble');
            // Шафлим массив для gamble персонажа
            const chrNumber = shuffleArray(count);
            // Проверяем различные ситуации
            if (
                count === 2 &&
                Array.isArray(chrNumber) &&
                chrNumber.length === 2
            ) {
                setCharacter([data[chrNumber[0]], data[chrNumber[1]]]);
            }
        }

        return [isGamble, character, clickToGamble];
    } else {
        const [character, setCharacter] = useState<T[]>([]);

        // Функция, меняющая состояния прокрутки и персонажа
        function clickToGamble() {
            // Сменяем состояние на gamble(Что персонаж уже был как минимум один раз про-gamble'н)
            setIsGamble('gamble');
            // Шафлим массив для gamble персонажа
            const chrNumber = shuffleArray(count);
            // Проверяем различные ситуации
            if (
                count === 3 &&
                Array.isArray(chrNumber) &&
                chrNumber.length === 3
            ) {
                setCharacter([
                    data[chrNumber[0]],
                    data[chrNumber[1]],
                    data[chrNumber[2]],
                ]);
            }
        }

        return [isGamble, character, clickToGamble];
    }
}
