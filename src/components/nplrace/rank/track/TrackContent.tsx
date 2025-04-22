"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import { useNplaceRankTrackViewModel } from "@/src/viewModel/nplace/nplaceRankTrackViewModel";
import { useForm } from "react-hook-form";
import ExcelUploadModal from "@/components/nplrace/rank/track/ExcelUploadModal";
import { Clock, History } from "lucide-react";

export default function TrackContent() {
  

return (
  <div>
    {/* 2. 안내 배너 */}
    <div className="mb-6 rounded-lg border-l-4 border-blue-500 bg-gradient-to-r from-white to-blue-50 p-3 text-sm text-blue-700 shadow-sm sm:p-4 sm:text-base">
      매일 오후 1시에 순차적으로 순위를 추적합니다
    </div>

    {/* 3. 필터 & 액션 영역 */}
    <div className="mb-6 overflow-hidden rounded-xl border border-blue-100 bg-gradient-to-r from-white to-blue-50 shadow-lg">
      <div className="p-4 sm:p-6">
        {/* 3-1. 그룹 필터 및 변경 버튼 */}
        <div className="mb-4 flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <select className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-36">
              <option>전체</option>
              <option>기본</option>
            </select>
            <button className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 text-white shadow-md hover:shadow-lg sm:w-auto">
              그룹 변경
            </button>
          </div>
          {/* 3-2. 추가 액션 버튼 */}
          <div className="flex flex-col gap-2 sm:flex-row">
            <button className="w-full rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-2 text-white shadow-md hover:shadow-lg sm:w-auto">
              추적가능 플레이스 검색
            </button>
          </div>
        </div>

        <hr className="my-4 border-gray-200" />

        {/* 4. 순위 리스트 영역 */}
        <div className="overflow-hidden rounded-xl p-1">
          <div className="rounded-lg bg-white">
            {/* 4-1. 리스트 헤더 */}
            <div className="border-b bg-gradient-to-r from-white to-blue-50 px-4 py-2 sm:px-6 sm:py-3">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-12 sm:gap-4">
                <div className="col-span-1 text-xs font-bold uppercase text-gray-500">
                  No.
                </div>
                <div className="col-span-2 hidden text-xs font-bold uppercase text-gray-500 sm:block">
                  그룹
                </div>
                <div className="col-span-2 hidden text-xs font-bold uppercase text-gray-500 sm:block">
                  이미지
                </div>
                <div className="col-span-1 text-xs font-bold uppercase text-gray-500 sm:col-span-7">
                  플레이스 / 순위
                </div>
              </div>
            </div>
            {/* 4-2. 리스트 아이템 */}
            <div>
              <div className="cursor-pointer px-4 py-3 transition-all duration-200 hover:bg-blue-50 sm:px-6 sm:py-4">
                <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-12 sm:gap-4">
                  <div className="col-span-1 text-sm font-bold text-blue-900">
                    1
                  </div>
                  <div className="col-span-2 hidden text-sm text-gray-700 sm:block">
                    기본
                  </div>
                  <div className="col-span-2 hidden sm:block">
                    <div className="h-12 w-12 overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-0.5 shadow-md sm:h-16 sm:w-16">
                      <div className="h-full w-full rounded-lg bg-gray-100 bg-cover bg-center" />
                    </div>
                  </div>
                  <div className="col-span-1 sm:col-span-7">
                    <div className="mb-1 text-sm font-semibold text-gray-800 sm:mb-2 sm:text-base">
                      가게 이름
                    </div>
                    <div className="flex flex-wrap gap-1 text-xs sm:gap-2">
                      <span className="inline-flex items-center rounded-md bg-gradient-to-r from-blue-50 to-blue-100 px-2 py-1 text-blue-800 shadow-sm sm:px-3">
                        [부산]국밥
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-md bg-gradient-to-r from-green-50 to-green-100 px-2 py-1 text-green-800 shadow-sm sm:px-3">
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
                        1위(▲1)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* 5. 키워드 통계 테이블 */}
    <div className="overflow-hidden rounded-xl border border-blue-100 bg-gradient-to-r from-white to-blue-50 shadow-lg">
      <div className="overflow-x-auto p-4 sm:p-6">
        <table className="min-w-full divide-y divide-gray-200 text-center text-xs sm:text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th
                rowSpan={2}
                className="px-2 py-2 font-semibold uppercase tracking-wider text-gray-500 sm:px-3 sm:py-3"
              >
                키워드
              </th>
              <th
                colSpan={2}
                className="px-2 py-2 font-semibold uppercase tracking-wider text-gray-500 sm:px-3 sm:py-3"
              >
                월간검색수
              </th>
              <th
                rowSpan={2}
                className="px-2 py-2 font-semibold uppercase tracking-wider text-gray-500 sm:px-3 sm:py-3"
              >
                검색수합계
              </th>
              <th
                colSpan={2}
                className="px-2 py-2 font-semibold uppercase tracking-wider text-gray-500 sm:px-3 sm:py-3"
              >
                월간 블로그 발행
              </th>
              <th
                colSpan={2}
                className="px-2 py-2 font-semibold uppercase tracking-wider text-gray-500 sm:px-3 sm:py-3"
              >
                월평균클릭수
              </th>
              <th
                colSpan={2}
                className="px-2 py-2 font-semibold uppercase tracking-wider text-gray-500 sm:px-3 sm:py-3"
              >
                월평균클릭율
              </th>
              <th
                rowSpan={2}
                className="px-2 py-2 font-semibold uppercase tracking-wider text-gray-500 sm:px-3 sm:py-3"
              >
                경쟁정도
              </th>
              <th
                rowSpan={2}
                className="px-2 py-2 font-semibold uppercase tracking-wider text-gray-500 sm:px-3 sm:py-3"
              >
                월평균노출광고수
              </th>
            </tr>
            <tr>
              <th className="px-2 py-1 font-semibold uppercase text-gray-500 sm:px-3 sm:py-2">
                PC
              </th>
              <th className="px-2 py-1 font-semibold uppercase text-gray-500 sm:px-3 sm:py-2">
                Mobile
              </th>
              <th className="px-2 py-1 font-semibold uppercase text-gray-500 sm:px-3 sm:py-2">
                수량
              </th>
              <th className="px-2 py-1 font-semibold uppercase text-gray-500 sm:px-3 sm:py-2">
                포화도
              </th>
              <th className="px-2 py-1 font-semibold uppercase text-gray-500 sm:px-3 sm:py-2">
                PC
              </th>
              <th className="px-2 py-1 font-semibold uppercase text-gray-500 sm:px-3 sm:py-2">
                Mobile
              </th>
              <th className="px-2 py-1 font-semibold uppercase text-gray-500 sm:px-3 sm:py-2">
                PC
              </th>
              <th className="px-2 py-1 font-semibold uppercase text-gray-500 sm:px-3 sm:py-2">
                Mobile
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {/* 5-1. 예시 행 */}
            <tr className="hover:bg-blue-50">
              <td className="px-2 py-2 text-gray-700 sm:px-3 sm:py-3">국밥</td>
              <td className="px-2 py-2 text-gray-700 sm:px-3 sm:py-3">1200</td>
              <td className="px-2 py-2 text-gray-700 sm:px-3 sm:py-3">2400</td>
              <td className="px-2 py-2 text-gray-700 sm:px-3 sm:py-3">3600</td>
              <td className="px-2 py-2 text-gray-700 sm:px-3 sm:py-3">30</td>
              <td className="px-2 py-2 text-gray-700 sm:px-3 sm:py-3">중</td>
              <td className="px-2 py-2 text-gray-700 sm:px-3 sm:py-3">200</td>
              <td className="px-2 py-2 text-gray-700 sm:px-3 sm:py-3">180</td>
              <td className="px-2 py-2 text-gray-700 sm:px-3 sm:py-3">17%</td>
              <td className="px-2 py-2 text-gray-700 sm:px-3 sm:py-3">14%</td>
              <td className="px-2 py-2 text-gray-700 sm:px-3 sm:py-3">중</td>
              <td className="px-2 py-2 text-gray-700 sm:px-3 sm:py-3">12</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);


}

