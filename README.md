# Attune – Nutzerzentrierte Personalisierung im vollautomatisierten Radio

Forschungsartefakt und Pilotstudien-Auswertung zur BSc-Thesis (ZHAW, Institut für Wirtschaftsinformatik):
**«Attune: Nutzerzentrierte Personalisierung im vollautomatisierten Radio – Eine Konzeptstudie im Kontext von Digital Wellbeing»**
Autor: Michael Möckli · Betreuer: Alexandre de Spindler

Attune ist ein vollautomatisiertes, KI-gestütztes Radio, das denselben Technologie-Stack wie engagement-optimierte Plattformen nutzt (LLM, TTS, Recommender), das Optimierungsziel aber invertiert: statt Verweildauer wird das Wohlbefinden der Nutzenden optimiert (explizite Präferenzangabe, diversitätsorientierte Kuratierung, definiertes Sessionende, Transparenz).

## Wissenschaftlicher Beitrag

Die Arbeit liefert einen Beitrag auf drei Ebenen:

- **Konzeptionell** – ein theoretisch verankertes Fünf-Bausteine-Modell wellbeing-orientierter Personalisierung mit explizitem Mapping von Werten (Self-Determination Theory, Value-Sensitive Design, algorithmische Souveränität) auf Designentscheidungen, verdichtet zu vier übertragbaren Designprinzipien.
- **Technisch** – ein lauffähiges End-to-End-Artefakt, das denselben Technologie-Stack wie engagement-optimierte Plattformen mit *invertierter* Zielfunktion betreibt und Personalisierung **ohne jede Erhebung von Verhaltensdaten** allein aus expliziten Präferenzangaben erzeugt (Profile lokal im Browser, kein Tracking, kein Nutzerkonto).
- **Empirisch** – erste, vollständig reproduzierbare deskriptive Evidenz (offenes Notebook) für die These, dass die bekannten Plattformprobleme an der *Zielfunktion* liegen und nicht an der Technologie.

## Repository-Struktur

| Pfad | Inhalt |
|---|---|
| `attune-app/` | Next.js-Prototyp (Details unten) |
| `Attune – Pilotstudie.csv` | Rohdaten der Pilotbefragung (Google Forms, Juni 2026, n = 25 nach Einwilligungsfilter) |
| `Attune_Pilotstudie_Auswertung.ipynb` | Kommentiertes Auswertungs-Notebook (deskriptiv) |
| `Attune_Pilotstudie_Auswertung.html` | HTML-Export des Notebooks (vollständig, reproduzierbar) |
| `Attune_Pilotstudie_Dashboard.html` | Kuratiertes, interaktives Befund-Dashboard (Standalone-HTML, Präsentationssicht) |
| `Attune – Pilotstudie - Google Formulare.pdf` | Eingesetzter Fragebogen (Google-Forms-Export) |
| `figures/` | Vom Notebook erzeugte Diagramme (PNG, 200 dpi) |
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

Die forschungskritische Auswahllogik ist durch Unit-Tests abgesichert (`src/services/news.test.ts`, 11 Tests):

```bash
cd attune-app && npm install && npm test
```

## Pilotstudie: Validierung in drei Kategorien

Die Validierung folgt der Dreiteilung aus Kap. 8 der Thesis; Notebook und HTML-Export sind entlang derselben Kategorien gegliedert:

1. **Machbarkeit** – Lief die Pipeline fehlerfrei? Technische Qualität (Audio, Verständlichkeit, Stimme, Übergänge, Reaktionszeit). → Notebook Abschnitt 2
2. **Usability / Akzeptanz** – SUS-angelehnter Bedienbarkeits-Index (adaptiert nach Brooke 1996), semantisches Differential, Einstellungs-Items. → Notebook Abschnitt 3
3. **Wirkung** – Konstrukte aus dem Theorieteil (SDT, Digital Wellbeing, algorithmische Souveränität) plus Awareness-Items zu Filterblase, Bias und Grenzen. → Notebook Abschnitt 4

Zusätzlich beantwortet Notebook-Abschnitt 7 die vier Teilfragen der Forschungsfrage (T1–T4) mit je einem Diagramm und einer Synthese-Grafik; Abschnitt 8 verdichtet die Befunde entlang der drei Kategorien.

## Reproduzierbarkeit: Wie Notebook, HTML und Diagramme entstanden sind

Die gesamte Auswertung ist deterministisch aus der Rohdatendatei reproduzierbar – es gibt keine manuell erstellten Zahlen oder Diagramme.

**Vorgehen:**

1. Rohdaten-Export aus Google Forms als CSV (`Attune – Pilotstudie.csv`, 96 Spalten). Der Fragebogen liegt als PDF bei (`Attune – Pilotstudie - Google Formulare.pdf`).
2. Das Notebook lädt die CSV, filtert auf erteilte Einwilligung (n = 25), kodiert konstruktspezifisch um (negativ formulierte Items werden umgepolt, Awareness-Items bewusst nicht – Begründung in Notebook-Abschnitt 0.1) und berechnet ausschliesslich deskriptive Statistiken (M, SD, Min, Max; bei n = 25 keine Inferenzstatistik).
3. Alle Diagramme entstehen mit matplotlib direkt im Notebook; die Forschungsfrage- und Übersichts-Diagramme werden zusätzlich als PNG (200 dpi) nach `figures/` exportiert und von dort in die Thesis eingebunden.
4. Der HTML-Export ist eine 1:1-Abbildung des ausgeführten Notebooks.

Das interaktive `Attune_Pilotstudie_Dashboard.html` ist eine handgestaltete Präsentationsschicht (Chart.js, Standalone). Alle dort gezeigten Werte – inklusive der explorativen Subgruppen-Vergleiche und der Spearman-Korrelationsmatrix – sind aus dem Notebook reproduzierbar (Abschnitt 10); das Notebook bleibt die massgebliche Quelle.

**Selbst ausführen:**

```bash
pip install pandas numpy matplotlib nbclient nbconvert ipykernel
jupyter nbconvert --to notebook --execute --inplace Attune_Pilotstudie_Auswertung.ipynb
jupyter nbconvert --to html Attune_Pilotstudie_Auswertung.html
```

**Werkzeug-Transparenz:** Notebook und Auswertungs-Skripte wurden mit Unterstützung von Claude (Anthropic) erstellt; alle Kodierungsentscheidungen sind im Notebook dokumentiert und die Ausgaben wurden gegen die Rohdaten geprüft.

## Zentrale Befunde (Kurzfassung)

Adaptierter SUS-Index 82.5/100 (Usability stärkster Bereich); alle vier Teilfragen der Forschungsfrage über der Skalenmitte (T1 Autonomie 3.94, T3 Session 3.67, T2 Diversität und T4 Transparenz je 3.62); Transparenz-Elemente hilfreich, aber nicht durchgängig bemerkt; Weiternutzungsabsicht gespalten (14 ja / 11 nein). Details: `Attune_Pilotstudie_Auswertung.html` und Kap. 9 der Thesis.
