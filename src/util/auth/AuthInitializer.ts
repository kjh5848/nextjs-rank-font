'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/src/store/provider/StoreProvider';

export default function AuthInitializer() { 
  const { user: storeUser, setLoginUser } = useAuthStore(); // 스토어의 user 상태를 storeUser로 받음

  useEffect(() => {
    
    // 2. 서버에서 user 정보가 없고, 현재 스토어에도 user 정보가 없는 경우 (새로고침 또는 뒤로가기 등)
    if (!storeUser) { // 스토어의 user 상태(storeUser)를 확인
      // sessionStorage에서 복원 시도
      const stored = sessionStorage.getItem('loginUser'); // key는 'loginUser' 유지 또는 'user'로 변경 고려
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          // 복원된 정보로 스토어 상태 업데이트
          setLoginUser(parsed);
        } catch (err) {
          console.error('sessionStorage parse error:', err);
          // 파싱 오류 시 sessionStorage 비우기 (선택적)
          // sessionStorage.removeItem('loginUser');
        }
      }
    }
  }, [storeUser, setLoginUser]); // 의존성 배열 업데이트

  return null; // UI 렌더링 없음
}
