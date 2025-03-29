import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('auth_token');
  const { pathname } = request.nextUrl;

  // Pages publiques qui ne nécessitent pas d'authentification
  const publicPages = ['/', '/login', '/register', '/pricing'];
  
  // Si l'utilisateur est sur une page publique et est authentifié, le rediriger vers son compte
  if (authToken && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/account', request.url));
  }

  // Si l'utilisateur n'est pas authentifié et essaie d'accéder à une page protégée
  if (!authToken && !publicPages.includes(pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}; 