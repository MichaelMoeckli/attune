# Gliederung BSc-Thesis Attune — Hauptdokument

Stand: 5. Mai 2026 (überarbeitet nach Empfehlungen A + B + C — Funktionsteilung Kap. 1 / Kap. 2 geschärft, Methodikkapitel separiert, Validierungskapitel nach Vorgabe des Dozenten neu strukturiert)
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
>
> **Hinweis zur Überarbeitung nach Empfehlung C (Validierungsstruktur vom Dozenten):**
> Auf Empfehlung des Dozenten wurde Kap. 8 «Evaluation» zu Kap. 8 «Validierung» umstrukturiert. Die Gliederung folgt nun einer dreiteiligen Argumentation: (1) Machbarkeitsnachweis (Prototyp + Unit Tests), (2) Usability und Akzeptanz (Instrument angelehnt an SUS / TAM / UTAUT, mit selbst formulierten Items pro Einstellungsmöglichkeit) und (3) Wirkung (Items aus dem Background/Related-Work-Kapitel, ergänzt um Awareness-Items zu Bubble, Bias und Grenzen) — flankiert von einem allgemeinen Fragebogen mit demographischen Daten. Das Studienformat kombiniert eine **1-malige Nutzung** mit anschliessender Befragung (mindestens 3 Testpersonen, mehr wünschenswert) und eine **längere Nutzung** über 1 Woche bzw. mindestens 1 Wochenende mit zweiter Befragung. Personen, die beide Formate durchlaufen, beantworten den Fragebogen zweimal — der Vergleich der Antworten dient als Indikator für Erstkontakt- vs. Gewohnheitseffekt. Kap. 9 (Ergebnisse) wurde an die neue Dreiteilung angepasst; Kap. 10 (Diskussion) bleibt strukturell unverändert, greift aber explizit die drei Validierungsstränge auf.

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

### 🟡 3 Attune als Forschungsartefakt

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

### ⬜ 8 Validierung *(überarbeitet nach Empfehlung C — Struktur vom Dozenten vorgegeben)*

Funktion des Kapitels: **Funktioniert das Artefakt, wird es akzeptiert, und entfaltet es die intendierte Wirkung?** Das Kapitel folgt der dreiteiligen Logik (Machbarkeit → Usability/Akzeptanz → Wirkung) und schliesst mit einem allgemeinen Fragebogenteil sowie der Beschreibung des Studiensetups.

⬜ **8.1 Validierungsdesign** (Was wird wie validiert; Brücke zur Methodik in Kap. 5; Übersicht der drei Validierungsstränge und ihrer Verzahnung)

⬜ **8.2 Machbarkeitsnachweis (Proof of Concept)**
  - 8.2.1 Funktionsnachweis durch den Prototyp (End-to-End-Sendungserzeugung)
  - 8.2.2 Unit Tests und automatisierte Funktionstests (Pipeline-Komponenten, Datenintegration, LLM- und TTS-Schnittstellen)
  - 8.2.3 Nicht-funktionale Aspekte (Latenz, Kosten, Verfügbarkeit, Fehlerraten, Stabilität bei wiederholter Ausführung)

⬜ **8.3 Usability und Akzeptanz**
  - 8.3.1 Instrumentenwahl — Anlehnung an SUS (System Usability Scale), TAM (Technology Acceptance Model) und UTAUT (Unified Theory of Acceptance and Use of Technology)
  - 8.3.2 Eigenkonstruktion der Frage-Items mit LLM-Unterstützung (GPT bzw. Claude) — pro Einstellungsmöglichkeit jeweils dreigeteilt:
    - Was gefällt an dieser Einstellung?
    - Was wird als unnötig empfunden?
    - Was würdest du dir zusätzlich wünschen?
  - 8.3.3 SUS-Score als standardisierter Vergleichswert
  - 8.3.4 Qualitative Freitexte zur Bedienlogik und zur Transparenzanzeige

⬜ **8.4 Wirkung**
  - 8.4.1 Ableitung der Wirkungsitems aus dem theoretischen Rahmen (Kap. 2):
    - aus SDT/METUX (2.3.1): Autonomieerleben, Kompetenzerleben, Verbundenheit
    - aus VSD (2.3.2): wahrgenommene Werteorientierung des Artefakts
    - aus Digital Wellbeing (2.3.3): Wohlbefinden in und nach der Nutzungssituation
    - aus algorithmischer Souveränität (2.3.4): Transparenz, Steuerbarkeit, Vertrauen in die Auswahl
  - 8.4.2 Items zu Information und Unterhaltung — Kerngebrauchszweck eines Radioformats
  - 8.4.3 Awareness-Items: Bewusstsein für Filterblasen, Bias und Grenzen des Systems

⬜ **8.5 Allgemeiner Fragebogen**
  - 8.5.1 Demographische Daten (Alter, höchster abgeschlossener Bildungsgrad, Geschlecht, beruflicher Hintergrund)
  - 8.5.2 Mediennutzungsverhalten (genutzte Newsquellen, durchschnittliche Hördauer Radio/Podcast, Nutzung sozialer Medien)
  - 8.5.3 Allgemeine Wahrnehmung des Artefakts (offene Freitextfragen)

⬜ **8.6 Studiensetup** (kombiniertes Format)
  - 8.6.1 Stichprobe und Rekrutierung (mindestens 3 Testpersonen, mehr wünschenswert; Auswahl mit Blick auf demographische Streuung)
  - 8.6.2 **Format A — 1-malige Nutzung** mit anschliessender Befragung (Onboarding, eine Sendung hören, Fragebogen, Kurzinterview)
  - 8.6.3 **Format B — Längere Nutzung** über 1 Woche bzw. mindestens 1 Wochenende mit Abschluss-Befragung (Tagebuch optional, Logdaten)
  - 8.6.4 **Kombination beider Formate** — Personen mit Doppelteilnahme beantworten den Fragebogen zweimal; Vergleich der Antworten als Indikator für Erstkontakt- vs. Gewohnheitseffekt

⬜ **8.7 Erfolgskriterien** (Operationalisierung aus Disposition Kap. 7.3 und Forschungsfrage; getrennt nach Machbarkeit, Usability/Akzeptanz und Wirkung)

⬜ **8.8 Ethik und Einwilligung** (Informed Consent, Datennutzung, Anonymisierung; Hinweis: kein Tracking, lokale Speicherung)

Mögliche Verfeinerungen:
- **Tabelle „Konstrukt → Quelle → Itemtyp"** in 8.3 und 8.4, um die Item-Herkunft transparent zu machen (welche Items aus SUS/TAM/UTAUT, welche aus Kap. 2 abgeleitet)
- **Übersichtsabbildung** zu Beginn von 8.1, die die drei Validierungsstränge und das kombinierte Studienformat visualisiert

### ⬜ 9 Ergebnisse *(angepasst an die Dreiteilung der Validierung)*

⬜ **9.1 Ergebnisse Machbarkeitsnachweis** (Funktionstest-Ergebnisse, Latenz- und Kostenmessungen, Fehlerraten)
⬜ **9.2 Ergebnisse Usability und Akzeptanz** (SUS-Score, Auswertung der Items pro Einstellungsmöglichkeit, qualitative Freitexte)
⬜ **9.3 Ergebnisse Wirkung** (SDT-/Wellbeing-/Souveränitätsitems, Information-Unterhaltung, Awareness-Items)
⬜ **9.4 Vergleich der Befragungszeitpunkte** (Format A vs. Format B; Auswertung der Doppelteilnehmenden — verändern sich Antworten von Erstkontakt zu Gewohnheit?)
⬜ **9.5 Vergleich mit den Erfolgskriterien** (getrennt nach den drei Validierungssträngen)
⬜ **9.6 Beobachtungen aus den Logdaten** (Nutzungsdauer, Häufigkeit, Einstellungsänderungen)

---

## Teil V — Diskussion und Abschluss

### ⬜ 10 Diskussion *(greift die drei Validierungsstränge aus Kap. 8 explizit auf)*

⬜ **10.1 Beantwortung der Forschungsfrage** (synthetisierend über die drei Stränge: Machbarkeit, Akzeptanz, Wirkung)
⬜ **10.2 Diskussion der Machbarkeit** (technische Tragfähigkeit der Pipeline, Skalierungsfragen, Kostenstruktur)
⬜ **10.3 Diskussion der Usability und Akzeptanz** (welche Einstellungen wurden geschätzt, welche überflüssig, welche fehlen)
⬜ **10.4 Diskussion der Wirkung** (Einordnung in den theoretischen Rahmen — SDT, VSD, Digital Wellbeing, algorithmische Souveränität — und Reflexion der Awareness-Effekte)
⬜ **10.5 Implikationen für Design und Praxis** (was lassen sich daraus für andere wellbeing-orientierte Medienartefakte ableiten?)
⬜ **10.6 Limitationen** (kleine Stichprobe, kurzer Zeitraum, Selbstauswahl, mögliche Verzerrung durch zweimalige Befragung derselben Personen, technische Restriktionen)
⬜ **10.7 Übertragbarkeit auf andere Medienkontexte**

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

⬜ **A** Interview-Leitfaden Pilottest (Format A und Format B getrennt)
⬜ **B** SUS-Fragebogen (deutsche Version)
⬜ **C** Vollständiger Item-Katalog Validierung
  - C.1 Usability/Akzeptanz-Items pro Einstellungsmöglichkeit (gefällt / unnötig / Wunsch)
  - C.2 Wirkungsitems (SDT, VSD, Digital Wellbeing, algorithmische Souveränität)
  - C.3 Awareness-Items (Bubble, Bias, Grenzen)
  - C.4 Demographie-Block
⬜ **D** System-Prompt(s) für Sendungsgenerierung
⬜ **E** Beispiel-Sendung (Transkript einer generierten Sendung)
⬜ **F** Screenshots der Webapplikation
⬜ **G** Architektur- und Sequenzdiagramme (falls nicht im Hauptteil)
⬜ **H** Einwilligungserklärung (Informed Consent) — Vorlage für Format A und Format B
⬜ **I** Tabelle Arbeitspakete vs. Ist-Zustand (optional, für Reflexion)

---

## Reihenfolge der nächsten Schritte (Empfehlung)

1. **Kap. 4 Forschungsfrage** schreiben — kürzestes Kapitel, klärt aber alles Folgende
2. **Kap. 5 Methodik** ergänzen — Design-Science-Rahmen explizit machen
3. **Kap. 6 Konzept und Architektur** — Brücke vom Was (Kap. 3) zum Wie
4. **Kap. 7 Implementation** parallel zur Code-Entwicklung
5. **Kap. 8 Validierung** vor dem Pilottest fertig haben (Instrumente, Item-Katalog, Consent, beide Studienformate)
6. **Kap. 9–11** nach dem Pilottest
7. **Front- und Back-Matter** zum Schluss

---

## Hinweise zur Wortzahl

ZHAW-BSc-Thesen bewegen sich typischerweise im Bereich 30–60 Seiten Hauptteil. Aktuell hast du in Kap. 1–3 bereits ca. 18–22 Seiten Inhalt (geschätzt nach Wortzahl). Mit den fehlenden Kapiteln solltest du komfortabel im Zielbereich landen, ohne aufblähen zu müssen.
