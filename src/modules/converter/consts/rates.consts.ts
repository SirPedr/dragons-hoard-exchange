import type { Currencies } from '../types';

export const CONVERSION_RATES: { [index in Currencies]: number } = {
  copper: 1,
  silver: 10,
  electrum: 50,
  gold: 100,
  platinum: 1000,
};

export const DEFAULT_CURRENCY_VALUES = {
  copper: 0,
  silver: 0,
  electrum: 0,
  gold: 0,
  platinum: 0,
};
