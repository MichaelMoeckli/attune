# Pilotstudie Radio 25 — Erstfeedback Usability (Kurzversion)

**Version:** 2026-05-06 · Reduziert auf Erstfeedback-Bedarf
**Studienformat:** Erste, kurze Testrunde — Fokus **Usability + qualitatives Erstfeedback**
**Ziel-Bearbeitungszeit:** 3–4 Minuten · 12 Pflicht-Items + 2 offene Fragen
**Erfassung:** Google Forms (Apps-Script-Datei `Pilot_Fragebogen_Erstfeedback_AppsScript.gs`)

---

## Was bewusst weggelassen wurde — und warum

Die Items zu **Wirkung (W1–W5)**, **Awareness (A1–A2)** und **Kontrollvariablen Information/Unterhaltung (K1–K2)** machen erst beim 1-Wochen-Test Sinn: Wirkung im Sinn von SDT/VSD/Digital Wellbeing entfaltet sich nicht in einer einmaligen Hörsession, sondern braucht Gewöhnung. Beim Erstkontakt würden die Antworten Höflichkeitseffekte und Neuigkeits-Bias enthalten — das ist methodisch schwach. Diese Items bleiben in `Pilot_Fragebogen_Kurztest.md` als Basis für Format B.

Für **Erstfeedback** zählt:
- **SUS-10** als standardisierter Bedienbarkeits-Score (Vergleichswert ≥ 68 aus Kap. 8.7)
- **Zwei offene Fragen** — bei kleinen Stichproben das wertvollste Datenmaterial
- **Minimaler Demographie-Anker** zur späteren Zuordnung

---

## Block 1 — Kurz zur Person (2 Items)

**D1. Teilnehmer-Code** *(Freitext, Pflicht)*
Damit Antworten später ggf. einer zweiten Befragung zugeordnet werden können. Z. B. Initialen + Geburtsjahr → „MM-1996".

**D2. Altersgruppe** *(MC, Pflicht)*
◯ unter 25 ◯ 25–34 ◯ 35–49 ◯ 50–64 ◯ 65+

---

## Block 2 — Bedienbarkeit (SUS-10)

**Anleitung im Formular:** „Bitte gib für die folgenden 10 Aussagen an, wie stark du zustimmst."
**Antwortskala:** 1 = stimme gar nicht zu · 2 · 3 · 4 · 5 = stimme voll zu

> Reihenfolge und Wortlaut der SUS-Items werden nicht verändert — sonst verliert der Score den Vergleichswert.

S1. Ich denke, dass ich Radio 25 gerne regelmässig nutzen würde.
S2. Ich fand Radio 25 unnötig komplex.
S3. Ich fand Radio 25 einfach zu nutzen.
S4. Ich glaube, ich würde die Hilfe einer technisch versierten Person benötigen, um Radio 25 nutzen zu können.
S5. Ich fand, die verschiedenen Funktionen in Radio 25 waren gut integriert.
S6. Ich denke, es gab zu viele Inkonsistenzen in Radio 25.
S7. Ich kann mir vorstellen, dass die meisten Menschen den Umgang mit Radio 25 sehr schnell lernen.
S8. Ich fand Radio 25 sehr umständlich zu nutzen.
S9. Ich fühlte mich bei der Nutzung von Radio 25 sehr sicher.
S10. Ich musste viele Dinge lernen, bevor ich mit Radio 25 arbeiten konnte.

*Auswertung: ungerade Items mit (Antwort − 1), gerade mit (5 − Antwort), Summe × 2,5 → SUS-Score 0–100.*

---

## Block 3 — Offenes Feedback (2 Items)

**O1.** Was hat besonders gut funktioniert oder dir an Radio 25 gefallen? *(Freitext, optional)*

**O2.** Wo bist du steckengeblieben, was war verwirrend, oder was hat dir gefehlt? *(Freitext, optional)*

---

## Was du nach diesem Erstfeedback noch tun solltest

- **Kurzes Beobachtungsprotokoll** während der Nutzung führen (Stichworte zu auffälligen Stellen) — die offenen Fragen verdoppeln dadurch ihren Wert.
- **Direkt im Anschluss** ein 5–10-minütiges, lockeres Nachgespräch zu den offenen Antworten — das geht im ersten Test ohne Leitfaden, du folgst einfach dem, was die Person geschrieben hat.
- Nach 2–3 Erstfeedback-Runden hast du genug für die nächste Iteration des Prototyps. Erst danach lohnt der ausführliche Fragebogen aus `Pilot_Fragebogen_Kurztest.md` mit Wirkungs- und Awareness-Items.
