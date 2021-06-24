<template>
  <div class="mt-12">
    <ControlBar></ControlBar>
    <v-container class="container">
      <NoteList
        :key="track.name"
        :track="track"
        v-for="track in $store.state.tracks"
      />
    </v-container>
    <v-snackbar v-model="$store.state.error">
      {{ $store.state.errorMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn
          @click="$store.commit('clearError')"
          color="red"
          data-testid="snackbar-error"
          text
          v-bind="attrs"
        >
          Ignore
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ControlBar from "@/components/ControlBar.vue";
import NoteList from "@/components/NoteList.vue";

export default Vue.extend({
  name: "Home",
  components: {
    ControlBar,
    NoteList,
  },
  async mounted() {
    await this.$store.dispatch("loadSamples");
  },
});
</script>

<style scoped>
.container {
  max-width: 920px;
}
</style>
