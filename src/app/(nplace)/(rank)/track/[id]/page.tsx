"use client";

import { useState, useEffect } from "react";
import { redirect, useParams, useSearchParams } from "next/navigation";
import React from "react";
import { FileText, LayoutGrid } from "lucide-react";

import { useNplaceRankTrackWithIdViewModel } from "@/viewModel/nplace/NplaceRankTrackWithIdViewModel";
import { useAuthStore } from "@/src/store/provider/StoreProvider";
import { useViewModeStore } from "@/src/store/useViewModeStore";

import TrackKeywordList from "@/src/components/nplrace/rank/track/id/TrackKeywordList";
import TrackReportView from "@/src/components/nplrace/rank/track/id/TrackReportView";
import TrackGridView from "@/src/components/nplrace/rank/track/id/TrackGridView";
import TrackShopHeader from "@/src/components/nplrace/rank/track/id/TrackShopHeader";
import LoadingFallback from "@/src/components/common/LoadingFallback";
import TrackKeywordContent from "@/src/components/nplrace/rank/track/id/TrackKeywordCentent";

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
  } = useNplaceRankTrackWithIdViewModel({ id});

  const isGuest = loginUser === null;
  
  if (isGuest) {
    redirect("/");
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

  if (isLoading) return <LoadingFallback message="로딩중..." />;
  if (error) return <div className="text-red-500">{error.toString()}</div>;
  if (!shop) return <div>상점 정보가 없습니다.</div>;

  return (
    <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="lg:hidden">
          <TrackShopHeader
            shop={shop}
            isUpdatingKeywords={isUpdatingKeywords}
            updateKeywords={updateKeywords}
          />
        </div>

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
            onUpdateTrackStatus={updateTrackStatus}
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
            onUpdateTrackStatus={updateTrackStatus}
          />
        </div>

        <div className="lg:col-span-3">
          <div className="hidden lg:block">
            <TrackShopHeader
              shop={shop}
              isUpdatingKeywords={isUpdatingKeywords}
              updateKeywords={updateKeywords}
            />
          </div>
          <div className="mt-5 space-y-6">
            {selectedTrackInfos.size > 0 ? (
              <TrackKeywordContent
                getRankString={getRankString}
                shop={shop}
                selectedTrackInfos={selectedTrackInfos}
                openAccordions={openAccordions}
                toggleAccordion={toggleAccordion}
                viewMode={viewMode}
                setViewMode={setViewMode}
                getNplaceRankTrackList={getNplaceRankTrackList}
              />
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
