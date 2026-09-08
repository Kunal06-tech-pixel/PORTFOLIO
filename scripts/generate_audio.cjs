const fs = require('fs');
const path = require('path');

const SAMPLE_RATE = 44100;

function createWavBuffer(channels, sampleRate, samplesL, samplesR) {
  const numSamples = samplesL.length;
  const isStereo = channels === 2;
  const bytesPerSample = 2; // 16-bit PCM
  const blockAlign = channels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataSize = numSamples * blockAlign;
  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);

  // fmt subchunk
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
  buffer.writeUInt16LE(1, 20); // AudioFormat (1 for PCM)
  buffer.writeUInt16LE(channels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(16, 34); // BitsPerSample

  // data subchunk
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  let offset = 44;
  for (let i = 0; i < numSamples; i++) {
    // Left channel
    let sL = Math.max(-1, Math.min(1, samplesL[i]));
    let intL = sL < 0 ? sL * 32768 : sL * 32767;
    buffer.writeInt16LE(Math.round(intL), offset);
    offset += 2;

    if (isStereo) {
      let sR = Math.max(-1, Math.min(1, samplesR ? samplesR[i] : samplesL[i]));
      let intR = sR < 0 ? sR * 32768 : sR * 32767;
      buffer.writeInt16LE(Math.round(intR), offset);
      offset += 2;
    }
  }

  return buffer;
}

// Biquad filter implementation (Direct Form II)
class Biquad {
  constructor() {
    this.x1 = 0;
    this.x2 = 0;
    this.y1 = 0;
    this.y2 = 0;
    this.b0 = 1; this.b1 = 0; this.b2 = 0;
    this.a1 = 0; this.a2 = 0;
  }

  setLowpass(cutoff, q, sampleRate = SAMPLE_RATE) {
    const w0 = 2 * Math.PI * cutoff / sampleRate;
    const alpha = Math.sin(w0) / (2 * q);
    const cosw0 = Math.cos(w0);
    const a0 = 1 + alpha;
    this.b0 = ((1 - cosw0) / 2) / a0;
    this.b1 = (1 - cosw0) / a0;
    this.b2 = ((1 - cosw0) / 2) / a0;
    this.a1 = (-2 * cosw0) / a0;
    this.a2 = (1 - alpha) / a0;
  }

  setBandpass(cutoff, q, sampleRate = SAMPLE_RATE) {
    const w0 = 2 * Math.PI * cutoff / sampleRate;
    const alpha = Math.sin(w0) / (2 * q);
    const cosw0 = Math.cos(w0);
    const a0 = 1 + alpha;
    this.b0 = (alpha) / a0;
    this.b1 = 0;
    this.b2 = (-alpha) / a0;
    this.a1 = (-2 * cosw0) / a0;
    this.a2 = (1 - alpha) / a0;
  }

  setHighpass(cutoff, q, sampleRate = SAMPLE_RATE) {
    const w0 = 2 * Math.PI * cutoff / sampleRate;
    const alpha = Math.sin(w0) / (2 * q);
    const cosw0 = Math.cos(w0);
    const a0 = 1 + alpha;
    this.b0 = ((1 + cosw0) / 2) / a0;
    this.b1 = (-(1 + cosw0)) / a0;
    this.b2 = ((1 + cosw0) / 2) / a0;
    this.a1 = (-2 * cosw0) / a0;
    this.a2 = (1 - alpha) / a0;
  }

  process(x) {
    const y = this.b0 * x + this.b1 * this.x1 + this.b2 * this.x2 - this.a1 * this.y1 - this.a2 * this.y2;
    this.x2 = this.x1;
    this.x1 = x;
    this.y2 = this.y1;
    this.y1 = y;
    return y;
  }
}

// Generate Pink Noise using Kellet's filter
function generatePinkNoise(length) {
  const noise = new Float32Array(length);
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
  for (let i = 0; i < length; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.96900 * b2 + white * 0.1538520;
    b3 = 0.86650 * b3 + white * 0.3104856;
    b4 = 0.55000 * b4 + white * 0.5329522;
    b5 = -0.76160 * b5 - white * 0.0168980;
    noise[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.28;
    b6 = white * 0.115926;
  }
  return noise;
}

// ==========================================
// 1. GENERATE SHUTTER-LIFT.WAV
// ==========================================
function generateShutterLift() {
  const duration = 1.6;
  const numSamples = Math.round(SAMPLE_RATE * duration);
  const outL = new Float32Array(numSamples);
  const outR = new Float32Array(numSamples);

  const pink = generatePinkNoise(numSamples);
  const bpFilter = new Biquad();
  const hpFilter = new Biquad();
  hpFilter.setHighpass(180, 0.7);

  // Slat clicks generation (accelerating and decelerating slat curls)
  const slatTimes = [];
  let tCur = 0.08;
  while (tCur < 1.35) {
    slatTimes.push(tCur);
    // Speed varies with shutter lifting velocity curve
    const progress = tCur / 1.35;
    const speed = 0.024 + 0.028 * Math.pow(progress - 0.5, 2) * 4;
    tCur += speed;
  }

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;

    // --- Dynamic Filter for Pneumatic / Rolling Noise ---
    // Cutoff sweeps from 300Hz -> 1100Hz -> 380Hz
    let cutoff = 300;
    if (t < 0.45) {
      cutoff = 300 + (1100 - 300) * (t / 0.45);
    } else {
      cutoff = 1100 - (1100 - 380) * ((t - 0.45) / 1.15);
    }
    bpFilter.setBandpass(cutoff, 1.4);

    let noiseVal = bpFilter.process(pink[i]);
    noiseVal = hpFilter.process(noiseVal);

    // Envelope for main roll
    let noiseEnv = 0;
    if (t < 0.12) {
      noiseEnv = (t / 0.12) * 0.55;
    } else if (t < 0.8) {
      noiseEnv = 0.55;
    } else {
      noiseEnv = 0.55 * Math.exp(-(t - 0.8) * 3.2);
    }

    // --- Sub-frequency glide (low mechanical resonance) ---
    const subFreq = 110 * Math.exp(-t * 0.8);
    const subEnv = t < 0.1 ? (t / 0.1) * 0.35 : 0.35 * Math.exp(-(t - 0.1) * 2.5);
    const subVal = Math.sin(2 * Math.PI * subFreq * t) * subEnv;

    // --- Initial Latch Click at t=0.03s ---
    let latchVal = 0;
    if (t >= 0.03 && t < 0.18) {
      const dt = t - 0.03;
      latchVal = Math.sin(2 * Math.PI * 460 * dt) * Math.exp(-dt * 35) * 0.4;
      latchVal += Math.sin(2 * Math.PI * 920 * dt) * Math.exp(-dt * 45) * 0.25;
    }

    // --- Slat Rolling Texture ---
    let slatVal = 0;
    for (const st of slatTimes) {
      if (t >= st && t < st + 0.04) {
        const dt = t - st;
        slatVal += Math.sin(2 * Math.PI * 780 * dt) * Math.exp(-dt * 90) * 0.18;
      }
    }

    const sampleMono = noiseVal * noiseEnv + subVal + latchVal + slatVal;
    // Add subtle stereo spread
    outL[i] = sampleMono * 0.95;
    outR[i] = sampleMono * 1.05;
  }

  // Peak normalization to 0.75 (-2.5 dBFS)
  let maxVal = 0;
  for (let i = 0; i < numSamples; i++) {
    if (Math.abs(outL[i]) > maxVal) maxVal = Math.abs(outL[i]);
    if (Math.abs(outR[i]) > maxVal) maxVal = Math.abs(outR[i]);
  }
  if (maxVal > 0) {
    const scale = 0.75 / maxVal;
    for (let i = 0; i < numSamples; i++) {
      outL[i] *= scale;
      outR[i] *= scale;
    }
  }

  return createWavBuffer(2, SAMPLE_RATE, outL, outR);
}

// ==========================================
// 2. GENERATE COUNTRYSIDE-AMBIENCE.WAV
// ==========================================
function generateCountrysideAmbience() {
  const duration = 18.0;
  const numSamples = Math.round(SAMPLE_RATE * duration);
  const outL = new Float32Array(numSamples);
  const outR = new Float32Array(numSamples);

  const pinkL = generatePinkNoise(numSamples);
  const pinkR = generatePinkNoise(numSamples);

  const bpFilterL = new Biquad();
  const bpFilterR = new Biquad();
  const hpFilterL = new Biquad();
  const hpFilterR = new Biquad();
  hpFilterL.setHighpass(240, 0.7);
  hpFilterR.setHighpass(240, 0.7);

  // Chime event definitions (time, fundamental frequency, stereo pan -1 to 1)
  // Hirajoshi tuning: A5 (880Hz), C#6 (1108.7Hz), F#5 (739.99Hz), D6 (1174.66Hz)
  const chimes = [
    { t: 2.5, freq: 880.0, pan: -0.25, gain: 0.42 },
    { t: 8.2, freq: 1108.73, pan: 0.30, gain: 0.38 },
    { t: 13.8, freq: 739.99, pan: -0.15, gain: 0.45 },
    { t: 16.5, freq: 1174.66, pan: 0.20, gain: 0.35 },
  ];

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;

    // Dynamic wind modulation (two coprime organic LFOs)
    const lfo1 = Math.sin(2 * Math.PI * 0.068 * t);
    const lfo2 = Math.sin(2 * Math.PI * 0.094 * t + 1.2);
    const lfoVol = 0.26 + 0.10 * Math.sin(2 * Math.PI * 0.052 * t);

    // Filter frequency sweep around 680Hz (acoustic core of rustling meadow grass)
    const cutoffL = 680 + lfo1 * 180 + lfo2 * 90;
    const cutoffR = 690 + lfo2 * 180 + lfo1 * 90;
    bpFilterL.setBandpass(cutoffL, 1.8);
    bpFilterR.setBandpass(cutoffR, 1.8);

    let windL = bpFilterL.process(pinkL[i]);
    let windR = bpFilterR.process(pinkR[i]);
    windL = hpFilterL.process(windL) * lfoVol;
    windR = hpFilterR.process(windR) * lfoVol;

    // Distant Japanese wind chimes (Fūrin)
    let chimeL = 0;
    let chimeR = 0;

    for (const c of chimes) {
      if (t >= c.t && t < c.t + 3.8) {
        const dt = t - c.t;
        // Exponential bell decay
        const env = Math.exp(-dt * 1.6);
        // Pure fundamental + 2.76x overtone (typical bronze/cast iron bell chime)
        const tone1 = Math.sin(2 * Math.PI * c.freq * dt);
        const tone2 = Math.sin(2 * Math.PI * (c.freq * 2.76) * dt) * 0.24 * Math.exp(-dt * 2.4);
        const chimeMono = (tone1 + tone2) * env * c.gain;

        // Stereo pan
        const leftGain = (1 - c.pan) * 0.5;
        const rightGain = (1 + c.pan) * 0.5;
        chimeL += chimeMono * leftGain;
        chimeR += chimeMono * rightGain;
      }
    }

    outL[i] = windL + chimeL;
    outR[i] = windR + chimeR;
  }

  // Equal-power crossfade between start and end (1.5s) to guarantee seamless loop
  const crossfadeSamples = Math.round(SAMPLE_RATE * 1.5);
  for (let i = 0; i < crossfadeSamples; i++) {
    const frac = i / crossfadeSamples;
    const gainEnd = Math.cos(frac * Math.PI * 0.5);
    const gainStart = Math.sin(frac * Math.PI * 0.5);

    const tailIndex = numSamples - crossfadeSamples + i;
    const blendedL = outL[tailIndex] * gainEnd + outL[i] * gainStart;
    const blendedR = outR[tailIndex] * gainEnd + outR[i] * gainStart;

    outL[i] = blendedL;
    outR[i] = blendedR;
    outL[tailIndex] = blendedL;
    outR[tailIndex] = blendedR;
  }

  // Normalize to 0.68 (-3.3 dBFS)
  let maxVal = 0;
  for (let i = 0; i < numSamples; i++) {
    if (Math.abs(outL[i]) > maxVal) maxVal = Math.abs(outL[i]);
    if (Math.abs(outR[i]) > maxVal) maxVal = Math.abs(outR[i]);
  }
  if (maxVal > 0) {
    const scale = 0.68 / maxVal;
    for (let i = 0; i < numSamples; i++) {
      outL[i] *= scale;
      outR[i] *= scale;
    }
  }

  return createWavBuffer(2, SAMPLE_RATE, outL, outR);
}

// Write to public/audio/
const audioDir = path.join(__dirname, '..', 'public', 'audio');
if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir, { recursive: true });
}

console.log('Generating shutter-lift.wav...');
const shutterWav = generateShutterLift();
fs.writeFileSync(path.join(audioDir, 'shutter-lift.wav'), shutterWav);
console.log(`shutter-lift.wav created (${shutterWav.length} bytes)`);

console.log('Generating countryside-ambience.wav...');
const ambienceWav = generateCountrysideAmbience();
fs.writeFileSync(path.join(audioDir, 'countryside-ambience.wav'), ambienceWav);
console.log(`countryside-ambience.wav created (${ambienceWav.length} bytes)`);
console.log('Audio generation complete!');
