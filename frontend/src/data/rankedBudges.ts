import rkIV from './../assets/img/tiers-ranks-AL/Rookie-rank-IV.png';
import rkIII from './../assets/img/tiers-ranks-AL/Rookie-rank-III.png';
import rkII from './../assets/img/tiers-ranks-AL/Rookie-rank-II.png';
import rkI from './../assets/img/tiers-ranks-AL/Rookie-rank-I.png';

import bzIV from './../assets/img/tiers-ranks-AL/Bronze-rank-IV.png';
import bzIII from './../assets/img/tiers-ranks-AL/Bronze-rank-III.png';
import bzII from './../assets/img/tiers-ranks-AL/Bronze-rank-II.png';
import bzI from './../assets/img/tiers-ranks-AL/Bronze-rank-I.png';

import slIV from './../assets/img/tiers-ranks-AL/Silver-rank-IV.png';
import slIII from './../assets/img/tiers-ranks-AL/Silver-rank-III.png';
import slII from './../assets/img/tiers-ranks-AL/Silver-rank-II.png';
import slI from './../assets/img/tiers-ranks-AL/Silver-rank-I.png';

import glIV from './../assets/img/tiers-ranks-AL/Gold-rank-IV.png';
import glIII from './../assets/img/tiers-ranks-AL/Gold-rank-III.png';
import glII from './../assets/img/tiers-ranks-AL/Gold-rank-II.png';
import glI from './../assets/img/tiers-ranks-AL/Gold-rank-I.png';

import plIV from './../assets/img/tiers-ranks-AL/Platinum-rank-IV.png';
import plIII from './../assets/img/tiers-ranks-AL/Platinum-rank-III.png';
import plII from './../assets/img/tiers-ranks-AL/Platinum-rank-II.png';
import plI from './../assets/img/tiers-ranks-AL/Platinum-rank-I.png';

import dmIV from './../assets/img/tiers-ranks-AL/Diamond-rank-IV.png';
import dmIII from './../assets/img/tiers-ranks-AL/Diamond-rank-III.png';
import dmII from './../assets/img/tiers-ranks-AL/Diamond-rank-II.png';
import dmI from './../assets/img/tiers-ranks-AL/Diamond-rank-I.png';

import ms from './../assets/img/tiers-ranks-AL/Master-rank.png';
import pr from './../assets/img/tiers-ranks-AL/Predator-rank.png';
import type { CapitalizeTier, Division } from '../utils/calculateStats/types';

export type RankBudgeKey = `${CapitalizeTier}${Division}`;

export const RANK_BUDGES_OBJ: Record<RankBudgeKey, string> = {
    RookieIV: rkIV,
    RookieIII: rkIII,
    RookieII: rkII,
    RookieI: rkI,
    BronzeIV: bzIV,
    BronzeIII: bzIII,
    BronzeII: bzII,
    BronzeI: bzI,
    SilverIV: slIV,
    SilverIII: slIII,
    SilverII: slII,
    SilverI: slI,
    GoldIV: glIV,
    GoldIII: glIII,
    GoldII: glII,
    GoldI: glI,
    PlatinumIV: plIV,
    PlatinumIII: plIII,
    PlatinumII: plII,
    PlatinumI: plI,
    DiamondIV: dmIV,
    DiamondIII: dmIII,
    DiamondII: dmII,
    DiamondI: dmI,
    MasterIV: ms,
    MasterIII: ms,
    MasterII: ms,
    MasterI: ms,
    PredatorIV: pr,
    PredatorIII: pr,
    PredatorII: pr,
    PredatorI: pr,
};
