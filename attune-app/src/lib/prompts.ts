import type { NewsArticle, SegmentType, ShowConfig, WeatherData } from './types';

export const RADIO_SYSTEM_PROMPT = `Du bist ein professioneller Radiomoderator für "Attune", einen modernen Schweizer Radiosender.

Dein Stil:
- Natürlich und gesprächig, wie ein echter Radiomoderator
- Freundlich, kompetent und unterhaltsam
- Schweizer Hochdeutsch (kein Dialekt, aber natürlich und nicht steif)
- Sprich das Publikum direkt an ("Sie" oder "ihr")

Wichtige Regeln:
- Schreibe NUR gesprochenen Text — keine Markdown-Formatierung, keine Aufzählungszeichen, keine URLs
- Keine Emojis oder Sonderzeichen
- Schreibe so, wie man natürlich spricht — kurze Sätze, klare Sprache
- Verwende keine Abkürzungen (schreibe "zum Beispiel" statt "z.B.")
- Zahlen als Worte schreiben wenn unter zwanzig, sonst als Ziffern

Quellen-Treue (verbindlich):
- Du sprichst ausschliesslich über Inhalte, Fakten und Ereignisse, die in den dir übergebenen Artikeln stehen.
- Erfinde keine zusätzlichen Themen, Studien, Zitate oder Personen.
- Nenne keine Medien-Quelle (zum Beispiel NZZ, SRF, Tagesanzeiger), die nicht in den übergebenen Artikeln als "Quelle" angegeben ist.
- Wenn ein Thema in den Artikeln nicht behandelt wird, lass es weg — kein Hintergrundwissen, keine Spekulation.
- Du darfst Artikel zusammenfassen, paraphrasieren und mit Übergängen verbinden, aber keine Information hinzudichten.

Beispiele zur Quellen-Treue:

SCHLECHT (erfindet eine Studie, die nicht im Artikel steht):
"Eine neue Studie der ETH zeigt, dass 80 Prozent der Schweizer Smartphones nutzen, um KI-Anwendungen lokal auszuführen."

GUT (paraphrasiert nur, was im Artikel steht):
"Forschende der ETH Zürich haben einen energieeffizienten KI-Chip vorgestellt, mit dem KI-Berechnungen direkt auf dem Smartphone laufen, ohne dass Daten in die Cloud geschickt werden."

SCHLECHT (nennt eine Quelle, die nicht in den Artikeln angegeben ist):
"Wie der Tagesanzeiger berichtet, hat der Nationalrat heute über Energiepolitik debattiert."

GUT (nennt nur Quellen, die tatsächlich in den Artikeln als Quelle stehen):
"Wie SRF News berichtet, hat der Nationalrat heute eine mehrstündige Debatte zur Energiepolitik geführt."`;

// --- Time-of-day mood (Kap. 3.3.3 / Vanden Abeele 2021) ---
// Programmatic tonality nudge derived from the hour, used in greeting/farewell prompts.

// Hour in Europe/Zurich, regardless of the server's own timezone (Vercel runs in UTC).
export function getZurichHour(date: Date): number {
  return Number(
    new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Zurich',
      hour: '2-digit',
      hour12: false,
    }).format(date),
  );
}

export type TimeOfDay = 'morning' | 'midday' | 'afternoon' | 'evening' | 'night';

export function getTimeOfDay(hour: number): TimeOfDay {
  if (hour >= 5 && hour < 11) return 'morning';
  if (hour >= 11 && hour < 14) return 'midday';
  if (hour >= 14 && hour < 18) return 'afternoon';
  if (hour >= 18 && hour < 22) return 'evening';
  return 'night';
}

interface MoodHint {
  tone: string;
  greeting: string;
  farewell: string;
}

const TIME_OF_DAY_HINTS: Record<TimeOfDay, MoodHint> = {
  morning:   { tone: 'wach, hell, mit Ausblick auf den Tag',                greeting: 'Begrüsse die Hörer in den Morgen und gib einen kurzen Ausblick auf den Tag.', farewell: 'Wünsche einen guten und produktiven Tag.' },
  midday:    { tone: 'sachlich, kompakt, alltagsnah',                      greeting: 'Begrüsse die Hörer zur Mittagszeit. Halte es kompakt — Pausen-Hörer.',          farewell: 'Wünsche einen guten Nachmittag.' },
  afternoon: { tone: 'ruhig, aufmerksam, ohne Hochfahren',                 greeting: 'Begrüsse die Hörer am Nachmittag in einem ruhigen, aufmerksamen Ton.',         farewell: 'Wünsche einen entspannten Abend.' },
  evening:   { tone: 'reflektiert, ruhiger werdend, der Tag klingt aus',   greeting: 'Begrüsse die Hörer am Abend. Kein Hochfahren mehr — der Tag klingt aus.',      farewell: 'Wünsche einen erholsamen Feierabend.' },
  night:     { tone: 'sehr ruhig, intim, gedämpft',                        greeting: 'Begrüsse die Hörer in der Nacht. Sehr ruhig und leise.',                       farewell: 'Wünsche eine gute Nacht.' },
};

export function applyTimeOfDayMood(hour: number): MoodHint {
  return TIME_OF_DAY_HINTS[getTimeOfDay(hour)];
}

// Per-segment length targets keyed by config.targetLengthMin.
const GREETING_LEN: Record<number, string> = {
  5:  '1 bis 2 Sätze',
  10: '2 bis 3 Sätze',
  15: '3 bis 4 Sätze',
};
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
const WEATHER_LEN: Record<number, string> = {
  5:  '2 Sätze',
  10: '3 bis 4 Sätze',
  15: '4 bis 5 Sätze',
};
const FAREWELL_LEN: Record<number, string> = {
  5:  '1 Satz',
  10: '2 Sätze',
  15: '2 bis 3 Sätze',
};

export function buildSegmentPrompt(
  type: SegmentType,
  data: NewsArticle[] | WeatherData | undefined,
  config: ShowConfig,
): string {
  const now = new Date();
  const timeStr = now.toLocaleTimeString('de-CH', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Zurich' });
  const dayStr = now.toLocaleDateString('de-CH', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Zurich' });
  const mood = applyTimeOfDayMood(getZurichHour(now));

  const styleMap = {
    formal: 'Professionell und seriös, wie bei SRF.',
    casual: 'Locker und nahbar, wie bei einem jungen Privatsender.',
    energetic: 'Energiegeladen und mitreissend, mit viel Begeisterung.',
  };
  const styleHint = styleMap[config.voiceStyle];
  const len = config.targetLengthMin;
  const includeMusic = config.includeMusic !== false;
  const programmeHint = includeMusic
    ? 'Nachrichten, Wetter und Musik'
    : 'Nachrichten und Wetter';

  switch (type) {
    case 'greeting':
      return `Schreibe eine Begrüssung für Attune (${GREETING_LEN[len] ?? '2 bis 3 Sätze'}).
Es ist ${timeStr} Uhr am ${dayStr}. Standort der Hörer: ${config.location}.
Tageszeit-Stimmung: ${mood.tone}.
${mood.greeting}
Stil: ${styleHint}
Gib einen kurzen Ausblick, was in der Sendung kommt (${programmeHint}).

Beispiel-Schluss einer Begrüssung: "...heute Morgen mit einer kompakten Sendung — Nachrichten, ein Blick aufs Wetter und etwas Musik."`;

    case 'news': {
      const articles = data as NewsArticle[];
      const articleTexts = articles
        .map((a, i) => `Artikel ${i + 1}: "${a.title}" — ${a.summary} (Quelle: ${a.source})`)
        .join('\n');
      const topicsList = config.topics.length > 0
        ? config.topics.map(t => t.charAt(0).toUpperCase() + t.slice(1)).join(', ')
        : '(keine Auswahl)';
      const serendipity = articles.find(a => a.selectionReason === 'serendipity');
      const serendipityNote = serendipity
        ? `\nHinweis: Eine Meldung (${serendipity.topic ?? 'überraschend'}) liegt bewusst ausserhalb der gewählten Themen — als kurzer Blick über den Tellerrand. Behandle sie wie die anderen Meldungen, ohne extra darauf hinzuweisen.`
        : '';
      return `Kontext: Du bist mitten in einer laufenden Sendung. Die Begrüssung der Hörer ist in einem vorherigen Segment bereits erfolgt. Beginne NICHT mit "Guten Tag", "Willkommen bei Attune", "Hallo" oder einer ähnlichen Anrede. Steige direkt in die Nachrichten ein.

Fasse die folgenden Nachrichten als Radiobeitrag zusammen (${NEWS_LEN[len] ?? 'etwa 200 Wörter'}).
${NEWS_DEPTH[len] ?? ''}
Mache daraus einen fliessenden, gesprochenen Text — keine Aufzählung. Verbinde die Nachrichten mit natürlichen Übergängen.
Vom Hörer gewählte Themen: ${topicsList}.${serendipityNote}
Bleibe inhaltlich auf diesen Themen und auf den unten gelisteten Artikeln. Wenn ein gewähltes Thema in den Artikeln fehlt, lass es einfach weg — erwähne nicht, dass es fehlt, und erfinde auf keinen Fall Inhalte dazu.
Stil: ${styleHint}

Absatzstruktur (wichtig für die Hörbarkeit):
Trenne jede einzelne Meldung durch einen Absatzumbruch (Leerzeile) von der nächsten.
Innerhalb einer Meldung kein Absatzumbruch. Die Leerzeile markiert eine kurze Sprechpause
und gibt dem Hörer Zeit, das Gehörte einzuordnen, bevor das nächste Thema beginnt.

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

${articleTexts}`;
    }

    case 'weather': {
      const weather = data as WeatherData;
      return `Kontext: Du bist mitten in einer laufenden Sendung — direkt nach den Nachrichten. Die Begrüssung der Hörer ist in einem vorherigen Segment bereits erfolgt. Beginne NICHT mit "Guten Tag", "Willkommen bei Attune", "Hallo" oder einer ähnlichen Anrede. Steige direkt in den Wetterbericht ein.

Erstelle einen Wetterbericht für Attune (${WEATHER_LEN[len] ?? '3 bis 4 Sätze'}).
Ort: ${weather.location}
Temperatur: ${weather.temperature} Grad
Beschreibung: ${weather.description}
Luftfeuchtigkeit: ${weather.humidity} Prozent
Wind: ${weather.windSpeed} Kilometer pro Stunde
Stil: ${styleHint}

Beispiel: "In Zürich erwartet uns heute leichter Regen bei zwölf Grad. Der Wind weht aus Westen mit zwanzig Kilometern pro Stunde."`;
    }

    case 'farewell':
      return `Kontext: Die Sendung neigt sich dem Ende zu. Die Hörer wurden zu Beginn der Sendung bereits begrüsst. Beginne NICHT mit "Guten Tag", "Willkommen bei Attune", "Hallo" oder einer ähnlichen Anrede — schreibe nur die Verabschiedung.

Schreibe eine Verabschiedung für Attune (${FAREWELL_LEN[len] ?? '2 Sätze'}).
Es ist ${timeStr} Uhr. Tageszeit-Stimmung: ${mood.tone}.
Bedanke dich kurz bei den Hörern. ${mood.farewell}
Stil: ${styleHint}

Beispiel: "Das war Attune für jetzt. Ich wünsche Ihnen einen guten Start in den Tag."`;

    default:
      return `Schreibe einen kurzen Radiobeitrag für den Segmenttyp "${type}".`;
  }
}
