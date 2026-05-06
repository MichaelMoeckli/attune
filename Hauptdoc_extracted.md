**ZHAW Zürcher Hochschule für Angewandte Wissenschaften**

Institut für Wirtschaftsinformatik

**BSc-Thesis**

**Radio 25: Nutzerzentrierte Personalisierung**

**im vollautomatisierten Radio**

*Eine Konzeptstudie im Kontext von Digital Wellbeing*

Autor: Michael Möckli

Betreuer: Alexandre de Spindler

Stand: 25. April 2026

**1 Motivation**

Medienkonsum ist das Ergebnis eines Zusammenspiels zweier Seiten: Auf
der einen Seite stehen die Nutzenden mit ihren Bedürfnissen und
Motivationen wie Information, Unterhaltung, Orientierung, soziale
Zugehörigkeit und Identitätsbildung. Auf der anderen Seite stehen die
Anbieter mit ihren Geschäftsmodellen, Zielen und Anreizen wie
Reichweite, Nutzerbindung, Werbeeinnahmen und Marktanteilen.
Idealerweise stehen diese beiden Seiten in einem ausgewogenen
Verhältnis: Die Anbieter liefern Inhalte, die Bedürfnisse der Nutzenden
erfüllen, und erhalten dafür Aufmerksamkeit oder Entgelt. In den letzten
zwei Jahrzehnten hat sich dieses Gleichgewicht jedoch zunehmend
zugunsten der Anbieterseite verschoben, insbesondere im Bereich der
sozialen Medien (Zuboff, 2019; Montag & Elhai, 2023).

Dieses Kapitel beschreibt die daraus entstehende Problemlage entlang
ihrer beobachtbaren Erscheinungsformen: vom ökonomischen Fundament über
die konkreten Designmuster bis zu den dokumentierten Folgen auf
individueller und gesellschaftlicher Ebene. Die theoretische Einordnung
der hier sichtbaren Phänomene (Self-Determination Theory, Persuasive
Technology, Digital Wellbeing, Value-Sensitive Design) erfolgt
anschliessend in Kapitel 2.

**1.1 Das Spannungsfeld zwischen Nutzer und Anbieter**

Nutzende digitaler Medien verfolgen eine Bandbreite an Motiven, von
Information und Orientierung über Unterhaltung und Entspannung bis zu
sozialer Zugehörigkeit und Identitätsbildung. Wird ein Medium diesen
Motiven gerecht, entstehen Zufriedenheit und das Erleben, kompetent und
selbstbestimmt mit dem Angebot umzugehen. Eine ausführliche theoretische
Fundierung dieser Bedürfnisse, namentlich entlang des
Uses-and-Gratifications-Ansatzes (Katz, Blumler & Gurevitch, 1973) und
der Self-Determination Theory (Ryan & Deci, 2000), erfolgt in Abschnitt
2.1.2.

Die Motivationen der Anbieter hingegen sind primär ökonomischer Natur.
Kommerzielle Plattformen wie TikTok, Instagram, Facebook oder YouTube
finanzieren sich überwiegend durch Werbung. Ihr zentrales
Zielgrössensystem sind Engagement-Metriken: Verweildauer, Klicks,
Impressions, Interaktionsrate. Diese Grössen entscheiden über den
Werbepreis und damit über den Ertrag. Alle zentralen
Designentscheidungen, von der Rangfolge der Inhalte bis zur Gestaltung
der Benutzeroberfläche, orientieren sich an diesen Metriken.

Solange die Ziele beider Seiten in die gleiche Richtung zeigen, ist
dieses System funktional. Problematisch wird es dort, wo die Maximierung
der Verweildauer nicht mehr mit dem Wohlbefinden der Nutzenden
übereinstimmt, etwa weil Inhalte bewusst emotional aufgeladen werden,
weil Nutzungssessions künstlich verlängert werden oder weil Vielfalt
zugunsten reiner Relevanz geopfert wird. Genau dies ist in den letzten
Jahren empirisch immer besser dokumentiert (Burr et al., 2020; Milano et
al., 2020).

**1.2 Das Geschäftsmodell der Aufmerksamkeitsökonomie**

Zuboff (2019) beschreibt die Grundlogik dieser Plattformen als
Überwachungskapitalismus: Nutzerverhalten wird systematisch erfasst, als
«Verhaltensüberschuss» aufbereitet und zur Vorhersage und gezielten
Beeinflussung zukünftigen Verhaltens eingesetzt. Der Rohstoff der
Plattformen ist damit nicht der Inhalt, sondern die Aufmerksamkeit sowie
die Datenspuren, die sie erzeugt. Je länger Nutzende auf der Plattform
verbleiben, je stärker sie interagieren und je mehr Datenpunkte sie
hinterlassen, desto präziser lassen sich Vorhersagen treffen und
Werbeinventare monetarisieren.

Die Asymmetrie dieses Modells ist strukturell: Während die Plattformen
immer mehr über ihre Nutzenden wissen, bleibt den Nutzenden verborgen,
welche Daten erhoben, wie sie interpretiert und mit welchem Ziel sie
eingesetzt werden. Das in der Folge entstehende Steuerungsdefizit auf
Nutzerseite wird in Abschnitt 1.6 als beobachtbares Phänomen beschrieben
und in Abschnitt 2.3.4 unter dem Begriff der algorithmischen
Souveränität (Reviglio & Agosti, 2020) theoretisch eingeordnet.

**1.3 Manipulative Designmuster**

Die ökonomische Logik manifestiert sich in konkreten Designmustern, die
gezielt auf Schwachstellen der menschlichen Psyche zielen. Zu den am
besten dokumentierten Mustern gehören:

-   Endloses Scrollen (Infinite Scroll), das natürliche
    Unterbrechungspunkte entfernt und die Verweildauer verlängert.

-   Variable Belohnungsmuster nach dem Vorbild des Glücksspiels:
    unvorhersehbare Erfolgserlebnisse (Likes, neue Inhalte, Matches)
    halten die Aufmerksamkeit aufrecht.

-   Push-Benachrichtigungen, die andere Tätigkeiten unterbrechen und
    Nutzende zurück auf die Plattform holen.

-   Autoplay und ähnliche Automatismen, die stellvertretend über den
    nächsten Inhalt entscheiden.

-   Social-Proof- und Reziprozitätsmechanismen, die soziale
    Grundbedürfnisse (Bestätigung, Gegenseitigkeit) für die
    Plattformbindung nutzen.

Montag et al. (2019) dokumentieren strukturelle Parallelen zwischen den
Mechaniken sozialer Medien und den suchtfördernden Designs von
Glücksspiel- und Freemium-Games. Welche theoretischen Konzepte hinter
dieser gezielten Verhaltensbeeinflussung stehen, namentlich Persuasive
Technology (Fogg, 2003) und Digital Nudging (Weinmann, Schneider & vom
Brocke, 2016), wird in Abschnitt 2.2.6 systematisch entwickelt.

**1.4 Filterblasen, Echokammern und Polarisierung**

Die Optimierung auf Engagement-Metriken hat nicht nur individuelle,
sondern auch kollektive Folgen. Der Begriff der «Filterblase» wurde von
Pariser (2011) geprägt und beschreibt das Phänomen, dass personalisierte
Algorithmen Nutzende zunehmend mit ihnen bereits vertrauten Inhalten
umgeben und abweichende Perspektiven systematisch ausblenden. Nguyen et
al. (2014) wiesen in einer der ersten empirischen Studien nach, dass
Empfehlungssysteme die inhaltliche Vielfalt individueller
Nutzungsprofile messbar reduzieren. Geschke, Lorenz und Holtz (2019)
modellierten mit agentenbasierter Simulation, dass diese Filterung auf
drei Ebenen gleichzeitig wirkt und sich gegenseitig verstärkt:
individuell (selektive Wahrnehmung), sozial (homogene Netzwerke) und
technologisch (algorithmische Kuration). Dieses Zusammenspiel
beschreiben sie als sogenannte Triple-Filter-Bubble.

Sunstein (2017) beschreibt, wie diese Informationsarchitekturen die
gesellschaftliche Polarisierung befeuern: Wenn Nutzende bevorzugt mit
Inhalten konfrontiert werden, die ihre bestehende Meinung bestätigen,
verschärfen sich die Gräben zwischen unterschiedlichen Weltsichten.
Dabei ist wichtig, dass dies nicht allein ein Problem der Algorithmen
ist (menschliche kognitive Verzerrungen wie der Confirmation Bias wirken
in die gleiche Richtung), sondern dass die Algorithmen bestehende
Tendenzen systematisch verstärken, weil polarisierende und
emotionalisierende Inhalte stärkere Reaktionen und damit höheres
Engagement auslösen. Vosoughi, Roy und Aral (2018) belegen dies
empirisch anhand einer grossangelegten Twitter-Analyse: Falsch- und
Sensationsinformationen verbreiten sich im Durchschnitt schneller,
tiefer und breiter als vergleichbare wahre Inhalte, was primär auf die
stärkere emotionale Reaktion der Nutzenden zurückzuführen ist.

**1.5 Psychisches Wohlbefinden und Suchtverhalten**

Die Folgen für das individuelle Wohlbefinden sind inzwischen empirisch
vielfach untersucht. Verduyn et al. (2015) zeigen in einer
experimentellen und längsschnittlichen Studie, dass passive
Facebook-Nutzung (Konsumieren ohne aktive Teilnahme) das affektive
Wohlbefinden nachweislich untergräbt, während aktive, kommunikative
Nutzung neutral oder sogar positiv wirkt.

Orben (2020) relativiert in einem umfassenden Narrative Review die oft
überzeichneten Effektgrössen der Medienpsychologie, bestätigt aber den
grundsätzlichen Zusammenhang zwischen Medienkonsum und Wohlbefinden.
Entscheidend ist weniger die blosse Nutzungsdauer als vielmehr die Art
der Nutzung: Passive, algorithmisch gesteuerte Konsumation zeigt
negative Effekte; aktive, selbstgesteuerte Nutzung hat neutrale bis
positive Effekte. Damit verschiebt sich die Debatte von Bildschirmzeit
als rein quantitativem Mass hin zur Qualität und Selbstbestimmung der
Nutzung.

Eng verbunden mit dem Wohlbefindens-Diskurs ist die Frage nach dem
Suchtpotenzial sozialer Medien. Montag et al. (2019) argumentieren, dass
die Kombination aus variablen Belohnungsmustern, sozialer Einbettung und
algorithmischer Relevanzoptimierung Nutzungsmuster erzeugt, die
klinischen Kriterien für Verhaltensabhängigkeiten ähneln. Nutzende
beschreiben häufig das subjektive Erleben, «zu viel Zeit zu verlieren»
oder Plattformen trotz besserer Absicht nicht abschalten zu können.

**1.6 Verlust der Nutzerautonomie**

Über die direkten psychischen Folgen hinaus entsteht ein
grundsätzlicheres Problem: der Verlust von Autonomie. In der Praxis
manifestiert sich dieser Autonomieverlust auf mehreren Ebenen: Nutzende
sehen nicht, warum ein bestimmter Inhalt ausgespielt wird (Black Box).
Sie können die zugrundeliegende Logik nicht substanziell ändern. Ihre
Steuerungsmöglichkeiten beschränken sich auf oberflächliche
Stellschrauben («diesen Kanal nicht mehr anzeigen», «Interesse
bekunden»), während die tieferen Entscheidungsstrukturen intransparent
bleiben.

Der theoretische Rahmen für diese Beobachtung, namentlich die
Self-Determination Theory (Ryan & Deci, 2000) mit dem Grundbedürfnis
nach Autonomie sowie das METUX-Modell für nutzerzentrierte
Produktgestaltung (Peters, Calvo & Ryan, 2018), wird in Abschnitt 2.3.1
vertieft. Auf der politisch-systemischen Ebene fordern Reviglio und
Agosti (2020) eine algorithmische Souveränität, die in Abschnitt 2.3.4
entfaltet wird; Milano, Taddeo und Floridi (2020) ergänzen aus Sicht der
Empfehlungssystem-Ethik, dass neben Relevanz auch Diversität, Fairness
und Nutzerwohl als explizite Optimierungsziele in den Algorithmen
verankert werden müssen.

**1.7 Zwischenfazit: Der Kern des Problems**

Das Problem sozialer Medien ist nicht die Personalisierung an sich.
Personalisierung kann ein wertvolles Instrument sein, um Inhalte für
einzelne Menschen relevant und bereichernd zu machen. Problematisch ist
die einseitige Ausrichtung der Personalisierung auf die Ziele der
Anbieter: Plattformen, die ursprünglich als Werkzeuge zur Information,
Vernetzung und Unterhaltung gedacht waren, haben sich zu Systemen
entwickelt, die primär ihre eigene Nutzungszeit maximieren, häufig auf
Kosten der Nutzenden.

Die Forschungslage zeigt drei miteinander verwobene Aspekte dieses
Ungleichgewichts. Erstens ist es kein Zufall, sondern strukturell im
werbefinanzierten Geschäftsmodell angelegt (Zuboff, 2019; Montag &
Elhai, 2023). Zweitens hat es messbare negative Folgen auf
Informationsvielfalt, soziale Kohäsion und individuelles Wohlbefinden
(Nguyen et al., 2014; Geschke et al., 2019; Verduyn et al., 2015; Orben,
2020). Drittens verfügen Nutzende in den aktuellen Systemen kaum über
die Möglichkeit, dieses Ungleichgewicht selbst zu korrigieren (Reviglio
& Agosti, 2020; Milano et al., 2020).

Aus dieser Problemlage erwächst die grundlegende Frage, welche
Prinzipien, Kriterien und Mechanismen nötig sind, um digitale Medien so
zu gestalten, dass die Bedürfnisse der Nutzenden wieder in den
Mittelpunkt rücken. Das nachfolgende Kapitel ordnet die in diesem
Kapitel sichtbar gewordenen Phänomene in den wissenschaftlichen Kontext
ein und stellt die Beurteilungsgrundlagen bereit, an denen sich der
Lösungsvorschlag dieser Arbeit später messen lässt.

**2 Background**

Dieses Kapitel ordnet die in Kapitel 1 sichtbar gewordenen Phänomene
wissenschaftlich und technisch ein. Es beantwortet drei Leitfragen: (1)
Welche Bedürfnisse und Motivationen prägen Nutzende und Anbieter
digitaler Medien theoretisch? (2) In welchen technischen Mechanismen
manifestieren sich diese Motivationen? (3) An welchen Kriterien lassen
sich diese Mechanismen beurteilen? Damit liefert dieses Kapitel den
theoretischen Rahmen, an dem der in Kapitel 3 vorgestellte
Lösungsvorschlag entwickelt und in der späteren Validierung gemessen
wird. Das methodische Vorgehen der Literaturrecherche, auf der dieses
Kapitel beruht, ist in Abschnitt 5.1 dokumentiert.

**2.1 Bedürfnisse und Motivationen der Akteure**

**2.1.1 Anbieterseite**

Anbieter digitaler Medien verfolgen unterschiedliche Motive, die sich
drei idealtypischen Kategorien zuordnen lassen.

-   Kommerzielle Plattformen (TikTok, Meta, YouTube, X) finanzieren sich
    primär werbebasiert. Ihr zentrales Geschäftsziel ist die Maximierung
    von Aufmerksamkeit und Datenspuren, die an Werbetreibende
    weiterverkauft werden (Zuboff, 2019).

-   Abonnement- und On-Demand-Anbieter (Netflix, Spotify, Disney+) leben
    von langfristiger Kundenbindung. Ihr Ziel ist Engagement im Sinne
    von Zufriedenheit und Retention, nicht primär Scroll-Dauer.

-   Öffentlich-rechtliche und redaktionelle Anbieter (SRF, BBC, NZZ,
    DLF) folgen Leitbildern wie Bildungs-, Informations- und
    Kulturvermittlung. Sie finanzieren sich über Gebühren oder
    Abonnements und haben normative Verpflichtungen gegenüber
    Pluralismus und Qualität.

Diese unterschiedlichen Motive führen zu unterschiedlichen
Inhaltsstrategien und technischen Architekturen. Insbesondere
werbebasierte Plattformen haben starke ökonomische Anreize,
Engagement-Metriken zu maximieren; in den beiden anderen Modellen ist
dieser Anreiz deutlich schwächer ausgeprägt.

**2.1.2 Nutzerseite**

Auf der Nutzerseite lassen sich die in Abschnitt 1.1 genannten Motive
entlang etablierter theoretischer Rahmen ordnen. Aus dem
Uses-and-Gratifications-Ansatz (Katz, Blumler & Gurevitch, 1973) ergeben
sich vier typische Nutzungsmotive: Information, Unterhaltung, soziale
Interaktion und Identitätsbildung.

Ergänzend identifizieren Ryan und Deci (2000) in der Self-Determination
Theory drei psychologische Grundbedürfnisse, die für intrinsische
Motivation und Wohlbefinden zentral sind:

-   Autonomie: das Erleben, selbstbestimmt zu handeln und eigene
    Entscheidungen zu treffen;

-   Kompetenz: das Gefühl, wirksam zu sein und Herausforderungen
    bewältigen zu können;

-   soziale Eingebundenheit: das Erleben von bedeutungsvollen
    Beziehungen und Zugehörigkeit.

Peters, Calvo und Ryan (2018) übertragen diese Perspektive im
METUX-Modell (Motivation, Engagement and Thriving in User Experience)
direkt auf die Gestaltung digitaler Produkte: Ein System fördert
Wohlbefinden, wenn es diese Grundbedürfnisse auf mehreren Ebenen
(Adoption, Benutzeroberfläche, Aufgabe, Verhalten, Leben) unterstützt,
und untergräbt es, wenn es sie blockiert. Dieses Modell wird in
Abschnitt 2.3.1 als zentrale Beurteilungsgrundlage erneut aufgegriffen.

Vanden Abeele (2021) konzeptualisiert das übergeordnete Nutzerbedürfnis
nach einem ausgewogenen Medienkonsum als Digital Wellbeing: die
subjektive, individuelle Erfahrung einer optimalen Balance zwischen den
Vorteilen und Nachteilen digitaler Konnektivität. Diese Balance ist
dynamisch, kontextabhängig und nicht allein durch Nutzungsdauer messbar.

**2.2 Mechanismen digitaler Medienangebote**

Die Motivationen beider Seiten schlagen sich in konkreten technischen
Mechanismen nieder. Im Folgenden werden die zentralen Mechanismen
aktueller Medienangebote beschrieben und ihre Funktionsweise skizziert.

**2.2.1 Klassifikation und Ontologien**

Inhalte müssen strukturiert werden, damit sie auffindbar und empfehlbar
sind. Klassifikationssysteme ordnen Inhalte entlang festgelegter
Kategorien (Genre, Thema, Stimmung, Zielgruppe). Ontologien gehen
darüber hinaus und modellieren semantische Beziehungen zwischen
Konzepten, etwa die Zugehörigkeit von Subgenres zu Obergenres oder
Ähnlichkeiten zwischen Themen. Auf der Nutzerseite werden analoge
Strukturen verwendet, um Interessensprofile explizit oder implizit zu
repräsentieren. Die Qualität dieser Strukturen prägt massgeblich die
Qualität späterer Empfehlungen.

**2.2.2 Suche**

Suchmechanismen sind der klassische aktive Zugang zu Inhalten: Die
Nutzenden formulieren eine Anfrage, das System liefert eine
Ergebnisliste. Die Relevanzbewertung basiert historisch auf Textmatching
und Linkstrukturen, zunehmend auch auf semantischen Embeddings und
personalisierten Signalen. Suche ist vergleichsweise transparent, da die
Intention von den Nutzenden formuliert wird. Zugleich wächst die
Intransparenz dort, wo Personalisierung die Trefferlisten unsichtbar
verändert.

**2.2.3 Empfehlungssysteme**

Empfehlungssysteme (Recommender Systems) schlagen Inhalte vor, ohne dass
die Nutzenden aktiv danach suchen. In der Standardliteratur werden drei
klassische Hauptparadigmen unterschieden (Ricci, Rokach & Shapira,
2015):

-   Kollaboratives Filtern: Empfehlungen auf Basis der Ähnlichkeit
    zwischen Nutzenden (Prinzip: «Personen, die X mochten, mochten auch
    Y»).

-   Inhaltsbasiertes Filtern: Empfehlungen auf Basis der Ähnlichkeit
    zwischen Inhalten und des bisherigen Nutzerprofils.

-   Hybride und Deep-Learning-basierte Ansätze: Kombination der obigen
    Verfahren mit impliziten Signalen (Verweildauer, Scrolltiefe,
    Wiederholungen) und tiefen neuronalen Modellen, wie sie in Feeds von
    TikTok oder Instagram dominieren.

Die Optimierung erfolgt in der kommerziellen Praxis überwiegend auf
Engagement-Metriken. Nguyen et al. (2014) zeigen, dass dies zur
Einengung der inhaltlichen Vielfalt führt. Milano, Taddeo und Floridi
(2020) systematisieren die daraus folgenden ethischen Herausforderungen
entlang sechs Dimensionen: Inhaltsqualität, Privatsphäre, Autonomie,
Meinungsvielfalt, soziale Auswirkungen und Verantwortlichkeit.

**2.2.4 Personalisierung und Feed-Kuration**

Über die reine Empfehlung hinaus kuratieren Plattformen ganze Feeds,
also ständig aktualisierte Inhaltsströme, die auf die einzelne Person
zugeschnitten sind. Die Entscheidungslogik ist typischerweise nicht
einsehbar: Das, was die Nutzenden sehen, ist das Ergebnis tausender
implizit gelernter Signale, deren genaues Zusammenspiel selbst die
Entwicklerinnen und Entwickler oft nur noch approximativ beschreiben
können. Reviglio und Agosti (2020) fordern in diesem Zusammenhang eine
algorithmische Souveränität: die Möglichkeit, die Logiken zu verstehen,
zu modifizieren und bewusst zu steuern.

**2.2.5 Sharing und soziale Mechanismen**

Teilen, Kommentieren und Reagieren erzeugen Netzwerkeffekte: Inhalte
verbreiten sich viral, wenn sie starke emotionale Reaktionen auslösen.
Diese Mechanismen sind nicht neutral, sondern begünstigen systematisch
emotional aufgeladene, oft polarisierende Inhalte und wirken damit auf
die in Abschnitt 1.4 beschriebene Triple-Filter-Bubble (Geschke et al.,
2019; Sunstein, 2017).

**2.2.6 Persuasive Design und Nudging**

Die in Abschnitt 1.3 als Beobachtung beschriebenen Designmuster lassen
sich theoretisch mit zwei zentralen Konzepten einordnen. Fogg (2003)
beschreibt mit dem Modell der Persuasive Technology, wie Computer als
Werkzeuge, Medien und soziale Akteure Verhalten beeinflussen können. Die
konkreten Techniken reichen von Erinnerungsfunktionen über spielerische
Belohnungen bis zu sozialem Feedback. Weinmann, Schneider und vom Brocke
(2016) erweitern diesen Ansatz mit dem Konzept des Digital Nudging:
subtile Gestaltungshinweise, die das Verhalten in eine bestimmte
Richtung lenken, ohne die Wahlfreiheit einzuschränken.

Beide Ansätze sind wertneutral. In der kommerziellen Praxis werden sie
jedoch überwiegend zur Engagement-Maximierung eingesetzt; sie liessen
sich ebenso im Sinne des Nutzerwohls anwenden (Peters et al., 2018).
Genau diese Umkehrung der Zielfunktion bei sonst vergleichbarem
Mechanismus ist ein zentrales Designprinzip des in Kapitel 3
vorgestellten Lösungsvorschlags.

**2.2.7 Monetarisierungsmechanismen**

Die beschriebenen Mechanismen stehen in unmittelbarer Wechselwirkung mit
der Monetarisierung. Werbebasierte Plattformen koppeln Empfehlungen,
Feeds und persuasive Muster systematisch an Engagement-Metriken, während
abonnementbasierte Anbieter tendenziell auf Retention-Metriken
optimieren und öffentlich-rechtliche Anbieter auf Erfüllungskennzahlen
wie Reichweite und Vielfalt. Die Wahl der Monetarisierung prägt damit
das Verhalten der Mechanismen ebenso stark wie ihre technische
Architektur (Zuboff, 2019; Montag & Elhai, 2023).

**2.3 Beurteilungsgrundlagen**

Um die oben beschriebenen Mechanismen bewerten zu können, braucht es
explizite Kriterien. Die Literatur stellt mehrere etablierte
theoretische Rahmen zur Verfügung, die sich ergänzen und in der späteren
Evaluation des Lösungsvorschlags als Bewertungsmassstab dienen.

**2.3.1 Self-Determination Theory (SDT)**

Die Self-Determination Theory (Ryan & Deci, 2000) liefert mit den drei
psychologischen Grundbedürfnissen Autonomie, Kompetenz und soziale
Eingebundenheit einen psychologischen Massstab für die Beurteilung
digitaler Systeme. Mechanismen sind förderlich, wenn sie diese
Bedürfnisse unterstützen, und schädlich, wenn sie sie untergraben.
Insbesondere die Autonomie wird in den heutigen Plattformlogiken
systematisch unterlaufen, wenn Nutzende durch manipulative Designmuster
in Nutzungsschleifen gehalten werden (Peters, Calvo & Ryan, 2018).

Peters et al. (2018) operationalisieren die SDT für die Gestaltung
digitaler Produkte im METUX-Modell (Motivation, Engagement and Thriving
in User Experience). METUX unterscheidet fünf Ebenen, auf denen ein
System die Grundbedürfnisse fördern oder hemmen kann: Adoption,
Interface, Aufgabe, Verhalten und Leben. Diese mehrstufige Sicht erlaubt
es, Designentscheidungen differenziert daraufhin zu prüfen, ob sie das
Wohlbefinden auf der unmittelbaren Bedienebene und zugleich auf der
übergeordneten Ebene des Lebensvollzugs unterstützen.

**2.3.2 Value-Sensitive Design (VSD)**

Value-Sensitive Design (Hendry, Friedman & Ballard, 2021) ist eine
Methodik, die menschliche Werte systematisch in den Entwurf technischer
Systeme einbezieht. Drei Untersuchungsebenen werden unterschieden:
konzeptionell (welche Werte sind relevant?), empirisch (wie nehmen
Betroffene diese Werte wahr?) und technisch (wie werden sie im System
verankert?). VSD liefert einen strukturierten Rahmen, um Werte wie
Autonomie, Transparenz oder Wohlbefinden explizit in
Designentscheidungen zu überführen.

**2.3.3 Digital Wellbeing**

Digital Wellbeing beschreibt die Qualität des Medienkonsums aus
Perspektive der Nutzenden. Calvo und Peters (2014) haben mit dem Ansatz
des «Positive Computing» die grundlegende Forderung formuliert, dass
digitale Systeme aktiv das menschliche Wohlbefinden und Aufblühen
fördern sollen, statt es nur zu vermeiden, Schaden zu verursachen.
Vanden Abeele (2021) betont ergänzend den dynamischen Charakter von
Digital Wellbeing: Wellbeing ist keine absolute Grösse, sondern eine
kontextabhängige Balance. Burr, Taddeo und Floridi (2020) fordern, dass
Technologiedesign aktiv zum Wohlbefinden beitragen soll statt es zu
untergraben, und entwickeln dafür einen thematischen Ordnungsrahmen.
Peters, Ahmadpour und Calvo (2020) konkretisieren diesen Anspruch in
einem Framework für Wellbeing-Supportive Design, das Features,
Charakteristika und Prototypen systematisch katalogisiert.

**2.3.4 Ethik von Empfehlungssystemen und algorithmische Souveränität**

Milano et al. (2020) systematisieren die ethischen Herausforderungen von
Empfehlungssystemen und argumentieren, dass neben Relevanz auch
Diversität, Fairness und Nutzerwohl als Optimierungsziele verankert
werden müssen. Reviglio und Agosti (2020) ergänzen die politische
Dimension und fordern algorithmische Souveränität, also eine echte,
bedeutungsvolle Kontrolle über die Algorithmen, die Inhalte kuratieren.
Die in Abschnitt 1.6 beobachtete Asymmetrie zwischen System und
Nutzenden lässt sich damit nicht nur als individueller Autonomieverlust
(SDT), sondern auch als strukturelles Souveränitätsdefizit lesen.

**2.3.5 Gebrauchstauglichkeit und Akzeptanz**

Neben den normativen Kriterien spielt die klassische
Gebrauchstauglichkeit eine Rolle. Der System Usability Scale (Brooke,
1996; Bangor, Kortum & Miller, 2008) ist ein etabliertes, kurzes
Messinstrument, das die subjektive Usability eines Systems mit zehn
Items erhebt und in der vorliegenden Arbeit ergänzend zu den
wellbeing-bezogenen Massen eingesetzt werden kann.

**2.4 Gegenüberstellung der Medienmodelle**

Die beschriebenen Mechanismen und Kriterien lassen sich entlang von drei
idealtypischen Medienmodellen zusammenfassen: einem
traditionell-redaktionellen Modell (z. B. öffentlich-rechtliches Radio),
einem engagement-optimierten Modell (z. B. TikTok, Instagram) und einem
wellbeing-orientierten Modell, das diese Arbeit konzipiert und
prototypisch umsetzt.

Die Gegenüberstellung zeigt: Jedes Modell hat spezifische Stärken und
Schwächen. Das redaktionelle Modell steht für Qualität und Pluralismus,
bietet aber wenig Personalisierung und schlechtere Verfügbarkeit. Das
engagement-optimierte Modell bietet hohe Relevanz und Verfügbarkeit,
jedoch um den Preis von Vielfalt, Transparenz und Autonomie. Das
wellbeing-orientierte Modell versucht, Personalisierung mit Transparenz,
Nutzerkontrolle und Qualität zu verbinden, ist aber in der Praxis bisher
kaum in durchgängigen Artefakten umgesetzt.

  ----------------- ------------------------------------------ ------------------------------------------- ------------------------------------------
  **Dimension**     **Redaktionelles Modell**                  **Engagement-optimiertes Modell**           **Wellbeing-orientiertes Modell**
  Kuration          Menschliche Redaktion                      Algorithmisch, auf Verweildauer optimiert   Algorithmisch, auf Nutzerwohl optimiert
  Transparenz       Redaktionsstatut, öffentliche Leitlinien   Black-Box-Algorithmus                       Nachvollziehbare Kriterien, offene Logik
  Nutzerkontrolle   Gering (fixer Programmplan)                Minimal (Like/Skip, Interessen-Tagging)     Aktiv (Themen, Filter, Intensität)
  Inhaltsvielfalt   Pluralismusauftrag                         Filterblasen, Echokammern                   Bewusste Diversifikation, Serendipität
  Zeitmanagement    Sendezeiten, Programmrahmen                Endloses Scrollen, Autoplay                 Definierte Länge, natürliche Pausen
  Finanzierung      Gebühren, Abonnement                       Werbung, Datenhandel                        Variabel (Gebühren, Abo, Stiftung)
  Leitwert          Qualität, Pluralismus                      Gewinnmaximierung                           Nutzerwohl, Autonomie
  ----------------- ------------------------------------------ ------------------------------------------- ------------------------------------------

**2.5 Forschungslücke**

Aus der Literatur wird deutlich, dass die theoretischen Grundlagen für
eine nutzerzentrierte, wellbeing-orientierte Gestaltung digitaler Medien
vorhanden sind: Self-Determination Theory, Value-Sensitive Design,
Digital Wellbeing, Persuasive Technology und algorithmische Souveränität
liefern einen dichten konzeptionellen Rahmen. Auch die Probleme der
engagement-getriebenen Modelle sind sowohl theoretisch als auch
empirisch gut dokumentiert.

Gleichzeitig fehlen konkrete, lauffähige Artefakte, die diese Prinzipien
in einem integrierten System zeigen. Bestehende Ansätze bleiben entweder
auf konzeptioneller Ebene (Peters et al., 2020; Hendry et al., 2021)
oder beschränken sich auf einzelne Features wie Bildschirmzeit-Tracker
und Wochenberichte, die der strukturellen Logik der Plattformen nichts
entgegensetzen. Ein durchgängiges Demonstrationsmedium, das
Personalisierung, Transparenz und Wellbeing in einem funktionierenden
System verbindet und damit der Engagement-Logik ein konkretes
Gegenmodell zur Seite stellt, steht aus. Genau diese Lücke adressiert
die vorliegende Arbeit; die Forschungsfrage sowie der Lösungsvorschlag
werden in den nachfolgenden Kapiteln entwickelt.

**3 Radio 25 als Forschungsartefakt**

Aus der in Kapitel 2 dargestellten Forschungslücke leitet sich die
Notwendigkeit eines konkreten, lauffähigen Demonstrationsmediums ab, an
dem die diskutierten Prinzipien der nutzerzentrierten Personalisierung
sicht- und untersuchbar werden. Die vorliegende Arbeit setzt diesen
Lösungsvorschlag in Form eines vollautomatisierten, KI-gestützten Radios
um, im Folgenden als Radio 25 bezeichnet. Dieses Kapitel begründet die
Wahl des Mediums, beschreibt den geplanten Untersuchungsgegenstand und
ordnet die zu untersuchenden Mechanismen den in Kapitel 2 entwickelten
Beurteilungsgrundlagen zu.

**3.1 Warum ein Radio als Untersuchungsmedium?**

Ein Radio eignet sich aus mehreren Gründen besonders gut, um die
Spannungsfelder zwischen Engagement-Optimierung und Nutzerwohl
experimentell zu untersuchen.

Erstens vereint ein Radio in einem einzigen Format mehrere Inhaltsarten,
die in der bisherigen Forschung getrennt betrachtet werden: Nachrichten,
Wetter- und Service-Informationen, Moderation, Musik sowie Jingles.
Damit lassen sich an einem Artefakt sowohl informative als auch
unterhaltende Bedürfnisse abbilden, die der
Uses-and-Gratifications-Ansatz unterscheidet (Katz et al., 1973), und es
können verschiedene Empfehlungs- und Kurationsmechanismen unter
realistischen Bedingungen kombiniert werden.

Zweitens ist Radio ein lineares, zeitlich gerahmtes Medium. Im Gegensatz
zu Feeds mit endlosem Scrollen besitzt eine Sendung einen definierten
Anfang und ein definiertes Ende. Diese Eigenschaft macht es möglich,
gezielt diejenigen Designmuster zu vermeiden, die in Kapitel 1 als
problematisch identifiziert wurden (endloses Scrollen, Autoplay,
künstliche Verlängerung von Sessions), und stattdessen alternative,
wellbeing-fördernde Strukturen wie natürliche Pausen, klare
Sendungslängen und bewusste Abschlusspunkte zu erproben (Vanden Abeele,
2021; Peters et al., 2018).

Drittens ist Radio ein begleitendes Medium. Es wird häufig parallel zu
anderen Tätigkeiten konsumiert (am Morgen, beim Pendeln, bei der Arbeit)
und nimmt damit eine Rolle ein, die sich von aufmerksamkeitsbindenden
visuellen Plattformen wesentlich unterscheidet. Diese Nutzungsform ist
mit den Zielen von Digital Wellbeing kompatibler als mit denen einer
rein visuellen Aufmerksamkeitsökonomie und stellt deshalb einen
besonders ehrlichen Prüfstand für nutzerzentrierte Personalisierung dar.

Viertens lässt sich an einem vollautomatisierten Radio die gesamte
Wertschöpfungskette technisch beherrschen. Die Inhalte werden nicht aus
einem geschlossenen Empfehlungssystem eines Drittanbieters bezogen,
sondern in einer eigenen Pipeline aus Quellen-Aggregation,
Sprachmodell-basierter Moderation und Sprachsynthese erzeugt. Dadurch
lassen sich Personalisierungslogik, Transparenz, Diversität und
Nutzerkontrolle in einem einzigen, durchgängigen System experimentell
variieren, was bei kommerziellen Plattformen aus methodischen Gründen
ausgeschlossen ist.

Fünftens existiert mit dem öffentlich-rechtlichen Radio (SRF, DLF, BBC)
ein etabliertes redaktionelles Vergleichsmodell, das sich an Pluralismus
und Qualität orientiert. Damit liegt für jede der drei in Abschnitt 2.4
verglichenen Medienlogiken (redaktionell, engagement-optimiert,
wellbeing-orientiert) ein realer oder konstruierter Referenzfall vor, an
dem sich das wellbeing-orientierte Modell argumentativ wie empirisch
positionieren kann.

**3.2 Warum genau dieser Radio-Prototyp?**

Aus den genannten Gründen wäre prinzipiell jedes Radio als
Forschungsobjekt geeignet. Zwei Eigenschaften machen jedoch genau die in
dieser Arbeit umgesetzte Form, also ein vollautomatisiertes,
KI-gestütztes und individuell zugeschnittenes Radio, besonders
aussagekräftig.

Zum einen erlaubt die Vollautomatisierung über Sprachmodelle und
Sprachsynthese erst eine echte Personalisierung, die über die Auswahl
von Themen oder Sendern hinausgeht. Wo klassische Radios denselben
linearen Programmstrom an alle Hörerinnen und Hörer ausspielen, kann ein
automatisiertes Radio für jede einzelne Person Inhalte, Tonalität,
Reihenfolge und Länge der Sendung individuell zusammenstellen. Damit
wird ein Mechanismus untersuchbar, den klassische Radios technisch gar
nicht bedienen können: Personalisierung als kontextsensitive,
nutzerinitiierte Anpassung.

Zum anderen demonstriert ein KI-gestütztes Radio dieselben Technologien,
die in kommerziellen Plattformen heute zur Engagement-Optimierung
eingesetzt werden, jedoch konsequent mit umgekehrter Zielfunktion: nicht
Verweildauer und Klickrate, sondern Autonomie, Transparenz und
subjektives Wohlbefinden. Genau diese Umkehrung der Optimierungsfunktion
bei sonst vergleichbarem Technologie-Stack ist die methodische Pointe
der Arbeit. Sie erlaubt es, zu zeigen, dass die problematischen Effekte
engagement-optimierter Systeme nicht in der zugrundeliegenden
Technologie selbst, sondern in deren Zielsetzung begründet liegen.

Schliesslich ist ein Radio als Forschungsartefakt mit überschaubarem
Aufwand realisierbar und gleichzeitig reichhaltig genug, um die
zentralen Designentscheidungen einer wellbeing-orientierten Plattform
durchgängig abzubilden. Es benötigt keinen redaktionellen Apparat, keine
soziale Komponente und keine Empfehlungs-Infrastruktur eines
Drittanbieters und kann dennoch Personalisierung, Inhaltsdiversität,
Transparenz und Zeitgestaltung in einem konsistenten Erlebnis
kombinieren.

**3.3 Was an Radio 25 konkret umgesetzt wird**

Radio 25 ist als prototypischer Demonstrator konzipiert, der die in
Kapitel 2 beschriebenen Mechanismen exemplarisch in einer
wellbeing-orientierten Variante zeigt. Die folgenden Bausteine werden
umgesetzt.

**3.3.1 Explizite Präferenzangaben und Profilkonstruktion**

Die Hörerinnen und Hörer geben ihre Interessen, ihren Standort und einen
Moderationsstil aktiv und nachvollziehbar an. Anders als bei
Plattformen, die Profile primär aus implizitem Verhalten lernen, bleibt
das Profil bei Radio 25 transparent, einsehbar und jederzeit
veränderbar. Damit wird die Anforderung an algorithmische Souveränität
(Reviglio & Agosti, 2020) konkret operationalisierbar, ohne die
Nutzenden mit einem aufwendigen Konfigurationsritual zu überfordern.

**3.3.2 Vollautomatisierte Sendungspipeline**

Eine einzige Pipeline aggregiert Nachrichten- und Wetterdaten aus
offenen Quellen, generiert daraus mit einem Sprachmodell die
Moderationstexte und überführt diese mit einer Sprachsynthese in eine
zusammenhängende Sendung aus Jingles, Begrüssung, Nachrichten, Musik,
Wetter und Verabschiedung. Sie ersetzt die klassische Redaktion durch
eine maschinelle, aber regelgeleitete Inhaltsproduktion und macht das
Funktionsprinzip kommerzieller Empfehlungs-Pipelines an einem
nicht-kommerziellen Beispiel sichtbar.

**3.3.3 Kuratierungs- und Empfehlungslogik mit alternativem Zielwert**

Die Auswahl und Reihenfolge der Inhalte folgt nicht der Maximierung von
Verweildauer, sondern explizit definierten, am Nutzerwohl ausgerichteten
Kriterien: thematische Vielfalt im Sinne einer bewussten
Diversifikation, Eignung für den Tageszeitkontext und Übereinstimmung
mit den deklarierten Präferenzen. Damit werden die in Abschnitt 2.2.3
beschriebenen Empfehlungsparadigmen (Ricci et al., 2015) auf eine
wellbeing-orientierte Zielfunktion umgestellt, wie sie Milano et al.
(2020) und Peters et al. (2020) als notwendig erachten.

**3.3.4 Definierte Sessiongestaltung statt endlosem Strom**

Eine Sendung hat eine feste, kommunizierte Länge und endet hörbar mit
einer Verabschiedung und einem Outro-Jingle. Es gibt keinen
Autoplay-Anschluss, kein endloses Scrollen, keine algorithmisch
gesteuerten «Empfehlungs-Cliffhanger». Diese strukturelle Entscheidung
adressiert direkt die in Abschnitt 1.3 beschriebenen manipulativen
Designmuster und übersetzt die METUX-Forderung nach Autonomie auf der
Verhaltensebene (Peters et al., 2018) in ein konkretes Sendungsformat.

**3.3.5 Transparenz über Quellen, Logik und Personalisierung**

Die Hörerinnen und Hörer können einsehen, aus welchen Quellen die
Nachrichten stammen, welche Präferenzen welche Inhalte wie beeinflusst
haben und welche Schritte die Pipeline durchlaufen hat. Damit wird der
Black-Box-Charakter heutiger Empfehlungssysteme bewusst aufgebrochen und
das Konzept der algorithmischen Souveränität (Reviglio & Agosti, 2020)
in einer für die Nutzenden zugänglichen Form operationalisiert.

**3.4 Welche Mechanismen am Radio untersucht und verbessert werden**

Aus den Bausteinen ergeben sich die Mechanismen, an denen die Arbeit
experimentell ansetzt. Sie korrespondieren mit den in Abschnitt 2.3
beschriebenen Mechanismen aktueller Medienangebote und werden im
wellbeing-orientierten Modell systematisch umakzentuiert.

-   Profil- und Präferenzbildung: Wie wirkt sich ein explizit
    deklariertes Profil im Vergleich zu impliziter Verhaltensanalyse auf
    das wahrgenommene Autonomie- und Kompetenzerleben aus (Ryan & Deci,
    2000; Peters et al., 2018)?

-   Personalisierte Kuratierung mit alternativer Zielfunktion: Welche
    Effekte hat eine auf Vielfalt, Tageskontext und Selbstbestimmung
    optimierte Auswahl gegenüber einer engagement-optimierten
    Empfehlungslogik (Nguyen et al., 2014; Milano et al., 2020)?

-   Sessiongestaltung: Wie wirken eine definierte Sendungslänge und ein
    bewusst gesetzter Abschluss im Vergleich zu endlosen Strömen auf die
    subjektive Zufriedenheit, das Zeitempfinden und die
    Nutzungskontrolle (Vanden Abeele, 2021; Montag et al., 2019)?

-   Transparenz der Algorithmik: Wie verändert eine offengelegte
    Personalisierungslogik das Vertrauen, die wahrgenommene Fairness und
    die Bereitschaft zur weiteren Nutzung (Reviglio & Agosti, 2020;
    Milano et al., 2020)?

-   Persuasive Designmuster: Welche der in Abschnitt 1.3 katalogisierten
    Muster (Push-Benachrichtigungen, variable Belohnungen, Autoplay)
    entfallen in einem wellbeing-orientierten Format, und welche
    nicht-manipulativen Alternativen lassen sich durch Digital Nudging
    (Weinmann et al., 2016) im Sinne der Nutzenden umsetzen?

-   Gebrauchstauglichkeit und Akzeptanz: Wie schneidet ein
    wellbeing-orientiertes Radio im System Usability Scale (Brooke,
    1996; Bangor et al., 2008) und in der subjektiven Akzeptanz im
    Vergleich zu vertrauten Plattformen ab?

**3.5 Abgrenzung des Untersuchungsumfangs**

Radio 25 versteht sich als Konzeptstudie, nicht als marktreifes Produkt.
Die Pipeline wird soweit umgesetzt, wie es für eine konsistente
Hörerfahrung und eine aussagekräftige Nutzerstudie mit einer kleinen
Probandengruppe erforderlich ist. Aspekte, die für eine Skalierung
relevant wären (Authentifizierung, Datenhaltung in einer Datenbank,
redaktionelle Qualitätssicherung im grossen Massstab, Werbe- und
Lizenzfragen), werden bewusst ausgeklammert und im Ausblick der Arbeit
eingeordnet. Die folgenden Kapitel entwickeln auf dieser Grundlage die
konkrete Forschungsfrage, das Untersuchungsdesign und den Aufbau der
Evaluation.

**4 Forschungsfrage und Zielsetzung**

Aus der in Kapitel 2 entwickelten Forschungslücke und dem in Kapitel 3
vorgestellten Untersuchungsmedium leitet sich die konkrete
Forschungsfrage dieser Arbeit ab. Das vorliegende Kapitel formuliert
zunächst die Hauptforschungsfrage, leitet daraus untersuchungsleitende
Teilfragen sowie die Zielsetzung im Sinne eines Goal/Objective-Paares
ab, beschreibt den erwarteten Nutzen für unterschiedliche
Adressatenkreise und grenzt das Vorhaben gegenüber verwandten
Themenfeldern ab. Damit bildet das Kapitel die Brücke zwischen der
theoretischen Fundierung der Kapitel 1 und 2 und dem methodischen
Vorgehen in Kapitel 5.

**4.1 Forschungsfrage**

Vor dem Hintergrund der dokumentierten Zielkonflikte zwischen
Engagement-Optimierung und Nutzerwohl, der in Abschnitt 2.3 entwickelten
Beurteilungsgrundlagen sowie der besonderen Eignung des Mediums Radio
(Kapitel 3) lässt sich die Hauptforschungsfrage dieser Arbeit wie folgt
formulieren:

> *«Wie können Nutzerinnen und Nutzer ihre individuellen Präferenzen bei
> einem digitalen Medienangebot so angeben, dass das Ergebnis ihre
> Bedürfnisse optimal erfüllt und gleichzeitig ihr Wohlbefinden
> fördert?»*

Die Frage bündelt drei Spannungsachsen, die sich aus den
vorausgegangenen Kapiteln ergeben. Erstens stellt sie den Mechanismus
der Präferenzangabe ins Zentrum: den Übergang von impliziter,
verhaltensgetriebener Personalisierung hin zu expliziter, von den
Nutzenden selbst formulierter Steuerung (vgl. Abschnitt 2.2.4 sowie
3.3.1). Zweitens stellt sie eine Doppelbedingung an das Resultat: Es
muss subjektiv den Bedürfnissen der Nutzenden entsprechen und sich
zugleich am Massstab des Wohlbefindens (Vanden Abeele, 2021; Peters et
al., 2018) messen lassen. Drittens wird die Frage methodisch über ein
konkretes, lauffähiges Artefakt beantwortet, an dem sich die genannten
Mechanismen sichtbar und beobachtbar machen lassen.

Die Beantwortung erfolgt durch die Entwicklung und Evaluation eines
vollautomatisierten, KI-gestützten Radios (Radio 25), an dem sich die
Wirkung expliziter Präferenzangabe, transparenter Personalisierungslogik
und definierter Sessiongestaltung in einem einwöchigen Pilottest mit
Nutzenden empirisch beobachten lässt. Das methodische Vorgehen wird in
Kapitel 5 ausführlich entfaltet.

**4.2 Teilfragen**

Die Hauptforschungsfrage wird zur empirischen Bearbeitung in vier
untersuchungsleitende Teilfragen heruntergebrochen. Sie korrespondieren
mit den in Abschnitt 3.4 identifizierten Mechanismen sowie mit den in
Abschnitt 2.3 entwickelten Beurteilungsgrundlagen und decken die für das
Vorhaben relevanten Wirkdimensionen Autonomie, Inhaltsdiversität,
Sessiongestaltung und Transparenz ab.

-   T1 -- Präferenzbildung und Autonomie: Wie wirkt eine explizite,
    transparente Profilkonfiguration auf das von den Nutzenden
    berichtete Autonomie- und Kompetenzerleben im Sinne der
    Self-Determination Theory (Ryan & Deci, 2000; Peters et al., 2018)?

-   T2 -- Inhaltsdiversität und Bedürfnisgerechtigkeit: In welchem Mass
    werden eine bewusst diversifizierte Inhaltsauswahl und eine am
    Tageskontext orientierte Reihenfolge gegenüber einer
    engagement-optimierten Logik als bedürfnisgerecht und qualitativ
    angemessen erlebt (Nguyen et al., 2014; Milano et al., 2020)?

-   T3 -- Sessiongestaltung und Nutzungskontrolle: Wie wirken eine
    definierte Sendungslänge und ein bewusst gesetzter Sendungsabschluss
    auf die subjektive Zufriedenheit, das Zeitempfinden und die
    wahrgenommene Kontrolle über die eigene Mediennutzung (Vanden
    Abeele, 2021; Montag et al., 2019)?

-   T4 -- Transparenz und Akzeptanz: Wie verändert eine offengelegte
    Personalisierungslogik die wahrgenommene Fairness, das Vertrauen und
    die Gebrauchstauglichkeit, gemessen unter anderem über den System
    Usability Scale (Brooke, 1996; Bangor et al., 2008; Reviglio &
    Agosti, 2020)?

Aus den Teilfragen ergeben sich erwartbare Tendenzen: Die explizite
Präferenzangabe sollte das Autonomieerleben gegenüber rein impliziter
Personalisierung erhöhen; die definierte Sendungslänge sollte ein
positiveres Zeit- und Kontrollerleben erzeugen als endlose
Inhaltsströme; und die Offenlegung der Personalisierungslogik sollte
Vertrauen und Akzeptanz nicht beeinträchtigen, sondern stützen. Diese
Erwartungen werden als zu prüfende Annahmen verstanden, nicht als
statistisch zu testende Hypothesen -- die Pilotstudie ist auf
qualitative und deskriptive Erkenntnisgewinnung mit einer kleinen
Probandengruppe ausgelegt (vgl. Abschnitte 5.4 und 5.5).

**4.3 Goal und Objective**

In der Diktion des Design-Science-Ansatzes (Hevner et al., 2004; Peffers
et al., 2007) lassen sich Ziel und Vorhaben dieser Arbeit auf zwei
Ebenen formulieren: ein übergeordnetes Goal, das den angestrebten
Beitrag im Anwendungsfeld beschreibt, und ein konkretes Objective, das
den im Rahmen dieser Arbeit zu liefernden Ergebnisstand definiert.

**Goal.** Anhand eines vollautomatisierten Radios soll demonstriert
werden, wie algorithmische Personalisierung so gestaltet werden kann,
dass sie das Digital Wellbeing der Nutzenden fördert statt es zu
untergraben. Das Artefakt dient damit als konkreter Gegenentwurf zu den
engagement-optimierten Empfehlungssystemen heutiger Plattformen und
macht die in Kapitel 2 entwickelten Beurteilungsgrundlagen in einem
lauffähigen System sicht- und prüfbar.

**Objective.** Im Rahmen dieser Arbeit wird ein funktionsfähiger
Demonstrator entwickelt, der die Prinzipien der nutzerzentrierten
Personalisierung -- explizite Präferenzangabe, transparente
Empfehlungslogik, bewusste Inhaltsdiversität und definierte
Sessiongestaltung -- in einem Ende-zu-Ende-System umsetzt. Das System
integriert externe Datenquellen (RSS-Feeds, Wetter-API), eine
LLM-basierte Textgenerierung, eine Sprachsynthese und eine
Webapplikation zu einer durchgängigen Sendungsproduktion und stellt das
Ergebnis einem einwöchigen Pilottest mit einer kleinen Probandengruppe
zur Verfügung.

Aus Goal und Objective leiten sich die Erfolgskriterien der Arbeit ab,
die in Abschnitt 8.4 operationalisiert werden.

**4.4 Nutzen**

**4.4.1 Nutzen für Endnutzende**

Endnutzende erhalten ein personalisiertes Radioerlebnis, dessen
Ausrichtung explizit am Wohlbefinden orientiert ist. Anders als bei
engagement-getriebenen Plattformen bestimmen die Nutzenden aktiv, welche
Themen, welche Sendungslänge und welchen Grad inhaltlicher
Diversifikation sie erleben. Die definierte Sendungslänge bricht bewusst
mit dem Paradigma des endlosen Scrollens (Vanden Abeele, 2021) und
schafft natürliche Abschlusspunkte; die offengelegte
Personalisierungslogik macht algorithmische Souveränität (Reviglio &
Agosti, 2020) im Alltag erfahrbar. Damit bietet das Artefakt ein
Erlebnis, das in der heutigen Medienlandschaft als integriertes,
durchgängig wellbeing-orientiertes Format kaum verfügbar ist.

**4.4.2 Nutzen für die Forschung**

Die Arbeit leistet einen Beitrag an der Schnittstelle von
Wirtschaftsinformatik, Medienethik und Human-Computer Interaction. Sie
liefert ein durchgängiges, lauffähiges Artefakt, an dem sich die
Prinzipien aus Self-Determination Theory (Ryan & Deci, 2000),
Value-Sensitive Design (Hendry et al., 2021), Digital Wellbeing (Vanden
Abeele, 2021; Burr et al., 2020; Peters et al., 2020) und
algorithmischer Souveränität (Reviglio & Agosti, 2020) integriert
beobachten lassen -- ein Setting, das in der bisherigen Literatur
überwiegend konzeptionell, aber nur selten in einem konsistent gebauten
System adressiert wird (vgl. Abschnitt 2.5). Der Pilottest erzeugt
darüber hinaus erste empirische Hinweise auf die Nutzerakzeptanz
wellbeing-orientierter Personalisierung und liefert eine methodische
Vorlage, an der sich grössere Folgestudien orientieren können.

**4.4.3 Gesellschaftlicher Nutzen**

Auf gesellschaftlicher Ebene zeigt die Arbeit, dass Personalisierung
kein per se schädliches Konzept ist, sondern dass die Wirkung an der
zugrundeliegenden Zielfunktion hängt. Indem Radio 25 als
funktionierendes Gegenbeispiel zu engagement-getriebenen Plattformen
verfügbar wird, wird die Diskussion um ethische Medientechnologie auf
eine konkrete Erfahrungsebene gehoben. Die zugrundeliegenden
Designentscheidungen lassen sich auf andere Medienformate (Podcast,
Newsletter, kuratierte Lese-Streams) übertragen und können als
Referenzpunkt für regulatorische und gestalterische Diskussionen über
algorithmische Souveränität (Reviglio & Agosti, 2020) und
Wellbeing-supportive Design (Peters et al., 2020) dienen.

**4.5 Abgrenzung**

Radio 25 versteht sich, wie in Abschnitt 3.5 bereits eingeführt, als
Konzeptstudie. Die Arbeit fokussiert auf die nutzerzentrierte
Personalisierung und das daraus erwachsende Wohlbefinden; einige
verwandte Themenfelder werden bewusst ausgeklammert, um den
Untersuchungsgegenstand trennscharf zu halten.

-   Skalierung und Mehrnutzerbetrieb: Authentifizierung, persistente
    Datenhaltung in einer produktiven Datenbank und Mandantenfähigkeit
    sind nicht Gegenstand der Arbeit. Profile und Nutzungsdaten werden
    für den Pilottest lokal beziehungsweise in einer einfachen, geeignet
    anonymisierten Form gehalten.

-   Redaktionelle Qualitätssicherung im grossen Massstab: Das System
    verlässt sich auf öffentlich zugängliche Nachrichten- und
    Wetterdaten; ein redaktionelles Faktencheck-Verfahren oder ein
    Mehraugenprinzip wird nicht implementiert. Massnahmen zur Reduktion
    von Halluzinationen beschränken sich auf Prompt-Engineering und
    Quellenverankerung.

-   Werbe- und Lizenzfragen: Eine Monetarisierung des Artefakts ist
    nicht vorgesehen; eingesetzte Musikinhalte werden ausschliesslich
    unter freien oder dem Vorhaben angemessenen Lizenzen verwendet. Eine
    Diskussion möglicher Geschäftsmodelle erfolgt allenfalls im Ausblick
    (Abschnitt 11.3).

-   Quantitative Hypothesentests: Die Pilotstudie erhebt qualitative und
    deskriptive Daten mit einer kleinen Probandengruppe (n ≈ 5).
    Statistisch generalisierende Aussagen über die Gesamtbevölkerung
    sind nicht Teil der Arbeit (vgl. Abschnitt 5.5).

-   Sprach- und Kulturraum: Untersucht wird der deutschsprachige Raum
    mit Schweizer Hochdeutsch als Sprachausgabe; mehrsprachige Anwendung
    und kulturelle Adaption werden im Ausblick (Abschnitt 11.3)
    gestreift, nicht aber empirisch untersucht.

Diese Abgrenzungen sind keine zufälligen Beschränkungen, sondern eine
Konsequenz aus dem Fokus auf den eigentlichen Forschungsgegenstand: die
Verbindung von Personalisierung und Wohlbefinden in einem konsistent
gestalteten Artefakt. Themen, die für eine produktive Skalierung
relevant wären, werden im Ausblick (Abschnitt 11.3) als
Anschlussforschung benannt.

**5 Methodik**

Dieses Kapitel beschreibt die Methodik der vorliegenden Arbeit. Es macht
transparent, mit welchem Forschungsdesign, mit welchen Vorgehensweisen,
Werkzeugen und Datenquellen gearbeitet wird, damit die Ergebnisse
nachvollziehbar und überprüfbar sind. Abschnitt 5.1 dokumentiert das
bereits abgeschlossene Vorgehen der Literaturrecherche, auf der die
Kapitel 1 und 2 beruhen. Abschnitt 5.2 ordnet die Arbeit als
Design-Science-Vorhaben (Hevner et al., 2004; Peffers et al., 2007;
Hevner, 2007) ein. Abschnitt 5.3 fasst das praktische Vorgehen entlang
der Arbeitspakete zusammen. Die Abschnitte 5.4 und 5.5 beschreiben die
Methoden der Datenerhebung (Pilottest, System Usability Scale,
Wellbeing-Items, Interviews, Nutzungslogs) und der Auswertung
(qualitative Analyse, deskriptive Statistik). Abschnitt 5.6 reflektiert
schliesslich die eingesetzten Ressourcen und Kompetenzen.

**5.1 Vorgehen der Literaturrecherche**

Grundlage des in Kapitel 2 entwickelten theoretischen Rahmens ist ein
strukturierter Literaturreview, der klassische Datenbankrecherche mit
KI-gestützten Werkzeugen kombiniert. Das Vorgehen wird hier transparent
dargestellt, damit nachvollziehbar ist, welche Werkzeuge mit welchen
Eingaben eingesetzt wurden und welche Ergebnisse sie lieferten.

Als erstes Werkzeug wurden die klassischen wissenschaftlichen
Suchmaschinen Swisscovery und Google Scholar eingesetzt. Gesucht wurde
nach englisch- und deutschsprachigen Quellen zu den Kernbegriffen
«Digital Wellbeing», «Social Media», «Recommender Systems»,
«Personalization», «Value-Sensitive Design» und «Self-Determination
Theory». Die Ergebnislisten wurden nach Titel, Abstract und
Zitationshäufigkeit vorgefiltert. Als besonders ertragreich erwiesen
sich die Reviews von Burr et al. (2020) und Orben (2020), die als
Einstiegspunkte für Rückwärtssuchen dienten.

Als zweites Werkzeug wurde Claude (Anthropic) als KI-basiertes
Recherchewerkzeug eingesetzt, primär zur Query Expansion und zur
Identifikation angrenzender Theoriefelder. Prompts wie «Welche Theorien
und zentralen Autorinnen und Autoren prägen die Debatte um Digital
Wellbeing in Social Media?» oder «Welche Konzepte adressieren
Nutzerkontrolle und algorithmische Transparenz in Empfehlungssystemen?»
lieferten thematische Übersichten und konkrete Quellenvorschläge. Auf
diesem Weg wurden unter anderem die Begriffe «Algorithmic Sovereignty»
(Reviglio & Agosti, 2020), «Persuasive Technology» (Fogg, 2003),
«Digital Nudging» (Weinmann et al., 2016) und das METUX-Modell (Peters
et al., 2018) als relevant identifiziert. Claude wurde dabei
ausschliesslich für die Ideenfindung und Begriffserweiterung genutzt;
jede vorgeschlagene Quelle wurde anschliessend in Swisscovery, im
Verlagskatalog oder über den Digital Object Identifier verifiziert und
als Originaldokument bezogen. Kein Inhalt wurde ohne Gegenprüfung
übernommen.

Als drittes Werkzeug wurde NotebookLM (Google) eingesetzt, um den
aufgebauten Quellenpool thematisch zu strukturieren und die Kernaussagen
mehrerer Arbeiten gegenüberzustellen. Dies erleichterte die Einordnung
der Quellen in die Abschnitte zu Bedürfnissen, Mechanismen und
Beurteilungsgrundlagen und half, inhaltliche Dopplungen und Lücken zu
erkennen.

Die finale Verwaltung der Quellen erfolgt in Zotero. Das gesamte
Quellenset ist dort gepflegt und exportierbar; die in Kapitel 1 und 2
zitierten Arbeiten sind im Literaturverzeichnis aufgeführt. Der Review
wird im weiteren Verlauf der Arbeit laufend ergänzt, insbesondere im
Bereich der konkreten Mechanismen und der Evaluationsliteratur.

**5.2 Forschungsdesign**

Die Arbeit folgt dem Design-Science-Ansatz, wie er von Hevner, March,
Park und Ram (2004) für die Wirtschaftsinformatik etabliert und von
Peffers, Tuunanen, Rothenberger und Chatterjee (2007) zu einer
prozeduralen Forschungsmethodologie ausgearbeitet wurde. Im Zentrum
dieses Ansatzes steht die Entwicklung eines neuartigen, zweckgebundenen
Artefakts (hier: Radio 25), das ein praktisches Problem
(engagement-getriebene, wellbeing-untergrabende Personalisierung)
adressiert und gleichzeitig einen wissenschaftlichen Erkenntnisbeitrag
leistet. Design Science ist dafür besonders geeignet, weil es die im
Spannungsfeld dieser Arbeit liegenden Pole verbindet: theoretische
Verankerung (Rigor) und praktische Relevanz (Relevance) treffen sich in
der iterativen Konstruktion und Evaluation eines konkreten Systems.

Hevner (2007) verdichtet diesen Ansatz zur Three-Cycle-View, die die
Forschung in drei eng verzahnten Zyklen organisiert. Der Relevance Cycle
verbindet das Design mit dem Anwendungsfeld: Aus der Anwendungsdomäne
(digitale Medien, Plattformökonomie, Digital Wellbeing) werden
Anforderungen abgeleitet, und in dieselbe Domäne wird das Artefakt zur
Evaluation zurückgespielt. Der Rigor Cycle stellt sicher, dass das
Vorgehen wissenschaftlich anschlussfähig bleibt: Theorien und Methoden
aus der Wissensbasis (Self-Determination Theory, Value-Sensitive Design,
Recommender-Systems-Forschung, Persuasive Technology) fliessen in das
Design ein, und die gewonnenen Erkenntnisse werden zur Wissensbasis
zurückgegeben. Im inneren Design Cycle werden die Konstruktion und die
Evaluation des Artefakts iterativ verschränkt.

Auf die vorliegende Arbeit übertragen bedeutet dies: Der Relevance Cycle
ist in den Kapiteln 1 und 3 sowie im Pilottest (Abschnitt 8.3)
verankert; der Rigor Cycle wird in Kapitel 2 sowie in Abschnitt 5.1
dokumentiert; der Design Cycle umfasst die in den Kapiteln 6 und 7
beschriebene iterative Konstruktion und die in Kapitel 8 ausgeführte
Evaluation. Peffers et al. (2007) ergänzen diesen Rahmen um eine
konkrete Schrittfolge -- Problem Identification, Definition of
Objectives, Design and Development, Demonstration, Evaluation,
Communication --, die im Gesamtaufbau dieser Arbeit unmittelbar
erkennbar ist und in der nachfolgenden Vorgehensbeschreibung in
Abschnitt 5.3 ihren operativen Ausdruck findet.

**5.3 Vorgehen im Überblick**

Aus dem Forschungsdesign ergibt sich ein iteratives Vorgehen, das sich
in sieben Arbeitspakete (AP) gliedert. Die Arbeitspakete bauen
aufeinander auf, lassen sich aber, wo sinnvoll, parallel führen:
Insbesondere die Literaturarbeit (AP1) wird über den gesamten Verlauf
weitergeführt, und die iterative Verfeinerung des Demonstrators (AP4)
überschneidet sich zeitlich mit den ersten Vorbereitungen des Pilottests
(AP5). Die folgende Tabelle fasst die Pakete entlang von Beschreibung,
Input und Output zusammen.

  -------- ----------------------------------------------- --------------------------------------------------------------- --------------------------------------------------------------
  **AP**   **Beschreibung**                                **Input**                                                       **Output**
  1        Literaturrecherche und Theorierahmen            Literatur zu Digital Wellbeing, Personalisierung, Medienethik   Theoretischer Rahmen, Gegenüberstellung der Medienmodelle
  2        Architekturentwurf                              Anforderungen, Wellbeing-Prinzipien, API-Dokumentation          Systemarchitektur mit Personalisierungsmodul
  3        Durchstich (End-to-End)                         Architektur, externe APIs                                       Lauffähiger Minimalprototyp
  4        Iterative Verfeinerung und Wellbeing-Features   Prototyp, Personalisierungs- und Transparenzkonzept             Erweiterter Demonstrator mit wellbeing-orientierten Features
  5        Pilottest (1-Wochen-Test)                       Demonstrator, ca. fünf Testpersonen                             Nutzungsdaten, Wellbeing-Feedback, qualitative Erkenntnisse
  6        Evaluation und Validierung                      Testdaten, Erfolgskriterien                                     Machbarkeitsbeurteilung, Wellbeing-Evaluation
  7        Dokumentation und Abschluss                     Alle Artefakte                                                  Wissenschaftlicher Bericht, Code-Dokumentation
  -------- ----------------------------------------------- --------------------------------------------------------------- --------------------------------------------------------------

Die Pakete AP1 bis AP4 bilden den Kern des Design Cycle, AP5 und AP6
schliessen den Relevance Cycle, und AP7 sichert die Anschlussfähigkeit
für den Rigor Cycle. Der Zeitrahmen erstreckt sich über das offizielle
BSc-Thesis-Fenster von rund zehn Wochen, ergänzt um eine
Vorbereitungsphase, in der erste Literaturrecherchen sowie technische
Prototypen bereits vor dem offiziellen Projektstart durchgeführt wurden.

**5.4 Methoden der Datenerhebung**

Die empirische Erhebung im Rahmen dieser Arbeit hat den Charakter einer
formativen Pilotstudie. Sie ist nicht darauf ausgelegt, statistisch
repräsentative Aussagen zu generieren, sondern auf das frühe Erkennen
von Mustern, Problemen und Wirkungen, die in nachfolgenden Studien
systematischer untersucht werden können. Die Erhebung kombiniert vier
Datenquellen, die sich gegenseitig stützen und triangulierbar sind.

Erstens wird der System Usability Scale (SUS) eingesetzt, ein
etabliertes, kurzes Selbstbewertungsinstrument zur Gebrauchstauglichkeit
(Brooke, 1996). Bangor, Kortum und Miller (2008) liefern empirisch
fundierte Vergleichswerte und Adjektivskalen, die die Interpretation der
erreichten Punktzahl erleichtern. Der SUS adressiert insbesondere die
Teilfrage T4 (Transparenz und Akzeptanz).

Zweitens werden wellbeing-bezogene Items eingesetzt, die in einem kurzen
Tagesfragebogen den subjektiven Zustand der Nutzenden vor und nach der
Sendung erfassen. Die konkrete Itembatterie wird in der
Implementationsphase finalisiert und orientiert sich an den von Peters,
Ahmadpour und Calvo (2020) zusammengetragenen wellbeing-bezogenen
Konstrukten sowie an der Definition von Vanden Abeele (2021). Diese
Daten adressieren die Teilfragen T1 (Autonomie- und Kompetenzerleben)
und T3 (Zeitempfinden und Nutzungskontrolle).

Drittens werden semistrukturierte Abschluss-Interviews geführt, um
vertiefte Einsichten in die individuelle Nutzungserfahrung, den
Vergleich zur gewohnten Mediennutzung und die wahrgenommene
Personalisierungslogik zu gewinnen. Der Interviewleitfaden wird in
Anhang A dokumentiert und folgt der Logik der vier Teilfragen.

Viertens werden Nutzungslogs aus der Webapplikation ausgewertet: Anzahl,
Dauer und Tageszeit der gestarteten Sendungen, Profilanpassungen,
Abbrüche sowie Vorgänge, in denen Nutzende die Personalisierungslogik
einsehen. Die Logs werden lokal und ohne personenbezogene Inhalte
erhoben und ergänzen die Selbstauskunft um eine verhaltensnahe
Perspektive.

Der Pilottest läuft über eine Woche mit ca. fünf Testpersonen aus dem
Bekanntenkreis des Autors. Die Probandengruppe ist gezielt klein
gehalten, um eine intensive qualitative Auswertung zu ermöglichen. Der
Ablauf -- Onboarding, Nutzung im Alltag, Abschlussinterview -- sowie die
Einwilligung der Teilnehmenden werden in den Abschnitten 8.3 und 8.5
ausführlich beschrieben.

**5.5 Methoden der Auswertung**

Die Auswertung folgt der Datenstruktur und kombiniert qualitative und
deskriptive Verfahren. Ein bewusst zurückhaltender Auswertungsstil
entspricht dem formativen Charakter der Studie und der kleinen
Probandengruppe.

Die qualitativen Daten aus den Interviews werden inhaltlich strukturiert
ausgewertet. Aussagen werden entlang der vier Teilfragen kodiert und in
thematische Cluster zusammengefasst (Autonomie- und Kompetenzerleben,
Inhaltsdiversität, Sessiongestaltung, Transparenz und Vertrauen). Aus
den Clustern werden Kernmuster und repräsentative Zitate extrahiert, die
den Befund illustrieren. Die Auswertung bleibt bewusst nahe an den
Aussagen der Teilnehmenden und vermeidet überinterpretierende
Kategorisierungen, was bei einer kleinen Stichprobe ohnehin angezeigt
ist.

Die quantitativen Daten werden deskriptiv ausgewertet. Für den SUS
werden Gesamtpunktzahl je Person, Mittelwert und Spannweite berichtet
und mit den Referenzwerten von Bangor et al. (2008) verglichen; eine
inferenzstatistische Prüfung ist bei n ≈ 5 nicht sinnvoll und wird daher
unterlassen. Für die Wellbeing-Items werden Verläufe je Person
dargestellt; aggregierende Aussagen werden nur dort gemacht, wo das
Muster über alle Personen hinweg klar erkennbar ist. Die Logdaten werden
als Profile pro Person berichtet (Nutzungshäufigkeit, Sendungsdauer,
Profilinteraktionen) und mit den qualitativen Aussagen abgeglichen.

Zentrales Auswertungsprinzip ist die Triangulation zwischen
Selbstauskunft (SUS, Wellbeing-Items), Erzählung (Interview) und
Verhalten (Logs): Konvergierende Befunde sind belastbar, divergierende
Befunde werden offengelegt und als Ausgangspunkt weiterführender Fragen
interpretiert. Die Ergebnisse werden in Kapitel 9 entlang der Teilfragen
aus Abschnitt 4.2 berichtet.

**5.6 Reflexion zu Ressourcen und Kompetenzen**

Die Durchführung der Arbeit setzt ein Bündel an Kompetenzen voraus, die
im Studienverlauf des Autors bereits angelegt sind, in einzelnen
Bereichen aber gezielt vertieft werden. Die LLM-Integration mit Claude
über das Vercel AI SDK sowie das Prompt-Engineering für Schweizer
Hochdeutsch sind im Rahmen der Implementation neu erschlossene Themen;
die Sprachsynthese mit ElevenLabs (eleven\_multilingual\_v2) erfordert
eine Konfiguration der Stimmenprofile und der Aussprachekontrolle, die
im Verlauf des Design Cycle iterativ angepasst wird. Die Webapplikation
auf Basis von Next.js 15, React 19, TypeScript und Tailwind CSS 4 baut
auf vorhandenen Erfahrungen auf, die agentische Pipeline-Steuerung
erweitert sie um asynchrone Orchestrierungsmuster.

Auf der Methodenseite kombiniert die Arbeit eine strukturierte
Literaturrecherche (Abschnitt 5.1) mit einer formativen Nutzerstudie
(Abschnitte 5.4 und 5.5). Die qualitative und deskriptive Auswertung ist
mit Grundkenntnissen aus dem Studium gut zu leisten; die kleine
Probandengruppe erlaubt eine sorgfältige Einzelfallbetrachtung, ohne
dass komplexere statistische Verfahren erforderlich werden. Externe
Werkzeuge (Claude für Recherche und Schreibhilfe, NotebookLM für die
thematische Strukturierung, Zotero für die Quellenverwaltung, Cursor und
GitHub Copilot für Teile der Code-Entwicklung) werden in der
KI-Nutzungserklärung des Front Matter im Detail offengelegt.

Insgesamt ist das Vorhaben in den verfügbaren Ressourcen -- Zeitbudget
von rund zehn Wochen, Einzelautorenschaft, kleine Probandengruppe --
bewusst so dimensioniert, dass die zentrale Forschungsfrage substanziell
beantwortet werden kann, ohne den Rahmen einer BSc-Thesis zu
überschreiten.

[**8 Validierung**]{.insertion author="Claude"
date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion author="Claude"
date="2026-05-06T12:00:00Z"}

[Das vorliegende Kapitel beantwortet die Frage, ob Radio 25 als
Forschungsartefakt funktioniert, akzeptiert wird und die im
theoretischen Rahmen (Kap. 2) hergeleiteten Wirkungen tatsächlich
entfaltet. Auf Empfehlung des Dozenten folgt die Validierung einer
dreiteiligen Logik: **Machbarkeitsnachweis** (Funktioniert das Artefakt
zuverlässig?), **Usability und Akzeptanz** (Wird es als bedienbar und
nützlich empfunden?) und **Wirkung** (Erleben Nutzende die intendierten
Effekte hinsichtlich Autonomie, Wohlbefinden und algorithmischer
Souveränität?). Ergänzt wird die Validierung durch einen allgemeinen
Fragebogenteil mit demographischen Daten sowie ein kombiniertes
Studienformat aus 1-maliger Nutzung und längerer
Nutzungsphase.]{.insertion author="Claude"
date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion author="Claude"
date="2026-05-06T12:00:00Z"}

[**8.1 Validierungsdesign**]{.insertion author="Claude"
date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion author="Claude"
date="2026-05-06T12:00:00Z"}

[Das Validierungsdesign verbindet die Methodikgrundlagen aus Kapitel 5
mit den Erfolgskriterien aus Kapitel 4. Pro Validierungsstrang werden
Erhebungsinstrumente, Datenquellen und Auswertungsverfahren benannt.
Eine Übersichtsabbildung (geplant) visualisiert das Zusammenspiel der
drei Stränge sowie die Verzahnung mit dem zweistufigen
Studienformat.]{.insertion author="Claude"
date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion author="Claude"
date="2026-05-06T12:00:00Z"}

[Die drei Validierungsstränge sind nicht voneinander unabhängig: Ohne
Machbarkeit greift weder Akzeptanz- noch Wirkungsmessung; ohne
ausreichende Akzeptanz lassen sich Wirkungseffekte nicht zuverlässig
zuschreiben. Die Reihenfolge im Kapitel folgt deshalb dieser
argumentativen Abfolge: zuerst der technische Funktionsnachweis (8.2),
dann die Akzeptanz aus Sicht der Nutzenden (8.3), schliesslich die
Wirkung im Sinne der theoretisch hergeleiteten Konstrukte
(8.4).]{.insertion author="Claude"
date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion author="Claude"
date="2026-05-06T12:00:00Z"}

[**8.2 Machbarkeitsnachweis (Proof of Concept)**]{.insertion
author="Claude" date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion
author="Claude" date="2026-05-06T12:00:00Z"}

[Der Machbarkeitsnachweis zeigt, dass die in Kap. 6 entworfene und in
Kap. 7 implementierte Pipeline tatsächlich durchgehend lauffähig ist und
das versprochene Ergebnis -- eine personalisierte, hörbare Sendung --
zuverlässig liefert. Der Nachweis erfolgt auf drei Ebenen: über den
lauffähigen Prototyp selbst, über automatisierte Tests einzelner
Pipeline-Komponenten und über Messungen nicht-funktionaler
Eigenschaften.]{.insertion author="Claude"
date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion author="Claude"
date="2026-05-06T12:00:00Z"}

[**8.2.1 Funktionsnachweis durch den Prototyp**]{.insertion
author="Claude" date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion
author="Claude" date="2026-05-06T12:00:00Z"}

[Der Prototyp wird über einen End-to-End-Durchlauf demonstriert: vom
Aufruf der Webapplikation über die Datenabfrage (RSS-Feeds von SRF und
NZZ, Wetter-API), die LLM-gestützte Textgenerierung, die Sprachsynthese
(ElevenLabs, eleven\_multilingual\_v2) bis zur ausgespielten Sendung.
Beleg ist eine reproduzierbare Beispielsendung (siehe Anhang E) sowie
eine Aufzeichnung des Pipeline-Durchlaufs für unterschiedliche
Profilkonfigurationen.]{.insertion author="Claude"
date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion author="Claude"
date="2026-05-06T12:00:00Z"}

[**8.2.2 Unit Tests und automatisierte Funktionstests**]{.insertion
author="Claude" date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion
author="Claude" date="2026-05-06T12:00:00Z"}

[Pro Pipeline-Komponente werden automatisierte Tests dokumentiert:
Datenintegration (RSS-Parser, Wetter-API), Personalisierungslogik
(Profilauflösung, Diversifikationsregeln), LLM-Aufrufe
(Prompt-Korrektheit, Antwortvalidierung) und TTS-Integration
(Audiopfad-Generierung). Für jede Komponente werden Testfälle für den
Normalfall, für Fehlerpfade (z. B. fehlgeschlagene API-Anfragen) und für
Grenzfälle (z. B. leere Themenpräferenzen) angelegt. Die Testabdeckung
wird in einer tabellarischen Übersicht dokumentiert.]{.insertion
author="Claude" date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion
author="Claude" date="2026-05-06T12:00:00Z"}

[**8.2.3 Nicht-funktionale Aspekte**]{.insertion author="Claude"
date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion author="Claude"
date="2026-05-06T12:00:00Z"}

[Erfasst werden Latenz pro Pipeline-Schritt, Gesamtkosten pro Sendung
(LLM-Tokens, TTS-Minuten), Fehlerraten (z. B. Halluzinationen im
LLM-Output, fehlgeschlagene API-Calls) und Stabilität bei wiederholter
Ausführung. Die Messungen erfolgen über mindestens 20 generierte
Sendungen mit unterschiedlichen Profilkonfigurationen, um Schwankungen
sichtbar zu machen.]{.insertion author="Claude"
date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion author="Claude"
date="2026-05-06T12:00:00Z"}

[**8.3 Usability und Akzeptanz**]{.insertion author="Claude"
date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion author="Claude"
date="2026-05-06T12:00:00Z"}

[Da für Radio 25 als wellbeing-orientiertes Medienartefakt kein
etabliertes Akzeptanz-Instrument existiert, wird das Erhebungsinstrument
selbst konstruiert und an etablierten Modellen ausgerichtet. Diese
Eigenkonstruktion ist methodisch begründet: Standardinstrumente prüfen
Bedienbarkeit gegen einen abstrakten Idealnutzer, sie können aber nicht
klären, ob konkrete Funktionen eines neuartigen Artefakts tatsächlich
erwünscht sind. Die einstellungsbezogene Befragung füllt diese
Lücke.]{.insertion author="Claude"
date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion author="Claude"
date="2026-05-06T12:00:00Z"}

[**8.3.1 Instrumentenwahl**]{.insertion author="Claude"
date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion author="Claude"
date="2026-05-06T12:00:00Z"}

[Das Instrument lehnt sich an drei etablierte Modelle an: die System
Usability Scale (SUS) liefert einen standardisierten Score zur
generellen Bedienbarkeit; das Technology Acceptance Model (TAM)
adressiert wahrgenommene Nützlichkeit und Bedienleichtigkeit; die
Unified Theory of Acceptance and Use of Technology (UTAUT) erweitert um
Dimensionen wie Erwartung, sozialer Einfluss und erleichternde
Bedingungen.]{.insertion author="Claude"
date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion author="Claude"
date="2026-05-06T12:00:00Z"}

[**8.3.2 Eigenkonstruktion der Frage-Items**]{.insertion author="Claude"
date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion author="Claude"
date="2026-05-06T12:00:00Z"}

[Die spezifischen Items werden mit LLM-Unterstützung (GPT bzw. Claude)
auf Basis der konkreten Einstellungsmöglichkeiten der
Radio-25-Webapplikation formuliert. Pro Einstellungsmöglichkeit --
beispielsweise Sendungslänge, Themenpräferenzen, Stimmenwahl,
Diversifikationsgrad oder Transparenzanzeige -- wird ein dreigeteiltes
Item-Set erhoben: erstens die Frage, was an dieser Einstellung gefällt;
zweitens die Frage, was als unnötig empfunden wird; drittens die Frage
nach gewünschten Erweiterungen. Dieses Vorgehen erlaubt eine
feingranulare, einstellungsbezogene Bewertung statt einer pauschalen
Akzeptanzaussage.]{.insertion author="Claude"
date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion author="Claude"
date="2026-05-06T12:00:00Z"}

[**8.3.3 SUS-Score als standardisierter Vergleichswert**]{.insertion
author="Claude" date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion
author="Claude" date="2026-05-06T12:00:00Z"}

[Zusätzlich zum eigenkonstruierten Item-Set wird der SUS-Fragebogen in
der validierten deutschen Version eingesetzt (siehe Anhang B). Der
resultierende Score erlaubt eine Einordnung gegenüber etablierten
Vergleichswerten (Bangor, Kortum & Miller, 2008) und schafft so eine
quantitative Brücke zur bestehenden Usability-Literatur.]{.insertion
author="Claude" date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion
author="Claude" date="2026-05-06T12:00:00Z"}

[**8.3.4 Qualitative Freitexte**]{.insertion author="Claude"
date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion author="Claude"
date="2026-05-06T12:00:00Z"}

[Offene Fragen zur Bedienlogik und zur Transparenzanzeige ergänzen die
quantitativen Items. Sie geben Raum für Aspekte, die in den
geschlossenen Items nicht antizipiert wurden, und liefern Material für
die qualitative Auswertung in Kap. 9.]{.insertion author="Claude"
date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion author="Claude"
date="2026-05-06T12:00:00Z"}

[**8.4 Wirkung**]{.insertion author="Claude"
date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion author="Claude"
date="2026-05-06T12:00:00Z"}

[Die Wirkungs-Items werden direkt aus dem theoretischen Rahmen in
Kapitel 2 abgeleitet. Damit prüft die Studie nicht abstrakte
Wohlbefindensaussagen, sondern die spezifischen Konstrukte, mit denen
das Artefakt begründet wurde. Der Wirkungsbegriff wird hier weit
gefasst: Er umfasst psychologische Effekte (SDT-Bedürfniserleben),
normative Wahrnehmung (Werteorientierung im Sinne von VSD), situatives
Wohlbefinden (Digital Wellbeing) und kognitive Effekte (Awareness für
Bias und Bubble).]{.insertion author="Claude"
date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion author="Claude"
date="2026-05-06T12:00:00Z"}

[**8.4.1 Wirkungsitems aus dem theoretischen Rahmen**]{.insertion
author="Claude" date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion
author="Claude" date="2026-05-06T12:00:00Z"}

[Pro theoretisches Konstrukt aus Kap. 2.3 werden Items formuliert, die
das jeweilige Konstrukt im Kontext einer Radio-25-Nutzung
operationalisieren. Aus der Self-Determination Theory und dem
METUX-Modell (Abschnitt 2.3.1) werden Items zu Autonomieerleben,
Kompetenzerleben und Verbundenheit abgeleitet. Aus Value-Sensitive
Design (Abschnitt 2.3.2) Items zur wahrgenommenen Werteorientierung des
Artefakts. Aus dem Digital-Wellbeing-Konzept (Abschnitt 2.3.3) Items zum
Wohlbefinden in und nach der Nutzungssituation. Aus der Diskussion zur
algorithmischen Souveränität (Abschnitt 2.3.4) Items zu Transparenz,
Steuerbarkeit und Vertrauen in die Auswahl.]{.insertion author="Claude"
date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion author="Claude"
date="2026-05-06T12:00:00Z"}

[Die genaue Item-Formulierung wird vor dem Pilottest finalisiert; eine
vollständige Übersicht erfolgt im Anhang C.]{.insertion author="Claude"
date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion author="Claude"
date="2026-05-06T12:00:00Z"}

[**8.4.2 Items zu Information und Unterhaltung**]{.insertion
author="Claude" date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion
author="Claude" date="2026-05-06T12:00:00Z"}

[Da Radio 25 ein Medienartefakt ist, werden zwei klassische
Gebrauchszwecke explizit abgefragt: Wie informativ wurde die Sendung
erlebt, und wie unterhaltsam wurde sie erlebt? Diese Items dienen als
Kontrollvariablen -- ein wellbeing-orientiertes Radio darf nicht auf
Kosten der Grundfunktionen gehen, sonst wäre der Nachweis der
Wohlbefindenswirkung wertlos.]{.insertion author="Claude"
date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion author="Claude"
date="2026-05-06T12:00:00Z"}

[**8.4.3 Awareness-Items**]{.insertion author="Claude"
date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion author="Claude"
date="2026-05-06T12:00:00Z"}

[Ein zentraler Anspruch des Artefakts ist es, das Bewusstsein für
Limitationen algorithmischer Auswahl zu schärfen. Items dazu erheben das
Bewusstsein für Filterblasen und Echokammern, das Bewusstsein für Bias
in Themen- und Tonalitätsauswahl sowie das Bewusstsein für die Grenzen
des Systems. Diese Items adressieren einen Wirkungstyp, der in der
klassischen Akzeptanzforschung nicht vorgesehen ist, für ein
wellbeing-orientiertes Artefakt aber konstitutiv.]{.insertion
author="Claude" date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion
author="Claude" date="2026-05-06T12:00:00Z"}

[**8.5 Allgemeiner Fragebogen**]{.insertion author="Claude"
date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion author="Claude"
date="2026-05-06T12:00:00Z"}

[Der allgemeine Fragebogen ergänzt die strangbezogenen Erhebungen um
Hintergrundinformationen, die für die Einordnung der Antworten notwendig
sind.]{.insertion author="Claude"
date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion author="Claude"
date="2026-05-06T12:00:00Z"}

[**8.5.1 Demographische Daten**]{.insertion author="Claude"
date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion author="Claude"
date="2026-05-06T12:00:00Z"}

[Erhoben werden Alter, Geschlecht, höchster abgeschlossener Bildungsgrad
und beruflicher Hintergrund. Diese Daten dienen der späteren
Stratifizierung sowie der Einschätzung, inwieweit die Stichprobe
demographisch breit aufgestellt ist.]{.insertion author="Claude"
date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion author="Claude"
date="2026-05-06T12:00:00Z"}

[**8.5.2 Mediennutzungsverhalten**]{.insertion author="Claude"
date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion author="Claude"
date="2026-05-06T12:00:00Z"}

[Erhoben werden genutzte Newsquellen (Mehrfachnennung möglich),
durchschnittliche Hördauer von Radio und Podcast, sowie die Nutzung
sozialer Medien als Newsquelle. Diese Angaben erlauben eine Einordnung
der Antworten in den jeweiligen Mediennutzungskontext der
Testperson.]{.insertion author="Claude"
date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion author="Claude"
date="2026-05-06T12:00:00Z"}

[**8.5.3 Allgemeine Wahrnehmung**]{.insertion author="Claude"
date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion author="Claude"
date="2026-05-06T12:00:00Z"}

[Offene Freitextfragen zum Gesamteindruck schliessen den allgemeinen
Fragebogen ab: Wie würden Sie Radio 25 jemandem in einem Satz
beschreiben? Was fehlt Ihnen am meisten? Was würden Sie zuerst
weglassen?]{.insertion author="Claude"
date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion author="Claude"
date="2026-05-06T12:00:00Z"}

[**8.6 Studiensetup -- kombiniertes Format**]{.insertion author="Claude"
date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion author="Claude"
date="2026-05-06T12:00:00Z"}

[Das Studiensetup kombiniert zwei Formate, um sowohl den
Erstkontakt-Effekt als auch den Gewohnheitseffekt zu erfassen. Diese
Kombination ist für ein wellbeing-orientiertes Artefakt besonders
relevant, weil nachhaltige Wirkung erst über Zeit beurteilbar ist --
während Akzeptanz und erste Bedienschwierigkeiten typischerweise bereits
beim Erstkontakt sichtbar werden.]{.insertion author="Claude"
date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion author="Claude"
date="2026-05-06T12:00:00Z"}

[**8.6.1 Stichprobe und Rekrutierung**]{.insertion author="Claude"
date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion author="Claude"
date="2026-05-06T12:00:00Z"}

[Mindestens drei Testpersonen sind das Minimum für valide qualitative
Aussagen, mehr sind explizit wünschenswert. Rekrutiert wird über das
persönliche Umfeld mit Blick auf demographische Streuung in Bezug auf
Alter, Bildung und Mediennutzung. Die Selbstselektion der Probandinnen
und Probanden wird in Kap. 10.6 als Limitation diskutiert.]{.insertion
author="Claude" date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion
author="Claude" date="2026-05-06T12:00:00Z"}

[**8.6.2 Format A -- 1-malige Nutzung**]{.insertion author="Claude"
date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion author="Claude"
date="2026-05-06T12:00:00Z"}

[Ablauf: ein kurzes Onboarding (max. 10 Minuten), in dem die Testperson
Profil und Präferenzen einrichtet; eine Sendung in typischer Länge
anhören; unmittelbar danach Fragebogen ausfüllen; anschliessend
halbstrukturiertes Kurzinterview von 15 bis 20 Minuten. Dieses Format
erfasst Erstkontakt-Akzeptanz, unmittelbare Wirkung und erste
Bedienschwierigkeiten.]{.insertion author="Claude"
date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion author="Claude"
date="2026-05-06T12:00:00Z"}

[**8.6.3 Format B -- Längere Nutzung**]{.insertion author="Claude"
date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion author="Claude"
date="2026-05-06T12:00:00Z"}

[Ablauf: Onboarding wie in Format A, dann eigenständige Nutzung über
eine Woche bzw. mindestens ein Wochenende. Die Testpersonen entscheiden
selbst, wann und wie oft sie Radio 25 hören. Optional führen sie ein
kurzes Tagebuch (frei formuliert oder mit Vorlage, siehe Anhang A).
Logdaten dokumentieren Nutzungshäufigkeit und Einstellungsänderungen.
Den Abschluss bildet eine ausführlichere Befragung mit Fragebogen und
Interview von rund 30 Minuten.]{.insertion author="Claude"
date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion author="Claude"
date="2026-05-06T12:00:00Z"}

[**8.6.4 Kombination beider Formate**]{.insertion author="Claude"
date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion author="Claude"
date="2026-05-06T12:00:00Z"}

[Personen, die beide Formate durchlaufen, beantworten den Fragebogen
zweimal -- einmal nach Format A und einmal nach Format B. Der Vergleich
der Antworten dient als Indikator dafür, wie sich Akzeptanz und Wirkung
von Erstkontakt zu Gewohnheit verschieben. Methodisch handelt es sich um
eine Within-Subject-Anlage; Effekte sind als individuelle Verschiebungen
sichtbar, nicht als Gruppendifferenz.]{.insertion author="Claude"
date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion author="Claude"
date="2026-05-06T12:00:00Z"}

[**8.7 Erfolgskriterien**]{.insertion author="Claude"
date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion author="Claude"
date="2026-05-06T12:00:00Z"}

[Die Erfolgskriterien werden -- anknüpfend an Disposition Kap. 7.3 und
an die Forschungsfrage in Kap. 4 -- pro Validierungsstrang
operationalisiert. Auf der Machbarkeitsebene gilt der
End-to-End-Durchlauf als erfolgreich, wenn er auf mindestens 95 Prozent
der Versuche fehlerfrei terminiert, die Latenz unterhalb eines noch zu
definierenden Schwellwerts bleibt und die Unit-Test-Abdeckung pro
Komponente mindestens 70 Prozent erreicht. Auf der Akzeptanzebene wird
ein SUS-Score von mindestens 68 Punkten -- dem industriellen
Durchschnitt -- angestrebt; ergänzend soll mehrheitlich positives
Feedback zu den Einstellungsmöglichkeiten dokumentiert werden. Auf der
Wirkungsebene gilt der Nachweis als erbracht, wenn die Items zu
Autonomie, Steuerbarkeit und Transparenz im Median bei mindestens 4 von
5 Punkten liegen und die Awareness-Items qualitativ belegte
Bewusstseinsberichte erzeugen.]{.insertion author="Claude"
date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion author="Claude"
date="2026-05-06T12:00:00Z"}

[Die konkreten Schwellwerte werden vor dem Pilottest mit dem Betreuer
abgestimmt.]{.insertion author="Claude"
date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion author="Claude"
date="2026-05-06T12:00:00Z"}

[**8.8 Ethik und Einwilligung**]{.insertion author="Claude"
date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion author="Claude"
date="2026-05-06T12:00:00Z"}

[Vor Studienbeginn unterzeichnen alle Testpersonen eine
Einwilligungserklärung (Informed Consent, siehe Anhang H). Diese regelt
Studienzweck, Datenarten (Fragebogen, Interview-Aufzeichnung, Logdaten),
Verwendung (anonymisiert in der Thesis), Speicherung (lokal auf dem
Rechner des Autors, gelöscht sechs Monate nach Abgabe der Thesis) und
Widerrufsrecht. Es findet kein clientseitiges Tracking statt; die
Logdaten beschränken sich auf das technisch Notwendige zur Beantwortung
der Forschungsfrage.]{.insertion author="Claude"
date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion author="Claude"
date="2026-05-06T12:00:00Z"}

[**10 Diskussion**]{.insertion author="Claude"
date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion author="Claude"
date="2026-05-06T12:00:00Z"}

[Die Diskussion greift die drei Validierungsstränge aus Kapitel 8
explizit auf und ordnet die in Kapitel 9 dargestellten Ergebnisse in den
theoretischen Rahmen aus Kapitel 2 ein. Die Gliederung folgt der
argumentativen Struktur der Validierung: zunächst die Forschungsfrage
als synthetische Klammer, dann die drei Stränge einzeln, schliesslich
Implikationen, Limitationen und Übertragbarkeit.]{.insertion
author="Claude" date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion
author="Claude" date="2026-05-06T12:00:00Z"}

[**10.1 Beantwortung der Forschungsfrage**]{.insertion author="Claude"
date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion author="Claude"
date="2026-05-06T12:00:00Z"}

[\[Stub -- wird nach dem Pilottest auf Basis der Ergebnisse aus Kap. 9
verfasst.\] Synthese über die drei Validierungsstränge: Was wurde
nachgewiesen, was bleibt offen? Die Hauptforschungsfrage aus Kap. 4 wird
hier ebenenübergreifend beantwortet, mit klarer Markierung dessen, was
die kleine Stichprobe und der kurze Untersuchungszeitraum
tragen.]{.insertion author="Claude"
date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion author="Claude"
date="2026-05-06T12:00:00Z"}

[**10.2 Diskussion der Machbarkeit**]{.insertion author="Claude"
date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion author="Claude"
date="2026-05-06T12:00:00Z"}

[\[Stub.\] Reflexion der technischen Tragfähigkeit der Pipeline: Welche
Komponenten sind kostentreibend, welche fehleranfällig? Skaliert das
Konzept auf grössere Nutzerzahlen? Welche Architekturentscheidungen
würden sich rückblickend anders darstellen?]{.insertion author="Claude"
date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion author="Claude"
date="2026-05-06T12:00:00Z"}

[**10.3 Diskussion der Usability und Akzeptanz**]{.insertion
author="Claude" date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion
author="Claude" date="2026-05-06T12:00:00Z"}

[\[Stub.\] Welche Einstellungsmöglichkeiten wurden besonders geschätzt,
welche als überflüssig wahrgenommen, welche fehlen? Was sagt das über
die Designentscheidungen aus Kap. 6 aus, und welche Entscheidungen waren
möglicherweise zu stark theoriegetrieben?]{.insertion author="Claude"
date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion author="Claude"
date="2026-05-06T12:00:00Z"}

[**10.4 Diskussion der Wirkung**]{.insertion author="Claude"
date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion author="Claude"
date="2026-05-06T12:00:00Z"}

[\[Stub.\] Einordnung in den theoretischen Rahmen aus Kap. 2: Inwieweit
wurden die SDT-Bedürfnisse adressiert? Wurden VSD-Werte erlebbar?
Schärfte das Artefakt die Awareness für algorithmische Souveränität?
Welche Wirkung blieb aus, welche überraschte?]{.insertion
author="Claude" date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion
author="Claude" date="2026-05-06T12:00:00Z"}

[**10.5 Implikationen für Design und Praxis**]{.insertion
author="Claude" date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion
author="Claude" date="2026-05-06T12:00:00Z"}

[\[Stub.\] Welche Designentscheidungen sind übertragbar auf andere
wellbeing-orientierte Medienartefakte, welche radio-spezifisch? Welche
Implikationen ergeben sich für die Praxis öffentlich-rechtlicher Medien,
die ein wellbeing-orientiertes Angebot prüfen?]{.insertion
author="Claude" date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion
author="Claude" date="2026-05-06T12:00:00Z"}

[**10.6 Limitationen**]{.insertion author="Claude"
date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion author="Claude"
date="2026-05-06T12:00:00Z"}

[\[Stub.\] Kleine Stichprobe (mindestens drei, mehr wünschenswert);
kurzer Untersuchungszeitraum (maximal eine Woche); Selbstauswahl der
Testpersonen; mögliche Verzerrung durch zweimalige Befragung derselben
Personen (Lerneffekt, Erwartungseffekt); technische Restriktionen (LLM-
und TTS-Latenz, Lizenzfragen Musik); Selbstreport als einzige
Wirkungsquelle.]{.insertion author="Claude"
date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion author="Claude"
date="2026-05-06T12:00:00Z"}

[**10.7 Übertragbarkeit auf andere Medienkontexte**]{.insertion
author="Claude" date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion
author="Claude" date="2026-05-06T12:00:00Z"}

[\[Stub.\] Inwiefern lassen sich die Befunde auf Streaming,
Podcast-Empfehlungen oder News-Aggregatoren übertragen? Welche
Eigenschaften von Radio 25 sind generisch (definierte Sessionlänge,
explizite Präferenzangabe, Transparenzanzeige), welche formatspezifisch
(auditive Modalität, eingebettete Musikauswahl)?]{.insertion
author="Claude" date="2026-05-06T12:00:00Z"}[]{.paragraph-insertion
author="Claude" date="2026-05-06T12:00:00Z"}

**Literaturverzeichnis (vorläufig)**

Die folgende Liste enthält die in den Kapiteln 1 und 2 zitierten
Quellen. Sie wird im weiteren Verlauf der Arbeit ergänzt und vollständig
in Zotero verwaltet.

Bangor, A., Kortum, P. T., & Miller, J. T. (2008). An empirical
evaluation of the System Usability Scale. International Journal of
Human-Computer Interaction, 24(6), 574--594.
https://doi.org/10.1080/10447310802205776

Brooke, J. (1996). SUS: A «quick and dirty» usability scale. In P. W.
Jordan, B. Thomas, I. L. McClelland & B. Weerdmeester (Hrsg.), Usability
evaluation in industry (S. 189--194). Taylor & Francis.

Burr, C., Taddeo, M., & Floridi, L. (2020). The ethics of digital
well-being: A thematic review. Science and Engineering Ethics, 26,
2441--2460. https://doi.org/10.1007/s11948-020-00175-8

Calvo, R. A., & Peters, D. (2014). Positive computing: Technology for
wellbeing and human potential. MIT Press.

Fogg, B. J. (2003). The functional triad: Computers in persuasive roles.
In Persuasive technology: Using computers to change what we think and do
(Kap. 2, S. 23--29). Morgan Kaufmann.
https://doi.org/10.1016/B978-1-55860-643-2.X5000-8

Geschke, D., Lorenz, J., & Holtz, P. (2019). The triple-filter bubble:
Using agent-based modelling to test a meta-theoretical framework for the
emergence of filter bubbles and echo chambers. British Journal of Social
Psychology, 58(1), 129--149. https://doi.org/10.1111/bjso.12286

Hendry, D. G., Friedman, B., & Ballard, S. (2021). Value sensitive
design as a formative framework. Ethics and Information Technology,
23(1), 39--44. https://doi.org/10.1007/s10676-021-09579-x

Hevner, A. R. (2007). A three cycle view of design science research.
Scandinavian Journal of Information Systems, 19(2), 87--92.

Hevner, A. R., March, S. T., Park, J., & Ram, S. (2004). Design science
in information systems research. MIS Quarterly, 28(1), 75--105.
https://doi.org/10.2307/25148625

Katz, E., Blumler, J. G., & Gurevitch, M. (1973). Uses and
gratifications research. Public Opinion Quarterly, 37(4), 509--523.
https://doi.org/10.1086/268109

Milano, S., Taddeo, M., & Floridi, L. (2020). Recommender systems and
their ethical challenges. AI & Society, 35, 957--967.
https://doi.org/10.1007/s00146-020-00950-y

Montag, C., & Elhai, J. D. (2023). On social media design, (online-)time
well-spent and addictive behaviors in the age of surveillance
capitalism. Current Addiction Reports, 10(4), 384--395.
https://doi.org/10.1007/s40429-023-00494-3

Montag, C., Lachmann, B., Herrlich, M., & Zweig, K. (2019). Addictive
features of social media/messenger platforms and freemium games against
the background of psychological and economic theories. International
Journal of Environmental Research and Public Health, 16(14), 2612.
https://doi.org/10.3390/ijerph16142612

Nguyen, T. T., Hui, P.-M., Harper, F. M., Terveen, L., & Konstan, J. A.
(2014). Exploring the filter bubble: The effect of using recommender
systems on content diversity. In Proceedings of the 23rd International
Conference on World Wide Web (S. 677--686). ACM.
https://doi.org/10.1145/2566486.2568012

Orben, A. (2020). Teenagers, screens and social media: A narrative
review of reviews and key studies. Social Psychiatry and Psychiatric
Epidemiology, 55(4), 407--414.
https://doi.org/10.1007/s00127-019-01825-4

Pariser, E. (2011). The filter bubble: What the internet is hiding from
you. Penguin Press.

Peffers, K., Tuunanen, T., Rothenberger, M. A., & Chatterjee, S. (2007).
A design science research methodology for information systems research.
Journal of Management Information Systems, 24(3), 45--77.
https://doi.org/10.2753/MIS0742-1222240302

Peters, D., Ahmadpour, N., & Calvo, R. A. (2020). Tools for
wellbeing-supportive design: Features, characteristics, and prototypes.
Multimodal Technologies and Interaction, 4(3), 40.
https://doi.org/10.3390/mti4030040

Peters, D., Calvo, R. A., & Ryan, R. M. (2018). Designing for
motivation, engagement and wellbeing in digital experience. Frontiers in
Psychology, 9, 797. https://doi.org/10.3389/fpsyg.2018.00797

Reviglio, U., & Agosti, C. (2020). Thinking outside the black-box: The
case for «algorithmic sovereignty» in social media. Social Media +
Society, 6(2), 1--12. https://doi.org/10.1177/2056305120915613

Ricci, F., Rokach, L., & Shapira, B. (Hrsg.). (2015). Recommender
systems handbook (2. Aufl.). Springer.
https://doi.org/10.1007/978-1-4899-7637-6

Ryan, R. M., & Deci, E. L. (2000). Self-determination theory and the
facilitation of intrinsic motivation, social development, and
well-being. American Psychologist, 55(1), 68--78.
https://doi.org/10.1037/0003-066X.55.1.68

Sunstein, C. R. (2017). Polarization. In \#Republic: Divided democracy
in the age of social media (Kap. 3, S. 59--97). Princeton University
Press.

Vanden Abeele, M. M. P. (2021). Digital wellbeing as a dynamic
construct. Communication Theory, 31(4), 932--955.
https://doi.org/10.1093/ct/qtaa024

Verduyn, P., Lee, D. S., Park, J., Shablack, H., Orvell, A., Bayer, J.,
Ybarra, O., Jonides, J., & Kross, E. (2015). Passive Facebook usage
undermines affective well-being: Experimental and longitudinal evidence.
Journal of Experimental Psychology: General, 144(2), 480--488.
https://doi.org/10.1037/xge0000057

Vosoughi, S., Roy, D., & Aral, S. (2018). The spread of true and false
news online. Science, 359(6380), 1146--1151.
https://doi.org/10.1126/science.aap9559

Weinmann, M., Schneider, C., & vom Brocke, J. (2016). Digital nudging.
Business & Information Systems Engineering, 58(6), 433--436.
https://doi.org/10.1007/s12599-016-0453-3

Zuboff, S. (2019). The discovery of behavioral surplus. In The age of
surveillance capitalism: The fight for a human future at the new
frontier of power (Kap. 3, S. 63--97). PublicAffairs.
