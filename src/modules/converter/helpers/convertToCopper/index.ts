import { CONVERSION_RATES } from '../../consts/rates.consts';
import type { CurrencyMap } from '../../types';

export const convertToCopper = (currencies: CurrencyMap): number => {
  const totalSumInCopper = Object.entries(currencies).reduce(
    (currentSum, [currency, amount]) => {
      const conversionRate = CONVERSION_RATES[currency as keyof CurrencyMap];

      return currentSum + amount * conversionRate;
    },
    0,
  );

  return totalSumInCopper;
};
