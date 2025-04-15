'use client';

import { createContext, useContext, ReactNode } from "react";
import useAuthStoreLocal from "../useAuthStoreLocal";
import useSearchStoreLocal from "../useSearchStoreLocal";

// 인터페이스 정의
interface LoginUser {
  username: string;
  simpleDescription: string;
  profileImage: string;
  roleList: string[];
}

interface AuthStore {
  loginUser: LoginUser | null | undefined;
  setLoginUser: (user: LoginUser | null) => void;
}

interface SearchStore {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

interface StoreContextType {
  authStore: AuthStore;
  searchStore: SearchStore;
}

// 컨텍스트 생성
const StoreContext = createContext<StoreContextType | null>(null);

// Props 인터페이스
interface StoreProviderProps {
  children: ReactNode;
}

// 프로바이더 컴포넌트
export function StoreProvider({ children }: StoreProviderProps) {
  return (
    <StoreContext.Provider
      value={{
        authStore: useAuthStoreLocal(),
        searchStore: useSearchStoreLocal()
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

// 전역 스토어 훅
export function useAuthStoreGlobal(): AuthStore {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useAuthStoreGlobal must be used within a StoreProvider");
  }
  return context.authStore;
}

export function useSearchStoreGlobal(): SearchStore {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useSearchStoreGlobal must be used within a StoreProvider");
  }
  return context.searchStore;
}