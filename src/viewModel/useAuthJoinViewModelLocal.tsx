"use client"; // Next.js에서 클라이언트 컴포넌트임을 명시

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthRepository from "@/src/model/AuthRepository"; // AuthRepository 임포트

// 회원가입 관련 로직을 관리하는 커스텀 훅
export default function useAuthJoinViewModelLocal() {
  const router = useRouter();
  const [isPendingJoin, setIsPendingJoin] = useState(false);

  // 회원가입 처리 함수
  const join = async (reqDto: any) => {
    try {
      setIsPendingJoin(true); // 회원가입 진행 중 상태로 변경

      // AuthRepository를 사용하여 회원가입 API 호출 (localhost:8081/v1/auth/join)
      const response = await AuthRepository.postJoin(reqDto);

      if (response.code !== "0") {
        
        // 에러 코드에 따른 처리
        if (response.data.code === -3) {
          alert(Object.keys(response.data).map((key) => response.data[key]).join("\n"));
          return;
        } else {
          throw new Error(response.message || '회원가입 실패');
        }
      }

      if (response.code === "0") {
        alert(response.message || '회원가입이 완료되었습니다.'); // 성공 메시지 표시
        
        // 로그인 페이지로 리다이렉트
        router.push('/');
        router.refresh();
      } else {
        throw new Error(response.message || '회원가입 실패');
      }
    } catch (error: any) {
      console.error('Join error:', error);
      alert(error.message || '회원가입 중 오류가 발생했습니다.');
    } finally {
      setIsPendingJoin(false); // 회원가입 진행 중 상태 해제
    }
  };

  // 외부에서 사용할 수 있는 기능 제공
  return {
    join,
    isPendingJoin
  };
} 