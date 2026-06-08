# Attune – Nutzerzentrierte Personalisierung im vollautomatisierten Radio

Forschungsartefakt und Pilotstudien-Auswertung zur BSc-Thesis (ZHAW, Institut für Wirtschaftsinformatik):
**«Attune: Nutzerzentrierte Personalisierung im vollautomatisierten Radio – Eine Konzeptstudie im Kontext von Digital Wellbeing»**
Autor: Michael Möckli · Betreuer: Alexandre de Spindler

Attune ist ein vollautomatisiertes, KI-gestütztes Radio, das denselben Technologie-Stack wie engagement-optimierte Plattformen nutzt (LLM, TTS, Recommender), das Optimierungsziel aber invertiert: statt Verweildauer wird das Wohlbefinden der Nutzenden optimiert (explizite Präferenzangabe, diversitätsorientierte Kuratierung, definiertes Sessionende, Transparenz).

## Repository-Struktur

| Pfad | Inhalt |
|---|---|
| `attune-app/` | Next.js-Prototyp (Details unten) |
| `Attune – Pilotstudie.csv` | Rohdaten der Pilotbefragung (Google Forms, Juni 2026, n = 25 nach Einwilligungsfilter) |
| `Attune_Pilotstudie_Auswertung.ipynb` | Kommentiertes Auswertungs-Notebook (deskriptiv) |
| `Attune_Pilotstudie_Auswertung.html` | HTML-Export des Notebooks (lesbar ohne Python) |
| `Attune_Pilotstudie_Dashboard.html` | Interaktives Befund-Dashboard (Standalone-HTML) |
| `figures/` | Vom Notebook erzeugte Diagramme (PNG, für Thesis-Anhang) |
| `Attune_Pilotstudie_Anhang.docx` | Ausformulierter Ergebnis-Anhang für die Thesis |
| `Hauptdokument.docx` | Thesis-Hauptdokument |

## Prototyp (`attune-app/`)

Next.js 15 / React 19 / TypeScript. Pipeline: RSS-News (SRF, NZZ, Tages-Anzeiger) + OpenWeatherMap → Claude (Moderationstext) → ElevenLabs (TTS) → MP3-Sendung; optionale Musik via Jamendo oder Spotify. Profile lokal (localStorage), kein Nutzerkonto; in der Produktion schützt ein Invite-Gate (`/unlock`, passwortbasiert) den Zugang. Für jeden externen Dienst existiert ein Mock-Modus.

```bash
cd attune-app
npm install
cp .env.example .env.local   # API-Keys eintragen (Anthropic + ElevenLabs erforderlich; OpenWeatherMap, Jamendo, Spotify optional)
npm run dev
```

Kernstück der Forschungsidee ist die Kuratierungslogik in `src/services/news.ts` (`selectNews()`): vier Auswahl-Pässe **Coverage → Serendipity → Depth → Fallback** operationalisieren Vielfalt und Tageszeit-Passung als Zielwerte – nicht Engagement.

## Pilotstudie: Validierung in drei Kategorien

Die Validierung folgt der Dreiteilung aus Kap. 8 der Thesis; Notebook, HTML und Anhang sind entlang derselben Kategorien gegliedert:

1. **Machbarkeit** – Lief die Pipeline fehlerfrei? Technische Qualität (Audio, Verständlichkeit, Stimme, Übergänge, Reaktionszeit). → Notebook Abschnitt 2
2. **Usability / Akzeptanz** – SUS-angelehnter Bedienbarkeits-Index (adaptiert nach Brooke 1996), semantisches Differential, Einstellungs-Items. → Notebook Abschnitt 3
3. **Wirkung** – Konstrukte aus dem Theorieteil (SDT, Digital Wellbeing, algorithmische Souveränität) plus Awareness-Items zu Filterblase, Bias und Grenzen. → Notebook Abschnitt 4

Zusätzlich beantwortet Notebook-Abschnitt 7 die vier Teilfragen der Forschungsfrage (T1–T4) mit je einem Diagramm und einer Synthese-Grafik; Abschnitt 8 verdichtet die Befunde entlang der drei Kategorien.

## Reproduzierbarkeit: Wie Notebook, HTML und Diagramme entstanden sind

Die gesamte Auswertung ist deterministisch aus der Rohdatendatei reproduzierbar – es gibt keine manuell erstellten Zahlen oder Diagramme.

**Vorgehen:**

1. Rohdaten-Export aus Google Forms als CSV (`Attune – Pilotstudie.csv`, 96 Spalten). Der Fragebogen liegt als PDF bei (`Attune – Pilotstudie - Google Formulare.pdf`).
2. Das Notebook lädt die CSV, filtert auf erteilte Einwilligung (n = 25), kodiert konstruktspezifisch um (negativ formulierte Items werden umgepolt, Awareness-Items bewusst nicht – Begründung in Notebook-Abschnitt 0.1) und berechnet ausschliesslich deskriptive Statistiken (M, SD, Min, Max; bei n = 25 keine Inferenzstatistik).
3. Alle Diagramme entstehen mit matplotlib direkt im Notebook; die Forschungsfrage- und Übersichts-Diagramme werden zusätzlich als PNG (200 dpi) nach `figures/` exportiert und von dort in den Thesis-Anhang eingebunden.
4. Der HTML-Export ist eine 1:1-Abbildung des ausgeführten Notebooks.

**Selbst ausführen:**

```bash
pip install pandas numpy matplotlib nbclient nbconvert ipykernel
jupyter nbconvert --to notebook --execute --inplace Attune_Pilotstudie_Auswertung.ipynb
jupyter nbconvert --to html Attune_Pilotstudie_Auswertung.html
```

**Werkzeug-Transparenz:** Notebook und Auswertungs-Skripte wurden mit Unterstützung von Claude (Anthropic) erstellt; alle Kodierungsentscheidungen sind im Notebook dokumentiert und die Ausgaben wurden gegen die Rohdaten geprüft.

## Zentrale Befunde (Kurzfassung)

Adaptierter SUS-Index 82.5/100 (Usability stärkster Bereich); alle vier Teilfragen der Forschungsfrage über der S