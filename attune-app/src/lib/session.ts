// HMAC-signed session token, format: <b64url(payload)>.<b64url(sig)>
// Payload is the ISO expiry. Verifying recomputes the HMAC and checks expiry.
// Web Crypto API only — works in both Edge (middleware) and Node (route handler) runtimes.

export const SESSION_COOKIE_NAME = 'r25_session';
export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 days

async function getKey(): Promise<CryptoKey> {
  const secret = process.env.DEMO_COOKIE_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('DEMO_COOKIE_SECRET missing or too short (need 32+ chars).');
  }
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  );
}

function toB64Url(bytes: ArrayBuffer | Uint8Array): string {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let s = '';
  for (let i = 0; i < arr.length; i++) s += String.fromCharCode(arr[i]);
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromB64Url(s: string): Uint8Array {
  const pad = s.length % 4 ? '='.repeat(4 - (s.length % 4)) : '';
  const bin = atob((s + pad).replace(/-/g, '+').replace(/_/g, '/'));
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
  return arr;
}

export async function createSession(): Promise<string> {
  const key = await getKey();
  const expISO = new Date(Date.now() + SESSION_TTL_SECONDS * 1000).toISOString();
  const payload = toB64Url(new TextEncoder().encode(expISO));
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload));
  return `${payload}.${toB64Url(sig)}`;
}

export async function verifySession(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  try {
    const dot = token.indexOf('.');
    if (dot <= 0) return false;
    const payload = token.slice(0, dot);
    const sig = token.slice(dot + 1);
    const key = await getKey();
    const ok = await crypto.subtle.verify(
      'HMAC',
      key,
      fromB64Url(sig) as BufferSource,
      new TextEncoder().encode(payload),
    );
    if (!ok) return false;
    const expISO = new TextDecoder().decode(fromB64Url(payload));
    const exp = Date.parse(expISO);
    return Number.isFinite(exp) && Date.now() < exp;
  } catch {
    return false;
  }
}
