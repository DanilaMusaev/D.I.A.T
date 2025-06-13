import { RANK_BUDGES_OBJ, type RankBudgeKey } from '../data/rankedBudges';

export function isRankBudgetKey(key: string): key is RankBudgeKey {
    return key in RANK_BUDGES_OBJ;
}
