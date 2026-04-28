import type { NextConfig } from "next";

// Inline styles and inline scripts are unavoidable here:
// - Inline styles: components use React `style={...}` props extensively (design-system inline tokens).
// - Inline scripts: Next.js App Router hydration emits inline <script> tags without a nonce in default config.
// A nonce-based CSP would require custom middleware; out of scope for a thesis demo.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://sdk.scdn.co",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: https:",
  "media-src 'self' data: blob: https:",
  "connect-src 'self' https://api.spotify.com https://*.spotify.com",
  "frame-src 'self' https://open.spotify.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
];

const nextConfig: NextConfig = {
  async headers() {
    // Skip strict CSP in dev — Next.js HMR uses inline eval and a websocket that doesn't fit the production policy.
    if (process.env.NODE_ENV !== 'production') return [];
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default nextConfig;
