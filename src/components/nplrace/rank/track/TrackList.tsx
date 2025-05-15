import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { TrackData } from "@/model/TrackRepository";
import Image from "next/image";
import { useState } from "react";

interface TrackListProps {
  filteredShopList: any[];
  selectedShopList: Set<string>;
  handleShopSelect: (shopId: string) => void;
  handleSelectAll: (checked: boolean) => void;
  getRankString: (rank: number | null) => string;
}

interface TrackInfo {
  nomadscrapNplaceRankTrackInfoId: string;
  province: string;
  keyword: string;
  rank: number;
  rankChange: number;
}

export default function TrackList({
  filteredShopList,
  selectedShopList,
  handleShopSelect,
  handleSelectAll,
  getRankString,
}: TrackListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialViewMode = searchParams.get("view") === "list" ? "list" : "grid";
  const [viewMode, setViewMode] = useState<"grid" | "list">(initialViewMode);

  if (!filteredShopList || filteredShopList.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center bg-gray-50">
        <p className="text-gray-500">해당 그룹에 속한 상점이 없습니다.</p>
      </div>
    );
  }

  const isAllSelected = filteredShopList.length > 0 && 
    filteredShopList.every(shop => selectedShopList.has(shop.id));

  const handleShopClick = (id: any): void => {
    router.push(`/track/${id}`);
  };

  const handleViewModeChange = (mode: "grid" | "list") => {
    setViewMode(mode);
    const params = new URLSearchParams(window.location.search);
    params.set("view", mode);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const renderShopContent = (shop: any) => {
    if (viewMode === 'grid') {
      return (
        <>
          <div className="absolute left-2 top-2 z-10">
            <div className="w-8 h-8 sm:w-4 sm:h-4 flex items-center justify-center">
              <input 
                type="checkbox"
                className="h-6 w-6 sm:h-4 sm:w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500 cursor-pointer"
                checked={selectedShopList.has(shop.id)}
                onChange={() => handleShopSelect(shop.id)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
          
          <div className="aspect-[4/3] w-full overflow-hidden">
            <Image
              src={shop.shopImageUrl || "/placeholder.jpg"}
              alt={shop.shopName}
              width={400}
              height={300}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
              priority
            />
          </div>

          <div className="p-4">
            <div className="mb-2">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {shop.shopName}
                </h3>
                <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                  {shop.groupName}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500 truncate">
                {shop.roadAddress}
              </p>
            </div>

            <div className="space-y-2">
              {shop.nplaceRankTrackInfoList &&
              shop.nplaceRankTrackInfoList.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {shop.nplaceRankTrackInfoList.map((track: TrackInfo) => (
                    <div
                      key={`${shop.id}-${track.nomadscrapNplaceRankTrackInfoId}`}
                      className="flex items-center w-full sm:w-auto"
                    >
                      <span className="inline-flex items-center justify-between w-full sm:w-auto rounded-md bg-gradient-to-r from-blue-50 to-blue-100 px-2 py-1 text-xs font-medium text-blue-800 shadow-xs">
                        <span className="truncate max-w-[200px]">
                          {`[${track.province}]${track.keyword}`}
                        </span>
                        <span className="ml-2 shrink-0 inline-flex items-center gap-1 rounded-md bg-gradient-to-r from-green-50 to-green-100 px-2 py-1 text-xs font-medium text-green-800 shadow-xs">
                          {getRankString(track.rank)}
                          {track.rankChange !== 0 && (
                            <span
                              className={
                                track.rankChange < 0
                                  ? "text-red-500"
                                  : "text-blue-500"
                              }
                            >
                              {track.rankChange < 0 ? "▲" : "▼"}
                              {Math.abs(track.rankChange)}
                            </span>
                          )}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-500">
                  추적 중인 키워드가 없습니다.
                </div>
              )}
            </div>
          </div>
        </>
      );
    }

    return (
      <div className="flex items-start p-4 flex-col sm:flex-row">
        <div className="w-8 h-8 sm:w-4 sm:h-4 flex items-center justify-center">
          <input 
            type="checkbox"
            className="h-6 w-6 sm:h-4 sm:w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500 cursor-pointer"
            checked={selectedShopList.has(shop.id)}
            onChange={() => handleShopSelect(shop.id)}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
        
        <div className="hidden sm:block ml-0 sm:ml-4 mt-4 sm:mt-4 flex-shrink-0 w-full sm:w-auto">
          <Image
            src={shop.shopImageUrl || "/placeholder.jpg"}
            alt={shop.shopName}
            width={80}
            height={80}
            className="h-20 w-full sm:w-20 rounded-lg object-cover"
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
            priority
          />
        </div>

        <div className="ml-0 sm:ml-4 mt-2 sm:mt-0 flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {shop.shopName}
            </h3>
            <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
              {shop.groupName}
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500 truncate">
            {shop.roadAddress}
          </p>

          <div className="mt-3">
            {shop.nplaceRankTrackInfoList &&
            shop.nplaceRankTrackInfoList.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {shop.nplaceRankTrackInfoList.map((track: TrackInfo) => (
                  <div
                    key={`${shop.id}-${track.nomadscrapNplaceRankTrackInfoId}`}
                    className="flex items-center"
                  >
                    <span className="inline-flex items-center rounded-md bg-gradient-to-r from-blue-50 to-blue-100 px-2 py-1 text-xs font-medium text-blue-800 shadow-xs">
                      {`[${track.province}]${track.keyword}`}
                      <span className="ml-2 inline-flex items-center gap-1 rounded-md bg-gradient-to-r from-green-50 to-green-100 px-2 py-1 text-xs font-medium text-green-800 shadow-xs">
                        {getRankString(track.rank)}
                        {track.rankChange !== 0 && (
                          <span
                            className={
                              track.rankChange < 0
                                ? "text-red-500"
                                : "text-blue-500"
                            }
                          >
                            {track.rankChange < 0 ? "▲" : "▼"}
                            {Math.abs(track.rankChange)}
                          </span>
                        )}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-gray-500">
                추적 중인 키워드가 없습니다.
              </div>
            )}
          </div>
        </div>

        <button
          className="ml-0 sm:ml-4 mt-4 sm:mt-0 px-3 py-1 text-blue-500 hover:text-blue-600 w-full sm:w-auto"
          onClick={(e) => {
            e.stopPropagation();
            handleShopClick(shop.id);
          }}
        >
          상세보기
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="sticky top-0 z-10 flex flex-col sm:flex-row items-center justify-between border-b border-gray-200 bg-white px-3 py-2 gap-2">
        <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center">
            <div className="w-8 h-8 sm:w-4 sm:h-4 flex items-center justify-center">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={(e) => handleSelectAll(e.target.checked)}
                className="h-6 w-6 sm:h-4 sm:w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500 cursor-pointer"
              />
            </div>
            <span className="ml-2 text-sm text-gray-600">전체 선택</span>
          </div>
          <span className="text-sm text-gray-400">
            총 {filteredShopList.length}개
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleViewModeChange('grid')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'grid' 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-500 hover:bg-gray-100'
            }`}
            title="그리드 보기"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            onClick={() => handleViewModeChange('list')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'list' 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-500 hover:bg-gray-100'
            }`}
            title="리스트 보기"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <div className={`${viewMode === 'grid' ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "divide-y divide-gray-100"} overflow-auto max-h-[calc(100vh-8rem)]`}>
        {filteredShopList.map((shop) => (
          <div
            key={shop.id}
            className={
              viewMode === 'grid'
                ? `group relative overflow-hidden rounded-lg border bg-white transition-all hover:shadow-lg ${
                    selectedShopList.has(shop.id) ? "border-blue-500 ring-1 ring-blue-500" : "border-gray-200"
                  }`
                : `bg-white transition-all hover:bg-gray-50 ${
                    selectedShopList.has(shop.id) ? "bg-blue-50" : ""
                  }`
            }
            onClick={() => handleShopClick(shop.id)}
          >
            {renderShopContent(shop)}
          </div>
        ))}
      </div>
    </div>
  );
}
