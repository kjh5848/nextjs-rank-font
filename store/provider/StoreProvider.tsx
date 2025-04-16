"use client"; // Next.js에서 클라이언트 컴포넌트임을 명시

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthRepository from "@/model/AuthRepository"; // AuthRepository 임포트

// 사용자 정보를 위한 인터페이스 정의
interface User {
  id: string;
  username: string;
  email?: string;
}

// 인증 관련 상태와 메서드를 정의하는 인터페이스
interface AuthStore {
  user: User | null; // 현재 로그인한 사용자 정보
  isAuthLoading: boolean; // 인증 로딩 상태 추가
  setLoginUser: (user: User | null) => void; // 사용자 정보 설정 함수
  logout: () => Promise<void>; // 로그아웃 함수
}

// 검색 관련 상태를 정의하는 인터페이스
interface SearchStore {
  searchQuery: string; // 검색어
  setSearchQuery: (query: string) => void; // 검색어 설정 함수
}

// 전체 스토어 컨텍스트 타입 정의
interface StoreContextType {
  authStore: AuthStore;
  searchStore: SearchStore;
}

// StoreProvider의 Props 타입 정의
interface StoreProviderProps {
  children: React.ReactNode;
}

// 컨텍스트 생성 (초기값은 null)
const StoreContext = createContext<StoreContextType | null>(null);

// 스토어 프로바이더 컴포넌트 - TypeScript 타입 사용
export function StoreProvider({ children }: StoreProviderProps) {
  // 상태 관리
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true); // 로딩 상태 추가
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // 컴포넌트 마운트 시 세션 확인 (useEffect 부분 수정)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const checkSession = async () => {
      try {
        const response = await AuthRepository.checkAuth();
        
        if (response.ok) {
          // 응답을 한 번만 텍스트로 읽고 JSON으로 파싱
          const responseText = await response.text();
          try {
            const data = JSON.parse(responseText);
            console.log("세션 응답:", data);
            
            if (data.code === 0 && data.data && data.data.user) {
              setUser(data.data.user);
            }
          } catch (parseError) {
            console.error('JSON 파싱 오류:', parseError);
          }
        }
      } catch (error) {
        console.error('Session check error:', error);
      } finally {
        setIsAuthLoading(false); // 세션 확인 완료
      }
    };

    checkSession();
  }, []);

  // 인증 관련 기능 제공
  const authStore: AuthStore = {
    user,
    isAuthLoading,
    setLoginUser: (user) => setUser(user),
    logout: async () => {
      try {
        // AuthRepository를 사용하여 로그아웃
        await AuthRepository.logout();
        setUser(null);
        router.push('/login');
        router.refresh();
      } catch (error) {
        console.error('Logout error:', error);
      }
    },
  };

  // 검색 관련 기능 제공
  const searchStore: SearchStore = {
    searchQuery,
    setSearchQuery,
  };

  // 컨텍스트 제공
  return (
    <StoreContext.Provider value={{ authStore, searchStore }}>
      {children}
    </StoreContext.Provider>
  );
}

// 인증 스토어 사용을 위한 커스텀 훅
export function useAuthStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useAuthStore must be used within a StoreProvider");
  }
  return context.authStore;
}

// 검색 스토어 사용을 위한 커스텀 훅
export function useSearchStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useSearchStore must be used within a StoreProvider");
  }
  return context.searchStore;
}