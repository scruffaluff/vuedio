<template>
  <div class="my-2 flex flex-row" :data-testid="testId">
    <button
      class="btn btn-secondary mr-4 w-32"
      @click="() => song.playNote(props.track.name)"
    >
      {{ props.track.name }}
    </button>
    <button
      class="btn mr-1"
      v-for="note of props.track.notes"
      :key="note.index"
      :class="{ 'btn-secondary': note.active }"
      @click="() => song.toggleNoteActive(props.track.name, note.index)"
    ></button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Track } from "@/audio/track";
import { useSongStore } from "@/stores/song";

const props = defineProps<{ track: Track }>();
const song = useSongStore();
const testId = computed(() => `note-list--${props.track.name.toLowerCase()}`);
</script>
