# Reproduction Guide

How every artefact in this repository was produced and how to rebuild each one from
source. The goal is full reproducibility: a reader with the source files in this repo
can regenerate the questionnaire, the raw-data structure, the analysis, the figures, the
interactive dashboard and the prototype without any hidden manual steps.

Nothing in the empirical chain contains hand-typed numbers. Every value flows
deterministically from the raw CSV through the notebook; the dashboard mirrors those
computed values (see [Interactive dashboard](#5-interactive-dashboard)).

| Artefact | Built from | Section |
|---|---|---|
| Google Form (questionnaire) | Apps Script `reference/fragebogen/Attune_Fragebogen_GoogleForms.gs` | [1](#1-google-form-questionnaire) |
| Raw data CSV | Export of the Google Form responses | [2](#2-raw-data-export) |
| Analysis notebook + HTML export | `Attune_Pilotstudie_Auswertung.ipynb` over the CSV | [3](#3-analysis-notebook-and-html-export) |
| Figures (PNG, 200 dpi) | matplotlib cells in the notebook → `figures/` | [4](#4-figures) |
| Interactive dashboard | `Attune_Pilotstudie_Dashboard.html` (Chart.js) + notebook values | [5](#5-interactive-dashboard) |
| Prototype app | `attune-app/` (Next.js) | [6](#6-prototype-app) |

---

## 1. Google Form (questionnaire)

The questionnaire was **not** clicked together by hand in the Google Forms UI. It is
generated programmatically by a Google Apps Script, so the exact instrument can be
rebuilt at any time and is version-controlled as code.

**Source files** (in `reference/fragebogen/`):

- `Attune_Fragebogen_GoogleForms.gs` — the authoritative Apps Script that builds the
  full pilot questionnaire (~55 items across the validation sections Feasibility /
  Usability-Acceptance / Impact). Title, description, consent text, sections, Likert
  grids and the UEQ-S block are all defined here.
- `Attune_Fragebogen_Uebersicht.md` — human-readable companion: every item in plain
  text, grouped by section, with the theory anchors from thesis Ch. 2.3 and a changelog
  of the supervisor-driven revisions (e.g. the 2026-05-18 UEQ-S addition).
- `Pilot_Fragebogen_AppsScript.gs` / `Pilot_Fragebogen_Erstfeedback_AppsScript.gs` —
  scripts for the earlier short usability pre-test (kept for provenance, not the final
  pilot instrument).
- `Attune – Pilotstudie - Google Formulare.pdf` (repo root) — a PDF export of the
  generated form, i.e. a snapshot of what participants actually saw.

**Rebuild the form:**

1. Open [script.google.com](https://script.google.com) and click **New project**.
2. Delete the placeholder `function myFunction() {}`.
3. Open `reference/fragebogen/Attune_Fragebogen_GoogleForms.gs`, copy the **entire**
   contents and paste them into the editor.
4. Click **Save** (disk icon).
5. In the function dropdown select `createAttuneForm` and click **Run** (▶).
6. Approve the one-time permissions for FormApp and Drive.
7. After a few seconds the form is created in your Google Drive. The execution log
   (Ctrl+Enter / "Executions") prints the **editor URL** (to adjust) and the
   **published URL** (to share with participants).

**Notes.** The Likert scale is 5-point throughout (1 = strongly disagree, 5 = strongly
agree); the UEQ-S block is deliberately 7-point (methodologically correct, explained
inside that form section). To switch the main scale to 7 points, change the column
constant `LIKERT_COLS` to `['1','2','3','4','5','6','7']`. Items can be added or removed
inside their section blocks. Email collection is off; responses are pseudonymous via the
participant ID entered in the first required field.

---

## 2. Raw data export

`Attune – Pilotstudie.csv` (repo root) is the unmodified response export from the Google
Form (96 columns). It is the single source of truth for the analysis.

**Recreate it** by opening the form's response sheet in Google Forms / Sheets and
choosing *Download responses (.csv)*. Of the 27 raw responses, 2 are excluded for missing
consent, leaving **n = 25** (the filter is applied in the notebook, not by editing the
CSV).

---

## 3. Analysis notebook and HTML export

`Attune_Pilotstudie_Auswertung.ipynb` is the authoritative analysis. It loads the CSV,
filters for consent (n = 25), recodes per construct (negatively worded items are
reverse-scored; awareness items are deliberately not — rationale in notebook Section 0.1)
and computes **descriptive statistics only** (M, SD, min, max; no inferential statistics
at n = 25). Section 7 answers the four research sub-questions (T1–T4); Section 8 condenses
along the three validation categories; Section 10 adds the exploratory subgroup and
Spearman-correlation analyses that feed the dashboard.

`Attune_Pilotstudie_Auswertung.html` is a 1:1 HTML export of the executed notebook.

**Run it yourself:**

```bash
pip install pandas numpy matplotlib scipy nbclient nbconvert ipykernel
jupyter nbconvert --to notebook --execute --inplace Attune_Pilotstudie_Auswertung.ipynb
jupyter nbconvert --to html Attune_Pilotstudie_Auswertung.ipynb
```

(`scipy` is needed for the Spearman correlations in Section 10.)

---

## 4. Figures

All charts are generated by matplotlib cells inside the notebook. The research-question
and overview charts are additionally exported as PNG (200 dpi) to `figures/` and embedded
into the thesis from there — so re-executing the notebook regenerates them. Current files:
`T1_autonomie.png`, `T2_diversitaet.png`, `T3_session.png`, `T4_transparenz.png`,
`Kategorien_uebersicht.png`, `Subgruppen_delta.png`, `Korrelationsmatrix.png`,
`HF_synthese.png`, `ui_abschluss.png`, `Komponentenarchitektur.png`.

---

## 5. Interactive dashboard

`Attune_Pilotstudie_Dashboard.html` is a hand-designed, **standalone** presentation layer
— a single HTML file with inline CSS and JavaScript, the only external dependency being
Chart.js loaded from a CDN:

```
https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js
```

It has no build step: open the file in any browser and it renders. The seven tabs
(Übersicht, Stichprobe, Machbarkeit, Usability, Wirkung, Qualitativ, Zusammenhänge) are
plain `<section>` blocks toggled by a small vanilla-JS tab switcher; charts are Chart.js
canvases plus a few CSS bar/heatmap elements.

**How its numbers are kept reproducible.** Every value displayed lives in one JavaScript
object near the top of the `<script>` block:

```js
const DATA = { meta: {...}, tech: [...], sus_index: {...}, wirkung: [...],
               groups: {...}, corr: {...}, ... };
```

These values are the descriptive results computed in the notebook (Sections 2–10) — the
notebook remains the authoritative source. The dashboard is the *view*, not a second
calculation: the subgroup deltas and the Spearman matrix shown under "Zusammenhänge" are
exactly the Section-10 outputs.

**Rebuild / update the dashboard:**

1. Re-execute the notebook so its statistics are current (Section 3).
2. Read the values from the relevant notebook sections (the construct tables in 2–8 and
   the subgroup/correlation outputs in 10).
3. Update the matching fields in the `const DATA = {...}` object inside
   `Attune_Pilotstudie_Dashboard.html`. The keys map onto the tabs: `tech` →
   Machbarkeit, `sus_items`/`sus_index`/`diff` → Usability, `wirkung`/`awareness` →
   Wirkung, `qual` → Qualitativ, `groups`/`corr` → Zusammenhänge.
4. Save and open the file in a browser to verify; no compilation needed.

Because the data and the layout live in the same file, the dashboard always reflects
whatever is in `DATA`; keeping `DATA` in sync with the notebook is the one manual step,
and the notebook is authoritative if the two ever disagree.

---

## 6. Prototype app

`attune-app/` is the Next.js 15 / React 19 / TypeScript prototype. Setup, the curation
logic (`src/services/news.ts`, `selectNews()`) and the unit tests
(`src/services/news.test.ts`) are documented in the main [README](README.md#prototype-attune-app).

```bash
cd attune-app
npm install
cp .env.example .env.local   # API keys: Anthropic + ElevenLabs required; OpenWeatherMap, Jamendo optional
npm run dev
```

---

## Tool transparency

The Apps Script, the analysis notebook and the dashboard were created with the support of
Claude (Anthropic). All coding decisions are documented in the notebook and the source
files, and all outputs were checked against the raw data. The notebook is the
authoritative source for every reported number.
