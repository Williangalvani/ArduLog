<template>
  <draggable 
    v-model="internalCards" 
    group="people" 
    handle=".handle"
    @start="onStart" 
    @end="onEnd" 
    ghost-class="ghost"
    item-key="id"
    @update="handleUpdate">
    <template #item="{element}">
      <v-col cols="12">
        <v-card>
          <Plotly :modelValue="element"/>
        </v-card>
      </v-col>
    </template>
  </draggable>
</template>

<script lang="ts">
import { ref, watch } from 'vue'
import draggable from 'vuedraggable'
import Plotly from './Displays/Plotly.vue'

export default {
  components: {
    draggable,
    Plotly
    // Remember to import and register other potential component types here
  },
  props: {
    modelValue: {
      type: Object,
      required: true,
      default: () => ({
        content: []
      })
    }
  },
  setup(props, { emit }) {
    const internalCards = ref([...props.modelValue.content])
    const drag = ref(false)

    watch(() => props.modelValue.content, newValue => {
      internalCards.value = [...newValue]
    })

    const onStart = () => {
      drag.value = true
    }

    const onEnd = () => {
      drag.value = false
    }

    const stringToComponent = (str: string) => {
    switch (str) {
      case 'Plotly':
        return Plotly
      default:
        return null
    }
  }

    const handleUpdate = () => {
      emit('update:modelValue', { content: internalCards.value })
    }

    return {
      internalCards,
      drag,
      onStart,
      onEnd,
      handleUpdate,
      stringToComponent
    }
  }
}
</script>

<style scoped>
.handle {
  cursor: move;
}

.dragArea {
  display: flex;
  flex-wrap: wrap;
}

.ghost {
  opacity: 0.5;
  background: #ccc;
  border: 1px dashed #999;
  box-shadow: 0 0 0 1px #999;
}
</style>
