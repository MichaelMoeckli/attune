# Claude Design — Starter-Prompts für Radio 25

Stand: 26. April 2026
Drei Prompts in Reihenfolge: (1) Kontext-Briefing, (2) Designsystem, (3) Screen-Generierung pro Zustand. Du kannst alle drei nacheinander einfügen oder Prompt 1 + 2 zusammenfassen, falls Claude Design ein einzelnes grosses Brief erlaubt.

---

## PROMPT 1 — Kontext-Briefing (zuerst senden)

```
Ich gestalte das UI für "Radio 25" — ein vollautomatisiertes,
KI-gestütztes Radio, das ich als BSc-Thesis-Artefakt an der ZHAW
entwickle. Das Projekt ist eine Konzeptstudie für nutzerzentrierte
Personalisierung im Kontext von Digital Wellbeing.

Das methodische Kernanliegen: dieselbe Technologie (LLM, TTS,
Empfehlungslogik), die in heutigen Plattformen das Engagement
maximiert, soll konsequent auf Nutzerwohl ausgerichtet sein. Jede
UI-Entscheidung muss zwei Tests bestehen:

1. Theoriebezug — verankert in Self-Determination Theory (Ryan &
   Deci), METUX-Modell (Peters, Calvo & Ryan), Digital Wellbeing
   (Vanden Abeele) oder algorithmischer Souveränität (Reviglio &
   Agosti).

2. Anti-Engagement-Test — vermeidet systematisch manipulative
   Designmuster: kein endloses Scrollen, kein Autoplay, keine
   Like/Reaction-Buttons, keine Streak-Counter, keine Push-Hooks,
   keine variablen Belohnungen, keine "empfohlen für dich"-
   Anschlüsse, kein roter Badge, kein versteckter Algorithmus.

Fünf Designprinzipien:

1. Sichtbare Selbstbestimmung — alles, was die Sendung formt, ist
   permanent einseh- und veränderbar.

2. Lesbare Algorithmik — vor jeder Sendung steht eine knappe
   Erklärung, warum diese Inhalte gewählt wurden, aus welchen
   Quellen sie stammen, welche Pipeline-Schritte sie durchlaufen
   haben.

3. Endliche Form — jede Sendung hat eine angekündigte Länge
   (8/12/20 Min), einen sichtbaren Fortschritt, einen hörbaren
   Schluss, keine Anschlussempfehlung.

4. Ruhige Oberfläche — wenig Animationen, keine Counter, keine
   Like/Reaction-Mechaniken. Eher Gefühl eines klassischen Radios
   mit transparentem Innenleben.

5. Bewusste Pausen — nach Ende der Sendung wird kein neuer Inhalt
   vorgeschlagen, sondern aktiv eine Pause empfohlen.

Sprache aller UI-Texte: Deutsch (Schweizer Hochdeutsch). Zielgruppe:
5–8 Pilotteilnehmer:innen aus dem Bekanntenkreis, später ein
einwöchiger Test. Der Tech-Stack ist Next.js 15, React 19,
TypeScript, Tailwind CSS 4 — Mockups sollten mit diesem Stack
realisierbar sein.

Bitte bestätige, dass du den Kontext erfasst hast, bevor wir mit
dem Designsystem und den Screens weitermachen.
```

---

## PROMPT 2 — Designsystem (danach)

```
Wichtig: Bitte ignoriere bestehende Design-Hinweise aus dem
hochgeladenen Code von radio25-app. Ich möchte ein frisches
visuelles Design, das aus den Thesis-Prinzipien neu entsteht —
nicht aus dem aktuellen Prototyp abgeleitet.

Stattdessen entwirfst du das Designsystem auf Basis dieser
Anforderungen:

GEFÜHL:
Die Anmutung soll an ein klassisches Radio mit transparentem
Innenleben erinnern — eher ruhiges, aufgeräumtes Hörgerät als
moderne Social-App. Anti-Vorbilder: TikTok, Instagram, alle
engagement-getriebenen Plattformen mit ihren Counter-Reizen,
Reaction-Buttons und Empfehlungs-Karussellen. Positive
Inspirationen: Hardware-Radios, BBC Sounds, klassische
Hi-Fi-Geräte, Public-Service-Player.

FARBPALETTE:
Du wählst die Palette. Die einzigen Vorgaben:
- Eine ruhige, lesefreundliche Basis (hell oder dunkel — beides
  diskutierbar; bitte begründe deine Wahl mit Bezug auf
  Wellbeing-Forschung wie Ermüdungsarmut, Lesbarkeit, Ruhe)
- Genau ein Primärakzent für Hauptaktionen (Play, Sendung
  starten)
- Eine eigene, klar unterscheidbare visuelle Schicht für
  TRANSPARENZ-Elemente (Quellenangaben, Pipeline-Trace) — diese
  Schicht soll als bewusster Designentscheid sichtbar sein, nicht
  als beiläufiger Akzent
- Eine eigene, klar unterscheidbare Schicht für BEGRÜNDUNGS-
  Elemente ("Warum diese Sendung?", Profil → Inhalt-Mapping) —
  visuell verwandt mit, aber unterscheidbar von Transparenz
- Reduzierte Akzentdichte — keine fünfte oder sechste
  Hervorhebungsfarbe

Diese drei semantischen Schichten (Aktion / Transparenz /
Begründung) sind wichtiger als konkrete Farbnamen. Sie sind die
visuelle Operationalisierung von Value-Sensitive-Design: der Wert
"Transparenz" und der Wert "Algorithmische Souveränität"
bekommen jeweils einen eigenen visuellen Code.

TYPOGRAFIE:
Du wählst die Schrift. Anforderungen:
- Sehr gute Lesbarkeit auf Mobile, da begleitendes Hörmedium
- Klare Hierarchie zwischen Stationsname, Segmenttyp, Inhalt,
  Metadaten
- Keine Display-Schriften für Marketing-Effekt
- Bevorzugt Open-Source / System-fähig (Inter, IBM Plex, Source
  Sans, Atkinson Hyperlegible o.ä.)

LAYOUT:
- Mobile-first
- Großzügige Innenabstände, Inhalte dürfen atmen
- Sparsamer Einsatz von Linien, Trennern und Schatten — Ruhe
  vor Dichte

TON DER UI-TEXTE:
- Leicht didaktisch, aber nicht belehrend
- Erklärt Designentscheidungen offen (z.B. "Bewusste
  Diversifikation gegen Filterblasen" als Hinweistext unter dem
  Themen-Selektor)
- Nutzt aktive Sprache, "Du"-Form
- Keine Marketing-Sprache, keine Übertreibungen

ABSOLUT VERMEIDEN:
- Knallige Gradients oder Glassmorphism-Effekte ohne Funktion
- Animierte Mikro-Belohnungen (Konfetti, pulsierende Hearts etc.)
- Counter-Optik (rote Punkte, Zähler, Streaks)
- Marketing-mäßige Hero-Sections oder CTA-Schichten

Schlage zuerst die Palette und die Typografie vor (mit kurzer
Begründung pro Wahl), bevor wir zu den Screens übergehen.
```

---

## PROMPT 3 — Erste Screen-Generierung

Wahlweise alle sieben auf einmal oder einzeln. Empfehlung: einzeln, beginnend mit den drei wichtigsten (S1, S4, S6).

### Variante A: Alle Screens auf einmal

```
Generiere bitte sieben Screens / Zustände für Radio 25 als
Mobile-Mockup im Designsystem, das du gerade vorgeschlagen hast.
Jeder Screen ist eine eigene Ansicht derselben Single-Page-App.
Verwende konsequent die drei semantischen Schichten:
AKTION (Primärakzent), TRANSPARENZ (Quellen-Schicht),
BEGRÜNDUNG (Warum-Schicht).

S1 — IDLE / PROFIL SICHTBAR
Hauptzustand wenn keine Sendung läuft. Zeigt:
- Header mit Titel "Radio 25"
- Profil-Panel mit Lese-Zeilen:
  Themen: Politik · Wirtschaft · Sport
  Standort: Zürich
  Stil: Locker
  Länge: 12 Minuten
  Knopf "Anpassen" rechts oben
- Großer Primärknopf in der AKTIONS-Schicht: "Sendung starten · 12 Min"
- Footer-Zeile (klein, in sekundärem Text): "Diese Sendung nutzt:
  Anthropic Claude · ElevenLabs · OpenWeatherMap · RSS von SRF
  und NZZ. Keine Tracker, keine Werbung."

S2 — SENDUNGS-VORSCHAU
Erscheint zwischen "Sendung starten" und Generierung. Zeigt:
- Überschrift "Vorschau"
- "Geplante Sendung — ca. 12 Minuten"
- Liste der Segmente mit Pfeil-Icons:
  ▸ Begrüssung
  ▸ 3 Nachrichten — Schweiz, Wirtschaft, Sport
  ▸ Musik
  ▸ Wetter Zürich
  ▸ Musik
  ▸ Verabschiedung
- Trenner, dann ein Hinweis in der BEGRÜNDUNGS-Schicht mit
  ⓘ-Icon: "Diese Sendung enthält ein unerwartetes Thema
  (Wissenschaft) gegen Einseitigkeit."
- Primärknopf unten in der AKTIONS-Schicht: "Sendung starten · 12 Min"

S3 — GENERIERUNG LÄUFT (Pipeline-Trace)
- Überschrift "Sendung wird zusammengestellt"
- Schrittliste mit Status-Icons (✓ erledigt, ◌ läuft, ○ wartet)
  und Zeitangaben rechts:
  ✓ Nachrichten von SRF, NZZ geladen      0.8s
  ✓ Wetter von OpenWeatherMap             0.4s
  ◌ Moderationstexte (Claude)         läuft...
  ○ Sprache erzeugen (ElevenLabs)
  ○ Sendung zusammenstellen
- Quellen / Service-Namen in der TRANSPARENZ-Schicht

S4 — SENDUNG LÄUFT (aktiver Player)
- Header mit Sendungs-Fortschritt: "⏵ Sendung läuft — 04:32 / 12:00"
- Fortschrittsbalken in der AKTIONS-Schicht
- Kennung: "Aktuell: NACHRICHTEN (Segment 3 von 8)"
- Quellen-Block in der TRANSPARENZ-Schicht:
  Quelle: SRF · 25.04.2026 14:12
  ↗ Zur Originalquelle
- Transkript-Box (scrollbar, klein, sekundärer Text)
- Player-Controls: ⏮ ⏸ ⏭ (Pause-Icon weil läuft)
- Sendung-Übersicht aufklappbar:
  ✓ Jingle
  ✓ Begrüssung
  ▶ Nachrichten ← aktuell (in Aktionsschicht hervorgehoben)
  ◌ Musik · "Track-Name"
  ◌ Wetter
  ◌ ...

S5 — SENDUNGSENDE
- Großes ruhiges Symbol oben (statisch, nicht animiert)
- Überschrift "Sendung beendet"
- Text: "Du hast 12 Minuten gehört."
- Text: "Bis zur nächsten Sendung — am besten morgen."
- Zwei Knöpfe gleichwertig (sekundär, Outline):
  [Profil anpassen]
  [Neue Sendung jetzt]
- Hinweistext in der BEGRÜNDUNGS-Schicht mit ⓘ: "Radio 25
  schlägt nichts automatisch vor. Eine Pause hier ist Teil des
  Konzepts."

S6 — "WARUM DIESE SENDUNG?" (Begründungs-Karte)
- Überschrift "Warum diese Sendung?" in der BEGRÜNDUNGS-Schicht
- Block 1: "Du hast diese Profilangaben gemacht:"
  ▪ Themen: Politik, Wirtschaft, Sport
  ▪ Standort: Zürich
  ▪ Stil: Locker
- Block 2: "Daraus wurde:"
  → Politik-Nachricht aus SRF
  → Wirtschafts-Nachricht aus NZZ
  → Sport-Nachricht aus SRF
  → Wissenschaft-Nachricht (Serendipity) — in der BEGRÜNDUNGS-Schicht
  → Wetter für Zürich
  → Moderationsstil 'locker' → Voice 'casual'
- Block 3: "Pipeline:"
  RSS → Auswahl (max 1/Thema + 1 Diversität)
  → Claude Sonnet (Texte) → ElevenLabs (TTS)
- Hinweis unten in sekundärem Text: "Es gibt kein Verhaltens-
  Tracking. Deine Hör-Daten verlassen den Browser nicht."

S7 — MOCK-MODUS BANNER
Banner oben auf S1, deutlich sichtbar (Warnton aus deinem
Designsystem):
- ⚠ Icon
- Text: "Mock-Modus aktiv — Nachrichten und Wetter sind
  Beispieldaten."

WICHTIG für ALLE Screens:
- KEINE Like-/Heart-/Reaction-Buttons
- KEINE Streak- oder Tage-Counter
- KEINE "Empfohlen für dich"-Sektion
- KEINE roten Badges, keine Notification-Indikatoren
- KEINE infinity-scroll-Anmutung
```

### Variante B: Drei Screens als Minimum (S1, S4, S6)

Falls du klein anfangen willst, sende nur die drei Schlüssel-Screens:

```
Beginnen wir mit drei Schlüssel-Screens im Designsystem, das du
gerade vorgeschlagen hast. Verwende konsequent die drei
semantischen Schichten AKTION / TRANSPARENZ / BEGRÜNDUNG.

1. S1 — Idle: Profil permanent sichtbar (Themen, Standort, Stil,
   Länge) + "Sendung starten · 12 Min"-Knopf in der AKTIONS-
   Schicht. Footer mit dezenter API-/Datenschutz-Zeile.

2. S4 — Aktiver Player: Sendungs-Fortschritt (04:32 / 12:00),
   aktuelles Segment "Nachrichten" mit Quellenangabe in der
   TRANSPARENZ-Schicht (SRF, Zeitstempel, Link "Zur
   Originalquelle"), Transkript, Player-Controls, aufklappbare
   Sendungs-Übersicht aller acht Segmente.

3. S6 — "Warum diese Sendung?": drei Blöcke in der BEGRÜNDUNGS-
   Schicht — (a) deine Profilangaben, (b) konkrete daraus
   abgeleitete Inhalte mit Quellenzuordnung, (c) Pipeline-Schritte
   RSS → Auswahl → Claude → ElevenLabs. Datenschutz-Hinweis am
   Fuss.

[detaillierte Inhalte siehe Variante A für S1, S4, S6 — bitte
genau diese Inhalte verwenden, nur in deinem neuen visuellen
Design]
```

---

## Iterations-Prompts (für Feinjustierung)

Nachdem die ersten Mockups da sind, kannst du gezielt nachschärfen:

**Falls zu generisch:**

```
Die Mockups sind zu sehr "moderne App". Radio 25 soll die
Anmutung eines klassischen Radios mit transparentem Innenleben
haben. Reduziere visuelle Spielereien, verstärke die
Lesbarkeit der Quellen- und Begründungs-Blöcke. Inspiration:
SRF Radio Player, BBC Sounds — aber konsequenter mit
Transparenz-Schicht.
```

**Falls Quellen zu unauffällig:**

```
Die Quellenangaben (SRF, NZZ, OpenWeatherMap) sind das
methodische Herzstück. Bitte die TRANSPARENZ-Schicht stärker
hervorheben: klar abgesetzter Bereich (Linie oder Box) statt
beiläufiger Inline-Text, Klick-Affordance auf "↗ Zur
Originalquelle" deutlicher.
```

**Falls Anti-Engagement zu unsichtbar:**

```
Ergänze auf S5 (Sendungsende) und S2 (Vorschau) je eine kleine
"Was Radio 25 NICHT macht"-Note: kleine Liste in dezenter
sekundärer Schriftfarbe, am Fuss der Karte:
"Radio 25 hat keine Likes, keine Streaks, kein Autoplay.
Das ist Absicht."
```

---

## Handoff zu Claude Code (am Ende)

Wenn die Mockups stehen, nutze Claude Designs eingebauten Code-Handoff:

```
Bitte verpacke das Design als Handoff-Bundle für Claude Code.
Ziel-Repository: radio25-app/ (Next.js 15, React 19, TypeScript,
Tailwind CSS 4). Bestehende Komponenten, die erweitert werden
sollen statt neu erstellt: AudioPlayer.tsx, PreferenceForm.tsx,
ShowStatus.tsx, page.tsx. Neue Komponenten: ProfilePanel.tsx,
ShowPreviewCard.tsx, PipelineTrace.tsx, RationaleCard.tsx,
EndOfShowCard.tsx, SourceLink.tsx, ApiDisclaimer.tsx.

Implementierungs-Reihenfolge nach Audit-Priorität:
1. ProfilePanel + Sendungslänge in PreferenceForm
2. RationaleCard + SourceLink + ApiDisclaimer
3. ShowPreviewCard + erweiterter AudioPlayer + EndOfShowCard
4. PipelineTrace (optional via SSE)
```
