# Claude Code Prompts — Attune (Stand 2026-04-28)

Reihenfolge entspricht der Priorität aus dem Implementation_Checklist (Audit 2026-04-28).
Jeder Prompt ist self-contained — kannst du einzeln in Claude Code (im Repo-Root von `attune-app/`) reinkopieren.

---

## P1 — Baustein 3: Kuratierungslogik mit alternativem Zielwert

**Bezug:** Hauptdokument Kap. 3.3.3, Teilfrage T2. Aktuell der einzige Baustein unter 60 %. Ohne diese Änderung *behauptet* der Prototyp nur den alternativen Zielwert, demonstriert ihn aber nicht.

```
Refaktoriere die Nachrichtenauswahl in `src/services/news.ts`, sodass sie den
alternativen Zielwert aus Hauptdokument Kap. 3.3.3 (Vielfalt, Tageszeitkontext,
Profilmatch — explizit NICHT Verweildauer) im Code sichtbar macht.

Aufgaben:
1. Extrahiere die Auswahllogik aus `fetchNews` in eine neue, exportierte Funktion
   `selectNews(articles: NewsArticle[], opts: { topics: string[]; now: Date;
   maxArticles: number }): NewsArticle[]`. `fetchNews` wird zum reinen Datenholer.

2. Implementiere innerhalb `selectNews` drei benannte Selektoren als reine
   Funktionen mit JSDoc-Kommentar, der die Thesenstelle zitiert:
     - `capPerTopic(articles, max=2)` — höchstens 2 Artikel je erkanntem Topic.
       Topic-Erkennung über `RSS_FEEDS`-Mapping (welcher Feed lieferte den Artikel).
     - `pickSerendipity(articles, declaredTopics, count=1)` — wählt 1 Artikel,
       dessen Topic NICHT in `declaredTopics` ist. Wenn keine vorhanden:
       gibt leeres Array zurück, kein Crash. Markiere Treffer mit
       `article.selectionReason = 'serendipity'`.
     - `applyDaypart(articles, now)` — limitiert die Gesamtzahl je nach Tageszeit:
       morgens (06:00–10:00) max 6, mittags (10:00–17:00) max 10,
       abends (17:00–22:00) max 8, nachts (22:00–06:00) max 4.

3. Erweitere `NewsArticle` in `src/lib/types.ts` um optionale Felder
   `selectionReason?: 'profile' | 'serendipity' | 'fallback'` und `topic?: string`,
   damit `RationaleCard` und `SourceLink` die Auswahl begründen können.

4. Schreibe Vitest-Unit-Tests in `src/services/__tests__/news.test.ts`
   (falls Vitest noch nicht da ist: `npm i -D vitest`, minimale `vitest.config.ts`)
   für jeden der drei Selektoren plus `selectNews` als Komposition.
   Mindestens diese Fälle:
     - capPerTopic: 5 politik-Artikel + 5 sport-Artikel → 2+2 zurück
     - pickSerendipity: keine ausserhalb deklarierter Topics vorhanden → leeres Array
     - applyDaypart: gleiche Eingabe um 03:00 vs. 14:00 ergibt unterschiedliche Längen

5. Stelle sicher, dass `slice(0, maxArticles)` als finaler Schritt nur noch in
   `selectNews` vorkommt, NICHT mehr inline in `fetchNews` oder `fetchFromRSS`.

6. Update `RationaleCard.tsx`: zeige für jeden News-Artikel das Label
   "Profil" / "Überraschung" / "Fallback" basierend auf `selectionReason`.

Verifiziere am Ende: `npm test` grün, `npm run build` grün, manueller
Probelauf zeigt im RationaleCard mindestens einen "Überraschung"-Marker
sobald Serendipity einen Treffer hat.
```

---

## P2 — Halluzinations-Leitplanken + Few-shot

**Bezug:** Hauptdokument Kap. 4.5 nennt Prompt-Engineering und Quellenverankerung als die einzigen Halluzinations-Massnahmen. Diese Massnahme muss im Code stehen, sonst bleibt sie reine Behauptung.

```
Härte den LLM-Prompt in `src/services/prompts.ts` gegen Halluzinationen.

Aufgaben:
1. Erweitere `RADIO_SYSTEM_PROMPT` (oben in der Datei) um eine neue Regel als
   eigenen Absatz, wörtlich etwa:
   "Du paraphrasierst ausschliesslich Inhalte, die in den dir übergebenen
   Quellen stehen. Du fügst keine Fakten, Zahlen, Namen, Zitate oder
   Begründungen hinzu, die nicht in den Quellen vorkommen. Wenn eine Information
   in den Quellen fehlt, lässt du sie weg, statt sie zu erfinden."

2. Ergänze in der `news`-Prompt-Funktion (`buildNewsPrompt` oder gleichwertig)
   zwei konkrete Few-shot-Beispiele direkt vor dem eigentlichen User-Input.
   Format pro Beispiel: Quellenblock (1 fiktiver, gut gewählter Artikel),
   dann gewünschte 2-Satz-Moderation, dann ein Negativbeispiel mit Kommentar
   "// schlecht: erfindet Zahl" oder "// schlecht: fügt Quelle hinzu".

3. Wenn aktuell `temperature` nirgends gesetzt ist, setze sie in `llm.ts`
   auf 0.4 (faktentreu, aber nicht roboterhaft) und kommentiere die Wahl.

4. Füge in `src/services/__tests__/prompts.test.ts` einen Snapshot-Test
   für `RADIO_SYSTEM_PROMPT` hinzu, damit künftige Änderungen am Prompt
   sichtbar werden.

Verifiziere: ein Probelauf der Sendung mit absichtlich knappem Quellentext
(nur Titel, keine Zusammenfassung) erzeugt eine kurze, nicht-spekulative
Moderation, keine erfundenen Details.
```

---

## P3 — Voice-Mapping pro Moderationsstil

**Bezug:** Kap. 3.3.1 verspricht, dass die Hörerinnen und Hörer einen Moderationsstil aktiv wählen. Solange nur der Prompt sich ändert, ist diese Wahl nicht hörbar.

```
Mappe den `voiceStyle` aus dem Profil auf unterschiedliche ElevenLabs-Voice-IDs.

Aufgaben:
1. In `src/services/tts.ts`: führe ein Mapping-Objekt
   `VOICE_IDS: Record<VoiceStyle, string>` ein, mit Werten aus Env-Variablen:
     - formal:   process.env.ELEVENLABS_VOICE_FORMAL    || 'pNInz6obpgDQGcFmaJgB' // Adam
     - casual:   process.env.ELEVENLABS_VOICE_CASUAL    || 'EXAVITQu4vr4xnSDxMaL' // Bella
     - energetic:process.env.ELEVENLABS_VOICE_ENERGETIC || 'TxGEqnHWrfWFTfGW9XjX' // Josh

2. Erweitere die Signatur von `synthesizeSpeech(text, opts)` um `opts.voiceStyle`
   und nutze das Mapping. Falls `voiceStyle` undefiniert: nimm `formal`.

3. In `orchestrator.ts`: ziehe `voiceStyle` aus dem Profil und reiche es
   bei jedem TTS-Aufruf durch.

4. Update `RationaleCard.tsx`: zeige unter "Sprache" nicht nur den Style-Namen,
   sondern auch die konkret verwendete Voice-ID (gekürzt auf 8 Zeichen),
   damit Transparenz BB5 sichtbar bleibt.

5. `.env.example`: drei neue ELEVENLABS_VOICE_* Variablen mit Kommentar.

Verifiziere: Profile mit unterschiedlichem Stil produzieren tatsächlich
unterschiedlich klingende MP3s. Mock-Modus (`USE_MOCK_TTS=true`) bleibt
funktionsfähig.
```

---

## P4 — Mood-Check-in (Feature + Erhebungsinstrument in einem)

**Bezug:** Kap. 8.3 listet Wellbeing-Items als Erhebungsinstrument. Wenn das im Prototyp eingebettet ist, dient eine Komponente zwei Zwecken: Wellbeing-Erfahrbarkeit (BB4) und Datensammlung für die Pilotstudie.

```
Baue eine `MoodCheckIn`-Komponente, die zwei Zwecke erfüllt: spürbares
Wellbeing-Element für die Hörerin und Erhebungsinstrument für die Pilotstudie
(siehe Hauptdokument Kap. 8.3).

Aufgaben:
1. Neue Komponente `src/components/MoodCheckIn.tsx`:
     - Zwei 1–7-Slider mit Schweizer Hochdeutsch-Labels:
       "Wie ist dein Energielevel gerade?" und "Wie ruhig fühlst du dich?"
     - Ein optionaler Freitext (max 140 Zeichen, "freiwillig").
     - Submit speichert in `localStorage` unter Key `attune.mood.<showId>.<phase>`,
       wo `phase` = 'pre' | 'post'.
     - Variante "lite" (ohne Freitext) für vor der Sendung, Variante "full"
       (mit Freitext) für nach der Sendung.
     - Anti-Engagement: kein Skip-Counter, keine Streaks, kein Vergleich.
       Überspringen ist gleichberechtigte Option, NICHT als grauer Link.

2. Integration in den 5-State-Flow:
     - Vor Generate (S1 → S2): MoodCheckIn lite, optional, "Überspringen"
       gleichwertig sichtbar.
     - Nach EndOfShowCard (S5): MoodCheckIn full, ebenfalls optional.

3. Neue API-Route `src/app/api/mood/route.ts`:
     - GET liefert alle gespeicherten Mood-Einträge (für lokale Auswertung).
     - POST speichert in `src/data/mood.json` (gleicher Mechanismus wie
       preferences.json), pseudonymisiert über `userId` aus localStorage.
     - Datei NICHT in Git committen — füge `src/data/mood.json` zu `.gitignore`.

4. Neue Komponente `src/components/MoodSummary.tsx`, erreichbar nur über
   eine versteckte Route `/me`, zeigt der einzelnen Person ihre eigenen
   Mood-Einträge als kleine Tabelle. KEIN Aggregat-Dashboard, keine
   Vergleiche, keine Erfolgsanzeigen.

5. README-Eintrag im attune-app/README: "Pilotstudien-Hinweis: Mood-Daten
   liegen ausschliesslich lokal in `src/data/mood.json` und werden für
   die Auswertung anonymisiert exportiert."

Verifiziere: Profil A und Profil B speichern getrennt, Daten überleben
Reload. Tasten-Tab-Reihenfolge ergibt Sinn (a11y).
```

---

## P5 — Pilotstudien-Anhänge (.docx)

**Bezug:** Outline 8.3 / 8.5. Ohne diese Anhänge kann der Pilottest nicht starten.

```
Erstelle drei Word-Dokumente im Ordner `Anhaenge/` (auf Repo-Ebene des
gesamten Projekts, NICHT in attune-app/):

1. `Anhaenge/Anhang_B_SUS_DE.docx` — System Usability Scale, deutsche
   Version nach Lewis (2018) und der validierten ZHAW-Übersetzung
   (Bangor et al. 2008 als Skalenanker). 10 Items, 5-stufige Likert
   ("trifft überhaupt nicht zu" — "trifft voll zu"), Auswertungsanleitung
   am Ende, Zitat der Quelle. Schweizer Hochdeutsch.

2. `Anhaenge/Anhang_C_Tagebuch.docx` — Tagebuchvorlage für 7 Tage.
   Pro Tag: Datum, Sendung gehört (j/n), Sendungsdauer, Energielevel-Slider
   (1–7), Ruhe-Slider (1–7), drei offene Felder:
     - "Was hat mir an der Sendung gefallen?"
     - "Was war störend oder hat mich aus der Sendung geworfen?"
     - "Was ist mir an meinem eigenen Erleben aufgefallen?"
   Plus Hinweis "freiwillig, jederzeit überspringbar".

3. `Anhaenge/Anhang_E_Einverstaendnis.docx` — Einverständniserklärung
   für die Pilotstudie. Inhalte: Zweck der Studie, was erhoben wird
   (lokal gespeicherte Profile, Mood-Daten, Tagebuch, Abschlussinterview),
   Anonymisierungsverfahren, Recht auf Widerruf, Datenlöschung,
   Kontakt Michael Möckli + Betreuer Alexandre de Spindler.
   Unterschriftsfeld + Datum.

Nutze für alle drei das `docx`-Skill (siehe SKILL.md), explizit mit
A4-Seitengrösse (11906 x 16838 DXA), Arial 11pt Default, klare
H1/H2-Hierarchie.

Verifiziere: validate.py grün für jedes der drei Files. Word-Öffnen
zeigt korrekte Umlaute ("Massstab", "ä/ö/ü", Schweizer ß-Vermeidung).
```

---

## P6 — Interview-Leitfaden

```
Erstelle `Anhaenge/Anhang_D_Interview_Leitfaden.docx` als halbstrukturierten
Leitfaden für das Abschlussinterview der Pilotstudie (Hauptdokument
Outline 8.3).

Struktur:
1. Aufwärmen (5 Min): "Erzähl mir frei, wie war deine Woche mit Attune."
2. Block T1 — Autonomie/Profil (3 Fragen, je mit 2 Nachfragen)
3. Block T2 — Inhaltsdiversität/Kuratierung (3 Fragen)
4. Block T3 — Sessiongestaltung/definiertes Ende (3 Fragen)
5. Block T4 — Transparenz (3 Fragen)
6. Abschluss: "Was würdest du behalten, was ändern, was bist du froh nicht
   zu haben verglichen mit deinen üblichen Medien?"

Jede Frage offen formuliert, keine Suggestivfragen. Pro Block steht oben
das Theoriezitat (Ryan & Deci 2000 / Milano et al. 2020 / Vanden Abeele
2021 / Reviglio & Agosti 2020), an dem die Frage hängt — als grauer
Hinweis für den Interviewer, nicht zum Vorlesen.

Format: A4, Arial 11pt, klare H1 pro Block, Notizfeld nach jeder Frage.

Nutze docx-Skill, validate am Ende.
```

---

## P7 — Mapping-Tabelle (Hauptdokument Kap. 6.5)

```
Erweitere `Hauptdokument.docx` um eine Mapping-Tabelle in Kap. 6.5.

Vorgehen:
1. Lies das aktuelle `Hauptdokument.docx` (im Projekt-Root) mit pandoc oder
   unpack, finde die Stelle Kap. 6.5 ("Werte und Designentscheidungen" oder
   ähnlich gemäss Hauptdokument_Gliederung.md).

2. Füge dort eine Tabelle ein mit den Spalten:
     | Wert (VSD) | Theorie-Anker | Designentscheidung in Attune | Sichtbar in Code |

3. Mindestens diese Zeilen:
     - Autonomie | Ryan & Deci 2000, METUX | explizite Profilangabe statt
       implizites Lernen | PreferenceForm.tsx, ProfilePanel.tsx
     - Kompetenz | Ryan & Deci 2000 | nachvollziehbare Auswahl, Quellen
       sichtbar | SourceLink.tsx, RationaleCard.tsx
     - Selbstbestimmung | METUX-Verhaltensebene | definierte Sendungslänge,
       kein Autoplay | ShowPreviewCard.tsx, EndOfShowCard.tsx, AudioPlayer.tsx
     - Transparenz | Reviglio & Agosti 2020 | Pipeline-Trace, Begründungs-
       karte, API-Disclaimer | PipelineTrace.tsx, RationaleCard.tsx,
       ApiDisclaimer.tsx
     - Vielfalt | Milano et al. 2020 | max-pro-Topic-Cap + Serendipity-Slot
       statt Engagement-Optimum | services/news.ts (selectNews)
     - Tageskontext | Vanden Abeele 2021 | Daypart-Selektor in der
       Auswahllogik | services/news.ts (applyDaypart)
     - Datenschutz | DSGVO + VSD | localStorage statt Auth, kein
       Tracking | preferences.json, ApiDisclaimer.tsx

4. Edit als tracked changes mit Author "Claude", damit Michael die
   Änderung review-bar abnimmt.

5. validate.py am Ende.

Vorgehen siehe SKILL.md für docx, Abschnitt "Editing Existing Documents".
```

---

## P8 — Datenflussdiagramm (Hauptdokument Kap. 6.6)

```
Erstelle ein Datenflussdiagramm für `Hauptdokument.docx` Kap. 6.6.

1. Generiere als SVG (oder Mermaid → SVG via cli) ein Diagramm mit den
   Knoten (genau diese Bezeichnungen):
     - Profil (localStorage + preferences.json)
     - Orchestrator
     - Externe Quellen: SRF RSS, NZZ RSS, OpenWeatherMap
     - Claude Sonnet (LLM)
     - ElevenLabs (TTS)
     - Player (HTML5 Audio)
     - Transparenz-UI (PipelineTrace, RationaleCard, SourceLink)

2. Pfeile:
     - Profil → Orchestrator (Präferenzen)
     - Quellen → Orchestrator (Rohdaten)
     - Orchestrator → LLM (Quellen + Profil) → Orchestrator (Texte)
     - Orchestrator → TTS (Texte) → Orchestrator (MP3-Segmente)
     - Orchestrator → Player (ShowResult)
     - Orchestrator → Transparenz-UI (Pipeline-Trace + Rationale)

3. Annotation: an jedem Pfeil das Datenformat (z.B. "JSON", "MP3",
   "Text + style"). Roter Hinweispfeil "kein Behaviour-Tracking" als
   Negativ-Annotation.

4. Speichere SVG als `Anhaenge/diagramme/datenfluss_attune.svg` UND
   als PNG (300 dpi) `Anhaenge/diagramme/datenfluss_attune.png`.

5. Füge die PNG in Hauptdokument.docx Kap. 6.6 ein (als tracked change),
   plus drei Sätze Bildunterschrift, die das Diagramm an Kap. 3.3.2 + 3.3.5
   zurückbindet.

6. validate.py am Ende.
```

---

# Kür — wenn nach den Pflicht-Punkten noch Zeit ist

## K1 — Engagement-Modus als Vergleichsschalter

```
Baue einen versteckten Engagement-Vergleichsmodus für die Pilotstudie.
Bezug: macht den methodischen Witz "gleicher Stack, andere Zielfunktion"
(Hauptdokument Kap. 4.4) für die Probandinnen direkt erfahrbar.

Aufgaben:
1. Env-Flag `NEXT_PUBLIC_ENGAGEMENT_DEMO=true` aktiviert einen Schalter
   im Footer (S1) "Wellbeing-Modus / Engagement-Modus".
2. Engagement-Modus überschreibt:
     - selectNews: kein capPerTopic, kein Serendipity, keine Daypart-
       Limits. Stattdessen: ranke Artikel nach Wortzahl der Schlagzeile
       (Pseudo-Engagement).
     - AudioPlayer: setzt nach Outro autoplay=true und startet erneut
       eine Sendung mit zufällig variierten Topics ("variable Belohnung").
     - EndOfShowCard wird durch eine "Empfehlung folgt in 3 …" -Karte
       ersetzt (Cliffhanger-Karikatur).
     - PipelineTrace, RationaleCard, SourceLink werden ausgeblendet.
3. Beide Modi schreiben in mood.json mit Marker `mode: 'wellbeing' | 'engagement'`,
   damit das Tagebuch beide unterscheidet.

KEIN Default-Aktivieren. Im Footer klare Beschriftung "Demo / Forschung —
nicht produktiv".

Verifiziere: Schalter funktioniert ohne Reload-Pflicht, kein State-Leak
zwischen Modi.
```

## K2 — Live-Transkript / Read-Along

```
Ergänze AudioPlayer.tsx um ein optionales Live-Transkript.

1. ShowResult speichert pro Segment den Text bereits (siehe types.ts).
   Zeige unter dem Player eine schmale Spalte mit dem Text des aktuell
   spielenden Segments, plus ±1 Segment-Vorschau verblasst.
2. Toggle "Transkript anzeigen" als ghost-button (anti-engagement,
   default aus, persistent in localStorage).
3. Bei News-Segmenten: Quelle wird unter dem Transkript noch einmal
   verlinkt (zusätzlich zur SourceLink-Komponente).

Verifiziere: kein Layout-Shift beim Wechsel zwischen Segmenten,
Transkript bleibt mit currentTime synchron.
```

## K3 — Onboarding-Tour

```
Drei-Slide-Onboarding für Erstbesucher.

1. Beim ersten Aufruf (kein userId in localStorage) zeige eine modale
   3-Slide-Tour:
     Slide 1: "Du gibst Präferenzen explizit an — kein implizites Lernen
              aus deinem Verhalten." (verweist auf BB1)
     Slide 2: "Jede Sendung hat eine feste Länge und ein hörbares Ende.
              Kein Autoplay." (BB4)
     Slide 3: "Du siehst, woher die Inhalte kommen und welche Präferenz
              welchen Effekt hatte." (BB5)
2. Jeder Slide max 2 Sätze, ein zentrales Icon, "Weiter"-Button.
3. "Tour überspringen" gleichgewichtig sichtbar.
4. Niemals erzwingbar — "x" oben rechts immer sichtbar.

Verifiziere: bei zweitem Reload erscheint die Tour nicht wieder.
```

---

# Hinweis zu allen Prompts

- Vor dem Start: aktuelle `Implementation_Checklist.md` und `Hauptdokument_Gliederung.md` lesen, sie sind die Single Source of Truth für die thesenbezogenen Kapitel-Nummern.
- Schweizer Hochdeutsch durchgehend (Massstab, Strasse, kein „ß").
- Anti-Engagement-Constraints aus dem Designsystem respektieren: keine Pill-Buttons, keine Glassmorphism, keine Streaks, keine Like-Buttons, kein Pseudo-Reward.
- Bei jedem Prompt am Ende: `npm run lint` + `npm run build` grün, Tests grün, kurzer Probelauf.
