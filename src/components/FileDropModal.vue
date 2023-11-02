<template>
  <div>
    <!-- Vuetify Dialog for Drop File -->
    <v-dialog v-model="showModal" persistent max-width="590">
        <v-card-title class="headline">Drop file here to load</v-card-title>
        <v-card-text>
        </v-card-text>
    </v-dialog>

  </div>
</template>

<script lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

export default {
  name: 'FileDragModal',
  setup() {
    const showModal = ref<boolean>(false)
    const files = ref<File[]>([])
    const websocketAddress = ref<string>('')
    const websocketData = ref<string | null>(null)
    let websocket: WebSocket | undefined

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
        const droppedFiles = Array.from(event.dataTransfer.files)
        files.value.push(...droppedFiles)
      }
    }

    const handleFileInput = (event: { target: { files: Iterable<File> | ArrayLike<File> } }) => {
      const selectedFiles = Array.from(event.target.files) as File[]
      files.value.push(...selectedFiles)
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
      if (websocket) {
        websocket.close()
      }
    })

    return {
      showModal,
      websocketAddress,
      files,
      handleFileInput,
      websocketData
    }
  }
}
</script>

<style scoped>
  /* Add any custom styles here if needed */
</style>
