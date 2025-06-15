import { NextRequest, NextResponse } from 'next/server';
import { decrypt, getSession } from '@/lib/session';

// 1. 보호된 경로와 공개 경로 지정
const protectedRoutes = ['/popup', '/event', '/notice'];
const publicRoutes = ['/login', '/signup', '/'];

export default async function middleware(req: NextRequest) {
  // 2. 현재 경로가 보호된 경로인지 공개 경로인지 확인
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 3. 쿠키에서 세션 해독
  const cookie = await getSession();
  const session = await decrypt(cookie);
  // 5. 사용자가 인증되지 않은 경우 /login 으로 리디렉션
  if (isProtectedRoute && !session?.user) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  // 6. 사용자가 인증된 경우 /popup 으로 리디렉션
  if (isPublicRoute && session?.user && !req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/popup', req.nextUrl));
  }

  return NextResponse.next();
}

// 미들웨어가 실행되지 않아야 하는 경로
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
