<script setup lang="ts">
const { label, checked } = defineProps<{
  checked: boolean;
  label: string;
}>();

defineEmits<{
  onChange: [checked: boolean];
}>();
</script>

<template>
  <label :class="$style.formCheckbox">
    <input
      type="checkbox"
      :class="$style.formCheckboxInput"
      :checked="checked"
      @change="$emit('onChange', !checked)"
    />
    {{ label }}
  </label>
</template>

<style module>
.formCheckbox {
  display: flex;
  gap: 4px;
  align-items: center;
}

.formCheckbox-input {
  accent-color: var(--color-purple-3);
  width: 16px;
  height: 16px;
}
</style>
