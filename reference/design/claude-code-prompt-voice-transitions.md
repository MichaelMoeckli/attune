# Aufgabe: Sprachqualität und Themen-Übergänge verbessern

Im Attune-Prototyp (`attune-app/`) klingt die ElevenLabs-Stimme aktuell etwas roboterhaft, und die Übergänge zwischen Nachrichten-Meldungen wirken floskelhaft. Beide Probleme sollen behoben werden, ohne die Pipeline-Architektur zu verändern.

## Kontext

- Prototyp ist ein Next.js-15-App im Verzeichnis `attune-app/`.
- Relevante Dateien: `src/services/tts.ts`, `src/lib/prompts.ts`, `src/services/news.ts`, evtl. `src/lib/types.ts`.
- Drei Voice-Styles sind bereits definiert: `formal | casual | energetic` (siehe `VoiceStyle` in `types.ts`).
- Wir wollen keine Migration auf ein neues ElevenLabs-Modell — `eleven_multilingual_v2` bleibt.
- Sprache ist Schweizer Hochdeutsch. Keine Emojis, keine Markdown-Formatierung in TTS-Output.

## Änderung 1 — `voice_settings` an ElevenLabs übergeben

In `src/services/tts.ts` ergänzt der Aufruf `client.textToSpeech.convert(...)` aktuell keine `voice_settings`. Das nutzt die ElevenLabs-Defaults und macht die Stimme flach.

**Tu folgendes:**

1. Definiere eine Map `VOICE_SETTINGS_BY_STYLE: Record<VoiceStyle, { stability: number; similarity_boost: number; style: number; use_speaker_boost: boolean }>` mit diesen Werten:
   - `formal`: `{ stability: 0.55, similarity_boost: 0.75, style: 0.20, use_speaker_boost: true }`
   - `casual`: `{ stability: 0.40, similarity_boost: 0.75, style: 0.45, use_speaker_boost: true }`
   - `energetic`: `{ stability: 0.30, similarity_boost: 0.80, style: 0.65, use_speaker_boost: true }`
2. Wenn `voiceStyle` nicht gesetzt ist, nutze den `casual`-Eintrag als Fallback.
3. Übergib diese Settings im `convert`-Call als `voice_settings`-Feld (zusammen mit `text`, `model_id`, `output_format`).
4. Keine weiteren Verhaltensänderungen — Mock-Mode, Daten-URL-Rückgabe, Error-Handling bleiben identisch.

## Änderung 2 — News-Prompt um Übergangs-Typologie erweitern

In `src/lib/prompts.ts`, Funktion `buildSegmentPrompt`, Case `'news'`: das aktuelle Single-Example für Übergänge ist zu vage. Erweitere den News-Prompt so, dass Claude Sonnet bewusst zwischen verschiedenen Übergangstypen wählt.

**Konkret im News-Prompt ergänzen (in Schweizer Hochdeutsch):**

```
Übergänge zwischen Meldungen:
Benutze unterschiedliche Übergangstypen statt immer derselben Floskel.
Wähle pro Übergang einen passenden Typ:

- Thematische Brücke (verwandtes Thema):
  "Bleiben wir kurz beim Thema Energie: ..."
- Geografische Brücke:
  "Während in Bern debattiert wird, sieht es in Genf anders aus: ..."
- Zeitliche Brücke:
  "Noch am Morgen ein anderes Bild: ..."
- Kontrastiver Wechsel (deutlicher Themenwechsel):
  "Ganz anderes Thema: ..."
- Direkter Übergang ohne Brücke (wenn die Meldungen gleichgewichtig nebeneinander stehen):
  Einfach mit einem neuen Satz weiterfahren, ohne Übergangsfloskel.

Vermeide diese ausgelutschten Phrasen:
- "Kommen wir zum nächsten Thema"
- "Und nun zu etwas ganz anderem"
- "In weiteren Nachrichten"

Wenn zwei Meldungen klar zum selben Themenfeld gehören, nutze eine thematische
Brücke. Bei einem echten Themenwechsel ein kontrastiver Übergang. Bei
gleichgewichtigen Einzelmeldungen reicht ein direkter Übergang ohne Floskel.
```

Das bisherige Single-Example („...in der achtundachtzigsten Minute...") kann gelöscht werden — die Typologie ersetzt es.

## Änderung 3 — Topic-Clustering vor dem Prompt

In `src/services/news.ts` werden Artikel aktuell in RSS-Reihenfolge übergeben. Vor der Übergabe an `buildSegmentPrompt` sollen sie nach `topic` gruppiert werden, damit Claude weniger oft zwischen Themen springen muss.

**Tu folgendes:**

1. In der Funktion, die Artikel an `buildSegmentPrompt` übergibt: vor der Übergabe ein stabiles Group-by `topic` durchführen (z. B. mit einer `Map<topic, NewsArticle[]>`, dann Werte hintereinander hängen).
2. Die Reihenfolge der Topic-Gruppen soll der Reihenfolge in `config.topics` folgen (Nutzer-Präferenz). Artikel ohne Topic oder mit `selectionReason === 'serendipity'` kommen ans Ende.
3. Innerhalb einer Topic-Gruppe Reihenfolge unverändert (nach Relevanz/Datum wie bisher).
4. Keine Artikel filtern oder verwerfen — nur umsortieren.

Wenn `selectNews()` oder eine vergleichbare Funktion noch nicht existiert (Building Block 3 ist laut Audit erst zu ~20% umgesetzt), das Clustering inline in der bestehenden Funktion machen — keinen grossen Refactor.

## Akzeptanzkriterien

- `npm run build` läuft fehlerfrei in `attune-app/`.
- Bestehende Tests (falls vorhanden) bleiben grün.
- Mock-Mode (`USE_MOCK_TTS=true`) funktioniert weiterhin ohne ElevenLabs-Key.
- Beim manuellen Generieren einer Show:
  - Die Stimme klingt für `energetic` deutlich lebendiger als für `formal` (hörbarer Unterschied).
  - In den News kommen mindestens zwei verschiedene Übergangstypen vor, nicht nur „Kommen wir zum nächsten Thema".
  - Wenn mehrere Artikel zum selben Topic existieren, stehen sie im generierten Text aufeinanderfolgend.

## Nicht-Ziele

- Keine neue ElevenLabs-Voice-ID setzen (das macht der Nutzer manuell im Dashboard / `.env`).
- Kein Wechsel auf `eleven_v3` oder `eleven_turbo_v2_5`.
- Kein Refactor von `news.ts` über das Clustering hinaus.
- Kein Update der Implementation_Checklist.md — das macht der Nutzer.

Bitte Änderungen committen mit Message: `feat(tts): voice settings per style + transition typology + topic clustering`.
