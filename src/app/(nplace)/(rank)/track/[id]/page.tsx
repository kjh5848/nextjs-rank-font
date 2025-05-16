"use client";

import { useState, useEffect } from "react";
import { redirect, useParams, useSearchParams } from "next/navigation";
import Image from "next/image";
import React from "react";
import { FileText, LayoutGrid } from "lucide-react";

import { useNplaceRankTrackWithIdViewModel } from "@/viewModel/nplace/NplaceRankTrackWithIdViewModel";
import { useAuthStore } from "@/src/store/provider/StoreProvider";
import { useViewModeStore } from "@/src/store/useViewModeStore";

import TrackKeywordList from "@/src/components/nplrace/rank/track/id/TrackKeywordList";
import TrackReportView from "@/src/components/nplrace/rank/track/id/TrackReportView";
import TrackGridView from "@/src/components/nplrace/rank/track/id/TrackGridView";
import LoadingFallback from "@/src/components/common/LoadingFallback";

export default function TrackDetailPage() {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const viewParam = searchParams.get("view");

  const { loginUser, isAuthPending } = useAuthStore();
  const viewMode = useViewModeStore((state) => state.viewMode);
  const setViewMode = useViewModeStore((state) => state.setViewMode);
  const [selectedTrackInfos, setSelectedTrackInfos] = useState<Set<string>>(
    new Set(),
  );
  const [openAccordions, setOpenAccordions] = useState<string[]>([]);
    

  // 👉 쿼리 파라미터에서 viewMode 설정
  useEffect(() => {
    if (
      viewParam === "grid" ||
      viewParam === "list" ||
      viewParam === "report"
    ) {
      setViewMode(viewParam);
    }
  }, [viewParam, setViewMode]);

  const {
    shopId,
    businessSector,
    shop,
    isLoading,
    error,
    isUpdatingKeywords,
    getNplaceRankTrackList,
    getRankString,
    deleteTrack,
    updateTrackStatus,
    updateKeywords,
  } = useNplaceRankTrackWithIdViewModel({ id, keyword: "", province: "" });

  const isGuest = loginUser === null;
  const handleUpdateTrackStatus = (
    trackId: string,
    status: "RUNNING" | "STOP",
  ) => {
    updateTrackStatus({ trackId, status });
  };

  if (isGuest) {
    redirect("/login");
  }
  // 👉 키워드 자동 선택
  useEffect(() => {
    if (shop?.nplaceRankTrackInfoMap) {
      const keys = Object.keys(shop.nplaceRankTrackInfoMap);
      if (keys.length) setSelectedTrackInfos(new Set(keys));
    }
  }, [shop]);

  const handleTrackInfoSelect = (key: string) => {
    setSelectedTrackInfos((prev) => {
      const newSet = new Set(prev);
      newSet.has(key) ? newSet.delete(key) : newSet.add(key);
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (!shop?.nplaceRankTrackInfoMap) return;
    const keys = Object.keys(shop.nplaceRankTrackInfoMap);
    setSelectedTrackInfos((prev) =>
      prev.size === keys.length ? new Set() : new Set(keys),
    );
  };

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div className="text-red-500">{error.toString()}</div>;
  if (!shop) return <div>상점 정보가 없습니다.</div>;

  // 👉 상점 헤더
  const ShopHeader = (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
          <div className="h-full w-full overflow-hidden rounded-lg sm:h-20 sm:w-20">
            <Image
              src={shop.shopImageUrl || "/img/nplace/shop.png"}
              alt="상점 이미지"
              width={100}
              height={100}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
              {shop.shopName}
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              {shop.roadAddress || shop.address}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {shop.keywordList?.map((keyword, i) => (
                <span
                  key={i}
                  className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex space-x-3">
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
    </div>
  );

  const KeywordContent = Array.from(selectedTrackInfos).map((key) => (
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
  ));

  return (
    <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="lg:hidden">{ShopHeader}</div>

        {/** 모바일 키워드 목록 */}
        <div className="lg:hidden">
          <TrackKeywordList
            keywords={shop.nplaceRankTrackInfoMap || {}}
            selectedKeywords={selectedTrackInfos}
            onSelectKeyword={handleTrackInfoSelect}
            onSelectAll={handleSelectAll}
            getRankString={getRankString}
            shopId={shopId}
            businessSector={businessSector}
            onDeleteTrack={deleteTrack}
            onUpdateTrackStatus={handleUpdateTrackStatus}
          />
        </div>

        {/** 데스크탑 키워드 목록 */}
        <div className="hidden lg:col-span-1 lg:block">
          <TrackKeywordList
            keywords={shop.nplaceRankTrackInfoMap || {}}
            selectedKeywords={selectedTrackInfos}
            onSelectKeyword={handleTrackInfoSelect}
            onSelectAll={handleSelectAll}
            getRankString={getRankString}
            shopId={shopId}
            businessSector={businessSector}
            onDeleteTrack={deleteTrack}
            onUpdateTrackStatus={handleUpdateTrackStatus}
          />
        </div>

        <div className="lg:col-span-3">
          <div className="hidden lg:block">{ShopHeader}</div>
          <div className="mt-5 space-y-6">
            {selectedTrackInfos.size > 0 ? (
              KeywordContent
            ) : (
              <div className="mt-5 flex h-64 items-center justify-center rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
                <p className="text-gray-500">선택된 키워드가 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
