<template>
  <v-card>
    <v-card-title>
      <v-icon
        class="handle"
        end
        icon="mdi-drag"
      ></v-icon>

      <!-- This spacer pushes the delete icon to the right -->
      <v-spacer></v-spacer>

      <v-btn icon @click="openConfig">
        <v-icon>mdi-cog</v-icon>
      </v-btn>
      <v-btn icon @click="emit('delete')">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <div id="plotly" ref="plot" style="width:90%;height:250px;"></div>
    </v-card-text>
  </v-card>
   <!-- Configuration Dialog -->
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        Configuration
        <v-spacer></v-spacer>
        <v-btn icon @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <!-- Form for configuration options -->
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Name"
                v-model="name"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <!-- You can expand your options form here -->
              <v-text-field
                label="Option"
                v-model="content.options.optionName"
              ></v-text-field>
            </v-col>
            <!-- Add other form controls as needed -->
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="updateContent">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
    import { ref, watch, toRefs, onMounted, defineProps, defineEmits } from 'vue'
    //import Plotly from 'plotly.js-dist-min'
    import Plotly from 'plotly.js-dist'

    const props = defineProps({
      modelValue: {
        type: Object,
        required: true,
        default: () => ({})
      }
    })

    const dialog = ref(false)
    const name = ref('')
    const content = ref({ names: [], options: {} })

    // Ensure modelValue has all required fields
    const initializeModelValue = () => {
      // Check for 'content' and initialize if necessary
      if (!props.modelValue.content) {
        props.modelValue.content = { names: [], options: {} }
      } else {
        // Ensure 'names' and 'options' are initialized
        if (!props.modelValue.content.names) {
          props.modelValue.content.names = []
        }
        if (!props.modelValue.content.options) {
          props.modelValue.content.options = {}
        }
      }

      // Now you can safely use the 'name' and 'content' refs
      name.value = props.modelValue.name || ''
      content.value = props.modelValue.content
    }

    const openConfig = () => {
      initializeModelValue() // Call here to ensure data is correct when opening the dialog
      dialog.value = true
    }

    const updateContent = () => {
      // Update content based on the dialog input
      content.value.names.push(name.value)
      // Update other options as needed
      props.modelValue.content = content.value // Ensure the modelValue is updated with the ref
      dialog.value = false
      emit('update:modelValue', props.modelValue)
    }

    const emit = defineEmits(['delete', 'update:modelValue'])

    const plot = ref(null)
    onMounted(() => {
      initializeModelValue()
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

/* Additional styles to ensure proper alignment, if necessary */
.v-card-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Ensure the handle and delete icon do not wrap on smaller screens */
.handle, .v-btn {
  flex-shrink: 0;
}
</style>