<template>
  <v-tabs
      v-model="tab"
    >
      <v-tab
        v-for="n in length"
        :key="n"
        :value="n"
      >
        Item {{ n }}
      </v-tab>
    </v-tabs>
</template>


<script lang="ts">
export default {
    data: () => ({
      length: 15,
      tab: 0,
    }),

    watch: {
      length (val) {
        this.tab = val - 1
      },
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
