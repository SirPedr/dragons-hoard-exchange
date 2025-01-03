import type { CurrencyDistribution, CurrencyMap } from '../../types';
import { convertToCopper } from '../convertToCopper';
import {
  parseCopper,
  type Options as ParseCopperOptions,
} from '../parseCopper';

type Options = {
  partySize: number;
} & ParseCopperOptions;

const DEFAULT_OPTIONS: Options = {
  partySize: 1,
  ignoreElectrum: false,
};

export const distributeCurrencies = (
  toConvert: CurrencyMap,
  options: Partial<Options> = DEFAULT_OPTIONS,
): CurrencyDistribution => {
  const resolvedOptions = { ...DEFAULT_OPTIONS, ...options };
  const { partySize, ...parseCopperOptions } = resolvedOptions;
  const totalInCopper = convertToCopper(toConvert);

  const copperPerPlayer = Math.floor(totalInCopper / partySize);
  const remainingCopper = totalInCopper % partySize;

  const distribution = Array.from({ length: partySize }, () => copperPerPlayer);

  for (let i = 0; i < remainingCopper; i++) {
    distribution[i]++;
  }

  const currencyDistributionMap = new Map<number, number>();

  distribution.forEach((copperPerPlayer) => {
    const amountOfPlayersWithCurrency =
      currencyDistributionMap.get(copperPerPlayer) ?? 0;

    currencyDistributionMap.set(
      copperPerPlayer,
      amountOfPlayersWithCurrency + 1,
    );
  });

  return Array.from(currencyDistributionMap.entries()).map(
    ([copperPerPlayer, amountOfPlayers]) => ({
      amountOfPlayers,
      currencies: parseCopper(copperPerPlayer, parseCopperOptions),
    }),
  );
};
