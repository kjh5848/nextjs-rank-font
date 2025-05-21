"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import usePendingFunction from "@/src/use/usePendingFunction";
import AuthRepository from "@/src/model/AuthRepository";

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
  
  // API 호출 중복 방지를 위한 플래그
  const isCheckingAuth = useRef(false);

  // 세션 체크 함수
  const checkAuthCallback = useCallback(async () => {
    // 이미 확인 중이면 중복 호출 방지
    if (isCheckingAuth.current) return;
    
    isCheckingAuth.current = true;
    try {
      const response = await AuthRepository.checkAuth();
      
      if (response.code === "0") {
        if (response.data?.user) {
          setLoginUser(response.data.user);
        } else {
          setLoginUser(null);
        }
      } else {
        setLoginUser(null);
      }
    } catch (error) {
      console.error("Auth check failed", error);
      setLoginUser(null);
    } finally {
      isCheckingAuth.current = false;
    }
  }, []);

  const [checkAuthTrigger, isAuthPending] = usePendingFunction(checkAuthCallback);

  // 로그아웃 함수
  const logoutCallback = useCallback(async () => {
    try {
      await AuthRepository.logout();
      setLoginUser(null);
    } catch (error) {
      console.error("Logout failed", error);
    }
  }, []);

  const [logoutTrigger, isLogoutPending] = usePendingFunction(logoutCallback);

  // 컴포넌트 마운트 시 한 번만 인증 상태 확인
  useEffect(() => {
    // undefined일 때만 체크하여 무한 루프 방지
    if (loginUser === undefined && !isCheckingAuth.current) {
      checkAuthTrigger();
    }
  }, []); // 빈 의존성 배열로 마운트 시 한 번만 실행

  // 세션 사용자 정보를 직접 설정하는 함수
  const setSessionUser = useCallback((user: LoginUser | null) => {
    setLoginUser(user);
  }, []);

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
