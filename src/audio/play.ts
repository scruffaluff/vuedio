import { Track } from "@/audio/track";
import { durationToSeconds } from "@/audio/util";

export default class Player {
  index: number;

  length: number;

  lookahead: number;

  loop: boolean;

  step: number;

  tempo: number;

  timer: number;

  tick: number;

  constructor(
    length: number,
    lookahead: number,
    step: number,
    tempo: number,
    tick: number
  ) {
    this.index = -1;
    this.length = length;
    this.lookahead = lookahead;
    this.loop = false;
    this.step = step;
    this.tempo = tempo;
    this.tick = tick;
    this.timer = 0;
  }

  next(duration: number, stop: number): boolean {
    if (this.timer + duration >= stop) {
      return false;
    }

    this.timer += duration;
    this.index = (this.index + 1) % this.length;
    return this.timer < stop;
  }

  playTick(context: AudioContext, tracks: Array<Track>): void {
    const duration = durationToSeconds(this.tempo, this.step);
    const stop = context.currentTime + this.lookahead;

    while (this.next(duration, stop)) {
      tracks.forEach((track) => track.play(context, this.index, this.timer));
    }

    if (this.loop) {
      setTimeout(() => this.playTick(context, tracks), 1000 * this.tick);
    }
  }
}
