export const RANK_TIERS = {
    rookie: { IV: 0, III: 250, II: 500, I: 750 },
    bronze: { IV: 1000, III: 1500, II: 2000, I: 2500 },
    silver: { IV: 3000, III: 3600, II: 4200, I: 4800 },
    gold: { IV: 5400, III: 6100, II: 6800, I: 7500 },
    platinum: { IV: 8200, III: 9000, II: 9800, I: 10600 },
    diamond: { IV: 11400, III: 12300, II: 13200, I: 14100 },
    master: { IV: 15000 },
    predator: { IV: 17779 },
} as const;
