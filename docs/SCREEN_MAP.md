# Screen map — Figma → React Native

Figma file: **Sonicverse | B2 | QuadPixels**
`https://www.figma.com/design/sOXyrYKwNvImrL6opN1zxU`

The Figma file is organised as four member sections plus a complete user-flow
board. Each top-level frame below maps 1:1 to a screen folder in `src/screens`.

| # | Figma frame | Node ID | RN screen | Owner flow |
|---|-------------|---------|-----------|------------|
| 01 | `01 – Splash – Wireframe` | `57:3` | `Splash` | Entry |
| 02 | `02 – on-boarding – Wireframe` | `55:345` | `Onboarding` | Entry |
| 03 | `03 – login – Wireframe` | `63:363` | `Login` | Entry |
| 03b | `03 – signup – Wireframe` | `63:389` | `Signup` | Entry |
| 04 | `04 – home – Wireframe` | `63:523` | `Home` | Home |
| 05 | `05 – Mood Selection` | `10:3` | `MoodSelection` | Create |
| 06 | `06 – Draw Your Mood` | `10:4` | `DrawYourMood` | Create |
| 07 | `07 – Generating Universe` | `10:5` | `GeneratingUniverse` | Create |
| 08 | `08 – Musical Universe` | `10:6` | `MusicalUniverse` | Create |
| 09 | `09 - Create Parallel Universe` | `68:3` | `CreateParallelUniverse` | Parallel |
| 10 | `10 - Parallel Universe Result` | `68:4` | `ParallelUniverseResult` | Parallel |
| 11 | `11 - Sonicverse Map` | `68:5` | `SonicverseMap` | Parallel |
| 12 | `12 - Compare Universes` | `68:6` | `CompareUniverses` | Parallel |
| 13 | `Remix & Merge` | `71:56` | `RemixMerge` | Remix |
| 14 | `Final Composition` | `71:57` | `FinalComposition` | Remix |
| 15 | `Library` | `71:58` | `Library` | Library |
| 16 | `Profile` | `71:59` | `Profile` | Profile |

## Flow wiring

```
Splash → Onboarding → Login ⇄ Signup → MainTabs/Home
Home → MoodSelection → DrawYourMood → GeneratingUniverse → MusicalUniverse
MusicalUniverse → CreateParallelUniverse → ParallelUniverseResult
ParallelUniverseResult → CompareUniverses → RemixMerge → FinalComposition
ParallelUniverseResult → Save → MainTabs/Library
Library → SonicverseMap → CompareUniverses
Library → MusicalUniverse (play/select any universe)
```

## Design translation notes

- The wireframes are intentionally lo-fi. Layout, hierarchy, labels and
  interaction order are preserved; the visual language is replaced with the
  Sonicverse brand system from the supplied logo artwork.
- Brand tokens live in `src/theme/`: deep-space violet canvas, magenta and
  violet orbit gradients, electric blue secondary trails, warm gold core.
- Display type is Orbitron; UI/body type is Space Grotesk. Both are bundled in
  `android/app/src/main/assets/fonts` and load offline.
- All cover artwork is procedural SVG (`CoverArt`), not remote imagery. This
  keeps the app 100% offline and consistent with the orbit motif.
- Shared components implement the repeated wireframe patterns: glass cards,
  pills, circular icon buttons, section headers, orbit diagrams and the custom
  bottom tab bar with mini player.
