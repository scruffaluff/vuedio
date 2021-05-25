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
      <v-col cols="2">
        <v-text-field
          :rules="rules"
          :value="tempo"
          @input="setTempo"
          data-testid="contol-bar-tempo"
          dense
          hide-details="auto"
          solo-inverted
          suffix="bpm"
          type="number"
        ></v-text-field>
      </v-col>
      <v-col cols="4">
        <v-slider
          :append-icon="volumeIcon"
          :value="volume"
          @click:append="toggleMute"
          @input="setVolume"
          data-testid="contol-bar-volume-slider"
          hint="Volume"
          max="100"
          min="0"
          thumb-label
        >
        </v-slider>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";

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
    ...mapState(["tempo", "volume"]),
  },
  data: () => ({
    rules: [
      (text: string): boolean | string =>
        !isNaN(Number(text)) || "Must be a number",
      (text: string): boolean | string =>
        Number(text) > 0 || "Must be positive",
    ],
    volumePrevious: 0,
  }),
  methods: {
    setTempo(value: string): void {
      this.$store.commit("setTempo", Number(value));
    },
    setVolume(value: number): void {
      this.$store.commit("setVolume", value);
    },
    toggleMute(): void {
      const currentVolume = this.volume;
      this.$store.commit("setVolume", this.volumePrevious);
      this.volumePrevious = currentVolume;
    },
  },
});
</script>
