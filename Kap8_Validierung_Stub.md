# Kapitel 8 — Validierung (Stub-Texte)

> **Hinweis:** Diese Datei enthält die Stub-Texte für das nach Empfehlung C des Dozenten neu strukturierte Validierungskapitel sowie das angepasste Diskussionskapitel. Inhalte sind als Platzhalter formuliert — sie umreissen die Funktion jedes Abschnitts und sollen während der Pilottest-Vorbereitung mit konkreten Items, Setup-Details und Ergebnissen ausgefüllt werden.
>
> **Einbindung in Hauptdokument.docx:**
> 1. Variante A — Pandoc: `pandoc Kap8_Validierung_Stub.md -o Kap8_Validierung_Stub.docx` und dann den Inhalt per Copy-Paste oder über «Text aus Datei einfügen» in `Hauptdokument.docx` an Stelle des bisherigen Kap. 8 einfügen.
> 2. Variante B — Word direkt: Datei in einem Markdown-fähigen Editor öffnen (z. B. Typora, Obsidian), Inhalt kopieren, in Word einfügen, Überschriftenformate (H1/H2) zuweisen.

---

## 8 Validierung

Das vorliegende Kapitel beantwortet die Frage, **ob Radio 25 als Forschungsartefakt funktioniert, akzeptiert wird und die im theoretischen Rahmen (Kap. 2) hergeleiteten Wirkungen tatsächlich entfaltet**. Auf Empfehlung des Dozenten folgt die Validierung einer dreiteiligen Logik: **Machbarkeitsnachweis** (Funktioniert das Artefakt zuverlässig?), **Usability und Akzeptanz** (Wird es als bedienbar und nützlich empfunden?) und **Wirkung** (Erleben Nutzende die intendierten Effekte hinsichtlich Autonomie, Wohlbefinden und algorithmischer Souveränität?). Ergänzt wird die Validierung durch einen allgemeinen Fragebogenteil mit demographischen Daten sowie einem kombinierten Studienformat aus 1-maliger Nutzung und längerer Nutzungsphase.

### 8.1 Validierungsdesign

Das Validierungsdesign verbindet die Methodikgrundlagen aus Kapitel 5 mit den Erfolgskriterien aus Kapitel 4. Pro Validierungsstrang werden Erhebungsinstrumente, Datenquellen und Auswertungsverfahren benannt. Eine Übersichtsabbildung (geplant) visualisiert das Zusammenspiel der drei Stränge sowie die Verzahnung mit dem zweistufigen Studienformat.

*[Hier später: Tabelle „Validierungsstrang → Datenquelle → Erhebungsinstrument → Auswertungsverfahren" einfügen.]*

### 8.2 Machbarkeitsnachweis (Proof of Concept)

Der Machbarkeitsnachweis zeigt, dass die in Kap. 6 entworfene und in Kap. 7 implementierte Pipeline tatsächlich durchgehend lauffähig ist und das versprochene Ergebnis — eine personalisierte, hörbare Sendung — zuverlässig liefert.

#### 8.2.1 Funktionsnachweis durch den Prototyp

Der Prototyp wird über einen End-to-End-Durchlauf demonstriert: vom Aufruf der Webapplikation über die Datenabfrage (RSS, Wetter), die LLM-gestützte Textgenerierung, die Sprachsynthese (ElevenLabs) bis zur ausgespielten Sendung. Beleg ist eine reproduzierbare Beispielsendung (siehe Anhang E) sowie eine Aufzeichnung des Pipeline-Durchlaufs.

#### 8.2.2 Unit Tests und automatisierte Funktionstests

Pro Pipeline-Komponente werden automatisierte Tests dokumentiert: Datenintegration (RSS-Parser, Wetter-API), Personalisierungslogik (Profilauflösung, Diversifikationsregeln), LLM-Aufrufe (Prompt-Korrektheit, Antwortvalidierung), TTS-Integration (Audiopfad-Generierung). Tabellarische Auflistung der Testabdeckung pro Modul.

*[Hier später: Tabelle mit Testabdeckung und konkreten Test-Cases einfügen.]*

#### 8.2.3 Nicht-funktionale Aspekte

Erfasst werden Latenz pro Pipeline-Schritt, Gesamtkosten pro Sendung (LLM-Tokens, TTS-Minuten), Fehlerraten (z. B. Halluzinationen, fehlgeschlagene API-Calls) und Stabilität bei wiederholter Ausführung. Messungen erfolgen über mindestens 20 generierte Sendungen.

### 8.3 Usability und Akzeptanz

Da für Radio 25 als wellbeing-orientiertes Medienartefakt kein etabliertes Akzeptanz-Instrument existiert, wird das Erhebungsinstrument **selbst konstruiert** und an etablierten Modellen ausgerichtet.

#### 8.3.1 Instrumentenwahl

Das Instrument lehnt sich an drei etablierte Modelle an:
- **SUS (System Usability Scale)** — standardisierter Score zur generellen Bedienbarkeit
- **TAM (Technology Acceptance Model)** — wahrgenommene Nützlichkeit und Bedienleichtigkeit
- **UTAUT (Unified Theory of Acceptance and Use of Technology)** — erweiterte Akzeptanzdimensionen (Erwartung, sozialer Einfluss, erleichternde Bedingungen)

#### 8.3.2 Eigenkonstruktion der Frage-Items

Die spezifischen Items werden mit LLM-Unterstützung (GPT bzw. Claude) auf Basis der konkreten Einstellungsmöglichkeiten der Radio-25-Webapplikation formuliert. **Pro Einstellungsmöglichkeit** (z. B. Sendungslänge, Themenpräferenzen, Stimmenwahl, Diversifikationsgrad, Transparenzanzeige) wird ein dreigeteiltes Item-Set erhoben:

1. **Was gefällt an dieser Einstellung?** (Was wird positiv wahrgenommen?)
2. **Was wird als unnötig empfunden?** (Was könnte wegfallen?)
3. **Was würdest du dir zusätzlich wünschen?** (Welche Erweiterung ist gewünscht?)

Dieses Vorgehen erlaubt eine feingranulare, einstellungsbezogene Bewertung statt einer pauschalen Akzeptanzaussage.

#### 8.3.3 SUS-Score als standardisierter Vergleichswert

Zusätzlich zum eigenkonstruierten Item-Set wird der SUS-Fragebogen (deutsche Version, siehe Anhang B) eingesetzt, um einen vergleichbaren Score zu erhalten.

#### 8.3.4 Qualitative Freitexte

Offene Fragen zur Bedienlogik und zur Transparenzanzeige ergänzen die quantitativen Items.

### 8.4 Wirkung

Die Wirkungs-Items werden **direkt aus dem theoretischen Rahmen in Kapitel 2 abgeleitet**. Damit prüft die Studie nicht abstrakte Wohlbefindensaussagen, sondern die spezifischen Konstrukte, mit denen das Artefakt begründet wurde.

#### 8.4.1 Wirkungsitems aus dem theoretischen Rahmen

| Theoretischer Bezug (Kap. 2) | Konstrukt | Beispiel-Itemtyp |
|---|---|---|
| 2.3.1 SDT/METUX | Autonomieerleben | „Ich konnte Radio 25 nach meinen eigenen Bedürfnissen einstellen." |
| 2.3.1 SDT/METUX | Kompetenzerleben | „Ich verstehe, was Radio 25 mir warum vorschlägt." |
| 2.3.1 SDT/METUX | Verbundenheit | „Die Sendungen wirkten auf mich relevant für mein Umfeld." |
| 2.3.2 VSD | Werteorientierung | „Radio 25 entspricht meinen Vorstellungen davon, wie Mediennutzung sein sollte." |
| 2.3.3 Digital Wellbeing | Wohlbefinden in der Nutzung | „Nach dem Hören fühlte ich mich informiert, ohne überfordert zu sein." |
| 2.3.4 Algorithmische Souveränität | Transparenz | „Mir war klar, woher die Inhalte stammen." |
| 2.3.4 Algorithmische Souveränität | Steuerbarkeit | „Ich hatte das Gefühl, das System zu kontrollieren — und nicht umgekehrt." |
| 2.3.4 Algorithmische Souveränität | Vertrauen | „Ich vertraue der Auswahl, die Radio 25 mir präsentiert." |

*[Items werden vor dem Pilottest finalisiert, mit GPT/Claude vorformuliert und mit dem Betreuer abgestimmt.]*

#### 8.4.2 Items zu Information und Unterhaltung

Da Radio 25 ein Medienartefakt ist, werden zwei klassische Gebrauchszwecke explizit abgefragt: **Wie informativ wurde die Sendung erlebt?** und **Wie unterhaltsam wurde die Sendung erlebt?** Diese Items dienen als Kontrollvariablen — ein wellbeing-orientiertes Radio darf nicht auf Kosten der Grundfunktion gehen.

#### 8.4.3 Awareness-Items

Ein zentraler Anspruch des Artefakts ist es, das Bewusstsein für Limitationen algorithmischer Auswahl zu schärfen. Items dazu erheben:
- Bewusstsein für **Filterblasen / Echokammern** (z. B. „Mir wurde durch Radio 25 bewusst, dass meine Mediennutzung normalerweise selektiv ist.")
- Bewusstsein für **Bias** (z. B. in der Themenauswahl, in der Tonalität)
- Bewusstsein für **Grenzen des Systems** (z. B. „Ich konnte einschätzen, wo das System an seine Grenzen kommt.")

### 8.5 Allgemeiner Fragebogen

#### 8.5.1 Demographische Daten

Erhoben werden: Alter, Geschlecht, höchster abgeschlossener Bildungsgrad, beruflicher Hintergrund (zur späteren Stratifizierung).

#### 8.5.2 Mediennutzungsverhalten

Genutzte Newsquellen (Mehrfachnennung), durchschnittliche Hördauer Radio/Podcast, Nutzung sozialer Medien als Newsquelle (zur Einordnung der Antworten in den jeweiligen Mediennutzungskontext).

#### 8.5.3 Allgemeine Wahrnehmung

Offene Freitextfragen zum Gesamteindruck: «Wie würdest du Radio 25 jemandem in einem Satz beschreiben?», «Was fehlt dir am meisten?», «Was würdest du zuerst weglassen?».

### 8.6 Studiensetup — kombiniertes Format

Das Studiensetup kombiniert zwei Formate, um sowohl den Erstkontakt-Effekt als auch den Gewohnheitseffekt zu erfassen.

#### 8.6.1 Stichprobe und Rekrutierung

Mindestens **3 Testpersonen** sind das Minimum für valide qualitative Aussagen, **mehr sind explizit wünschenswert**. Rekrutiert wird über das persönliche Umfeld mit Blick auf demographische Streuung (Alter, Bildung, Mediennutzung). Selbstselektion wird in Kap. 10.6 als Limitation diskutiert.

#### 8.6.2 Format A — 1-malige Nutzung

Ablauf: kurzes Onboarding (max. 10 Minuten), eine Sendung anhören (typische Länge), unmittelbar danach Fragebogen ausfüllen, anschliessend halbstrukturiertes Kurzinterview (15–20 Minuten). Erfassung: Erstkontakt-Akzeptanz, unmittelbare Wirkung, erste Bedienschwierigkeiten.

#### 8.6.3 Format B — Längere Nutzung

Ablauf: Onboarding, dann eigenständige Nutzung über **1 Woche bzw. mindestens 1 Wochenende**. Die Testpersonen entscheiden selbst, wann und wie oft sie Radio 25 hören. Optional: kurzes Tagebuch (frei formuliert oder mit Vorlage, siehe Anhang A). Logdaten dokumentieren Nutzungshäufigkeit und Einstellungsänderungen. Abschluss-Befragung mit Fragebogen und ausführlicherem Interview (30 Minuten).

#### 8.6.4 Kombination beider Formate

Personen, die **beide Formate** durchlaufen, beantworten den Fragebogen **zweimal** (nach Format A und nach Format B). Der **Vergleich der Antworten** dient als Indikator dafür, wie sich Akzeptanz und Wirkung von Erstkontakt zu Gewohnheit verschieben — ein für wellbeing-orientierte Artefakte besonders relevanter Effekt, da nachhaltige Wirkung erst über Zeit beurteilbar ist.

### 8.7 Erfolgskriterien

Die Erfolgskriterien werden — anknüpfend an Disposition Kap. 7.3 und an die Forschungsfrage in Kap. 4 — pro Validierungsstrang operationalisiert:

- **Machbarkeit:** End-to-End-Durchlauf erfolgreich, Latenz < X Sekunden, Fehlerrate < Y %, Unit-Test-Abdeckung > Z %.
- **Usability/Akzeptanz:** SUS-Score ≥ 68 (industrieller Durchschnitt), positives Feedback zu mindestens N von M Einstellungsmöglichkeiten.
- **Wirkung:** signifikant positive Antworten (≥ 4 auf 5-Punkt-Skala) zu Autonomie, Steuerbarkeit, Transparenz; Awareness-Items ergeben mindestens N qualitativ belegte Bewusstseins-Berichte.

*[Konkrete Schwellwerte werden vor dem Pilottest mit dem Betreuer abgestimmt.]*

### 8.8 Ethik und Einwilligung

Vor Studienbeginn unterzeichnen alle Testpersonen eine Einwilligungserklärung (Informed Consent, siehe Anhang H). Diese regelt: Studienzweck, Datenarten (Fragebogen, Interview-Aufzeichnung, Logdaten), Verwendung (anonymisiert in der Thesis), Speicherung (lokal, gelöscht nach Abgabe + 6 Monate), Widerrufsrecht. Es findet kein Tracking statt; Logdaten beschränken sich auf das technisch Notwendige zur Beantwortung der Forschungsfrage.

---

## 10 Diskussion (angepasst — greift die drei Validierungsstränge aus Kap. 8 explizit auf)

### 10.1 Beantwortung der Forschungsfrage

Synthese über die drei Stränge: Was wurde nachgewiesen, was bleibt offen? *[Wird nach dem Pilottest auf Basis der Ergebnisse aus Kap. 9 verfasst.]*

### 10.2 Diskussion der Machbarkeit

Reflexion der technischen Tragfähigkeit: Skaliert die Pipeline auf grössere Nutzerzahlen? Welche Komponenten sind kostentreibend? Welche sind fehleranfällig? *[Stub.]*

### 10.3 Diskussion der Usability und Akzeptanz

Welche Einstellungen wurden besonders geschätzt? Welche als überflüssig wahrgenommen? Welche fehlen? Was sagt das über das Designkonzept aus? *[Stub.]*

### 10.4 Diskussion der Wirkung

Einordnung in den theoretischen Rahmen aus Kap. 2: Inwieweit wurden die SDT-Bedürfnisse adressiert? Wurden VSD-Werte erlebbar? Schärfte das Artefakt die Awareness für algorithmische Souveränität? Welche Wirkung blieb aus, welche überraschte? *[Stub.]*

### 10.5 Implikationen für Design und Praxis

Was lässt sich aus den Befunden für andere wellbeing-orientierte Medienartefakte ableiten? Welche Designentscheidungen sind übertragbar, welche radio-spezifisch? *[Stub.]*

### 10.6 Limitationen

Kleine Stichprobe (mindestens 3, mehr wünschenswert); kurzer Untersuchungszeitraum (max. 1 Woche); Selbstauswahl der Testpersonen; mögliche Verzerrung durch zweimalige Befragung derselben Personen (Lerneffekt, Erwartungseffekt); technische Restriktionen (LLM- und TTS-Latenz, Lizenzfragen Musik). *[Stub.]*

### 10.7 Übertragbarkeit auf andere Medienkontexte

Inwiefern lassen sich die Befunde auf Streaming, Podcast-Empfehlungen, News-Aggregatoren übertragen? Welche Eigenschaften von Radio 25 sind generisch, welche formatspezifisch? *[Stub.]*
