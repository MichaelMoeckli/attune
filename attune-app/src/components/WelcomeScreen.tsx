'use client';

import type { ReactNode } from 'react';

interface WelcomeScreenProps {
  onContinue: () => void;
}

export default function WelcomeScreen({ onContinue }: WelcomeScreenProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ paddingTop: 8 }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase',
          letterSpacing: '0.16em', color: 'var(--ink-3)', marginBottom: 10,
        }}>Pilotstudie · ZHAW</div>
        <h1 style={{
          fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 30,
          lineHeight: 1.1, letterSpacing: 'var(--tracking-tight)', color: 'var(--ink)',
        }}>Willkommen bei Attune.</h1>
      </div>

      <p style={{
        fontFamily: 'var(--font-sans)', fontSize: 15, lineHeight: 1.6, color: 'var(--ink-2)',
      }}>
        Du nimmst an der Pilotstudie zu Attune teil — einem vollautomatisierten
        KI-Radio, das nicht auf die Verweildauer, sondern auf{' '}
        <em>dein Wohlbefinden</em> optimiert ist. Die Studie ist Teil meiner
        Bachelorarbeit am Institut für Wirtschaftsinformatik der ZHAW.
      </p>

      <div style={{
        display: 'flex', flexDirection: 'column', gap: 14,
        borderLeft: '2px solid var(--rule)', padding: '4px 0 4px 14px',
      }}>
        <Step n="1" title="Teilnehmer-ID eintragen">
          Du hast vom Dozenten eine ID erhalten. Trage sie gleich ein:
          Du brauchst sie später auch im Fragebogen.
        </Step>
        <Step n="2" title="Kurzes Onboarding">
          Wähle deine Themen, die Sendungslänge und die Musikquelle.
        </Step>
        <Step n="3" title="Sendung anhören">
          Lehne dich zurück und höre dir eine vollständige Sendung in Ruhe an
          (ca. 5–15 Min). Bitte mit Kopfhörern oder in einer ruhigen Umgebung.
        </Step>
        <Step n="4" title="Fragebogen ausfüllen">
          Am Ende erscheint ein Button «Fragebogen jetzt ausfüllen».
          Plane dafür weitere 15–20 Minuten ein.
        </Step>
      </div>

      <p style={{
        fontFamily: 'var(--font-serif)', fontStyle: 'italic',
        fontSize: 14, lineHeight: 1.55, color: 'var(--reason)',
        borderLeft: '2px solid var(--reason-rule)', padding: '6px 0 6px 14px',
        margin: 0,
      }}>
        Deine Antworten und Profildaten werden ausschliesslich pseudonym über
        deine ID ausgewertet. Die Zuordnungsliste «Name → ID» befindet sich
        ausschliesslich beim Dozenten.
      </p>

      <button
        onClick={onContinue}
        style={{
          fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 500,
          width: '100%', padding: '16px 18px',
          background: 'var(--ink)', color: 'var(--paper)',
          border: '1px solid var(--ink)', borderRadius: 2,
          cursor: 'pointer',
        }}
      >
        Los geht&apos;s →
      </button>

      <p style={{
        fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--ink-3)',
        textAlign: 'center', margin: 0,
      }}>
        Bei Fragen: moeckmic@students.zhaw.ch
      </p>
    </div>
  );
}

function Step({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: 10 }}>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)',
        fontVariantNumeric: 'tabular-nums', minWidth: 14, paddingTop: 2,
      }}>{n}</div>
      <div>
        <div style={{
          fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 500, color: 'var(--ink)',
        }}>{title}</div>
        <div style={{
          fontFamily: 'var(--font-sans)', fontSize: 13.5, color: 'var(--ink-2)',
          marginTop: 2, lineHeight: 1.5,
        }}>{children}</div>
      </div>
    </div>
  );
}
