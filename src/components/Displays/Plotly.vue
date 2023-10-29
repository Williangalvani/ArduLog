<template>
  <v-card>
    <v-card-title>
      <v-icon
        class="handle"
        end
        icon="mdi-drag"
      ></v-icon>
      PLOTLY NERVOSO{{modelValue.name}}
    </v-card-title>
    <v-card-text>
      <v-img src="https://user-images.githubusercontent.com/6562690/54934415-b4d25b80-4edb-11e9-8758-fb29ada50499.png"></v-img>
      {{modelValue.content}}
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { ref, watch, toRefs } from 'vue'

export default {
  props: {
    modelValue: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      count: 0
    }
  },

  // Methods are functions that mutate state and trigger updates.
  // They can be bound as event handlers in templates.
  methods: {
    increment() {
      this.count++
    }
  },

  // Lifecycle hooks are called at different stages
  // of a component's lifecycle.
  // This function will be called when the component is mounted.
  mounted() {
    console.log(`The initial count is ${this.count}.`)
  }
}
</script>