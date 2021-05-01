import { Track } from "@/audio/track";
import { durationToSeconds } from "@/audio/util";

/**
 * Manages playback and scheduling of tracks through a web audio context.
 */
export default class Player {
  /** Internal position counter. */
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

  /**
   * Check if next audio step is within the current schedular lookahead range.
   *
   * @param stepDuration  Size of next audio step.
   * @param stop  End of lookahead range.
   * @returns Whether step is within the current schedular lookahead range.
   */
  next(stepDuration: number, lookaheadStop: number): boolean {
    if (this.timer + stepDuration >= lookaheadStop) {
      return false;
    }

    this.timer += stepDuration;
    this.index = (this.index + 1) % this.length;
    return true;
  }

  /**
   * Schedules audio playback for tracks.
   *
   * @param context  Associated audio context.
   * @param tracks  Tracks to play.
   */
  playTick(context: AudioContext, tracks: Array<Track>): void {
    const stepDuration = durationToSeconds(this.tempo, this.step);
    const lookaheadStop = context.currentTime + this.lookahead;

    while (this.next(stepDuration, lookaheadStop)) {
      tracks.forEach((track) => track.play(context, this.index, this.timer));
    }

    if (this.loop) {
      setTimeout(() => this.playTick(context, tracks), 1000 * this.tick);
    }
  }
}
