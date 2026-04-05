ZHAW Zürcher Hochschule für Angewandte Wissenschaften

Institut für Wirtschaftsinformatik

**Disposition BSc-Thesis**

**Radio 25 -- Konzeptstudie eines\
vollautomatisierten Radios**

**Autor:** Michael Möckli

**Betreuer:** Alexandre de Spindler

**Datum:** 4. April 2026

**Zeitraum:** 1. April 2026 -- 7. Juni 2026

Zusammenfassung
===============

Radiosendungen zählen seit Jahrzehnten zu den meistgenutzten Medienformaten. Neben Musik bieten sie redaktionelle Inhalte wie Nachrichten, Wetter und Verkehrsinformationen. Die Produktion dieser Beiträge erfordert jedoch erhebliche personelle und finanzielle Ressourcen: Redaktionsteams recherchieren, Moderatoren sprechen ein, Techniker steuern den Ablauf. Gleichzeitig existieren heute leistungsfähige KI-Technologien -- Large Language Models zur Textgenerierung, Text-to-Speech-Systeme zur Sprachsynthese und agentische Orchestrierungsmuster zur Workflow-Steuerung --, die bisher jedoch kaum integriert eingesetzt werden, um vollständige Radiosendungen automatisiert zu erzeugen. Es fehlt eine Lösung, die auf Knopfdruck ein personalisiertes, aktuelles Radioerlebnis live generiert.

Die vorliegende Disposition beschreibt die Konzeptstudie «Radio 25», in deren Rahmen ein lauffähiger Demonstrator für ein vollautomatisiertes Radio entwickelt wird. Eine agentische Pipeline orchestriert dabei die Abfrage externer Datenquellen (Nachrichten, Wetter), die LLM-basierte Generierung von Moderationstexten, die Sprachsynthese mittels TTS sowie die Musikeinbindung. Das Ergebnis wird als Webapplikation bereitgestellt, über die Nutzende auf Knopfdruck eine individuelle Sendung starten und live hören können.

Die Arbeit folgt dem Design-Science-Ansatz und gliedert sich in sieben Arbeitspakete: von der Recherche und dem Architekturentwurf über einen End-to-End-Durchstich und iterative Verfeinerung bis hin zu einer Usability-Studie mit 5--8 Testpersonen, einer technischen Evaluation und der abschliessenden Dokumentation. Die Validierung erfolgt durch Performanzmessungen, einen standardisierten Usability-Fragebogen (SUS) sowie optionale Expertenbeurteilungen.

Inhaltsverzeichnis
==================

\[Inhaltsverzeichnis wird beim Öffnen in Word aktualisiert -- Rechtsklick → Felder aktualisieren\]

1. Motivation (Problem)
=======================

Radiosendungen gehören seit Jahrzehnten zu den meistgenutzten Medienformaten weltweit. Neben Musik bieten sie Moderationsbeiträge wie Kurznachrichten, Wettervorhersagen, Verkehrsinformationen und Zeitansagen. Diese Beiträge werden heute fast ausschliesslich von menschlichen Moderierenden erstellt und live eingesprochen. Dies erfordert erhebliche personelle und finanzielle Ressourcen: Redaktionsteams recherchieren Inhalte, Moderatoren bereiten Beiträge vor und sprechen diese ein, und Techniker steuern den Sendeablauf.

Gleichzeitig hat die technologische Entwicklung im Bereich der künstlichen Intelligenz in den letzten Jahren grosse Fortschritte gemacht. Large Language Models (LLMs) erzeugen qualitativ hochwertige Texte, Text-to-Speech-Systeme (TTS) generieren natürlich klingende Sprachausgaben, und agentische Orchestrierungsmuster ermöglichen die koordinierte Steuerung komplexer Workflows. Diese Technologien sind einzeln bereits ausgereift, werden jedoch bisher kaum integriert eingesetzt, um vollständige Radiosendungen automatisiert zu erzeugen.

Bestehende Lösungen im Bereich automatisierter Audiomedien beschränken sich überwiegend auf Musik-Streaming-Dienste (z. B. Spotify, Apple Music), die zwar personalisierte Musikwiedergabe bieten, jedoch keine redaktionellen Inhalte wie Nachrichten oder Wetter integrieren. Podcast-Plattformen liefern zwar gesprochene Inhalte, diese sind jedoch vorproduziert und nicht live generiert. Ansätze wie huxe.com zeigen erste Schritte in Richtung personalisierter Audioinhalte, decken jedoch nicht das gesamte Spektrum einer klassischen Radiosendung ab.

Das Problem lässt sich wie folgt zusammenfassen: Es existiert derzeit keine Lösung, die auf Knopfdruck eine vollständige, personalisierte Radiosendung live generiert und abspielt -- bestehend aus aktuellen Nachrichten, Wettervorhersagen, Zeitansagen und Musik. Diese Lücke betrifft sowohl Endnutzende, die ein personalisiertes Radioerlebnis wünschen, als auch kleinere Radiostationen oder Community-Radios, die ihre Produktionskosten senken und dennoch ein vollwertiges Programm anbieten möchten.

2. Lösungsvorschlag
===================

Die vorliegende Arbeit entwickelt eine Konzeptstudie und einen lauffähigen Demonstrator für ein vollautomatisiertes Radio mit dem Arbeitstitel «Radio 25». Die Kernidee besteht darin, mithilfe einer agentischen Pipeline verschiedene Dienste zu orchestrieren, um eine Radiosendung vollständig automatisiert zu erzeugen und als Webapplikation live abzuspielen.

2.1 Architektur und Komponenten
-------------------------------

Die Lösung setzt sich aus folgenden Komponenten zusammen:

-   **Orchestrator (agentische Pipeline):** Ein zentraler Orchestrator steuert den gesamten Ablauf der Sendungsgenerierung als asynchrone Pipeline. Er koordiniert die Abfrage externer Dienste, die Textgenerierung, die Sprachsynthese und die Musikeinbindung. Konzeptionell handelt es sich um ein agentisches System, das ohne separates Agent-Framework (wie LangChain oder CrewAI) auskommt und stattdessen als schlanke Orchestrierungsfunktion innerhalb der Next.js-Applikation implementiert ist.

-   **Nachrichtenintegration:** RSS-Feeds (SRF, NZZ) werden als Primärquelle abgefragt, um aktuelle Meldungen zu beziehen. Optional kann NewsAPI.org als zusätzliche Quelle eingebunden werden.

-   **Wetterdienste:** Die OpenWeatherMap-API liefert standortbezogene Vorhersagedaten.

-   **LLM-Textgenerierung:** Claude Sonnet (Anthropic) wird über das Vercel AI SDK angebunden und verarbeitet die Rohdaten zu natürlich klingenden Moderationstexten im Radiostil.

-   **Text-to-Speech (TTS):** Die generierten Texte werden mittels ElevenLabs (Modell: `eleven_multilingual_v2`) in gesprochene Sprache umgewandelt. Das Modell unterstützt Deutsch und liefert eine natürlich klingende Sprachausgabe.

-   **Musikintegration:** Zwischen den Textblöcken wird Musik eingespielt. Als Primärlösung dienen lizenzfreie lokale MP3-Dateien. Optional kann Spotify über die Web API und das Playback SDK eingebunden werden (setzt einen Premium-Account des Nutzenden voraus).

-   **Webapplikation:** Eine browserbasierte Next.js-15-Oberfläche (React 19, TypeScript, Tailwind CSS 4) ermöglicht es Nutzenden, auf Knopfdruck eine Sendung zu starten und live zu hören.

2.2 Goal und Objective
----------------------

Goal: Endnutzende erhalten ein personalisiertes, aktuelles Radioerlebnis, das ohne menschliche Moderation auf Knopfdruck live generiert wird.

Objective: Im Rahmen dieser Arbeit wird ein funktionsfähiger Demonstrator entwickelt, der die technische Machbarkeit der vollautomatisierten Radiogenerierung nachweist. Dazu gehören die Integration externer Datenquellen, die LLM-basierte Texterstellung, die Sprachsynthese, die Musikeinbindung sowie eine Weboberfläche zur Steuerung und Wiedergabe.

3. Nutzen
=========

Die Lösung adressiert mehrere Nutzergruppen und erzeugt auf verschiedenen Ebenen einen konkreten Mehrwert:

3.1 Nutzen für Endnutzende
--------------------------

Endnutzende profitieren von einem personalisierten Radioerlebnis. Im Gegensatz zu herkömmlichen Radiosendern, die ein breites Publikum bedienen, kann Radio 25 Inhalte auf individuelle Interessen, bevorzugte Nachrichtenthemen und den Standort der Nutzenden zuschneiden. Die Sendung wird on-demand generiert -- Nutzende sind nicht an feste Sendezeiten gebunden.

3.2 Nutzen für Radiostationen und Medienhäuser
----------------------------------------------

Kleine und mittlere Radiostationen sowie Community-Radios können ihre Produktionskosten erheblich senken. Die Automatisierung von Routinebeiträgen (Nachrichten, Wetter, Zeitansagen) entlastet Redaktionsteams und ermöglicht es, Ressourcen auf hochwertige, investigative Inhalte zu konzentrieren. Zudem wird eine 24/7-Programmausstrahlung ohne durchgehende Personalbesetzung möglich.

3.3 Nutzen für die Forschung
----------------------------

Die Arbeit leistet einen Beitrag zur angewandten Forschung im Bereich agentischer Systeme. Die entwickelte Orchestrierungsarchitektur und die gewonnenen Erkenntnisse zur Integration von LLM, TTS und externen APIs können auf andere Anwendungsfälle übertragen werden (z. B. automatisierte Podcasts, Sprachassistenten, Informationssysteme). Die Usability-Studie liefert zudem empirische Daten zur Nutzerakzeptanz KI-generierter Audioinhalte.

3.4 Qualitative Nutzenprognose
------------------------------

Der Nutzen der Lösung manifestiert sich primär in drei Dimensionen: Erstens ermöglicht die Automatisierung eine signifikante Reduktion des Produktionsaufwands für Standardbeiträge. Zweitens schafft die Personalisierung einen Mehrwert, den herkömmliche Radiosender nicht bieten können. Drittens demonstriert die Skalierbarkeit der Lösung, dass ein einziges System potenziell viele individuelle Sendungen parallel erzeugen kann -- ein Vorteil, der mit menschlichen Moderierenden nicht erreichbar ist.

4. Herausforderungen
====================

Die Entwicklung eines vollautomatisierten Radios birgt mehrere technische und konzeptionelle Herausforderungen, die im Rahmen dieser Arbeit adressiert werden.

4.1 Hauptfrage
--------------

*Wie kann eine Webapplikation gestaltet werden, die auf Basis einer agentischen Pipeline eine vollständige, personalisierte Radiosendung in Echtzeit generiert und abspielt?*

4.2 Unterfragen
---------------

1.  Qualität der generierten Inhalte: Wie lässt sich sicherstellen, dass die vom LLM erzeugten Moderationstexte qualitativ hochwertig, faktisch korrekt und stilistisch angemessen für ein Radioformat sind?

2.  Latenz und Echtzeitfähigkeit: Wie kann die Gesamtlatenz der Pipeline -- von der Datenabfrage über die Textgenerierung bis zur Sprachsynthese -- so reduziert werden, dass ein flüssiges, live-artiges Hörerlebnis entsteht?

3.  Personalisierung und Nutzererlebnis: Wie kann die Sendungsgenerierung so gestaltet werden, dass individuelle Präferenzen (Themen, Sprache, Stil) berücksichtigt werden, ohne die Kohärenz der Sendung zu beeinträchtigen?

4.3 Weitere Herausforderungen
-----------------------------

-   Integration externer Dienste: Verschiedene APIs (Nachrichten, Wetter, Musik) haben unterschiedliche Datenformate, Verfügbarkeiten und Ratenlimits. Die robuste Integration und Fehlerbehandlung ist eine zentrale technische Herausforderung.

-   Musikintegration: Die rechtlich konforme und ästhetisch stimmige Einbindung von Musik zwischen den Textblöcken erfordert sowohl technische als auch lizenzrechtliche Klärungen.

-   Natürlichkeit der Sprachausgabe: Aktuelle TTS-Systeme variieren stark in ihrer Qualität. Die Auswahl und Konfiguration eines geeigneten Systems für den Radiokontext ist entscheidend für die Nutzerakzeptanz.

5. Vorgehen
===========

5.1 Methodik
------------

Die Arbeit folgt dem Design-Science-Ansatz, der sich besonders für die Entwicklung und Evaluation von IT-Artefakten eignet. Im Zentrum steht ein iteratives Vorgehen: In jeder Iteration wird ein Teilaspekt der Lösung entworfen, implementiert und evaluiert. Die gewonnenen Erkenntnisse fliessen in die nächste Iteration ein.

Als erste Iteration wird ein Durchstich (End-to-End-Prototyp) angestrebt. Dabei wird eine stark vereinfachte Version des Gesamtsystems realisiert, die den grundlegenden Ablauf demonstriert: Daten abfragen, Text generieren, Sprache synthetisieren, abspielen. Auf Basis dieses Durchstichs wird entschieden, welche Komponenten vertieft werden.

5.2 Arbeitspakete
-----------------

  **AP**   **Beschreibung**              **Input**                          **Output**
  -------- ----------------------------- ---------------------------------- ---------------------------------------------------------
  1        Recherche und Analyse         Themenbeschreibung, Literatur      State-of-the-Art-Analyse, Anforderungskatalog
  2        Architekturentwurf            Anforderungen, API-Dokumentation   Systemarchitektur, Komponentendiagramm
  3        Durchstich (End-to-End)       Architektur, APIs                  Lauffähiger Minimalprototyp
  4        Iterative Verfeinerung        Prototyp, Feedback                 Erweiterter Demonstrator mit Personalisierung und Musik
  5        Usability-Studie              Demonstrator, Testpersonen         Usability-Bericht, Nutzerfeedback
  6        Evaluation und Validierung    Demonstrator, Messkriterien        Machbarkeitsstudie, Performanzmessungen
  7        Dokumentation und Abschluss   Alle Artefakte                     Wissenschaftlicher Bericht, Code-Dokumentation

5.3 Ressourcen und Kompetenzen
------------------------------

Für die erfolgreiche Durchführung des Projekts sind folgende Kompetenzen und Ressourcen erforderlich:

-   LLM-Integration: Erfahrung mit API-basierten Sprachmodellen, insbesondere Claude Sonnet via Vercel AI SDK (Prompt Engineering, API-Management, Kontextsteuerung)

-   Text-to-Speech: Kenntnisse in der Konfiguration und Nutzung von ElevenLabs (Stimmauswahl, Prosodie, mehrsprachige Modelle)

-   Webentwicklung: Fullstack-Entwicklung mit Next.js 15 (React 19, TypeScript, Tailwind CSS 4), API Routes und HTML5-Audio-Wiedergabe

-   Agentische Orchestrierung: Entwurf und Implementierung einer asynchronen Pipeline zur koordinierten Steuerung von Datenabfrage, Textgenerierung, Sprachsynthese und Musikeinbindung

-   UX-Research: Grundkenntnisse in der Durchführung von Usability-Studien (Testplanung, Durchführung, Auswertung)

6. Validierung
==============

Die Validierung der Lösung erfolgt auf mehreren Ebenen, um sowohl die technische Machbarkeit als auch den Nutzen für Endanwendende nachzuweisen.

6.1 Technische Validierung (Proof of Concept)
---------------------------------------------

Der Demonstrator wird anhand definierter Kriterien geprüft. Dazu gehören: die erfolgreiche Abfrage und Verarbeitung externer Datenquellen, die Generierung qualitativ angemessener Moderationstexte, die verständliche und natürlich klingende Sprachausgabe sowie ein flüssiger Gesamtablauf der Sendung. Performanzmessungen erfassen die Latenz der einzelnen Pipeline-Schritte und die Gesamtdauer bis zur Wiedergabe.

6.2 Usability-Studie (Proof of Use)
-----------------------------------

Eine Usability-Studie mit 5--8 Testpersonen wird durchgeführt, um die Nutzerakzeptanz und das Hörerlebnis zu evaluieren. Die Testpersonen hören generierte Sendungen und bewerten diese anhand eines standardisierten Fragebogens (z. B. System Usability Scale, ergänzt um audiospezifische Items). Qualitative Interviews ergänzen die quantitativen Daten.

6.3 Expertenbeurteilung
-----------------------

Optional wird eine Expertenbeurteilung durch Fachpersonen aus dem Medien- oder Radiobereich eingeholt. Diese beurteilt die Qualität der generierten Inhalte im Vergleich zu herkömmlichen Radiosendungen und identifiziert Verbesserungspotenziale.

6.4 Erfolgskriterien
--------------------

Die Lösung gilt als erfolgreich validiert, wenn:

-   Der Demonstrator auf Knopfdruck eine vollständige Sendung (Nachrichten, Wetter, Musik) generiert und abspielt.

-   Die Gesamtlatenz vom Start bis zur Wiedergabe unter einer definierten Schwelle liegt (Zielwert: \< 30 Sekunden für den ersten Beitrag).

-   Die Usability-Studie eine überwiegend positive Bewertung der Nutzerakzeptanz ergibt (SUS-Score \> 68).

-   Die generierten Texte als verständlich, relevant und stilistisch angemessen beurteilt werden.

7. Messbarer Output (Artefakte)
===============================

Im Rahmen der Arbeit werden folgende fassbare Projektergebnisse erzeugt:

4.  Lauffähiger Demonstrator: Eine Webapplikation, die auf Knopfdruck eine personalisierte Radiosendung generiert und live abspielt. Der Demonstrator zeigt die Gesamtidee und kann einzelne Komponenten isoliert demonstrieren.

5.  Machbarkeitsstudie: Ein dokumentierter Nachweis der technischen Machbarkeit, inklusive Designvorschläge für die Systemarchitektur, identifizierte Grenzen und Empfehlungen für die Weiterentwicklung.

6.  Usability-Bericht: Dokumentation und Auswertung der Usability-Studie mit quantitativen Ergebnissen (SUS-Score, Aufgabenerfolgsraten) und qualitativen Erkenntnissen aus den Nutzerinterviews.

7.  Code-Base und Orchestrator: Der vollständige Quellcode des Demonstrators, inklusive der agentischen Pipeline zur Orchestrierung von Datenabfrage, Textgenerierung, Sprachsynthese und Musikeinbindung. Der Code ist dokumentiert und kann als Grundlage für Weiterentwicklungen dienen.

8.  Systemarchitektur und Designdokumentation: Diagramme und Beschreibungen der Systemarchitektur, Komponenteninteraktionen und Datenflüsse.

9.  Wissenschaftlicher Bericht: Die vollständige BSc-Thesis als wissenschaftliche Arbeit mit Einleitung, Related Work, Methodik, Ergebnissen und Fazit.

8. Zeitplan
===========

Der folgende Zeitplan erstreckt sich über den Projektzeitraum vom 1. April bis zum 7. Juni 2026 (ca. 10 Wochen). Das Vorgehen ist iterativ angelegt, wobei Erkenntnisse aus früheren Phasen in spätere einfliessen.

  **Arbeitspaket**                     **W1**   **W2**   **W3**   **W4**   **W5**   **W6**   **W7**   **W8**   **W9**   **W10**
  ------------------------------------ -------- -------- -------- -------- -------- -------- -------- -------- -------- ---------
  **AP1: Recherche & Analyse**         ■        ■                                                                       
  **AP2: Architekturentwurf**                   ■        ■                                                              
  **AP3: Durchstich (E2E)**                              ■        ■        ■                                            
  **AP4: Iterative Verfeinerung**                                          ■        ■        ■                          
  **AP5: Usability-Studie**                                                                  ■        ■                 
  **AP6: Evaluation & Validierung**                                                                   ■        ■        
  **AP7: Dokumentation & Abschluss**                                                                           ■        ■

*Wochenübersicht: W1 = 1.--5. Apr. \| W2 = 6.--12. Apr. \| W3 = 13.--19. Apr. \| W4 = 20.--26. Apr. \| W5 = 27. Apr.--3. Mai \| W6 = 4.--10. Mai \| W7 = 11.--17. Mai \| W8 = 18.--24. Mai \| W9 = 25.--31. Mai \| W10 = 1.--7. Jun.*

9. Literaturverzeichnis
=======================

Anthropic. (2024). *The Claude 3 model family: Opus, Sonnet, Haiku*. https://www.anthropic.com/news/claude-3-family

Artificial Analysis. (2025). *ElevenLabs -- Quality ELO, speed & price analysis*. https://artificialanalysis.ai/text-to-speech/model-families/elevenlabs

Bangor, A., Kortum, P. T., & Miller, J. T. (2008). An empirical evaluation of the System Usability Scale. *International Journal of Human--Computer Interaction, 24*(6), 574--594. https://doi.org/10.1080/10447310802205776

Bridge Ratings Media Research. (2024, 3. Dezember). *A podcasting future: 2025*. https://www.bridgeratings.com/blog/2024/12/3/a-podcasting-future-2025

Brooke, J. (1996). SUS: A 'quick and dirty' usability scale. In P. W. Jordan, B. Thomas, I. L. McClelland, & B. Weerdmeester (Hrsg.), *Usability evaluation in industry* (S. 189--194). Taylor & Francis.

Diehl, T., & Naranjo-Zolp, N. (2025). Generative AI and the new landscape of automated journalism: A systematized review of 185 studies (2012--2024). *Journalism and Media, 7*(1), Artikel 39. https://doi.org/10.3390/journalmedia7010039

Graefe, A. (2016). *Guide to automated journalism*. Tow Center for Digital Journalism, Columbia University. https://doi.org/10.7916/D80G3XDJ

Hevner, A. R. (2007). A three cycle view of design science research. *Scandinavian Journal of Information Systems, 19*(2), 87--92.

Hevner, A. R., March, S. T., Park, J., & Ram, S. (2004). Design science in information systems research. *MIS Quarterly, 28*(1), 75--105. https://doi.org/10.2307/25148625

Liu, J.-H. (2025). Artificial intelligence in internet radio and podcasting: Evolution, integration, and future directions. *Medium*. https://medium.com/\@gwrx2005/artificial-intelligence-in-internet-radio-and-podcasting

Masterman, T., Besen, S., Sawtell, M., & Chao, A. (2024). *The landscape of emerging AI agent architectures for reasoning, planning, and tool calling: A survey*. arXiv. https://arxiv.org/abs/2404.11584

Naughton, J. (2024). AI is coming for radio -- and it could change how we listen forever. *The Guardian*. https://www.theguardian.com

Nielsen, J. (1994). *Usability engineering*. Morgan Kaufmann.

OpenAI. (2023). *GPT-4 technical report*. arXiv. https://arxiv.org/abs/2303.08774

Peffers, K., Tuunanen, T., Rothenberger, M. A., & Chatterjee, S. (2007). A design science research methodology for information systems research. *Journal of Management Information Systems, 24*(3), 45--77. https://doi.org/10.2753/MIS0742-1222240302

Perez, S. (2025, 23. September). Former NotebookLM devs' new app, Huxe, taps audio to help you with news and research. *TechCrunch*. https://techcrunch.com/2025/09/23/former-notebooklm-devs-new-app-huxe-taps-audio-to-help-you-with-news-and-research/

RadioNewsAI. (2024). *AI news anchor generator*. https://radionewsai.com/

Ren, Y., Hu, C., Tan, X., Qin, T., Zhao, S., Zhao, Z., & Liu, T.-Y. (2021). FastSpeech 2: Fast and high-quality end-to-end text to speech. *Proceedings of the International Conference on Learning Representations (ICLR)*. https://arxiv.org/abs/2006.04558

Smallest.ai. (2025). *TTS benchmark 2025: Smallest.ai vs ElevenLabs report*. https://smallest.ai/blog/tts-benchmark-2025-smallestai-vs-elevenlabs-report

Tan, X., Chen, J., Liu, H., Cong, J., Zhang, C., Liu, Y., Wang, X., Leng, Y., Yi, Y., He, L., Soong, F., Qin, T., Zhao, S., & Liu, T.-Y. (2024). NaturalSpeech: End-to-end text-to-speech synthesis with human-level quality. *IEEE Transactions on Pattern Analysis and Machine Intelligence, 46*(6), 4234--4245. https://doi.org/10.1109/TPAMI.2024.3356232

Tran, T. H. (2025). The AI agent framework landscape in 2025: What changed and what matters. *Medium*. https://medium.com/\@hieutrantrung.it/the-ai-agent-framework-landscape-in-2025

Zhao, W. X., Zhou, K., Li, J., Tang, T., Wang, X., Hou, Y., Min, Y., Zhang, B., Zhang, J., Dong, Z., Du, Y., Yang, C., Chen, Y., Chen, Z., Jiang, J., Ren, R., Li, Y., Tang, X., Liu, Z., ... Wen, J.-R. (2023). A survey of large language models. *arXiv*. https://arxiv.org/abs/2303.18223
