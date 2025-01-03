<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import ConverterForm from '../../components/ConverterForm/ConverterForm.vue';
import type { ConverterFormData } from '../../consts/converterForm.consts';
import { DEFAULT_FORM_VALUES } from '../../consts/rates.consts';
import { parseConversionQuery } from '../../helpers/parseConversionQuery';

const router = useRouter();
const route = useRoute();

const x = parseConversionQuery(route.query);
const initialFormValues: Partial<ConverterFormData> = x
  ? { currencies: x }
  : DEFAULT_FORM_VALUES;

const onSubmit = (data: ConverterFormData) => {
  router.push({
    name: 'result',
    query: {
      ...data.currencies,
      excludeElectrum: data.excludeElectrum.toString(),
      partySize: data.partySize.toString(),
    },
  });
};
</script>

<template>
  <section>
    <ConverterForm @on-submit="onSubmit" :initialValues="initialFormValues" />
  </section>
  <RouterView />
</template>
