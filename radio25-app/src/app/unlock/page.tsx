'use client';

import { useState } from 'react';

export default function UnlockPage() {
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const res = await fetch('/api/unlock', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      window.location.href = '/';
      return;
    }
    setError('Falsches Passwort.');
    setSubmitting(false);
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--paper)', color: 'var(--ink)', padding: 24,
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          width: '100%', maxWidth: 360, display: 'flex', flexDirection: 'column', gap: 16,
        }}
      >
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase',
          letterSpacing: '0.16em', color: 'var(--ink-3)',
        }}>
          radio 25 — vorschau
        </div>
        <h1 style={{
          fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 28,
          lineHeight: 1.1, letterSpacing: 'var(--tracking-tight)', margin: 0,
        }}>
          Zugang nur für Gäste
        </h1>
        <p style={{
          fontFamily: 'var(--font-serif)', fontSize: 14, lineHeight: 1.55,
          color: 'var(--ink-2)', margin: 0,
        }}>
          Diese Demo ist nicht öffentlich. Bitte das Einladungspasswort eingeben.
        </p>

        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Passwort"
          aria-label="Passwort"
          style={{
            width: '100%', padding: '11px 12px',
            fontFamily: 'var(--font-serif)', fontSize: 15,
            background: 'var(--paper)', border: '1px solid var(--rule-strong)',
            borderRadius: 2, color: 'var(--ink)', outline: 'none',
          }}
        />

        <button
          type="submit"
          disabled={submitting || !password}
          style={{
            fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 500,
            width: '100%', padding: '14px 18px',
            background: 'var(--ink)', color: 'var(--paper)',
            border: '1px solid var(--ink)', borderRadius: 2,
            cursor: submitting || !password ? 'not-allowed' : 'pointer',
            opacity: submitting || !password ? 0.4 : 1,
          }}
        >
          {submitting ? 'Prüfe …' : 'Entsperren'}
        </button>

        {error && (
          <div style={{
            fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--warn)',
          }}>
            {error}
          </div>
        )}
      </form>
    </div>
  );
}
