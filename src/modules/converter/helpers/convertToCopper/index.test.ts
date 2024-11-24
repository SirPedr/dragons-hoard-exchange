import { describe, expect, it } from 'vitest';
import type { CurrencyMap } from '../../types';
import { convertToCopper } from './index';

describe('convertToCopper', () => {
  it('should return 0 when all currencies are zero', () => {
    const currencies: CurrencyMap = {
      copper: 0,
      silver: 0,
      electrum: 0,
      gold: 0,
      platinum: 0,
    };

    expect(convertToCopper(currencies)).toBe(0);
  });

  it('should return correct value when only copper is non-zero', () => {
    const currencies: CurrencyMap = {
      copper: 100,
      silver: 0,
      electrum: 0,
      gold: 0,
      platinum: 0,
    };

    expect(convertToCopper(currencies)).toBe(100);
  });

  it('should return correct value when all currencies are non-zero', () => {
    const currencies: CurrencyMap = {
      copper: 50,
      silver: 20,
      electrum: 10,
      gold: 5,
      platinum: 2,
    };

    expect(convertToCopper(currencies)).toBe(3_250);
  });
});
