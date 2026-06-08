# Attune — UI/UX Design Proposal

Stand: 26. April 2026
Autor: erstellt mit Claude für Michael Möckli

Diese Vorlage ist der Vorschlag, **wie** wir die UI/UX von Attune gestalten, damit die fünf Bausteine aus Kapitel 3.3 der Disposition für Testpersonen sicht- und erlebbar werden. Sie schliesst gezielt die Lücken aus dem `Implementation_Checklist.md`-Audit (insb. Block 5 Transparenz und Block 3 Kuration). Der Tech-Stack (Next.js 15, Tailwind 4) bleibt; das visuelle Designsystem wird im Rahmen der Mockup-Phase mit Claude Design neu entworfen — der bestehende Prototyp-Stil ist nicht Vorgabe. Kein bestehender Code wird hier verändert; der Vorschlag ist die Diskussionsgrundlage.

---

## 1. Designhaltung

Attune ist kein normales Player-UI. Es ist die sichtbare Seite einer These: dass dieselbe Technologie (LLM, TTS, Empfehlungslogik), die in heutigen Plattformen das Engagement maximiert, ebenso konsequent auf Nutzerwohl ausgerichtet werden kann. Jede UI-Entscheidung muss daher zwei Tests bestehen:

1. **Theoriebezug** — ist die Entscheidung an SDT, METUX, Digital Wellbeing oder algorithmischer Souveränität nachvollziehbar verankert?
2. **Anti-Engagement-Test** — vermeidet das Element systematisch die in Kapitel 1.3 katalogisierten manipulativen Designmuster (endloses Scrollen, Autoplay, variable Belohnungen, Push-Hooks, intransparente Algorithmen)?

Daraus leiten sich fünf Designprinzipien ab.

### 1.1 Sichtbare Selbstbestimmung (Autonomy → SDT, METUX-Behavior-Layer)
Alles, was die Sendung formt, ist im UI direkt einseh- und veränderbar. Das Profil ist nicht versteckt hinter einer Einstellungsseite, sondern Teil des Hauptbildschirms. Es existiert kein impliziter Lernschritt aus Verhalten.

### 1.2 Lesbare Algorithmik (Algorithmic Sovereignty → Reviglio & Agosti 2020)
Vor jeder Sendung steht eine knappe Erklärung, warum diese Inhalte gewählt wurden, aus welchen Quellen sie stammen und welche Pipeline-Schritte sie durchlaufen haben. Kein Black-Box-Feed.

### 1.3 Endliche Form (Digital Wellbeing → Vanden Abeele 2021; Sessiongestaltung → Ch. 3.3.4)
Jede Sendung hat eine angekündigte Länge, einen sichtbaren Fortschritt und einen hörbaren Schluss. Keine Anschlussempfehlungen, keine "noch eine Folge"-Hooks, keine Push-Benachrichtigungen.

### 1.4 Ruhige Oberfläche (Wellbeing-Supportive Design → Peters et al. 2020)
Wenig Animationen, kein roter Punkt, keine Counter, keine Like-/Reaction-Mechaniken. Statt "Engagement-Hooks" eher das Gefühl eines klassischen Radios mit transparentem Innenleben.

### 1.5 Bewusste Pausen (Conscious diversification → Ch. 3.3.3 / Milano et al. 2020)
Nach Ende der Sendung wird kein neuer Inhalt vorgeschlagen, sondern aktiv eine Pause empfohlen. Erst eine bewusste Nutzeraktion startet die nächste Sendung.

---

## 2. Informationsarchitektur

Single-Page-App mit drei sichtbaren Bereichen und einem optionalen Detail-Panel. Bewusst flach, weil das Artefakt für eine Pilotstudie mit 5–8 Personen gedacht ist und Navigationskomplexität dem Wellbeing-Ziel widerspricht.

```
┌─────────────────────────────────────────────────────┐
│  Header — Marke "Attune" + Spotify-Status         │
├─────────────────────────────────────────────────────┤
│  ① Profil-Panel                                      │
│     Themen · Standort · Stil · Sendungslänge        │
│     ─ permanent sichtbar                             │
├─────────────────────────────────────────────────────┤
│  ② Sendung                                           │
│     ─ Vor: "Diese Sendung enthält…" (Plan-Vorschau) │
│     ─ Während: Player + Segmentliste + Quelle       │
│     ─ Nach: Abschluss-Karte + Pause-Empfehlung      │
├─────────────────────────────────────────────────────┤
│  ③ Transparenz-Panel (ausklappbar)                   │
│     Quellen · Pipeline-Trace · Profileinfluss       │
└─────────────────────────────────────────────────────┘
```

Im Vergleich zu heute (`page.tsx`): das Profil bleibt permanent sichtbar (nicht nur als Formular unten), die Sendung erhält drei klar getrennte Zustände statt nur "Generierung läuft" / "Sendung läuft", und das Transparenz-Panel ist neu — es ist die UX-seitige Realisierung von Baustein 5.

---

## 3. Screen- und Zustandsinventar

| # | Zustand | Zweck | Bezug |
|---|---------|-------|-------|
| S0 | Onboarding (einmalig, optional) | Profil zum ersten Mal aufnehmen, Studienkontext erklären | Ch. 8.5 (Consent) |
| S1 | Idle / Profil sichtbar | Hörer:in sieht aktuelles Profil und kann es anpassen | Block 1 |
| S2 | Sendungs-Vorschau | "Diese Sendung enthält 8 Segmente, ca. 12 Minuten, davon 2 Nachrichten zu Schweiz und Wirtschaft, 2 Musiktitel, 1 Wetter" | Block 3 + 4 |
| S3 | Generierung läuft | Pipeline-Trace sichtbar (Schritt 1/5: Nachrichten geladen…) | Block 5 |
| S4 | Sendung läuft | Player + aktuelles Segment + Quellen + Fortschritt der Sendung | Block 2 + 5 |
| S5 | Sendungsende | Abschluss-Karte: "Sendung beendet. Bis morgen." + Pause-Empfehlung | Block 4 |
| S6 | Transparenz-Detail | "Warum diese Sendung?" — explizite Profil→Inhalte-Erklärung | Block 5 |
| S7 | Fehler / Mock-Modus | Klare Anzeige, dass externe Quellen nicht erreichbar / Mock aktiv | Block 5 + Datenschutz |

Die Zustände S2 und S5 fehlen heute komplett. S6 ist das fehlende Herzstück von Baustein 5.

---

## 4. Designsystem

Das visuelle Designsystem wird in der Mockup-Phase mit Claude Design neu entworfen; der bestehende Prototyp-Stil ist explizit keine Vorgabe. Methodisch verbindlich sind dagegen drei semantische Schichten und eine Tonalität, die jede konkrete Visualisierung erfüllen muss. Die konkreten Farb- und Typografie-Werte (CSS-Variablen, Tailwind-Tokens) entstehen erst im Rahmen der Stufe C und werden anschliessend in `globals.css` verankert.

### 4.1 Drei semantische Schichten (verbindlich)

| Schicht | Zweck | Bezug |
|---------|-------|-------|
| **AKTION** | Hauptaktionen — "Sendung starten", Play/Pause, Profil "Anpassen" | Selbstbestimmung (SDT-Autonomie) |
| **TRANSPARENZ** | Quellenangaben, Pipeline-Schritte, externe APIs, Datenherkunft | Algorithmische Souveränität (Reviglio & Agosti 2020) |
| **BEGRÜNDUNG** | "Warum diese Sendung?", Profil → Inhalt-Mapping, Diversifikations-Hinweise | Value-Sensitive-Design (Hendry et al. 2021) |

Diese drei Schichten müssen visuell klar voneinander unterscheidbar sein und bewusst als Designentscheidung wirken — nicht als beiläufiger Akzent. Sie sind die UI-seitige Operationalisierung der Werte *Transparenz* und *Algorithmische Souveränität*. Die konkrete Farbwahl pro Schicht wird in der Mockup-Phase mit Claude Design festgelegt, dort begründet und anschliessend in den Code übernommen.

Hinzu kommen eine ruhige, lesefreundliche Basis (Hintergrund + Text), ein Hinweis-/Warnton (Mock-Modus, Fehler) und eine sekundäre Schriftfarbe für Metadaten. Insgesamt strikt reduzierte Akzentdichte — keine fünfte oder sechste Hervorhebungsfarbe.

### 4.2 Typografie

Verbindliche Anforderungen (konkrete Schriftwahl in der Mockup-Phase):

- Sehr gute Lesbarkeit auf Mobile, da Attune ein begleitendes Medium ist
- Klare Hierarchie zwischen Stationsname, Zustands-Überschriften, Segmenttypen, Inhalt und Metadaten
- Keine Display-Schriften für Marketing-Effekt
- Bevorzugt Open-Source / System-fähig (z. B. Inter, IBM Plex, Source Sans, Atkinson Hyperlegible)

### 4.3 Komponentenkatalog

| Komponente | Zweck | Status |
|-----------|-------|--------|
| `ProfilePanel` | Permanent sichtbares Profil mit Inline-Edit | **neu** |
| `ShowPreviewCard` | Plan der nächsten Sendung vor Start | **neu** |
| `PipelineTrace` | Schritt-für-Schritt-Anzeige während Generierung | **neu** |
| `AudioPlayer` | Bestehend, erweitert um Quelle und Sendungs-Fortschritt | erweitert |
| `SegmentList` | Vertikale Liste aller Segmente mit Quellen, aktuelles hervorgehoben | **neu** |
| `SourceLink` | Quelle pro News-Item, Klick öffnet Originalquelle in neuem Tab | **neu** |
| `RationaleCard` | "Warum diese Sendung?" — Profil-Token → Inhalt-Mapping | **neu** |
| `EndOfShowCard` | Abschluss-Karte mit bewusster Pause-Empfehlung | **neu** |
| `PreferenceForm` | Bestehend, ergänzt um Sendungslänge | erweitert |
| `ApiDisclaimer` | Hinweis: "Daten gehen an Anthropic / ElevenLabs / OpenWeatherMap" | **neu** |
| `MockBanner` | Erkennt fehlende API-Keys und kommuniziert Mock-Modus | **neu** |

---

## 5. Schlüsselbildschirme im Detail

### 5.1 Profil-Panel (`ProfilePanel.tsx`) — Baustein 1

Heute ist das Profil nur sichtbar, wenn man das Formular ansieht. Vorschlag: ein permanent oben sichtbares Panel mit drei Lese-Zeilen und einem "Bearbeiten"-Knopf, der die heutige `PreferenceForm` als Modal/Drawer öffnet.

Layout (Lesemodus):

```
┌──────────────────────────────────────────────┐
│ Dein Profil                       [Anpassen] │
│ ──────────────────────────────────────────── │
│ Themen      Politik · Wirtschaft · Sport     │
│ Standort    Zürich                           │
│ Stil        Locker                           │
│ Länge       12 Minuten                       │
└──────────────────────────────────────────────┘
```

Designentscheidungen:
- **Permanent sichtbar** ⇒ erfüllt SDT-Autonomie auf der METUX-Interface-Ebene: Hörer:in sieht jederzeit, was das System über sie weiss.
- **Keine implizite Aktualisierung** ⇒ Profilwerte ändern sich nur durch explizites Submit. Das soll im UI durch das Fehlen von "Verlauf" / "Hörverhalten" auch sichtbar bleiben.
- **Sendungslänge als neues Feld** ⇒ schliesst Audit-Lücke und macht das Wellbeing-Prinzip "endliche Form" deklarierbar (z. B. 8 / 12 / 20 Min).

Erweiterung im Edit-Modus: das bestehende `PreferenceForm` mit folgenden Anpassungen:

```
Themen        [Politik✓] [Sport✓] [Wirtschaft✓] [Kultur ] ...
              ▼ "Maximal 5 Themen empfohlen — bewusste Vielfalt"
              (Hinweistext, kein Hard-Limit — nudge ohne Zwang)

Standort      [Zürich            ]

Stil          ( ) Seriös  (•) Locker  ( ) Energisch

Länge         (•) 8 Min  ( ) 12 Min  ( ) 20 Min
              ▼ "Sendungen enden klar — ohne Anschlussempfehlung"

Serendipity   [✓] Ein unerwartetes Thema pro Sendung
              ▼ "Bewusste Diversifikation gegen Filterblasen"
                                                     [Speichern]
```

Die kleinen kursiven Hinweistexte unter jedem Feld sind die UI-seitige Operationalisierung von Digital Nudging im Sinne der Nutzenden (Weinmann et al. 2016 angewandt mit umgekehrter Zielfunktion). Sie sind in der Thesis explizit als "nicht-manipulative Alternative" argumentierbar.

### 5.2 Sendungs-Vorschau (`ShowPreviewCard.tsx`) — Baustein 3 + 4

Vor dem Klick auf "Sendung starten" zeigt das UI einen kurzen Plan:

```
┌──────────────────────────────────────────────┐
│ Vorschau                                     │
│ ──────────────────────────────────────────── │
│ Geplante Sendung — ca. 12 Minuten            │
│                                              │
│ ▸ Begrüssung                                 │
│ ▸ 3 Nachrichten — Schweiz, Wirtschaft, Sport │
│ ▸ Musik                                      │
│ ▸ Wetter Zürich                              │
│ ▸ Musik                                      │
│ ▸ Verabschiedung                             │
│                                              │
│ ──────────────────────────────────────────── │
│ ⓘ Diese Sendung enthält ein unerwartetes     │
│   Thema (Wissenschaft) gegen Einseitigkeit.  │
│                                              │
│        [Sendung starten · 12 Min]            │
└──────────────────────────────────────────────┘
```

Designentscheidungen:
- **Angekündigte Länge** ⇒ direkt sichtbar im Knopf-Label ("12 Min"). Das ist der Anti-Autoplay-Reflex auf UI-Ebene.
- **Diversifikations-Hinweis** ⇒ Wenn die Kuration ein "Serendipity-Thema" hinzugefügt hat, wird das offengelegt, nicht versteckt. Genau das ist der methodische Pointe: dieselbe Mechanik (Empfehlung) mit umgekehrtem Ziel (Vielfalt statt Engagement) und sichtbar.
- **Plan VOR Generierung** ⇒ Erfüllt Kompetenz-Bedürfnis aus SDT: Hörer:in versteht, was passiert, bevor es passiert.

### 5.3 Pipeline-Trace während Generierung (`PipelineTrace.tsx`) — Baustein 5

Heute zeigt `ShowStatus` nur einen Spinner. Vorschlag: schrittweise Sichtbarmachung der Pipeline.

```
┌──────────────────────────────────────────────┐
│ Sendung wird zusammengestellt                │
│ ──────────────────────────────────────────── │
│ ✓ Nachrichten von SRF, NZZ geladen     0.8s │
│ ✓ Wetter von OpenWeatherMap            0.4s │
│ ◌ Moderationstexte (Claude)         läuft.. │
│ ○ Sprache erzeugen (ElevenLabs)              │
│ ○ Sendung zusammenstellen                    │
└──────────────────────────────────────────────┘
```

Implementierungs-Hinweis: Der Code loggt heute schon `console.log` pro Schritt im Orchestrator. Für die UI braucht es entweder Server-Sent Events (im Techstack-Doc als "Ansatz 2" bereits vorgesehen) oder einen optimistic UI mit fixen Schritten. Für die Pilotstudie reicht der optimistic Ansatz; der SSE-Upgrade ist als Ausblick formulierbar.

### 5.4 Aktiver Player (`AudioPlayer.tsx` erweitert) — Baustein 2 + 5

Heutiger Player ist gut. Erweiterungen:

```
┌──────────────────────────────────────────────┐
│ ⏵ Sendung läuft — 04:32 / 12:00              │
│ ▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░  37%          │
│                                              │
│ Aktuell: NACHRICHTEN  (Segment 3 von 8)      │
│ ──────────────────────────────────────────── │
│  Quelle  SRF · 25.04.2026 14:12              │
│  ↗ Zur Originalquelle                        │
│ ──────────────────────────────────────────── │
│ "Der Bundesrat hat heute…"                   │
│ (Transkript scrollbar)                       │
│ ──────────────────────────────────────────── │
│              [⏮]  [▶ / ⏸]  [⏭]                │
│                                              │
│ Sendung-Übersicht                       ▼    │
│  ✓ Jingle                                    │
│  ✓ Begrüssung                                │
│  ▶ Nachrichten ← aktuell                     │
│  ◌ Musik · "Track-Name"                      │
│  ◌ Wetter                                    │
│  ◌ ...                                       │
└──────────────────────────────────────────────┘
```

Designentscheidungen:
- **Sendungs-Fortschritt zusätzlich zum Segment-Fortschritt** ⇒ visualisiert die endliche Form. Hörer:in sieht, dass die Sendung in 7:28 Min vorbei ist — nicht "nächste Empfehlung in 0:30".
- **Quellenangabe pro News-Segment** ⇒ schliesst direkt die Lücke aus dem Audit (`NewsArticle.url` existiert in `types.ts`, wird aber nicht angezeigt).
- **Sendungs-Übersicht aufklappbar** ⇒ erlaubt das Vorschauen zukünftiger Segmente und unterstützt Kompetenz-Erleben aus SDT. Ist explizit *kein* Skip-Mechanismus auf willkürliche Stelle (wir behalten lineare Vorwärtsskips), sondern transparent macht, was kommt.
- **Keine Like/Skip/Reaktions-Buttons** ⇒ bewusste Auslassung. Begründbar in der Thesis als "fehlende Engagement-Hooks".

### 5.5 Sendungsende (`EndOfShowCard.tsx`) — Baustein 4

```
┌──────────────────────────────────────────────┐
│ ●  Sendung beendet                           │
│                                              │
│ Du hast 12 Minuten gehört.                   │
│ Bis zur nächsten Sendung — am besten morgen. │
│                                              │
│  [ Profil anpassen ]                         │
│  [ Neue Sendung jetzt ]                      │
│                                              │
│ ⓘ Attune schlägt nichts automatisch vor.   │
│   Eine Pause hier ist Teil des Konzepts.     │
└──────────────────────────────────────────────┘
```

Designentscheidungen:
- **Pause-Empfehlung als positive Botschaft** ⇒ Anti-Autoplay-Pattern auf der Behavior-Ebene des METUX-Modells. Diese Karte ist das UI-Pendant zur These "definierte Sessiongestaltung".
- **"Neue Sendung jetzt"-Knopf bewusst sekundär** ⇒ keine Cliffhanger, aber auch keine Bevormundung. Hörer:in entscheidet, ist aber explizit informiert.
- **Erklärtext ⓘ** ⇒ erfüllt das Versprechen aus Ch. 3.3.4 ("hörbares Ende, keine algorithmischen Cliffhanger") sichtbar als Designentscheidung, nicht als Versäumnis.

### 5.6 "Warum diese Sendung?" (`RationaleCard.tsx`) — Baustein 5

Erreichbar über einen kleinen Knopf in der Sendungs-Übersicht oder am Ende. Mapping Profil → Inhalt:

```
┌──────────────────────────────────────────────┐
│ Warum diese Sendung?                         │
│ ──────────────────────────────────────────── │
│ Du hast diese Profilangaben gemacht:         │
│  ▪ Themen: Politik, Wirtschaft, Sport        │
│  ▪ Standort: Zürich                          │
│  ▪ Stil: Locker                              │
│                                              │
│ Daraus wurde:                                │
│  → Politik-Nachricht aus SRF                 │
│  → Wirtschafts-Nachricht aus NZZ             │
│  → Sport-Nachricht aus SRF                   │
│  → Wissenschaft-Nachricht (Serendipity)      │
│  → Wetter für Zürich                         │
│  → Moderationsstil "locker" → Voice "casual" │
│                                              │
│ Pipeline:                                    │
│  RSS → Auswahl (max 1/Thema + 1 Diversität)  │
│  → Claude Sonnet (Texte) → ElevenLabs (TTS)  │
│                                              │
│ ⓘ Es gibt kein Verhaltens-Tracking. Deine    │
│   Hör-Daten verlassen den Browser nicht.     │
└──────────────────────────────────────────────┘
```

Diese Karte ist die *konkrete* Operationalisierung von algorithmischer Souveränität (Reviglio & Agosti 2020). Sie ist methodisch der wichtigste neue UI-Baustein — sie ist es, was Attune vom redaktionellen oder vom engagement-getriebenen Modell sichtbar unterscheidet (Ch. 2.4 Tabelle).

### 5.7 API-Disclaimer und Mock-Modus

Eine kleine, persistente Zeile am Fuss der App:

```
ⓘ Diese Sendung nutzt: Anthropic Claude · ElevenLabs · 
   OpenWeatherMap · RSS von SRF und NZZ.
   Keine Tracker, keine Werbung.
```

Im Mock-Modus (API-Key fehlt) ein deutlich sichtbarer Banner:

```
⚠ Mock-Modus aktiv — Nachrichten und Wetter sind Beispieldaten.
```

Beides schliesst Audit-Lücken (Datenschutz, klare UI-Hinweise).

---

## 6. Mapping: Thesis-Baustein ↔ Screen ↔ Theorie

Diese Tabelle ist nicht nur Designdokumentation, sondern direkt verwendbar als Inhalt für **Kapitel 6.5** ("Mapping table values → design decisions") deiner Disposition.

| Baustein (Ch. 3.3) | Screen / Komponente | SDT-Bedürfnis | METUX-Ebene | Sekundäre Theorie |
|--------------------|---------------------|---------------|-------------|-------------------|
| 1 — Profil | `ProfilePanel`, erweiterte `PreferenceForm` | Autonomie | Interface, Behavior | VSD: Wert "Selbstbestimmung" |
| 2 — Pipeline | `AudioPlayer`, `SegmentList` | Kompetenz | Task | Recommender Systems Handbook (Ricci et al. 2015) |
| 3 — Kuration | `ShowPreviewCard` (Diversitätshinweis), Serendipity-Toggle | Autonomie + Kompetenz | Task, Life | Milano et al. 2020 (Diversität) |
| 4 — Session | `EndOfShowCard`, fixe Sendungslänge im Knopf | Autonomie | Behavior, Life | Vanden Abeele 2021 (Digital Wellbeing als Balance) |
| 5 — Transparenz | `PipelineTrace`, `RationaleCard`, `SourceLink`, `ApiDisclaimer` | Autonomie + Kompetenz | Adoption, Interface, Life | Reviglio & Agosti 2020 (Algorithmic Sovereignty); Hendry et al. 2021 (VSD) |

---

## 7. Was im Vergleich zu Engagement-Plattformen *fehlt* — und das ist Absicht

Diese Negativ-Liste ist ein eigenständiger Designbeitrag. Sie wird in Kapitel 6.4 / 7 der Thesis benötigt, um zu zeigen, dass Wellbeing-Orientierung nicht durch das Hinzufügen von Wellbeing-Features erreicht wird, sondern durch das systematische Weglassen problematischer Muster.

| Engagement-Pattern | Bei Attune bewusst nicht vorhanden | Begründung |
|--------------------|-------------------------------------|------------|
| Like / Heart / Reaction | – | Keine variable Belohnung (Montag et al. 2019) |
| Streak-Counter / "Tage in Folge" | – | Keine künstliche Bindung (Persuasive Tech kritisch) |
| "Empfohlen für dich"-Anschluss | – | Sessiongestaltung Ch. 3.3.4 |
| Push-Benachrichtigungen | – | Ch. 1.3 explizit als problematisch markiert |
| Roter Badge / Counter | – | Kein Hooking-Mechanismus |
| Endlos-Scroll / Autoplay | – | Definierte Form, hörbares Ende |
| Variable Sendungslänge zur Maximierung | Sendungslänge ist deklariert | Autonomie schlägt Optimierung |
| Verhaltens-getriebenes Profil | Nur explizit deklariert | Algorithmische Souveränität |
| Versteckte Quellen | Quelle pro News sichtbar | Transparenz |

---

## 8. Empfohlener Liefer-Pfad

Vier Stufen, jede für sich abnehmbar.

### Stufe A — Konzeptdokument (dieses Dokument)
Status: vorgelegt. Zweck: Diskussionsgrundlage mit Betreuer Alexandre de Spindler, gleichzeitig Vorstufe für Kapitel 6 (Design) der Disposition.

### Stufe B — Wireframes / Low-Fi-Mockups
Liefergegenstand: Entweder als HTML-Prototyp oder als statische Bilder, die alle Zustände S1–S7 zeigen. Aufwand: 1 Sitzung. Vorteil: schnelles Feedback, ohne Code zu touchen.

### Stufe C — High-Fi-Mockup im neuen Designsystem
Liefergegenstand: visuelle Mockups aller Zustände im mit Claude Design neu entworfenen Designsystem (drei semantische Schichten, Palette, Typografie). Optional zusätzlich als nicht-verkabelter React-Prototyp innerhalb von `attune-app/` (z. B. `/preview`-Route) mit Tailwind-Styling und realistischen Daten. Aufwand: 1–2 Tage. Vorteil: realistische Wahrnehmung, nutzbar für erstes informelles Feedback und Diskussion mit dem Betreuer.

### Stufe D — Implementierung in den Live-Code
Reihenfolge nach Audit-Priorität:
1. `ProfilePanel` + Sendungslänge-Feld → schliesst Block 1 zu 100 %.
2. `RationaleCard` + `SourceLink` + `ApiDisclaimer` → bringt Block 5 von 0 % auf ca. 80 %.
3. Kurations-Refactor: explizite `selectNews()`, `pickDaypartTone()`, `addSerendipity()` als benannte Funktionen → Block 3 auf ca. 80 %.
4. `ShowPreviewCard` + erweiterter Player + `EndOfShowCard` → Block 4 auf 100 %.
5. `PipelineTrace` (optional via SSE-Upgrade) → Block 2/5 weiter geschärft.

Aufwand: realistisch 3–5 Tage konzentrierte Arbeit, gut machbar in einem Sprint vor dem Pilottest mit den ersten 3 Personen.

---

## 9. Was als Nächstes zu entscheiden ist

Bevor wir in Stufe B/C einsteigen, brauche ich von dir Antworten auf vier Fragen:

1. **Reichweite**: sollen wirklich alle sieben Zustände (S1–S7) gestaltet werden, oder konzentrieren wir uns auf S1, S4, S5, S6 (Profil, Player, Ende, Begründung) als Mindestumfang?
2. **Detailgrad der Begründungs-Karte**: in welchem Detailgrad sollen Pipeline-Schritte angezeigt werden — als grobe Liste oder als technisches Trace mit Modellnamen, Token-Anzahl, Zeitstempel?
3. **Onboarding (S0)**: brauchen wir einen Onboarding-Flow für Pilot-Teilnehmer:innen (mit Studieneinwilligung), oder läuft das offline mit Papier?
4. **Tonalität der Texte**: sollen die UI-Hilfetexte (z. B. "Bewusste Diversifikation gegen Filterblasen") in dieser leicht didaktischen Form bleiben, oder neutraler formuliert werden?

Sobald diese vier Punkte geklärt sind, kann ich direkt mit Stufe B (Wireframes) oder C (Code-Prototyp) weitermachen.
