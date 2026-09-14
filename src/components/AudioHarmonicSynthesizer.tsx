import React, { useState, useRef } from 'react';
import { Volume2, VolumeX, Play, Square, Radio, Waves } from 'lucide-react';
import { FourierResult } from '../types';

interface AudioHarmonicSynthesizerProps {
  password: string;
  fourier: FourierResult;
}

export const AudioHarmonicSynthesizer: React.FC<AudioHarmonicSynthesizerProps> = ({
  password,
  fourier,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mode, setMode] = useState<'melody' | 'harmonics'>('melody');
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timeoutsRef = useRef<number[]>([]);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);

  const stopAudio = () => {
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];

    oscillatorsRef.current.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch (e) {
        // Already stopped
      }
    });
    oscillatorsRef.current = [];

    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    setIsPlaying(false);
  };

  const playSignal = () => {
    if (isPlaying) {
      stopAudio();
      return;
    }

    if (!password) return;

    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtxClass();
      audioCtxRef.current = ctx;
      setIsPlaying(true);

      if (mode === 'melody') {
        // Mode 1: Sequential Signal Melody (Typing Rhythm)
        const noteDuration = 0.18; // seconds per char
        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
        gainNode.connect(ctx.destination);

        for (let i = 0; i < password.length; i++) {
          const ascii = password.charCodeAt(i);
          // Map ASCII (32-126) to audible frequency range (200Hz - 900Hz)
          const freq = 200 + ((ascii - 32) / (126 - 32)) * 700;
          const startTime = ctx.currentTime + i * noteDuration;

          const osc = ctx.createOscillator();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, startTime);

          const noteGain = ctx.createGain();
          noteGain.gain.setValueAtTime(0.001, startTime);
          noteGain.gain.exponentialRampToValueAtTime(0.15, startTime + 0.02);
          noteGain.gain.exponentialRampToValueAtTime(0.001, startTime + noteDuration - 0.02);

          osc.connect(noteGain);
          noteGain.connect(ctx.destination);

          osc.start(startTime);
          osc.stop(startTime + noteDuration);
          oscillatorsRef.current.push(osc);
        }

        const totalTimeMs = password.length * noteDuration * 1000 + 200;
        const timer = window.setTimeout(() => {
          stopAudio();
        }, totalTimeMs);
        timeoutsRef.current.push(timer);

      } else {
        // Mode 2: Fourier Spectral Chord (Harmonic Synthesis)
        // Synthesizes top frequency components from DFT simultaneously
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.12, ctx.currentTime);
        masterGain.connect(ctx.destination);

        const duration = 2.5; // seconds
        const comps = fourier.components.slice(0, 8); // Top harmonics

        comps.forEach((comp, idx) => {
          if (comp.magnitude <= 0.05) return;
          const osc = ctx.createOscillator();
          const harmonicGain = ctx.createGain();

          // Map harmonic index to frequency
          const baseFreq = 220; // A3
          const freq = baseFreq * (idx + 1);

          osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          // Volume proportional to magnitude
          const weight = Math.min(0.2, (comp.magnitude / (fourier.arithmeticMean * comps.length || 1)) * 0.1);
          harmonicGain.gain.setValueAtTime(weight, ctx.currentTime);
          harmonicGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

          osc.connect(harmonicGain);
          harmonicGain.connect(masterGain);

          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + duration);
          oscillatorsRef.current.push(osc);
        });

        const timer = window.setTimeout(() => {
          stopAudio();
        }, duration * 1000 + 200);
        timeoutsRef.current.push(timer);
      }
    } catch (err) {
      console.error('Audio synthesis failed:', err);
      setIsPlaying(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-900/70 border border-slate-800">
      <div className="flex items-center gap-2.5">
        <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
          <Waves className="w-4 h-4" />
        </div>
        <div>
          <div className="text-xs font-semibold text-slate-200 flex items-center gap-2">
            Harmonic Audio Synthesizer
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 font-mono">
              Web Audio API
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            Hear the password&apos;s rhythmic periodicity vs. broad-spectrum entropy
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Mode Toggle */}
        <div className="flex bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-[11px]">
          <button
            onClick={() => setMode('melody')}
            className={`px-2.5 py-1 rounded-md font-medium transition-all ${
              mode === 'melody'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sequence Melody
          </button>
          <button
            onClick={() => setMode('harmonics')}
            className={`px-2.5 py-1 rounded-md font-medium transition-all ${
              mode === 'harmonics'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            DFT Harmonics
          </button>
        </div>

        {/* Play/Stop Button */}
        <button
          onClick={playSignal}
          disabled={!password}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            isPlaying
              ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-500/20 animate-pulse'
              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 disabled:opacity-40 disabled:cursor-not-allowed'
          }`}
        >
          {isPlaying ? (
            <>
              <Square className="w-3.5 h-3.5 fill-current" />
              Stop
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              Listen to Signal
            </>
          )}
        </button>
      </div>
    </div>
  );
};
