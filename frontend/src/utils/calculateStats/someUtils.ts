import type { CapitalizeLiterals } from '../utilityTypes/CapitalizeLiterals';
import { RANK_TIERS } from './consts';
import type { PlayerStats, TierName } from './types';

export const capitalizeFL = <S extends string>(str: S): CapitalizeLiterals<S> =>
    str.charAt(0).toUpperCase() + str.slice(1) as CapitalizeLiterals<S>;

export function createInitialStats(): PlayerStats {
    return {
        UntilNextDivRP: 0,
        UntilNextTier: 0,
        curTier: 'Rookie',
        curDiv: 'IV',
        nextDiv: 'IV',
        nextTier: 'Bronze',
        detectNextTier(currentTier: TierName) {
            const tierNames = Object.keys(RANK_TIERS) as TierName[];
            const currentIndex = tierNames.indexOf(currentTier);

            if (currentIndex === -1 || currentIndex === tierNames.length - 1) {
                return this.nextTier;
            }

            return capitalizeFL(tierNames[currentIndex + 1]);
        },
    };
}
