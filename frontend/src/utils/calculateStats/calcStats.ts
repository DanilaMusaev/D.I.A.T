import { RANK_TIERS } from './consts';
import { capitalizeFL, createInitialStats } from './someUtils';
import type { Division, PlayerStats, TierData, TierName } from './types';

export function calcPlayerStats(rankedRP: number): PlayerStats {
    const stats = createInitialStats();
    const tiers = Object.entries(RANK_TIERS) as [TierName, TierData][];

    outerLoop: for (const [tierName, divisions] of tiers) {
        const divisionEntries = Object.entries(divisions) as [
            Division,
            number
        ][];

        for (const [division, rpValue] of divisionEntries) {
            if (rankedRP < rpValue) {
                stats.UntilNextDivRP = rpValue - rankedRP;
                stats.nextDiv = division;
                stats.nextTier = capitalizeFL(tierName);

                // Используем метод detectNextTier
                if (stats.curTier.toLowerCase() === tierName) {
                    stats.nextTier = stats.detectNextTier(tierName);
                }

                stats.UntilNextTier =
                    RANK_TIERS[stats.nextTier.toLowerCase() as TierName].IV -
                    rankedRP;
                break outerLoop;
            } else {
                stats.curTier = capitalizeFL(tierName);
                stats.curDiv = division;
            }
        }
    }

    return stats;
}
