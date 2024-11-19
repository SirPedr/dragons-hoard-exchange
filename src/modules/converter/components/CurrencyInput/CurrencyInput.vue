<script setup lang="ts">
import { defineEmits } from 'vue';
const { label, value, name } = defineProps<{
  value: number;
  label: string;
  name: string;
}>();

const emit = defineEmits<{
  onInput: [value: number, name: string];
}>();

const onInputChange = (event: Event) => {
  const { valueAsNumber } = event.target as HTMLInputElement;
  const normalizedValue = isNaN(valueAsNumber) ? 0 : valueAsNumber;

  emit('onInput', normalizedValue, name);
};
</script>

<template>
  <label :class="$style.currencyLabel">
    {{ label }}
    <input
      type="number"
      :value="value"
      @input="onInputChange"
      :class="$style.currencyInput"
    />
  </label>
</template>

<style lang="css" module>
.currency-label {
  display: block;
  margin-bottom: 1rem;
  color: var(--color-purple-5);
}

.currency-input {
  box-sizing: border-box;
  display: block;
  width: 100%;
  height: 36px;
  padding: 16px;
  background-color: var(--color-purple-2);
  border: none;
  margin-top: 8px;
  color: var(--color-white);
  border-radius: 4px;
}
</style>
