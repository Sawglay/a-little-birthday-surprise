// One traditional Happy Birthday verse, synthesized as a gentle music-box melody.
// No external recording, tracking, download, or looping.
export const verse: ReadonlyArray<readonly [number, number]> = [
  [67,.75],[67,.25],[69,1],[67,1],[72,1],[71,2],
  [67,.75],[67,.25],[69,1],[67,1],[74,1],[72,2],
  [67,.75],[67,.25],[79,1],[76,1],[72,1],[71,1],[69,2],
  [77,.75],[77,.25],[76,1],[72,1],[74,1],[72,2],
];
export type SongStatus = 'ready' | 'playing' | 'finished' | 'unavailable';
export class BirthdayMelody {
  private context: AudioContext | null = null;
  private consumed = false;
  private busy = false;
  private disposed = false;
  constructor(private factory: () => AudioContext, private notify: (status: SongStatus) => void) {}
  async play(userGesture = false) {
    if (this.consumed || this.busy || this.disposed) return;
    this.busy = true;
    let ctx: AudioContext | null = null;
    try {
      ctx = this.factory();
      this.context = ctx;
      // Do not await resume on autoplay: some browsers leave that promise pending
      // until a user gesture. Show a tap-to-play control instead.
      if (ctx.state !== 'running' && userGesture) await ctx.resume();
      if (this.disposed || this.consumed) { if (ctx.state !== 'closed') void ctx.close().catch(() => {}); return; }
      if (ctx.state !== 'running') {
        void ctx.close().catch(() => {}); this.context = null;
        this.notify('ready'); return;
      }
      this.consumed = true;
      this.notify('playing');
      let time = ctx.currentTime + .06;
      verse.forEach(([midi, beats], index) => {
        const duration = beats * .42;
        const oscillator = ctx!.createOscillator();
        const gain = ctx!.createGain();
        oscillator.type = 'triangle';
        oscillator.frequency.value = 440 * 2 ** ((midi - 69) / 12);
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(.10, time + .012);
        gain.gain.exponentialRampToValueAtTime(.0001, time + duration * .92);
        oscillator.connect(gain); gain.connect(ctx!.destination);
        if (index === verse.length - 1) oscillator.onended = () => {
          if (!this.disposed && this.context === ctx) {
            this.context = null; this.notify('finished');
            if (ctx!.state !== 'closed') void ctx!.close().catch(() => {});
          }
        };
        oscillator.start(time); oscillator.stop(time + duration);
        time += duration;
      });
    } catch {
      if (ctx && ctx.state !== 'closed') void ctx.close().catch(() => {});
      this.context = null;
      if (!this.disposed) this.notify(this.consumed ? 'finished' : 'unavailable');
    } finally { this.busy = false; }
  }
  stop() {
    if (!this.consumed && !this.context) return;
    this.consumed = true;
    const ctx = this.context; this.context = null;
    if (ctx && ctx.state !== 'closed') void ctx.close().catch(() => {});
    if (!this.disposed) this.notify('finished');
  }
  dispose() {
    this.disposed = true; this.consumed = true;
    const ctx = this.context; this.context = null;
    if (ctx && ctx.state !== 'closed') void ctx.close().catch(() => {});
  }
}
