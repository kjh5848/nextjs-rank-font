import { TrackData } from "@/model/TrackRepository";
import { useState } from "react";

interface TrackGridViewProps {
  trackList: TrackData[];
  gridColumns?: number; // 4, 5, 6, ..., 12
}

function getRankChangeStyle(currentRank: number | null, prevRank: number | null) {
  if (!currentRank || !prevRank) return { text: "", color: "", icon: "" };
  const diff = prevRank - currentRank;
  if (diff > 0) return { text: `${diff}`, color: "text-green-500", icon: "↑" };
  if (diff < 0) return { text: `${Math.abs(diff)}`, color: "text-red-500", icon: "↓" };
  return { text: "-", color: "text-gray-500", icon: "" };
}

function getChangeStyle(current: number | string | null, prev: number | string | null) {
  if (!current || !prev) return { text: "", color: "", icon: "" };
  const currentVal = typeof current === 'string' ? parseInt(current.replace(/,/g, "")) : current;
  const prevVal = typeof prev === 'string' ? parseInt(prev.replace(/,/g, "")) : prev;
  const diff = currentVal - prevVal;
  if (diff > 0) return { text: `${diff.toLocaleString()}`, color: "text-green-500", icon: "↑" };
  if (diff < 0) return { text: `${Math.abs(diff).toLocaleString()}`, color: "text-red-500", icon: "↓" };
  return { text: "-", color: "text-gray-500", icon: "" };
}

export default function TrackGridView({ trackList, gridColumns: initialGridColumns = 4 }: TrackGridViewProps) {
  const [gridColumns, setGridColumns] = useState(initialGridColumns);

  if (!trackList || trackList.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center rounded-lg bg-gray-50">
        <p className="text-gray-500">추적 중인 키워드가 없습니다.</p>
      </div>
    );
  }

  const formatDate = (date: string) => {
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    const weekday = weekdays[d.getDay()];

    return {
      date: `${month}.${day} (${weekday}) ${hours}:${minutes}`,
      shortDate: `${month}.${day} (${weekday})`,
    };
  };

  const processSaveCount = (value: string | number | null | undefined) => {
    if (!value) return null;
    return typeof value === "string" ? value.replace(/\+/g, "") : value;
  };

  const getSaveCountChange = (current: string | number | null, prev: string | number | null) => {
    if (!current || !prev) return { text: "", color: "", icon: "" };
    const currentVal = typeof current === 'string' ? parseInt(current.replace(/,/g, "").replace(/\+/g, "")) : current;
    const prevVal = typeof prev === 'string' ? parseInt(prev.replace(/,/g, "").replace(/\+/g, "")) : prev;
    const diff = currentVal - prevVal;
    if (diff > 0) return { text: `${diff.toLocaleString()}`, color: "text-green-500", icon: "↑" };
    if (diff < 0) return { text: `${Math.abs(diff).toLocaleString()}`, color: "text-red-500", icon: "↓" };
    return { text: "-", color: "text-gray-500", icon: "" };
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end space-x-2">
        <label htmlFor="gridColumns" className="text-sm font-medium text-gray-700">
          열 수:
        </label>
        <select
          id="gridColumns"
          value={gridColumns}
          onChange={(e) => setGridColumns(Number(e.target.value))}
          className="rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-blue-500 focus:outline-none"
        >
          {[3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}열
            </option>
          ))}
        </select>
      </div>
      <div
        className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 ${
          gridColumns === 4
            ? "xl:grid-cols-4"
            : gridColumns === 5
            ? "xl:grid-cols-5"
            : "xl:grid-cols-3"
        }`}
      >
        {trackList.map((track, index) => {
          const prevTrack = trackList[index + 1] || null;
          const rankChange = getRankChangeStyle(track.rank, prevTrack?.rank);
          const visitorChange = getChangeStyle(track.visitorReviewCount, prevTrack?.visitorReviewCount);
          const blogChange = getChangeStyle(track.blogReviewCount, prevTrack?.blogReviewCount);
          const scoreChange = getChangeStyle(track.scoreInfo, prevTrack?.scoreInfo);
          const saveCountChange = getSaveCountChange(track.saveCount, prevTrack?.saveCount);
          const dateInfo = formatDate(track.chartDate);

          return (
            <div
              key={index}
              className="group relative rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-blue-500 hover:shadow-lg"
            >
              <div className="absolute top-2 right-2 text-xs text-gray-400">
                {dateInfo.shortDate}
              </div>

              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-gray-900">
                    {track.rank || "-"}
                  </span>
                  <span className="text-sm text-gray-500">위</span>
                  {rankChange.text && (
                    <div
                      className={`ml-2 flex items-center ${rankChange.color}`}
                    >
                      <span className="text-sm font-medium">
                        {rankChange.icon}
                      </span>
                      <span className="text-sm font-medium">
                        {rankChange.text}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-700">
                      평점
                    </span>
                    <span className="text-sm text-gray-600">
                      {track.scoreInfo || "-"}
                    </span>
                  </div>
                  {scoreChange.text && (
                    <div className={`flex items-center ${scoreChange.color}`}>
                      <span className="text-xs font-medium">
                        {scoreChange.icon}
                      </span>
                      <span className="text-xs font-medium">
                        {scoreChange.text}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-700">
                      방
                    </span>
                    <span className="text-sm text-gray-600">
                      {track.visitorReviewCount || "-"}
                    </span>
                  </div>
                  {visitorChange.text && (
                    <div className={`flex items-center ${visitorChange.color}`}>
                      <span className="text-xs font-medium">
                        {visitorChange.icon}
                      </span>
                      <span className="text-xs font-medium">
                        {visitorChange.text}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-700">
                      블
                    </span>
                    <span className="text-sm text-gray-600">
                      {track.blogReviewCount || "-"}
                    </span>
                  </div>
                  {blogChange.text && (
                    <div className={`flex items-center ${blogChange.color}`}>
                      <span className="text-xs font-medium">
                        {blogChange.icon}
                      </span>
                      <span className="text-xs font-medium">
                        {blogChange.text}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                <div className="flex items-center space-x-2">
                  <span>저장수: {track.saveCount || "-"}</span>
                  {saveCountChange.text && (
                    <div
                      className={`flex items-center ${saveCountChange.color}`}
                    >
                      <span className="text-xs font-medium">
                        {saveCountChange.icon}
                      </span>
                      <span className="text-xs font-medium">
                        {saveCountChange.text}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 