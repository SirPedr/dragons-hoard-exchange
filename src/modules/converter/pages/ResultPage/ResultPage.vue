<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SideMessage from '../../components/SideMessage/SideMessage.vue';
import { DEFAULT_CURRENCY_DISTRIBUTION } from '../../consts/rates.consts';
import { createCurrencyList } from '../../helpers/createCurrencyList/createCurrencyList';
import { distributeCurrencies } from '../../helpers/distributeCurrencies';
import { formatCurrency } from '../../helpers/formatCurrency';
import { parseConversionQuery } from '../../helpers/parseConversionQuery';
import type { CurrencyDistribution } from '../../types';
import { convertToCopper } from '../../helpers/convertToCopper';
import { sum } from '../../helpers/sum';

const route = useRoute();
const router = useRouter();
const distributedCurrencies = ref<CurrencyDistribution>(
  DEFAULT_CURRENCY_DISTRIBUTION,
);
const amountInCopper = computed(() =>
  sum(
    distributedCurrencies.value.map(({ currencies }) =>
      convertToCopper(currencies),
    ),
  ),
);

watch(
  () => route.query,
  () => {
    const parsedQuery = parseConversionQuery(route.query);
    const partySize = route.query.partySize ? Number(route.query.partySize) : 1;

    if (!parsedQuery) {
      router.replace({ name: 'home' });
    }

    distributedCurrencies.value = distributeCurrencies(
      parsedQuery ?? DEFAULT_CURRENCY_DISTRIBUTION[0].currencies,
      {
        ignoreElectrum: route.query.excludeElectrum === 'true',
        partySize,
      },
    );
  },
  { immediate: true },
);
</script>

<template>
  <section :class="$style.conversionResult">
    <h1 :class="$style.conversionResultTitle">Optimal distribution</h1>
    <div
      v-for="(distribution, index) in distributedCurrencies"
      v-bind:key="distribution.amountOfPlayers"
      :class="$style.conversionResultItem"
    >
      <p>
        <strong
          >{{ distribution.amountOfPlayers }}
          {{
            distribution.amountOfPlayers === 1 ? 'player' : 'players'
          }}</strong
        >
        {{ distribution.amountOfPlayers > 1 ? 'get' : 'gets' }}
        {{ createCurrencyList(distribution.currencies) }} pieces
      </p>
      <hr
        v-if="index !== distributedCurrencies.length - 1"
        :class="$style.conversionResultDivider"
      />
    </div>

    <SideMessage title="Fun fact">
      <p :class="$style.conversionResultMessage">
        This is equivalent to approximately
        {{ formatCurrency(amountInCopper) }}
      </p>
    </SideMessage>

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
  color: var(--color-purple-5);
}

.conversionResult-divider {
  border-color: var(--color-purple-1);
}

.conversionResult-value {
  color: var(--color-white);
}

.conversionResult-message {
  margin: 0;
}

@media screen and (min-width: 768px) {
  .conversionResult {
    position: static;
  }

  .conversionResult-link {
    display: none;
  }
}
</style>
