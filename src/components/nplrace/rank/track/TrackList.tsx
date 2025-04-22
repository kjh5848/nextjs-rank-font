"use client";
import { useRouter } from "next/navigation";

interface TrackListProps {
  filteredShopList: any[];
  selectedShopList: Set<string>;
  handleShopSelect: (shopId: string) => void;
  handleSelectAll: (checked: boolean) => void;
  getRankString: (rank: number | null) => string;
}

export default function TrackList({
  filteredShopList,
  selectedShopList,
  handleShopSelect,
  handleSelectAll,
  getRankString,
}: TrackListProps) {
  const router = useRouter();

  if (!filteredShopList || filteredShopList.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center rounded-lg bg-gray-50">
        <p className="text-gray-500">해당 그룹에 속한 상점이 없습니다.</p>
      </div>
    );
  }

  const isAllSelected = filteredShopList.length > 0 && 
    filteredShopList.every(shop => selectedShopList.has(shop.id));

  return (
    <>
      <div className="overflow-hidden rounded-xl p-1">
        <div className="rounded-lg bg-white">
          <div className="border-b bg-gradient-to-r from-white to-blue-50 px-3 sm:px-6 py-3">
            <div className="grid grid-cols-12 gap-2 sm:gap-4">
              <div className="col-span-1 flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </div>
              <div className="col-span-2 sm:col-span-1 text-xs font-bold uppercase text-gray-500">
                No.
              </div>
              <div className="col-span-2 text-xs font-bold uppercase text-gray-500 hidden sm:block">
                그룹
              </div>
              <div className="col-span-3 sm:col-span-2 text-xs font-bold uppercase text-gray-500">
                이미지
              </div>
              <div className="col-span-6 text-xs font-bold uppercase text-gray-500">
                플레이스 / 순위
              </div>
            </div>
          </div>
          <div>
            {filteredShopList.map((thisShop) => (
              <div
                key={thisShop.id}
                className={`cursor-pointer border-b border-gray-100 px-3 py-4 transition-all duration-200 hover:bg-blue-50 sm:px-6 ${
                  selectedShopList.has(thisShop.id)
                    ? "bg-blue-50"
                    : "bg-white"
                }`}
                onDoubleClick={() => {
                  router.push(`/nplace/rank/track/${thisShop.id}`);
                }}
              >
                <div className="grid grid-cols-12 items-center gap-2 sm:gap-4">
                  <div className="col-span-1 flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={selectedShopList.has(thisShop.id)}
                      onChange={() => handleShopSelect(thisShop.id)}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>
                  <div className="col-span-2 text-sm font-bold text-blue-900 sm:col-span-1">
                    {thisShop.id}
                  </div>
                  <div className="col-span-2 hidden text-sm text-gray-700 sm:block">
                    {thisShop.groupName}
                  </div>
                  <div className="col-span-3 sm:col-span-2">
                    <div className="h-12 w-12 overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-0.5 shadow-md sm:h-16 sm:w-16">
                      <img
                        className="h-full w-full cursor-pointer rounded-lg bg-gray-100 bg-cover bg-center"
                        style={{
                          backgroundImage: `url('${thisShop.shopImageUrl || "/img/placeholder.png"}')`,
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(
                            thisShop.shopImageUrl || "/img/placeholder.png",
                            "_blank",
                          );
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-span-6">
                    <div className="mb-2 text-sm font-semibold text-gray-800 sm:text-base">
                      {thisShop.shopName}
                      <div className="mt-1 block text-xs text-gray-500 sm:hidden">
                        {thisShop.groupName}
                      </div>
                    </div>
                    {thisShop.nplaceRankTrackInfoList.length === 0 ? (
                      <div className="text-sm text-gray-500">
                        추적 중인 지역 및 키워드가 없습니다.
                        <button className="text-sm text-blue-500">
                          키워드 추가
                        </button>
                      </div>
                    ) : (
                      thisShop.nplaceRankTrackInfoList.map((thisInfo) => (
                        <div
                          key={`${thisShop.id}-${thisInfo.id}`}
                          className="flex flex-wrap gap-1 sm:gap-2"
                        >
                          <span className="inline-flex items-center rounded-md bg-gradient-to-r from-blue-50 to-blue-100 px-2 py-1 text-xs font-medium text-blue-800 shadow-sm sm:px-3">
                            {`[${thisInfo.province}]${thisInfo.keyword}`}
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-md bg-gradient-to-r from-green-50 to-green-100 px-2 py-1 text-xs font-medium text-green-800 shadow-sm sm:px-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="h-3 w-3"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
                              />
                            </svg>
                            {getRankString(thisInfo.rank)}
                            {"("}
                            {thisInfo.rankChange === 0
                              ? "-"
                              : thisInfo.rankChange < 0
                                ? "▲"
                                : "▽"}
                            {`${thisInfo.rankChange !== 0 ? Math.abs(thisInfo.rankChange) : ""})`}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
