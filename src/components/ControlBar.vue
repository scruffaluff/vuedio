<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="1">
        <v-btn>
          <v-icon @click="playing = !playing">
            {{ playing ? "mdi-pause" : "mdi-play" }}
          </v-icon>
        </v-btn>
      </v-col>
      <v-col cols="1"> 120 </v-col>
      <v-col cols="4">
        <v-slider
          hint="Volume"
          max="100"
          min="0"
          :append-icon="volumeIcon"
          thumb-label
          v-model="volume"
          @click:append="toggleMute"
        >
        </v-slider>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  computed: {
    volumeIcon(): string {
      if (this.volume === 0) {
        return "mdi-volume-mute";
      } else if (this.volume < 33) {
        return "mdi-volume-low";
      } else if (this.volume < 66) {
        return "mdi-volume-medium";
      } else {
        return "mdi-volume-high";
      }
    },
  },
  data: () => ({
    playing: false,
    volume: 50,
    volumePrevious: 0,
  }),
  methods: {
    toggleMute() {
      [this.volume, this.volumePrevious] = [this.volumePrevious, this.volume];
    },
  },
});
</script>
