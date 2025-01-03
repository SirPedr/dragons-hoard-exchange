import { describe, it, expect } from 'vitest';
import { parseCopper } from './index';
import type { CurrencyMap } from '../../types';

describe('parseCopper', () => {
  it('should correctly parse copper amount into all currencies', () => {
    const copperAmount = 9876;
    const expected: CurrencyMap = {
      platinum: 9,
      gold: 8,
      electrum: 1,
      silver: 2,
      copper: 6,
    };

    const result = parseCopper(copperAmount);

    expect(result).toEqual(expected);
  });

  it('should correctly parse copper amount into currencies without electrum', () => {
    const copperAmount = 9876;
    const expected: CurrencyMap = {
      platinum: 9,
      gold: 8,
      electrum: 0,
      silver: 7,
      copper: 6,
    };

    const result = parseCopper(copperAmount, { ignoreElectrum: true });

    expect(result).toEqual(expected);
  });

  it('should return zero for all currencies if copper amount is zero', () => {
    const copperAmount = 0;
    const expected: CurrencyMap = {
      platinum: 0,
      gold: 0,
      electrum: 0,
      silver: 0,
      copper: 0,
    };

    const result = parseCopper(copperAmount);

    expect(result).toEqual(expected);
  });

  it('should handle negative copper amounts', () => {
    const copperAmount = -100;
    const expected: CurrencyMap = {
      platinum: 0,
      gold: 0,
      electrum: 0,
      silver: 0,
      copper: 0,
    };

    const result = parseCopper(copperAmount);

    expect(result).toEqual(expected);
  });
});
