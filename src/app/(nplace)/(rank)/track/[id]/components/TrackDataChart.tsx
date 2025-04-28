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

// 차트 설정
const chartConfig: {
  [key: string]: {
    label: string;
    color: string;
  };
} = {
  rank: {
    label: "순위",
    color: "hsl(var(--chart-1))",
  },
  visitorReviewCount: {
    label: "방문자 리뷰",
    color: "hsl(var(--chart-2))",
  },
  blogReviewCount: {
    label: "블로그 리뷰",
    color: "hsl(var(--chart-3))",
  },
  saveCount: {
    label: "저장수",
    color: "hsl(var(--chart-4))",
  },
};

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

// 차트 컨테이너 컴포넌트
interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: any;
  children: React.ReactNode;
}

function ChartContainer({
  config,
  children,
  className,
  ...props
}: ChartContainerProps) {
  return (
    <div
      className={className}
      style={
        {
          "--color-rank": config.rank.color,
          "--color-visitorReviewCount": config.visitorReviewCount.color,
          "--color-blogReviewCount": config.blogReviewCount.color,
          "--color-saveCount": config.saveCount.color,
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </div>
  );
}

interface TrackDataChartProps {
  trackList: TrackData[];
}

export default function TrackMultiChart({ trackList }: TrackDataChartProps) {
  const isMobile = useIsMobile ? useIsMobile() : false;
  const [timeRange, setTimeRange] = React.useState("all");
  const [selectedMetric, setSelectedMetric] = React.useState("rank");

  // 차트 데이터 필터링: 최신 30일, 7일 또는 모든 데이터
  const getFilteredData = () => {
    if (!trackList || trackList.length === 0) return [];
    
    // 날짜 기준 정렬
    const sortedData = [...trackList].sort((a, b) => 
      new Date(a.chartDate).getTime() - new Date(b.chartDate).getTime()
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
    const safeNumber = (val:any) => {
      if (typeof val === "number") return val;
      if (!val) return 0;
      const n = Number(val.toString().replace(/[^0-9]/g, ""));
      return isNaN(n) ? 0 : n;
    };

    return {
      ...item,
      date: new Date(item.chartDate).toLocaleDateString(),
      invertedRank: typeof item.rank === "number" ? (100 - item.rank > 0 ? 100 - item.rank : 5) : 0,
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

  const chartDataForLine = chartData.length === 1
    ? [chartData[0], { ...chartData[0], date: ' ' }]
    : chartData;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* 1. 순위 */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h2 className="text-lg font-semibold mb-4">순위 추이</h2>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
              <XAxis dataKey="date" />
              <YAxis domain={['dataMin - 5', 'dataMax + 5']} reversed tickFormatter={v => `${v}위`} />
              <Tooltip content={<ChartTooltipContent labelFormatter={(value) => value} indicator="line" />} />
              <Line type="monotone" dataKey="invertedRank" name="순위" stroke="#25E4FF" strokeWidth={2} dot />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* 2. 방문자 리뷰 */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h2 className="text-lg font-semibold mb-4">방문자 리뷰 추이</h2>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorVisitor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#25E4FF" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#25E4FF" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
              <XAxis dataKey="date" />
              <YAxis domain={['dataMin - 2', 'dataMax + 2']} />
              <Tooltip content={<ChartTooltipContent labelFormatter={(value) => value} indicator="line" />} />
              <Area type="monotone" dataKey="visitorReviewCount" name="방문자 리뷰" stroke="#25E4FF" fill="url(#colorVisitor)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* 3. 블로그 리뷰 */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h2 className="text-lg font-semibold mb-4">블로그 리뷰 추이</h2>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorBlog" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D3FFC0" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#D3FFC0" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
              <XAxis dataKey="date" />
              <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
              <Tooltip content={<ChartTooltipContent labelFormatter={(value) => value} indicator="line" />} />
              <Area type="monotone" dataKey="blogReviewCount" name="블로그 리뷰" stroke="#D3FFC0" fill="url(#colorBlog)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* 4. 저장 수 */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h2 className="text-lg font-semibold mb-4">저장 수 추이</h2>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#fa5252" vertical={false} />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip content={<ChartTooltipContent labelFormatter={(value) => value} indicator="line" />} />
              <Line type="monotone" dataKey="saveCount" name="저장 수" stroke="#fa5252" strokeWidth={2} dot />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
} 