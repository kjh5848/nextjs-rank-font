// components/common/LoadingFallback.tsx
"use client";

interface LoadingFallbackProps {
  message?: string;
}

export default function LoadingFallback({ message = "로딩 중..." }: LoadingFallbackProps) {
  return (
    <div className="container mx-auto p-4 flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-rank-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-lg font-medium">{message}</p>
      </div>
    </div>
  );
}
