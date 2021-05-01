export function durationToSeconds(tempo: number, duration: number): number {
  return 4 * duration * (60.0 / tempo);
}

export async function getSample(
  context: AudioContext,
  filepath: string
): Promise<AudioBuffer> {
  const response = await fetch(filepath);
  const arrayBuffer = await response.arrayBuffer();
  return context.decodeAudioData(arrayBuffer);
}
