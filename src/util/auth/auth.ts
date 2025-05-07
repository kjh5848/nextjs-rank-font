// lib/auth.ts
import AuthRepository from '@/src/model/AuthRepository';
import { cookies } from 'next/headers';

export async function getUserFromSession(): Promise<any | null> {
  const cookieStore = cookies();
  const sessionCookie = (await cookieStore).get('JSESSIONID');
  if (!sessionCookie) return null;

  try {
    const response = await AuthRepository.checkAuth()
    if (response.code !== "0") return null;
    return response.data?.user || null;
  } catch (e) {
    console.warn('getUserFromSession error:', e);
    return null;
  }
}
