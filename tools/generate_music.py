#!/usr/bin/env python3
"""Generate the six original Sonicverse loops.

Everything is synthesized locally with numpy and encoded with ffmpeg, so the
app stays fully offline and there are no music-licensing concerns.
"""
from __future__ import annotations

import math
import os
import subprocess

import numpy as np

SR = 44100
OUT = os.path.join(os.path.dirname(__file__), "..", "assets", "audio")
os.makedirs(OUT, exist_ok=True)

rng = np.random.default_rng(7)


def midi(note: int) -> float:
    return 440.0 * (2.0 ** ((note - 69) / 12.0))


def adsr(n: int, attack: float, decay: float, sustain: float, release: float) -> np.ndarray:
    a = max(1, int(attack * SR))
    d = max(1, int(decay * SR))
    r = max(1, int(release * SR))
    if a + d + r > n:
        scale = n / (a + d + r)
        a, d, r = max(1, int(a * scale)), max(1, int(d * scale)), max(1, int(r * scale))
    env = np.concatenate(
        [
            np.linspace(0, 1, a, endpoint=False),
            np.linspace(1, sustain, d, endpoint=False),
            np.full(max(0, n - a - d - r), sustain),
            np.linspace(sustain, 0, r),
        ]
    )
    if len(env) < n:
        env = np.pad(env, (0, n - len(env)))
    return env[:n].astype(np.float32)


def osc(freq: float, dur: float, kind: str = "sine", detune: float = 0.0) -> np.ndarray:
    n = max(1, int(dur * SR))
    t = np.arange(n, dtype=np.float32) / SR
    f = freq * (1.0 + detune)
    if kind == "sine":
        return np.sin(2 * np.pi * f * t).astype(np.float32)
    if kind == "triangle":
        return (2 / np.pi * np.arcsin(np.sin(2 * np.pi * f * t))).astype(np.float32)
    if kind == "saw":
        # Warm, band-limited-ish saw using the first harmonics.
        out = np.zeros(n, dtype=np.float32)
        for k in range(1, 9):
            out += np.sin(2 * np.pi * f * k * t) / k
        return (out * 0.55).astype(np.float32)
    if kind == "square":
        out = np.zeros(n, dtype=np.float32)
        for k in range(1, 8, 2):
            out += np.sin(2 * np.pi * f * k * t) / k
        return (out * 0.7).astype(np.float32)
    raise ValueError(kind)


def env_note(
    freq: float,
    dur: float,
    kind: str = "sine",
    attack: float = 0.01,
    decay: float = 0.15,
    sustain: float = 0.6,
    release: float = 0.25,
    detune: float = 0.0,
    gain: float = 1.0,
) -> np.ndarray:
    n = max(1, int(dur * SR))
    return osc(freq, dur, kind, detune) * adsr(n, attack, decay, sustain, release) * gain


def add(buf: np.ndarray, start: float, sig: np.ndarray, pan: float = 0.0) -> None:
    i = int(start * SR)
    if i >= len(buf):
        return
    j = min(len(buf), i + len(sig))
    left = math.sqrt(max(0.0, 0.5 * (1 - pan)))
    right = math.sqrt(max(0.0, 0.5 * (1 + pan)))
    buf[i:j, 0] += sig[: j - i] * left
    buf[i:j, 1] += sig[: j - i] * right


def drum_kick(dur: float = 0.4) -> np.ndarray:
    n = int(dur * SR)
    t = np.arange(n) / SR
    freq = 110 * np.exp(-t * 9) + 45
    phase = 2 * np.pi * np.cumsum(freq) / SR
    return (np.sin(phase) * np.exp(-t * 7) * 0.9).astype(np.float32)


def drum_snare(dur: float = 0.22) -> np.ndarray:
    n = int(dur * SR)
    t = np.arange(n) / SR
    noise = rng.normal(0, 1, n).astype(np.float32)
    noise = noise - np.convolve(noise, np.ones(8) / 8, mode="same").astype(np.float32)
    tone = np.sin(2 * np.pi * 175 * t).astype(np.float32) * 0.35
    return ((noise * 0.75 + tone) * np.exp(-t * 18)).astype(np.float32)


def drum_hat(dur: float = 0.06) -> np.ndarray:
    n = int(dur * SR)
    t = np.arange(n) / SR
    noise = rng.normal(0, 1, n).astype(np.float32)
    noise = noise - np.convolve(noise, np.ones(3) / 3, mode="same").astype(np.float32)
    return (noise * np.exp(-t * 70) * 0.32).astype(np.float32)


def drum_clap(dur: float = 0.18) -> np.ndarray:
    n = int(dur * SR)
    t = np.arange(n) / SR
    noise = rng.normal(0, 1, n).astype(np.float32)
    env = np.exp(-t * 22) * 0.6
    for offset in (0.0, 0.012, 0.024):
        env += np.exp(-np.maximum(0, t - offset) * 45) * (t >= offset) * 0.3
    return (noise * env * 0.5).astype(np.float32)


def add_delay(buf: np.ndarray, taps=(0.031, 0.047, 0.071, 0.101), gain=0.18) -> None:
    dry = buf.copy()
    for k, tap in enumerate(taps):
        d = int(tap * SR)
        g = gain * (0.8 ** k)
        buf[d:, 0] += dry[:-d, 1] * g
        buf[d:, 1] += dry[:-d, 0] * g * 0.9


def soft_limit(x: np.ndarray, drive: float = 1.2) -> np.ndarray:
    return np.tanh(x * drive) / np.tanh(drive)


def finish(buf: np.ndarray, duration: float, fade: float = 2.0) -> np.ndarray:
    n = int(duration * SR)
    if len(buf) < n:
        buf = np.pad(buf, ((0, n - len(buf)), (0, 0)))
    buf = buf[:n]
    fade_n = int(fade * SR)
    if fade_n > 0:
        buf[:fade_n] *= np.linspace(0, 1, fade_n, dtype=np.float32)[:, None]
        buf[-fade_n:] *= np.linspace(1, 0, fade_n, dtype=np.float32)[:, None]
    peak = float(np.max(np.abs(buf))) or 1.0
    buf = buf / peak * 0.9
    return buf.astype(np.float32)


def save(name: str, buf: np.ndarray, duration: float) -> None:
    wav = os.path.join(OUT, f"{name}.wav")
    mp3 = os.path.join(OUT, f"{name}.mp3")
    pcm = (np.clip(buf, -1, 1) * 32767).astype(np.int16)
    import wave

    with wave.open(wav, "wb") as fh:
        fh.setnchannels(2)
        fh.setsampwidth(2)
        fh.setframerate(SR)
        fh.writeframes(pcm.tobytes())
    subprocess.run(
        ["ffmpeg", "-y", "-loglevel", "error", "-i", wav, "-codec:a", "libmp3lame", "-b:a", "128k", mp3],
        check=True,
    )
    os.remove(wav)
    print(f"{name}: {duration:.0f}s -> {os.path.getsize(mp3) / 1e6:.2f} MB")


# Chord voicings in MIDI note numbers.
CHORDS = {
    "Dmaj7": [50, 57, 61, 66],
    "Bm7": [47, 54, 57, 62],
    "Gmaj7": [43, 50, 54, 59],
    "A7": [45, 52, 55, 61],
    "Dm": [50, 57, 62, 65],
    "Bb": [46, 53, 58, 62],
    "F": [41, 48, 53, 57],
    "C": [48, 55, 60, 64],
    "Fmaj7": [41, 48, 52, 57],
    "Dm7": [50, 57, 60, 65],
    "Bbmaj7": [46, 53, 57, 62],
    "C7": [48, 55, 58, 64],
    "Am": [45, 52, 57, 60],
    "G": [43, 50, 55, 59],
    "D": [50, 57, 62, 66],
    "Em7": [40, 47, 50, 55],
    "Cmaj7": [48, 55, 59, 64],
}


def render(
    *,
    name: str,
    duration: float,
    bpm: float,
    progression: list[str],
    pad_kind: str,
    pad_cut: float,
    bass_kind: str,
    arp_kind: str,
    arp_gain: float,
    drums: str,
    sidechain: float = 0.0,
    vinyl: float = 0.0,
    sparkle: float = 0.0,
) -> None:
    beat = 60.0 / bpm
    bar = beat * 4
    bars = int(math.ceil(duration / bar)) + 1
    n = int((bars * bar + 2) * SR)
    buf = np.zeros((n, 2), dtype=np.float32)
    chord_times = [i * bar for i in range(bars)]
    chords = [progression[i % len(progression)] for i in range(bars)]

    # Pads ---------------------------------------------------------------
    for idx, (start, chord) in enumerate(zip(chord_times, chords)):
        notes = CHORDS[chord]
        for j, note in enumerate(notes):
            dur = bar * 0.98
            sig = env_note(
                midi(note),
                dur,
                pad_kind,
                attack=bar * 0.18,
                decay=0.5,
                sustain=0.7,
                release=bar * 0.25,
                detune=(-0.003 if j % 2 == 0 else 0.003),
                gain=0.16,
            )
            add(buf, start, sig, pan=(-0.35 if j % 2 == 0 else 0.35))
        # Low pad an octave down.
        root = midi(notes[0] - 12)
        add(buf, start, env_note(root, bar, "sine", attack=0.5, decay=0.3, sustain=0.8, release=0.6, gain=0.10), 0)

    # Bass ---------------------------------------------------------------
    for idx, (start, chord) in enumerate(zip(chord_times, chords)):
        root = CHORDS[chord][0] - 24
        pattern = [0, 0.75, 1.5, 2.5, 3.0] if drums in ("pop", "electronic", "synthwave") else [0, 2.0]
        for p in pattern:
            dur = beat * (0.65 if drums in ("pop", "electronic") else 1.4)
            add(buf, start + p * beat, env_note(midi(root), dur, bass_kind, attack=0.01, decay=0.1, sustain=0.75, release=0.12, gain=0.24), 0)
        if drums in ("electronic", "synthwave"):
            add(buf, start + 3.5 * beat, env_note(midi(root + 7), beat * 0.4, bass_kind, gain=0.16), 0)

    # Arpeggio / melody --------------------------------------------------
    arp_notes = [0, 2, 1, 3, 2, 1, 3, 2]
    for bar_i, (start, chord) in enumerate(zip(chord_times, chords)):
        notes = CHORDS[chord]
        steps = 8 if arp_gain > 0 else 0
        for s in range(steps):
            note = notes[arp_notes[s % len(arp_notes)]] + 12
            t = start + s * beat / 2
            vel = arp_gain * (0.7 + 0.3 * math.sin((bar_i * 8 + s) * 0.7))
            add(buf, t, env_note(midi(note), beat * 0.42, arp_kind, attack=0.005, decay=0.22, sustain=0.15, release=0.2, gain=vel), 0.18 if s % 2 else -0.18)

    # Sparkle: high bell every other bar.
    if sparkle > 0:
        for idx in range(0, bars, 2):
            note = CHORDS[chords[idx]][2] + 24
            add(buf, chord_times[idx] + beat * 2.5, env_note(midi(note), 2.2, "sine", attack=0.01, decay=0.8, sustain=0.1, release=1.2, gain=sparkle), 0.25)

    # Drums --------------------------------------------------------------
    for idx, start in enumerate(chord_times):
        if drums in ("electronic", "synthwave"):
            for b in range(4):
                add(buf, start + b * beat, drum_kick() * 0.85, 0)
                add(buf, start + (b + 0.5) * beat, drum_hat(), 0.3)
            for b in (1, 3):
                add(buf, start + b * beat, drum_clap() * 0.45, -0.15)
        elif drums == "pop":
            for b in (0, 2):
                add(buf, start + b * beat, drum_kick() * 0.8, 0)
            for b in (1, 3):
                add(buf, start + b * beat, drum_snare() * 0.65, 0.1)
            for b in range(8):
                add(buf, start + b * beat / 2, drum_hat() * 0.55, 0.25)
        elif drums == "lofi":
            add(buf, start, drum_kick() * 0.55, 0)
            add(buf, start + 2.5 * beat, drum_kick() * 0.45, 0)
            add(buf, start + beat, drum_snare() * 0.35, 0)
            add(buf, start + 3 * beat, drum_snare() * 0.35, 0)
            for b in range(4):
                add(buf, start + b * beat + beat * 0.5, drum_hat() * 0.22, 0.2)
        elif drums == "downtempo":
            add(buf, start, drum_kick() * 0.5, 0)
            add(buf, start + 2.5 * beat, drum_kick() * 0.4, 0)
            add(buf, start + 2 * beat, drum_snare() * 0.25, 0)
            for b in range(4):
                add(buf, start + b * beat, drum_hat() * 0.12, 0.25)

    # Sidechain pump for electronic styles.
    if sidechain > 0:
        t = np.arange(len(buf)) / SR
        pump = 1 - sidechain * np.exp(-((t % beat) / 0.16))
        buf *= pump[:, None]

    # Vinyl texture for lo-fi.
    if vinyl > 0:
        noise = rng.normal(0, 1, len(buf)).astype(np.float32)
        noise = noise - np.convolve(noise, np.ones(200) / 200, mode="same").astype(np.float32)
        buf += noise[:, None] * vinyl
        for _ in range(90):
            p = rng.integers(0, len(buf) - 300)
            buf[p : p + 120] += rng.normal(0, 0.02, (120, 1)).astype(np.float32)

    add_delay(buf, gain=0.9)
    buf = finish(buf, duration)
    save(name, buf, duration)


def main() -> None:
    render(
        name="dreamscape",
        duration=134,
        bpm=72,
        progression=["Dmaj7", "Bm7", "Gmaj7", "A7"],
        pad_kind="triangle",
        pad_cut=0.4,
        bass_kind="sine",
        arp_kind="sine",
        arp_gain=0.16,
        drums="none",
        sparkle=0.10,
    )
    render(
        name="universe-ii",
        duration=134,
        bpm=124,
        progression=["Dm", "Bb", "F", "C"],
        pad_kind="saw",
        pad_cut=0.6,
        bass_kind="saw",
        arp_kind="square",
        arp_gain=0.10,
        drums="electronic",
        sidechain=0.35,
    )
    render(
        name="universe-iii",
        duration=158,
        bpm=82,
        progression=["Fmaj7", "Dm7", "Bbmaj7", "C7"],
        pad_kind="triangle",
        pad_cut=0.3,
        bass_kind="sine",
        arp_kind="sine",
        arp_gain=0.12,
        drums="lofi",
        vinyl=0.012,
    )
    render(
        name="universe-iv",
        duration=121,
        bpm=128,
        progression=["C", "G", "Am", "F"],
        pad_kind="saw",
        pad_cut=0.55,
        bass_kind="square",
        arp_kind="triangle",
        arp_gain=0.15,
        drums="pop",
        sidechain=0.25,
    )
    render(
        name="neon-reverie",
        duration=147,
        bpm=112,
        progression=["Am", "F", "C", "G"],
        pad_kind="saw",
        pad_cut=0.5,
        bass_kind="saw",
        arp_kind="square",
        arp_gain=0.11,
        drums="synthwave",
        sidechain=0.3,
    )
    render(
        name="lunar-tide",
        duration=172,
        bpm=90,
        progression=["Em7", "Cmaj7", "Gmaj7", "D"],
        pad_kind="triangle",
        pad_cut=0.3,
        bass_kind="sine",
        arp_kind="sine",
        arp_gain=0.1,
        drums="downtempo",
        sparkle=0.06,
    )


if __name__ == "__main__":
    main()
