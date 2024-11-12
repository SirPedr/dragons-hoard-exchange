import { describe, expect, it } from 'vitest';
import { convertCurrencies } from '.';

describe('convertCurrencies', () => {
  it('should return 0 when total amount to convert is 0', () => {
    expect(convertCurrencies({ copper: 0, silver: 0, gold: 0, platinum: 0, electrum: 0 })).toEqual({
      copper: 0,
      silver: 0,
      gold: 0,
      platinum: 0,
      electrum: 0,
    });
  });

  it('should convert correct amount of copper', () => {
    expect(convertCurrencies({ copper: 1, silver: 0, gold: 0, platinum: 0, electrum: 0 })).toEqual({
      copper: 1,
      silver: 0,
      gold: 0,
      platinum: 0,
      electrum: 0,
    });
  });

  it('should convert correct amount of silver', () => {
    expect(convertCurrencies({ copper: 0, silver: 1, gold: 0, platinum: 0, electrum: 0 })).toEqual({
      copper: 10,
      silver: 1,
      gold: 0,
      platinum: 0,
      electrum: 0,
    });
  });

  it('should convert correct amount of gold', () => {
    expect(convertCurrencies({ copper: 0, silver: 0, gold: 1, platinum: 0, electrum: 0 })).toEqual({
      copper: 100,
      silver: 10,
      electrum: 2,
      gold: 1,
      platinum: 0,
    });
  });

  it('should convert correct amount of platinum', () => {
    expect(convertCurrencies({ copper: 0, silver: 0, gold: 0, platinum: 1, electrum: 0 })).toEqual({
      copper: 1000,
      silver: 100,
      electrum: 20,
      gold: 10,
      platinum: 1,
    });
  });

  it('should convert correct amount of electrum', () => {
    expect(convertCurrencies({ copper: 0, silver: 0, gold: 0, platinum: 0, electrum: 1 })).toEqual({
      copper: 50,
      silver: 5,
      electrum: 1,
      gold: 0,
      platinum: 0,
    });
  });

  it('should convert mixed currencies correctly', () => {
    expect(convertCurrencies({ copper: 5, silver: 3, gold: 2, platinum: 1, electrum: 4 })).toEqual({
      copper: 1435,
      silver: 143,
      electrum: 28,
      gold: 14,
      platinum: 1,
    });
  });
});
