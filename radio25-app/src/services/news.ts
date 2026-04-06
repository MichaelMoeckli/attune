import type { NewsArticle } from '@/lib/types';

const MOCK_ARTICLES: NewsArticle[] = [
  {
    title: 'Schweizer Nationalrat debattiert über neue Energiepolitik',
    summary:
      'Der Nationalrat hat heute eine mehrstündige Debatte über die Zukunft der Schweizer Energieversorgung geführt. Im Zentrum stand die Frage, wie der Ausbau erneuerbarer Energien beschleunigt werden kann.',
    source: 'SRF News',
    publishedAt: new Date().toISOString(),
    url: 'https://www.srf.ch/news',
  },
  {
    title: 'ETH Zürich entwickelt neuen KI-Chip für mobile Geräte',
    summary:
      'Forschende der ETH Zürich haben einen energieeffizienten Chip vorgestellt, der KI-Berechnungen direkt auf Smartphones ermöglicht, ohne Daten in die Cloud senden zu müssen.',
    source: 'NZZ',
    publishedAt: new Date().toISOString(),
    url: 'https://www.nzz.ch',
  },
  {
    title: 'FC Zürich gewinnt Spitzenspiel gegen Basel',
    summary:
      'In einem spannenden Super-League-Spiel hat der FC Zürich den FC Basel mit 2:1 besiegt. Das entscheidende Tor fiel in der 87. Minute.',
    source: 'SRF Sport',
    publishedAt: new Date().toISOString(),
    url: 'https://www.srf.ch/sport',
  },
];

const RSS_FEEDS = [
  'https://www.srf.ch/news.rss',
  'https://www.nzz.ch/recent.rss',
];

async function fetchFromRSS(topics: string[]): Promise<NewsArticle[]> {
  // Dynamic import to avoid issues with rss-parser in client bundles
  const Parser = (await import('rss-parser')).default;
  const parser = new Parser();
  const articles: NewsArticle[] = [];

  for (const feedUrl of RSS_FEEDS) {
    try {
      const feed = await parser.parseURL(feedUrl);
      for (const item of feed.items.slice(0, 5)) {
        articles.push({
          title: item.title || 'Ohne Titel',
          summary: item.contentSnippet || item.content || '',
          source: feed.title || feedUrl,
          publishedAt: item.isoDate || new Date().toISOString(),
          url: item.link || feedUrl,
        });
      }
    } catch (error) {
      console.warn(`Failed to fetch RSS feed ${feedUrl}:`, error);
    }
  }

  // Filter by topics if provided
  if (topics.length > 0) {
    const topicLower = topics.map((t) => t.toLowerCase());
    const filtered = articles.filter((a) => {
      const text = `${a.title} ${a.summary}`.toLowerCase();
      return topicLower.some((topic) => text.includes(topic));
    });
    if (filtered.length > 0) return filtered.slice(0, 5);
  }

  return articles.slice(0, 5);
}

export async function fetchNews(topics: string[]): Promise<NewsArticle[]> {
  try {
    const articles = await fetchFromRSS(topics);
    if (articles.length > 0) return articles;
  } catch (error) {
    console.warn('[news] RSS fetch failed, falling back to mock:', error);
  }

  console.log('[news] Using mock data');
  return MOCK_ARTICLES;
}
