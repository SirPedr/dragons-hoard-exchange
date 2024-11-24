<script lang="ts" setup>
import Logo from '@/icons/logo.svg?component';
</script>

<template>
  <header :class="$style.header">
    <Logo :class="$style.headerLogo" />
    <h1 :class="$style.headerTitle">Dragon's Hoard Exchange</h1>
  </header>
</template>

<style lang="css" module>
.header {
  text-align: center;
}

.header-logo {
  width: 80px;
  height: auto;
  fill: var(--color-purple-2);
}

.header-title {
  font-family: 'Bentham', serif;
  font-weight: 400;
  margin: 0 0 24px;
  color: var(--color-purple-4);
  font-size: 1.4rem;
}
</style>
