"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/provider/StoreProvider";
import JoinForm from "@/components/auth/JoinForm";
import Link from "next/link";

export default function JoinPage() {
  const { user, isAuthLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthLoading && user) {
      router.replace('/dashboard');
    }
  }, [isAuthLoading, user, router]);

  // 로딩 중이면 null 반환 (loading.tsx가 표시됨)
  if (isAuthLoading) return null;
  
  // 로그인된 사용자도 null 반환 (곧 리다이렉트됨)
  if (user) return null;

  return (
    <div className="container mx-auto px-4 h-full">
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-6/12 px-4">
          <JoinForm />

          <div className="flex flex-wrap mt-6 relative">
            <div className="w-1/2">
              <Link href="/login">
                <span className="text-blueGray-500 text-sm hover:underline">
                  이미 계정이 있으신가요?
                </span>
              </Link>
            </div>
            <div className="w-1/2 text-right">
              <Link href="/">
                <span className="text-blueGray-500 text-sm hover:underline">
                  Home
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}