<template>
  <v-container data-testid="contol-bar-component">
    <v-row justify="center">
      <v-col cols="1">
        <v-btn>
          <v-icon
            @click="$store.commit('togglePlaying')"
            data-testid="contol-bar-play-button"
          >
            {{ $store.state.player.loop ? "mdi-pause" : "mdi-play" }}
          </v-icon>
        </v-btn>
      </v-col>
      <v-col cols="1">120</v-col>
      <v-col cols="4">
        <v-slider
          :append-icon="volumeIcon"
          @click:append="toggleMute"
          data-testid="contol-bar-volume-slider"
          hint="Volume"
          max="100"
          min="0"
          thumb-label
          v-model="$store.state.volume"
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
