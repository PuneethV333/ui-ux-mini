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

- React Native 0.81 (TypeScript, Android)
- Expo config + EAS Build (cloud APK/AAB builds on expo.dev)
- React Navigation 7 — native stack + bottom tabs
- React Context for app state and simulated playback
- `react-native-svg` for all artwork, icons, orbits and the drawing canvas
- `react-native-linear-gradient` for brand gradients
- `@react-native-community/slider` for seek and intensity
- Orbitron + Space Grotesk bundled locally (no runtime font download)

## Project structure

```
.
├── android/
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

## Build on expo.dev (cloud build)

This repository is a **bare React Native project linked to an Expo account**, so
it is built in the cloud with EAS Build. No local Android/Gradle build is
required.

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

## Offline guarantee

There is no API client, no `fetch`, no WebSocket and no remote asset loading.
Artwork is generated with SVG at runtime; fonts and the app icon are bundled.

## Assignment notes

- Design tokens are centralised in `src/theme/`; screens consume tokens rather
  than hard-coded brand values.
- Navigation supports the full flow from auth to library, including back
  navigation and tab switching.
- Playback is simulated locally (timers + progress state), which is enough to
  demonstrate player UX without audio files or a backend.
