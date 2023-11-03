<template>
  <v-card>
    <v-card-title>
      <v-icon
        class="handle"
        end
        icon="mdi-drag"
      ></v-icon>
    </v-card-title>
    <v-card-text>
      <div ref="plot" style="width:90%;height:250px;"></div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, watch, toRefs, onMounted } from 'vue'
//import Plotly from 'plotly.js-dist-min'
import Plotly from 'plotly.js'

    const plot = ref(null) 
    onMounted(() => {
      var data = [{
        x: [1999, 2000, 2001, 2002],
        y: [10, 15, 13, 17],
        type: 'scatter'
      }];

      var layout = {
        title: 'Sales Growth',
        xaxis: {
          title: 'Year',
          showgrid: false,
          zeroline: false
        },
        yaxis: {
          title: 'Percent',
          showline: false
        }
      };
      Plotly.newPlot(plot, data, layout);
      })
</script>

<style scoped>
.handle {
  cursor: move;
}
</style>