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
    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in tabs"
        :key="item.id"
        :value="item.id"
      >
        <!-- This is where you can add content for each tab using the item.content object -->
        {{ item.content }}
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script lang="ts">
export default {
  data: () => ({
    tabs: [
      { id: 0, name: 'Item 1', content: {} },
      { id: 1, name: 'Item 2', content: {} },
      { id: 2, name: 'Item 3', content: {} },
      { id: 3, name: 'Item 4', content: {} },
      { id: 4, name: 'Item 5', content: {} }
    ],
    tab: 0,
    nextTabId: 5
  }),
  methods: {
    addTab() {
      const newTab = {
        id: this.nextTabId,
        name: `Item ${this.nextTabId + 1}`,
        content: {}
      }
      this.tabs.push(newTab)
      this.tab = newTab.id
      this.nextTabId++
    },
    removeTab(tabId: number) {
      const index = this.tabs.findIndex(item => item.id === tabId)
      if (index !== -1) {
        this.tabs.splice(index, 1)
      }
      if (this.tabs.length > 0) {
        this.tab = this.tabs[0].id
      } else {
        this.tab = 0
      }
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
