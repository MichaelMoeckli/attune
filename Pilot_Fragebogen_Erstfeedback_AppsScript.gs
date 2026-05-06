/**
 * Radio 25 — Erstfeedback Usability (Kurzversion)
 *
 * Erstellt automatisch ein Google Form mit 12 Pflicht-Items + 2 offenen Fragen
 * (Demographie-Mini + SUS-10 + 2 Freitext) für den ersten Usability-Test.
 *
 * --- ANLEITUNG ---
 * 1. https://script.google.com öffnen, mit Google-Konto einloggen.
 * 2. "Neues Projekt" → diesen Inhalt in "Code.gs" einfügen (Beispielcode überschreiben).
 * 3. Funktion "createRadio25ErstfeedbackForm" wählen → "Ausführen" klicken.
 * 4. Beim ersten Lauf: Berechtigungen für Drive + Forms bestätigen.
 * 5. Im Ausführungsprotokoll erscheinen Edit-URL (zum Bearbeiten) und View-URL (zum Teilen).
 *
 * Iteration: Texte unten anpassen und Funktion erneut ausführen → es entsteht ein neues
 * Formular, das alte bleibt erhalten.
 */

function createRadio25ErstfeedbackForm() {
  var form = FormApp.create('Radio 25 — Erstfeedback Usability');

  form.setDescription(
    'Vielen Dank, dass du Radio 25 ausprobiert hast!\n\n' +
    'Dieser kurze Fragebogen dauert 3–4 Minuten und konzentriert sich auf die Bedienbarkeit ' +
    'und dein erstes Feedback. Antworten werden anonymisiert ausgewertet, lokal gespeichert ' +
    'und 6 Monate nach Thesis-Abgabe gelöscht.'
  );

  form.setShowLinkToRespondAgain(false);
  form.setCollectEmail(false);
  form.setProgressBar(true);
  form.setAllowResponseEdits(false);

  // ============================================================
  // BLOCK 1 — MINI-DEMOGRAPHIE (2 Items)
  // ============================================================
  form.addSectionHeaderItem()
    .setTitle('Block 1 — Kurz zur Person')
    .setHelpText('Zwei Fragen für die spätere Zuordnung.');

  form.addTextItem()
    .setTitle('Teilnehmer-Code')
    .setHelpText('Damit Antworten später ggf. einer zweiten Befragung zugeordnet werden können. ' +
                 'Z. B. Initialen + Geburtsjahr → "MM-1996".')
    .setRequired(true);

  var d2 = form.addMultipleChoiceItem();
  d2.setTitle('Altersgruppe')
    .setChoices([
      d2.createChoice('unter 25'),
      d2.createChoice('25–34'),
      d2.createChoice('35–49'),
      d2.createChoice('50–64'),
      d2.createChoice('65+')
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
  // BLOCK 3 — OFFENES FEEDBACK (2 Items, optional)
  // ============================================================
  form.addPageBreakItem()
    .setTitle('Block 3 — In deinen Worten')
    .setHelpText('Zwei kurze offene Fragen — bei kleinen Stichproben das wertvollste Material.');

  form.addParagraphTextItem()
    .setTitle('Was hat besonders gut funktioniert oder dir an Radio 25 gefallen?')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Wo bist du steckengeblieben, was war verwirrend, oder was hat dir gefehlt?')
    .setRequired(false);

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
