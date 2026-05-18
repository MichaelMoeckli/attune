'use client';

import { useState } from 'react';
import HelpButton from './HelpButton';

interface ParticipantIdFormProps {
  onSubmit: (id: string) => void;
}

export default function ParticipantIdForm({ onSubmit }: ParticipantIdFormProps) {
  const [id, setId] = useState('');
  const trimmed = id.trim();
  const canSubmit = trimmed.length > 0;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (canSubmit) onSubmit(trimmed);
      }}
      style={{ display: 'flex', flexDirection: 'column', gap: 22 }}
    >
      <div>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 10, marginBottom: 10,
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase',
            letterSpacing: '0.16em', color: 'var(--ink-3)',
          }}>Schritt 1 / 4 · Teilnehmer-ID</div>
          <HelpButton label="Was ist zu tun?">
            Trag die ID ein, die du vom Dozenten erhalten hast (Format z.&nbsp;B. <code style={{ fontFamily: 'var(--font-mono)' }}>P-07</code>).
            Sie ist dein Pseudonym für die Studie — exakt dieselbe ID musst du später
            im Online-Fragebogen wieder angeben, sonst lässt sich deine Sendung
            nicht mit deinen Antworten verknüpfen. Falls du keine ID hast, melde dich
            beim Dozenten.
          </HelpButton>
        </div>
        <h1 style={{
          fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 26,
          lineHeight: 1.15, letterSpacing: 'var(--tracking-tight)', color: 'var(--ink)',
        }}>Trag deine Teilnehmer-ID ein.</h1>
        <p style={{
          fontFamily: 'var(--font-sans)', fontSize: 14.5, color: 'var(--ink-2)',
          marginTop: 10, lineHeight: 1.55,
        }}>
          Du hast die ID vom Dozenten bekommen. Sie verknüpft deine Nutzung
          mit dem Fragebogen — auch dort wirst du sie eintragen.
        </p>
      </div>

      <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase',
          letterSpacing: '0.14em', color: 'var(--ink-3)',
        }}>ID</span>
        <input
          autoFocus
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="z. B. P-07"
          style={{
            fontFamily: 'var(--font-mono)', fontSize: 16, padding: '12px 14px',
            background: 'var(--paper)', color: 'var(--ink)',
            border: '1px solid var(--rule-strong)', borderRadius: 2,
            outline: 'none',
          }}
        />
      </label>

      <button
        type="submit"
        disabled={!canSubmit}
        style={{
          fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 500,
          width: '100%', padding: '16px 18px',
          background: canSubmit ? 'var(--ink)' : 'var(--rule)',
          color: 'var(--paper)',
          border: '1px solid', borderColor: canSubmit ? 'var(--ink)' : 'var(--rule)',
          borderRadius: 2,
          cursor: canSubmit ? 'pointer' : 'not-allowed',
        }}
      >
        Weiter →
      </button>

      <p style={{
        fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--ink-3)',
        margin: 0,
      }}>
        Falls dir keine ID mitgeteilt wurde, melde dich bitte bei deinem Dozenten
        oder per Mail an moeckmic@students.zhaw.ch.
      </p>
    </form>
  );
}
