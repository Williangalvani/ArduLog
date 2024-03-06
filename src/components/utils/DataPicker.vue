<template>
  <v-col cols="7">
    <span v-for="[file, fileData] in Object.entries(data.files)" >
      {{ file }}
      <v-combobox
            v-model="modelValue"
            :items="fileData.messages.map((message) => message.name)"
            multiple
            chips
            @update:modelValue="updateContent"
      >
      </v-combobox>
    </span>
  </v-col>
</template>

<script setup lang="ts">
import { dataStore } from '@/store/dataStore'
import { messageType } from '@/dataManagement/dataLoaders/abstractLoader'
import { ref } from 'vue';
    const props = defineProps({
      modelValue: {
        type: Object,
        required: true,
        default: () => ({})
      }
    })
    const modelValue = ref([])

    const data = dataStore()

    const emit = defineEmits(['update:modelValue'])

    const updateContent = () => {
      emit('update:modelValue', modelValue)
      console.log(modelValue)
    }


</script>
