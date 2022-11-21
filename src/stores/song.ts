import Player from "@/audio/play";
import { SampleTrack } from "@/audio/track";
import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";

export const useSongStore = defineStore("song", () => {
  const audioContext = ref(new AudioContext());
  const error = reactive({ active: false, message: "" });
  const gainNode = audioContext.value.createGain();
  const player = ref(new Player(16, 1 / 16, 0.075, 120.0, 0.025));
  const tempo = ref(120);
  const tracks = reactive([
    new SampleTrack("Kick", "data/kick.wav", player.value.length),
    new SampleTrack("Snare", "data/snare.wav", player.value.length),
    new SampleTrack("Mid-Tom", "data/tom.wav", player.value.length),
    new SampleTrack("Hi-Hat", "data/hi_hat.wav", player.value.length),
  ]);

  const volume = computed(() => 100 * gainNode.gain.value);

  function clearError(): void {
    error.message = "";
    error.active = false;
  }

  async function loadSamples(): Promise<void> {
    await Promise.all(
      tracks.map((track) => track.loadSample(audioContext.value))
    );
  }

  function setTempo(value: number): void {
    tempo.value = value;
    player.value.tempo = value;
  }

  function setVolume(value: number): void {
    gainNode.gain.value = value / 100.0;
  }

  function playNote(trackName: string): void {
    const track = tracks.filter((track) => track.name == trackName)[0];
    track.note(audioContext.value, gainNode, 0.0);
  }

  function toggleNoteActive(trackName: string, noteIndex: number): void {
    const track = tracks.filter((track) => track.name == trackName)[0];
    track.notes[noteIndex].active = !track.notes[noteIndex].active;
  }

  function togglePlaying(): void {
    if (!player.value.loop && tempo.value <= 0) {
      error.message = "Cannot play with non-positive tempo";
      error.active = true;
      return;
    }

    player.value.loop = !player.value.loop;
    if (player.value.loop) {
      // Google Chrome requires an audio context to start or resume after a
      // user event. For more information, visit https://goo.gl/7K7WLu.
      audioContext.value.resume();
      gainNode.connect(audioContext.value.destination);
      player.value.timer = audioContext.value.currentTime;
      player.value.playTick(audioContext.value, gainNode, tracks);
    }
  }

  return {
    audioContext,
    clearError,
    error,
    gainNode,
    loadSamples,
    player,
    playNote,
    tempo,
    tracks,
    toggleNoteActive,
    togglePlaying,
    volume,
    setTempo,
    setVolume,
  };
});
