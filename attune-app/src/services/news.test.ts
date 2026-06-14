import { describe, it, expect } from 'vitest';
import type { NewsArticle } from '@/lib/types';
import { selectNews, capPerTopic, pickSerendipity, applyDaypart } from '@/services/news';

// Unit-Tests fuer die Kuratierungslogik (Hauptdokument Kap. 3.3.3 / 6.4).
// Sie schreiben das TATSAECHLICHE Verhalten des im Pilot eingesetzten Artefakts fest
// (Regressionssicherung) und veraendern die Applikation nicht.

let urlSeq = 0;
function art(topic: string | undefined, title = `t${urlSeq}`): NewsArticle {
  urlSeq += 1;
  return {
    title,
    summary: 's',
    source: 'SRF',
    publishedAt: new Date().toISOString(),
    url: `https://example.test/${urlSeq}`, // Dedup-Schluessel, muss eindeutig sein
    topic,
  };
}
const many = (topic: string, n: number) => Array.from({ length: n }, () => art(topic));

// Feste Zuerich-Zeitpunkte (Sommer = UTC+2):
//   14:00 Europe/Zurich -> Mittag, Daypart-Obergrenze 10
//   00:00 Europe/Zurich -> Nacht,  Daypart-Obergrenze 4
const MIDDAY = new Date('2026-06-15T12:00:00Z');
const NIGHT = new Date('2026-06-15T22:00:00Z');

describe('capPerTopic', () => {
  it('deckelt jedes Thema auf max und reicht untagged unveraendert durch', () => {
    const out = capPerTopic([...many('politik', 3), ...many('sport', 1), art(undefined)], 2);
    expect(out.filter(a => a.topic === 'politik')).toHaveLength(2);
    expect(out.filter(a => a.topic === 'sport')).toHaveLength(1);
    expect(out.filter(a => a.topic === undefined)).toHaveLength(1);
  });
});

describe('pickSerendipity', () => {
  it('waehlt nur profilfremde Themen und markiert sie als serendipity', () => {
    const out = pickSerendipity([...many('politik', 2), art('wirtschaft')], ['politik'], 1);
    expect(out).toHaveLength(1);
    expect(out[0].topic).toBe('wirtschaft');
    expect(out[0].selectionReason).toBe('serendipity');
  });
  it('liefert ein leeres Array, wenn alle Artikel im Profil liegen', () => {
    expect(pickSerendipity(many('politik', 3), ['politik'], 1)).toEqual([]);
  });
});

describe('applyDaypart (Ist-Verhalten der Tageszeit-Obergrenze)', () => {
  it('Mittag: Obergrenze 10', () => {
    expect(applyDaypart(many('politik', 20), MIDDAY)).toHaveLength(10);
  });
  it('Nacht: Obergrenze 4', () => {
    expect(applyDaypart(many('politik', 20), NIGHT)).toHaveLength(4);
  });
});

describe('selectNews', () => {
  it('Coverage: jedes Profilthema erhaelt bei knappem Budget mindestens einen Artikel', () => {
    const articles = [...many('politik', 2), ...many('sport', 2), ...many('kultur', 2)];
    const out = selectNews({ articles, topics: ['politik', 'sport', 'kultur'], now: MIDDAY, maxArticles: 3 });
    expect(out).toHaveLength(3);
    expect(new Set(out.map(a => a.topic))).toEqual(new Set(['politik', 'sport', 'kultur']));
  });

  it('Serendipity: ein profilfremder Artikel wird aufgenommen und markiert', () => {
    const articles = [...many('politik', 2), ...many('sport', 2), art('wirtschaft')];
    const out = selectNews({ articles, topics: ['politik', 'sport'], now: MIDDAY, maxArticles: 5 });
    const serendipity = out.filter(a => a.selectionReason === 'serendipity');
    expect(serendipity).toHaveLength(1);
    expect(serendipity[0].topic).toBe('wirtschaft');
  });

  it('Per-Topic-Cap: kein Thema ueberschreitet maxPerTopic, auch bei grossem Budget', () => {
    const articles = [...many('politik', 5), ...many('sport', 5)];
    const out = selectNews({ articles, topics: ['politik', 'sport'], now: MIDDAY, maxArticles: 10, maxPerTopic: 2, serendipityCount: 0 });
    expect(out.filter(a => a.topic === 'politik')).toHaveLength(2);
    expect(out.filter(a => a.topic === 'sport')).toHaveLength(2);
    expect(out).toHaveLength(4);
  });

  it('Depth: nach Coverage werden zweite Artikel je Thema ergaenzt', () => {
    const articles = [...many('politik', 2), ...many('sport', 2)];
    const out = selectNews({ articles, topics: ['politik', 'sport'], now: MIDDAY, maxArticles: 4, serendipityCount: 0 });
    expect(out.filter(a => a.topic === 'politik')).toHaveLength(2);
    expect(out.filter(a => a.topic === 'sport')).toHaveLength(2);
  });

  it('Ausgabe nach config.topics-Reihenfolge gruppiert, Serendipity ans Ende', () => {
    const articles = [...many('politik', 2), ...many('sport', 2), art('wirtschaft')];
    const out = selectNews({ articles, topics: ['politik', 'sport'], now: MIDDAY, maxArticles: 5 });
    const order = out.map(a => a.topic);
    const lastProfile = Math.max(order.lastIndexOf('politik'), order.lastIndexOf('sport'));
    expect(order.indexOf('wirtschaft')).toBeGreaterThan(lastProfile);
    expect(order.indexOf('politik')).toBeLessThan(order.indexOf('sport'));
  });

  it('Daypart-Charakteristik: nachts (Cap 4) bindet die Obergrenze, mittags (Cap 10) nicht', () => {
    const make = () => [...many('politik', 2), ...many('sport', 2), ...many('kultur', 2), art('wirtschaft')];
    const day = selectNews({ articles: make(), topics: ['politik', 'sport', 'kultur'], now: MIDDAY, maxArticles: 6 });
    const night = selectNews({ articles: make(), topics: ['politik', 'sport', 'kultur'], now: NIGHT, maxArticles: 6 });
    expect(day).toHaveLength(6);   // Mittags-Cap (10) > Budget (6) -> nicht bindend
    expect(night).toHaveLength(4); // Nacht-Cap (4) < Budget (6) -> bindend
  });
});
