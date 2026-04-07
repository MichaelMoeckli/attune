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

const RSS_FEEDS: Record<string, string[]> = {
  default: [
    'https://www.srf.ch/news/bnf/rss/1890',
    'https://www.nzz.ch/recent.rss',
  ],
  politik: ['https://www.nzz.ch/schweiz.rss', 'https://www.nzz.ch/international.rss'],
  international: ['https://www.nzz.ch/international.rss'],
  sport: ['https://www.nzz.ch/sport.rss'],
  wirtschaft: ['https://www.nzz.ch/wirtschaft.rss'],
  finanzen: ['https://www.nzz.ch/finanzen.rss'],
  kultur: ['https://www.nzz.ch/kultur.rss'],
  wissenschaft: ['https://www.nzz.ch/wissenschaft.rss'],
  technologie: ['https://www.nzz.ch/technologie.rss'],
  panorama: ['https://www.nzz.ch/panorama.rss'],
  zuerich: ['https://www.nzz.ch/zuerich.rss'],
  schweiz: ['https://www.nzz.ch/schweiz.rss'],
};

async function fetchFromRSS(topics: string[]): Promise<NewsArticle[]> {
  const Parser = (await import('rss-parser')).default;
  const parser = new Parser();
  const articles: NewsArticle[] = [];

  // Pick feeds: use category-specific feeds for matching topics, fall back to default
  const feedUrls = new Set<string>();
  for (const topic of topics) {
    const key = topic.toLowerCase();
    if (RSS_FEEDS[key]) {
      RSS_FEEDS[key].forEach((url) => feedUrls.add(url));
    }
  }
  // Fall back to default feeds if no category-specific feeds matched
  if (feedUrls.size === 0) {
    RSS_FEEDS.default.forEach((url) => feedUrls.add(url));
  }

  for (const feedUrl of feedUrls) {
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
      console.warn(`[news] Failed to fetch RSS feed ${feedUrl}:`, error);
    }
  }

  return articles.slice(0, 10);
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
