<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app></v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Vuedio</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <v-col class="text-center" cols="12">
        Designed by Wolfgang Wazzle Strauss
      </v-col>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",
  data: () => ({
    drawer: null,
  }),
});
</script>
