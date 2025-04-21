"use client"
import SearchForm from "@/src/components/nplrace/rank/realtime/SearchForm";
import { useAuthStore } from "@/src/store/provider/StoreProvider";

// 인증 상태를 확인하기 위한 Promise 캐시

export default function SearchContent() {
  const { user } = useAuthStore();
  if (!user) return null; // 리디렉션 중일 때 화면 깜빡임 방지

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white shadow-lg">
        <h1 className="text-3xl font-bold">
          <strong className="bg-gradient-to-r from-rank-primary to-rank-secondary bg-clip-text p-6 font-bold text-transparent">
            네이버 플레이스
          </strong>
          실시간 순위 추적
        </h1>
      </div>

      {/* 검색 폼 통합 */}
      <SearchForm />

      {/* 추가 대시보드 내용
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-md">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">
            최근 활동
          </h2>
          <div className="space-y-3">
            <div className="flex items-center rounded-lg bg-gray-50 p-3">
              <div className="mr-3 h-2 w-2 rounded-full bg-blue-500"></div>
              <p className="text-sm text-gray-600">최근 검색: 홍길동 업체</p>
            </div>
            <div className="flex items-center rounded-lg bg-gray-50 p-3">
              <div className="mr-3 h-2 w-2 rounded-full bg-blue-500"></div>
              <p className="text-sm text-gray-600">최근 검색: SHOP_ID 12345</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-md">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">통계</h2>
          <div className="flex items-center justify-between">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">24</p>
              <p className="text-sm text-gray-500">오늘 검색</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-indigo-600">156</p>
              <p className="text-sm text-gray-500">이번 주 검색</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">1.2k</p>
              <p className="text-sm text-gray-500">총 검색</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-md">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">알림</h2>
          <div className="space-y-3">
            <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-3 text-blue-800">
              <p className="text-sm">시스템 업데이트가 완료되었습니다.</p>
            </div>
            <div className="rounded-lg border-l-4 border-green-500 bg-green-50 p-3 text-green-800">
              <p className="text-sm">새로운 기능이 추가되었습니다.</p>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
