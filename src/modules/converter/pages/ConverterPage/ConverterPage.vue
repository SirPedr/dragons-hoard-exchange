<script setup lang="ts">
import { useRouter } from 'vue-router';
import ConverterForm from '../../components/ConverterForm/ConverterForm.vue';
import type { ConverterFormData } from '../../types';

const router = useRouter();

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
  <ConverterForm @on-submit="onSubmit" />
</template>
