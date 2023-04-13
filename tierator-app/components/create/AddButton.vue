<script setup>
  const emit = defineEmits(['openModal'])

  function addEntry() {
    emit('openModal', true)
  }
</script>

<template>
  <button class="add-button" type="button" alt="add item" @click="addEntry()">ADD</button>
</template>

<style scoped>
  .add-button {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    padding: 10px;
    border: none;
    background: #4f1665;
    color: #fff;
    font-size: 30px;
    letter-spacing: 0.05em;
    transition: all 0.1s ease;
    cursor: pointer;
  }

  .add-button:hover {
    opacity: 0.9;
  }
</style>