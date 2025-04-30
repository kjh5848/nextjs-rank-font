import { Suspense } from "react";
import LoadingFallback from "@/src/components/common/LoadingFallback";
import TrackContent from "@/src/components/nplrace/rank/track/TrackContent";
import TrackHeader from "@/src/components/nplrace/rank/track/TrackHeader";
import { useNplaceRankTrackWithIdViewModel } from "@/src/viewModel/nplace/NplaceRankTrackWithIdViewModel";

export default function TrackPage() {
 

  return (
    <main className="container">
      <Suspense fallback={<LoadingFallback message="로딩 중..." />}>
        <TrackContent  />
      </Suspense>
    </main>
  );
}
