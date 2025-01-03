export type Currencies = 'platinum' | 'gold' | 'electrum' | 'silver' | 'copper';

export type CurrencyMap = {
  [key in Currencies]: number;
};

export type CurrencyDistribution = Array<{
  amountOfPlayers: number;
  currencies: CurrencyMap;
}>;
