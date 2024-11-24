<script lang="ts" setup>
const { title } = defineProps<{
  title: string;
}>();
</script>

<template>
  <aside :class="$style.sideMessage">
    <strong :class="$style.sideMessageTitle">{{ title }}</strong>
    <slot></slot>
  </aside>
</template>

<style lang="css" module>
.sideMessage {
  background-color: var(--color-green-1);
  padding: 16px;
  border-radius: 4px;
  border: 1px solid var(--color-green-2);
}

.sideMessage-title {
  display: inline-block;
  margin-bottom: 8px;
}
</style>
