"use client";

import { Suspense, useEffect,  } from "react";
import LoadingFallback from "@/src/components/common/LoadingFallback";
import TrackContent from "@/src/components/nplrace/rank/track/TrackContent";
import { useAuthStore } from "@/src/store/provider/StoreProvider";
import { redirect } from "next/navigation";

export default function TrackPage() {
  const { loginUser, isAuthPending } = useAuthStore();

  if (loginUser === undefined || isAuthPending) {
    return <LoadingFallback message="로딩 중..." />;
  }

  if (loginUser === null) {
    redirect("/login");
  }
  return (
    <main className="container">
      <Suspense fallback={<LoadingFallback message="로딩 중..." />}>
        <TrackContent  />
      </Suspense>
    </main>
  );
}
