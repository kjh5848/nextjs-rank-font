'use client';

import { useAuthStore } from '@/src/store/provider/StoreProvider';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthRepository from '@/model/AuthRepository';

export default function useAuthLoginViewModelLocal() {
  const { setLoginUser } = useAuthStore();
  const router = useRouter();
  const [isPendingLogin, setIsPendingLogin] = useState(false);

  const login = async (reqDto: any, isChecked: boolean) => {
    setIsPendingLogin(true);
    try {
      const response = await AuthRepository.postLogin(reqDto);

      if (response.code !== "0") {
        if (response.data && response.data.code === -3) {
          alert(Object.values(response.data).join('\n'));
        } else {
          alert(response.message || '로그인 실패');
        }
        return { ok: false };
      }


      if (response.code !== "0") {
        alert(response.message || '로그인 실패');
        return { ok: false };
      }

      // 아이디 기억하기
      if (isChecked) {
        localStorage.setItem('rememberId', JSON.stringify(reqDto.user.username));
      } else {
        localStorage.removeItem('rememberId');
      }

      // 사용자 정보 설정 (세션 기반으로 서버에서 가져온 유저 정보 사용)
      setLoginUser(response.data.user);

      // 대시보드로 이동
      router.replace('/');
      return { ok: true, user: response.data.user };
    } catch (err: any) {
      console.error('Login error:', err);
      alert(err.message || '로그인 중 오류 발생');
      return { ok: false };
    } finally {
      setIsPendingLogin(false);
    }
  };

  return {
    login,
    isPendingLogin,
  };
}
function postLogin(reqDto: any) {
  throw new Error('Function not implemented.');
}

