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
  <label>
    {{ label }}
    <input type="number" :value="value" @input="onInputChange" />
  </label>
</template>
