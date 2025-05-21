"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrackData } from "@/src/model/TrackRepository";
import TrackGridView from "./TrackGridView";
import html2canvas from "html2canvas";
import { Download } from "lucide-react";

interface ChartTooltipContentProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  labelFormatter?: (value: any) => string;
  indicator?: "dot" | "line";
}

// 툴크 컴포넌트
function ChartTooltipContent({
  active,
  payload,
  label,
  labelFormatter,
  indicator = "dot",
}: ChartTooltipContentProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-background rounded-lg border p-2 shadow-sm">
      <div className="grid grid-cols-[auto_1fr] gap-2">
        <div className="text-muted-foreground font-medium">
          {labelFormatter ? labelFormatter(label) : label}
        </div>
        <div className="bg-muted col-span-2 my-1 h-px" />
        {payload.map((item: any, index: number) => (
          <React.Fragment key={index}>
            <div
              className="flex items-center gap-1"
              style={{
                color: item.color,
              }}
            >
              {indicator === "dot" && (
                <div
                  className="h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              )}
              {indicator === "line" && (
                <div
                  className="h-0.5 w-3"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              )}
              <span className="font-medium">{item.name}</span>
            </div>
            <div className="text-right font-medium">{item.value}</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

interface TrackDataChartProps {
  trackList: TrackData[];
  shopName: string;
  keyword: string;
}

interface AnalysisData {
  rankChange: number;
  visitorReviewGrowth: number;
  blogReviewGrowth: number;
  saveCountGrowth: number;
  averageRank: number;
  bestRank: number;
  worstRank: number;
  totalReviews: number;
  reviewTrend: "증가" | "감소" | "유지";
  rankTrend: "상승" | "하락" | "유지";
}

interface DownloadOptions {
  summary: boolean;
  grid: boolean;
  rankChart: boolean;
  visitorReviewChart: boolean;
  blogReviewChart: boolean;
  saveCountChart: boolean;
  hideGridControls: boolean; // 추가: 그리드 컨트롤 숨김 옵션
}

export default function TrackReportView({
  trackList,
  shopName,
  keyword,
}: TrackDataChartProps) {
  const [timeRange, setTimeRange] = React.useState<"7d" | "30d" | "all">("all");
  const [downloadOptions, setDownloadOptions] = React.useState<DownloadOptions>(
    {
      summary: true,
      grid: true,
      rankChart: true,
      visitorReviewChart: true,
      blogReviewChart: true,
      saveCountChart: true,
      hideGridControls: true, // 기본값으로 그리드 컨트롤 숨김
    },
  );
  const [isDownloadModalOpen, setIsDownloadModalOpen] = React.useState(false);
  const [isDownloading, setIsDownloading] = React.useState(false);
  const reportRef = React.useRef<HTMLDivElement>(null);

  // 차트 데이터 필터링: 최신 30일, 7일 또는 모든 데이터
  const getFilteredData = () => {
    if (!trackList || trackList.length === 0) return [];

    // 날짜 기준 정렬 (최신 날짜부터)
    const sortedData = [...trackList].sort(
      (a, b) =>
        new Date(b.chartDate).getTime() - new Date(a.chartDate).getTime(),
    );

    // 기간에 따라 필터링
    if (timeRange === "30d") {
      return sortedData.slice(0, 30);
    } else if (timeRange === "7d") {
      return sortedData.slice(0, 7);
    }

    return sortedData;
  };

  const filteredData = getFilteredData();

  // 순위 차트용 역전된 값 (낮은 순위가 더 높게 표시되도록)
  const chartData = filteredData.map((item, index, array) => {
    // 안전하게 숫자 변환
    const safeNumber = (val: any) => {
      if (typeof val === "number") return val;
      if (!val) return 0;
      const n = Number(val.toString().replace(/[^0-9]/g, ""));
      return isNaN(n) ? 0 : n;
    };

    return {
      ...item,
      date: (() => {
        const d = new Date(item.chartDate);
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${month}.${day}`; // ✅ 04.13 형태
      })(),
      invertedRank:
        typeof item.rank === "number"
          ? 100 - item.rank > 0
            ? 100 - item.rank
            : 5
          : 0,
      rank: safeNumber(item.rank),
      visitorReviewCount: safeNumber(item.visitorReviewCount),
      blogReviewCount: safeNumber(item.blogReviewCount),
      saveCount: safeNumber(item.saveCount),
      rankChange:
        index > 0 && array[index - 1].rank && item.rank
          ? array[index - 1].rank - item.rank
          : 0,
    };
  });

  // 파일명 생성 함수
  const getFileName = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${shopName}_${keyword}_${year}${month}${day}`;
  };

  const handleDownloadImage = async () => {
    if (!reportRef.current) return;

    setIsDownloading(true); // 다운로드 상태를 true로 설정

    try {
      // 잠시 대기하여 React가 hideGridControls 속성을 TrackGridView에 전달할 시간을 줌
      await new Promise((resolve) => setTimeout(resolve, 100));

      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        onclone: (clonedDoc) => {
          // 다운로드 및 기간 선택 버튼 제거
          const buttons = clonedDoc.querySelectorAll(
            ".flex.justify-end.space-x-2",
          );
          buttons.forEach((button) => {
            (button as HTMLElement).style.display = "none";
          });

          // 그리드 컨트롤 요소 숨기기
          const gridControls = clonedDoc.querySelectorAll(
            ".grid-controls, .filter-section",
          );
          gridControls.forEach((control) => {
            (control as HTMLElement).style.display = "none";
          });

          // 선택되지 않은 섹션 숨기기
          if (!downloadOptions.summary) {
            const summarySection = clonedDoc.querySelector(".summary-section");
            if (summarySection)
              (summarySection as HTMLElement).style.display = "none";
          }
          if (!downloadOptions.grid) {
            const gridSection = clonedDoc.querySelector(".grid-section");
            if (gridSection)
              (gridSection as HTMLElement).style.display = "none";
          }
          if (!downloadOptions.rankChart) {
            const rankChart = clonedDoc.querySelector(".rank-chart");
            if (rankChart) (rankChart as HTMLElement).style.display = "none";
          }
          if (!downloadOptions.visitorReviewChart) {
            const visitorChart = clonedDoc.querySelector(
              ".visitor-review-chart",
            );
            if (visitorChart)
              (visitorChart as HTMLElement).style.display = "none";
          }
          if (!downloadOptions.blogReviewChart) {
            const blogChart = clonedDoc.querySelector(".blog-review-chart");
            if (blogChart) (blogChart as HTMLElement).style.display = "none";
          }
          if (!downloadOptions.saveCountChart) {
            const saveChart = clonedDoc.querySelector(".save-count-chart");
            if (saveChart) (saveChart as HTMLElement).style.display = "none";
          }

          // TrackGridView 내부의 필터 및 열 선택기 숨기기
          const columnSelector = clonedDoc.querySelector("#gridColumns");
          const columnSelectorParent = columnSelector?.closest(
            ".flex.items-center.space-x-2",
          );
          if (columnSelectorParent)
            (columnSelectorParent as HTMLElement).style.display = "none";

          const datePickerComponents = clonedDoc.querySelectorAll(
            ".flex.flex-col.space-y-3, .flex.flex-col.space-y-4.sm\\:flex-row.sm\\:items-start.sm\\:justify-between.sm\\:space-y-0",
          );
          datePickerComponents.forEach((comp) => {
            (comp as HTMLElement).style.display = "none";
          });

          // 색상 변환을 위한 스타일 추가
         // 색상 변환 스타일 추가 부분 수정
const style = clonedDoc.createElement("style");
style.textContent = `
  * {
    background-color: rgb(255, 255, 255) !important;
    border-color: rgb(0, 0, 0) !important;
    color: rgb(0, 0, 0) !important; /* 전역 초기화 유지 */
  }
  
  /* Tailwind 색상 클래스 재정의 */
  .text-green-500 { color: rgb(34, 197, 94) !important; }
  .text-red-500 { color: rgb(239, 68, 68) !important; }
  
  /* 화살표 색상도 추가 */
  .text-green-500 svg { color: rgb(34, 197, 94) !important; }
  .text-red-500 svg { color: rgb(239, 68, 68) !important; }
  
  /* oklch 색상 대체 (이미 있던 부분) */
  .text-\\[\\#22c55e\\] { color: rgb(34, 197, 94) !important; }
  .text-\\[\\#ef4444\\] { color: rgb(239, 68, 68) !important; }
  
  /* 기타 필요한 클래스 재정의 */
  .bg-blue-50 { background-color: rgb(239, 246, 255) !important; }
  .text-blue-700 { color: rgb(29, 78, 216) !important; }
  .bg-gray-50 { background-color: rgb(249, 250, 251) !important; }
  .text-gray-700 { color: rgb(55, 65, 81) !important; }
  .border-gray-200 { border-color: rgb(229, 231, 235) !important; }
`;
          clonedDoc.head.appendChild(style);
        },
      });

      const link = document.createElement("a");
      link.download = `${getFileName()}.jpg`;
      link.href = canvas.toDataURL("image/jpeg", 1.0);
      link.click();
    } catch (error) {
      console.error("이미지 생성 중 오류 발생:", error);
    } finally {
      setIsDownloading(false); // 다운로드 상태를 false로 복원
      setIsDownloadModalOpen(false);
    }
  };

  // 데이터 분석 함수
  const analyzeData = (data: TrackData[]): AnalysisData => {
    if (data.length < 2) {
      return {
        rankChange: 0,
        visitorReviewGrowth: 0,
        blogReviewGrowth: 0,
        saveCountGrowth: 0,
        averageRank: 0,
        bestRank: 0,
        worstRank: 0,
        totalReviews: 0,
        reviewTrend: "유지",
        rankTrend: "유지",
      };
    }

    const first = data[0];
    const last = data[data.length - 1];
    const ranks = data.map((d) => d.rank || 0).filter((r) => r > 0);

    const rankChange = (last.rank || 0) - (first.rank || 0);

    // 성장률 계산 함수
    const calculateGrowth = (
      current: number | null | undefined,
      previous: number | null | undefined,
    ): number => {
      const curr = Number(current) || 0;
      const prev = Number(previous) || 0;
      if (prev === 0) return curr > 0 ? 100 : 0;
      return ((curr - prev) / prev) * 100;
    };

    const visitorReviewGrowth = calculateGrowth(
      first.visitorReviewCount,
      last.visitorReviewCount,
    );
    const blogReviewGrowth = calculateGrowth(
      first.blogReviewCount,
      last.blogReviewCount,
    );
    const saveCountGrowth = calculateGrowth(
      first.saveCount,
      last.saveCount,
    );

    const averageRank =
      ranks.length > 0 ? ranks.reduce((a, b) => a + b, 0) / ranks.length : 0;
    const bestRank = ranks.length > 0 ? Math.min(...ranks) : 0;
    const worstRank = ranks.length > 0 ? Math.max(...ranks) : 0;

    const totalReviews =
      (last.visitorReviewCount || 0) + (last.blogReviewCount || 0);
    const reviewGrowth = visitorReviewGrowth + blogReviewGrowth;
    const reviewTrend =
      reviewGrowth > 5 ? "증가" : reviewGrowth < -5 ? "감소" : "유지";
    const rankTrend =
      rankChange < -2 ? "상승" : rankChange > 2 ? "하락" : "유지";

    return {
      rankChange,
      visitorReviewGrowth,
      blogReviewGrowth,
      saveCountGrowth,
      averageRank,
      bestRank,
      worstRank,
      totalReviews,
      reviewTrend,
      rankTrend,
    };
  };

  const analysis = analyzeData(filteredData);

  return (
    <div className="space-y-6">
      {/* 다운로드 버튼 */}
      <div className="download-buttons flex justify-end space-x-2">
        <div className="relative">
          <button
            onClick={() => setIsDownloadModalOpen(!isDownloadModalOpen)}
            className="flex items-center rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100"
          >
            <Download className="mr-2 h-4 w-4" />
            다운로드 옵션
          </button>

          {isDownloadModalOpen && (
            <div className="absolute right-0 mt-2 w-full max-w-[425px] min-w-[280px] rounded-lg bg-white p-4 shadow-lg sm:p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold sm:text-lg">
                  다운로드 옵션 선택
                </h3>
                <button
                  onClick={() => setIsDownloadModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div className="mt-4 space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="summary"
                    checked={downloadOptions.summary}
                    onChange={(e) =>
                      setDownloadOptions({
                        ...downloadOptions,
                        summary: e.target.checked,
                      })
                    }
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="summary" className="text-sm sm:text-base">
                    요약 정보
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="grid"
                    checked={downloadOptions.grid}
                    onChange={(e) =>
                      setDownloadOptions({
                        ...downloadOptions,
                        grid: e.target.checked,
                      })
                    }
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="grid" className="text-sm sm:text-base">
                    상세 데이터 그리드
                  </label>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="rankChart"
                    checked={downloadOptions.rankChart}
                    onChange={(e) =>
                      setDownloadOptions({
                        ...downloadOptions,
                        rankChart: e.target.checked,
                      })
                    }
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="rankChart" className="text-sm sm:text-base">
                    순위 추이 차트
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="visitorReviewChart"
                    checked={downloadOptions.visitorReviewChart}
                    onChange={(e) =>
                      setDownloadOptions({
                        ...downloadOptions,
                        visitorReviewChart: e.target.checked,
                      })
                    }
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="visitorReviewChart"
                    className="text-sm sm:text-base"
                  >
                    방문자 리뷰 추이 차트
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="blogReviewChart"
                    checked={downloadOptions.blogReviewChart}
                    onChange={(e) =>
                      setDownloadOptions({
                        ...downloadOptions,
                        blogReviewChart: e.target.checked,
                      })
                    }
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="blogReviewChart"
                    className="text-sm sm:text-base"
                  >
                    블로그 리뷰 추이 차트
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="saveCountChart"
                    checked={downloadOptions.saveCountChart}
                    onChange={(e) =>
                      setDownloadOptions({
                        ...downloadOptions,
                        saveCountChart: e.target.checked,
                      })
                    }
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="saveCountChart"
                    className="text-sm sm:text-base"
                  >
                    저장 수 추이 차트
                  </label>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-2">
                <button
                  onClick={handleDownloadImage}
                  disabled={isDownloading}
                  className="flex items-center rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100 disabled:opacity-50 sm:text-base"
                >
                  <Download className="mr-2 h-4 w-4" />
                  {isDownloading ? "다운로드 중..." : "이미지 다운로드"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 기간 선택 버튼 */}
      <div className="timerange-buttons flex justify-end space-x-2">
        <button
          onClick={() => setTimeRange("7d")}
          className={`rounded-lg px-4 py-2 text-sm font-medium ${
            timeRange === "7d"
              ? "bg-blue-50 text-blue-700"
              : "bg-gray-50 text-gray-700 hover:bg-gray-100"
          }`}
        >
          7일
        </button>
        <button
          onClick={() => setTimeRange("30d")}
          className={`rounded-lg px-4 py-2 text-sm font-medium ${
            timeRange === "30d"
              ? "bg-blue-50 text-blue-700"
              : "bg-gray-50 text-gray-700 hover:bg-gray-100"
          }`}
        >
          30일
        </button>
        <button
          onClick={() => setTimeRange("all")}
          className={`rounded-lg px-4 py-2 text-sm font-medium ${
            timeRange === "all"
              ? "bg-blue-50 text-blue-700"
              : "bg-gray-50 text-gray-700 hover:bg-gray-100"
          }`}
        >
          전체
        </button>
      </div>

      {/* 리포트 내용 */}
      <div ref={reportRef} className="space-y-8 bg-white">
        {/* 상점 정보 */}
        <div className="summary-section mb-6 border-b border-gray-200 pb-6">
          <h2 className="text-xl font-bold text-gray-900">{shopName}</h2>
          <p className="mt-1 text-sm text-gray-600">키워드: {keyword}</p>
          <p className="mt-1 text-sm text-gray-600">
            생성일: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* 마케팅 인사이트 */}
        <div className="summary-section grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              주요 지표 요약
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">평균 순위</span>
                <span className="font-medium text-gray-900">
                  {analysis.averageRank.toFixed(1)}위
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">최고 순위</span>
                <span className="font-medium text-gray-900">
                  {analysis.bestRank}위
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">최저 순위</span>
                <span className="font-medium text-gray-900">
                  {analysis.worstRank}위
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              성장률 분석
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">순위 변동</span>
                <span
                  className={`font-medium ${
                    analysis.rankChange < 0
                      ? "text-[#22c55e]"
                      : analysis.rankChange > 0
                        ? "text-[#ef4444]"
                        : "text-gray-500"
                  }`}
                >
                  {analysis.rankChange > 0 ? "+" : ""}
                  {analysis.rankChange}위
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">방문자 리뷰 성장률</span>
                <span
                  className={`font-medium ${
                    analysis.visitorReviewGrowth > 0
                      ? "text-[#22c55e]"
                      : "text-[#ef4444]"
                  }`}
                >
                  {analysis.visitorReviewGrowth.toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">블로그 리뷰 성장률</span>
                <span
                  className={`font-medium ${
                    analysis.blogReviewGrowth > 0
                      ? "text-[#22c55e]"
                      : "text-[#ef4444]"
                  }`}
                >
                  {analysis.blogReviewGrowth.toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">저장 수 성장률</span>
                <span
                  className={`font-medium ${
                    analysis.saveCountGrowth > 0
                      ? "text-[#22c55e]"
                      : "text-[#ef4444]"
                  }`}
                >
                  {analysis.saveCountGrowth.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 그리드 뷰 섹션 - hideGridControls 옵션을 TrackGridView에 전달 */}
        <div className="grid-section mt-8">
          <h2 className="mb-4 text-lg font-semibold">상세 데이터</h2>
          <TrackGridView
            trackList={filteredData}
            hideControls={isDownloading && downloadOptions.hideGridControls} // 다운로드 중일 때 그리드 컨트롤 숨김
          />
        </div>
        {/* 차트 섹션 */}
        <div className="grid grid-cols-1 gap-6">
          {/* 순위 차트 */}
          <div className="rank-chart">
            <h2 className="mb-4 text-lg font-semibold">순위 추이</h2>
            <div className="h-[300px] w-full sm:h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[...chartData].reverse()}
                  margin={{ top: 5, right: 1, left: 1, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e0e0e0"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: "11px", fill: "#6B7280" }}
                    height={60}
                    tickMargin={14}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    domain={["dataMin - 5", "dataMax + 5"]}
                    reversed
                    tickFormatter={(v) => `${v}위`}
                    tick={{ fontSize: "11px", fill: "#6B7280" }}
                    width={60}
                    tickMargin={14}
                  />
                  <Tooltip
                    content={
                      <ChartTooltipContent
                        labelFormatter={(value) => value}
                        indicator="line"
                        payload={[
                          {
                            name: "순위",
                            value: (value: any) => {
                              const rank = 100 - value;
                              return `${rank}위`;
                            },
                            color: "#25E4FF",
                          },
                        ]}
                      />
                    }
                  />
                  <Line
                    type="monotone"
                    dataKey="rank"
                    name="순위"
                    stroke="#25E4FF"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "#25E4FF", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          {/* 방문자 리뷰 차트 */}
          <div className="visitor-review-chart">
            <h2 className="mb-4 text-lg font-semibold">방문자 리뷰 추이</h2>
            <div className="h-[300px] w-full sm:h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={[...chartData].reverse()}
                  margin={{ top: 5, right: 1, left: 1, bottom: 5 }}
                >
                  <defs>
                    <linearGradient
                      id="colorVisitor"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#25E4FF" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#25E4FF"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e0e0e0"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: "11px", fill: "#6B7280" }}
                    height={60}
                    tickMargin={14}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    domain={["dataMin - 2", "dataMax + 2"]}
                    tick={{ fontSize: "11px", fill: "#6B7280" }}
                    width={60}
                    tickMargin={14}
                  />
                  <Tooltip
                    content={
                      <ChartTooltipContent
                        labelFormatter={(value) => value}
                        indicator="line"
                      />
                    }
                  />
                  <Area
                    type="monotone"
                    dataKey="visitorReviewCount"
                    name="방문자 리뷰"
                    stroke="#25E4FF"
                    fill="url(#colorVisitor)"
                    dot={{ r: 4, fill: "#25E4FF", strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          {/* 블로그 리뷰 차트 */}
          <div className="blog-review-chart">
            <h2 className="mb-4 text-lg font-semibold">블로그 리뷰 추이</h2>
            <div className="h-[300px] w-full sm:h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={[...chartData].reverse()}
                  margin={{ top: 5, right: 1, left: 1, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="colorBlog" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#282c34" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#282c34"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e0e0e0"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: "11px", fill: "#6B7280" }}
                    height={60}
                    tickMargin={14}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    domain={["dataMin - 5", "dataMax + 5"]}
                    tick={{ fontSize: "11px", fill: "#6B7280" }}
                    width={60}
                    tickMargin={14}
                  />
                  <Tooltip
                    content={
                      <ChartTooltipContent
                        labelFormatter={(value) => value}
                        indicator="line"
                      />
                    }
                  />
                  <Area
                    type="monotone"
                    dataKey="blogReviewCount"
                    name="블로그 리뷰"
                    stroke="#282c34"
                    fill="url(#colorBlog)"
                    dot={{ r: 4, fill: "#282c34", strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          {/* 저장 수 차트 */}
          <div className="save-count-chart">
            <h2 className="mb-4 text-lg font-semibold">저장 수 추이</h2>
            <div className="h-[300px] w-full sm:h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[...chartData].reverse()}
                  margin={{ top: 5, right: 1, left: 1, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e0e0e0"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: "11px", fill: "#6B7280" }}
                    height={60}
                    tickMargin={14}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    tick={{ fontSize: "11px", fill: "#6B7280" }}
                    width={60}
                    tickMargin={14}
                  />
                  <Tooltip
                    content={
                      <ChartTooltipContent
                        labelFormatter={(value) => value}
                        indicator="line"
                      />
                    }
                  />
                  <Line
                    type="monotone"
                    dataKey="saveCount"
                    name="저장 수"
                    stroke="#fa5252"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "#fa5252", strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
