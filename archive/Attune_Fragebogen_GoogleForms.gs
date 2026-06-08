/**
 * =====================================================================
 *  Attune – Pilotstudie Fragebogen
 *  Google-Apps-Script zum automatischen Erstellen der Google Form
 *  Autor: Michael Möckli (BSc-Thesis, ZHAW)
 * =====================================================================
 *
 *  SCHRITT FÜR SCHRITT:
 *  1. Öffne https://script.google.com und klicke "Neues Projekt".
 *  2. Lösche den vorhandenen Beispielcode (`function myFunction() {}`).
 *  3. Kopiere DIESEN gesamten Datei-Inhalt hinein.
 *  4. Klicke oben auf "Speichern" (Disketten-Icon).
 *  5. Wähle in der Funktions-Dropdown oben `createAttuneForm` aus
 *     und klicke "Ausführen" (▶ Play-Icon).
 *  6. Erlaube die Berechtigungen (FormApp + Drive) – einmalig.
 *  7. Nach ~5 Sekunden ist die Form in deinem Google Drive angelegt.
 *     Im Ausführungsprotokoll (Strg+Enter oder "Ausführungen") findest
 *     du Editor-URL und veröffentlichte URL.
 *
 *  ANPASSUNGEN:
 *  - Titel, Beschreibung, Bestätigungstext kannst du unten direkt ändern.
 *  - Items hinzufügen/entfernen geht innerhalb der Sektionen.
 *  - Likert-Skala ist durchgehend 1–5. Falls 7-stufig gewünscht: in den
 *    GridItems die Spalten ['1','2','3','4','5'] auf 7 Werte erweitern.
 * =====================================================================
 */

function createAttuneForm() {
  // -------------------------------------------------------------------
  //  Form-Grundeinstellungen
  // -------------------------------------------------------------------
  const form = FormApp.create('Attune – Pilotstudie');
  form.setDescription(
    'Vielen Dank, dass du Attune ausprobierst!\n\n' +
    '— — — — —\n' +
    'BEVOR DU STARTEST: So nutzt du die App\n' +
    '— — — — —\n\n' +
    'Falls du Attune noch nicht ausprobiert hast, mache zuerst Folgendes:\n\n' +
    '1. Öffne die App unter der dir mitgeteilten URL.\n' +
    '2. Trage deine Teilnehmer-ID ein (hast du vom Dozenten erhalten).\n' +
    '3. Wähle im kurzen Onboarding deine Themen, die Sendungslänge und die Musikquelle.\n' +
    '4. Höre eine vollständige Sendung in Ruhe an (ca. 5–15 Min je nach gewählter Länge). ' +
    'Bitte nutze Kopfhörer oder eine ruhige Umgebung – es geht um dein Hörerlebnis.\n' +
    '5. Komm danach zu diesem Fragebogen zurück.\n\n' +
    '— — — — —\n' +
    'ZU DIESEM FRAGEBOGEN\n' +
    '— — — — —\n\n' +
    'Der Fragebogen ist Teil meiner Bachelorarbeit an der ZHAW (Institut für ' +
    'Wirtschaftsinformatik) und besteht aus mehreren Abschnitten. ' +
    'Geschätzte Dauer: 15–20 Minuten.\n\n' +
    'Deine Antworten werden ausschliesslich pseudonym über deine ' +
    'Teilnehmer-ID ausgewertet. Die Zuordnungsliste „Name → ID" liegt ' +
    'nur beim Dozenten. Bitte halte die ID bereit, die dir in der ' +
    'Attune-App angezeigt wurde – sie ist das erste Pflichtfeld.\n\n' +
    'Bei Fragen: moeckmic@students.zhaw.ch'
  );
  form.setProgressBar(true);
  form.setCollectEmail(false);
  form.setAllowResponseEdits(true);
  form.setShowLinkToRespondAgain(false);

  // Skalen-Spalten (mehrfach genutzt)
  const LIKERT_COLS = ['1', '2', '3', '4', '5'];
  const LIKERT_HELP = '1 = stimme überhaupt nicht zu, 5 = stimme voll und ganz zu';
  const FREQ_OPTS   = ['nie', 'selten', 'gelegentlich', 'oft', 'täglich'];

  // ===================================================================
  //  Sektion 1 – Teilnehmer-ID & Demografie
  // ===================================================================
  form.addTextItem()
    .setTitle('Teilnehmer-ID')
    .setHelpText('Bitte trage die ID ein, die dir in der Attune-App angezeigt wurde.')
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Alter')
    .setChoiceValues(['Unter 18', '18–24', '25–34', '35 oder älter'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Geschlecht')
    .setChoiceValues(['weiblich', 'männlich', 'divers', 'keine Angabe'])
    .setRequired(true);

  form.addTextItem()
    .setTitle('Studienrichtung')
    .setRequired(false);

  form.addMultipleChoiceItem()
    .setTitle('Aktuelles Semester')
    .setChoiceValues(['1.–2. Semester', '3.–4. Semester', '5.–6. Semester', '7. Semester oder höher'])
    .setRequired(false);

  // ===================================================================
  //  Sektion 2 – Allgemeine Mediennutzung
  // ===================================================================
  form.addPageBreakItem()
    .setTitle('Mediennutzung allgemein')
    .setHelpText('Ein paar kurze Fragen zu deinem Medienverhalten – das hilft mir, deine Antworten einzuordnen.');

  form.addMultipleChoiceItem()
    .setTitle('Wie häufig hörst du klassisches Radio (UKW, DAB)?')
    .setChoiceValues(FREQ_OPTS)
    .setRequired(false);

  form.addMultipleChoiceItem()
    .setTitle('Wie häufig nutzt du Musik-Streaming (z.B. Spotify, Apple Music)?')
    .setChoiceValues(FREQ_OPTS)
    .setRequired(false);

  form.addMultipleChoiceItem()
    .setTitle('Wie häufig nutzt du algorithmisch kuratierte Plattformen (TikTok, YouTube, Instagram-Reels)?')
    .setChoiceValues(FREQ_OPTS)
    .setRequired(false);

  form.addCheckboxItem()
    .setTitle('Wann hörst du typischerweise Audio? (Mehrfachauswahl möglich)')
    .setChoiceValues([
      'morgens', 'mittags', 'abends', 'nachts',
      'beim Pendeln', 'beim Arbeiten / Lernen', 'beim Sport', 'beim Kochen / Haushalt'
    ]);

  form.addScaleItem()
    .setTitle('Wie wichtig sind dir Nachrichten in deinem Medienalltag?')
    .setBounds(1, 5)
    .setLabels('gar nicht wichtig', 'sehr wichtig');

  form.addScaleItem()
    .setTitle('Wie oft fühlst du dich von Algorithmen "festgehalten" (z.B. Autoplay, Endlos-Scroll)?')
    .setBounds(1, 5)
    .setLabels('nie', 'sehr oft');

  // ===================================================================
  //  Sektion 3 – Machbarkeit (Hat die App funktioniert?)
  // ===================================================================
  form.addPageBreakItem()
    .setTitle('Hat die App funktioniert?')
    .setHelpText('In diesem Abschnitt geht es darum, ob technisch alles geklappt hat.');

  form.addMultipleChoiceItem()
    .setTitle('Lief die App von Anfang bis Ende ohne Fehler?')
    .setChoiceValues(['Ja, vollständig', 'Teilweise – kleinere Probleme', 'Nein – gravierende Probleme'])
    .setRequired(true);

  form.addCheckboxItem()
    .setTitle('Welche Sendungselemente hast du gehört? (Mehrfachauswahl)')
    .setChoiceValues(['Jingle', 'Begrüssung', 'Nachrichten', 'Musik', 'Wetter', 'Verabschiedung', 'Outro']);

  form.addParagraphTextItem()
    .setTitle('Gab es technische Probleme? Wenn ja, welche?')
    .setRequired(false);

  form.addGridItem()
    .setTitle('Wie beurteilst du die technische Qualität?')
    .setHelpText('1 = sehr schlecht, 5 = sehr gut')
    .setRows([
      'Audioqualität insgesamt',
      'Verständlichkeit der KI-Moderation',
      'Natürlichkeit der Stimme',
      'Übergänge zwischen Elementen',
      'Reaktionszeit der App'
    ])
    .setColumns(LIKERT_COLS);

  // ===================================================================
  //  Sektion 4 – Usability / Akzeptanz pro Einstellung
  //  (Schema: gefällt / unnötig / Wunsch – per Konstruktion aus Kap. 8)
  // ===================================================================
  form.addPageBreakItem()
    .setTitle('Einstellungsmöglichkeiten')
    .setHelpText('Wie beurteilst du die Möglichkeiten, die App an dich anzupassen?');

  form.addGridItem()
    .setTitle('Themenauswahl (welche Themen in den Nachrichten)')
    .setHelpText(LIKERT_HELP)
    .setRows([
      'Die Themenauswahl hat mir gefallen.',
      'Die Themenauswahl war für mich unnötig.',
      'Ich hätte mir hier mehr Optionen gewünscht.'
    ])
    .setColumns(LIKERT_COLS);

  form.addParagraphTextItem()
    .setTitle('Was würdest du dir bei der Themenauswahl zusätzlich wünschen? (optional)')
    .setRequired(false);

  form.addGridItem()
    .setTitle('Sendungslänge')
    .setHelpText(LIKERT_HELP)
    .setRows([
      'Die Möglichkeit, die Länge selbst zu wählen, hat mir gefallen.',
      'Die Auswahl der Sendungslänge war für mich unnötig.'
    ])
    .setColumns(LIKERT_COLS);

  form.addGridItem()
    .setTitle('Musikquelle (Spotify / lokale Musik)')
    .setHelpText(LIKERT_HELP)
    .setRows([
      'Die Wahl der Musikquelle hat mir gefallen.',
      'Die Wahl der Musikquelle war für mich unnötig.'
    ])
    .setColumns(LIKERT_COLS);

  form.addParagraphTextItem()
    .setTitle('Welche Einstellungsmöglichkeit hat dir gefehlt? (optional)')
    .setRequired(false);

  // ===================================================================
  //  Sektion 4c – Inhalt & Sessionende
  //  (Misst Building Block 3 = Curation-Logik und Building Block 4 = Sessiondesign;
  //   die drei Inhalts-Items adressieren direkt das Dozenten-Feedback vom 07.05.)
  // ===================================================================
  form.addPageBreakItem()
    .setTitle('Inhalt & Sessionende')
    .setHelpText('Wie hast du die Auswahl der Inhalte und das Ende der Sendung erlebt?');

  // Building Block 3: Curation-Logik + Informations-Dichte + Unterhaltung
  form.addGridItem()
    .setTitle('Inhalt der Sendung')
    .setHelpText(LIKERT_HELP)
    .setRows([
      'Es kamen auch Themen vor, die ich nicht aktiv gewählt hatte.',
      'Mir hat in der Sendung Unterhaltung gefehlt.',
      'Es waren mir zu viele Informationen auf einmal.'
    ])
    .setColumns(LIKERT_COLS);

  // Building Block 4: Sessiondesign (klares Ende, kein Cliffhanger)
  form.addGridItem()
    .setTitle('Sessionende und Pausencharakter')
    .setHelpText(LIKERT_HELP + ' — Item 2 ist bewusst negativ formuliert (Reverse-Coding bei der Auswertung beachten).')
    .setRows([
      'Das klare Ende der Sendung fand ich angenehm.',
      'Es hat mir gefehlt, dass danach nichts mehr automatisch weiterlief.'
    ])
    .setColumns(LIKERT_COLS);

  // SUS-Kurzform
  form.addPageBreakItem()
    .setTitle('Bedienbarkeit der App')
    .setHelpText('Allgemeine Beurteilung – angelehnt an die System Usability Scale (Brooke 1996).');

  form.addGridItem()
    .setTitle('Bitte beurteile die folgenden Aussagen zur Bedienbarkeit.')
    .setHelpText(LIKERT_HELP)
    .setRows([
      'Ich kann mir vorstellen, die App regelmässig zu nutzen.',
      'Die App war unnötig komplex.',
      'Die App war einfach zu bedienen.',
      'Die meisten Personen würden sich schnell zurechtfinden.',
      'Ich fühlte mich beim Bedienen sicher.',
      'Ich musste viel lernen, bevor ich loslegen konnte.'
    ])
    .setColumns(LIKERT_COLS);

  // ===================================================================
  //  Sektion 4d – Gesamteindruck (UEQ-S, Schrepp/Hinderks/Thomaschewski 2017)
  //  8 bipolare Items, 7-stufig — validiertes Kurzinstrument zur User Experience.
  //  Achtung: abweichende 7er-Skala (statt 5er) ist methodisch korrekt für UEQ-S.
  // ===================================================================
  form.addPageBreakItem()
    .setTitle('Gesamteindruck der App')
    .setHelpText(
      'Bitte beurteile die App auf den folgenden Gegensatzpaaren. ' +
      'Die Skala ist hier ausnahmsweise 7-stufig (1 = ganz links, 7 = ganz rechts). ' +
      'Pro Paar gibt es keine richtige oder falsche Antwort — wähle den Wert, ' +
      'der deinem Eindruck am nächsten kommt.'
    );

  // Pragmatische Qualität (Items 1–4)
  form.addScaleItem()
    .setTitle('Die App war ...')
    .setBounds(1, 7)
    .setLabels('unangenehm', 'angenehm');

  form.addScaleItem()
    .setTitle('Die App war ...')
    .setBounds(1, 7)
    .setLabels('unverständlich', 'verständlich');

  form.addScaleItem()
    .setTitle('Die App war ...')
    .setBounds(1, 7)
    .setLabels('ineffizient', 'effizient');

  form.addScaleItem()
    .setTitle('Die App war ...')
    .setBounds(1, 7)
    .setLabels('verwirrend', 'übersichtlich');

  // Hedonische Qualität (Items 5–8)
  form.addScaleItem()
    .setTitle('Die App war ...')
    .setBounds(1, 7)
    .setLabels('langweilig', 'spannend');

  form.addScaleItem()
    .setTitle('Die App war ...')
    .setBounds(1, 7)
    .setLabels('uninteressant', 'interessant');

  form.addScaleItem()
    .setTitle('Die App war ...')
    .setBounds(1, 7)
    .setLabels('konventionell', 'originell');

  form.addScaleItem()
    .setTitle('Die App war ...')
    .setBounds(1, 7)
    .setLabels('herkömmlich', 'neuartig');

  // ===================================================================
  //  Sektion 5 – Transparenz (Building Block 5)
  // ===================================================================
  form.addPageBreakItem()
    .setTitle('Transparenz')
    .setHelpText('Die App zeigt Quellen, Begründungen für die Auswahl und macht den KI-Anteil sichtbar.');

  form.addMultipleChoiceItem()
    .setTitle('Sind dir die Quellenangaben bei den Nachrichten aufgefallen?')
    .setChoiceValues(['Ja', 'Nein', 'Bin mir nicht sicher'])
    .setRequired(false);

  form.addMultipleChoiceItem()
    .setTitle('Hast du die Erklärung bemerkt, warum dir bestimmte Themen vorgeschlagen wurden?')
    .setChoiceValues(['Ja', 'Nein', 'Bin mir nicht sicher'])
    .setRequired(false);

  form.addMultipleChoiceItem()
    .setTitle('Hast du die Übersicht über die Verarbeitungsschritte (KI-Pipeline) bemerkt?')
    .setChoiceValues(['Ja', 'Nein', 'Bin mir nicht sicher'])
    .setRequired(false);

  form.addGridItem()
    .setTitle('Wie hilfreich findest du die Transparenz-Elemente?')
    .setHelpText('1 = überhaupt nicht hilfreich, 5 = sehr hilfreich')
    .setRows([
      'Quellenangaben bei den Nachrichten',
      'Begründung, warum diese Themen ausgewählt wurden',
      'Sichtbarkeit der KI-Pipeline (welche Schritte laufen)',
      'Hinweis darauf, was die KI nicht weiss oder nicht kann'
    ])
    .setColumns(LIKERT_COLS);

  // ===================================================================
  //  Sektion 6 – Wirkung (Konstrukte aus Kap. 2.3)
  // ===================================================================
  form.addPageBreakItem()
    .setTitle('Wie hat sich das Hören für dich angefühlt?')
    .setHelpText('Jetzt geht es um das Erleben – was die App in dir ausgelöst hat.');

  // Hörsituation als Kovariate für die Wirkungs-Interpretation
  form.addScaleItem()
    .setTitle('Wie aufmerksam hast du der Sendung gefolgt?')
    .setBounds(1, 5)
    .setLabels('nur nebenbei', 'voll konzentriert');

  form.addCheckboxItem()
    .setTitle('Hast du während des Hörens etwas anderes gemacht? (Mehrfachauswahl möglich)')
    .setChoiceValues([
      'nichts anderes – nur gehört',
      'Handy / Social Media',
      'Lernen / Arbeiten',
      'Haushalt / Kochen',
      'Sport / Bewegung',
      'Pendeln / unterwegs',
      'anderes'
    ]);

  // SDT – Autonomie
  form.addGridItem()
    .setTitle('Selbstbestimmung beim Hören')
    .setHelpText(LIKERT_HELP)
    .setRows([
      'Ich hatte das Gefühl, selbst zu bestimmen, was ich höre.',
      'Die App hat meine Hörgewünsche respektiert.',
      'Ich konnte die Sendung an meine Bedürfnisse anpassen.'
    ])
    .setColumns(LIKERT_COLS);

  // SDT – Kompetenz
  form.addGridItem()
    .setTitle('Kompetenz')
    .setHelpText(LIKERT_HELP)
    .setRows([
      'Ich konnte die App effektiv nutzen.',
      'Ich verstand, wie die Personalisierung zustande kommt.'
    ])
    .setColumns(LIKERT_COLS);

  // SDT – Verbundenheit
  form.addGridItem()
    .setTitle('Verbundenheit / Passung')
    .setHelpText(LIKERT_HELP)
    .setRows([
      'Die Sendung wirkte auf mich wie für mich gemacht.',
      'Ich fühlte mich beim Hören angesprochen.'
    ])
    .setColumns(LIKERT_COLS);

  // Digital Wellbeing (Vanden Abeele 2021)
  form.addGridItem()
    .setTitle('Wohlbefinden beim Hören')
    .setHelpText(LIKERT_HELP)
    .setRows([
      'Nach dem Hören fühlte ich mich entspannter.',
      'Das Hören fühlte sich nicht ausbeuterisch an (kein Sog, weiterzuhören).',
      'Im Vergleich zu Spotify/TikTok/YouTube fühlte sich das Hören gesünder an.'
    ])
    .setColumns(LIKERT_COLS);

  // Algorithmische Souveränität (Reviglio & Agosti 2020)
  form.addGridItem()
    .setTitle('Kontrolle über die Personalisierung')
    .setHelpText(LIKERT_HELP)
    .setRows([
      'Ich verstand, warum mir bestimmte Inhalte vorgeschlagen wurden.',
      'Ich hatte das Gefühl, die Personalisierung kontrollieren zu können.',
      'Ich fühlte mich nicht von einem Algorithmus „gelenkt".'
    ])
    .setColumns(LIKERT_COLS);

  // VSD (Hendry, Friedman & Ballard 2021)
  form.addGridItem()
    .setTitle('Werte der App')
    .setHelpText(LIKERT_HELP)
    .setRows([
      'Die App vermittelte mir das Gefühl, dass mein Wohlbefinden ihr Ziel ist.'
    ])
    .setColumns(LIKERT_COLS);

  // ===================================================================
  //  Sektion 7 – Awareness: Bubble, Bias, Grenzen
  // ===================================================================
  form.addPageBreakItem()
    .setTitle('Bubble, Bias und Grenzen')
    .setHelpText('Zum Schluss: Wie kritisch reflektierst du das Erlebnis?');

  form.addGridItem()
    .setTitle('Filterblase / Themenblase')
    .setHelpText(LIKERT_HELP)
    .setRows([
      'Mir ist bewusst, dass personalisierte Medien meine Sicht einschränken können.',
      'Bei dieser App hatte ich das Gefühl, in einer Themenblase zu landen.',
      'Die Themenauswahl wirkte ausgewogen, nicht einseitig.',
      'Ich hatte das Gefühl, auch Informationen ausserhalb meiner gewohnten Themen-Bubble zu bekommen.'
    ])
    .setColumns(LIKERT_COLS);

  form.addGridItem()
    .setTitle('Verzerrungen (Bias) in der KI-Moderation')
    .setHelpText(LIKERT_HELP)
    .setRows([
      'In der Moderation gab es Aussagen, die mir voreingenommen vorkamen.',
      'Eine KI sollte ihre Quellen und Grenzen transparent machen.'
    ])
    .setColumns(LIKERT_COLS);

  form.addGridItem()
    .setTitle('Grenzen der App')
    .setHelpText(LIKERT_HELP)
    .setRows([
      'Es war mir klar, was die App leistet – und was nicht.',
      'Ich würde der KI nicht blind vertrauen.'
    ])
    .setColumns(LIKERT_COLS);

  // ===================================================================
  //  Sektion 8 – Offene Rückmeldung
  // ===================================================================
  form.addPageBreakItem()
    .setTitle('Offene Rückmeldung')
    .setHelpText('Fast geschafft! Hier hast du Platz für deine eigenen Worte.');

  form.addParagraphTextItem()
    .setTitle('Was hat dir besonders gefallen?')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Was hat dich gestört?')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Was würdest du dir wünschen?')
    .setRequired(false);

  form.addMultipleChoiceItem()
    .setTitle('Würdest du die App weiter nutzen?')
    .setChoiceValues(['Ja, regelmässig', 'Ja, gelegentlich', 'Nein, eher nicht', 'Nein, sicher nicht'])
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Begründung deiner Antwort (optional)')
    .setRequired(false);

  // ===================================================================
  //  Abschluss
  // ===================================================================
  form.setConfirmationMessage(
    'Vielen Dank für deine Teilnahme an der Attune-Pilotstudie! ' +
    'Deine Antworten helfen, das Konzept zu verbessern. ' +
    'Bei Fragen erreichst du mich unter moeckmic@students.zhaw.ch.'
  );

  // Ausgabe der URLs ins Ausführungsprotokoll
  Logger.log('Form erstellt!');
  Logger.log('Editor-URL (zum Bearbeiten):    ' + form.getEditUrl());
  Logger.log('Veröffentlichte URL (Teilnehmer): ' + form.getPublishedUrl());
}

