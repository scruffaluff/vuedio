import Note from "@/audio/note";
import Player from "@/audio/play";
import { Track } from "@/audio/track";
import { durationToSeconds } from "@/audio/util";
import { expect, test } from "vitest";

class MockTrack implements Track {
  name: string;

  notes: Array<Note>;

  record: Array<[number, number]>;

  constructor() {
    this.name = "MockTrack";
    this.notes = [];
    this.record = [];
  }

  play(
    _context: AudioContext,
    _destination: AudioNode,
    index: number,
    time: number
  ) {
    this.record.push([index, time]);
  }
}

test("Sanity check for durationToSeconds", () => {
  const actual = durationToSeconds(60.0, 1);
  expect(actual).toBe(4.0);
});

test("Check timing for playing tracks", () => {
  const context = { currentTime: 0.1 } as AudioContext;
  const destination = {} as AudioNode;
  const track = new MockTrack();

  const player = new Player(16, 1 / 16, 0.075, 120.0, 0.025);
  player.playTick(context, destination, [track]);

  expect(track.record).toEqual([[0, 0.15]]);
});
