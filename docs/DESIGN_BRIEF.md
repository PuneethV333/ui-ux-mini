# Sonicverse — Build & Design Brief (shared contract)

Sonicverse is a fully offline React Native (Android, TypeScript) concept app.
Every screen reads from `src/data/mockData.ts` and stores state in React
Context. **No network calls, fetch, axios, or backend anywhere.**

The Figma file (`Sonicverse | B2 | QuadPixels`) contains lo-fi wireframes.
We keep the exact information architecture, hierarchy and interaction of each
wireframe, and render it in the **Sonicverse brand skin**: deep-space navy,
violet/magenta nebulae, electric-blue orbit trails and a warm gold core.
Reference PNGs of the wireframes: `/tmp/opencode/figma/<name>.png`
(splash, onboarding, login, signup, home, mood, draw, generating, universe,
parallel, result, map, compare, remix, final, library, profile).

## Brand visual language

- Canvas: near-black violet (`colors.background`), soft nebula glows, faint
  star field. Use `GradientBackground` / `ScreenContainer` to get this for free.
- Cards: translucent dark glass (`GlassCard`), 1px violet border, 18–24 radius.
- Primary CTA: pink → violet → indigo gradient pill (`GlowButton` primary).
- Secondary actions: glass pill / outline (`GlowButton secondary` or `ghost`).
- Accent use: magenta for highlights, gold for the "core"/energy, cyan sparingly.
- Typography: `Orbitron` for display/headings (short strings only),
  `Space Grotesk` for all body/UI text. Use `textStyles` and `fonts` tokens.
- Motion: subtle — pulsing core, animated progress, staggered fade-in. No
  heavy dependency; use RN `Animated` (native driver where possible).
- Every icon is from `components/common/Icon` (custom SVG, lucide-like).
  Never use emoji as a primary icon; emoji may appear only as decorative mood
  glyph inside an orb/card.

## Project rules

- TypeScript, functional components, hooks.
- Own only your assigned `src/screens/<Screen>/` folders. Do not edit shared
  theme, context, data, navigation, App.tsx or shared components.
- If a screen needs a private subcomponent, put it inside that screen folder
  (e.g. `src/screens/Home/UniverseCard.tsx`). Do not create shared components.
- Import tokens from `src/theme`; avoid raw hex values in styles except inside
  rgba() glows that have no token.
- Layout must be responsive between ~360dp and 430dp widths. Use
  `useWindowDimensions` when sizing art.
- Accessibility: give pressables `accessibilityRole`/labels.
- Avoid text clipping: use `numberOfLines` + `adjustsFontSizeToFit` where needed.
- Must compile: `npx tsc --noEmit` from repo root must pass after your work.
- Keep each screen's `styles.ts`; `index.tsx` should stay readable.

## Shared components (do not modify)

`src/components/layout/ScreenContainer.tsx`
- Props: `scroll` (default true), `padded` (default true), `withTabBar`
  (set true on Home / Library / Profile so content clears the tab bar),
  `edges`, `variant` ('default' | 'soft' | 'deep'), `showNebula`,
  `contentContainerStyle`, `style`.

`src/components/layout/CosmicHeader.tsx`
- `<CosmicHeader title subtitle onBack right eyebrow compact />`
- Back is a circular glass button; omit `onBack` when there is no back action.

`src/components/common/GlowButton.tsx`
- `<GlowButton title onPress variant size icon iconRight disabled loading
  fullWidth uppercase />`; variants `primary | secondary | ghost | gold | danger`.

`IconButton` — circular glass icon button:
`<IconButton name onPress size color background borderColor iconSize glow />`.

`Icon` — `<Icon name size color strokeWidth fill />`; names include home,
library, plus, profile, arrow-left, arrow-right, chevron-right, chevron-down,
search, play, pause, skip-back, skip-forward, heart, share, download, settings,
sparkles, music, pulse, waveform, check, close, edit, globe, star, help, refresh,
sliders, trash, undo, pen, shapes, line, mail, lock, user, logout, layers, disc,
compass.

`GlassCard` — `<GlassCard onPress active padded glow style gradient>…</GlassCard>`.

`Chip` — `<Chip label selected onPress size="sm|md" />`.

`TextField` — label + icon + secure + error; spreads TextInput props.

`ProgressBar` — `<ProgressBar progress height gradient showGlow />`.

`SectionHeader` — `<SectionHeader title actionLabel onAction style />`.

`CoverArt` — procedural cosmic artwork, no network:
`<CoverArt gradient="violet|rose|cyan|gold|emerald|indigo" width height seed
style rounded showWave />`. Use as universe/discover cover imagery.

`Logo` — `<Logo size showWordmark showTagline tagline />` and
`SonicverseMark` for the vector emblem.

`OrbitVisual` (`src/components/player/OrbitVisual.tsx`) — orbit diagram:
`<OrbitVisual size nodes coreLabel activeNodeId showLabels />`, where
`nodes = [{id, label, sublabel, color, angle}]` angles in degrees.

`PlayerControls` — full playback UI bound to `PlayerContext`:
`<PlayerControls compact accent showSlider />`.

`MiniPlayer` is already rendered by the custom bottom tab bar; do not add it.

## Theme tokens

```
import {colors, gradients, spacing, radius, sizes, fonts, fontSize,
        lineHeight, letterSpacing, textStyles, shadows} from '../../theme';
```
Key colors: background, backgroundElevated, surface, surfaceAlt, surfaceRaised,
surfaceGlass, primary, primaryBright, secondary, magenta, pink, cyan, gold,
orange, text, textMuted, textDim, success, danger, border, borderStrong.
Gradients: `gradients.aurora`, `primaryButton`, `gold`, `violet`, `rose`,
`cyan`, `emerald`, `indigo`, `card`, `cardActive`, `screen`.
Spacing: 4/8/12/16/20/24/32/40/56. Radius: 6/10/14/18/24/30/pill.

## Data & state

`src/data/mockData.ts` exports:
`currentUser`, `onboardingSlides`, `moods` (8), `universes` (6),
`discoverItems` (4), `generatingSteps`, `mapNodes` (4), `remixIngredients` (4),
`comparisonMetrics` (4), `libraryFilters`, `parallelMoods`, `parallelStyles`,
`profileMenu`, `getUniverse(id)`, `getMood(id)`.

`useApp()` from `src/context/AppContext`:
`user, isAuthenticated, universes, selectedMood, draft {mood,intensity,strokes,
name,style}, selectedUniverseId, remixChoices, signIn(email,name?), signUp(name,
email), signOut, selectMood(id), updateDraft(patch), upsertUniverse(universe),
createUniverseFromDraft({name,style,gradient,mode}), toggleFavorite(id),
selectUniverse(id), setRemixChoice(ingredient, 'original'|'parallel')`.

`usePlayer()` from `src/context/PlayerContext`:
`current, queue, isPlaying, position, progress, play(universe), pause(), toggle(),
seek(ratio), next(), previous(), isCurrent(id)`.

## Navigation

Types in `src/navigation/types.ts`. Routes: Splash, Onboarding, Login, Signup,
MainTabs, MoodSelection, DrawYourMood {moodId?}, GeneratingUniverse,
MusicalUniverse {universeId?}, CreateParallelUniverse {universeId?},
ParallelUniverseResult {universeId?}, SonicverseMap, CompareUniverses
{leftId?,rightId?}, RemixMerge, FinalComposition {universeId?}.

Typical calls:
```
navigation.navigate('Onboarding');
navigation.navigate('Login');
navigation.navigate('MainTabs', {screen: 'HomeTab'});
navigation.navigate('DrawYourMood', {moodId: selectedMood});
navigation.replace('GeneratingUniverse');
navigation.replace('MusicalUniverse', {universeId: created.id});
navigation.navigate('CreateParallelUniverse', {universeId: current.id});
navigation.navigate('CompareUniverses');
navigation.navigate('RemixMerge');
navigation.navigate('FinalComposition', {universeId: current.id});
```
Type screens with `RootScreenProps<'ScreenName'>` when route params are used.

## Required flow

Splash → Onboarding (3 slides) → Login/Signup → MainTabs (Home) →
MoodSelection → DrawYourMood → GeneratingUniverse → MusicalUniverse →
CreateParallelUniverse → ParallelUniverseResult → SonicverseMap →
CompareUniverses → RemixMerge → FinalComposition → save → MainTabs Library.
Library / Home / Profile are tab roots.

## Screen-by-screen intent

### Splash
Wireframe: centered logo + "SONICVERSE" + 3-line tagline + GET STARTED.
Brand: full-bleed cosmic hero, large vector emblem with pulse glow, wordmark,
tagline, gradient CTA. Auto-advance after ~2.6s is optional; button must work.

### Onboarding
3 slides from `onboardingSlides`: big illustrated orbit/nebula art, eyebrow,
title, description, page dots, NEXT / GET STARTED, skip link. Horizontal swipe
or state-based slide is fine. End → Login.

### Login
Logo lockup, email + password fields, gradient "Log in", "Continue with Google"
(ghost, simulated local), "Don't have an account? Sign up". Validate non-empty
email/password locally; `signIn()` then navigate to MainTabs Home.

### Signup
Name, email, password, confirm password, local validation. On success
`signUp(name,email)` → MainTabs Home. Link back to Login.

### Home
Greeting `good evening, {user.name}` + avatar (initials in gradient ring).
Headline "What are you feeling today?".
Hero "Create universe" card with orbiting art and CTA → MoodSelection.
"Your universe" horizontal cards from `universes` (cover, name, mood, duration,
play overlay) → MusicalUniverse.
"Discover" vertical/compact list from `discoverItems` with play actions.
Set `withTabBar` on ScreenContainer. Mini player is global.

### MoodSelection
Header back, "How do you feel?", helper line. 2-column grid of 8 mood cards
(orb/emoji, label, subtle accent border when selected), selected = Dreamy by
default, check badge. Continue → DrawYourMood. This screen is also the Create
tab: it has no sensible "back" when opened as a tab; render back only when it
can go back (`navigation.canGoBack()`).

### DrawYourMood
Top bar: back, "Dreamy Mood", help. Title "Draw your mood", subtitle. Large
drawing canvas (~square, rounded glass) with PanResponder finger drawing using
react-native-svg `Path`; faint guide waveform in empty state. Tool row:
Brush / Shape / Line / Undo / Clear (icons + labels). Intensity slider
(`@react-native-community/slider`, 0–1, update draft). CTA "Create My Sound" →
GeneratingUniverse. Must work with touches.

### GeneratingUniverse
Centered orbital animation (Animated pulse/rotate), "Creating your Universe",
"Turning your expression into sound…", checklist from `generatingSteps`
(1st two complete, 3rd in progress), progress bar animating ~0→1 over 3s, then
`navigation.replace('MusicalUniverse')`. Clean up timers.

### MusicalUniverse
Top bar: back, "My Universe", help. Universe name + mood • style. `OrbitVisual`
with nodes Melody / Bass / Beat / Instrument / Atmosphere around Core.
PlayerControls (seek works), Edit Sound → DrawYourMood, Parallel Universe →
CreateParallelUniverse. Use selected universe from route param or context.

### CreateParallelUniverse
Back, title, subtitle. Original card (ORIGINAL + "Dreamy • Ambient" + small
orbit). "Choose a new mood" 2-col chips (default Dark), "Choose style" 2-col
chips (default Electronic). CTA "CREATE PARALLEL UNIVERSE" disabled-less;
calls `createUniverseFromDraft` with selected mood/style, then
`navigation.navigate('ParallelUniverseResult',{universeId})`.

### ParallelUniverseResult
Back, "UNIVERSE II", large orbit art with core + 4 nodes, meta
"Dark • Electronic • 2:14", "Based on: Dreamy Universe", PLAY button
(starts player), COMPARE and REMIX secondary buttons, SAVE UNIVERSE gradient CTA
→ upsert + navigate MainTabs Library. Favourite toggle optional.

### SonicverseMap
Back, title, helper. Dark rounded "map" panel containing 4 universe nodes from
`mapNodes` positioned procedurally, connector lines (SVG), selected node has
glow + check. Selected bar at bottom with Play and Compare; + NEW UNIVERSE CTA
→ MoodSelection.

### CompareUniverses
Back, title. Two universe summary cards side by side (Original + Universe II)
with PLAY buttons. Four metric cards (Melody, Rhythm, Energy, Atmosphere) each
showing Original and Parallel bars using `comparisonMetrics` + stats.
"REMIX THESE" CTA → RemixMerge.

### RemixMerge
Back. "Build Your Perfect Universe" headline. Four ingredient cards (Melody,
Beat, Bass, Atmosphere) with radio options Original / Universe II driven by
`remixChoices` + `setRemixChoice`. PREVIEW (ghost) + MERGE UNIVERSES (gradient)
→ FinalComposition.

### FinalComposition
Back, "New Universe". Composition orbit (6 nodes connected to core), title
"My Sonicverse", seek bar + transport (use PlayerControls compact), SAVE
UNIVERSE gradient CTA → create/upsert + MainTabs Library. Row of three actions:
favourite (heart, toggles), share & export audio (simulated Toast/Alert or
local state). Keep it elegant.

### Library
No back (tab root). "My Universes" title, search field (local filter), filter
chips (`libraryFilters`) horizontally scrollable with All selected. 2-column
grid of universe cards (cover, name, mood pill, duration, play) filtered by
search/mood. "Create New Universe" dashed/glass CTA → MoodSelection.
Set `withTabBar`.

### Profile
No back (tab root). "PROFILE" display label, settings icon. Avatar ring, handle
`@SonicExplorer`, two stat cards (universes 12, remixes 4). Menu rows from
`profileMenu` with icons + chevrons; Settings toggles a local sheet or
navigates nowhere harmful. Set `withTabBar`. Sign out link optional.

## Definition of done for your screen(s)

1. `npx tsc --noEmit` passes.
2. No network calls / new dependencies.
3. Screen handles small and large phones; no clipped CTAs.
4. All buttons either navigate, mutate context, or give local feedback.
5. Visual language matches the brief (dark glass + neon gradient + Orbitron).
