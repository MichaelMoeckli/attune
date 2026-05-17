import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SESSION_COOKIE_NAME, verifySession } from '@/lib/session';

const PUBLIC_PATHS = new Set(['/unlock', '/api/unlock']);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (PUBLIC_PATHS.has(pathname)) return NextResponse.next();

  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (await verifySession(token)) return NextResponse.next();

  // For API requests respond with 401 so the client can react; for navigations redirect to /unlock.
  if (pathname.startsWith('/api/')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const url = request.nextUrl.clone();
  url.pathname = '/unlock';
  url.search = '';
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next.js internals and favicon; everything else (including static assets) is gated.
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico).*)'],
};
