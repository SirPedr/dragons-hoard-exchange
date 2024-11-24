<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import ConverterForm from '../../components/ConverterForm/ConverterForm.vue';
import { DEFAULT_CURRENCY_VALUES } from '../../consts/rates.consts';
import { parseConversionQuery } from '../../helpers/parseConversionQuery';
import type { ConverterFormData } from '../../types';

const router = useRouter();
const route = useRoute();

const initialFormValues =
  parseConversionQuery(route.query) ?? DEFAULT_CURRENCY_VALUES;

const onSubmit = (data: ConverterFormData) => {
  router.push({
    name: 'result',
    query: {
      ...data.currencies,
      excludeElectrum: data.excludeElectrum.toString(),
    },
  });
};
</script>

<template>
  <h1>Dragon's Hoard Exchange</h1>
  <ConverterForm
    @on-submit="onSubmit"
    :initialValues="{ currencies: initialFormValues }"
  />
  <RouterView />
</template>
