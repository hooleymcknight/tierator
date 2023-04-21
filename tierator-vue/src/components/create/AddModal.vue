<script setup>
  defineProps({
    open: {
      type: Boolean,
      required: true,
      default: false
    }
  })

  defineEmits(['openModal', 'newEntry'])
</script>

<template>
  <div class="add-modal" :is-open="open">
    <div class="modal-overlay" role="button" alt="close modal" @click="closeModal()"></div>

    <div class="modal-inner">
      <button type="button" alt="close modal" class="close-modal" @click="closeModal()">✕</button>
      <h2>Add New Tier Entry</h2>
      <form id="add-form" :has-error="formError" :img-type-error="imgTypeError" :img-size-error="imgSizeError">
        <div class="form-field">
          <label for="entry-name">Entry Name:</label>
          <input type="text" id="entry-name" name="entry-name" @input="onFormChange()">
          <p class="error-message" error-type="no-name">You at least have to have an entry name.</p>
        </div>

        <div class="form-field">
          <label for="entry-image">Entry image: <span class="optional">(optional)</span></label>
          <input type="file" accept="image/*" id="entry-image" name="entry-image" @change="$event => onFileSelected($event)">
          <p class="error-message" error-type="img-type">Only images can be uploaded here.</p>
          <p class="error-message" error-type="img-size">Please limit your image to 250KB (think like 500x500 pixels). This image is: <span class="img-size"></span></p>
        </div>

        <button type="submit" alt="submit entry" class="submit-btn" @click="$event => onSubmit($event)">Add it!</button>
      </form>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'AddModal',
    data () {
      return {
        formError: false,
        imgTypeError: false,
        imgSizeError: false,
        selectedFile: null,
      }
    },
    methods: {
      closeModal() {
        this.clearForm()
        document.documentElement.classList.remove('no-scroll')
        this.$emit('openModal', false)
      },
      onFileSelected(e) {
        this.selectedFile = e.target.files[0]
        this.imgTypeError = false
        this.imgSizeError = false
      },
      onFormChange() {
        this.formError = false
      },
      clearForm() {
        document.querySelector('#add-form').reset()
      },
      onSubmit(e) {
        e.preventDefault()
        // if missing entry name, return error
        const entryName = e.target.form[0].value.trim()
        if (!entryName) {
          this.formError = true
          return
        }
        
        // image not required.
        const imageFPath = e.target.form[1].value
        if (imageFPath) {
          if (!this.selectedFile.type.includes('image')) {
            // reject image bc of type
            this.imgTypeError = true
            return
          }

          if (this.selectedFile.size > 250000) {
            // reject image bc of size
            document.querySelector('.img-size').innerText = `${this.selectedFile.size / 1000} KB`
            this.imgSizeError = true
            return
          }

          const fd = new FormData()
          fd.append('image', this.selectedFile, this.selectedFile.name)
          axios.post('https://us-central1-tierator.cloudfunctions.net/uploadFile', fd)
            .then(() => {
              // add the image src to an object to spit back out
              this.$emit('newEntry', [entryName, `https://firebasestorage.googleapis.com/v0/b/tierator.appspot.com/o/${this.selectedFile.name}?alt=media`])
              this.clearForm()
            })
        }
        else {
          // return only the name and an empty image path
          this.$emit('newEntry', [entryName, ''])
          this.clearForm()
        }
      }
    }
  }
</script>

<style scoped>
.img-size-test {
  margin-top: 50px;
}
  .add-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    visibility: visible;
    opacity: 1;
    transition: all 0.1s ease;
  }

  .add-modal[is-open="false"] {
    visibility: hidden;
    opacity: 0;
  }

  .add-modal .modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
  }

  .add-modal .modal-inner {
    background: #fbf1ff;
    width: 500px;
    left: calc(50% - 250px);
    top: 20%;
    padding: 20px;
    border-radius: 4px;
  }

  .add-modal .close-modal {
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
  .add-modal .close-modal:hover,
  .add-modal .close-modal:active {
    color: #4f1665;
  }

  .add-modal h2 {
    margin-bottom: 20px;
  }

  .add-modal .optional {
    font-size: 12px;
    margin-left: 7px;
  }

  .add-modal .form-field {
    margin-bottom: 30px;
  }

  .add-modal input {
    display: block;
    margin: 5px 0 0;
  }

  .add-modal .error-message {
    position: absolute;
    font-size: 12px;
    color: #ae230e;
    visibility: hidden;
    opacity: 0;
    transition: all 0.1s ease;
  }

  .add-modal form[has-error="true"] [error-type="no-name"],
  .add-modal form[img-type-error="true"] [error-type="img-type"],
  .add-modal form[img-size-error="true"] [error-type="img-size"] {
    visibility: visible;
    opacity: 1;
  }

  .add-modal .submit-btn {
    background: #4f1665;
    color: #fff;
    border: none;
    padding: 8px 18px;
    font-size: 18px;
    border-radius: 8px;
    border: 2px solid #4f1665;
    cursor: pointer;
    margin-top: 10px;
  }
  .add-modal .submit-btn:hover
  .add-modal .submit-btn:active {
    background: #fff;
    color: #4f1665;
  }

  @media (max-width: 767px) {
    .add-modal .modal-inner {
      width: 100%;
      left: 0;
      height: 100%;
      top: 0;
      border-radius: 0;
    }
  }
</style>