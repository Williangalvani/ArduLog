<template>
  <div>
    <!-- Vuetify Dialog for Drop File -->
    <v-dialog v-model="showModal" persistent max-width="590">
      <v-card>
        <v-card-title class="headline">Drop file here to load</v-card-title>
        <v-card-text>
        <v-row no-gutters>
          <v-col cols="8"> <!-- Adjust the 'cols' value as needed -->
            <v-text-field label="WebSocket URL" v-model="websocketAddress" />
          </v-col>
          <v-col cols="4" class="d-flex align-center"> <!-- Adjust the 'cols' value as needed -->
            <v-btn @click="connectWebSocket">Connect</v-btn>
          </v-col>
        </v-row>
        <v-file-input label="Select file" @change="handleFileInput" />
      </v-card-text>
        <v-list>
          <v-list-item v-for="(file, index) in files" :key="index">
            <v-list-item-content>
              {{ file.name }}
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-card-text v-if="websocketData">
          Data received from WebSocket: {{ websocketData }}
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

export default {
  name: 'FileDragModal',
  setup() {
    const showModal = ref<boolean>(true)
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

    const connectWebSocket = () => {
      if (websocketAddress.value) {
        websocket = new WebSocket(websocketAddress.value)

        websocket.onopen = (event) => {
          console.log('WebSocket connection opened:', event)
        }

        websocket.onmessage = (event) => {
          websocketData.value = event.data
        }

        websocket.onerror = (error) => {
          console.error('WebSocket Error:', error)
        }

        websocket.onclose = (event) => {
          console.log('WebSocket connection closed:', event)
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
      if (websocket) {
        websocket.close()
      }
    })

    return {
      showModal,
      websocketAddress,
      files,
      handleFileInput,
      connectWebSocket,
      websocketData
    }
  }
}
</script>

<style scoped>
  /* Add any custom styles here if needed */
</style>
