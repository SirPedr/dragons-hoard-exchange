<script setup lang="ts">
import { ref } from 'vue';
import CurrencyInput from '../CurrencyInput/CurrencyInput.vue';
import type { Currencies } from '../../types';

const emit = defineEmits<{
  onSubmit: [
    formData: {
      currencies: Record<Currencies, number>;
      excludeElectrum: boolean;
    },
  ];
}>();

const errorMessage = ref<string | null>(null);
const formData = ref({
  currencies: {
    platinum: 0,
    gold: 0,
    electrum: 0,
    silver: 0,
    copper: 0,
  },
  excludeElectrum: true,
});

const onSubmit = () => {
  const allFieldsAreEmpty = Object.values(formData.value.currencies).every(
    (value) => !value,
  );

  if (allFieldsAreEmpty) {
    errorMessage.value = 'You need to fill at least one field';
    return;
  }

  emit('onSubmit', formData.value);
};

const onFieldChange = (value: number, name: string) => {
  formData.value.currencies[name as Currencies] = value;
};
</script>

<template>
  <form @submit.prevent="onSubmit">
    <CurrencyInput
      :value="formData.currencies.platinum"
      label="Platinum Pieces (PP)"
      name="platinum"
      @on-input="onFieldChange"
    />

    <CurrencyInput
      :value="formData.currencies.gold"
      label="Gold Pieces (GP)"
      name="gold"
      @on-input="onFieldChange"
    />

    <CurrencyInput
      :value="formData.currencies.electrum"
      label="Electrum Pieces (EP)"
      name="electrum"
      @on-input="onFieldChange"
    />

    <CurrencyInput
      :value="formData.currencies.silver"
      label="Silver Pieces (SP)"
      name="silver"
      @on-input="onFieldChange"
    />

    <CurrencyInput
      :value="formData.currencies.copper"
      label="Copper Pieces (CP)"
      name="copper"
      @on-input="onFieldChange"
    />

    <label>
      <input
        type="checkbox"
        name="excludeElectrum"
        :checked="formData.excludeElectrum"
        @change="formData.excludeElectrum = !formData.excludeElectrum"
      />
      Exclude Electrum
    </label>

    <p v-if="errorMessage">{{ errorMessage }}</p>
    <button type="submit">Convert</button>
  </form>
</template>
