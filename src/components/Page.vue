<template>
  <v-row class="dragArea">
    <!-- First column draggable area -->
    <draggable
      v-model="internalCards[0]"
      group="people"
      handle=".handle"
      @start="onStart"
      @end="onEnd"
      ghost-class="ghost"
      item-key="id"
      class="dragColumn"
      @update="handleUpdate">
      <template #item="{element}">
        <v-col cols="12">
          <v-card>
            <!-- Pass a method to the component that allows it to emit a delete event -->
            <component :is="stringToComponent(element.type)" :modelValue="element" @delete="deleteCard" />
          </v-card>
        </v-col>
      </template>
    </draggable>

    <!-- Second column draggable area -->
    <draggable
      v-model="internalCards[1]"
      group="people"
      handle=".handle"
      @start="onStart"
      @end="onEnd"
      ghost-class="ghost"
      item-key="id"
      class="dragColumn"
      @update="handleUpdate">
      <template #item="{element, index}">
        <v-col cols="12">
          <v-card>
            <!-- Pass a method to the component that allows it to emit a delete event -->
            <component :is="stringToComponent(element.type)" :modelValue="element" @delete="deleteCard(element.id)" />
          </v-card>
        </v-col>
      </template>
    </draggable>
    <v-btn
      fab
      dark
      small
      color="primary"
      class="add-button"
      @click="addCard">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-row>
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
      emit('update:modelValue', {
        ...props.modelValue,
        content: [...internalCards.value]
      })
    }

    // Add a method to handle the delete event
    const deleteCard = (id: number) => {
      // Remove the card from the array
      internalCards.value[0] = internalCards.value[0].filter((card: { id: number }) => card.id !== id)
      internalCards.value[1] = internalCards.value[1].filter((card: { id: number }) => card.id !== id)
      // Emit an update event to the parent component
      emit('update:modelValue', {
        ...props.modelValue,
        content: [...internalCards.value]
      })
    }

    const newId = () => {
      const allCards = [...internalCards.value[0], ...internalCards.value[1]]
      return allCards.map((card: { id: any }) => card.id).reduce((a: number, b: number) => Math.max(a, b), 0) + 1
    }

    const addCard = () => {
      internalCards.value[0].push(
        {
          type: "Plotly",
          name: 'Plot 2',
          content: undefined,
          id: newId(),
        })

      // Emit an update event to the parent component
      emit('update:modelValue', {
        ...props.modelValue,
        content: [...internalCards.value]
      });
    };

    return {
      internalCards,
      drag,
      onStart,
      onEnd,
      handleUpdate,
      stringToComponent,
      deleteCard,
      addCard
    }
  }
}
</script>

<style scoped>
.dragArea {
  display: flex;
  flex-direction: row;
}

.dragColumn {
  flex: 1; /* Makes both columns equal width */
  min-width: 0; /* Fixes flexbox overflow issue */
}

.ghost {
  opacity: 0.5;
  background: #ccc;
  border: 1px dashed #999;
  box-shadow: 0 0 0 1px #999;
}

/* Responsive design for smaller screens */
@media (max-width: 900px) {
  .dragArea {
    flex-direction: column;
  }

  .dragColumn {
    flex: 0 0 100%; /* This ensures that each column takes full width */
    max-width: 100%; /* This ensures that each column is not more than 100% width */
    box-sizing: border-box; /* This ensures padding and borders are included in the width */
  }
}

.add-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 2; /* Ensures the button stays above other elements */
}
</style>
