<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="1">
        <v-btn>
          <v-icon @click="$store.commit('togglePlaying')">
            {{ $store.state.playing ? "mdi-pause" : "mdi-play" }}
          </v-icon>
        </v-btn>
      </v-col>
      <v-col cols="1">120</v-col>
      <v-col cols="4">
        <v-slider
          hint="Volume"
          max="100"
          min="0"
          :append-icon="volumeIcon"
          thumb-label
          v-model="$store.state.volume"
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
      if (this.$store.state.volume === 0) {
        return "mdi-volume-mute";
      } else if (this.$store.state.volume < 33) {
        return "mdi-volume-low";
      } else if (this.$store.state.volume < 66) {
        return "mdi-volume-medium";
      } else {
        return "mdi-volume-high";
      }
    },
  },
  data: () => ({
    volumePrevious: 0,
  }),
  methods: {
    toggleMute() {
      const currentVolume = this.$store.state.volume;
      this.$store.commit("setVolume", this.volumePrevious);
      this.volumePrevious = currentVolume;
    },
  },
});
</script>
