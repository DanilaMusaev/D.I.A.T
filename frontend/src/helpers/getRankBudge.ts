import type { RankBudgeKey } from "../data/rankedBudges";
import { isRankBudgetKey } from "../guards/isRankBudgeKey";
import type { PlayerStats } from "../utils/calculateStats/types";

export function getRankBudget(playerStats: PlayerStats): RankBudgeKey {
    const key =
        playerStats.curDiv === 'I'
            ? (`${playerStats.nextTier}${playerStats.nextDiv}`)
            : (`${playerStats.curTier}${playerStats.nextDiv}`);
    if (isRankBudgetKey(key)) {
        return key
    } else {
        return `${playerStats.nextTier}${playerStats.nextDiv}`;
    }
}
