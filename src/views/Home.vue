<template>
  <div class="mt-12">
    <ControlBar></ControlBar>
    <v-container class="note-list-container">
      <NoteList
        :key="track.name"
        :track="track"
        v-for="track in $store.state.tracks"
      />
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
  async mounted() {
    await this.$store.dispatch("loadSamples");
  },
});
</script>

<style>
.note-list-container {
  max-width: 920px;
}
</style>
