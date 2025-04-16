"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/provider/StoreProvider";
import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  const { user, isAuthLoading } = useAuthStore();
  const router = useRouter();

  // 이미 로그인된 사용자는 대시보드로 리다이렉트
  useEffect(() => {
    if (!isAuthLoading && user) {
      router.replace('/dashboard');
    }
  }, [isAuthLoading, user, router]);

  // 로딩 중이면 null 반환 (loading.tsx가 표시됨)
  if (isAuthLoading) return null;
  
  // 로그인된 사용자도 null 반환 (곧 리다이렉트됨)
  if (user) return null;

  // 로그인되지 않은 사용자에게 로그인 폼 표시
  return (
    <div className="container mx-auto px-4 h-full">
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-6/12 px-4">
          <LoginForm />
            
          <div className="flex flex-wrap mt-6 relative">
            <div className="w-1/2">
              <Link href="/auth/forgot-password">
                <span className="text-blueGray-500 text-sm hover:underline">
                  비밀번호를 잊으셨나요?
                </span>
              </Link>
            </div>
            <div className="w-1/2 text-right">
              <Link href="/join">
                <span className="text-blueGray-500 text-sm hover:underline">
                  회원가입 &rarr;
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
