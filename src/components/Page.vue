<template>
    <draggable 
      v-model="cards" 
      group="people" 
      handle=".handle"
      @start="drag=true" 
      @end="drag=false" 
      ghost-class="ghost"
      item-key="id">
      <template #item="{element}">
          <v-col cols="12">
            <v-card>
              <v-card-title>
                <v-icon
                  class="handle"
                  end
                  icon="mdi-drag"
                ></v-icon>
                {{element.name}}
              </v-card-title>
              <v-card-text>
                <v-img src="https://user-images.githubusercontent.com/6562690/54934415-b4d25b80-4edb-11e9-8758-fb29ada50499.png"></v-img>
                {{element.content}}
              </v-card-text>
            </v-card>
          </v-col>
      </template>
    </draggable>
</template>


<script lang="ts">
import { ref } from 'vue'
import draggable from 'vuedraggable'

export default {
  components: {
    draggable
  },
  setup() {
    const cards = ref([
      { name: 'Plot 1', content: 'Content 1' },
      { name: 'Plot 2', content: 'Content 2' },
      { name: 'Plot 3', content: 'Content 3' },
      // ... add more cards as needed
    ])

    return {
      cards
    }
  },
  data() {
    return {
      drag: false,
    }
  },
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
