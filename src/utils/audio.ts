// Romantic Web Audio API Synthesizer
// Generates soft, warm romantic piano-like arpeggios and ambient chords

class RomanticAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private timerId: number | null = null;

  private notes = [
    261.63, // C4
    329.63, // E4
    392.00, // G4
    493.88, // B4
    523.25, // C5
    659.25, // E5
    783.99, // G5
    880.00, // A5
  ];

  private initializeContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public start(volume: number = 0.5) {
    if (this.isPlaying) return;
    this.initializeContext();
    if (!this.ctx) return;

    this.isPlaying = true;
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(volume * 0.3, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // Play soothing gentle chords sequence
    let step = 0;
    const playNote = () => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;

      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      // Soft sine/triangle blend for warmth
      osc.type = step % 3 === 0 ? 'sine' : 'triangle';
      
      const chordPattern = [
        [261.63, 329.63, 392.00, 493.88], // Cmaj7
        [220.00, 261.63, 329.63, 392.00], // Am7
        [174.61, 220.00, 261.63, 329.63], // Fmaj7
        [196.00, 246.94, 293.66, 392.00], // G7
      ];

      const currentChord = chordPattern[Math.floor(step / 4) % chordPattern.length];
      const freq = currentChord[step % currentChord.length];

      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      noteGain.gain.setValueAtTime(0, now);
      noteGain.gain.linearRampToValueAtTime(0.12, now + 0.3);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.0);

      osc.connect(noteGain);
      noteGain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 3.1);

      step++;
      this.timerId = window.setTimeout(playNote, 600);
    };

    playNote();
  }

  public setVolume(volume: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(volume * 0.3, this.ctx.currentTime, 0.1);
    }
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.ctx && this.masterGain) {
      this.masterGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.2);
    }
  }

  public playChime() {
    this.initializeContext();
    if (!this.ctx) return;

    const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    freqs.forEach((f, index) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, this.ctx.currentTime + index * 0.1);
      
      const now = this.ctx.currentTime + index * 0.1;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.15, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start(now);
      osc.stop(now + 1.6);
    });
  }
}

export const romanticAudio = new RomanticAudioSynthesizer();
