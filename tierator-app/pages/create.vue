<script setup>
  import domtoimage from 'dom-to-image'
  import TierGrid from '../components/TierGrid.vue'
  import AddButton from '../components/create/AddButton.vue'
  import AddModal from '../components/create/AddModal.vue'
  import ItemEntry from '../components/ItemEntry.vue'
</script>

<template>
  <main>
    <p class="no-mobile">I'm not mobile friendly yet, I'm sorry :(</p>
    <TierGrid />
    <div class="all-entries">
      <ItemEntry v-for="entry in entries" :key="entry[0]" :name="entry[0]" :img-src="entry[1]" />
    </div>

    <button type="button" alt="export tier" class="export-btn" @click="exportTier()">Export</button>

    <AddButton :disabled="entries.length > 12" @openModal="$event => fireModal($event)" />
    <AddModal :open="modalShown" @openModal="$event => fireModal($event)" @newEntry="$event => addEntry($event)" />
  </main>
</template>

<script>
  export default {
    name: 'Create',
    data() {
      return {
        modalShown: false,
        entries: []
      }
    },
    methods: {
      fireModal(input) {
        console.log('fire modal', this.modalShown)
        this.modalShown = input
      },
      addEntry(e) {
        this.entries.push(e)
        this.modalShown = false
      },
      exportTier() {
        const tier = document.getElementById('tier-grid')
        domtoimage.toPng(tier)
          .then(function (dataUrl) {
            const img = new Image()
            img.src = dataUrl
            document.body.appendChild(img)
          })
          .catch(function (error) {
            // console.error('oopsie', error)
            return error
          })
      }
    }
  }
</script>

<style scoped>
  main {
    margin: 0 auto;
    width: fit-content;
    width: -moz-fit-content;
  }

  .all-entries {
    display: flex;

  }

  @media (max-width: 1023px) {
    main {
      width: 100%;
      padding-left: 10px;
      padding-right: 10px;
    }
    main :not(.no-mobile) {
      display: none;
    }
  }

  @media (min-width: 1024px) {
    .no-mobile {
      display: none;
    }
  }
</style>