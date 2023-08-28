<template>
  <div class="flex-start flex flex-row">
    <button
      class="btn btn-primary shadow-md"
      data-testid="contol-bar--play-button"
      @click="song.togglePlaying()"
    >
      <span :class="playIcon"> </span>
    </button>
    <div
      class="mx-4 flex flex-row items-center rounded-lg bg-primary p-2 shadow-md"
      data-testid="contol-bar--tempo"
    >
      <input
        class="mr-2 w-16 bg-primary text-center outline-none"
        :value="song.tempo"
        type="number"
        @input="
          (event) =>
            song.setTempo((event.target as HTMLInputElement).valueAsNumber)
        "
      />
      <span class="mr-2">bpm</span>
    </div>
    <div
      class="flex flex-row items-center"
      data-testid="contol-bar--volume-slider"
    >
      <input
        class="range range-primary range-xs mr-2"
        :value="song.volume"
        max="100"
        min="0"
        type="range"
        @input="
          (event) =>
            song.setVolume((event.target as HTMLInputElement).valueAsNumber)
        "
      />
      <span
        class="bg-primary text-2xl"
        role="button"
        :class="volumeIcon"
        @click="toggleMute"
      ></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useSongStore } from "@/stores/song";

function toggleMute(): void {
  const currentVolume = song.volume;
  song.setVolume(volumePrevious.value);
  volumePrevious.value = currentVolume;
}

const song = useSongStore();
const volumePrevious = ref(0);

const playIcon = computed(() =>
  song.player.loop ? "icon-[ph--pause-fill]" : "icon-[ph--play-fill]"
);
const volumeIcon = computed(() => {
  if (song.volume === 0) {
    return "icon-[ph--speaker-simple-none-fill]";
  } else if (song.volume < 50) {
    return "icon-[ph--speaker-simple-low-fill]";
  } else {
    return "icon-[ph--speaker-simple-high-fill]";
  }
});
</script>
