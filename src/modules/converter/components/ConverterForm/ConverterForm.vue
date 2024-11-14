<script setup lang="ts">
import { ref } from 'vue';
import CurrencyInput from '../CurrencyInput/CurrencyInput.vue';
import type { Currencies } from '../../types';

const emit = defineEmits<{
  onSubmit: [formData: Record<Currencies, number>];
}>();

const errorMessage = ref<string | null>(null);
const formData = ref({
  platinum: 0,
  gold: 0,
  electrum: 0,
  silver: 0,
  copper: 0,
});

const onSubmit = () => {
  const allFieldsAreEmpty = Object.values(formData.value).every((value) => !value);

  if (allFieldsAreEmpty) {
    errorMessage.value = 'You need to fill at least one field';
    return;
  }

  emit('onSubmit', formData.value);
};

const onFieldChange = (value: number, name: string) => {
  formData.value[name as Currencies] = value;
};
</script>

<template>
  <form @submit.prevent="onSubmit">
    <CurrencyInput
      :value="formData.platinum"
      label="Platinum Pieces (PP)"
      name="platinum"
      @on-input="onFieldChange"
    />

    <CurrencyInput
      :value="formData.gold"
      label="Gold Pieces (GP)"
      name="gold"
      @on-input="onFieldChange"
    />

    <CurrencyInput
      :value="formData.electrum"
      label="Electrum Pieces (EP)"
      name="electrum"
      @on-input="onFieldChange"
    />

    <CurrencyInput
      :value="formData.silver"
      label="Silver Pieces (SP)"
      name="silver"
      @on-input="onFieldChange"
    />

    <CurrencyInput
      :value="formData.copper"
      label="Copper Pieces (CP)"
      name="copper"
      @on-input="onFieldChange"
    />

    <p v-if="errorMessage">{{ errorMessage }}</p>
    <button type="submit">Convert</button>
  </form>
</template>
