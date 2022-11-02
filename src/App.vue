<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app></v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Vuedio</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <Home />
      </v-container>
    </v-main>

    <v-footer app>
      <v-col class="text-center" cols="12"> Designed by Scruffaluff </v-col>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Home from "@/views/Home.vue";

const drawer = ref(false);
</script>
