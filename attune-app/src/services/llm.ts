import type { NewsArticle, SegmentType, ShowConfig, WeatherData } from '@/lib/types';
import { RADIO_SYSTEM_PROMPT, buildSegmentPrompt } from '@/lib/prompts';

export const LLM_MODEL = 'claude-sonnet-4-20250514';

const MOCK_TEXTS: Record<string, string> = {
  greeting:
    'Guten Tag und herzlich willkommen bei Attune! Schön, dass Sie eingeschaltet haben. Wir haben heute wieder ein tolles Programm für Sie vorbereitet — aktuelle Nachrichten, das Wetter und natürlich gute Musik. Bleiben Sie dran!',
  news: 'Und nun zu den Nachrichten. In Bern hat der Nationalrat heute eine wichtige Debatte zur Energiepolitik geführt. Es ging vor allem um den Ausbau erneuerbarer Energien. Derweil sorgt eine neue Entwicklung aus der ETH Zürich für Aufsehen — Forschende haben einen neuartigen KI-Chip vorgestellt, der direkt auf Smartphones arbeiten kann. Und im Sport: Der FC Zürich hat gestern Abend ein spannendes Spiel gegen Basel gewonnen. Das entscheidende Tor fiel erst kurz vor Schluss. Das waren die wichtigsten Meldungen.',
  weather:
    'Und nun zum Wetter. Heute Nachmittag erwartet uns in Zürich leicht bewölktes Wetter bei angenehmen achtzehn Grad. Der Wind weht schwach aus Westen. Am Abend klart es auf, die Temperaturen gehen auf etwa zwölf Grad zurück.',
  farewell:
    'Das war es von Attune für heute. Vielen Dank fürs Zuhören! Wir wünschen Ihnen noch einen wunderbaren Tag. Bis zum nächsten Mal!',
};

export async function generateRadioText(
  segmentType: SegmentType,
  data: NewsArticle[] | WeatherData | undefined,
  config: ShowConfig,
  maxTokens: number = 500,
): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey || apiKey === 'your-anthropic-api-key-here') {
    console.log(`[llm] Using mock text for segment: ${segmentType}`);
    return MOCK_TEXTS[segmentType] || MOCK_TEXTS.greeting;
  }

  try {
    const { generateText } = await import('ai');
    const { anthropic } = await import('@ai-sdk/anthropic');

    const { text } = await generateText({
      model: anthropic(LLM_MODEL),
      system: RADIO_SYSTEM_PROMPT,
      prompt: buildSegmentPrompt(segmentType, data, config),
      maxTokens,
      temperature: 0.7,
    });

    return text;
  } catch (error) {
    console.warn(`[llm] Generation failed for ${segmentType}, using mock:`, error);
    return MOCK_TEXTS[segmentType] || MOCK_TEXTS.greeting;
  }
}
