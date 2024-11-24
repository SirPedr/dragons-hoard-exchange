<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { distributeCurrencies } from '../../helpers/distributeCurrencies';
import { parseConversionQuery } from '../../helpers/parseConversionQuery';
import { DEFAULT_CURRENCY_VALUES } from '../../consts/rates.consts';
import { capitalize } from '../../helpers/capitalize';

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
  <section :class="$style.conversionResult">
    <h1 :class="$style.conversionResultTitle">Optimal distribution</h1>
    <p
      v-for="(value, key) in distributedCurrencies"
      v-bind:key="key"
      :class="$style.conversionResultItem"
      :aria-label="key + ' ' + value"
    >
      {{ capitalize(key) }}
      <span :class="$style.conversionResultValue">{{ value }}</span>
    </p>

    <RouterLink :to="{ name: 'home' }" :class="$style.conversionResultLink"
      >Back</RouterLink
    >
  </section>
</template>

<style lang="css" module>
.conversionResult {
  position: absolute;
  top: 0;
  background: var(--color-purple-1);
  width: 100%;
  height: 100%;
}

.conversionResult-title {
  margin-top: 0;
}

.conversionResult-link {
  display: block;
  height: 36px;
  line-height: 36px;
  text-align: center;
  background-color: var(--color-purple-3);
  margin-top: 16px;
  font-weight: 600;
  color: var(--color-white);
  border-radius: 4px;
  text-decoration: none;
}

.conversionResult-item {
  display: flex;
  justify-content: space-between;
  color: var(--color-purple-5);
}

.conversionResult-value {
  color: var(--color-white);
}
</style>
