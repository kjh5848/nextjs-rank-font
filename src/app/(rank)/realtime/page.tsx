"use client";
import { Suspense } from "react";
import DashboardContent from "@/src/components/nplrace/realtime/DashboardContent";
import LoadingFallback from "@/src/components/common/LoadingFallback";

export default function Dashboard() {
  return (
    <Suspense fallback={<LoadingFallback message="대시보드 로딩 중..."/>}>
      <DashboardContent/>
    </Suspense>
    
  );
}