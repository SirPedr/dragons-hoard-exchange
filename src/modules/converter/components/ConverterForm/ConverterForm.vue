<script setup lang="ts">
import { ref } from 'vue';
import CurrencyInput from '../CurrencyInput/CurrencyInput.vue';
import type { Currencies } from '../../types';
import FormCheckbox from '../FormCheckbox/FormCheckbox.vue';

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

  errorMessage.value = null;
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

    <FormCheckbox
      label="Exclude Electrum"
      :checked="formData.excludeElectrum"
      @onChange="formData.excludeElectrum = !formData.excludeElectrum"
    />

    <p v-if="errorMessage" :class="$style.formErrorMessage">
      {{ errorMessage }}
    </p>

    <button type="submit" :class="$style.formSubmitButton">Convert</button>
  </form>
</template>

<style lang="css" module>
.form-errorMessage {
  background: var(--color-pink-2);
  padding: 8px;
  border: 1px solid var(--color-pink-1);
  border-radius: 4px;
}

.form-submitButton {
  display: block;
  width: 100%;
  height: 36px;
  background-color: var(--color-purple-3);
  margin-top: 16px;
  font-weight: 600;
  border: none;
  color: var(--color-white);
  border-radius: 4px;
  cursor: pointer;
}
</style>
