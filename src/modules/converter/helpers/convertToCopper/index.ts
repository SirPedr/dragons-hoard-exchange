import { CONVERSION_RATES } from '../../consts/rates.consts';
import type { CurrencyRates } from '../../types';

export const convertToCopper = (currencies: CurrencyRates): number => {
  const totalSumInCopper = Object.entries(currencies).reduce(
    (currentSum, [currency, amount]) => {
      const conversionRate = CONVERSION_RATES[currency as keyof CurrencyRates];

      return currentSum + amount * conversionRate;
    },
    0,
  );

  return totalSumInCopper;
};
