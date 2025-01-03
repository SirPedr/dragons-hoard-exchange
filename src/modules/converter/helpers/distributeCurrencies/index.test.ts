import { describe, it, expect } from 'vitest';
import { distributeCurrencies } from './index';
import type { CurrencyMap } from '../../types';

describe('distributeCurrencies', () => {
  it('should distribute currencies evenly among party members', () => {
    const toConvert: CurrencyMap = {
      platinum: 0,
      gold: 10,
      electrum: 0,
      silver: 5,
      copper: 15,
    };
    const options = { partySize: 5 };

    const result = distributeCurrencies(toConvert, options);

    expect(result).toEqual([
      {
        amountOfPlayers: 5,
        currencies: { platinum: 0, gold: 2, electrum: 0, silver: 1, copper: 3 },
      },
    ]);
  });

  it('should handle remaining copper correctly', () => {
    const toConvert: CurrencyMap = {
      platinum: 0,
      gold: 10,
      electrum: 0,
      silver: 5,
      copper: 17,
    };
    const options = { partySize: 5 };

    const result = distributeCurrencies(toConvert, options);

    expect(result).toEqual([
      {
        amountOfPlayers: 2,
        currencies: { platinum: 0, gold: 2, electrum: 0, silver: 1, copper: 4 },
      },
      {
        amountOfPlayers: 3,
        currencies: { platinum: 0, gold: 2, electrum: 0, silver: 1, copper: 3 },
      },
    ]);
  });

  it('should use default party size if not provided', () => {
    const toConvert: CurrencyMap = {
      platinum: 0,
      gold: 10,
      electrum: 0,
      silver: 5,
      copper: 15,
    };

    const result = distributeCurrencies(toConvert);

    expect(result).toEqual([
      {
        amountOfPlayers: 1,
        currencies: { platinum: 1, electrum: 1, gold: 0, silver: 1, copper: 5 },
      },
    ]);
  });

  it('should return an zero valued array if no currencies are provided', () => {
    const toConvert: CurrencyMap = {
      platinum: 0,
      gold: 0,
      electrum: 0,
      silver: 0,
      copper: 0,
    };
    const options = { partySize: 5 };

    const result = distributeCurrencies(toConvert, options);

    expect(result).toEqual([
      {
        amountOfPlayers: 5,
        currencies: {
          platinum: 0,
          gold: 0,
          electrum: 0,
          silver: 0,
          copper: 0,
        },
      },
    ]);
  });
});
