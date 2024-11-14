import type { Currencies, CurrencyRates } from '../../types';

const CONVERSION_RATES: { [index in Currencies]: number } = {
  copper: 1,
  silver: 10,
  electrum: 50,
  gold: 100,
  platinum: 1000,
};

export const convertCurrencies = (currencies: CurrencyRates): CurrencyRates => {
  const totalSumInCopper = Object.entries(currencies).reduce(
    (currentSum, [currency, amount]) => {
      const conversionRate = CONVERSION_RATES[currency as keyof CurrencyRates];

      return currentSum + amount * conversionRate;
    },
    0,
  );

  return {
    copper: totalSumInCopper,
    silver: Math.floor(totalSumInCopper / CONVERSION_RATES.silver),
    gold: Math.floor(totalSumInCopper / CONVERSION_RATES.gold),
    platinum: Math.floor(totalSumInCopper / CONVERSION_RATES.platinum),
    electrum: Math.floor(totalSumInCopper / CONVERSION_RATES.electrum),
  };
};
