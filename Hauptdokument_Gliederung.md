# Gliederung BSc-Thesis Radio 25 — Hauptdokument

Stand: 25. April 2026 (überarbeitet nach Empfehlung A + B — Funktionsteilung Kap. 1 / Kap. 2 geschärft, Methodikkapitel separiert)
Status-Legende: ✅ vorhanden · 🟡 teilweise · ⬜ fehlt

> **Hinweis zur Überarbeitung nach Empfehlung A:**
> Kap. 1 ist jetzt eine reine Problemschilderung (Beobachtungen + empirische Belege). Theoretische Vertiefungen wurden konsequent nach Kap. 2 verschoben:
> - Persuasive Technology (Fogg) und Digital Nudging (Weinmann et al.) → 2.2.6 (vormals 2.3.6)
> - Self-Determination Theory (Ryan & Deci) und METUX-Modell (Peters et al.) → 2.3.1 (vormals 2.4.1)
> - Algorithmische Souveränität (Reviglio & Agosti) → 2.3.4 (vormals 2.4.4)
> Kap. 1.3 und 1.6 enthalten nur noch Forward-Verweise auf die jeweilige Vertiefung in Kap. 2, vermeiden aber jede inhaltliche Doppelung. Kap. 2.1.2 wurde gleichzeitig entlastet, indem die SDT-Einführung dort gestrafft und die volle Vertiefung an 2.3.1 delegiert wurde.
>
> **Hinweis zur Überarbeitung nach Empfehlung B:**
> Das «Vorgehen der Literaturrecherche» war zuvor als 2.1 im theoretischen Rahmen verankert und unterbrach den Argumentationsfluss. Es wurde nun in ein neues Kapitel **4 Methodik** verschoben (Abschnitt 4.1). Kap. 2 ist dadurch ein reiner Theorierahmen geworden; die Unterkapitel wurden umnummeriert (alt 2.2 → neu 2.1, alt 2.3 → neu 2.2, alt 2.4 → neu 2.3, alt 2.5 → neu 2.4, alt 2.6 → neu 2.5). Alle internen Querverweise im Dokument wurden entsprechend angepasst.
> Das Kapitel **4 Methodik** ist als wachsender Container gedacht — weitere Methodik-Bausteine (Forschungsdesign nach Hevner/Peffers, Pilottest-Methodik, Auswertungsverfahren) werden im weiteren Verlauf der Arbeit ergänzt. Sobald das geplante Kapitel «Forschungsfrage und Zielsetzung» eingefügt ist, wird das aktuelle Kap. 4 zu Kap. 5.

---

## Front Matter

⬜ **Titelblatt** (offizielle ZHAW-Vorlage: Hochschule, Institut, Studiengang, Thesis-Typ, Titel/Untertitel, Autor, Betreuer, Abgabedatum)
⬜ **Eidesstattliche Erklärung / Selbstständigkeitserklärung** (ZHAW-Vorlage)
⬜ **KI-Nutzungserklärung** (welche Tools wofür eingesetzt: Claude für Recherche/Schreibhilfe, NotebookLM für Strukturierung, Cursor/Copilot für Code etc.)
⬜ **Zusammenfassung / Abstract** (DE, ca. 250–350 Wörter — Problem, Lösung, Methodik, erwartetes Ergebnis; Variante aus Disposition als Basis)
⬜ **Abstract (EN)** — falls vom Studiengang gefordert
⬜ **Inhaltsverzeichnis** (Word-Feld, automatisch)
⬜ **Abbildungsverzeichnis**
⬜ **Tabellenverzeichnis** (du hast schon eine Tabelle in 2.5)
⬜ **Abkürzungsverzeichnis** (SDT, VSD, METUX, LLM, TTS, SUS, RSS, API, MVP, E2E, UI, UX …)

---

## Teil I — Problemraum und Theorie

### ✅ 1 Motivation (überarbeitet nach Empfehlung A — reine Problemschilderung)

Funktion des Kapitels: **Was läuft schief?** (beobachtete Phänomene + empirische Belege, ohne theoretische Modelle einzuführen).

- ✅ 1.1 Das Spannungsfeld zwischen Nutzer und Anbieter — **entlastet**: theoretische Fundierung (UGT, SDT) per Forward-Reference an 2.2.2 delegiert
- ✅ 1.2 Das Geschäftsmodell der Aufmerksamkeitsökonomie — Beobachtung; Begriff der algorithmischen Souveränität per Forward-Reference an 2.4.4 delegiert
- ✅ 1.3 Manipulative Designmuster — **verschlankt**: Liste der Designmuster bleibt als Beobachtung; theoretische Einordnung (Fogg, Weinmann) per Forward-Reference an 2.3.6 delegiert
- ✅ 1.4 Filterblasen, Echokammern und Polarisierung — empirische Belege bleiben (Pariser, Nguyen, Geschke, Sunstein, Vosoughi)
- ✅ 1.5 Psychisches Wohlbefinden und Suchtverhalten — empirische Belege bleiben (Verduyn, Orben, Montag)
- ✅ 1.6 Verlust der Nutzerautonomie — **verschlankt**: Beobachtung bleibt; SDT/METUX-Theorie per Forward-Reference an 2.4.1 delegiert
- ✅ 1.7 Zwischenfazit: Der Kern des Problems

Mögliche Verfeinerungen:
- Eine **Abbildung** zu Beginn (Spannungsfeld Nutzer ↔ Anbieter) würde das Kapitel auflockern

### ✅ 2 Background — Theoretischer Rahmen (überarbeitet nach Empfehlung A + B)

Funktion des Kapitels: **Wie ordnet die Wissenschaft diese Phänomene ein?** (theoretische Modelle, Mechanismen, Beurteilungsgrundlagen). Das frühere 2.1 (Vorgehen der Literaturrecherche) ist nach Empfehlung B nach Kap. 4.1 ausgelagert; alle Unterkapitel wurden entsprechend umnummeriert.

- ✅ 2.1 Bedürfnisse und Motivationen der Akteure *(zuvor 2.2)*
  - 2.1.1 Anbieterseite — drei idealtypische Anbietermodelle
  - 2.1.2 Nutzerseite — **entlastet**: bezieht sich explizit auf 1.1; UGT + SDT theoretisch eingeführt; METUX-Vertiefung an 2.3.1 delegiert
- ✅ 2.2 Mechanismen digitaler Medienangebote *(zuvor 2.3)*
  - 2.2.1 Klassifikation und Ontologien
  - 2.2.2 Suche
  - 2.2.3 Empfehlungssysteme
  - 2.2.4 Personalisierung und Feed-Kuration
  - 2.2.5 Sharing und soziale Mechanismen
  - 2.2.6 Persuasive Design und Nudging — **vertieft**: hier nun die volle theoretische Einordnung von Fogg (2003) und Weinmann et al. (2016), die früher in 1.3 standen
  - 2.2.7 Monetarisierungsmechanismen
- ✅ 2.3 Beurteilungsgrundlagen *(zuvor 2.4)*
  - 2.3.1 Self-Determination Theory (SDT) — **vertieft**: hier nun die volle Darstellung von SDT + METUX-Modell mit den fünf Ebenen, die früher in 1.6 angerissen war
  - 2.3.2 Value-Sensitive Design (VSD)
  - 2.3.3 Digital Wellbeing
  - 2.3.4 Ethik von Empfehlungssystemen und algorithmische Souveränität — **vertieft**: greift den in 1.6 als Beobachtung beschriebenen Souveränitätsverlust theoretisch auf
  - 2.3.5 Gebrauchstauglichkeit und Akzeptanz (SUS)
- ✅ 2.4 Gegenüberstellung der Medienmodelle *(zuvor 2.5)* — Tabelle: redaktionell / engagement / wellbeing
- ✅ 2.5 Forschungslücke *(zuvor 2.6)*

Mögliche Verfeinerungen:
- 2.3 könnte um eine kompakte **Abbildung „Beurteilungsgrundlagen im Überblick"** ergänzt werden

---

## Teil II — Forschungsfrage und Lösungsvorschlag

### 🟡 3 Radio 25 als Forschungsartefakt

Bereits ausgearbeitet (3.1–3.5). Hier nur prüfen:
- 3.5 (Abgrenzung) ist gut — verweist gut auf Ausblick

### ⬜ 4 Forschungsfrage und Zielsetzung

⬜ **4.1 Forschungsfrage** (Hauptfrage explizit aus Disposition Kap. 4 übernehmen)
⬜ **4.2 Teilfragen / Hypothesen** (z. B. zu Autonomieerleben, Transparenz, Sessiongestaltung, SUS-Score)
⬜ **4.3 Goal und Objective** (aus Disposition Kap. 2.3)
⬜ **4.4 Nutzen**
  - 4.4.1 Nutzen für Endnutzende
  - 4.4.2 Nutzen für die Forschung
  - 4.4.3 Gesellschaftlicher Nutzen
⬜ **4.5 Abgrenzung** (was nicht Teil der Arbeit ist — falls nicht schon in 3.5 abgedeckt)

### 🟡 5 Methodik *(aktuell als Kap. 4 im Dokument; wird zu Kap. 5, sobald Forschungsfrage-Kapitel davor eingefügt ist)*

- ✅ **5.1 Vorgehen der Literaturrecherche** *(aktuell 4.1 — nach Empfehlung B aus Kap. 2 hierher verschoben; verweist explizit auf Kap. 2 als Adressaten der Recherche)*
- ⬜ **5.2 Forschungsdesign** (Design-Science-Ansatz nach Hevner et al. 2004 / Peffers et al. 2007 / Hevner 2007 — Three-Cycle-View)
- ⬜ **5.3 Vorgehen im Überblick** (Arbeitspakete-Tabelle aus Disposition Kap. 6.2 übernehmen, ggf. aktualisieren)
- ⬜ **5.4 Methoden der Datenerhebung** (Pilottest-Setup, SUS, Interviews, Logs)
- ⬜ **5.5 Methoden der Auswertung** (qualitative Analyse, deskriptive Statistik)
- ⬜ **5.6 Reflexion zu Ressourcen und Kompetenzen** (Disposition Kap. 6.3)

---

## Teil III — Konzept und Implementation

### ⬜ 6 Konzept und Architektur

⬜ **6.1 Anforderungen** (funktional/nicht-funktional, abgeleitet aus Kap. 2 + 3)
⬜ **6.2 Architekturüberblick** (Komponentendiagramm — Übersicht der Pipeline)
⬜ **6.3 Komponenten im Detail**
  - 6.3.1 Orchestrator (agentische Pipeline)
  - 6.3.2 Personalisierungsmodul (Profil, Präferenzen, Transparenzanzeige)
  - 6.3.3 Nachrichten- und Datenintegration (RSS SRF/NZZ, ggf. NewsAPI, Wetter)
  - 6.3.4 LLM-Textgenerierung (Claude Sonnet via Vercel AI SDK, Prompt-Design)
  - 6.3.5 Sprachsynthese (ElevenLabs, eleven_multilingual_v2)
  - 6.3.6 Musikeinbindung
  - 6.3.7 Webapplikation (Next.js 15, React 19, TypeScript, Tailwind 4)
⬜ **6.4 Wellbeing-Features im Design** (definierte Sendungslänge, Diversifikation, Transparenz-UI, keine Push, kein Autoplay)
⬜ **6.5 Mapping Werte → Designentscheidungen** (Tabelle: VSD-Wert / SDT-Bedürfnis → Mechanismus → konkrete Umsetzung)
⬜ **6.6 Datenschutz und Datenfluss** (welche Daten werden wo verarbeitet, kein Tracking, lokale Speicherung)

### ⬜ 7 Implementation

⬜ **7.1 Vorgehen und Iterationen** (Durchstich → Verfeinerung)
⬜ **7.2 Repository-Struktur und Tech-Stack**
⬜ **7.3 Pipeline-Implementation** (End-to-End-Ablauf einer Sendungserzeugung, ggf. Sequenzdiagramm)
⬜ **7.4 Prompt-Engineering** (System-Prompt, Few-Shot-Beispiele, Tonalität, Schweizer Hochdeutsch)
⬜ **7.5 Personalisierungs-UI** (Screenshots, Bedienlogik, Transparenz-Anzeigen)
⬜ **7.6 Bekannte Limitationen der Umsetzung** (Latenz, Kosten, Stimmenwechsel, Halluzinationen, Lizenzfragen Musik)

---

## Teil IV — Validierung

### ⬜ 8 Evaluation

⬜ **8.1 Evaluationsdesign** (Was wird wie gemessen — Brücke zur Methodik in Kap. 5)
⬜ **8.2 Technische Validierung (Proof of Concept)** (Funktionsfähigkeit, Latenzmessungen, Fehlerraten)
⬜ **8.3 Pilottest mit Nutzenden**
  - 8.3.1 Setup (5 Testpersonen, 1 Woche, Onboarding)
  - 8.3.2 Erhebungsinstrumente (SUS, Wellbeing-Items, Tagebuch, Abschluss-Interview)
  - 8.3.3 Durchführung
⬜ **8.4 Erfolgskriterien** (aus Disposition Kap. 7.3 übernehmen, ggf. operationalisieren)
⬜ **8.5 Ethik und Einwilligung** (Informed Consent, Datennutzung, Anonymisierung)

### ⬜ 9 Ergebnisse

⬜ **9.1 Quantitative Ergebnisse** (SUS-Score, Nutzungsdauer, Häufigkeit)
⬜ **9.2 Qualitative Ergebnisse** (Themen aus den Interviews, Zitate)
⬜ **9.3 Beobachtungen aus den Logdaten**
⬜ **9.4 Vergleich mit den Erfolgskriterien**

---

## Teil V — Diskussion und Abschluss

### ⬜ 10 Diskussion

⬜ **10.1 Beantwortung der Forschungsfrage**
⬜ **10.2 Einordnung in den theoretischen Rahmen** (SDT, VSD, Digital Wellbeing, algorithmische Souveränität)
⬜ **10.3 Implikationen für Design und Praxis**
⬜ **10.4 Limitationen** (kleine Stichprobe, kurzer Zeitraum, Selbstauswahl, technische Restriktionen)
⬜ **10.5 Übertragbarkeit auf andere Medienkontexte**

### ⬜ 11 Fazit und Ausblick

⬜ **11.1 Zusammenfassung der Erkenntnisse**
⬜ **11.2 Beitrag der Arbeit** (Artefakt + theoretischer Rahmen + empirische Daten)
⬜ **11.3 Ausblick und weiterführende Forschung** (Skalierung, Langzeitstudie, Vergleichstest gegen kommerzielle Plattform, weitere Medienformate)

---

## Back Matter

### 🟡 Literaturverzeichnis

Vorläufige Liste vorhanden. Vor Abgabe prüfen, dass alle im Text zitierten Quellen enthalten sind, insbesondere:
- Hevner et al. (2004), Hevner (2007), Peffers et al. (2007) — werden für Methodik gebraucht
- Calvo & Peters (2014) — bereits drin
- Vosoughi, Roy & Aral (2018) — bereits drin
- Pariser (2011) — bereits drin
- Ricci, Rokach & Shapira (2015) — bereits drin
- Katz, Blumler & Gurevitch (1973) — bereits drin
- Friedman et al. (2021) vs. Hendry, Friedman & Ballard (2021) — Inkonsistenz mit Disposition glätten

### ⬜ Anhang

⬜ **A** Interview-Leitfaden Pilottest
⬜ **B** SUS-Fragebogen (deutsche Version)
⬜ **C** Wellbeing-Items / Tagebuch-Vorlage
⬜ **D** System-Prompt(s) für Sendungsgenerierung
⬜ **E** Beispiel-Sendung (Transkript einer generierten Sendung)
⬜ **F** Screenshots der Webapplikation
⬜ **G** Architektur- und Sequenzdiagramme (falls nicht im Hauptteil)
⬜ **H** Tabelle Arbeitspakete vs. Ist-Zustand (optional, für Reflexion)

---

## Reihenfolge der nächsten Schritte (Empfehlung)

1. **Kap. 4 Forschungsfrage** schreiben — kürzestes Kapitel, klärt aber alles Folgende
2. **Kap. 5 Methodik** ergänzen — Design-Science-Rahmen explizit machen
3. **Kap. 6 Konzept und Architektur** — Brücke vom Was (Kap. 3) zum Wie
4. **Kap. 7 Implementation** parallel zur Code-Entwicklung
5. **Kap. 8 Evaluation** vor dem Pilottest fertig haben (Instrumente, Consent)
6. **Kap. 9–11** nach dem Pilottest
7. **Front- und Back-Matter** zum Schluss

---

## Hinweise zur Wortzahl

ZHAW-BSc-Thesen bewegen sich typischerweise im Bereich 30–60 Seiten Hauptteil. Aktuell hast du in Kap. 1–3 bereits ca. 18–22 Seiten Inhalt (geschätzt nach Wortzahl). Mit den fehlenden Kapiteln solltest du komfortabel im Zielbereich landen, ohne aufblähen zu müssen.
