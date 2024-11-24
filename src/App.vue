<template>
  <h1>Dragon's Hoard Exchange</h1>

  <main>
    <RouterView />
  </main>
</template>

<style>
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
