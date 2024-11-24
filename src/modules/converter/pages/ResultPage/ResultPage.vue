<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { distributeCurrencies } from '../../helpers/distributeCurrencies';
import { parseConversionQuery } from '../../helpers/parseConversionQuery';
import { DEFAULT_CURRENCY_VALUES } from '../../consts/rates.consts';

const route = useRoute();
const router = useRouter();

const parsed = parseConversionQuery(route.query);

if (!parsed) {
  router.replace({ name: 'home' });
}

const distributedCurrencies = distributeCurrencies(
  parsed ?? DEFAULT_CURRENCY_VALUES,
  { ignoreElectrum: route.query.excludeElectrum === 'true' },
);
</script>

<template>
  <h1>Optimal distribution</h1>
  <p>Copper {{ distributedCurrencies.copper }}</p>
  <p>Silver {{ distributedCurrencies.silver }}</p>
  <p>Electrum {{ distributedCurrencies.electrum }}</p>
  <p>Gold {{ distributedCurrencies.gold }}</p>
  <p>Platinum {{ distributedCurrencies.platinum }}</p>
</template>
