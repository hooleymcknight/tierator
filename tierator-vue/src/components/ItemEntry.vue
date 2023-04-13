<script setup>
  defineProps({
    name: {
      type: String,
      required: true
    },
    imgSrc: {
      type: String,
      required: true
    }
  })

  function drag(e) {
    e.dataTransfer.setData('text', e.target.closest('.item-entry').id)
  }

  function deleteEntry(e) {
    e.target.closest('.item-entry').remove()
  }

</script>

<template>
  <div class="item-entry" :id="name.toLowerCase()" draggable="true" @dragstart="$event => drag($event)">
    <p class="entry-name">{{ name }}</p>
    <img v-if="imgSrc.length" :src="imgSrc" :alt="name" />
    <p v-if="!imgSrc.length" class="img-standin">{{ name.charAt(0) }}</p>
    <button type="button" alt="delete" @click="$event => deleteEntry($event)">✕</button>
  </div>
</template>

<style scoped>
  .item-entry {
    margin: 10px;
    width: 80px;
    height: 80px;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 1px 1px 4px 1px #333;
    position: relative;
    border-radius: 4px;
    background: #fff;
    padding: 3px;
  }

  .item-entry .entry-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    font-size: 14px;
    text-align: center;
  }

  .item-entry img {
    max-height: 50px;
    max-width: 50px;
  }

  .item-entry .img-standin {
    text-transform: uppercase;
    font-size: 30px;
  }

  .item-entry button {
    visibility: hidden;
    opacity: 0;
    transition: all 0.1s ease;
    position: absolute;
    top: 0;
    right: 0;
    height: 40%;
    width: 40%;
    background: rgba(124, 0, 0, 0.8);
    color: #fff;
    font-weight: 900;
    font-size: 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .all-entries .item-entry {
    cursor: grab;
  }

  .all-entries .item-entry:active {
    cursor: grabbing;
  }

  tbody .item-entry:hover button {
    visibility: visible;
    opacity: 1;
  }

  tbody .item-entry {
    background: #444;
    cursor: grab;
  }
</style>