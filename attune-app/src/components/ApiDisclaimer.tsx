export default function ApiDisclaimer() {
  return (
    <div style={{
      fontFamily: 'var(--font-mono)', fontSize: 10.5,
      color: 'var(--ink-3)', lineHeight: 1.6,
      display: 'flex', flexDirection: 'column', gap: 2,
    }}>
      <div>nutzt Anthropic Claude · ElevenLabs · OpenWeatherMap · RSS SRF · NZZ</div>
      <div>keine Tracker, keine Werbung</div>
    </div>
  );
}
