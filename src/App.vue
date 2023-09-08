<template>
  <header class="bg-gradient-to-r from-primary/60 to-primary">
    <nav
      class="flex flex-row items-center px-16 py-4 text-4xl font-extrabold text-primary-content"
    >
      <div class="flex flex-1 flex-row items-center justify-center">
        <div class="icon-[ph--piano-keys-fill] mr-3" alt="Vuedio Logo"></div>
        <h1>Vuedio</h1>
      </div>
      <a
        class="icon-[ph--github-logo-fill] ml-auto"
        aria-label="GitHub repository"
        href="https://github.com/scruffaluff/vuedio"
      ></a>
    </nav>
  </header>
  <main class="flex-1">
    <section class="mx-auto max-w-2xl">
      <ControlBar class="mt-16" />
      <div class="mt-8">
        <NoteList
          v-for="track in song.tracks"
          :key="track.name"
          :track="track"
        />
      </div>
    </section>
  </main>
  <AlertBox v-if="song.alert.message !== ''" />
  <footer class="py-4">
    <div class="mx-auto max-w-2xl text-center">
      Created by Macklan Weinstein
    </div>
  </footer>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import AlertBox from "@/components/AlertBox.vue";
import ControlBar from "@/components/ControlBar.vue";
import NoteList from "@/components/NoteList.vue";
import { useSongStore } from "@/stores/song";

const song = useSongStore();
onMounted(async () => await song.loadSamples());
</script>
