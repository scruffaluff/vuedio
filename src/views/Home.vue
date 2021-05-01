<template>
  <div class="mt-12">
    <ControlBar></ControlBar>
    <v-container class="note-list-container">
      <NoteList name="Kick"></NoteList>
      <NoteList name="Snare"></NoteList>
      <NoteList name="Hi-Hat"></NoteList>
    </v-container>
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
});
</script>

<style>
.note-list-container {
  max-width: 920px;
}
</style>
