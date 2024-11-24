import { CONVERSION_RATES } from '../../consts/rates.consts';
import type { Currencies, CurrencyMap } from '../../types';
import { convertToCopper } from '../convertToCopper';

const allCurrencies: Currencies[] = [
  'platinum',
  'gold',
  'electrum',
  'silver',
  'copper',
];

const currenciesWithoutElectrum: Currencies[] = [
  'platinum',
  'gold',
  'silver',
  'copper',
];

type Options = {
  ignoreElectrum: boolean;
};

const DEFAULT_OPTIONS: Options = {
  ignoreElectrum: false,
};

export const distributeCurrencies = (
  toConvert: CurrencyMap,
  options: Options = DEFAULT_OPTIONS,
) => {
  const { ignoreElectrum } = options;
  const totalInCopper = convertToCopper(toConvert);

  let remainingCopper = totalInCopper;

  const currenciesToConsider = ignoreElectrum
    ? currenciesWithoutElectrum
    : allCurrencies;

  const optimalDistribution: CurrencyMap = {
    platinum: 0,
    gold: 0,
    electrum: 0,
    silver: 0,
    copper: 0,
  };

  for (const currency of currenciesToConsider) {
    const rate = CONVERSION_RATES[currency];
    const value = Math.floor(remainingCopper / rate);

    optimalDistribution[currency] = value;
    remainingCopper -= value * rate;
  }

  return optimalDistribution;
};
