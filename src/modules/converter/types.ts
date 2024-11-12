export type Currencies = 'platinum' | 'gold' | 'electrum' | 'silver' | 'copper';

export type CurrencyRates = {
  [key in Currencies]: number;
};
