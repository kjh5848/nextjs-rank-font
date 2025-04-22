import { Suspense } from "react";
import LoadingFallback from "@/src/components/common/LoadingFallback";
import TrackContent from "@/src/components/nplrace/rank/track/TrackContent";

export default function TrackPage() {
  return (
    <main className="container mx-auto">
      <div className="mb-8 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white shadow-lg">
        <h1 className="text-3xl font-bold leading-tight">
          <span className="bg-clip-text text-white">N-PLACE</span>
          <br className="block md:hidden" />
          <span className="md:ml-2">순위추적</span>
        </h1>
      </div>
      <Suspense fallback={<LoadingFallback message="로딩 중..." />}>
        <TrackContent />
      </Suspense>
    </main>
  );
}
