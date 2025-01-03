import type { CurrencyMap } from '../../types';

const listFormatter = new Intl.ListFormat('en-US', {
  type: 'conjunction',
  style: 'long',
});

export const createCurrencyList = (currencies: CurrencyMap) => {
  const currenciesSentences = Object.entries(currencies)
    .filter(([, amount]) => amount > 0)
    .map(([currencyName, amount]) => `${amount} ${currencyName}`);

  return listFormatter.format(currenciesSentences);
};
