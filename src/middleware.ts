import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AuthService } from './services/auth';

export function middleware(request: NextRequest) {
  // Excluir rutas públicas y API
  if (
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname === '/login'
  ) {
    return NextResponse.next();
  }

  // Verificar si existe la cookie de autenticación
  const authToken = request.cookies.get('auth_token')?.value;

  // Si no hay token, redirigir a login
  if (!authToken) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Si hay token, verificar que sea válido
  const authService = AuthService.getInstance();
  authService.setAccessToken(authToken);

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login (login page)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|login).*)',
  ],
}; 