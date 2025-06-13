import type { CapitalizeLiterals } from "../utilityTypes/CapitalizeLiterals";

export type Division = 'IV' | 'III' | 'II' | 'I';
export type TierName =
    | 'rookie'
    | 'bronze'
    | 'silver'
    | 'gold'
    | 'platinum'
    | 'diamond'
    | 'master'
    | 'predator';

export type CapitalizeTier = CapitalizeLiterals<TierName>;

export interface TierData {
    IV: number;
    III?: number;
    II?: number;
    I?: number;
}

export interface PlayerStats {
    UntilNextDivRP: number;
    UntilNextTier: number;
    curTier: CapitalizeTier;
    curDiv: Division;
    nextDiv: Division;
    nextTier: CapitalizeTier;
    detectNextTier: (currentTier: TierName) => CapitalizeTier;
}
