import 'server-only';

import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: {}) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    console.log('Failed to verify session', error);
  }
}

export async function getSession() {
  return (await cookies()).get('session')?.value;
}

export async function createSession(userId: number, branchId: number) {
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day
  const session = await encrypt({ userId, branchId, expiresAt });
  const cookieStore = await cookies();

  /**
   * httpOnly : 클라이언트 측 JavaScript가 쿠키에 액세스하는 것을 방지합니다.
   * secure : https를 사용하여 쿠키를 전송합니다.
   * SameSite : 쿠키를 사이트 간 요청과 함께 보낼 수 있는지 여부를 지정합니다.
   * 경로 : 쿠키의 URL 경로를 정의합니다.
   * @param userId
   */

  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
}

export async function updateSession() {
  const session = (await cookies()).get('session')?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const cookieStore = await cookies();
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: 'lax',
    path: '/',
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}

export async function getBranchId() {
  const cookie = await getSession();
  const session = await decrypt(cookie);
  const branchId = session?.branchId;

  if (!branchId) {
    return null;
  }

  return Number(branchId);
}
