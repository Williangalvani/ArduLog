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
      <div id="plotly" ref="plot" style="width:90%;height:250px;"></div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, watch, toRefs, onMounted, Prop } from 'vue'
//import Plotly from 'plotly.js-dist-min'
import Plotly from 'plotly.js-dist'

    const props = defineProps({
      modelValue: {
        type: Object,
        required: true,
        default: () => ({
          content: []
        })
      }
    })

    const name = ref(props.modelValue.name)

    const plot = ref(null)
    onMounted(() => {
      console.log(plot.value)
      var data = [{
        x: [1999, 2000, 2001, 2002],
        y: [10, 15, 13, 17],
        type: 'scatter'
      }];

      var config = {responsive: true}
      var layout = {
        title: name.value,
        autosize: true,
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
      Plotly.newPlot(plot.value, data, layout, config);
      })
</script>

<style scoped>
.handle {
  cursor: move;
}

div #plotly {
  width: 100% !important;
  height: 350px !important;
}
</style>