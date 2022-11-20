<template>
  <div class="mt-12">
    <ControlBar></ControlBar>
    <v-container class="container">
      <NoteList :key="track.name" :track="track" v-for="track in song.tracks" />
    </v-container>
    <v-snackbar v-model="song.error.active">
      {{ song.error.message }}
      <template v-slot:action="{ attrs }">
        <v-btn
          @click="song.clearError()"
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

<script setup lang="ts">
import { onMounted } from "vue";
import ControlBar from "@/components/ControlBar.vue";
import NoteList from "@/components/NoteList.vue";
import { useSongStore } from "@/stores/song";

const song = useSongStore();
onMounted(async () => await song.loadSamples());
</script>

<style scoped>
.container {
  max-width: 920px;
}
</style>
