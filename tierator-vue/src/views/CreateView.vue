<script setup>
  import domtoimage from 'dom-to-image'
  import TierGrid from '../components/TierGrid.vue'
  import AddButton from '../components/create/AddButton.vue'
  import AddModal from '../components/create/AddModal.vue'
  import ItemEntry from '../components/ItemEntry.vue'
  import ExportModal from '../components/create/ExportModal.vue'
</script>

<template>
  <main>
    <TierGrid :dropData="droppingData" />
    <div class="all-entries">
      <ItemEntry v-for="entry in entries" :key="entry[0]" :name="entry[0]" :img-src="entry[1]" @dropping="$event => setDroppingData($event)" />
    </div>

    <button type="button" alt="export tier" class="export-btn" @click="exportTier()">Export</button>

    <AddButton :disabled="entries.length > 12" @openModal="$event => fireModal($event)" />
    <AddModal :open="modalShown" @openModal="$event => fireModal($event)" @newEntry="$event => addEntry($event)" />

    <ExportModal :open="exportModalShown" :exportedImageSrc="exportedImageSrc" @openExportModal="closeExportModal()" />
  </main>
</template>

<script>
  export default {
    name: 'CreateView',
    data() {
      return {
        modalShown: false,
        exportModalShown: false,
        entries: [],
        exportedImageSrc: '',
        droppingData: null,
      }
    },
    methods: {
      fireModal(input) {
        if (input) {
          document.documentElement.classList.add('no-scroll')
        }
        this.modalShown = input
      },
      addEntry(e) {
        this.entries.push(e)
        document.documentElement.classList.remove('no-scroll')
        this.modalShown = false
      },
      exportTier() {
        const tier = document.getElementById('tier-grid')

        // set export dimensions temporarily
        tier.classList.add('exporting')

        // no scroll
        document.documentElement.classList.add('no-scroll')

        // convert to a png
        const $this = this
        domtoimage.toPng(tier)
          .then(function (dataUrl) {
            let img = new Image()
            img.src = dataUrl
            // undo the export dimensions
            tier.classList.remove('exporting')
            $this.exportedImageSrc = img.src
            $this.exportModalShown = true
          })
          .catch(function (error) {
            // undo the export dimensions
            tier.classList.remove('exporting')
            console.error('oopsie', error)
          })
      },
      closeExportModal() {
        document.documentElement.classList.remove('no-scroll')
        this.exportModalShown = false
      },
      setDroppingData(e) {
        this.droppingData = e
      }
    }
  }
</script>

<style scoped>
  main {
    margin: 0 auto;
    width: fit-content;
    width: -moz-fit-content;
    max-width: 660px;
  }

  .all-entries {
    display: flex;
    flex-wrap: wrap;
    max-width: 660px;
  }

  .export-btn {
    margin-top: 20px;
    float: right;
    background: #4f1665;
    border: 2px solid #4f1665;
    color: #fff;
    cursor: pointer;
    padding: 4px 12px;
    font-size: 18px;
    border-radius: 4px;
  }

  .export-btn:hover {
    background: #fff;
    color: #4f1665;
  }

  @media (max-width: 1023px) {
    main {
      width: 100%;
      padding-left: 10px;
      padding-right: 10px;
    }
  }

  @media (max-width: 767px) {
    main {
      padding-top: 0;
    }
    .all-entries {
      padding-bottom: 40px;
    }
    .export-btn {
      margin-bottom: 100px;
      margin-top: 10px;
    }
  }
</style>