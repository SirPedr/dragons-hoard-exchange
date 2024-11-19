import { describe, expect, it } from 'vitest';
import { distributeCurrencies } from '.';
import { convertToCopper } from '../convertToCopper';

describe('distributeCurrencies', () => {
  it('should return 0 if amount is 0', () => {
    expect(
      distributeCurrencies({
        copper: 0,
        silver: 0,
        electrum: 0,
        gold: 0,
        platinum: 0,
      }),
    ).toEqual({
      copper: 0,
      silver: 0,
      electrum: 0,
      gold: 0,
      platinum: 0,
    });
  });

  it('should handle conversion with only copper', () => {
    expect(
      distributeCurrencies({
        copper: 12345,
        silver: 0,
        electrum: 0,
        gold: 0,
        platinum: 0,
      }),
    ).toEqual({
      copper: 5,
      silver: 4,
      electrum: 0,
      gold: 3,
      platinum: 12,
    });
  });

  it('should handle conversion with mixed currencies', () => {
    expect(
      distributeCurrencies({
        copper: 100,
        silver: 200,
        electrum: 300,
        gold: 400,
        platinum: 500,
      }),
    ).toEqual({
      copper: 0,
      silver: 0,
      electrum: 0,
      gold: 1,
      platinum: 557,
    });
  });

  it('should ignore electrum pieces when told to', () => {
    expect(
      distributeCurrencies(
        {
          copper: 60,
          silver: 0,
          electrum: 0,
          gold: 0,
          platinum: 0,
        },
        { ignoreElectrum: true },
      ),
    ).toEqual({
      copper: 0,
      silver: 6,
      electrum: 0,
      gold: 0,
      platinum: 0,
    });
  });
});
