"use client"; // Next.js에서 클라이언트 컴포넌트임을 명시

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/provider/StoreProvider";
import AuthRepository from "@/model/AuthRepository"; // AuthRepository 임포트

// 로그인 관련 로직을 관리하는 커스텀 훅
export default function useAuthLoginViewModelLocal() {
  // 로그인 진행 중 상태 관리
  const [isPendingLogin, setIsPendingLogin] = useState(false);
  const router = useRouter();
  const { setLoginUser } = useAuthStore();

  // 로그인 처리 함수
  const login = async (reqDto: any, rememberMe: boolean) => {
    try {
      setIsPendingLogin(true); // 로그인 진행 중 상태로 변경

      // AuthRepository를 사용하여 로그인 API 호출 (localhost:8081/v1/auth/login)
      const response = await AuthRepository.postLogin(reqDto);

      if (!response.ok) {
        const error = await response.json();
        
        // 에러 코드에 따른 처리
        if (error.code === -3) {
          alert(Object.keys(error.data).map((key) => error.data[key]).join("\n"));
          return;
        } else {
          throw new Error(error.message || '로그인 실패');
        }
      }

      const data = await response.json();

      // 아이디 기억하기 기능 처리
      if (rememberMe) {
        localStorage.setItem("rememberId", JSON.stringify(reqDto.user.username));
      } else {
        localStorage.removeItem("rememberId");
      }

      // 로그인 성공 시 처리
      if (data.code === 0) {
        // 사용자 정보 설정
        setLoginUser(data.data.user);
        
        // replace 사용하여 히스토리 스택에서 로그인 페이지 대체
        // 이렇게 하면 대시보드에서 뒤로가기 시 로그인 페이지로 돌아가지 않음
        router.replace('/dashboard');
      } else {
        throw new Error(data.message || '로그인 실패');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert(error.message || '로그인 중 오류가 발생했습니다.');
    } finally {
      setIsPendingLogin(false); // 로그인 진행 중 상태 해제
    }
  };

  // 저장된 아이디 가져오기
  const getRememberedId = () => {
    try {
      return JSON.parse(localStorage.getItem("rememberId") || "null");
    } catch {
      return null;
    }
  };

  // 외부에서 사용할 수 있는 기능 제공
  return {
    login,
    isPendingLogin,
    getRememberedId
  };
} 