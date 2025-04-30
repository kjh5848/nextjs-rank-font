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
  Legend,
  BarChart,
  Bar
} from "recharts";
import { useIsMobile } from "@/use/use-mobile";
import { TrackData } from "@/model/TrackRepository";
import TrackGridView from "./TrackGridView";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
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
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="grid grid-cols-[auto_1fr] gap-2">
        <div className="font-medium text-muted-foreground">
          {labelFormatter ? labelFormatter(label) : label}
        </div>
        <div className="col-span-2 my-1 h-px bg-muted" />
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

export default function TrackReportView({ trackList, shopName, keyword }: TrackDataChartProps) {
  const [timeRange, setTimeRange] = React.useState<"7d" | "30d" | "all">("all");
  const reportRef = React.useRef<HTMLDivElement>(null);

  // 차트 데이터 필터링: 최신 30일, 7일 또는 모든 데이터
  const getFilteredData = () => {
    if (!trackList || trackList.length === 0) return [];

    // 날짜 기준 정렬
    const sortedData = [...trackList].sort(
      (a, b) =>
        new Date(a.chartDate).getTime() - new Date(b.chartDate).getTime(),
    );

    // 기간에 따라 필터링
    if (timeRange === "30d") {
      return sortedData.slice(-30);
    } else if (timeRange === "7d") {
      return sortedData.slice(-7);
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

  const chartDataForLine =
    chartData.length === 1
      ? [chartData[0], { ...chartData[0], date: " " }]
      : chartData;

  // 파일명 생성 함수
  const getFileName = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${shopName}_${keyword}_${year}${month}${day}`;
  };

  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;

    const canvas = await html2canvas(reportRef.current, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      onclone: (clonedDoc) => {
        // 색상 변환을 위한 스타일 추가
        const style = clonedDoc.createElement('style');
        style.textContent = `
          * {
            color: rgb(0, 0, 0) !important;
            background-color: rgb(255, 255, 255) !important;
            border-color: rgb(0, 0, 0) !important;
          }
          .bg-blue-50 { background-color: rgb(239, 246, 255) !important; }
          .text-blue-700 { color: rgb(29, 78, 216) !important; }
          .bg-gray-50 { background-color: rgb(249, 250, 251) !important; }
          .text-gray-700 { color: rgb(55, 65, 81) !important; }
          .border-gray-200 { border-color: rgb(229, 231, 235) !important; }
        `;
        clonedDoc.head.appendChild(style);
      }
    });

    const imgData = canvas.toDataURL("image/jpeg", 1.0);
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
    pdf.save(`${getFileName()}.pdf`);
  };

  const handleDownloadImage = async () => {
    if (!reportRef.current) return;

    const canvas = await html2canvas(reportRef.current, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      onclone: (clonedDoc) => {
        // 색상 변환을 위한 스타일 추가
        const style = clonedDoc.createElement('style');
        style.textContent = `
          * {
            color: rgb(0, 0, 0) !important;
            background-color: rgb(255, 255, 255) !important;
            border-color: rgb(0, 0, 0) !important;
          }
          .bg-blue-50 { background-color: rgb(239, 246, 255) !important; }
          .text-blue-700 { color: rgb(29, 78, 216) !important; }
          .bg-gray-50 { background-color: rgb(249, 250, 251) !important; }
          .text-gray-700 { color: rgb(55, 65, 81) !important; }
          .border-gray-200 { border-color: rgb(229, 231, 235) !important; }
        `;
        clonedDoc.head.appendChild(style);
      }
    });

    const link = document.createElement("a");
    link.download = `${getFileName()}.jpg`;
    link.href = canvas.toDataURL("image/jpeg", 1.0);
    link.click();
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
    const ranks = data.map(d => d.rank || 0).filter(r => r > 0);

    const rankChange = (last.rank || 0) - (first.rank || 0);

    // 성장률 계산 함수
    const calculateGrowth = (current: number | null | undefined, previous: number | null | undefined): number => {
      const curr = Number(current) || 0;
      const prev = Number(previous) || 0;
      if (prev === 0) return curr > 0 ? 100 : 0;
      return ((curr - prev) / prev) * 100;
    };

    const visitorReviewGrowth = calculateGrowth(last.visitorReviewCount, first.visitorReviewCount);
    const blogReviewGrowth = calculateGrowth(last.blogReviewCount, first.blogReviewCount);
    const saveCountGrowth = calculateGrowth(last.saveCount, first.saveCount);

    const averageRank = ranks.length > 0 ? ranks.reduce((a, b) => a + b, 0) / ranks.length : 0;
    const bestRank = ranks.length > 0 ? Math.min(...ranks) : 0;
    const worstRank = ranks.length > 0 ? Math.max(...ranks) : 0;

    const totalReviews = (last.visitorReviewCount || 0) + (last.blogReviewCount || 0);
    const reviewGrowth = visitorReviewGrowth + blogReviewGrowth;
    const reviewTrend = reviewGrowth > 5 ? "증가" : reviewGrowth < -5 ? "감소" : "유지";
    const rankTrend = rankChange < -2 ? "상승" : rankChange > 2 ? "하락" : "유지";

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

  // AI 분석 생성 함수
  const generateAIAnalysis = () => {
    if (filteredData.length < 2) {
      return {
        title: "데이터 부족",
        message: "분석을 위한 충분한 데이터가 없습니다. 더 많은 데이터가 쌓이면 상세한 분석이 가능합니다.",
        suggestions: [],
      };
    }

    const insights = [];
    const suggestions = [];

    // 순위 분석
    if (analysis.rankTrend === "상승") {
      insights.push("순위가 상승 추세를 보이고 있어 긍정적입니다.");
      if (analysis.visitorReviewGrowth > 0) {
        suggestions.push("방문자 리뷰 증가가 순위 상승에 기여하고 있습니다. 현재의 고객 서비스 품질을 유지하세요.");
      }
    } else if (analysis.rankTrend === "하락") {
      insights.push("순위가 하락 추세를 보이고 있어 주의가 필요합니다.");
      suggestions.push("경쟁업체 분석을 통해 차별화 포인트를 발굴하세요.");
    }

    // 리뷰 분석
    if (analysis.visitorReviewGrowth > 20) {
      insights.push("방문자 리뷰가 크게 증가하여 고객 만족도가 높은 것으로 보입니다.");
      suggestions.push("만족도 높은 고객들을 대상으로 재방문 프로모션을 고려해보세요.");
    } else if (analysis.visitorReviewGrowth < -10) {
      insights.push("방문자 리뷰 감소 추세가 우려됩니다.");
      suggestions.push("고객 피드백을 수집하여 서비스 개선점을 파악하세요.");
    }

    if (analysis.blogReviewGrowth > 20) {
      insights.push("블로그 리뷰가 크게 증가하여 온라인 인지도가 상승하고 있습니다.");
      suggestions.push("인플루언서 마케팅이 효과적일 수 있습니다.");
    }

    // 저장수 분석
    if (analysis.saveCountGrowth > 10) {
      insights.push("저장수가 증가하여 잠재 고객의 관심이 높아지고 있습니다.");
      suggestions.push("관심 고객을 실제 방문으로 연결하기 위한 프로모션을 기획해보세요.");
    }

    return {
      title: insights.length > 0 ? "AI 분석 인사이트" : "기본 분석",
      message: insights.join(" "),
      suggestions: suggestions,
    };
  };

  const aiAnalysis = generateAIAnalysis();

  return (
    <div className="space-y-6">
      {/* 다운로드 버튼 */}
      <div className="flex justify-end space-x-2">
        <button
          onClick={handleDownloadPDF}
          className="flex items-center rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100"
        >
          <Download className="mr-2 h-4 w-4" />
          PDF 다운로드
        </button>
        <button
          onClick={handleDownloadImage}
          className="flex items-center rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100"
        >
          <Download className="mr-2 h-4 w-4" />
          이미지 다운로드
        </button>
      </div>

      {/* 기간 선택 버튼 */}
      <div className="flex justify-end space-x-2">
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
      <div ref={reportRef} className="space-y-8 bg-white p-6">
        {/* 상점 정보 */}
        <div className="mb-6 border-b border-gray-200 pb-6">
          <h2 className="text-xl font-bold text-gray-900">{shopName}</h2>
          <p className="mt-1 text-sm text-gray-600">키워드: {keyword}</p>
          <p className="mt-1 text-sm text-gray-600">
            생성일: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* 마케팅 인사이트 */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-gray-200 p-6">
            <h3 className="mb-4 text-lg font-semibold">주요 지표 요약</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">평균 순위</span>
                <span className="font-medium">
                  {analysis.averageRank.toFixed(1)}위
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">최고 순위</span>
                <span className="font-medium">{analysis.bestRank}위</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">최저 순위</span>
                <span className="font-medium">{analysis.worstRank}위</span>
              </div>
              {/* <div className="flex justify-between">
                <span className="text-gray-600">총 리뷰 수</span>
                <span className="font-medium">{analysis.totalReviews.toLocaleString()}개</span>
              </div> */}
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 p-6">
            <h3 className="mb-4 text-lg font-semibold">성장률 분석</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">순위 변동</span>
                <span
                  className={`font-medium ${analysis.rankChange < 0 ? "text-green-500" : analysis.rankChange > 0 ? "text-red-500" : "text-gray-500"}`}
                >
                  {analysis.rankChange > 0 ? "+" : ""}
                  {analysis.rankChange}위
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">방문자 리뷰 성장률</span>
                <span
                  className={`font-medium ${analysis.visitorReviewGrowth > 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {analysis.visitorReviewGrowth.toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">블로그 리뷰 성장률</span>
                <span
                  className={`font-medium ${analysis.blogReviewGrowth > 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {analysis.blogReviewGrowth.toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">저장 수 성장률</span>
                <span
                  className={`font-medium ${analysis.saveCountGrowth > 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {analysis.saveCountGrowth.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 그리드 뷰 섹션 */}
        <div className="mt-8">
          <h2 className="mb-4 text-lg font-semibold">상세 데이터</h2>
          <TrackGridView trackList={filteredData} />
        </div>
        {/* 차트 섹션 */}
        <div className="grid grid-cols-1 gap-6">
          {/* 2. 순위 */}
          <div className="">
            <h2 className="mb-4 text-lg font-semibold">순위 추이</h2>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e0e0e0"
                    vertical={false}
                  />
                  <XAxis dataKey="date" />
                  <YAxis
                    domain={["dataMin - 5", "dataMax + 5"]}
                    reversed
                    tickFormatter={(v) => `${v}위`}
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
                    dataKey="invertedRank"
                    name="순위"
                    stroke="#25E4FF"
                    strokeWidth={2}
                    dot
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          {/* 2. 방문자 리뷰 */}
          <div>
            <h2 className="mb-4 text-lg font-semibold">방문자 리뷰 추이</h2>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
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
                  <XAxis dataKey="date" />
                  <YAxis domain={["dataMin - 2", "dataMax + 2"]} />
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
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          {/* 3. 블로그 리뷰 */}
          <div className="">
            <h2 className="mb-4 text-lg font-semibold">블로그 리뷰 추이</h2>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
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
                  <XAxis dataKey="date" />
                  <YAxis domain={["dataMin - 5", "dataMax + 5"]} />
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
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          {/* 4. 저장 수 */}
          <div className="">
            <h2 className="mb-4 text-lg font-semibold">저장 수 추이</h2>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#fa5252"
                    vertical={false}
                  />
                  <XAxis dataKey="date" />
                  <YAxis />
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
                    dot
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