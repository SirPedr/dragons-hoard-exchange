import type { LocationQueryRaw } from 'vue-router';
import type { CurrencyMap } from '../../types';
import { isValidNumber } from '../isValidNumber';

const ALLOWED_KEYS = ['copper', 'silver', 'electrum', 'gold', 'platinum'];

export const parseConversionQuery = (query: LocationQueryRaw) => {
  const queryKeys = Object.keys(query);
  const validKeys = queryKeys.filter((key) => ALLOWED_KEYS.includes(key));

  if (validKeys.length === 0) {
    return null;
  }

  const parsedQuery = validKeys.reduce((acc, key) => {
    return {
      ...acc,
      [key]: isValidNumber(query[key]) ? Number(query[key]) : 0,
    };
  }, {} as CurrencyMap);

  return parsedQuery;
};
