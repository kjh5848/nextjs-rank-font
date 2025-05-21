"use client"

import { useState } from "react";
import GroupAddModal from "@/components/group/GroupAddModal";

interface TrackFilterProps {
  selectedGroup: string;
  setSelectedGroup: (group: string) => void;
  groupList: any[];
  setIsTrackableModalShow: (show: boolean) => void;
}

export default function TrackFilter({
  selectedGroup,
  setSelectedGroup,
  groupList,
  setIsTrackableModalShow,
}: TrackFilterProps) {
  const [isGroupModalOpen, setGroupModalOpen] = useState(false);

  const handleGroupChangeModalShow = () => setGroupModalOpen(true);
  const handleGroupChangeModalClose = () => setGroupModalOpen(false);

  return (
    <div className="mb-4 flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <select
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
          className="focus:outline-hiddenfocus:ring-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 focus:ring-blue-500 sm:w-36"
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
        <button
          onClick={handleGroupChangeModalShow}
          className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 text-white shadow-md hover:shadow-lg sm:w-auto"
        >
          그룹 추가
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
      <GroupAddModal
        open={isGroupModalOpen}
        onClose={handleGroupChangeModalClose}
        onSave={(groupName: string, memo: string) => {
          // 그룹 저장 API 호출
          // 예: await GroupRepository.saveGroup({ group: { serviceSort: "NPLACE_RANK", groupName, memo } })
          // 저장 후 목록 갱신 등 추가 작업
        }}
      />
    </div>
  );
} 