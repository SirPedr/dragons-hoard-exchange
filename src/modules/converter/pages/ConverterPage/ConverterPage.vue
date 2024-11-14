<script setup lang="ts">
import ConverterForm from '../../components/ConverterForm/ConverterForm.vue';
</script>

<template>
  <h1>Dragon's Hoard Exchange</h1>
  <ConverterForm @on-submit="console.log" />
</template>
