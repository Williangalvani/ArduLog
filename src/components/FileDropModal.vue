<template>
  <!-- Vuetify Dialog for Drop File -->
  <v-dialog v-model="showModal" persistent max-width="290">
    <v-card>
      <v-card-title class="headline">Drop file here to load</v-card-title>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

export default {
  name: 'FileDragModal',
  setup(_, { emit }) {
    const showModal = ref(false)

    const handleDragOver = (event: DragEvent) => {
      event.preventDefault()
      if (event.dataTransfer && event.dataTransfer.items.length > 0) {
        for (let i = 0; i < event.dataTransfer.items.length; i++) {
          if (event.dataTransfer.items[i].kind === 'file') {
            showModal.value = true
            break
          }
        }
      }
    }

    const handleDragLeave = (event: Event) => {
      event.preventDefault()
      showModal.value = false
    }

    const handleDrop = (event: DragEvent) => {
      event.preventDefault()
      showModal.value = false
      if (event.dataTransfer) {
        const files = event.dataTransfer.files
        if (files.length > 0) {
          emit('fileDropped', files[0]) // Emit the first file; adjust as needed
        }
      }
    }

    onMounted(() => {
      window.addEventListener('dragover', handleDragOver)
      window.addEventListener('dragleave', handleDragLeave)
      window.addEventListener('drop', handleDrop)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('dragover', handleDragOver)
      window.removeEventListener('dragleave', handleDragLeave)
      window.removeEventListener('drop', handleDrop)
    })

    return {
      showModal
    }
  }
}
</script>
