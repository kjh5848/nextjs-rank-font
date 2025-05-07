"use client";

import { useEffect, useState } from "react";
import usePendingFunction from "@/src/use/usePendingFunction";
import AuthRepository from "@/model/AuthRepository";

interface LoginUser {
  username: string;
  simpleDescription: string;
  profileImage: string;
  roleList: string[];
}

function useAuthStoreLocal() {
  const [loginUser, setLoginUser] = useState<LoginUser | null | undefined>(
    undefined
  );

  // 세션 체크 함수
  const [checkAuthTrigger, isAuthPending] = usePendingFunction(async () => {
    try {
      const response = await AuthRepository.checkAuth();
      
      if (response.ok) {
        const data = await response.json();
        if (data.user) {
          setLoginUser(data.user);
        } else {
          setLoginUser(null);
        }
      } else {
        setLoginUser(null);
      }
    } catch (error) {
      console.error("Auth check failed", error);
      setLoginUser(null);
    }
  });

  // 로그아웃 함수
  const [logoutTrigger, isLogoutPending] = usePendingFunction(async () => {
    try {
      await AuthRepository.logout();
      setLoginUser(null);
    } catch (error) {
      console.error("Logout failed", error);
    }
  });

  // 컴포넌트 마운트 시 인증 상태 확인
  useEffect(() => {
    if (loginUser === undefined) {
      checkAuthTrigger();
    }
  }, [loginUser, checkAuthTrigger]);

  // 세션 사용자 정보를 직접 설정하는 함수
  const setSessionUser = (user: LoginUser | null) => {
    setLoginUser(user);
  };

  return {
    loginUser,
    setLoginUser: setSessionUser,
    isAuthPending,
    isLogoutPending,
    checkAuth: checkAuthTrigger,
    logout: logoutTrigger,
  };
}

export default useAuthStoreLocal;
