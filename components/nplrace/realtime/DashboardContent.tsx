"use Client"
import ModernSearchForm from "@/components/nplrace/realtime/ModernSearchForm"

export default function DashboardContent({ user }) {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-xl shadow-lg mb-8">
        <h1 className="text-3xl font-bold">대시보드</h1>
        <p className="text-xl mt-2 opacity-90">환영합니다, {user.username}님!</p>
      </div>
      
      {/* 검색 폼 통합 */}
      <ModernSearchForm />
      
      {/* 추가 대시보드 내용 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">최근 활동</h2>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <p className="text-sm text-gray-600">최근 검색: 홍길동 업체</p>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <p className="text-sm text-gray-600">최근 검색: SHOP_ID 12345</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">통계</h2>
          <div className="flex justify-between items-center">
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
        
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">알림</h2>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 text-blue-800 rounded-lg border-l-4 border-blue-500">
              <p className="text-sm">시스템 업데이트가 완료되었습니다.</p>
            </div>
            <div className="p-3 bg-green-50 text-green-800 rounded-lg border-l-4 border-green-500">
              <p className="text-sm">새로운 기능이 추가되었습니다.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}