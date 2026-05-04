# Implementation Checklist Radio 25

Status: May 5, 2026 (post-coverage-fix + topic guidance)
Sources: `Hauptdokument.docx` (Ch. 3.3, 3.4, 3.5), `Hauptdokument_Gliederung.md` (Ch. 6, 7, 8), `techstack_architektur_radion25.md`, `Radio25_Erhebungsinstrumente.docx`, `Radio25_Evaluationskonzept.docx`
Status legend: ✅ done · 🟡 partial · ⬜ open

> **Audit summary (May 5)**: BB1–BB5 all substantially complete. **BB3 curation** now uses *coverage-first* ordering — every declared profile topic is guaranteed one article before serendipity or depth fill, fixing a bug where short shows (5 Min) silently dropped the third profile topic. **BB1 PreferenceForm** now shows a dynamic topic-count guidance (`X / 2–3 empfohlen für 5 Min` etc.) with a warn-coloured note when the user picks more topics than the budget can fit. Pilot-test instruments drafted in `Radio25_Erhebungsinstrumente.docx`. Remaining: Hauptdokument Ch. 6.5 (mapping table) and Ch. 6.6 (data flow diagram); pilot-test execution.

---

## Building Block 1 — Explicit Preference Settings and Profile Construction (Ch. 3.3.1)

Goal: Profile is transparent, viewable, changeable at any time — without configuration overkill.

- ✅ **PreferenceForm component** (`src/components/PreferenceForm.tsx`)
  - ✅ Topics / interests — `TOPIC_OPTIONS` with 11 categories
  - ✅ Location — text field
  - ✅ Moderation style — `VOICE_STYLES` (formal / casual / energetic)
  - ✅ Show length — `LENGTH_OPTIONS` (5 / 10 / 15 Min) — added Apr 28
  - ✅ **Topic-count guidance** (added May 5) — `TOPIC_GUIDANCE` table maps each length to a recommended topic range (5 Min: 2–3; 10 Min: 3–5; 15 Min: 5–7); a mono indicator next to the "Themen" label shows `X / A–B empfohlen für Y Min` and turns warn-orange with an explicit "N Themen werden nicht erscheinen" note when the user picks more topics than the show budget can cover
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
- ✅ **Few-shot examples** — `RADIO_SYSTEM_PROMPT` now contains two GUT/SCHLECHT contrast pairs (erfundene Studie vs. quellentreue Paraphrase; erfundene Quelle vs. tatsächliche Quelle); per-segment positive examples in `buildSegmentPrompt` for greeting, news, weather, farewell ([radio25-app/src/lib/prompts.ts](radio25-app/src/lib/prompts.ts))
- ✅ **Hallucination mitigation** — explicit "Quellen-Treue" block in `RADIO_SYSTEM_PROMPT` forbids inventing topics, studies, quotes, or media sources not present in the supplied articles
- ✅ **Runtime source check** — `checkSpokenSources()` ([radio25-app/src/lib/source-check.ts:14](radio25-app/src/lib/source-check.ts#L14)) scans news segments for known outlets (NZZ, SRF, Tagesanzeiger, Blick, Watson, 20 Minuten); wired into orchestrator ([radio25-app/src/lib/orchestrator.ts](radio25-app/src/lib/orchestrator.ts)) and surfaced via `segment.sourceCheck.unverifiedMention` warning in the player UI

### 2.3 Speech synthesis (TTS)

- ✅ **`tts.ts`** — ElevenLabs + `eleven_multilingual_v2` ([radio25-app/src/services/tts.ts:65](radio25-app/src/services/tts.ts#L65), `output_format: 'mp3_44100_128'` L. 66)
- ✅ **Voice IDs per moderation style** — `STYLE_ENV_VAR` map + `resolveVoiceId()` ([radio25-app/src/services/tts.ts:5-23](radio25-app/src/services/tts.ts#L5-L23)) resolve `ELEVENLABS_VOICE_ID_FORMAL` / `_CASUAL` / `_ENERGETIC` per `voiceStyle`, with fallback to `ELEVENLABS_VOICE_ID`. `.env.example` lists all four vars.
- ✅ Audio output as inline data URL (Vercel read-only FS at runtime, [tts.ts:78](radio25-app/src/services/tts.ts#L78))
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

- ✅ **Topic diversification** — `capPerTopic(articles, max=2)` in [radio25-app/src/services/news.ts](radio25-app/src/services/news.ts) caps each topic at 2 articles; topic origin is tracked via the RSS_FEEDS reverse mapping during fetch
- ✅ **Time-of-day context** — two programmatic helpers: `applyDaypart(articles, now)` in [news.ts](radio25-app/src/services/news.ts) caps total article count by daypart (morning 06–10: 6, midday 10–17: 10, evening 17–22: 8, night 22–06: 4), and `applyTimeOfDayMood(hour)` in [prompts.ts](radio25-app/src/lib/prompts.ts) returns programmatic tonality + greeting/farewell nudges per `TimeOfDay`
- ✅ **Profile match + serendipity** — `pickSerendipity(articles, declaredTopics, count=1)` in [news.ts](radio25-app/src/services/news.ts) reserves 1 slot for an article whose topic is NOT in the user's profile; tagged with `selectionReason='serendipity'`. `fetchNews` automatically pulls in one extra non-profile topic feed so a serendipity candidate exists.
- ✅ **No engagement optimum** — no click/dwell-time heuristic in the code, no engagement metrics
- ✅ **Selection criteria as named functions** — `selectNews({ articles, topics, now, maxArticles })` composes the selectors in **coverage-first order** (revised May 5): pass 1 guarantees one article per declared profile topic in user-specified order, pass 2 reserves a serendipity slot only if budget remains, pass 3 round-robins second/third articles per topic up to `maxPerTopic`, pass 4 fills with fallback. `slice(0, maxArticles)` lives only inside `selectNews`. Each article carries `selectionReason: 'profile' | 'serendipity' | 'fallback'` and `topic` so the rationale UI can label its origin.
- ✅ **Selection visible to user** — `RationaleCard` reads `selectionReason` from segment data and shows a per-topic mapping table including the "Überraschung" row with the actual serendipity topic; `SourceList` renders an "ÜBERRASCHUNG" badge on serendipity items
- ✅ **Coverage guarantee for tight budgets** (added May 5) — for short shows where `maxArticles == declaredTopics`, the user's chosen topics are never silently dropped: serendipity stands down so all profile topics get an article. Verified end-to-end via API (`{politik, wirtschaft, sport}` × 5 Min returns one article per topic, no serendipity).

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
- ✅ **Full source gallery** — `SourceList.tsx` ([radio25-app/src/components/SourceList.tsx](radio25-app/src/components/SourceList.tsx)) renders all `NewsArticle` objects (source / date / title / link) used by the LLM as a transparent gallery, complementing per-segment `SourceLink` (added May 4)
- ✅ **Runtime hallucination warning surfaced in UI** — `AudioPlayer` shows a `sourceCheck.unverifiedMention` warning block when `source-check.ts` flags an outlet mentioned in spoken text but not in the source articles (added May 4)
- ✅ **Profile effect visible** — `RationaleCard.tsx` (S6, "Warum diese Sendung?") shows a profile-to-content mapping table (topic → article source, serendipity → surprise topic, location → weather city, style → voice) including the resolved ElevenLabs voice ID per style, and a pipeline chain block populated from real `pipelineSteps` when available (added Apr 28, refined May 4)
- ✅ **Pipeline trace** — `PipelineTrace.tsx` (S3) renders live pipeline steps (Nachrichten laden / Wetter laden / Moderationstexte / Sprache erzeugen / Sendung montieren) with status icons, per-step source labels (e.g. "SRF · NZZ — RSS-Feeds", "ElevenLabs TTS"), error states, and tabular timings during generation (added Apr 28, source labels added May 4)
- ✅ **Show metadata** — model name and TTS voice shown in `RationaleCard` pipeline block; privacy note ("kein Verhaltens-Tracking") inline
- ✅ **Transparency UI as part of the main view** — `PipelineTrace` (S3) and `RationaleCard` drawer (S6) are first-class app states; `ApiDisclaimer.tsx` footer on S1/S2 lists all external APIs (added Apr 28)

---

## Cross-Cutting (from Ch. 3.4 + Outline 6.4 / 6.5 / 6.6)

### Wellbeing features in design (Outline 6.4)

- ✅ Defined show length (see Building Block 4) — structurally present
- ✅ Conscious diversification (Building Block 3) — `capPerTopic` + `pickSerendipity` + `applyDaypart` named selectors in `news.ts`
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

- ✅ **SUS questionnaire (DE)** — full draft in `Radio25_Erhebungsinstrumente.docx` §C
- ✅ **Wellbeing items / diary template** — full draft in `Radio25_Erhebungsinstrumente.docx` §F ("Tagebuch")
- ⬜ **Survey workflow in UI** — no in-app SUS / diary screen yet; participants currently fill paper/PDF instruments

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

- ✅ **Survey instruments (SUS, wellbeing items, diary, final interview)** — drafted in `Radio25_Erhebungsinstrumente.docx` (§C SUS, §F diary, additional items in §B/D/E/G)
- ✅ **Informed consent (Outline 8.5)** — drafted in `Radio25_Erhebungsinstrumente.docx` §A ("Einwilligungserklärung", §A.1–A.4)
- ✅ **Anonymization concept** — pseudonymization with separated code list, encrypted local storage, 2-year deletion policy (`Radio25_Erhebungsinstrumente.docx` §A.3)
- ⬜ Recruit 5 test persons
- ⬜ 1-week setup (onboarding)
- ⬜ In-UI survey workflow (so SUS / diary can be filled in-app instead of separate PDFs)

---

## Additional observations from the audit

- **Spotify integration** (`SpotifyConnect.tsx`, `SpotifyPlayer.tsx`, `src/services/spotify.ts`, `/api/spotify/*`) is present in the code, but not listed in the tech stack document — either add to the documentation or declare as an optional extension (`NEXT_PUBLIC_SPOTIFY_ENABLED=false`).
- **Mock/fallback strategy** is consistently implemented: news, weather, LLM, and TTS each have mock data and env flags (`USE_MOCK_TTS`). Useful for development and pilot test robustness.
- **Voice personalization** (resolved May 4): Per-style ElevenLabs voice IDs now resolved via `STYLE_ENV_VAR` map in `tts.ts`. Concrete voice IDs still need to be chosen and set in deployment env vars.

---

## Audit overview

| Area | ✅ | 🟡 | ⬜ | Quote |
|---|---|---|---|---|
| Building Block 1 (Profile) | 7 | 0 | 0 | **100%** (now incl. topic-count guidance) |
| Building Block 2 (Pipeline) | 22 | 0 | 0 | **100%** (unchanged) |
| Building Block 3 (Curation) | 7 | 0 | 0 | **100%** (now incl. coverage guarantee) |
| Building Block 4 (Session) | 6 | 0 | 0 | **100%** (unchanged) |
| Building Block 5 (Transparency) | 7 | 0 | 0 | **100%** (unchanged) |
| Cross-cutting | 10 | 0 | 3 | ~75% / ~75% (unchanged) |

**Strengths**: clean pipeline architecture, clear data flow, good error handling, privacy-respecting. Three-layer design system live with anti-engagement constraints throughout. Hallucination guards both prompt-level (with GUT/SCHLECHT few-shots) and runtime-checked. Voice mapped to moderation style. Curation logic visibly named in code (capPerTopic / pickSerendipity / applyDaypart / selectNews) and uses coverage-first ordering so user-chosen topics are never silently dropped — the alternative target value (Vielfalt + Tageszeit + Profil) is demonstrable, not just claimed. PreferenceForm gives live topic-count guidance so the user understands the trade-off between breadth and depth before generation.
**Remaining gaps**:
1. Mapping table (Ch. 6.5) and data flow diagram (Ch. 6.6) in `Hauptdokument.docx`.
2. Pilot-test execution: in-UI survey workflow + recruit 5 participants + 1-week onboarding (instruments themselves are drafted).

---

## Order (recommended, prioritized by audit)

> Items 1, 2, 4 completed Apr 28. Items 3, 5, 6 completed May 4. Coverage-first fix + topic-count guidance added May 5. Items 8 instruments drafted in `Radio25_Erhebungsinstrumente.docx`.

1. ~~**Show length selector** in PreferenceForm~~ ✅ done Apr 28
2. ~~**Transparency UI**: source display in player, "Why this show?" hint, pipeline trace~~ ✅ done Apr 28
3. ~~**Sharpen curation logic**: capPerTopic + pickSerendipity + applyDaypart in news.ts; selectNews composes; applyTimeOfDayMood in prompts.ts; RationaleCard + SourceList show selection reasons~~ ✅ done May 4. **Coverage-first fix + topic-count guidance** ✅ done May 5.
4. ~~**Show length display before start** + post-show wellbeing nudge~~ ✅ done Apr 28
5. ~~**Hallucination guards** — core "Quellen-Treue" + runtime `source-check.ts` + GUT/SCHLECHT few-shots in system prompt + per-segment positive examples~~ ✅ done May 4
6. ~~**Voice mapping** per moderation style — `STYLE_ENV_VAR` map in tts.ts~~ ✅ done May 4
7. **Mapping table (Ch. 6.5) and data flow diagram (Ch. 6.6)** in `Hauptdokument.docx` — ⬜ next priority
8. **Pilot test instruments** (SUS-DE, diary, consent, anonymization) ✅ drafted in `Radio25_Erhebungsinstrumente.docx`. **In-UI survey workflow + recruitment + 1-week onboarding** still ⬜.
9. **Concrete ElevenLabs voice IDs** for the three styles need to be selected and added to deployment env vars (the wiring exists but currently falls back to a single voice if the style-specific vars aren't set).
10. **Daypart cap interaction with explicit length choice**: at night (22:00–06:00), `applyDaypart` caps total articles at 4 even when the user picked a 10- or 15-min show. Worth deciding whether to soften this so the daypart cap never reduces below the user's chosen length.
