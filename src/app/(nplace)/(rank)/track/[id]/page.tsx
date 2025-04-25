"use client";

import { useState, useEffect } from "react";
import TrackHeader from "./components/TrackHeader";
import RankCheckModal from "./components/RankCheckModal";
import Image from "next/image";
import { useNplaceRankTrackWithIdViewModel } from "@/viewModel/nplace/NplaceRankTrackWithIdViewModel";
import { useParams } from "next/navigation";
import { TrackInfo, TrackData } from "@/model/TrackRepository";

export default function TrackDetailPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [selectedProvince, setSelectedProvince] = useState("");
  const [keyword, setKeyword] = useState("");
  const [showRankCheckModal, setShowRankCheckModal] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<any>(null);
  const [selectedTrackInfo, setSelectedTrackInfo] = useState<string | null>(null);


  const {
    shop,
    rankCheckData,
    isLoading,
    error,
    refetch,
    deleteShop,
    addTrack,
    deleteTrack,
    updateTrackStatus,
    updateKeywords,
    isUpdatingKeywords,
    getNplaceRankTrackList,
    getRankString,
  } = useNplaceRankTrackWithIdViewModel({ id, keyword: "", province: "" });

  // 첫 번째 트랙 정보 키를 선택 (있다면)
  useEffect(() => {
    if (shop && shop.nplaceRankTrackInfoMap) {
      const firstKey = Object.keys(shop.nplaceRankTrackInfoMap)[0] || null;
      setSelectedTrackInfo(firstKey);
    }
  }, [shop]);

  const handleAddTrack = async () => {
    if (!selectedProvince || !keyword) return;
    await addTrack({
      keyword,
      province: selectedProvince,
      shopId: id,
      businessSector: shop?.businessSector || ""
    });
    setKeyword("");
  };

  const handleDeleteShop = async () => {
    if (window.confirm("정말로 이 플레이스를 삭제하시겠습니까?")) {
      await deleteShop();
      window.location.href = "/nplace/rank/track";
    }
  };

  const handleUpdateKeywords = async () => {
    await updateKeywords();
  };

  const trackList = selectedTrackInfo ? getNplaceRankTrackList(selectedTrackInfo) : [];

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생했습니다: {error.message}</div>;

  return (
    <main className="mx-auto">
      <TrackHeader />

      <div className="rounded-lg bg-gradient-to-r from-white to-blue-50 p-6 shadow-md">
        <div className="flex flex-col gap-4 lg:flex-row lg:gap-4">
          {/* 상점 이미지 */}
          <div className="relative lg:w-1/2">
            <div className="h-48 w-full overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-0.5 shadow-md">
              <Image
                src={shop?.shopImageUrl || "/img/nplace/shop.png"}
                alt="상점 이미지"
                width={1000}
                height={1000}
                className="h-full w-full rounded-lg bg-cover bg-center"
              />
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-gray-800">
                {shop?.shopName}
              </h2>
              <button
                className="rounded-md bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-1 text-sm font-medium text-blue-800 shadow-xs hover:from-blue-100 hover:to-indigo-100"
                onClick={() => {
                  navigator.clipboard.writeText(shop?.shopId || "");
                  alert("상점 ID가 복사되었습니다.");
                }}
              >
                {shop?.shopId}
              </button>
            </div>

            <div className="mt-2">
              <p className="text-wrap text-gray-600">
                {shop?.roadAddress || shop?.address}
              </p>
            </div>

            <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-4 lg:grid-cols-2">
              <div className="rounded-md bg-gradient-to-r from-gray-200 to-gray-100 px-3 py-1 text-sm text-gray-700 shadow-sm">
                방문자 리뷰({shop?.visitorReviewCount || 0})
              </div>
              <div className="rounded-md bg-gradient-to-r from-gray-200 to-gray-100 px-3 py-1 text-sm text-gray-700 shadow-sm">
                블로그 리뷰({shop?.blogReviewCount || 0})
              </div>
              <div className="rounded-md bg-gradient-to-r from-gray-200 to-gray-100 px-3 py-1 text-sm text-gray-700 shadow-sm">
                {shop?.category || "카테고리 없음"}
              </div>
              <div className="rounded-md bg-gradient-to-r from-gray-200 to-gray-100 px-3 py-1 text-sm text-gray-700 shadow-sm">
                평점({shop?.scoreInfo || 0})
              </div>
            </div>

            <div className="mt-4 border-t border-gray-300"></div>

            <div className="">
              <div className="flex items-center gap-2">
                <p className="my-4 text-sm text-gray-800">대표키워드</p>
                <button
                  className="ml-2 rounded-md bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-1 text-sm font-medium text-blue-800 shadow-xs hover:from-blue-100 hover:to-indigo-100"
                  onClick={handleUpdateKeywords}
                  disabled={isUpdatingKeywords}
                >
                  {isUpdatingKeywords ? "갱신중..." : "갱신"}
                </button>
              </div>

              {shop?.keywordList && shop.keywordList.length > 0 ? (
                <div className="mt-1 flex flex-wrap gap-2">
                  {shop.keywordList.map((keyword: string, index: number) => (
                    <span
                      key={index}
                      className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              ) : (
                <div>
                  <span className="text-sm text-gray-500">
                    [ 키워드 목록이 없습니다. ]
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 삭제 버튼 */}
        <div className="mt-4 flex justify-end">
          <button
            className="rounded-md bg-gradient-to-r from-red-50 to-pink-50 px-4 py-2 font-medium text-red-800 shadow-xs hover:from-red-100 hover:to-pink-100"
            onClick={handleDeleteShop}
          >
            플레이스 삭제
          </button>
        </div>
        <hr className="my-6" />

        {/* 키워드 추적 영역 */}
        <div className="mt-6">
          <div className="flex flex-wrap gap-2">
            {shop &&
              shop.nplaceRankTrackInfoMap &&
              Object.keys(shop.nplaceRankTrackInfoMap).map((key, index) => {
                const trackInfo = shop.nplaceRankTrackInfoMap?.[key];
                return (
                  <span
                    key={index}
                    className={`cursor-pointer rounded-md px-3 py-1 text-sm font-medium shadow-xs ${
                      selectedTrackInfo === key
                        ? "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800"
                        : "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700"
                    }`}
                    onClick={() => setSelectedTrackInfo(key)}
                  >
                    {key} ({getRankString(trackInfo?.rank || null)})
                  </span>
                );
              })}
          </div>

          <div className="mt-4 flex flex-col gap-2 lg:flex-row lg:gap-2">
            <select
              className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
            >
              <option value="">지역 선택</option>
              <option value="서울시">서울시</option>
              <option value="부산시">부산시</option>
              <option value="대구시">대구시</option>
              <option value="인천시">인천시</option>
              <option value="광주시">광주시</option>
              <option value="대전시">대전시</option>
              <option value="울산시">울산시</option>
              <option value="세종시">세종시</option>
              <option value="경기도">경기도</option>
              <option value="강원도">강원도</option>
              <option value="충청북도">충청북도</option>
              <option value="충청남도">충청남도</option>
              <option value="전라북도">전라북도</option>
              <option value="전라남도">전라남도</option>
              <option value="경상북도">경상북도</option>
              <option value="경상남도">경상남도</option>
              <option value="제주도">제주도</option>
            </select>
            <input
              type="text"
              placeholder="키워드"
              className="flex-auto rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button
              className="flex-auto rounded-md bg-gradient-to-r from-blue-500 to-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-xs hover:from-blue-600 hover:to-indigo-600"
              onClick={handleAddTrack}
              disabled={!selectedProvince || !keyword}
            >
              추가
            </button>
          </div>
        </div>

        {/* 순위 데이터 표시 영역 */}
        <div className="mt-6">
          <div className="mb-4 flex justify-between">
            <button className="rounded-md bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 text-sm font-medium text-blue-800 shadow-xs hover:from-blue-100 hover:to-indigo-100">
              다운로드
            </button>
            <div className="flex gap-2">
              <button className="rounded-md bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-2 text-sm font-medium text-gray-700 shadow-xs">
                리스트 보기
              </button>
              <button className="rounded-md bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 text-sm font-medium text-blue-800 shadow-xs hover:from-blue-100 hover:to-indigo-100">
                그리드 보기
              </button>
            </div>
          </div>

          {/* 리스트 뷰 */}
          <div className="overflow-hidden rounded-xl">
            <div className="rounded-lg bg-white">
              <div className="border-b bg-gradient-to-r from-white to-blue-50 px-3 py-3 sm:px-6">
                <div className="grid grid-cols-12 gap-2 sm:gap-4">
                  <div className="col-span-2 text-xs font-bold tracking-wider text-gray-500 uppercase">
                    순위
                  </div>
                  <div className="col-span-2 text-xs font-bold tracking-wider text-gray-500 uppercase">
                    방문자 리뷰
                  </div>
                  <div className="col-span-2 text-xs font-bold tracking-wider text-gray-500 uppercase">
                    블로그 리뷰
                  </div>
                  <div className="col-span-2 text-xs font-bold tracking-wider text-gray-500 uppercase">
                    저장수
                  </div>
                  <div className="col-span-2 text-xs font-bold tracking-wider text-gray-500 uppercase">
                    평점
                  </div>
                  <div className="col-span-1 text-xs font-bold tracking-wider text-gray-500 uppercase">
                    일자
                  </div>
                  <div className="col-span-1 text-xs font-bold tracking-wider text-gray-500 uppercase">
                    순위비교
                  </div>
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                {trackList.length === 0 ? (
                  <div className="flex h-32 items-center justify-center rounded-lg bg-gray-50">
                    <p className="text-gray-500">
                      추적 중인 키워드가 없습니다.
                    </p>
                  </div>
                ) : (
                  <div>
                    {trackList.map((data: TrackData, index: number) => (
                      <div
                        key={index}
                        className="cursor-pointer px-3 py-4 transition-all duration-200 hover:bg-blue-50 sm:px-6"
                      >
                        <div className="grid grid-cols-12 items-center gap-2 sm:gap-4">
                          <div className="col-span-2 text-sm font-bold text-blue-900">
                            {getRankString(data.rank)}
                          </div>
                          <div className="col-span-2 text-sm text-gray-700">
                            {data.visitorReviewCount}
                          </div>
                          <div className="col-span-2 text-sm text-gray-700">
                            {data.blogReviewCount}
                          </div>
                          <div className="col-span-2 text-sm text-gray-700">
                            {data.saveCount}
                          </div>
                          <div className="col-span-2 text-sm text-gray-700">
                            {data.scoreInfo}
                          </div>
                          <div className="col-span-1 text-sm text-gray-700">
                            {new Date(data.chartDate).toLocaleDateString()}
                          </div>
                          <div className="col-span-1">
                            <button
                              className="rounded-md bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-1 text-sm font-medium text-blue-800 shadow-xs hover:from-blue-100 hover:to-indigo-100"
                              onClick={() => {
                                setSelectedTrack(data);
                                setShowRankCheckModal(true);
                              }}
                            >
                              비교
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <RankCheckModal
        show={showRankCheckModal}
        onClose={() => setShowRankCheckModal(false)}
        selectedPlace={selectedTrack}
        rankCheckData={[]}
      />
    </main>
  );
}
