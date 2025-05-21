"use client";

import { useState, useEffect } from "react";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 초기 체크
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // 컴포넌트 마운트 시 체크
    checkIfMobile();
    
    // 리사이즈 이벤트 리스너 등록
    window.addEventListener("resize", checkIfMobile);
    
    // 클린업
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  return isMobile;
}