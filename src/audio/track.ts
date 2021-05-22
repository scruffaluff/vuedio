import Note from "@/audio/note";
import { getSample } from "@/audio/util";

export interface Track {
  name: string;
  notes: Array<Note>;
  play(
    context: AudioContext,
    destination: AudioNode,
    index: number,
    time: number
  ): void;
}

export class SampleTrack implements Track {
  buffer: AudioBuffer | null;

  filePath: string;

  name: string;

  notes: Array<Note>;

  step: number;

  constructor(name: string, filePath: string, length: number) {
    this.buffer = null;
    this.filePath = filePath;
    this.name = name;
    this.notes = Array.from({ length }, (_, index) => ({
      active: false,
      index,
    }));
    this.step = length;
  }

  async loadSample(context: AudioContext): Promise<void> {
    this.buffer = await getSample(context, this.filePath);
  }

  note(context: AudioContext, destination: AudioNode, time: number): void {
    const source = context.createBufferSource();
    source.buffer = this.buffer;
    source.connect(destination);
    source.start(time);
  }

  play(
    context: AudioContext,
    destination: AudioNode,
    index: number,
    time: number
  ): void {
    if (this.notes[index].active) {
      this.note(context, destination, time);
    }
  }
}
