'use client';

import React, { createContext, useContext, useMemo } from 'react';
import useAuthStoreLocal from "@/src/store/useAuthStoreLocal";
import useSearchStoreLocal from "@/src/store/useSearchStoreLocal";

// StoreContext 생성
const StoreContext = createContext<any>(undefined);

// StoreProvider Props
interface StoreProviderProps {
  children: React.ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps) {
  // useMemo로 스토어 객체 메모이제이션
  const authStore = useAuthStoreLocal();
  const searchStore = useSearchStoreLocal();
  
  const value = useMemo(() => ({
    authStore,
    searchStore
  }), [authStore, searchStore]);

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
}

// 전역 인증 스토어 사용 훅
export function useAuthStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useAuthStore must be used within StoreProvider');
  }
  return context.authStore;
}

// 전역 검색 스토어 사용 훅
export function useSearchStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useSearchStore must be used within StoreProvider');
  }
  return context.searchStore;
}