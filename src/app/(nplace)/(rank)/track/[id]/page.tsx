"use client";
import TrackHeader from "./components/TrackHeader";
import RankCheckModal from "./components/RankCheckModal";
import Image from "next/image";

export default function TrackPage() {
  return (
    <main className="container mx-auto">
      <TrackHeader />

      <div className="rounded-lg bg-white p-6 shadow-md">
        <div className="flex flex-col gap-4">
          {/* 상점 이미지 */}
          <div className="relative">
            <div className="h-48 w-full overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-0.5 shadow-md">
              <Image
                src="/img/nplace/shop.png"
                alt="상점 이미지"
                width={1000}
                height={1000}
                className="h-full w-full rounded-lg bg-cover bg-center"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-gray-800">상점명</h2>
              <button
                className="rounded-md bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-1 text-sm font-medium text-blue-800 shadow-xs hover:from-blue-100 hover:to-indigo-100"
                onClick={() => {
                  navigator.clipboard.writeText("SHOP_ID");
                  alert("SHOP_ID 복사되었습니다.");
                }}
              >
                SHOP_ID
              </button>
            </div>
            <p className="mt-2 text-gray-600">주소</p>
            <div className="mt-2 flex gap-4">
              <div className="rounded-md bg-gray-50 px-3 py-1 text-sm text-gray-700">방문자 리뷰(0)</div>
              <div className="rounded-md bg-gray-50 px-3 py-1 text-sm text-gray-700">블로그 리뷰(0)</div>
            </div>
            <div className="mt-2 flex gap-4">
              <div className="rounded-md bg-gray-50 px-3 py-1 text-sm text-gray-700">카테고리</div>
              <div className="rounded-md bg-gray-50 px-3 py-1 text-sm text-gray-700">평점(0)</div>
            </div>
            <div className="mt-2">
              <span className="text-sm text-gray-500">[ 키워드 목록이 없습니다. ]</span>
              <button className="ml-2 rounded-md bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-1 text-sm font-medium text-blue-800 shadow-xs hover:from-blue-100 hover:to-indigo-100">
                갱신
              </button>
            </div>
          </div>

          {/* 삭제 버튼 */}
          <div className="flex justify-end">
            <button className="rounded-md bg-gradient-to-r from-red-50 to-pink-50 px-4 py-2 font-medium text-red-800 shadow-xs hover:from-red-100 hover:to-pink-100">
              플레이스 삭제
            </button>
          </div>
        </div>

        <hr className="my-6" />

        {/* 키워드 추적 영역 */}
        <div className="mt-6">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-md bg-gradient-to-r from-gray-50 to-gray-100 px-3 py-1 text-sm font-medium text-gray-700 shadow-xs">
              추적 중인 지역 및 키워드가 없습니다
            </span>
          </div>

          <div className="mt-4 grid grid-cols-[120px,1fr,58px] gap-2">
            <select className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
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
              className="rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button className="rounded-md bg-gradient-to-r from-blue-500 to-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-xs hover:from-blue-600 hover:to-indigo-600">
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
                  <div className="col-span-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                    순위
                  </div>
                  <div className="col-span-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                    방문자 리뷰
                  </div>
                  <div className="col-span-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                    블로그 리뷰
                  </div>
                  <div className="col-span-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                    저장수
                  </div>
                  <div className="col-span-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                    평점
                  </div>
                  <div className="col-span-1 text-xs font-bold uppercase tracking-wider text-gray-500">
                    일자
                  </div>
                  <div className="col-span-1 text-xs font-bold uppercase tracking-wider text-gray-500">
                    순위비교
                  </div>
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                <div className="cursor-pointer px-3 py-4 transition-all duration-200 hover:bg-blue-50 sm:px-6">
                  <div className="grid grid-cols-12 items-center gap-2 sm:gap-4">
                    <div className="col-span-2 text-sm font-bold text-blue-900">1위</div>
                    <div className="col-span-2 text-sm text-gray-700">100</div>
                    <div className="col-span-2 text-sm text-gray-700">50</div>
                    <div className="col-span-2 text-sm text-gray-700">200</div>
                    <div className="col-span-2 text-sm text-gray-700">4.5</div>
                    <div className="col-span-1 text-sm text-gray-700">2024-01-01</div>
                    <div className="col-span-1">
                      <button className="rounded-md bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-1 text-sm font-medium text-blue-800 shadow-xs hover:from-blue-100 hover:to-indigo-100">
                        비교
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RankCheckModal
        show={false}
        onClose={() => {}}
        selectedPlace={null}
        rankCheckData={[]}
      />
    </main>
  );
}
