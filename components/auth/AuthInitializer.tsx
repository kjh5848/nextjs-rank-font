'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/provider/StoreProvider';

interface Props {
  user: any | null;
}

export default function AuthInitializer({ user }: Props) {
  const { setLoginUser } = useAuthStore();

  useEffect(() => {
    // 서버에서 전달된 user가 있으면 상태 및 sessionStorage에 저장
    if (user) {
      setLoginUser(user);
      sessionStorage.setItem('loginUser', JSON.stringify(user));
    } else {
      // 없다면 sessionStorage에서 복원
      const stored = sessionStorage.getItem('loginUser');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (!setLoginUser) {
            setLoginUser(parsed);
          }
        } catch (err) {
          console.error('sessionStorage parse error:', err);
        }
      }
    }
  }, [user, setLoginUser]);

  return null;
}
