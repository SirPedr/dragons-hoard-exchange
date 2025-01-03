<script setup lang="ts">
import { ref } from 'vue';
import {
  CONVERTER_FORM_SCHEMA,
  type ConverterFormData,
} from '../../consts/converterForm.consts';
import type { Currencies } from '../../types';
import CurrencyInput from '../CurrencyInput/CurrencyInput.vue';
import FormCheckbox from '../FormCheckbox/FormCheckbox.vue';

const props = defineProps<{
  initialValues: Partial<ConverterFormData>;
}>();

const emit = defineEmits<{
  onSubmit: [formData: ConverterFormData];
}>();

const errorMessages = ref<string[] | null>(null);
const formData = ref({
  currencies: {
    platinum: 0,
    gold: 0,
    electrum: 0,
    silver: 0,
    copper: 0,
  },
  excludeElectrum: true,
  partySize: 1,
  ...props.initialValues,
});

const onSubmit = () => {
  const validationResult = CONVERTER_FORM_SCHEMA.safeParse(formData.value);

  if (validationResult.error) {
    errorMessages.value = Object.values(
      validationResult.error.flatten().fieldErrors,
    ).flat();

    return;
  }

  errorMessages.value = null;
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

    <CurrencyInput
      :value="formData.partySize"
      label="Party size"
      name="partySize"
      @on-input="(value) => (formData.partySize = value)"
    />

    <FormCheckbox
      label="Exclude Electrum"
      :checked="formData.excludeElectrum"
      @onChange="formData.excludeElectrum = !formData.excludeElectrum"
    />

    <p
      v-for="(message, index) in errorMessages"
      :key="index"
      :class="$style.formErrorMessage"
    >
      {{ message }}
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
  margin-top: 24px;
  font-weight: 600;
  border: none;
  color: var(--color-white);
  border-radius: 4px;
  cursor: pointer;
}
</style>
