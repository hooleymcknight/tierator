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
    if (e.type === 'dragstart') {
      e.dataTransfer.setData('text', e.target.closest('.item-entry').id)
    }
  }

</script>

<template>
  <div class="item-entry" :id="name.toLowerCase()" draggable="true" @dragstart="$event => drag($event)" @touchstart="$event => setDropData($event)" @touchend="$event => deposit($event)" tabindex="0">
    <p class="entry-name">{{ name }}</p>
    <img v-if="imgSrc.length" :src="imgSrc" :alt="name" />
    <p v-if="!imgSrc.length" class="img-standin">{{ name.charAt(0) }}</p>
    <button type="button" alt="delete" @click="$event => deleteEntry($event)">✕</button>
  </div>
</template>

<script>
  export default {
    name: 'ItemEntry',
    data () {
      return {
        dropData: null,
      }
    },
    methods: {
      deleteEntry(e) {
        e.target.closest('.item-entry').remove()
      },
      setDropData(e) {
        // I shouldnt have to do this :(
        if (e.target.type === 'button') {
          this.deleteEntry(e)
          return
        }
        document.documentElement.classList.add('no-scroll')
        this.dropData = e.target.closest('.item-entry').id
      },
      deposit(e) {
        const X = e.changedTouches[0].clientX
        const Y = e.changedTouches[0].clientY
        const row = document.elementFromPoint(X, Y).closest('tr')
        if (row) {
          row.querySelector('td').appendChild(document.getElementById(this.dropData))
        }
        document.documentElement.classList.remove('no-scroll')
      }
    }
  }
</script>

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

  tbody .item-entry:hover button,
  tbody .item-entry:focus-visible button,
  tbody .item-entry button:focus-visible {
    visibility: visible;
    opacity: 1;
  }

  tbody .item-entry {
    background: #444;
    cursor: grab;
  }
</style>