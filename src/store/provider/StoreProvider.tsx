'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import AuthRepository from '@/src/model/AuthRepository';

// 사용자 정보 타입
export interface User {
  id: string;
  username: string;
  email?: string;
}

// 인증 관련 상태 및 메서드
export interface AuthStore {
  user: User | null;
  isAuthLoading: boolean;
  setLoginUser: (user: User | null) => void;
  logout: () => Promise<void>;
}

// 검색 관련 상태 및 메서드
export interface SearchStore {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

// 전체 스토어 컨텍스트 타입
interface StoreContextType {
  authStore: AuthStore;
  searchStore: SearchStore;
}

// StoreProvider Props
interface StoreProviderProps {
  children: ReactNode;
  initialUser?: User | null; // ✅ SSR에서 받은 초기 유저 정보
  initialSessionId?: string | null; // ✅ SSR에서 받은 초기 세션 ID
}
// 컨텍스트 생성
const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children, initialUser = null }: StoreProviderProps) {
  const [user, setUser] = useState<User | null>(initialUser);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // 마운트 시 세션 확인
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (initialUser) {
      setIsAuthLoading(false);
      return;
    }

    const checkSession = async () => {
      try {
        const response = await AuthRepository.checkAuth();
        const responseText = await response.text();
        
        if (!response.ok) {
          setUser(null);
          router.push("/login");
          return;
        }

        const json = JSON.parse(responseText);

        if (json.code === 0 && json.data?.user) {
          setUser(json.data.user);
        } else {
          setUser(null);
          router.push("/login");
        }
      } catch (err) {
        console.error("세션 확인 실패", err);
        setUser(null);
        router.push("/login");
      } finally {
        setIsAuthLoading(false);
      }
    };

    checkSession();
  }, [initialUser]);


  // 인증 스토어 객체
  const authStore: AuthStore = {
    user,
    isAuthLoading,
    setLoginUser: setUser,
    logout: async () => {
      try {
        await AuthRepository.logout();
        setUser(null);
        sessionStorage.removeItem("loginUser"); // 캐시도 제거
        router.push("/login");
        router.refresh();
      } catch (error) {
        console.error("Logout error:", error);
      }
    },
  };

  // 검색 스토어 객체
  const searchStore: SearchStore = {
    searchQuery,
    setSearchQuery,
  };

  return (
    <StoreContext.Provider value={{ authStore, searchStore }}>
      {children}
    </StoreContext.Provider>
  );
}

// custom hooks for accessing stores
export function useAuthStore(): AuthStore {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useAuthStore must be used within StoreProvider');
  }
  return context.authStore;
}

export function useSearchStore(): SearchStore {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useSearchStore must be used within StoreProvider');
  }
  return context.searchStore;
}