import type { NewsArticle, SegmentType, ShowConfig, WeatherData } from './types';

export const RADIO_SYSTEM_PROMPT = `Du bist ein professioneller Radiomoderator für "Radio 25", einen modernen Schweizer Radiosender.

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
- Zahlen als Worte schreiben wenn unter zwanzig, sonst als Ziffern`;

export function buildSegmentPrompt(
  type: SegmentType,
  data: NewsArticle[] | WeatherData | undefined,
  config: ShowConfig,
): string {
  const now = new Date();
  const timeStr = now.toLocaleTimeString('de-CH', { hour: '2-digit', minute: '2-digit' });
  const dayStr = now.toLocaleDateString('de-CH', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  const styleMap = {
    formal: 'Professionell und seriös, wie bei SRF.',
    casual: 'Locker und nahbar, wie bei einem jungen Privatsender.',
    energetic: 'Energiegeladen und mitreissend, mit viel Begeisterung.',
  };
  const styleHint = styleMap[config.voiceStyle];

  switch (type) {
    case 'greeting':
      return `Schreibe eine kurze Begrüssung für Radio 25 (etwa 2-3 Sätze).
Es ist ${timeStr} Uhr am ${dayStr}. Standort der Hörer: ${config.location}.
Stil: ${styleHint}
Begrüsse die Hörer und gib einen kurzen Ausblick, was in der Sendung kommt (Nachrichten, Wetter, Musik).`;

    case 'news': {
      const articles = data as NewsArticle[];
      const articleTexts = articles
        .map((a, i) => `Artikel ${i + 1}: "${a.title}" — ${a.summary} (Quelle: ${a.source})`)
        .join('\n');
      return `Fasse die folgenden Nachrichten als Radiobeitrag zusammen (etwa 150-200 Wörter).
Mache daraus einen fliessenden, gesprochenen Text — keine Aufzählung. Verbinde die Nachrichten mit natürlichen Übergängen.
Stil: ${styleHint}

${articleTexts}`;
    }

    case 'weather': {
      const weather = data as WeatherData;
      return `Erstelle einen kurzen Wetterbericht für Radio 25 (etwa 3-4 Sätze).
Ort: ${weather.location}
Temperatur: ${weather.temperature} Grad
Beschreibung: ${weather.description}
Luftfeuchtigkeit: ${weather.humidity} Prozent
Wind: ${weather.windSpeed} Kilometer pro Stunde
Stil: ${styleHint}`;
    }

    case 'farewell':
      return `Schreibe eine kurze Verabschiedung für Radio 25 (etwa 2 Sätze).
Es ist ${timeStr} Uhr. Bedanke dich bei den Hörern und wünsche ihnen etwas Passendes für die Tageszeit.
Stil: ${styleHint}`;

    default:
      return `Schreibe einen kurzen Radiobeitrag für den Segmenttyp "${type}".`;
  }
}
