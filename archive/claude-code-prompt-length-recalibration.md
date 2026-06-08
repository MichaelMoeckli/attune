# Aufgabe: Sendungslängen-Stufen neu kalibrieren (Tiefe statt nur Breite)

Im Attune-Prototyp (`attune-app/`) skalieren die drei Längen-Stufen (5 / 10 / 15 Min) aktuell fast nur die Anzahl der News-Artikel, nicht aber die Tiefe pro Artikel — jede Meldung bekommt unabhängig von der Stufe etwa 40 Wörter (also einen Satz). Gleichzeitig versprechen UI-Konstanten mehr Sprechzeit, als die Prompt-Wortbudgets hergeben. Beides soll konsistent korrigiert werden.

## Neue Zielwerte (verbindlich)

| Stufe | Artikel | Wörter News (Prompt) | Worte/Artikel | max_tokens LLM | gesprochen UI |
|-------|---------|----------------------|---------------|----------------|---------------|
| 5 Min | 2       | 160–200              | ~90           | 350            | 2 Min         |
| 10 Min| 4       | 320–400              | ~90           | 700            | 3 Min         |
| 15 Min| 6       | 660–780              | ~120          | 1100           | 6 Min         |

Die Anzahl Artikel sinkt, die Tiefe pro Artikel steigt. Das passt zur methodischen Aussage des Hauptdokuments (Kap. 3.3.3 — Vielfalt statt Verweildauer, Vanden Abeele 2021): die 15-Min-Stufe soll *Reflexion* ermöglichen, nicht eine Schlagzeilen-Lawine sein.

## Änderungen

### 1) `src/lib/orchestrator.ts`

Konstanten oben in der Datei ersetzen:

```ts
const NEWS_ARTICLE_COUNT: Record<number, number> = { 5: 2, 10: 4, 15: 6 };
const MAX_TOKENS_BY_LENGTH: Record<number, number> = { 5: 350, 10: 700, 15: 1100 };
// MUSIC_TRACK_COUNT bleibt unverändert: { 5: 1, 10: 2, 15: 3 }
```

### 2) `src/lib/prompts.ts`

`NEWS_LEN` und `NEWS_DEPTH` ersetzen:

```ts
const NEWS_LEN: Record<number, string> = {
  5:  'etwa 160 bis 200 Wörter',
  10: 'etwa 320 bis 400 Wörter',
  15: 'etwa 660 bis 780 Wörter',
};
const NEWS_DEPTH: Record<number, string> = {
  5:  'Gib zu jeder Meldung den Kern und einen Satz Kontext — knapp, aber nicht nur eine Schlagzeile.',
  10: 'Gib zu jeder Meldung den Kern und ein bis zwei Sätze Kontext.',
  15: 'Geh in die Tiefe: zu jeder Meldung Kern, mehrere Sätze Hintergrund und eine Einordnung. Keine zusätzlichen Meldungen erfinden — lieber die vorhandenen ausführlich.',
};
```

`GREETING_LEN`, `WEATHER_LEN`, `FAREWELL_LEN` bleiben unverändert.

### 3) `src/components/PreferenceForm.tsx`

`SPOKEN_MIN_BY_LENGTH` und `TOPIC_GUIDANCE` ersetzen:

```ts
const SPOKEN_MIN_BY_LENGTH: Record<number, number> = { 5: 2, 10: 3, 15: 6 };
// MUSIC_TRACKS_BY_LENGTH und MUSIC_MIN_PER_TRACK bleiben unverändert.

const TOPIC_GUIDANCE: Record<number, { slots: number; ideal: [number, number]; ok: [number, number] }> = {
  5:  { slots: 2, ideal: [1, 1], ok: [1, 2] },
  10: { slots: 4, ideal: [2, 3], ok: [1, 4] },
  15: { slots: 6, ideal: [3, 5], ok: [1, 6] },
};
```

### 4) `src/components/ShowPreviewCard.tsx`

Die spiegelbildlichen Konstanten (am Datei-Anfang) gleich setzen:

```ts
const SPOKEN_MIN_BY_LENGTH: Record<number, number> = { 5: 2, 10: 3, 15: 6 };
// MUSIC_TRACKS_BY_LENGTH und MUSIC_MIN_PER_TRACK bleiben unverändert.
```

## Wichtiger Designhinweis zum 5-Min-Tier

Mit nur 2 Artikel-Slots und der bisherigen `selectNews`-Logik (1 Artikel pro Profil-Thema in Pass 1, dann Serendipity in Pass 2) bekommt der Hörer bei zwei gewählten Themen *keine* Überraschungsmeldung mehr — beide Slots sind durch Profil-Themen belegt. Das ist beabsichtigt (Tiefe schlägt Breite bei kurzer Hörzeit) und wird durch `TOPIC_GUIDANCE[5].ideal = [1, 1]` auch UI-seitig kommuniziert.

**Keine Änderung an `selectNews` in `news.ts` nötig.** Die Funktion respektiert `maxArticles` schon korrekt, und die methodische Hierarchie „Profilthema vor Serendipity vor Tiefe" bleibt sinnvoll.

## Akzeptanzkriterien

- `npm run build` in `attune-app/` läuft fehlerfrei.
- Beim manuellen Test mit der 15-Min-Stufe enthält der News-Text spürbar längere Meldungen (mehrere Sätze pro Meldung, nicht nur Schlagzeilen).
- Beim manuellen Test mit der 5-Min-Stufe und 1 gewählten Thema erscheint weiterhin 1 Serendipity-Artikel.
- Die Sendungslänge-Anzeige im PreferenceForm und der ShowPreviewCard ist konsistent (beide nutzen die gleichen Konstanten und stimmen mit den im Prompt angefragten Wortzahlen näherungsweise überein).
- `TOPIC_GUIDANCE` warnt bei 3 Themen für die 5-Min-Stufe weiterhin korrekt („zu viele").

## Nicht-Ziele

- Keine Änderung an `selectNews`, `capPerTopic`, `pickSerendipity`, `applyDaypart` in `news.ts`.
- Keine Änderung an `MUSIC_TRACK_COUNT` oder Musik-Logik.
- Keine Anpassung der `RADIO_SYSTEM_PROMPT`-Quelltreue-Regeln.
- Keine Aktualisierung von `Implementation_Checklist.md` — das macht der Nutzer selbst, weil die Stufenkalibrierung dort vermutlich noch nicht erwähnt war.

Bitte mit Commit-Message: `refactor(length): recalibrate 5/10/15 tiers — depth over breadth, UI ↔ prompt alignment`.
