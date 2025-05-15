import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  console.log(`[Middleware] 현재 경로: ${path}`);

  // 공개 경로: "/" "/login" "/join"은 허용
  const PUBLIC_PATHS = ['/', '/login', '/join'];
  if (PUBLIC_PATHS.includes(path)) {
    console.log(`[Middleware] ▶ 공개 페이지 접근 허용: ${path}`);
    return NextResponse.next();
  }

  // 보호된 경로: JSESSIONID 쿠키 없으면 "/login"로 리디렉트
  const sessionCookie = request.cookies.get('JSESSIONID');
  if (!sessionCookie) {
    console.warn(`[Middleware] ⚠️ 보호 페이지(${path}) → 세션 없음 → "/login"로 리디렉트`);
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 세션 쿠키만 있으면 통과
  console.log(`[Middleware] ✅ 세션 쿠키 확인 완료 → 접근 허용: ${path}`);
  return NextResponse.next();
}

// 미들웨어 적용 경로 설정
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
