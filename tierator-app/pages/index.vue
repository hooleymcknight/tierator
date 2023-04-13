<script setup>
  import TierGrid from '../components/TierGrid.vue'
</script>

<template>
  <main>
    <TierGrid />
    <p>This will be the home page.</p>
  </main>
</template>

<script>
  export default {
    name: "IndexPage",
    components: { TierGrid }
}
</script>

<style scoped>
  main {
    margin: 0 auto;
    width: fit-content;
    width: -moz-fit-content;
  }
</style>
