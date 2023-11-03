<template>
  <v-card>
    <v-card-title>
      <v-icon
        class="handle"
        end
        icon="mdi-drag"
      ></v-icon>
      {{modelValue.name}}
    </v-card-title>
    <v-card-text>
      <div ref="plot" style="width:90%;height:250px;"></div>
      {{modelValue.content}}
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { ref, watch, toRefs, onMounted } from 'vue'
import Plotly from 'plotly.js-dist-min'

export default {
  props: {
    modelValue: {
      type: Object,
      required: true
    }
  },

  
  setup(props) {

    const plot = ref(null) 
    onMounted(() => {

    Plotly.plot( plot, [{
      x: [1, 2, 3, 4, 5],
      y: [1, 2, 4, 8, 16] }], { 
        margin: { t: 0 } }, {showSendToCloud:true} );
        
      })
    return {
      plot
    }
  }
}
</script>

<style scoped>
.handle {
  cursor: move;
}
</style>