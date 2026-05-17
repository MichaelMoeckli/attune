import type { NewsArticle } from './types';

const KNOWN_OUTLETS = ['NZZ', 'SRF', 'Tagesanzeiger', 'Tages-Anzeiger', 'Blick', 'Watson', '20 Minuten'];

export interface SourceCheckResult {
  hasUnverifiedMention: boolean;
  unverifiedOutlets: string[];
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function checkSpokenSources(spokenText: string, articles: NewsArticle[]): SourceCheckResult {
  const articleSourcesLc = articles.map(a => a.source.toLowerCase());
  const unverified: string[] = [];

  for (const outlet of KNOWN_OUTLETS) {
    const re = new RegExp(`\\b${escapeRegex(outlet)}\\b`, 'i');
    if (re.test(spokenText)) {
      const outletLc = outlet.toLowerCase();
      const inSources = articleSourcesLc.some(s => s.includes(outletLc));
      if (!inSources) unverified.push(outlet);
    }
  }

  return {
    hasUnverifiedMention: unverified.length > 0,
    unverifiedOutlets: unverified,
  };
}
