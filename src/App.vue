<script setup lang="ts">
import AppHeader from './components/AppHeader/AppHeader.vue';
</script>

<template>
  <AppHeader />
  <main>
    <RouterView />
  </main>
</template>

<style lang="css" scoped>
main {
  position: relative;
}

@media screen and (min-width: 768px) {
  main {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 32px;
  }
}
</style>
