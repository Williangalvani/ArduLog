// Utilities
import { defineStore } from 'pinia'

export const dataStore = defineStore('data', {
  state: () => ({
    dataSources: [] as DataLoader[],
    websockets: [] as WebSocket[],
    files: [] as File[],
  }),

  actions: {
    addDataSource(dataLoader: DataLoader) {
      this.dataSources.push(dataLoader);
    }
  }
})
