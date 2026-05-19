import type { NewsArticle } from '@/lib/types';
import { getZurichHour } from '@/lib/prompts';

const MOCK_ARTICLES: NewsArticle[] = [
  {
    title: 'Schweizer Nationalrat debattiert über neue Energiepolitik',
    summary:
      'Der Nationalrat hat heute eine mehrstündige Debatte über die Zukunft der Schweizer Energieversorgung geführt. Im Zentrum stand die Frage, wie der Ausbau erneuerbarer Energien beschleunigt werden kann.',
    source: 'SRF News',
    publishedAt: new Date().toISOString(),
    url: 'https://www.srf.ch/news',
    topic: 'politik',
  },
  {
    title: 'ETH Zürich entwickelt neuen KI-Chip für mobile Geräte',
    summary:
      'Forschende der ETH Zürich haben einen energieeffizienten Chip vorgestellt, der KI-Berechnungen direkt auf Smartphones ermöglicht, ohne Daten in die Cloud senden zu müssen.',
    source: 'NZZ',
    publishedAt: new Date().toISOString(),
    url: 'https://www.nzz.ch',
    topic: 'technologie',
  },
  {
    title: 'FC Zürich gewinnt Spitzenspiel gegen Basel',
    summary:
      'In einem spannenden Super-League-Spiel hat der FC Zürich den FC Basel mit 2:1 besiegt. Das entscheidende Tor fiel in der 87. Minute.',
    source: 'SRF Sport',
    publishedAt: new Date().toISOString(),
    url: 'https://www.srf.ch/sport',
    topic: 'sport',
  },
];

const RSS_FEEDS: Record<string, string[]> = {
  default:       ['https://www.srf.ch/news/bnf/rss/19032223', 'https://www.nzz.ch/recent.rss',
                  'https://partner-feeds.publishing.tamedia.ch/rss/tagesanzeiger/front'],
  politik:       ['https://www.srf.ch/news/bnf/rss/1890',     'https://www.nzz.ch/schweiz.rss',
                  'https://www.srf.ch/news/bnf/rss/1922',     'https://www.nzz.ch/international.rss',
                  'https://partner-feeds.publishing.tamedia.ch/rss/tagesanzeiger/schweiz',
                  'https://partner-feeds.publishing.tamedia.ch/rss/tagesanzeiger/ausland'],
  schweiz:       ['https://www.srf.ch/news/bnf/rss/1890',     'https://www.nzz.ch/schweiz.rss',
                  'https://partner-feeds.publishing.tamedia.ch/rss/tagesanzeiger/schweiz'],
  international: ['https://www.srf.ch/news/bnf/rss/1922',     'https://www.nzz.ch/international.rss',
                  'https://partner-feeds.publishing.tamedia.ch/rss/tagesanzeiger/ausland'],
  wirtschaft:    ['https://www.srf.ch/news/bnf/rss/1926',     'https://www.nzz.ch/wirtschaft.rss',
                  'https://partner-feeds.publishing.tamedia.ch/rss/tagesanzeiger/wirtschaft'],
  // Tages-Anzeiger hat keinen eigenständigen Finanzen-Feed; Wirtschaft ist die nächstbeste Annäherung.
  finanzen:      ['https://www.srf.ch/news/bnf/rss/1926',     'https://www.nzz.ch/finanzen.rss',
                  'https://partner-feeds.publishing.tamedia.ch/rss/tagesanzeiger/wirtschaft'],
  sport:         ['https://www.srf.ch/sport/bnf/rss/718',     'https://www.nzz.ch/sport.rss',
                  'https://partner-feeds.publishing.tamedia.ch/rss/tagesanzeiger/sport'],
  kultur:        ['https://www.srf.ch/kultur/bnf/rss/454',    'https://www.nzz.ch/kultur.rss',
                  'https://partner-feeds.publishing.tamedia.ch/rss/tagesanzeiger/kultur'],
  wissenschaft:  ['https://www.srf.ch/bnf/rss/630',           'https://www.nzz.ch/wissenschaft.rss',
                  'https://partner-feeds.publishing.tamedia.ch/rss/tagesanzeiger/wissen'],
  technologie:   ['https://www.srf.ch/bnf/rss/19920122',      'https://www.nzz.ch/technologie.rss',
                  'https://partner-feeds.publishing.tamedia.ch/rss/tagesanzeiger/digital'],
  gesellschaft:  ['https://www.srf.ch/bnf/rss/19920107',      'https://www.nzz.ch/panorama.rss',
                  'https://partner-feeds.publishing.tamedia.ch/rss/tagesanzeiger/leben/gesellschaft'],
  // SRF bietet keinen Zürich-spezifischen RSS-Feed; Schweiz-Feed ist die nächstbeste
  // Annäherung. NZZ und Tages-Anzeiger liefern dedizierte Zürich-Feeds.
  zuerich:       ['https://www.srf.ch/news/bnf/rss/1890',     'https://www.nzz.ch/zuerich.rss',
                  'https://partner-feeds.publishing.tamedia.ch/rss/tagesanzeiger/zuerich'],
};

export const TOPIC_UNIVERSE = Object.keys(RSS_FEEDS).filter(t => t !== 'default');

// Fisher-Yates shuffle (non-mutating). Used to randomise feed order per topic so
// no single source (SRF / NZZ / TA) permanently wins the first coverage slot in
// `selectNews`. Round-robin bucket order in fetchFromRSS is driven by feedToTopic
// insertion order, so shuffling here propagates to which source appears first.
function shuffle<T>(arr: readonly T[]): T[] {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

async function fetchFromRSS(topics: string[]): Promise<NewsArticle[]> {
  const Parser = (await import('rss-parser')).default;
  const parser = new Parser();

  // Map each unique feed URL to the first topic that requested it.
  // Multi-topic feeds (e.g. NZZ schweiz.rss) are tagged with whichever topic asked first.
  // Per-topic shuffle randomises which source (SRF/NZZ/TA) gets the first bucket slot.
  const feedToTopic = new Map<string, string>();
  for (const topic of topics) {
    const key = topic.toLowerCase();
    const list = RSS_FEEDS[key];
    if (list) {
      for (const url of shuffle(list)) {
        if (!feedToTopic.has(url)) feedToTopic.set(url, key);
      }
    }
  }
  if (feedToTopic.size === 0) {
    for (const url of shuffle(RSS_FEEDS.default)) feedToTopic.set(url, 'default');
  }

  const feedEntries = Array.from(feedToTopic.entries());
  const buckets: NewsArticle[][] = await Promise.all(
    feedEntries.map(async ([feedUrl, topic]) => {
      try {
        const feed = await parser.parseURL(feedUrl);
        return feed.items.slice(0, 5).map((item) => ({
          title: item.title || 'Ohne Titel',
          summary: item.contentSnippet || item.content || '',
          source: feed.title || feedUrl,
          publishedAt: item.isoDate || new Date().toISOString(),
          url: item.link || feedUrl,
          topic,
        }));
      } catch (error) {
        console.warn(`[news] Failed to fetch RSS feed ${feedUrl}:`, error);
        return [];
      }
    }),
  );

  // Round-robin interleave so no single feed dominates, with URL-level dedup.
  const articles: NewsArticle[] = [];
  const seenUrls = new Set<string>();
  let depth = 0;
  let added = true;
  while (added) {
    added = false;
    for (const bucket of buckets) {
      if (depth >= bucket.length) continue;
      const item = bucket[depth];
      if (seenUrls.has(item.url)) continue;
      seenUrls.add(item.url);
      articles.push(item);
      added = true;
    }
    depth++;
  }

  return articles;
}

/**
 * Pure data fetcher — returns RSS articles tagged with their originating topic.
 * Selection (capping, serendipity, daypart) lives in `selectNews`.
 */
export async function fetchNews(topics: string[]): Promise<NewsArticle[]> {
  // If user has profile topics, also fetch one random non-profile topic to seed serendipity.
  const profileLower = topics.map(t => t.toLowerCase());
  const nonProfile = TOPIC_UNIVERSE.filter(t => !profileLower.includes(t));
  const serendipityTopic = nonProfile.length > 0
    ? nonProfile[Math.floor(Math.random() * nonProfile.length)]
    : null;
  const fetchTopics = serendipityTopic ? [...topics, serendipityTopic] : topics;

  try {
    const articles = await fetchFromRSS(fetchTopics);
    if (articles.length > 0) return articles;
  } catch (error) {
    console.warn('[news] RSS fetch failed, falling back to mock:', error);
  }

  console.log('[news] Using mock data');
  return MOCK_ARTICLES.map(a => ({ ...a }));
}

// --- Named selectors (Hauptdokument Kap. 3.3.3 — alternativer Zielwert: Vielfalt + Tageszeit + Profil) ---

/**
 * Cap each topic at `max` articles. Articles without a topic are passed through untouched.
 * Quote: "Selektion folgt nicht der Verweildauer, sondern Vielfalt." (Hauptdokument Kap. 3.3.3)
 */
export function capPerTopic(articles: NewsArticle[], max = 2): NewsArticle[] {
  const counts: Record<string, number> = {};
  const out: NewsArticle[] = [];
  for (const a of articles) {
    const key = a.topic ?? '__untagged__';
    const n = counts[key] ?? 0;
    if (n >= max) continue;
    counts[key] = n + 1;
    out.push(a);
  }
  return out;
}

/**
 * Pick `count` articles whose topic is NOT in the user's declared profile topics,
 * marking them with `selectionReason='serendipity'`. Empty array if none exist.
 * Quote: "Statt nur das Erwartete zu liefern, wird ein bewusst überraschendes Element eingefügt."
 */
export function pickSerendipity(
  articles: NewsArticle[],
  declaredTopics: string[],
  count = 1,
): NewsArticle[] {
  const declared = new Set(declaredTopics.map(t => t.toLowerCase()));
  const candidates = articles.filter(a => a.topic && !declared.has(a.topic.toLowerCase()));
  return candidates.slice(0, count).map(a => ({ ...a, selectionReason: 'serendipity' as const }));
}

/**
 * Limit the total article count by daypart. Reflects the wellbeing argument that
 * cognitive load should be lower at the edges of the day (Vanden Abeele 2021).
 * Morning 06–10: 6, midday 10–17: 10, evening 17–22: 8, night 22–06: 4.
 */
export function applyDaypart(articles: NewsArticle[], now: Date): NewsArticle[] {
  const hour = getZurichHour(now);
  let cap: number;
  if (hour >= 6 && hour < 10) cap = 6;
  else if (hour >= 10 && hour < 17) cap = 10;
  else if (hour >= 17 && hour < 22) cap = 8;
  else cap = 4;
  return articles.slice(0, cap);
}

interface SelectNewsOptions {
  articles: NewsArticle[];
  topics: string[];
  now: Date;
  maxArticles: number;
  maxPerTopic?: number;
  serendipityCount?: number;
}

/**
 * Compose the three named selectors into the final news selection.
 * Priority is "coverage before depth": every declared profile topic gets 1 article first,
 * then serendipity, then second articles per topic up to maxPerTopic. This way a tight
 * budget (e.g. 5-min show with 3 topics) never silently drops a chosen topic.
 * `slice(0, maxArticles)` lives only here, never inside fetchNews/fetchFromRSS.
 */
export function selectNews(opts: SelectNewsOptions): NewsArticle[] {
  const { articles, topics, now, maxArticles } = opts;
  const maxPerTopic = opts.maxPerTopic ?? 2;
  const serendipityCount = opts.serendipityCount ?? 1;
  const declared = new Set(topics.map(t => t.toLowerCase()));

  const seen = new Set<string>();
  const selected: NewsArticle[] = [];
  const perTopicCount: Record<string, number> = {};

  const tag = (a: NewsArticle, reason: 'profile' | 'serendipity' | 'fallback'): NewsArticle =>
    ({ ...a, selectionReason: reason });

  const tryTake = (pred: (a: NewsArticle) => boolean, reason: 'profile' | 'serendipity' | 'fallback'): boolean => {
    for (const a of articles) {
      if (seen.has(a.url)) continue;
      if (!pred(a)) continue;
      const tKey = a.topic ?? '__untagged__';
      if ((perTopicCount[tKey] ?? 0) >= maxPerTopic) continue;
      seen.add(a.url);
      perTopicCount[tKey] = (perTopicCount[tKey] ?? 0) + 1;
      selected.push(tag(a, reason));
      return true;
    }
    return false;
  };

  // Pass 1 — coverage: 1 article per declared profile topic, in user-specified order.
  for (const topic of topics) {
    if (selected.length >= maxArticles) break;
    const t = topic.toLowerCase();
    tryTake(a => !!a.topic && a.topic.toLowerCase() === t, 'profile');
  }

  // Pass 2 — serendipity: up to serendipityCount articles from non-profile topics.
  for (let i = 0; i < serendipityCount; i++) {
    if (selected.length >= maxArticles) break;
    tryTake(a => !!a.topic && !declared.has(a.topic.toLowerCase()), 'serendipity');
  }

  // Pass 3 — depth: round-robin add second/third articles per profile topic up to cap.
  let added = true;
  while (added && selected.length < maxArticles) {
    added = false;
    for (const topic of topics) {
      if (selected.length >= maxArticles) break;
      const t = topic.toLowerCase();
      if (tryTake(a => !!a.topic && a.topic.toLowerCase() === t, 'profile')) added = true;
    }
  }

  // Pass 4 — fallback fill from anything left (untagged / leftover non-profile).
  if (selected.length < maxArticles) {
    for (const a of articles) {
      if (selected.length >= maxArticles) break;
      if (seen.has(a.url)) continue;
      const tKey = a.topic ?? '__untagged__';
      if ((perTopicCount[tKey] ?? 0) >= maxPerTopic) continue;
      seen.add(a.url);
      perTopicCount[tKey] = (perTopicCount[tKey] ?? 0) + 1;
      selected.push(tag(a, 'fallback'));
    }
  }

  // Daypart total cap, then final maxArticles slice.
  const dayparted = applyDaypart(selected, now);
  const capped = dayparted.slice(0, maxArticles);

  // Stable group-by-topic: respect config.topics order; serendipity / untagged → end.
  // Within each group, keep the original (relevance/date) order from selectNews passes.
  const groups = new Map<string, NewsArticle[]>();
  const tail: NewsArticle[] = [];
  for (const topic of topics) groups.set(topic.toLowerCase(), []);

  for (const a of capped) {
    if (a.selectionReason === 'serendipity' || !a.topic) {
      tail.push(a);
      continue;
    }
    const key = a.topic.toLowerCase();
    const bucket = groups.get(key);
    if (bucket) bucket.push(a);
    else tail.push(a);
  }

  return [...Array.from(groups.values()).flat(), ...tail];
}
