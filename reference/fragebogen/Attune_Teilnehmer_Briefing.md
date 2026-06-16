# Attune – Teilnehmer-Briefing

Zwei Versionen desselben Inhalts, abgestimmt auf den jeweiligen Kontext: einmal als **Begrüssungsbildschirm in der App** (vor dem Onboarding), einmal als **Einleitungstext der Google Form** (bereits in `Attune_Fragebogen_GoogleForms.gs` hinterlegt — hier nur zur Referenz).

---

## A) Begrüssungsbildschirm in der App

Wird *vor* dem Schritt mit Themen-, Längen- und Musikquellenauswahl angezeigt. Der "Los geht's"-Button führt zum bestehenden Onboarding.

> ### Willkommen bei Attune
>
> Du nimmst an der Pilotstudie zu Attune teil – einem vollautomatisierten KI-Radio, das im Gegensatz zu engagement-getriebenen Plattformen auf **dein Wohlbefinden** statt auf maximale Verweildauer optimiert. Die Studie ist Teil meiner Bachelorarbeit an der ZHAW.
>
> **So läufst du durch:**
>
> 1. **Teilnehmer-ID eintragen.** Du hast eine ID vom Dozenten bekommen. Trage sie gleich im nächsten Schritt ein – du brauchst sie später auch im Fragebogen.
> 2. **Kurzes Onboarding.** Wähle deine Themen, die Sendungslänge und deine Musikquelle.
> 3. **Sendung anhören.** Lehn dich zurück und höre eine vollständige Sendung an (~5–15 Minuten je nach gewählter Länge). Bitte nutze Kopfhörer oder eine ruhige Umgebung – es geht um dein Hörerlebnis und deine Aufmerksamkeit.
> 4. **Fragebogen ausfüllen.** Am Ende der Sendung erscheint ein Button "Fragebogen jetzt ausfüllen". Plane dafür weitere 15–20 Minuten ein.
>
> **Hinweise**
>
> - Du musst die Sendung nicht beim ersten Versuch perfekt durchhören – falls etwas hakt, neu laden ist ok. Technische Probleme bitte im Fragebogen oder per Mail melden.
> - Deine Antworten und Profil-Daten werden ausschliesslich pseudonym über deine ID ausgewertet.
> - Bei Fragen: moeckmic@students.zhaw.ch
>
> **Gesamtdauer:** ca. 25–35 Minuten (Anhören + Fragebogen).
>
> [ Los geht's → ]

### Umsetzungsvorschlag (Next.js / React)

Da der bestehende App-Flow laut Memory bereits eine State-Maschine mit fünf Zuständen hat (`awaiting-participant-id` → `onboarding` → `preview` → `playing` → `end-of-show`), wäre die saubere Stelle:

1. Einen neuen State `welcome` einführen, der vor `awaiting-participant-id` läuft.
2. Eine Komponente `WelcomeScreen.tsx` mit obigem Text und einem Primary-Button "Los geht's".
3. Den Welcome-Schritt nur beim allerersten Aufruf zeigen (Check auf `localStorage` → `attune-welcome-seen`); falls bereits gesehen, direkt zur ID-Eingabe springen, damit Teilnehmer nicht jedes Mal scrollen müssen.

Die fertige `EndOfShowCard` bekommt zusätzlich einen prominenten Button **"Fragebogen jetzt ausfüllen"**, der die Google-Forms-URL in einem neuen Tab öffnet – idealerweise mit der Teilnehmer-ID als vorausgefülltem Query-Parameter (sobald das `entry.XXXXXXX`-Feld der Form bekannt ist, siehe Abschnitt "Pre-Fill-Link" weiter unten).

---

## B) Einleitungstext der Google Form

(Bereits im Apps Script unter `form.setDescription(...)` hinterlegt – hier zur Lesbarkeit gespiegelt.)

> Vielen Dank, dass du Attune ausprobierst!
>
> **— — — — —**
> **BEVOR DU STARTEST: So nutzt du die App**
> **— — — — —**
>
> Falls du Attune noch nicht ausprobiert hast, mache zuerst Folgendes:
>
> 1. Öffne die App unter der dir mitgeteilten URL.
> 2. Trage deine Teilnehmer-ID ein (hast du vom Dozenten erhalten).
> 3. Wähle im kurzen Onboarding deine Themen, die Sendungslänge und die Musikquelle.
> 4. Höre eine vollständige Sendung in Ruhe an (ca. 5–15 Min je nach gewählter Länge). Bitte nutze Kopfhörer oder eine ruhige Umgebung – es geht um dein Hörerlebnis.
> 5. Komm danach zu diesem Fragebogen zurück.
>
> **— — — — —**
> **ZU DIESEM FRAGEBOGEN**
> **— — — — —**
>
> Der Fragebogen ist Teil meiner Bachelorarbeit an der ZHAW (Institut für Wirtschaftsinformatik) und besteht aus mehreren Abschnitten. Geschätzte Dauer: 15–20 Minuten.
>
> Deine Antworten werden ausschliesslich pseudonym über deine Teilnehmer-ID ausgewertet. Die Zuordnungsliste „Name → ID" liegt nur beim Dozenten. Bitte halte die ID bereit, die dir in der Attune-App angezeigt wurde – sie ist das erste Pflichtfeld.
>
> Bei Fragen: moeckmic@students.zhaw.ch

---

## Pre-Fill-Link für den "Fragebogen jetzt ausfüllen"-Button

Sobald die Form über das Apps Script erstellt ist:

1. Im Form-Editor → ⋮-Menü → **„Vorausgefüllten Link abrufen"**.
2. Beim Pflichtfeld "Teilnehmer-ID" gibst du einen Platzhalter ein, z.B. `__PID__`, und kopierst den generierten Link.
3. Der Link sieht ungefähr so aus: `https://docs.google.com/forms/d/e/<FORM_ID>/viewform?usp=pp_url&entry.<ID>=__PID__`
4. In der App ersetzt du `__PID__` zur Laufzeit durch die echte Teilnehmer-ID des Users.

So bekommt jeder Studierende einen Link mit bereits eingetragener ID. Dropdown bleibt für ihn editierbar (Google Forms kann ein Pre-Fill nicht sperren) – deshalb auf der EndOfShowCard zusätzlich die ID gross anzeigen, damit der Teilnehmer im Notfall manuell abtippen kann.
