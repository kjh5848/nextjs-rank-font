import { Suspense } from 'react';

export default function TrackPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-2xl font-bold mb-4">플레이스 순위 추적</h1>
      <Suspense fallback={<div>로딩중...</div>}>
        {/* <TrackDetail id={params.id} /> */}
      </Suspense>
    </div>
  );
}
