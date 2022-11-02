<template>
  <v-row
    class="my-2"
    data-testid="note-list-component"
    justify="center"
    no-gutters
  >
    <v-col cols="2">
      <v-card
        @click="song.playNote(props.track.name)"
        class="font-weight-bold ml-1 mr-4 pl-4 py-1 secondary lighten-4 text-uppercase"
        data-testid="note-list-name"
      >
        {{ props.track.name }}
      </v-card>
    </v-col>
    <v-col :key="note.index" v-for="note of props.track.notes">
      <v-btn
        :class="{ 'lighten-4': !note.active }"
        @click="song.toggleNoteActive(props.track.name, note.index)"
        class="mr-1 note__button primary"
        data-testid="note-list-button"
        height="32"
        hover
        width="32"
      ></v-btn>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { useSongStore } from "@/stores/song";

const props = defineProps(["track"]);
const song = useSongStore();
</script>

<style scoped>
.note__button {
  min-width: 0 !important;
}
</style>
