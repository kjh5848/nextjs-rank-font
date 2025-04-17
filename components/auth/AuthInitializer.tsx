'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/provider/StoreProvider';

interface Props {
  user: any | null; // 서버에서 전달받는 초기 사용자 정보
}

export default function AuthInitializer({ user: serverUser }: Props) { // Prop 이름을 serverUser로 변경하여 스토어의 user와 구분
  // Zustand 스토어에서 상태와 액션을 가져옵니다.
  const { user: storeUser, setLoginUser } = useAuthStore(); // 스토어의 user 상태를 storeUser로 받음

  useEffect(() => {
    // 1. 서버에서 user 정보를 전달받은 경우 (초기 로드 또는 서버 액션 후)
    if (serverUser) {
      // 스토어 상태 업데이트
      setLoginUser(serverUser);
      // sessionStorage에도 저장 (새로고침 대비)
      try {
        sessionStorage.setItem('loginUser', JSON.stringify(serverUser)); // key는 'loginUser' 유지 또는 'user'로 변경 고려
      } catch (err) {
        console.error('sessionStorage setItem error:', err);
      }
    }
    // 2. 서버에서 user 정보가 없고, 현재 스토어에도 user 정보가 없는 경우 (새로고침 또는 뒤로가기 등)
    else if (!storeUser) { // 스토어의 user 상태(storeUser)를 확인
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
    // 3. 서버 정보 없고 스토어에 정보가 있는 경우: 현재 상태 유지 (별도 처리 불필요)

    // 4. 로그아웃된 상태 처리: 서버에서 user가 없고 sessionStorage에도 없다면
    //    StoreProvider의 checkSession 또는 useAuthStoreLocal의 checkAuth가 null로 설정하거나,
    //    여기서 명시적으로 null 처리할 수도 있습니다. (현재는 다른 곳에 위임)

  }, [serverUser, storeUser, setLoginUser]); // 의존성 배열 업데이트

  return null; // UI 렌더링 없음
}
