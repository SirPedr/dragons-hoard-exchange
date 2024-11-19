import type { Currencies } from '../types';

export const CONVERSION_RATES: { [index in Currencies]: number } = {
  copper: 1,
  silver: 10,
  electrum: 50,
  gold: 100,
  platinum: 1000,
};
