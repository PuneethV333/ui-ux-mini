# Sonicverse

**Draw your mood. Create your sound. Explore the universe.**

Sonicverse is an offline-first React Native (TypeScript) concept app built for a
UI/UX college assignment. Every piece of content lives in local mock data and
React Context — there is **no backend, no authentication server and no network
calls anywhere in the app**.

The experience follows a complete creative loop: express a mood, sketch it,
watch it become a musical universe, branch into parallel universes, compare and
remix them, then save the result to your library.

## Screens

| # | Flow | Screen | Purpose |
|---|------|--------|---------|
| 01 | Entry | Splash | Brand hero and entry point |
| 02 | Entry | Onboarding | Three-slide introduction |
| 03 | Entry | Login | Local demo sign-in |
| 03b | Entry | Signup | Local demo account creation |
| 04 | Home | Home | Greeting, create CTA, universes, discover |
| 05 | Create | MoodSelection | Choose one of eight moods |
| 06 | Create | DrawYourMood | Finger-draw a mood with brush tools |
| 07 | Create | GeneratingUniverse | Animated generation checklist |
| 08 | Create | MusicalUniverse | Playback and orbit of the new universe |
| 09 | Parallel | CreateParallelUniverse | Pick a new mood and style |
| 10 | Parallel | ParallelUniverseResult | Preview, compare, remix, save |
| 11 | Parallel | SonicverseMap | Explore the universe family tree |
| 12 | Parallel | CompareUniverses | Compare original vs parallel metrics |
| 13 | Remix | RemixMerge | Mix elements from both universes |
| 14 | Remix | FinalComposition | Final player, save and share actions |
| 15 | Library | Library | Search, filter and play saved universes |
| 16 | Profile | Profile | Stats, menu and settings |

The Figma source is the `Sonicverse | B2 | QuadPixels` file. The wireframes
define the information architecture; the visual system is derived from the
Sonicverse logo: deep-space violet, magenta/violet nebulae, electric blue orbit
trails and a warm gold core.

## Tech stack

- Expo SDK 58 / React Native 0.88 (TypeScript, Android + iOS)
- Expo Go for instant device previews
- `expo-audio` for real, seekable local playback
- `expo-device` + `expo-constants` for local device diagnostics
- EAS Build for cloud APK/AAB builds on expo.dev
- React Navigation 7 — native stack + bottom tabs
- React Context for app state and simulated playback
- `react-native-svg` for all artwork, icons, orbits and the drawing canvas
- `expo-linear-gradient` for brand gradients
- `@react-native-community/slider` for seek and intensity
- Orbitron + Space Grotesk loaded with `expo-font` (bundled offline)

## Project structure

```
.
├── assets/                # icons, splash art, fonts and original music
├── src/
│   ├── navigation/        # RootNavigator, MainTabs, route types
│   ├── screens/           # One folder per screen: index.tsx + styles.ts
│   ├── components/
│   │   ├── common/        # buttons, cards, icon set, inputs, artwork
│   │   ├── player/        # orbit visual, transport, mini player
│   │   └── layout/        # cosmic canvas, headers, custom tab bar
│   ├── theme/             # colors, typography, spacing, tokens
│   ├── context/           # AppContext + PlayerContext
│   ├── data/              # mockData.ts (all content, offline)
│   ├── hooks/
│   └── utils/
├── App.tsx
└── index.js
```

## Open in Expo Go

Install **Expo Go for SDK 58** on your phone (the same SDK version as this
project), make sure the phone and computer are on the same Wi-Fi, then run:

```bash
npx expo start --lan
```

Scan the QR code or enter the printed `exp://…:8081` URL manually in Expo Go.
If the phone cannot reach the computer, use `npx expo start --tunnel`.

> Expo Go only contains a fixed set of native modules. This app intentionally
> uses only modules bundled with Expo Go: `expo-linear-gradient`, `expo-font`,
> `react-native-svg`, `react-native-screens`, `react-native-safe-area-context`
> and `@react-native-community/slider`.

## Build on expo.dev (cloud build)

This repository is a **managed Expo SDK 58 project linked to an Expo account**,
so EAS Build generates the native project in the cloud. No local Android/Gradle
build is required.

Expo project details (already set in `app.json`):

- Owner: `punivijay`
- Slug: `sonic-verse`
- Project ID: `9d865923-52f8-4710-9a0b-6789ffcf5439`
- Android package: `com.sonicverse`

Build profiles in `eas.json`:

- `preview` — installable **APK** (recommended for the assignment demo)
- `production` — **AAB** for store distribution
- `development` — internal APK for development testing

On [expo.dev](https://expo.dev), open the `sonic-verse` project, choose
**Builds → Build from GitHub**, select this repository/branch, and run the
`preview` profile. When the build finishes, download the APK from the build page
and install it on the emulator or phone.

Optional CLI equivalent (run by the person with the Expo account):

```bash
npx eas-cli@latest login
npx eas-cli@latest build --platform android --profile preview
```

If the JS bundle needs to be inspected locally without a native build:

```bash
npx react-native bundle --platform android --dev false \
  --entry-file index.js --bundle-output /tmp/sonicverse.bundle
```

## Music

The six instrumentals in `assets/audio/` are original tracks synthesized
locally for this project (no licensing or attribution required). Each universe
maps to a mood-matched loop, and `expo-audio` provides real playback with
seeking, duration and looping. Playback continues while you move around the
app, and pauses when you open the drawing canvas. The generator is reproducible:

```bash
python3 tools/generate_music.py
```

## Device diagnostics

Profile → Settings includes a **Device diagnostics** panel showing the device
model, OS version, emulator/physical status, screen size, app version and
runtime (Expo Go or native build). It uses `expo-device` and `expo-constants`
and requires no permissions. Everything is displayed locally; no identifiers or
usage data are collected or transmitted.

## Offline guarantee

There is no API client, no `fetch`, no WebSocket and no remote asset loading.
Artwork and music are generated locally; fonts, audio and the app icon are
bundled into the app.

## Assignment notes

- Design tokens are centralised in `src/theme/`; screens consume tokens rather
  than hard-coded brand values.
- Navigation supports the full flow from auth to library, including back
  navigation and tab switching.
- Playback is simulated locally (timers + progress state), which is enough to
  demonstrate player UX without audio files or a backend.
