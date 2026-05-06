/**
 * Radio 25 — Pilotstudie Fragebogen
 *
 * Erstellt automatisch ein Google Form mit allen 25 Items des Pilot-Fragebogens
 * (Demographie + SUS + Wirkung + Kontrollvariablen + Awareness + Offene Fragen),
 * inkl. konditionalem Format-B-Zusatzblock.
 *
 * --- ANLEITUNG ---
 * 1. https://script.google.com öffnen, mit Google-Konto einloggen.
 * 2. "Neues Projekt" → den gesamten Inhalt dieser Datei in die Datei "Code.gs" einfügen
 *    (vorhandenen Beispielcode überschreiben).
 * 3. Oben das Funktionsdropdown auf "createRadio25PilotForm" stellen → "Ausführen" klicken.
 * 4. Beim ersten Lauf wird Google nach Berechtigungen fragen ("Drive + Forms erstellen") — bestätigen.
 * 5. Nach ~5 Sekunden zeigt das Ausführungsprotokoll zwei Links:
 *      - EDIT_URL  → Formular weiter bearbeiten
 *      - VIEW_URL  → Link für Testpersonen
 *    Beide werden zusätzlich als Logger.log ausgegeben (Menü: "Ausführungen" → letzte Zeile öffnen).
 * 6. Antworten landen automatisch in einer Google-Tabelle, die Forms beim ersten Eingang erstellt
 *    (oder vorab im Formular-Editor unter "Antworten → Tabellensymbol" verbinden).
 *
 * Bei Änderungswünschen: Texte unten anpassen und Funktion erneut ausführen — es entsteht ein NEUES
 * Formular (das alte bleibt unverändert in deinem Drive). So kannst du iterieren ohne Datenverlust.
 */

function createRadio25PilotForm() {
  var form = FormApp.create('Radio 25 — Pilotstudie Fragebogen');

  form.setDescription(
    'Vielen Dank, dass du Radio 25 testest!\n\n' +
    'Der Fragebogen dauert 5–7 Minuten. Deine Antworten werden anonymisiert ausgewertet, ' +
    'lokal gespeichert und 6 Monate nach Thesis-Abgabe gelöscht.\n\n' +
    'Ganz am Ende fragen wir, ob du gerade Format A (direkt nach der ersten Sendung) oder ' +
    'Format B (nach 1 Woche Nutzung) ausfüllst. Wer beides macht, füllt das Formular zweimal ' +
    'aus und verwendet beide Male denselben Teilnehmer-Code.'
  );

  form.setShowLinkToRespondAgain(false);
  form.setCollectEmail(false);
  form.setProgressBar(true);
  form.setAllowResponseEdits(false);

  // ============================================================
  // BLOCK 1 — DEMOGRAPHIE & MEDIENNUTZUNG (4 Items)
  // ============================================================
  form.addSectionHeaderItem()
    .setTitle('Block 1 — Über dich')
    .setHelpText('Vier kurze Fragen zur späteren Auswertung.');

  form.addTextItem()
    .setTitle('D1. Teilnehmer-Code')
    .setHelpText('Damit Format-A- und Format-B-Antworten paarweise zugeordnet werden können. Beispiel: Initialen + Geburtsjahr → "MM-1996".')
    .setRequired(true);

  var d2 = form.addMultipleChoiceItem();
  d2.setTitle('D2. Altersgruppe')
    .setChoices([
      d2.createChoice('unter 25'),
      d2.createChoice('25–34'),
      d2.createChoice('35–49'),
      d2.createChoice('50–64'),
      d2.createChoice('65+')
    ])
    .setRequired(true);

  var d3 = form.addMultipleChoiceItem();
  d3.setTitle('D3. Höchster Bildungsabschluss')
    .setChoices([
      d3.createChoice('Obligatorische Schule'),
      d3.createChoice('Berufslehre / Sek II'),
      d3.createChoice('Höhere Berufsbildung'),
      d3.createChoice('FH/Uni Bachelor'),
      d3.createChoice('FH/Uni Master oder höher')
    ])
    .setRequired(true);

  var d4 = form.addMultipleChoiceItem();
  d4.setTitle('D4. Wie viele Stunden hörst du an einem typischen Tag Radio, Podcast oder Audio-Streaming?')
    .setChoices([
      d4.createChoice('unter 30 Min'),
      d4.createChoice('30–60 Min'),
      d4.createChoice('1–2 Std'),
      d4.createChoice('2–4 Std'),
      d4.createChoice('über 4 Std')
    ])
    .setRequired(true);

  // ============================================================
  // BLOCK 2 — SYSTEM USABILITY SCALE (10 Items)
  // ============================================================
  form.addPageBreakItem()
    .setTitle('Block 2 — Bedienbarkeit')
    .setHelpText('Bitte gib für die folgenden 10 Aussagen an, wie stark du zustimmst. ' +
                 '(1 = stimme gar nicht zu, 5 = stimme voll zu)');

  var susItems = [
    'S1. Ich denke, dass ich Radio 25 gerne regelmässig nutzen würde.',
    'S2. Ich fand Radio 25 unnötig komplex.',
    'S3. Ich fand Radio 25 einfach zu nutzen.',
    'S4. Ich glaube, ich würde die Hilfe einer technisch versierten Person benötigen, um Radio 25 nutzen zu können.',
    'S5. Ich fand, die verschiedenen Funktionen in Radio 25 waren gut integriert.',
    'S6. Ich denke, es gab zu viele Inkonsistenzen in Radio 25.',
    'S7. Ich kann mir vorstellen, dass die meisten Menschen den Umgang mit Radio 25 sehr schnell lernen.',
    'S8. Ich fand Radio 25 sehr umständlich zu nutzen.',
    'S9. Ich fühlte mich bei der Nutzung von Radio 25 sehr sicher.',
    'S10. Ich musste viele Dinge lernen, bevor ich mit Radio 25 arbeiten konnte.'
  ];

  susItems.forEach(function(t) {
    form.addScaleItem()
      .setTitle(t)
      .setBounds(1, 5)
      .setLabels('stimme gar nicht zu', 'stimme voll zu')
      .setRequired(true);
  });

  // ============================================================
  // BLOCK 3 — WIRKUNG (5 Items, abgeleitet aus Kap. 2.3)
  // ============================================================
  form.addPageBreakItem()
    .setTitle('Block 3 — Wie hast du die Sendung erlebt?')
    .setHelpText('Wieder dieselbe Skala: 1 = stimme gar nicht zu, 5 = stimme voll zu.');

  var wirkItems = [
    'W1. Ich konnte Radio 25 nach meinen eigenen Bedürfnissen einstellen.',
    'W2. Ich habe verstanden, warum Radio 25 mir genau diese Inhalte vorgeschlagen hat.',
    'W3. Nach dem Hören fühlte ich mich informiert, ohne überfordert zu sein.',
    'W4. Mir war klar, woher die Inhalte stammen.',
    'W5. Ich hatte das Gefühl, das System zu steuern — und nicht umgekehrt.'
  ];

  wirkItems.forEach(function(t) {
    form.addScaleItem()
      .setTitle(t)
      .setBounds(1, 5)
      .setLabels('stimme gar nicht zu', 'stimme voll zu')
      .setRequired(true);
  });

  // ============================================================
  // BLOCK 4 + 5 — KONTROLLVARIABLEN + AWARENESS (4 Items)
  // ============================================================
  form.addPageBreakItem()
    .setTitle('Block 4 + 5 — Sendung als Radioformat & Bewusstsein')
    .setHelpText('Antwortskala wie bisher: 1 = trifft gar nicht zu, 5 = trifft voll zu.');

  form.addScaleItem()
    .setTitle('K1. Die Sendung war für mich informativ.')
    .setBounds(1, 5)
    .setLabels('trifft gar nicht zu', 'trifft voll zu')
    .setRequired(true);

  form.addScaleItem()
    .setTitle('K2. Die Sendung war für mich unterhaltsam.')
    .setBounds(1, 5)
    .setLabels('trifft gar nicht zu', 'trifft voll zu')
    .setRequired(true);

  form.addScaleItem()
    .setTitle('A1. Mir wurde durch Radio 25 bewusst, wie selektiv meine sonstige Mediennutzung ist.')
    .setBounds(1, 5)
    .setLabels('stimme gar nicht zu', 'stimme voll zu')
    .setRequired(true);

  form.addScaleItem()
    .setTitle('A2. Ich konnte einschätzen, wo Radio 25 an seine Grenzen stösst (z. B. bei der Themenauswahl oder bei den generierten Texten).')
    .setBounds(1, 5)
    .setLabels('stimme gar nicht zu', 'stimme voll zu')
    .setRequired(true);

  // ============================================================
  // BLOCK 6 — OFFENE FRAGEN + STEUERUNG FORMAT A/B
  // ============================================================
  form.addPageBreakItem()
    .setTitle('Block 6 — In deinen Worten')
    .setHelpText('Zwei kurze Freitext-Fragen, danach nur noch die Frage zum Studienformat.');

  form.addParagraphTextItem()
    .setTitle('O1. Wie würdest du Radio 25 jemandem in einem Satz beschreiben?')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('O2. Was hat dich gestört, was hat gefehlt, oder was würdest du zuerst weglassen?')
    .setRequired(false);

  // Steering question (Multiple Choice — wird unten konfiguriert, sobald Format-B-Page existiert)
  var steering = form.addMultipleChoiceItem();

  // ============================================================
  // FORMAT-B-ZUSATZBLOCK (3 Items, nur sichtbar bei Auswahl "Format B")
  // ============================================================
  var formatBPage = form.addPageBreakItem()
    .setTitle('Zusatzfragen für Format B (1-Wochen-Nutzung)')
    .setHelpText('Drei kurze Fragen, die nur Format-B-Teilnehmende ausfüllen.');

  var b1 = form.addMultipleChoiceItem();
  b1.setTitle('B1. Wie oft hast du Radio 25 in der Testwoche gehört?')
    .setChoices([
      b1.createChoice('0 mal'),
      b1.createChoice('1–2 mal'),
      b1.createChoice('3–5 mal'),
      b1.createChoice('täglich oder mehrmals täglich')
    ])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('B2. Hast du im Verlauf der Woche Einstellungen geändert? Wenn ja: welche und warum?')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('B3. Hat sich dein Eindruck zwischen der ersten und der letzten Sendung verändert?')
    .setHelpText('Z. B. Erwartung, Vertrauen, Hörgewohnheit, Themenauswahl.')
    .setRequired(false);

  // ----- Steering-Frage konfigurieren (jetzt, da formatBPage existiert) -----
  var choiceA = steering.createChoice('Format A — direkt nach der ersten Sendung', FormApp.PageNavigationType.SUBMIT);
  var choiceB = steering.createChoice('Format B — nach 1 Woche / mindestens 1 Wochenende Nutzung', formatBPage);
  steering.setTitle('Welches Studienformat füllst du gerade aus?')
    .setHelpText('Format A: Formular wird nach Klick auf "Weiter" abgeschickt. ' +
                 'Format B: Es folgen drei Zusatzfragen zur Wochen-Nutzung.')
    .setChoices([choiceA, choiceB])
    .setRequired(true);

  // ============================================================
  // FERTIG — Links ausgeben
  // ============================================================
  var editUrl = form.getEditUrl();
  var viewUrl = form.getPublishedUrl();

  Logger.log('=========================================');
  Logger.log('FORMULAR ERFOLGREICH ERSTELLT');
  Logger.log('Bearbeiten: ' + editUrl);
  Logger.log('Teilen:     ' + viewUrl);
  Logger.log('=========================================');

  return { editUrl: editUrl, viewUrl: viewUrl };
}
