<script setup>
  defineProps({
    open: {
      type: Boolean,
      required: true,
      default: false
    },
    exportedImageSrc: {
      type: String,
      required: false,
      default: ''
    }
  })

  const emit = defineEmits(['openExportModal'])

  function closeModal() {
    emit('openExportModal', false)
  }
</script>

<template>
  <div class="export-modal" :is-open="open">
    <div class="modal-overlay" role="button" alt="close modal" @click="closeModal()"></div>

    <div class="modal-inner">
      <button type="button" alt="close modal" class="close-modal" @click="closeModal()">✕</button>
      <h2>Your Tier Chart</h2>

      <img class="exported" :src="exportedImageSrc" alt="your exported tier chart image" />

      <a download="tieratorChart.png" alt="download image" class="download-btn" :href="exportedImageSrc">Download</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AddModal',
    data () {
      return {
      }
    },
  }
</script>

<style scoped>
  .export-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    visibility: visible;
    opacity: 1;
    transition: all 0.1s ease;
  }

  .export-modal[is-open="false"] {
    visibility: hidden;
    opacity: 0;
  }

  .export-modal .modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
  }

  .export-modal .modal-inner {
    background: #fbf1ff;
    width: 800px;
    left: calc(50% - 400px);
    top: 15%;
    padding: 20px;
    border-radius: 4px;
  }

  .export-modal img.exported {
    display: block;
    margin: 0 auto 10px;
  }

  .export-modal .close-modal {
    background: transparent;
    border: none;
    font-size: 28px;
    font-weight: 900;
    position: absolute;
    border-radius: 8px;
    top: 0;
    right: 0;
    z-index: 2;
    cursor: pointer;
  }
  .export-modal .close-modal:hover,
  .export-modal .close-modal:active {
    color: #4f1665;
  }

  .export-modal h2 {
    margin-bottom: 20px;
  }

  .export-modal .download-btn {
    background: #4f1665;
    color: #fff;
    border: none;
    padding: 8px 18px;
    font-size: 18px;
    border-radius: 8px;
    border: 2px solid #4f1665;
    cursor: pointer;
    margin-top: 10px;
    display: block;
    width: fit-content;
    width: -moz-fit-content;
  }
  .export-modal .download-btn:hover,
  .export-modal .download-btn:active {
    background: #fff;
    color: #4f1665;
  }

  @media (max-width: 767px) {
    .export-modal .modal-inner {
      width: 100%;
      left: 0;
      height: 100%;
      top: 0;
      border-radius: 0;
    }

    .export-modal img.exported {
      max-height: 75vh;
      max-width: 80vw;
      width: auto;
      height: auto;
      margin-left: 0;
    }
  }
</style>