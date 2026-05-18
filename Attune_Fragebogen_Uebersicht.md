# Attune – Pilotstudie Fragebogen

**Begleitdokument zum Apps Script `Attune_Fragebogen_GoogleForms.gs`**

Diese Übersicht zeigt alle Items des Fragebogens in lesbarer Form, gruppiert nach den Sektionen der Validierungs-Dreiteilung (Machbarkeit / Usability-Akzeptanz / Wirkung) und mit Hinweisen auf die jeweiligen Theorie-Anker aus Kap. 2.3.

Gesamtumfang: ~55 Items, geschätzte Bearbeitungszeit 15–20 Minuten.

**Update 2026-05-18 (Dozenten-Feedback vom 07.05.):** UEQ-S Kurzform (8 bipolare Items, validiert nach Schrepp/Hinderks/Thomaschewski 2017) ergänzt die SUS-Kurzform; drei vom Dozenten konkret genannte Items eingebaut („Mir hat Unterhaltung gefehlt", „Es waren mir zu viele Informationen", „auch Informationen ausserhalb meiner Bubble"). Gesamtlänge bleibt unverändert: 11 schwächere oder redundante Items wurden im Gegenzug entfernt (Podcasts-Häufigkeit, 2× „mehr Optionen gewünscht", 2 Reverse-Items, 1 VSD-Doppelung, daypart-Item, Themenmischung-Duplikat, generisches Bias-Awareness-Item, „Moderation ist KI-generiert"). Achtung: UEQ-S ist abweichend 7-stufig — methodisch korrekt, im Form-Block erklärt.

---

## So erstellst du die Google Form

1. Öffne [script.google.com](https://script.google.com) und klicke auf **„Neues Projekt"**.
2. Lösche den Beispielcode (`function myFunction() {}`).
3. Öffne `Attune_Fragebogen_GoogleForms.gs`, kopiere den **gesamten Inhalt** und füge ihn ins Apps-Script-Editor-Fenster ein.
4. Klicke oben auf **Speichern** (Disketten-Icon).
5. Wähle in der Funktions-Dropdown oben `createAttuneForm` aus und klicke **Ausführen** (▶).
6. Erlaube einmalig die Berechtigungen für FormApp und Drive.
7. Nach wenigen Sekunden ist die Form in deinem Google Drive angelegt.
8. Im Ausführungsprotokoll (Strg+Enter / Menü „Ausführungen") findest du die **Editor-URL** (zum Anpassen) und die **veröffentlichte URL** (zum Teilen mit den 20 Teilnehmenden).

Die Likert-Skala ist durchgehend 5-stufig (1 = stimme überhaupt nicht zu, 5 = stimme voll und ganz zu). Falls dein Dozent 7-stufig wünscht, ersetzt du im Script die Spalten-Konstante `LIKERT_COLS` durch `['1','2','3','4','5','6','7']`.

---

## Sektion 1 – Teilnehmer-ID & Demografie

Bildet die Brücke zur App: Die ID, die der Studierende in Attune sieht, wird hier eingetragen.

- **Teilnehmer-ID** (Kurzantwort, Pflicht)
- **Alter** (Auswahl: Unter 18 / 18–24 / 25–34 / 35 oder älter)
- **Geschlecht** (weiblich / männlich / divers / keine Angabe)
- **Studienrichtung** (Kurzantwort, optional)
- **Aktuelles Semester** (1.–2. / 3.–4. / 5.–6. / 7.+, optional)

## Sektion 2 – Allgemeine Mediennutzung

Hintergrund-Items zur Einordnung der Antworten. Die letzten beiden Items adressieren bereits die Awareness gegenüber engagement-getriebenen Plattformen.

- Häufigkeit klassisches Radio (UKW/DAB) – 5er-Skala nie–täglich
- Häufigkeit Musik-Streaming (Spotify, Apple Music) – 5er-Skala
- Häufigkeit algorithmisch kuratierte Plattformen (TikTok, YouTube, Reels) – 5er-Skala
- Audio-Hörzeiten (Mehrfachauswahl: morgens, mittags, abends, nachts, beim Pendeln, beim Arbeiten/Lernen, beim Sport, beim Kochen/Haushalt)
- Wichtigkeit von Nachrichten im Medienalltag (Likert 1–5)
- „Festgehalten"-Gefühl durch Algorithmen (Likert 1–5) — *Vanden Abeele 2021, Reviglio & Agosti 2020*

## Sektion 3 – Machbarkeit (Validierungsteil 1)

Belegt, dass der Prototyp die fünf Bausteine technisch bedient.

- Lief die App ohne Fehler? (Ja vollständig / Teilweise / Nein gravierend) – **Pflicht**
- Welche Sendungselemente gehört? (Checkbox: Jingle, Begrüssung, Nachrichten, Musik, Wetter, Verabschiedung, Outro)
- Technische Probleme (offen)
- **Likert-Grid – Technische Qualität (5 Items):**
  - Audioqualität insgesamt
  - Verständlichkeit der KI-Moderation
  - Natürlichkeit der Stimme
  - Übergänge zwischen Elementen
  - Reaktionszeit der App

## Sektion 4 – Usability / Akzeptanz pro Einstellung (Validierungsteil 2a)

Konstruktion nach dem Schema „gefällt / unnötig / Wunsch", wie in deiner Memory festgehalten. Pro Einstellungsmöglichkeit ein eigenes Grid plus optionales Wunsch-Feld.

**Themenauswahl** (Building Block 1)
- gefällt mir / war für mich unnötig / mehr Optionen gewünscht
- *Plus offenes Wunsch-Feld*

**Sendungslänge** (Building Block 4)
- gefällt mir / war für mich unnötig

**Musikquelle** (Building Block 2)
- gefällt mir / war für mich unnötig
- *Plus offenes Feld: Welche Einstellungsmöglichkeit hat dir gefehlt?*

## Sektion 4c – Inhalt & Sessionende (Building Block 3 + 4)

Eigene Sektion für die Inhaltskuratierung und das Sessiondesign. Drei der Items adressieren direkt das Dozenten-Feedback vom 07.05. (Unterhaltung, Informationsdichte).

**Inhalt der Sendung** (Likert 1–5)
- Es kamen auch Themen vor, die ich nicht aktiv gewählt hatte. *(Serendipity, BB3)*
- Mir hat in der Sendung Unterhaltung gefehlt. *(Dozent 07.05.)*
- Es waren mir zu viele Informationen auf einmal. *(Dozent 07.05.)*

**Sessionende und Pausencharakter** (Likert 1–5)
- Das klare Ende der Sendung fand ich angenehm.
- Es hat mir gefehlt, dass danach nichts mehr automatisch weiterlief. *(Reverse-Coding)*

## Sektion 4b – Bedienbarkeit (SUS-Kurzform, Validierungsteil 2b)

6 Items angelehnt an die System Usability Scale (Brooke 1996; Bangor et al. 2008).

- Ich kann mir vorstellen, die App regelmässig zu nutzen.
- Die App war unnötig komplex.
- Die App war einfach zu bedienen.
- Die meisten Personen würden sich schnell zurechtfinden.
- Ich fühlte mich beim Bedienen sicher.
- Ich musste viel lernen, bevor ich loslegen konnte.

## Sektion 4d – Gesamteindruck (UEQ-S, Validierungsteil 2c)

8 bipolare Items als 7-stufiges Semantisches Differential nach Schrepp, Hinderks & Thomaschewski (2017). Validiertes Kurzinstrument zur User Experience, ergänzt die SUS um hedonische Qualitätsaspekte (Stimulation, Originalität, Neuartigkeit). Skala: 1 = linkes Adjektiv, 7 = rechtes Adjektiv.

**Pragmatische Qualität**
- unangenehm — angenehm
- unverständlich — verständlich
- ineffizient — effizient
- verwirrend — übersichtlich

**Hedonische Qualität**
- langweilig — spannend
- uninteressant — interessant
- konventionell — originell
- herkömmlich — neuartig

## Sektion 5 – Transparenz (Building Block 5)

Awareness + Bewertung der Transparenz-Elemente.

- Quellenangaben bemerkt? (Ja/Nein/Unsicher)
- Begründung der Themen bemerkt? (Ja/Nein/Unsicher)
- KI-Pipeline-Übersicht bemerkt? (Ja/Nein/Unsicher)
- **Likert-Grid – Hilfreichkeit der Transparenz-Elemente (4 Items):**
  - Quellenangaben
  - Begründung der Themenauswahl
  - Sichtbarkeit der KI-Pipeline
  - Hinweis auf Grenzen der KI

## Sektion 6 – Wirkung (Validierungsteil 3)

Items abgeleitet aus den Konstrukten von Kap. 2.3 — *nicht* aus generischen Wellbeing-Skalen, wie vom Dozenten gewünscht.

### Selbstbestimmung — *SDT Autonomie (Ryan & Deci 2000)*
- Ich hatte das Gefühl, selbst zu bestimmen, was ich höre.
- Die App hat meine Hörgewünsche respektiert.
- Ich konnte die Sendung an meine Bedürfnisse anpassen.
*(Reverse-Item „von der App gesteuert" entfernt am 2026-05-18, um Länge zu erhalten.)*

### Kompetenz — *SDT Kompetenz*
- Ich konnte die App effektiv nutzen.
- Ich verstand, wie die Personalisierung zustande kommt.

### Verbundenheit / Passung — *SDT Verbundenheit + METUX Adoption/Interface*
- Die Sendung wirkte auf mich wie für mich gemacht.
- Ich fühlte mich beim Hören angesprochen.

### Wohlbefinden beim Hören — *Digital Wellbeing (Vanden Abeele 2021), METUX Behaviour/Life*
- Nach dem Hören fühlte ich mich entspannter.
- Das Hören fühlte sich nicht ausbeuterisch an (kein Sog, weiterzuhören).
- Im Vergleich zu Spotify/TikTok/YouTube fühlte sich das Hören gesünder an.
*(2026-05-18: „Aufmerksamkeit respektvoll" + zweites Reverse-Item entfernt — Aufmerksamkeitsthema ist über VSD-Item und über die Reverse-Items in Wellbeing-Bias-Sektion abgedeckt.)*

### Kontrolle über die Personalisierung — *Algorithmische Souveränität (Reviglio & Agosti 2020)*
- Ich verstand, warum mir bestimmte Inhalte vorgeschlagen wurden.
- Ich hatte das Gefühl, die Personalisierung kontrollieren zu können.
- Ich fühlte mich nicht von einem Algorithmus „gelenkt".

### Werte der App — *Value-Sensitive Design (Hendry, Friedman & Ballard 2021)*
- Die App vermittelte mir das Gefühl, dass mein Wohlbefinden ihr Ziel ist.
*(Doppelitem zu „Ruhe/Vielfalt/Selbstbestimmung" entfernt am 2026-05-18; SDT-Items decken Selbstbestimmung, Diversität wird in Sek. 7 erhoben.)*

## Sektion 7 – Awareness: Bubble, Bias, Grenzen

Reflexions-Items, die explizit nicht über die Wirkung gehen, sondern über die Bewusstheit gegenüber Risiken.

### Filterblase / Themenblase
- Mir ist bewusst, dass personalisierte Medien meine Sicht einschränken können.
- Bei dieser App hatte ich das Gefühl, in einer Themenblase zu landen.
- Die Themenauswahl wirkte ausgewogen, nicht einseitig.
- Ich hatte das Gefühl, auch Informationen ausserhalb meiner gewohnten Themen-Bubble zu bekommen. *(Dozent 07.05.)*

### Verzerrungen in der KI-Moderation
- In der Moderation gab es Aussagen, die mir voreingenommen vorkamen.
- Eine KI sollte ihre Quellen und Grenzen transparent machen.

### Grenzen der App
- Es war mir klar, was die App leistet – und was nicht.
- Ich würde der KI nicht blind vertrauen.

## Sektion 8 – Offene Rückmeldung

Qualitative Anker für Kap. 8.6/8.7.

- Was hat dir besonders gefallen?
- Was hat dich gestört?
- Was würdest du dir wünschen?
- Würdest du die App weiter nutzen? (Ja regelmässig / Ja gelegentlich / Nein eher nicht / Nein sicher nicht)
- Begründung (optional, offen)

## Abschluss

Dankes-Text mit deiner Kontaktadresse für Rückfragen.

---

## Mapping Items ↔ Theorie-Anker (Übersicht)

| Konstrukt | Sektion | Anzahl Items | Quelle |
|---|---|---|---|
| Machbarkeit | 3 | 8 | Funktionaler Nachweis (BB1–BB4) |
| Akzeptanz pro Einstellung | 4 | 7 + 2 offen | eigenkonstruiert (gefällt/unnötig/Wunsch) |
| Inhalt & Sessionende (BB3+BB4) | 4c | 5 | eigenkonstruiert + Dozent 07.05. |
| SUS / Usability allgemein | 4b | 6 | Brooke 1996, Bangor et al. 2008 |
| UEQ-S (User Experience kurz) | 4d | 8 (bipolar, 7-stufig) | Schrepp, Hinderks & Thomaschewski 2017 |
| Transparenz | 5 | 3 + 4 | BB5; eigenkonstruiert |
| SDT Autonomie | 6 | 3 | Ryan & Deci 2000 |
| SDT Kompetenz | 6 | 2 | Ryan & Deci 2000 |
| SDT Verbundenheit | 6 | 2 | Ryan & Deci 2000; Peters et al. 2018 |
| Digital Wellbeing | 6 | 3 | Vanden Abeele 2021 |
| Algorithmische Souveränität | 6 | 3 | Reviglio & Agosti 2020 |
| Value-Sensitive Design | 6 | 1 | Hendry, Friedman & Ballard 2021 |
| Bubble | 7 | 4 | Awareness-Konstrukt + Dozent 07.05. |
| Bias | 7 | 2 | Awareness-Konstrukt (eigenkonstruiert) |
| Grenzen | 7 | 2 | Awareness-Konstrukt (eigenkonstruiert) |
| Mediennutzung allgemein | 2 | 6 | Hintergrund / Awareness-Vorblock |
| Demografie | 1 | 5 | Standard |
| Offene Rückmeldung | 8 | 5 | qualitativ |

Diese Tabelle kannst du in leicht angepasster Form als **Anhang A: Operationalisierung** in dein Hauptdokument übernehmen — sie macht für die Begutachter sofort sichtbar, dass jedes Item auf einen Theorie-Anker zurückgeht.

---

## Nächste Schritte nach der Form-Erstellung

1. Im Editor die Form noch einmal durchgehen, ggf. Reihenfolge anpassen.
2. Unter **Antworten → Antworten in Sheets** ein verbundenes Google-Sheet anlegen — das ist später dein Datensatz für die Auswertung.
3. Die veröffentlichte URL gemeinsam mit den 20 Teilnehmer-IDs vom Dozenten an die Studierenden verteilen.
4. Nach der Erhebung: SUS-Score berechnen (Brookes Formel auf die 6 SUS-Items anwenden), Likert-Mittelwerte je Konstrukt bilden, qualitative Antworten codieren.
