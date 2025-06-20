import type { MonthRatingFromApi } from '../api/types/api-types';

export function ConvertMonthRatingData(APIData: MonthRatingFromApi[]) {
    return APIData.map((data) => ({
        dayFrom: new Date(data.dayfrom)
            .toISOString()
            .split('T')[0]
            .slice(5)
            .replace('-', '.'),
        ptsEarned: Number(data.ptsearned),
    }));
}
