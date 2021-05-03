<template>
  <v-row justify="center" class="my-2" no-gutters>
    <v-col cols="2">
      <v-card
        class="font-weight-bold ml-1 mr-4 pl-4 py-1 secondary lighten-4 text-uppercase"
      >
        {{ track.name }}
      </v-card>
    </v-col>
    <v-col :key="note.index" v-for="note of track.notes">
      <v-btn
        :class="{ 'lighten-4': !note.active }"
        @click="
          $store.commit('toggleNoteActive', {
            trackName: track.name,
            noteIndex: note.index,
          })
        "
        class="mr-1 note-button primary"
        height="32"
        hover
        width="32"
      ></v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "NoteList",
  props: ["track"],
});
</script>

<style>
.note-button {
  min-width: 0 !important;
}
</style>
