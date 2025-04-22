
"use client"

import { useState } from "react";

interface TrackFilterProps {
  selectedGroup: string;
  setSelectedGroup: (group: string) => void;
  groupList: any[];
  handleGroupChangeModalShow: () => void;
  setIsTrackableModalShow: (show: boolean) => void;
}

export default function TrackFilter({
  selectedGroup,
  setSelectedGroup,
  groupList,
  handleGroupChangeModalShow,
  setIsTrackableModalShow,
}: TrackFilterProps) {
  return (
    <div className="mb-4 flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <select
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-36"
        >
          <option value="all">전체</option>
          <option value="기본">기본</option>
          {groupList?.map((group) => (
            <option key={group.id} value={group.groupName}>
              {group.groupName}
            </option>
          ))}
        </select>
        <button
          onClick={handleGroupChangeModalShow}
          className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 text-white shadow-md hover:shadow-lg sm:w-auto"
        >
          그룹 변경
        </button>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          onClick={() => setIsTrackableModalShow(true)}
          className="w-full rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-2 text-white shadow-md hover:shadow-lg sm:w-auto"
        >
          추적가능 플레이스 검색
        </button>
      </div>
    </div>
  );
} 