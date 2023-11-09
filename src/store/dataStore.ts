// Utilities
import { defineStore } from 'pinia'
import DataLoader, { messageType } from '@/dataManagement/dataLoaders/abstractLoader';
import { DataFormat } from '@/dataManagement/dataManager';

export interface FileEntry {
  file: File
  format: DataFormat
  loader: DataLoader
  messages: messageType[]
}

export const dataStore = defineStore('data', {
  state: () => ({
    websockets: [] as WebSocket[],
    files: {} as { [key: string]: FileEntry }
  }),

  actions: {
  }
})
