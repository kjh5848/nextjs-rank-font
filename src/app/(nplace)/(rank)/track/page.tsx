"use client";
import { Suspense } from "react";
import LoadingFallback from "@/src/components/common/LoadingFallback";
import TrackContent from "@/src/components/nplrace/rank/track/TrackContent";
import { useAuthStore } from "@/src/store/provider/StoreProvider";
  import { redirect } from "next/navigation";
  import { useRouter } from "next/navigation";

export default function TrackPage() {
  const router = useRouter();
  const { loginUser, isAuthPending } = useAuthStore();
  const isLoading = loginUser === undefined || isAuthPending;
  const isGuest = loginUser === null;

  if (isLoading) {
    return <LoadingFallback message="로딩 중..." />;
  }

  if (isGuest) {
    router.push("/dashboard");
  }

  return (
    <main className="container">
      <Suspense fallback={<LoadingFallback message="로딩 중..." />}>
        <TrackContent />
      </Suspense>
    </main>
  );
}
