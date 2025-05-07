"use client";

import { useState, useEffect } from "react";
import { useNplaceRankTrackWithIdViewModel } from "@/viewModel/nplace/NplaceRankTrackWithIdViewModel";
import { useParams } from "next/navigation";
import {
  FileText,
  LayoutGrid,
} from "lucide-react";
import Image from "next/image";
import TrackReportView from "@/src/components/nplrace/rank/track/id/TrackReportView";
import TrackGridView from "@/src/components/nplrace/rank/track/id/TrackGridView";
import AddKeywordModal from "@/src/components/nplrace/rank/track/id/TrackAddKeywordModal";
import KeywordList from "@/src/components/nplrace/rank/track/id/TrackKeywordList";
import RankCheckModal from "@/src/components/nplrace/rank/track/id/RankCheckModal";
import React from "react";

export default function TrackDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [selectedProvince, setSelectedProvince] = useState("");
  const [keyword, setKeyword] = useState("");
  const [showRankCheckModal, setShowRankCheckModal] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<any>(null);
  const [selectedTrackInfos, setSelectedTrackInfos] = useState<Set<string>>(
    new Set(),
  );
  const [viewMode, setViewMode] = useState<"list" | "grid" | "report">("grid");
  const [showAddKeywordModal, setShowAddKeywordModal] = useState(false);
  const {
    shop,
    isLoading,
    error,
    deleteShop,
    addTrack,
    updateKeywords,
    isUpdatingKeywords,
    getNplaceRankTrackList,
    getRankString,
  } = useNplaceRankTrackWithIdViewModel({ id, keyword: "", province: "" });

  // 첫 번째 트랙 정보 키를 선택 (있다면)
  useEffect(() => {
    if (shop && shop.nplaceRankTrackInfoMap) {
      const firstKey = Object.keys(shop.nplaceRankTrackInfoMap)[0] || null;
      if (firstKey) {
        setSelectedTrackInfos(new Set([firstKey]));
      }
    }
  }, [shop]);

  const handleAddTrack = async () => {
    if (!selectedProvince || !keyword) return;
    await addTrack({
      keyword,
      province: selectedProvince,
      shopId: id,
      businessSector: shop?.businessSector || "",
    });
    setKeyword("");
  };

  const handleTrackInfoSelect = (key: string) => {
    setSelectedTrackInfos((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (shop && shop.nplaceRankTrackInfoMap) {
      if (
        selectedTrackInfos.size ===
        Object.keys(shop.nplaceRankTrackInfoMap).length
      ) {
        setSelectedTrackInfos(new Set());
      } else {
        setSelectedTrackInfos(
          new Set(Object.keys(shop.nplaceRankTrackInfoMap)),
        );
      }
    }
  };

  // 아코디언 상태 추가
  const [openAccordions, setOpenAccordions] = React.useState<string[]>([]);

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div className="text-red-500">{error.toString()}</div>;
  if (!shop) return <div>상점 정보가 없습니다.</div>;

  return (
    <div className="min-h-screen">
      <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* 모바일용 상점 정보 */}
          <div className="lg:hidden">
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
              <div className="p-6">
                <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                  <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
                    <div className="h-full w-full overflow-hidden rounded-lg sm:h-20 sm:w-20">
                      <Image
                        src={shop?.shopImageUrl || "/img/nplace/shop.png"}
                        alt="상점 이미지"
                        width={100}
                        height={100}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                        {shop?.shopName}
                      </h2>
                      <p className="mt-1 text-sm text-gray-600">
                        {shop?.roadAddress || shop?.address}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {shop?.keywordList?.map((keyword, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => updateKeywords()}
                      disabled={isUpdatingKeywords}
                      className="inline-flex items-center rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <svg
                        className={`mr-2 h-4 w-4 ${isUpdatingKeywords ? "animate-spin" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      {isUpdatingKeywords ? "갱신 중..." : "갱신"}
                    </button>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={async () => {
                      if (
                        window.confirm("정말로 이 플레이스를 삭제하시겠습니까?")
                      ) {
                        try {
                          await deleteShop();
                          window.location.href = "/nplace/rank/track";
                        } catch (error) {
                          alert("플레이스 삭제에 실패했습니다.");
                        }
                      }
                    }}
                    className="inline-flex items-center rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100"
                  >
                    <svg
                      className="mr-2 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    플레이스 삭제
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 모바일용 키워드 목록 */}
          <div className="lg:hidden">
            <KeywordList
              keywords={shop?.nplaceRankTrackInfoMap || {}}
              selectedKeywords={selectedTrackInfos}
              onSelectKeyword={handleTrackInfoSelect}
              onSelectAll={handleSelectAll}
              getRankString={getRankString}
              onAddKeyword={() => setShowAddKeywordModal(true)}
            />
          </div>

          {/* 데스크톱용 레이아웃 */}
          <div className="hidden lg:col-span-1 lg:block">
            <KeywordList
              keywords={shop?.nplaceRankTrackInfoMap || {}}
              selectedKeywords={selectedTrackInfos}
              onSelectKeyword={handleTrackInfoSelect}
              onSelectAll={handleSelectAll}
              getRankString={getRankString}
              onAddKeyword={() => setShowAddKeywordModal(true)}
            />
          </div>

          <div className="lg:col-span-3">
            {/* 데스크톱용 상점 정보 */}
            <div className="hidden lg:block">
              <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                <div className="p-6">
                  <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                    <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
                      <div className="h-full w-full overflow-hidden rounded-lg sm:h-20 sm:w-20">
                        <Image
                          src={shop?.shopImageUrl || "/img/nplace/shop.png"}
                          alt="상점 이미지"
                          width={100}
                          height={100}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                          {shop?.shopName}
                        </h2>
                        <p className="mt-1 text-sm text-gray-600">
                          {shop?.roadAddress || shop?.address}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {shop?.keywordList?.map((keyword, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateKeywords()}
                        disabled={isUpdatingKeywords}
                        className="inline-flex items-center rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <svg
                          className={`mr-2 h-4 w-4 ${isUpdatingKeywords ? "animate-spin" : ""}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                        {isUpdatingKeywords ? "갱신 중..." : "갱신"}
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      onClick={async () => {
                        if (
                          window.confirm(
                            "정말로 이 플레이스를 삭제하시겠습니까?",
                          )
                        ) {
                          try {
                            await deleteShop();
                            window.location.href = "/nplace/rank/track";
                          } catch (error) {
                            alert("플레이스 삭제에 실패했습니다.");
                          }
                        }
                      }}
                      className="inline-flex items-center rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100"
                    >
                      <svg
                        className="mr-2 h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      플레이스 삭제
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 선택된 키워드 정보 */}
            {selectedTrackInfos.size > 0 ? (
              <div className="mt-5 space-y-6">
                {Array.from(selectedTrackInfos).map((trackInfoKey) => (
                  <div key={trackInfoKey} className="mb-2 rounded-lg border border-gray-200 bg-white">
                    {/* 아코디언 헤더 */}
                    <button
                      className="w-full flex justify-between items-center px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors rounded-t-lg focus:outline-none"
                      onClick={() => toggleAccordion(trackInfoKey)}
                      aria-expanded={openAccordions.includes(trackInfoKey)}
                      aria-controls={`accordion-content-${trackInfoKey}`}
                    >
                      <div>
                        <span className="font-semibold text-gray-900">{trackInfoKey}</span>
                        <span className="ml-2 text-xs text-gray-500 block sm:inline">
                          {shop?.nplaceRankTrackInfoMap?.[trackInfoKey]?.province}
                          {shop?.nplaceRankTrackInfoMap?.[trackInfoKey]?.rank !== undefined &&
                            ` • ${getRankString(shop?.nplaceRankTrackInfoMap?.[trackInfoKey]?.rank ?? null)}`}
                        </span>
                      </div>
                      <span className="ml-2 text-gray-400 text-lg">
                        {openAccordions.includes(trackInfoKey) ? "▲" : "▼"}
                      </span>
                    </button>
                    {/* 아코디언 내용 */}
                    {openAccordions.includes(trackInfoKey) && (
                      <div
                        id={`accordion-content-${trackInfoKey}`}
                        className="px-4 py-4 border-t bg-white"
                      >
                        <div className="flex gap-2 mb-4">
                          <button
                            className={`flex items-center rounded-lg px-4 py-2 text-sm font-medium ${viewMode === "grid" ? "bg-blue-50 text-blue-700" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}`}
                            onClick={() => setViewMode("grid")}
                          >
                            <LayoutGrid size={16} className="mr-2" />
                            그리드
                          </button>
                          <button
                            className={`flex items-center rounded-lg px-4 py-2 text-sm font-medium ${viewMode === "report" ? "bg-blue-50 text-blue-700" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}`}
                            onClick={() => setViewMode("report")}
                          >
                            <FileText size={16} className="mr-2" />
                            리포트
                          </button>
                        </div>
                        {viewMode === "report" ? (
                          <TrackReportView
                            trackList={getNplaceRankTrackList(trackInfoKey) || []}
                            shopName={shop?.shopName || ""}
                            keyword={trackInfoKey}
                          />
                        ) : (
                          <TrackGridView
                            trackList={getNplaceRankTrackList(trackInfoKey) || []}
                          />
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-5 flex h-64 items-center justify-center rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
                <p className="text-gray-500">선택된 키워드가 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <RankCheckModal
        show={showRankCheckModal}
        onClose={() => setShowRankCheckModal(false)}
        selectedPlace={selectedTrack}
        rankCheckData={[]}
      />
    </div>
  );
}
