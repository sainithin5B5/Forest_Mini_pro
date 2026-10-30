// Web Audio API ambient bio-frequency synthesizer

class BioAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.masterGain = null;
    this.oscillators = [];
    this.lfo = null;
  }

  init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioCtx();
    
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);
  }

  toggle() {
    if (!this.ctx) this.init();
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }
    return this.isPlaying;
  }

  start() {
    if (this.isPlaying) return;
    this.init();
    this.isPlaying = true;

    // Harmonic frequencies for deep bioluminescent forest ambient (432Hz natural harmony)
    const baseFreqs = [108, 216, 324, 432];
    
    this.oscillators = baseFreqs.map((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      
      // Gentle modulation
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600 + idx * 200, this.ctx.currentTime);
      
      gain.gain.setValueAtTime(0.02 + idx * 0.01, this.ctx.currentTime);
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);
      
      osc.start();
      return { osc, gain, filter };
    });

    // LFO for slow ambient breathing wave
    this.lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    this.lfo.frequency.setValueAtTime(0.1, this.ctx.currentTime); // 10s cycle
    lfoGain.gain.setValueAtTime(0.05, this.ctx.currentTime);
    this.lfo.connect(this.masterGain.gain);
    this.lfo.start();
  }

  stop() {
    if (!this.isPlaying) return;
    this.oscillators.forEach(({ osc }) => {
      try { osc.stop(); } catch (e) {}
    });
    if (this.lfo) {
      try { this.lfo.stop(); } catch (e) {}
    }
    this.oscillators = [];
    this.isPlaying = false;
  }

  playChime(type = 'nourish') {
    if (!this.ctx) this.init();
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    const now = this.ctx.currentTime;

    if (type === 'nourish') {
      // Arpeggio chime
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(1046.50, now + 0.3); // C6
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    } else if (type === 'strata') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.2);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    } else if (type === 'time') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(329.63, now); // E4
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.25); // E5
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    }

    osc.connect(gain);
    gain.connect(this.masterGain || this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.5);
  }
}

export const audioEngine = new BioAudioEngine();
