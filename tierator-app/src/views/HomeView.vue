<script setup>
  import TierGrid from '../components/TierGrid.vue'
  import StardewGems from '../components/example-tier/StardewGems.vue';
</script>

<template>
  <main>
    <TierGrid />
    <StardewGems />
  </main>
</template>

<style scoped>
  main {
    margin: 0 auto;
    width: fit-content;
    width: -moz-fit-content;
  }
</style>