<template>
      <v-card>
        <v-card-title class="headline">Manage Connections and Files
          <v-spacer></v-spacer>
        </v-card-title>
        <v-tabs v-model="tab" grow>
          <v-tab key="websockets">WebSockets</v-tab>
          <v-tab key="files">Files</v-tab>
        </v-tabs>
          <!-- WebSocket Tab -->
            <v-card-text  key="websockets" v-if="tab === 0">
              <v-row no-gutters>
                <v-col cols="8">
                  <v-text-field label="WebSocket URL" v-model="newWebSocketAddress" />
                </v-col>
                <v-col cols="4" class="d-flex align-center">
                  <v-btn @click="addWebSocket">Add</v-btn>
                </v-col>
              </v-row>
              <v-list>
                <v-list-item v-for="ws, index in websockets" :key="index">
                    {{ ws.url }}
                </v-list-item>
              </v-list>
            </v-card-text>
            <v-card-text key="files" v-if="tab === 1">
              <v-file-input ref="fileInput" label="Select file" @change="handleFileInput" multiple />
              <v-list>
                <v-list-item v-for="(file, index) in files" :key="index">
                    {{ file[0].name }} <v-chip>{{ file[1] }}</v-chip>
                </v-list-item>
              </v-list>
            </v-card-text>
      </v-card>
</template>



<script lang="ts">
import { ref } from 'vue'
import { dataStore } from '../store/dataStore'
import DataManager, { DataFormat } from '../dataManagement/dataManager'

export default {
  name: 'InputManager',
  setup() {
    const newWebSocketAddress = ref<string>('')
    const tab = ref<number>(0)
    const datastore = dataStore()
    const fileInput = ref<HTMLInputElement | null>(null)

    const addWebSocket = () => {
      datastore.websockets.push(new WebSocket(newWebSocketAddress.value))
      newWebSocketAddress.value = ''
    }

    const handleFileInput = async (event: { target: { files: any } }) => {
      const files = event.target.files
      for (let i = 0; i < files.length; i++) {
        const dataType = await DataManager.getInstance().identifyFileFormat(files[i])
        if (dataType !== DataFormat.UNKNOWN) {
          datastore.files.push([files[i], dataType])
        }
      }
      fileInput.value?.reset()
    }



    return {
      newWebSocketAddress,
      tab,
      fileInput,
      datastore,
      addWebSocket,
      handleFileInput,
      websockets: datastore.websockets,
      files: datastore.files
    }
  }
}
</script>

<style scoped>
  /* Add any custom styles here if needed */
</style>
