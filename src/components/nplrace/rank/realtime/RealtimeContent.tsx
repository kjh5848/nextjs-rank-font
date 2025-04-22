"use client"
import RealtimeForm from "@/src/components/nplrace/rank/realtime/RealtimeForm";
import { useAuthStore } from "@/src/store/provider/StoreProvider";
import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import ReviewChart from "./RealtimeReviewChart";
import SearchRankChart from "./RealtimeRankChart";

// Chart.js 컴포넌트 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function RealtimeContent() {
  const { user } = useAuthStore();
  const [rankData, setRankData] = useState({
    labels: [],
    datasets: [],
  });

  const [reviewData, setReviewData] = useState({
    labels: [],
    datasets: [],
  });

  // 데모 데이터 생성 (실제로는 API에서 가져오게 됨)
  useEffect(() => {
    // 순위 변화 데이터
    const dates = ["1/1", "1/2", "1/3", "1/4", "1/5", "1/6", "1/7"];
    const rankValues = [5, 4, 6, 3, 2, 3, 2]; // 낮을수록 좋은 순위

    setRankData({
      labels: dates,
      datasets: [
        {
          label: "순위 변화",
          data: rankValues,
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          tension: 0.3,
        },
      ],
    });

    // 리뷰 및 저장 데이터
    const reviewValues = [10, 12, 15, 18, 20, 23, 25];
    const saveValues = [5, 8, 10, 12, 15, 18, 20];

    setReviewData({
      labels: dates,
      datasets: [
        {
          label: "방문자 리뷰",
          data: reviewValues,
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
        {
          label: "저장수",
          data: saveValues,
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    });
  }, []);

  if (!user) return null;

  return (
    <div>
      
      {/* 검색 폼 통합 */}
      <RealtimeForm />

      {/* 대시보드 내용 */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
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
      </div>

      {/* 차트 대시보드 */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-md">
          <SearchRankChart data={rankData} />
        </div>
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-md">
          <ReviewChart data={reviewData} />
        </div>
      </div>
    </div>
  );
}
