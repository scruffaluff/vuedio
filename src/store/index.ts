import Vue from "vue";
import Vuex from "vuex";
import Player from "@/audio/play";
import { SampleTrack } from "@/audio/track";

Vue.use(Vuex);
const player = new Player(16, 1 / 16, 0.075, 120.0, 0.025);

export default new Vuex.Store({
  actions: {},

  modules: {},

  mutations: {
    setVolume(state, value: number): void {
      state.volume = value;
    },
    toggleNoteActive(state, { trackName, noteIndex }): void {
      const track = state.tracks.filter((track) => track.name == trackName)[0];
      track.notes[noteIndex].active = !track.notes[noteIndex].active;
    },
    togglePlaying(state): void {
      state.playing = !state.playing;
    },
  },

  state: {
    player: player,
    playing: false,
    tracks: [
      new SampleTrack("Kick", "samples/kick.wav", player.length),
      new SampleTrack("Snare", "samples/snare.wav", player.length),
      new SampleTrack("Mid-Tom", "samples/mid_tom.wav", player.length),
      new SampleTrack("Hi-Hat", "samples/closed_hihat.wav", player.length),
    ],
    volume: 50,
  },
});
