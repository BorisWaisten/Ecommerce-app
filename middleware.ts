import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rutas que requieren autenticación
const protectedRoutes = ['/profile', '/checkout']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Solo proteger rutas que requieren autenticación
  // Pero permitir acceso a /profile si viene de una redirección desde /auth
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    // Verificar si viene de una redirección desde /auth
    const referer = request.headers.get('referer');
    const isFromAuth = referer && referer.includes('/auth');
    
    if (!isFromAuth) {
      const url = request.nextUrl.clone()
      url.pathname = '/auth'
      url.searchParams.set('redirect', pathname)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 