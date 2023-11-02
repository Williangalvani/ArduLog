// Utilities
import { defineStore } from 'pinia'
import DataLoader from '@/dataManagement/dataLoaders/abstractLoader';
import { DataFormat } from '@/dataManagement/dataManager';

export const dataStore = defineStore('data', {
  state: () => ({
    dataSources: [] as DataLoader[],
    websockets: [] as WebSocket[],
    files: [] as [File, DataFormat][],
  }),

  actions: {
    addDataSource(dataLoader: DataLoader) {
      this.dataSources.push(dataLoader);
    }
  }
})
