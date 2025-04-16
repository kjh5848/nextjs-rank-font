"use client";
import { useAuthStore } from "@/store/provider/StoreProvider";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import DashboardContent from "@/components/nplrace/realtime/DashboardContent";

export default function Dashboard() {
  const { user, isAuthLoading } = useAuthStore();
  const router = useRouter();

  // 인증 상태 확인 후 리다이렉트
  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.replace('/');
    }
  }, [isAuthLoading, user, router]);

  // 뒤로가기 관리
  useEffect(() => {
    if (typeof window !== 'undefined' && user) {
      const handlePopState = () => {
        router.replace('/');
      };

      window.addEventListener('popstate', handlePopState);
      
      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, [router, user]);

  // 로딩 중이거나 인증되지 않은 경우 null 반환
  // loading.tsx가 자동으로 표시됨
  if (isAuthLoading || !user) return null;

  // 인증된 사용자에게 대시보드 내용 표시
  return (
    <Suspense fallback={<div className="container mx-auto p-4">로딩 중...</div>}>
      <DashboardContent user={user} />
    </Suspense>
  );
}