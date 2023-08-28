import Player from "@/audio/play";
import { SampleTrack } from "@/audio/track";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

class Audio {
  private _context?: AudioContext;
  private _gainNode?: GainNode;

  // Browsers require an audio context to start or resume after a
  // user event. For more information, visit https://goo.gl/7K7WLu.
  context(): AudioContext {
    if (this._context === undefined) {
      this._context = new AudioContext();
    }
    return this._context;
  }

  gainNode(): GainNode {
    if (this._gainNode === undefined) {
      this._gainNode = this.context().createGain();
    }
    return this._gainNode;
  }
}

export const useSongStore = defineStore("song", () => {
  const audio = new Audio();
  const alert = reactive({ message: "", type: "error" });
  const player = ref(new Player(16, 1 / 16, 0.075, 120.0, 0.025));
  const tempo = ref(120);
  const tracks = reactive([
    new SampleTrack("Kick", "data/kick.wav", player.value.length),
    new SampleTrack("Snare", "data/snare.wav", player.value.length),
    new SampleTrack("Mid-Tom", "data/tom.wav", player.value.length),
    new SampleTrack("Hi-Hat", "data/hi_hat.wav", player.value.length),
  ]);
  const volume = ref(100.0);

  function resetAlert(): void {
    alert.message = "";
  }

  async function loadSamples(): Promise<void> {
    await Promise.all(tracks.map((track) => track.loadSample(audio.context())));
  }

  function setTempo(value: number): void {
    tempo.value = value;
    player.value.tempo = value;
  }

  function setVolume(value: number): void {
    volume.value = value;
    audio.gainNode().gain.value = value / 100.0;
  }

  function playNote(trackName: string): void {
    const context = audio.context();
    context.resume();
    audio.gainNode().connect(context.destination);

    const track = tracks.filter((track) => track.name == trackName)[0];
    track.note(audio.context(), audio.gainNode(), 0.0);
  }

  function toggleNoteActive(trackName: string, noteIndex: number): void {
    const track = tracks.filter((track) => track.name == trackName)[0];
    track.notes[noteIndex].active = !track.notes[noteIndex].active;
  }

  function togglePlaying(): void {
    if (!player.value.loop && tempo.value <= 0) {
      alert.message = "Tempo must be a postive number";
      alert.type = "error";
      return;
    }

    player.value.loop = !player.value.loop;
    if (player.value.loop) {
      const context = audio.context();
      context.resume();
      const gainNode = audio.gainNode();

      gainNode.connect(context.destination);
      player.value.timer = context.currentTime;
      player.value.playTick(context, gainNode, tracks);
    }
  }

  return {
    alert,
    audio,
    loadSamples,
    player,
    playNote,
    resetAlert,
    setTempo,
    setVolume,
    tempo,
    toggleNoteActive,
    togglePlaying,
    tracks,
    volume,
  };
});
