<template>
  <v-container data-testid="contol-bar-component">
    <v-row justify="center">
      <v-col cols="1">
        <v-btn>
          <v-icon
            @click="song.togglePlaying()"
            data-testid="contol-bar-play-button"
          >
            {{ song.player.loop ? "mdi-pause" : "mdi-play" }}
          </v-icon>
        </v-btn>
      </v-col>
      <v-col cols="2">
        <v-text-field
          :rules="rules"
          :value="song.tempo"
          @input="song.setTempo($event)"
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
          :value="song.volume"
          @click:append="toggleMute()"
          @input="song.setVolume($event)"
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

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { useSongStore } from "@/stores/song";

const volumeIcon = computed(() => {
  if (song.volume === 0) {
    return "mdi-volume-mute";
  } else if (song.volume < 33) {
    return "mdi-volume-low";
  } else if (song.volume < 66) {
    return "mdi-volume-medium";
  } else {
    return "mdi-volume-high";
  }
});

const song = useSongStore();

const rules = reactive([
  (text: string): boolean | string =>
    !isNaN(Number(text)) || "Must be a number",
  (text: string): boolean | string => Number(text) > 0 || "Must be positive",
]);

const volumePrevious = ref(0);

function toggleMute(): void {
  const currentVolume = song.volume;
  song.setVolume(volumePrevious.value);
  volumePrevious.value = currentVolume;
}
</script>
