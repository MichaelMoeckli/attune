interface MockBannerProps {
  ttsMode?: 'mock' | 'real';
}

export default function MockBanner({ ttsMode }: MockBannerProps = {}) {
  const isMockTts = ttsMode === 'mock';
  const headline = isMockTts ? 'Mock-TTS aktiv' : 'Mock-Modus aktiv';
  const body = isMockTts
    ? 'Sprachausgabe via Browser (Web Speech API). Externe TTS-Stimme deaktiviert.'
    : 'Nachrichten und Wetter sind Beispieldaten. Externe Quellen sind aktuell nicht verbunden.';

  return (
    <div style={{
      borderTop: '2px solid var(--warn)',
      borderBottom: '1px solid var(--rule)',
      background: 'oklch(95% 0.03 75)',
      padding: '10px 24px',
      display: 'flex', alignItems: 'flex-start', gap: 10,
    }}>
      <span style={{ color: 'var(--warn)', flex: '0 0 auto', display: 'flex', marginTop: 1 }}>
        <WarnIcon />
      </span>
      <div>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.16em',
          textTransform: 'uppercase', color: 'var(--warn)',
        }}>
          {headline}
        </div>
        <div style={{
          fontFamily: 'var(--font-sans)', fontSize: 12.5, color: 'var(--ink)',
          marginTop: 2, lineHeight: 1.4,
        }}>
          {body}
        </div>
      </div>
    </div>
  );
}

function WarnIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 L22 20 L2 20 Z"/>
      <line x1="12" y1="10" x2="12" y2="15"/>
      <circle cx="12" cy="18" r="0.6" fill="currentColor"/>
    </svg>
  );
}
