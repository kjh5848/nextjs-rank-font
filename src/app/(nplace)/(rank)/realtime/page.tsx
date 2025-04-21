"use client";
import { Suspense } from "react";
import RealtimeContent from "@/src/components/nplrace/rank/realtime/SearchContent";
import LoadingFallback from "@/src/components/common/LoadingFallback";

export default function RealtimePage() {
  return (
    <Suspense fallback={<LoadingFallback message="대시보드 로딩 중..." />}>
      <RealtimeContent />
    </Suspense>
  );
}