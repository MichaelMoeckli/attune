# Implementation Checklist Radio 25

Status: April 28, 2026 (updated after design system implementation)
Sources: `Hauptdokument.docx` (Ch. 3.3, 3.4, 3.5), `Hauptdokument_Gliederung.md` (Ch. 6, 7, 8), `techstack_architektur_radion25.md`
Status legend: ✅ done · 🟡 partial · ⬜ open

> **Audit summary (Apr 28)**: Building Blocks 1, 4, and 5 are now substantially complete following the design system implementation. A full three-layer UI (Aktion / Transparenz / Begründung) with 5-state app flow is live. Main remaining gaps: curation logic (BB3) and pilot-test preparation.

---

## Building Block 1 — Explicit Preference Settings and Profile Construction (Ch. 3.3.1)

Goal: Profile is transparent, viewable, changeable at any time — without configuration overkill.

- ✅ **PreferenceForm component** (`src/components/PreferenceForm.tsx`)
  - ✅ Topics / interests — `TOPIC_OPTIONS` with 11 categories
  - ✅ Location — text field
  - ✅ Moderation style — `VOICE_STYLES` (formal / casual / energetic)
  - ✅ Show length — `LENGTH_OPTIONS` (5 / 10 / 15 Min) — added Apr 28
- ✅ **Make profile visible**: `ProfilePanel.tsx` shows profile in read mode on S1 idle screen (added Apr 28); "Anpassen" ghost button opens form inline
- ✅ **Profile changeable at any time**: form submit loads new profile, takes effect immediately on next generate call (PreferenceForm.tsx L. 86–99)
- ✅ **API route `/api/preferences`** — `src/app/api/preferences/route.ts` (GET L. 17–31, POST L. 33–59)
- ✅ **Local storage** — `src/data/preferences.json` plus `localStorage` for `userId` (PreferenceForm.tsx L. 33–36)
- ✅ **No implicit tracking** — profile only changes via form submit, no behavioral heuristics

---

## Building Block 2 — Fully Automated Show Pipeline (Ch. 3.3.2)

Goal: a single end-to-end pipeline produces a coherent show from jingles, greeting, news, music, weather, and farewell.

### 2.1 Data aggregation (open sources)

- ✅ **`news.ts`** — RSS parser, SRF + NZZ, topic mapping (`src/services/news.ts`, `RSS_FEEDS` L. 27–41, `fetchFromRSS` L. 43–73)
- ✅ **`weather.ts`** — OpenWeatherMap with location from profile (`src/services/weather.ts` L. 24–26)
- ✅ Error handling for unreachable sources — try/catch + mock fallback (news.ts L. 76–95, weather.ts L. 36–40)

### 2.2 LLM module for moderation texts

- ✅ **`llm.ts`** — Vercel AI SDK + Claude Sonnet (`src/services/llm.ts` L. 30–34, model `claude-sonnet-4-20250514`)
- ✅ **`prompts.ts`** — templates per segment (greeting L. 28–34, news L. 36–48, weather L. 50–62, farewell L. 64–69)
- ✅ System prompt with tonality / Swiss High German / moderation style (`RADIO_SYSTEM_PROMPT` L. 1–18, `styleMap` L. 24–28)
- 🟡 Few-shot examples — currently instructions, but no concrete example outputs
- 🟡 Hallucination mitigation — sources are included in the news prompt (L. 42–48), but the system prompt lacks an explicit instruction "only paraphrase what is given / invent nothing"

### 2.3 Speech synthesis (TTS)

- ✅ **`tts.ts`** — ElevenLabs + `eleven_multilingual_v2` (`src/services/tts.ts` L. 38, `output_format: 'mp3_44100_128'` L. 39)
- 🟡 Voice IDs per role — currently only one voice ID (default Adam, L. 38), no mapping per moderation style
- ✅ MP3 output to `/public/audio/` (L. 43–48)
- ✅ Segment IDs (`crypto.randomUUID()`, orchestrator.ts L. 30–45)

### 2.4 Music and jingles

- ✅ **`music.ts`** — fallback chain Spotify → Jamendo → local files; Jamendo provides royalty-free tracks (`src/services/jamendo.ts`, `src/services/music.ts`)
- ✅ Jingle library — `public/jingles/intro.mp3` and `outro.mp3` (orchestrator.ts L. 32, 46)

### 2.5 Orchestrator

- ✅ **`orchestrator.ts`** — order Jingle → Greeting → News → Music → Weather → Music → Farewell → Outro (L. 30–45)
- ✅ Parallel data fetches — `Promise.all([fetchNews(), fetchWeather()])` (L. 26–29)
- ✅ `ShowResult` JSON: `showId`, `segments[]`, `generatedAt`, `totalDurationMs` (`src/lib/types.ts` L. 18–24, orchestrator.ts L. 67)
- ✅ **API route `/api/generate`** (`src/app/api/generate/route.ts`, `maxDuration: 60`)

### 2.6 Player

- ✅ HTML5 audio player (`src/components/AudioPlayer.tsx`, `'use client'` L. 1, `<audio>` L. 179)
- ✅ Sequential playback of segments (`playSegment`, L. 44–93)
- ✅ Pause/Resume + **no** autoplay after end of show (L. 103–106 sets `isPlaying=false`, `currentIndex=-1`; L. 119–135 togglePlayPause)

---

## Building Block 3 — Curation and Recommendation Logic with Alternative Target Value (Ch. 3.3.3)

Goal: Selection follows **not** dwell time, but diversity + time-of-day context + profile.

- 🟡 **Topic diversification** — currently only global `slice(0, 10)` without max-per-topic capping (news.ts L. 83)
- ⬜ **Time-of-day context** — time is included in the prompt (prompts.ts L. 20–21), but no programmatic length/tonality adjustment
- ⬜ **Profile match + serendipity** — strict topic filtering, no 1–2 surprise items
- ✅ **No engagement optimum** — no click/dwell-time heuristic in the code, no engagement metrics
- 🟡 **Selection criteria as named functions** — `fetchNews`, `fetchWeather`, `pickTrack` exist; news filtering, however, is inline rather than visible as a dedicated selector function

---

## Building Block 4 — Defined Session Design Instead of Endless Stream (Ch. 3.3.4)

Goal: fixed, communicated show length, audible ending, no endless loop.

- ✅ **Show length displayed in UI** — `ShowPreviewCard.tsx` (S2) shows estimated total listening time and calculated end time (`endet hörbar um HH:MM`) **before** generation starts (added Apr 28)
- ✅ **Audible ending** — farewell + outro jingle as last segments (orchestrator.ts L. 44–45)
- ✅ **No autoplay** — player stops after outro; transitions to `EndOfShowCard` (S5)
- ✅ **No "cliffhanger" recommendation** — no recommendation UI found
- ✅ **No push notifications** — no Notification API / push permission calls
- ✅ **Wellbeing nudge at show end** — `EndOfShowCard.tsx` (S5) shows concentric-circle graphic, elapsed time, "bis zur nächsten Sendung — am besten morgen." and a Begründung block explaining the intentional pause (added Apr 28)

---

## Building Block 5 — Transparency about Sources, Logic, and Personalization (Ch. 3.3.5)

Goal: viewable on the user side, where content comes from, which preference had which effect, and which pipeline steps ran.

- ✅ **Source display per news item** — `SourceLink.tsx` renders source name, date, and direct link with external-arrow icon inside `AudioPlayer.tsx` for every news segment (added Apr 28)
- ✅ **Profile effect visible** — `RationaleCard.tsx` (S6, "Warum diese Sendung?") shows a profile-to-content mapping table (topic → article source, serendipity → surprise topic, location → weather city, style → voice) and a pipeline chain block (added Apr 28)
- ✅ **Pipeline trace** — `PipelineTrace.tsx` (S3) renders live pipeline steps (Nachrichten laden / Wetter laden / Moderationstexte / Sprache erzeugen / Sendung montieren) with status icons, per-step source labels, and tabular timings during generation (added Apr 28)
- ✅ **Show metadata** — model name and TTS voice shown in `RationaleCard` pipeline block; privacy note ("kein Verhaltens-Tracking") inline
- ✅ **Transparency UI as part of the main view** — `PipelineTrace` (S3) and `RationaleCard` drawer (S6) are first-class app states; `ApiDisclaimer.tsx` footer on S1/S2 lists all external APIs (added Apr 28)

---

## Cross-Cutting (from Ch. 3.4 + Outline 6.4 / 6.5 / 6.6)

### Wellbeing features in design (Outline 6.4)

- ✅ Defined show length (see Building Block 4) — structurally present
- 🟡 Conscious diversification (Building Block 3) — logic partially missing
- ✅ Transparency UI (Building Block 5) — fully implemented Apr 28 (PipelineTrace, RationaleCard, SourceLink, ApiDisclaimer)
- ✅ No push, no autoplay (Building Block 4)
- ✅ **Design system** — three-layer visual system (Aktion / Transparenz / Begründung) implemented in `globals.css` with CSS custom properties; light paper theme, single brass accent, IBM Plex Sans/Mono + Source Serif 4 italic; 5-state app flow (idle → preview → generating → ready → ended); anti-engagement: no pill buttons, gradients, glassmorphism, like buttons, streaks, recommendation carousels (added Apr 28)
- ⬜ **Mapping table values → design decisions** (Outline 6.5) — documentation task, belongs to main document Ch. 6.5

### Data protection (Outline 6.6)

- ✅ No tracking, no third-party analytics (no gtag / mixpanel / similar found)
- ✅ Local storage of the profile (`src/data/preferences.json` + localStorage userId)
- ⬜ Data flow diagram — documentation task for Ch. 6.6
- ✅ Clear UI notices about external APIs — `ApiDisclaimer.tsx` footer on S1/S2 lists all external APIs ("nutzt Anthropic Claude · ElevenLabs · OpenWeatherMap · RSS SRF · NZZ · keine Tracker, keine Werbung"); privacy note inside `RationaleCard` (added Apr 28)

### Prepare SUS survey (Ch. 2.3.5 / Outline 8.3)

- ⬜ SUS questionnaire (DE) as Appendix B
- ⬜ Survey workflow in UI
- ⬜ Wellbeing items / diary template (Appendix C)

---

## Explicitly NOT in scope (Ch. 3.5 — delimitation)

- ❌ Authentication / user accounts
- ❌ Persistent data storage in a (server) database
- ❌ Editorial quality assurance at large scale
- ❌ Advertising and licensing issues (beyond minimum)
- ❌ Scaling infrastructure

→ Mention in **Outlook** (Ch. 11.3).

---

## Tech stack sanity check (`techstack_architektur_radion25.md` vs. `package.json`)

- ✅ Next.js 15.3.1, React 19, TypeScript, Tailwind 4
- ✅ `ai` ^4.3.0 + `@ai-sdk/anthropic` ^1.2.0
- ✅ `elevenlabs` ^1.0.0
- ✅ `rss-parser` ^3.13.0
- ✅ No additional dependencies — package.json stays minimal (Spotify integration uses fetch + OAuth, no additional npm package)

---

## Pilot test preparation (Outline 8.3)

- ⬜ Recruit 5 test persons
- ⬜ 1-week setup (onboarding)
- ⬜ Survey instruments (SUS, wellbeing items, diary, final interview)
- ⬜ Informed consent (Outline 8.5)
- ⬜ Anonymization concept

---

## Additional observations from the audit

- **Spotify integration** (`SpotifyConnect.tsx`, `SpotifyPlayer.tsx`, `src/services/spotify.ts`, `/api/spotify/*`) is present in the code, but not listed in the tech stack document — either add to the documentation or declare as an optional extension (`NEXT_PUBLIC_SPOTIFY_ENABLED=false`).
- **Mock/fallback strategy** is consistently implemented: news, weather, LLM, and TTS each have mock data and env flags (`USE_MOCK_TTS`). Useful for development and pilot test robustness.
- **Voice personalization**: A sensible next refinement would be to assign a different ElevenLabs voice ID per moderation style (formal / casual / energetic) — currently only the prompt changes.

---

## Audit overview

| Area | ✅ | 🟡 | ⬜ | Quote |
|---|---|---|---|---|
| Building Block 1 (Profile) | 6 | 0 | 0 | **100%** ↑ from 67% |
| Building Block 2 (Pipeline) | 17 | 3 | 0 | 85% / 100% |
| Building Block 3 (Curation) | 1 | 2 | 2 | 20% / 60% (unchanged) |
| Building Block 4 (Session) | 6 | 0 | 0 | **100%** ↑ from 67% |
| Building Block 5 (Transparency) | 5 | 0 | 0 | **100%** ↑ from 0% |
| Cross-cutting | 6 | 1 | 4 | ~55% / ~75% ↑ |

**Strengths**: clean pipeline architecture, clear data flow, good error handling, privacy-respecting. Three-layer design system live with anti-engagement constraints throughout.
**Remaining gaps**:
1. Curation logic still passive (no max-per-topic cap, no time-of-day variation, no serendipity item) — Building Block 3.
2. Hallucination guards in LLM system prompt (no explicit "only paraphrase what is given").
3. Voice mapping per moderation style (currently only prompt changes, not ElevenLabs voice ID).
4. Pilot test setup (SUS questionnaire, consent form, diary template).

---

## Order (recommended, prioritized by audit)

> Items 1, 2, and 4 completed Apr 28 as part of design system implementation.

1. ~~**Show length selector** in PreferenceForm~~ ✅ done Apr 28
2. ~~**Transparency UI**: source display in player, "Why this show?" hint, pipeline trace~~ ✅ done Apr 28
3. **Sharpen curation logic**: max-per-topic cap (news.ts), serendipity item as named function, time-of-day tonality adjustment (prompts.ts)
4. ~~**Show length display before start** + post-show wellbeing nudge~~ ✅ done Apr 28
5. **Hallucination guards** in system prompt + few-shot examples (prompts.ts `RADIO_SYSTEM_PROMPT`)
6. **Voice mapping** per moderation style — assign different ElevenLabs voice IDs to formal / casual / energetic
7. Mapping table (Ch. 6.5) and data flow diagram (Ch. 6.6) in main document
8. Pilot test setup (Appendices B/C, SUS questionnaire DE, consent form, diary template)
