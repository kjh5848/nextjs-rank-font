"use client";

import { useEffect, useRef, useState } from "react";

export default function Dashboard() {
  const [filterType, setFilterType] = useState("COMPANY_NAME");
  const [searchResult, setSearchResult] = useState<any>(undefined);
  const [isPending, setIsPending] = useState(false);

  const provinceSelectRef = useRef<HTMLSelectElement>(null);
  const keywordInputRef = useRef<HTMLInputElement>(null);
  const filterValueInputRef = useRef<HTMLInputElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);

  const handleFilterTypeButtonClick = (type: string) => {
    if (filterValueInputRef.current) {
      filterValueInputRef.current.value = "";
    }
    setFilterType(type);
  };

  const handleFilterValueKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && keywordInputRef.current) {
      keywordInputRef.current.focus();
    }
  };

  const handleKeywordKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchButtonRef.current) {
      searchButtonRef.current.click();
    }
  };

  const handleSearch = async () => {
    if (!filterValueInputRef.current?.value) {
      alert("업체명 또는 SHOP_ID를 입력해주세요.");
      filterValueInputRef.current?.focus();
      return;
    }
    if (!keywordInputRef.current?.value) {
      alert("키워드를 입력해주세요.");
      keywordInputRef.current?.focus();
      return;
    }

    setIsPending(true);
    setSearchResult(undefined);

    // API 호출 부분은 실제 엔드포인트로 수정 필요
    try {
      const response = await fetch(
        `/v1/nplace/rank/realtime?keyword=${keywordInputRef.current.value}&filterType=${filterType}&filterValue=${filterValueInputRef.current.value}&province=${provinceSelectRef.current?.value}`
      );
      const data = await response.json();
      setSearchResult(data);
    } catch (error) {
      console.error(error);
      alert("검색 중 오류가 발생했습니다.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="p-4">
      <div className="p-6 rounded-lg bg-rank-light shadow-card">
        <div className="p-4 mb-6 rounded-lg bg-rank-primary/10 text-rank-dark">
          순위를 실시간으로 조회합니다
        </div>

        <div className="flex-col space-y-4 flex">
          <div className="space-x-2 flex">
            <button
              onClick={() => handleFilterTypeButtonClick("COMPANY_NAME")}
              className={`rounded px-4 py-2 transition-colors ${
                filterType !== "SHOP_ID"
                  ? "bg-rank-primary text-white"
                  : "border border-rank-primary bg-white text-rank-primary hover:bg-rank-primary/10"
              }`}
            >
              업체명 검색
            </button>
            <button
              onClick={() => handleFilterTypeButtonClick("SHOP_ID")}
              className={`rounded px-4 py-2 transition-colors ${
                filterType === "SHOP_ID"
                  ? "bg-rank-primary text-white"
                  : "border border-rank-primary bg-white text-rank-primary hover:bg-rank-primary/10"
              }`}
            >
              SHOP_ID 검색
            </button>
          </div>

          <div className="flex-col gap-4 md:flex-row flex">
            <select
              ref={provinceSelectRef}
              className="w-full p-3 focus:outline-none focus:ring-2 focus:ring-rank-primary md:w-48 border rounded"
            >
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

            <div className="flex-1 relative">
              <input
                ref={filterValueInputRef}
                type="text"
                placeholder={filterType === "SHOP_ID" ? "SHOP_ID" : "업체명"}
                className="w-full p-3 focus:outline-none focus:ring-2 focus:ring-rank-primary border rounded"
                onKeyUp={handleFilterValueKeyUp}
              />
              <label className="px-1 text-xs text-gray-600 bg-white -top-2 left-2 absolute">
                {filterType === "SHOP_ID" ? "SHOP_ID" : "업체명"}
              </label>
            </div>

            <div className="flex-1 relative">
              <input
                ref={keywordInputRef}
                type="text"
                placeholder="키워드"
                className="w-full p-3 focus:outline-none focus:ring-2 focus:ring-rank-primary border rounded"
                onKeyUp={handleKeywordKeyUp}
              />
              <label className="px-1 text-xs text-gray-600 bg-white -top-2 left-2 absolute">
                키워드
              </label>
            </div>

            <button
              ref={searchButtonRef}
              onClick={handleSearch}
              disabled={isPending}
              className="w-full px-6 py-3 text-white bg-rank-danger hover:bg-rank-primary/90 disabled:cursor-not-allowed disabled:opacity-50 md:w-auto rounded"
            >
              {isPending ? (
                <div className="items-center justify-center flex">
                  <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin"></div>
                </div>
              ) : (
                "검색 시작"
              )}
            </button>
          </div>
        </div>

        {searchResult === null && (
          <div className="p-4 mt-6 text-center text-gray-600 bg-white rounded-lg border">
            검색 결과가 없습니다. N플레이스 실시간순위조회는 지역과 키워드
            기준으로 300위 내의 업체가 검색됩니다.
          </div>
        )}
      </div>
    </div>
  );
}

// // app/(admin)/dashboard/page.tsx

// import CardBarChart from "@/components/card/CardBarChart";
// import CardLineChart from "@/components/card/CardLineChart";
// import CardPageVisits from "@/components/card/CardPageVisits";
// import CardSocialTraffic from "@/components/card/CardSocialTraffic";

// export default function DashboardPage() {
//   return (
//     <>
//       <div className="flex-wrap flex">
//         <div className="w-full px-4 mb-12 xl:w-8/12 xl:mb-0">
//           < CardLineChart />
//         </div>
//          <div className="w-full px-4 xl:w-4/12">
//           <CardBarChart />
//         </div>
//       </div>
//       <div className="flex-wrap mt-4 flex">
//         <div className="w-full px-4 mb-12 xl:w-8/12 xl:mb-0">
//           <CardPageVisits />
//         </div>
//         <div className="w-full px-4 xl:w-4/12">
//           <CardSocialTraffic />
//         </div>
//       </div>
//     </>
//   );
// }
