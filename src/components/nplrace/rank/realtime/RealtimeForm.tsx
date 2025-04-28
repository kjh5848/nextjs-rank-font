"use client";

import { useState, useEffect, useRef } from "react";
import { useAuthStore } from "@/src/store/provider/StoreProvider";
import { Search, MapPin, ChevronDown, History, X, Clock } from "lucide-react";
import RealtimeResultItem from "./RealtimeResultItem";
import {
  useExecuteSearch,
  useNplaceSearch,
  getRecentSearches,
  getRecentSearchResults,
  SearchParams,
  nplaceRankSearchShop,
} from "@/src/viewModel/nplace/nplaceRankReailTimeViewModel";

import { useClickAway } from "react-use";

export default function RealtimeForm() {
  const { user } = useAuthStore();

  const [location, setLocation] = useState("서울시");
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [searchType, setSearchType] = useState<"업체명" | "SHOP_ID">("업체명");
  const [recentSearches, setRecentSearches] = useState<SearchParams[]>([]);
  const [showRecentSearches, setShowRecentSearches] = useState(false);
  const [recentSearchResults, setRecentSearchResults] = useState<
    {
      params: SearchParams;
      results: nplaceRankSearchShop[];
      timestamp: number;
    }[]
  >([]);

  // 현재 검색 파라미터
  const searchParams: SearchParams = {
    keyword,
    filterType: searchType === "SHOP_ID" ? "SHOP_ID" : "COMPANY_NAME",
    filterValue,
    province: location,
  };

  // 검색 결과 캐싱 쿼리
  const {
    data: searchResult,
    isLoading: isQueryLoading,
    error: queryError,
    refetch,
  } = useNplaceSearch(searchParams);

  // 검색 실행 뮤테이션
  const {
    mutate: executeSearch,
    isPending: isMutationLoading,
    error: mutationError,
  } = useExecuteSearch();

  // 최종 로딩 상태 및 에러
  const isLoading = isQueryLoading || isMutationLoading;
  const error = queryError || mutationError;

  //박스이외 클릭시 닫음
  const recentBoxRef = useRef(null);
  const locationDropdownRef = useRef(null);
  
  useClickAway(recentBoxRef, () => {
    setShowRecentSearches(false);
  });
  
  useClickAway(locationDropdownRef, () => {
    setIsLocationDropdownOpen(false);
  });

  // 컴포넌트 마운트 시 최근 검색어와 검색 결과 불러오기
  useEffect(() => {
    if (typeof window !== "undefined") {
      setRecentSearches(getRecentSearches());
      setRecentSearchResults(getRecentSearchResults());
    }
  }, []);

  // 검색 실행 핸들러
  const handleSearch = async () => {
    if (!user) {
      alert("로그인 후 이용 가능합니다.");
      return;
    }

    if (!filterValue.trim()) {
      alert("업체명 또는 SHOP_ID를 입력해주세요.");
      return;
    }

    if (!keyword.trim()) {
      alert("키워드를 입력해주세요.");
      return;
    }

    // 뮤테이션으로 검색 실행 (결과는 자동으로 캐싱됨)
    executeSearch(searchParams, {
      onSuccess: () => {
        // 최근 검색어 목록 업데이트
        setRecentSearches(getRecentSearches());
        // 최근 검색 결과 업데이트
        setRecentSearchResults(getRecentSearchResults());
        setShowRecentSearches(false);
      },
      onError: (error) => {
        alert(
          error instanceof Error
            ? error.message
            : "검색 중 오류가 발생했습니다.",
        );
      },
    });
  };

  // 최근 검색어 클릭 핸들러
  const handleRecentSearchClick = (params: SearchParams) => {
    setLocation(params.province);
    setFilterValue(params.filterValue);
    setKeyword(params.keyword);
    setSearchType(params.filterType === "SHOP_ID" ? "SHOP_ID" : "업체명");
    setShowRecentSearches(false);
      
    // 즉시 검색 실행
    executeSearch(params);
  };

  // 시간 포맷팅 함수
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;
  };

  const locations = [
    "서울시",
    "경기도",
    "인천시",
    "부산시",
    "대구시",
    "대전시",
    "광주시",
    "울산시",
    "세종시",
    "강원도",
    "충청북도",
    "충청남도",
    "전라북도",
    "전라남도",
    "경상북도",
    "경상남도",
    "제주도",
  ];

  return (
    <>
      {/* 최근 검색 결과 카드 표시 */}
      {/* 구독자마다 검색 저장수를 상이하게 하여 요금 업셀링 유도 
      1. 무료는 3개 */}
      {recentSearchResults.length > 0 && (
        <div className="mx-auto mb-8 w-full max-w-7xl">
          <div className="mb-4 flex items-center">
            <Clock size={18} className="mr-2 text-blue-500" />
            <h3 className="text-lg font-bold text-gray-700">최근 검색 결과</h3>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {recentSearchResults.map((item, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-200 bg-gradient-to-r from-white to-blue-50 p-4 shadow-xs"
              >
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center">
                    <History size={14} className="mr-2 text-blue-500" />
                    <span className="text-sm font-medium">
                      {item.params.filterType === "SHOP_ID"
                        ? "SHOP_ID: "
                        : "업체명: "}
                      {item.params.filterValue}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {item.timestamp ? formatTime(item.timestamp) : ""}
                  </span>
                </div>

                <div className="mb-2 flex flex-wrap gap-1">
                  <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
                    {item.params.province}
                  </span>
                  <span className="rounded-full bg-purple-100 px-2 py-1 text-xs text-purple-800">
                    {item.params.keyword}
                  </span>
                  
                </div>

                {item.results && item.results.length > 0 ? (
                  <div className="border-t border-gray-100 pt-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-gray-700">
                        "{item.results[0].trackInfo.shopName}"{" "}
                        {item.results[0].rankInfo.rank}위
                      </span>
                      <button
                        className="rounded-md bg-blue-500 px-2 py-1 text-xs text-white hover:bg-blue-600"
                        onClick={() => handleRecentSearchClick(item.params)}
                      >
                        다시 검색
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-sm text-gray-500">
                    결과 없음
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mx-auto w-full max-w-7xl rounded-xl border border-blue-100 bg-gradient-to-r from-white to-blue-50 p-6 shadow-lg">
        <div className="mb-6">
          <h2 className="mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-xl font-bold text-transparent">
            N-PLACE 실시간 순위 조회
          </h2>
          <p className="text-sm text-gray-500">
            지역 + 키워드로 원하는 업체를 검색해보세요
          </p>
        </div>

        {/* 검색 타입 선택 */}
        <div className="mb-4 flex space-x-2">
          {["업체명", "SHOP_ID"].map((type) => (
            <button
              key={type}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all md:w-auto ${
                searchType === type
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
                  : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setSearchType(type as "업체명" | "SHOP_ID")}
            >
              {type} 검색
            </button>
          ))}
        </div>

        {/* 필드 입력 */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-12">
          {/* 지역 선택 */}
          <div className="relative md:col-span-3">
            <div
              onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
              className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white p-3 shadow-xs transition-all hover:shadow"
            >
              <div className="flex items-center">
                <MapPin size={18} className="mr-2 text-blue-500" />
                <span className="text-gray-700">{location}</span>
              </div>
              <ChevronDown
                size={18}
                className={`text-blue-500 transition-transform ${isLocationDropdownOpen ? "rotate-180" : ""}`}
              />
            </div>
            {isLocationDropdownOpen && (
              <div
                ref={locationDropdownRef}
                className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg"
              >
                {locations.map((loc) => (
                  <div
                    key={loc}
                    className="cursor-pointer p-3 hover:bg-blue-50"
                    onClick={() => {
                      setLocation(loc);
                      setIsLocationDropdownOpen(false);
                    }}
                  >
                    {loc}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 업체명 or SHOP_ID */}
          <div className="relative md:col-span-4">
            <div className="relative">
              <input
                type="text"
                placeholder={
                  searchType === "SHOP_ID" ? "SHOP_ID 입력" : "업체명 입력"
                }
                className="w-full rounded-lg border border-gray-200 bg-white p-3 text-gray-700 placeholder-gray-400"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                onFocus={() => {
                  if (recentSearches.length > 0) {
                    setShowRecentSearches(true);
                  }
                }}
              />
              {filterValue && (
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setFilterValue("")}
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* 최근 검색어 표시 */}
            {showRecentSearches && recentSearches.length > 0 && (
              <div
                ref={recentBoxRef}
                className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg"
              >
                <div className="border-b border-gray-100 p-2 text-xs font-medium text-gray-500">
                  최근 검색어 (
                  {recentSearches.length > 3 ? 3 : recentSearches.length}개)
                </div>
                {recentSearches.slice(0, 3).map((search, index) => (
                  <div
                    key={index}
                    className="flex cursor-pointer items-center border-b border-gray-50 p-3 hover:bg-blue-50"
                    onClick={() => handleRecentSearchClick(search)}
                  >
                    <History size={14} className="mr-2 text-blue-500" />
                    <div>
                      <span className="text-sm font-medium">
                        {search.filterType === "SHOP_ID"
                          ? "SHOP_ID: "
                          : "업체명: "}
                        {search.filterValue}
                      </span>
                      <span className="ml-2 text-xs text-gray-500">
                        키워드: {search.keyword}
                      </span>
                    </div>
                  </div>
                ))}
                <div
                  className="cursor-pointer p-2 text-center text-xs text-blue-500 hover:text-blue-700"
                  onClick={() => setShowRecentSearches(false)}
                >
                  닫기
                </div>
              </div>
            )}
          </div>

          {/* 키워드 */}
          <div className="relative md:col-span-3">
            <div className="relative">
              <input
                type="text"
                placeholder="키워드"
                className="w-full rounded-lg border border-gray-200 bg-white p-3 text-gray-700 placeholder-gray-400"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              {keyword && (
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setKeyword("")}
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* 검색 버튼 */}
          <div className="relative md:col-span-2">
            <button
              className={`flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-3 font-medium text-white shadow-md transition-all hover:shadow-lg md:w-auto ${isLoading ? "cursor-not-allowed opacity-70" : ""}`}
              onClick={handleSearch}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg
                    className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  검색 중...
                </>
              ) : (
                <>
                  <Search size={18} className="mr-2" />
                  검색 시작
                </>
              )}
            </button>
          </div>
        </div>

        {/* 에러 메시지 */}
        {error && (
          <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-red-700">
            {error instanceof Error
              ? error.message
              : "검색 중 오류가 발생했습니다."}
          </div>
        )}

        {/* 검색 결과 */}
        {searchResult && searchResult.length > 0 ? (
          <div className="mt-6 space-y-4">
            {searchResult.map((item, index) => (
              <RealtimeResultItem key={index} item={item} />
            ))}
          </div>
        ) : searchResult && searchResult.length === 0 ? (
          <div className="mt-6 rounded-lg border border-gray-200 bg-white p-4 text-center text-gray-500">
            검색 결과가 없습니다.
          </div>
        ) : null}
      </div>
    </>
  );
}
