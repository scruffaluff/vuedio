import Vue from "vue";
import Vuex from "vuex";
import Player from "@/audio/play";
import { SampleTrack } from "@/audio/track";

Vue.use(Vuex);
const player = new Player(16, 1 / 16, 0.075, 120.0, 0.025);

export default new Vuex.Store({
  actions: {
    async loadSamples({ state }) {
      await Promise.all(
        state.tracks.map((track) => track.loadSample(state.audioContext))
      );
    },
  },

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
      state.player.loop = !state.player.loop;

      if (state.player.loop) {
        state.audioContext.resume();
        state.player.timer = state.audioContext.currentTime;
        state.player.playTick(state.audioContext, state.tracks);
      }
    },
  },

  state: {
    audioContext: new AudioContext(),
    player: player,
    tracks: [
      new SampleTrack("Kick", "data/kick.wav", player.length),
      new SampleTrack("Snare", "data/snare.wav", player.length),
      new SampleTrack("Mid-Tom", "data/tom.wav", player.length),
      new SampleTrack("Hi-Hat", "data/hi_hat.wav", player.length),
    ],
    volume: 50,
  },
});
