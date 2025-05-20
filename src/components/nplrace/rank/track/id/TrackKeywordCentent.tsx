import React from "react";
import { LayoutGrid, FileText } from "lucide-react";
import TrackReportView from "./TrackReportView";
import TrackGridView from "./TrackGridView";
import { Shop } from "@/src/model/TrackRepository";

// ViewMode 타입 정의 (page.tsx에서 사용하는 타입과 일치시켜야 함)
type ViewMode = "grid" | "list" | "report";

interface TrackKeywordContentProps {
  selectedTrackInfos: Set<string>;
  openAccordions: string[];
  toggleAccordion: (key: string) => void;
  shop: Shop;
  getRankString: (rank: number | null) => string;
  getNplaceRankTrackList: (key: string) => any[];
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

export default function TrackKeywordContent({
  selectedTrackInfos,
  openAccordions,
  toggleAccordion,
  shop,
  getRankString,
  getNplaceRankTrackList,
  viewMode,
  setViewMode,
}: TrackKeywordContentProps) {
  return (
    <>
      {Array.from(selectedTrackInfos).map((key) => (
        <div key={key} className="mb-2 rounded-lg border border-gray-200 bg-white">
          <button
            className="flex w-full items-center justify-between rounded-t-lg bg-gray-50 px-4 py-3 hover:bg-gray-100"
            onClick={() => toggleAccordion(key)}
            aria-expanded={openAccordions.includes(key)}
          >
            <div>
              <span className="font-semibold text-gray-900">{key}</span>
              <span className="ml-2 block text-xs text-gray-500 sm:inline">
                {shop.nplaceRankTrackInfoMap?.[key]?.province}
                {shop.nplaceRankTrackInfoMap?.[key]?.rank !== undefined &&
                  ` • ${getRankString(shop.nplaceRankTrackInfoMap?.[key]?.rank ?? null)}`}
              </span>
            </div>
            <span className="ml-2 text-lg text-gray-400">
              {openAccordions.includes(key) ? "▲" : "▼"}
            </span>
          </button>
          {openAccordions.includes(key) && (
            <div className="border-t bg-white px-4 py-4">
              <div className="mb-4 flex gap-2">
                <button
                  className={`flex items-center rounded-lg px-4 py-2 text-sm font-medium ${viewMode === "grid" ? "bg-blue-50 text-blue-700" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}`}
                  onClick={() => setViewMode("grid")}
                >
                  <LayoutGrid size={16} className="mr-2" /> 그리드
                </button>
                <button
                  className={`flex items-center rounded-lg px-4 py-2 text-sm font-medium ${viewMode === "report" ? "bg-blue-50 text-blue-700" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}`}
                  onClick={() => setViewMode("report")}
                >
                  <FileText size={16} className="mr-2" /> 리포트
                </button>
              </div>
              {viewMode === "report" ? (
                <TrackReportView
                  trackList={getNplaceRankTrackList(key) || []}
                  shopName={shop.shopName || ""}
                  keyword={key}
                />
              ) : (
                <TrackGridView trackList={getNplaceRankTrackList(key) || []} />
              )}
            </div>
          )}
        </div>
      ))}
    </>
  );
}
