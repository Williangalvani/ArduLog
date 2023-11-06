<template>
  <div>
    <v-tabs v-model="tab">
      <v-tab
        v-for="item in tabs"
        :key="item.id"
        :value="item.id"
      >
        {{ item.name }}
        <v-btn size="x-small" icon="mdi-close" variant="text" @click.stop="removeTab(item.id)">
        </v-btn>
      </v-tab>
      <v-tab @click="addTab">
        <v-icon>mdi-plus</v-icon>
      </v-tab>
    </v-tabs>
    <v-row>
     <v-col cols="10">
      <page v-model="tabs[tab]" />
    </v-col>
    <v-col cols="2">
      <vue-json-pretty :data="tabs" />
    </v-col>  
    </v-row>
    <FileDragModal />
  </div>
</template>

<script lang="ts">
import { ref, reactive } from 'vue'
import Page from './Page.vue'
import VueJsonPretty from 'vue-json-pretty';
import FileDragModal from './FileDropModal.vue'
import 'vue-json-pretty/lib/styles.css';

export default {
  name: 'Dashboard',
  components: {
    Page,
    FileDragModal,
    VueJsonPretty,
  },
  setup() {
    const tabs = reactive([
      { id: 0, name: 'Item 1', content: [
        { type: "Plotly", name: 'Plot 1', content: 'Content 1', id: 0 },
        { type: "Plotly", name: 'Plot 2', content: 'Content 2', id: 1 }
      ]},
      { id: 1, name: 'Item 2', content: [] },
      { id: 2, name: 'Item 3', content: [] },
      { id: 3, name: 'Item 4', content: [] },
      { id: 4, name: 'Item 5', content: [] }
    ])
    const tab = ref(0)
    const nextTabId = ref(5)

    const addTab = () => {
      const newTab = {
        id: nextTabId.value,
        name: `Item ${nextTabId.value + 1}`,
        content: {}
      }
      tabs.push(newTab)
      tab.value = newTab.id
      nextTabId.value++
    }

    const removeTab = (tabId: number) => {
      const index = tabs.findIndex(item => item.id === tabId)
      if (index !== -1) {
        tabs.splice(index, 1)
      }
      if (tabs.length > 0) {
        tab.value = tabs[0].id
      } else {
        tab.value = 0
      }
    }

    return {
      tabs,
      tab,
      addTab,
      removeTab
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
