"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// 사용자 타입 정의
interface User {
  id: string;
  username: string;
  email?: string;
}

interface DashboardClientProps {
  user: User;
}

export default function DashboardClient({ user }: DashboardClientProps) {
  const router = useRouter();

  // 히스토리 조작은 클라이언트 컴포넌트에서만 가능
  useEffect(() => {
    const handlePopState = () => {
      router.replace('/');
    };

    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [router]);

  return (
    <div>
      {/* 인터랙티브 요소들 */}
      <button 
        onClick={() => alert('환영합니다!')}
        className="bg-rank-primary text-white px-4 py-2 rounded mt-4"
      >
        대시보드 액션
      </button>
    </div>
  );
} 