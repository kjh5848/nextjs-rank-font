"use client";
import { Suspense, useState, useRef, useEffect } from "react";
import LoadingFallback from "@/src/components/common/LoadingFallback";
import RankCheckModal from "./components/RankCheckModal";
import { useRouter } from "next/navigation";

export default function TrackPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [shopData, setShopData] = useState<any>(null);
  const [selectedInfoEntryKey, setSelectedInfoEntryKey] = useState<string | null>(null);
  const [showRankCheckModal, setShowRankCheckModal] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [rankCheckData, setRankCheckData] = useState<any[]>([]);
  const [view, setView] = useState<"list" | "grid">("list");
  const trackAddProvinceSelectRef = useRef<HTMLSelectElement>(null);
  const trackAddKeywordInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchShopData();
  }, [params.id]);

  const fetchShopData = async () => {
    try {
      const response = await fetch(`/api/nplace/rank/shop/${params.id}`);
      const data = await response.json();
      if (data.code !== 0) {
        alert(data.message);
        router.push("/nplace/rank/track");
        return;
      }
      setShopData(data.data);
      if (Object.keys(data.data.nplaceRankShop.nplaceRankTrackInfoMap).length > 0) {
        setSelectedInfoEntryKey(Object.keys(data.data.nplaceRankShop.nplaceRankTrackInfoMap)[0]);
      }
    } catch (error) {
      console.error("Error fetching shop data:", error);
    }
  };

  const handleRankCheckModalShow = async (trackInfo: any) => {
    setRankCheckData([]);
    setSelectedPlace(trackInfo);
    await fetchRankCheckData(trackInfo);
    setShowRankCheckModal(true);
  };

  const fetchRankCheckData = async (trackInfo: any) => {
    try {
      const keyword = shopData.nplaceRankShop.nplaceRankTrackInfoMap[selectedInfoEntryKey!].keyword;
      const province = shopData.nplaceRankShop.nplaceRankTrackInfoMap[selectedInfoEntryKey!].province;
      
      const response = await fetch("/api/nplace/rank/realtime/list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nplaceRankCheckData: {
            keyword,
            province,
            searchDate: trackInfo.chartDate,
          },
        }),
      });
      
      const data = await response.json();
      if (data.code !== 0) {
        alert(data.message);
        return;
      }
      
      if (data.data.nplaceRankDataList.length === 0) {
        alert("순위 정보가 없습니다.");
      } else {
        setRankCheckData(data.data.nplaceRankDataList);
      }
    } catch (error) {
      console.error("Error fetching rank check data:", error);
    }
  };

  const handleAddTrack = async () => {
    if (!trackAddKeywordInputRef.current?.value) {
      alert("키워드를 입력해주세요.");
      trackAddKeywordInputRef.current?.focus();
      return;
    }

    try {
      const response = await fetch("/api/nplace/rank/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nplaceRankTrackInfo: {
            keyword: trackAddKeywordInputRef.current.value,
            province: trackAddProvinceSelectRef.current?.value,
            shopId: shopData?.nplaceRankShop.shopId || "",
            businessSector: shopData?.nplaceRankShop.businessSector || "",
          },
        }),
      });

      const data = await response.json();
      if (data.code !== 0) {
        alert(data.message);
        return;
      }

      fetchShopData();
      trackAddKeywordInputRef.current.value = "";
      alert("키워드를 추가했습니다.");
    } catch (error) {
      console.error("Error adding track:", error);
    }
  };

  const handleDeleteShop = async () => {
    if (!confirm("정말로 플레이스를 삭제 하시겠습니까?\n삭제 후 다시 등록할 경우 과거 차트 데이터는 복구되지 않습니다.")) {
      return;
    }

    try {
      const response = await fetch(`/api/nplace/rank/shop/${params.id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (data.code !== 0) {
        alert(data.message);
        return;
      }

      alert("상품을 삭제했습니다.");
      router.push("/nplace/rank/track");
    } catch (error) {
      console.error("Error deleting shop:", error);
    }
  };

  const handleKeywordBadgeClick = (entryKey: string) => {
    if (selectedInfoEntryKey !== entryKey) {
      setSelectedInfoEntryKey(entryKey);
    }
  };

  const handleContextMenu = (event: React.MouseEvent, infoId: string) => {
    event.preventDefault();
    // 컨텍스트 메뉴 로직 구현
  };

  const handleUpdateKeyword = async () => {
    try {
      const response = await fetch(`/api/nplace/rank/shop/${params.id}/keyword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nplaceRankShop: {
            id: params.id,
          },
        }),
      });

      const data = await response.json();
      if (data.code !== 0) {
        alert(data.message);
        return;
      }

      fetchShopData();
      alert("키워드 목록을 갱신했습니다.");
    } catch (error) {
      console.error("Error updating keyword:", error);
    }
  };

  const handleDownloadExcel = async () => {
    // Excel 다운로드 로직 구현
  };

  return (
    <main className="container mx-auto">
      <div className="mb-8 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white shadow-lg">
        <h1 className="text-3xl font-bold leading-tight">
          <span className="bg-clip-text text-white">N-PLACE</span>
          <br className="block md:hidden" />
          <span className="md:ml-2">순위추적</span>
        </h1>
      </div>

      <Suspense fallback={<LoadingFallback message="로딩 중..." />}>
        {shopData ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className={shopContainer}>
              {/* 상점 이미지 */}
              <div className="relative">
                <div
                  className={shopImage}
                  style={{ backgroundImage: `url('${shopData.nplaceRankShop.shopImageUrl}')` }}
                />
              </div>

              {/* 상점 정보 */}
              <div>
                <div className="flex items-center gap-2">
                  <h2 className={shopName}>{shopData.nplaceRankShop.shopName}</h2>
                  <Button
                    variant="outline"
                    className={shopId}
                    onClick={() => {
                      navigator.clipboard.writeText(shopData.nplaceRankShop.shopId);
                      alert(`SHOP_ID ${shopData.nplaceRankShop.shopId} 복사되었습니다.`);
                    }}
                  >
                    SHOP_ID
                  </Button>
                </div>
                <p className={address}>
                  {shopData.nplaceRankShop.roadAddress || shopData.nplaceRankShop.address}
                </p>
                <div className={reviewAndCategoryContainer}>
                  <div>방문자 리뷰({shopData.nplaceRankShop.visitorReviewCount})</div>
                  <div>블로그 리뷰({shopData.nplaceRankShop.blogReviewCount})</div>
                </div>
                <div className={reviewAndCategoryContainer}>
                  <div className={categoryAndScore}>{shopData.nplaceRankShop.category}</div>
                  <div className={categoryAndScore}>평점({shopData.nplaceRankShop.scoreInfo})</div>
                </div>
                <div className={categoryAndScore}>
                  [{" "}
                  {shopData.nplaceRankShop.keywordList.length === 0
                    ? "키워드 목록이 없습니다."
                    : shopData.nplaceRankShop.keywordList.join(" ")}{" "}
                  ]
                  <Button
                    variant="outline"
                    className="ml-2"
                    onClick={handleUpdateKeyword}
                  >
                    갱신
                  </Button>
                </div>
              </div>

              {/* 삭제 버튼 */}
              <div className="flex justify-end">
                <Button
                  className="text-red-500 border-red-500 hover:bg-red-50"
                  onClick={handleDeleteShop}
                >
                  플레이스 삭제
                </Button>
              </div>
            </div>

            <hr className="my-6" />

            {/* 키워드 추적 영역 */}
            <div className={entryKeyContainer}>
              <div className="flex flex-wrap gap-2">
                {Object.keys(shopData.nplaceRankShop.nplaceRankTrackInfoMap).length === 0 ? (
                  <Badge className="bg-gray-200 text-gray-700">
                    추적 중인 지역 및 키워드가 없습니다
                  </Badge>
                ) : (
                  Object.keys(shopData.nplaceRankShop.nplaceRankTrackInfoMap).map((entryKey) => {
                    const info = shopData.nplaceRankShop.nplaceRankTrackInfoMap[entryKey];
                    return (
                      <Badge
                        key={entryKey}
                        variant={selectedInfoEntryKey === entryKey ? "warning" : "secondary"}
                        className="cursor-pointer"
                        onClick={() => handleKeywordBadgeClick(entryKey)}
                        onContextMenu={(e) => handleContextMenu(e, info.id)}
                      >
                        {entryKey} / {getRankString(info.rank)}(
                        {info.rankChange === 0
                          ? "-"
                          : info.rankChange < 0
                          ? `▲${Math.abs(info.rankChange)}`
                          : `▽${Math.abs(info.rankChange)}`}
                        )
                      </Badge>
                    );
                  })
                )}
              </div>

              <div className="grid grid-cols-[120px,1fr,58px] gap-2">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="지역 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="서울시">서울시</SelectItem>
                    <SelectItem value="부산시">부산시</SelectItem>
                    {/* 다른 지역 옵션들 */}
                  </SelectContent>
                </Select>
                <Input
                  ref={trackAddKeywordInputRef}
                  type="text"
                  placeholder="키워드"
                />
                <Button onClick={handleAddTrack}>추가</Button>
              </div>
            </div>

            {/* 순위 데이터 표시 영역 */}
            {selectedInfoEntryKey && (
              <div className="mt-6">
                <div className="flex justify-between mb-4">
                  <Button variant="outline" onClick={handleDownloadExcel}>
                    다운로드
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setView("list")}
                      className={view === "list" ? "bg-gray-100" : ""}
                    >
                      리스트 보기
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setView("grid")}
                      className={view === "grid" ? "bg-gray-100" : ""}
                    >
                      그리드 보기
                    </Button>
                  </div>
                </div>

                {view === "list" ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            순위
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            방문자 리뷰
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            블로그 리뷰
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            저장수
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            평점
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            일자
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            순위비교
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {shopData.nplaceRankShop.nplaceRankTrackInfoMap[
                          selectedInfoEntryKey
                        ].nplaceRankTrackList.map((track: any, index: number) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {track.rank > 0 ? track.rank : "순위권 이탈"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {track.rank > 0 ? track.visitorReviewCount : ""}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {track.rank > 0 ? track.blogReviewCount : ""}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {track.rank > 0 ? track.saveCount : ""}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {track.rank > 0 ? track.scoreInfo : ""}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {track.chartDate.split(".")[0].replace("T", " ")}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRankCheckModalShow(track)}
                              >
                                비교
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {shopData.nplaceRankShop.nplaceRankTrackInfoMap[
                      selectedInfoEntryKey
                    ].nplaceRankTrackList.slice(0, 30).map((track: any) => (
                      <div
                        key={track.id}
                        className="border rounded-lg p-4 text-center"
                      >
                        <div className="text-sm">
                          <div>
                            {track.chartDate.slice(5, 10)}{" "}
                            {track.chartDate.slice(11, 16)}
                          </div>
                          <div className="font-bold">
                            {track.rank > 0 ? `${track.rank}위` : "순위권 이탈"}
                          </div>
                          <div className="text-green-600 font-bold">
                            {track.rank > 0 ? track.saveCount : ""}
                          </div>
                          <div className="text-gray-600">
                            블 {track.blogReviewCount}개
                          </div>
                          <div className="text-gray-600">
                            방 {track.visitorReviewCount}개
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div>로딩중...</div>
        )}
      </Suspense>

      <RankCheckModal
        show={showRankCheckModal}
        onClose={() => setShowRankCheckModal(false)}
        selectedPlace={selectedPlace}
        rankCheckData={rankCheckData}
      />
    </main>
  );
}

function getRankString(rank: number | null) {
  if (rank == null) {
    return "추적 대기";
  } else if (rank === -1) {
    return "순위권 이탈";
  } else {
    return `${rank}위`;
  }
}
