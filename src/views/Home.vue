<template>
  <v-card>
    <v-app>
      <v-navigation-drawer
        expand-on-hover
        rail
      >
        <v-list>
          <v-list-item
            prepend-avatar="src/assets/airplanelogo.png"
            title="Ardu Logger"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item @click="showInputManager = true" prepend-icon="mdi-folder" title="Data Sources" value="myfiles"></v-list-item>
          <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared"></v-list-item>
          <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <v-container fluid>
          <Dashboard />
          <v-dialog v-model="showInputManager" width="auto" min-width="500px">
            <InputManager />
          </v-dialog>
        </v-container>

      </v-main>
    </v-app>
  </v-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Page from '@/components/Page.vue';
import Dashboard from '../components/Dashboard.vue'
import InputManager from '@/components/InputManager.vue';

const showInputManager = ref(false);

{
    Page
    Dashboard
    InputManager
  }

</script>
