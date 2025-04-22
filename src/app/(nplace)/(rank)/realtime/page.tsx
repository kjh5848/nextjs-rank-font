import { Suspense } from "react";
import RealtimeContent from "@/src/components/nplrace/rank/realtime/RealtimeContent";
import LoadingFallback from "@/src/components/common/LoadingFallback";

export default function RealtimePage() {
  return (
    <main className="container mx-auto">
      <div className="mb-8 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white shadow-lg">
        <h1 className="text-3xl font-bold leading-tight">
          <span className="bg-clip-text text-white">N-PLACE</span>
          <br className="block md:hidden" />
          <span className="md:ml-2">실시간 순위조회</span>
        </h1>
      </div>
      <Suspense fallback={<LoadingFallback message="로딩 중..." />}>
        <RealtimeContent />
      </Suspense>
    </main>
  );
}