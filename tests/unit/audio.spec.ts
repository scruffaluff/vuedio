import { durationToSeconds } from "@/audio/util";
import Player from "@/audio/play";
import { Track } from "@/audio/track";
import Note from "@/audio/note";

class MockTrack implements Track {
  name: string;

  notes: Array<Note>;

  record: Array<[number, number]>;

  constructor() {
    this.name = "MockTrack";
    this.notes = [];
    this.record = [];
  }

  play(_context: AudioContext, index: number, time: number) {
    this.record.push([index, time]);
  }
}

describe("Util", () => {
  test("Sanity check for durationToSeconds", () => {
    const actual = durationToSeconds(60.0, 1);
    expect(actual).toBe(4.0);
  });
});

describe("Play", () => {
  test("Check timing for playing tracks", () => {
    const context = { currentTime: 0.1 } as AudioContext;
    const track = new MockTrack();

    const player = new Player(16, 1 / 16, 0.075, 120.0, 0.025);
    player.playTick(context, [track]);

    expect(track.record).toEqual([[0, 0.15]]);
  });
});
