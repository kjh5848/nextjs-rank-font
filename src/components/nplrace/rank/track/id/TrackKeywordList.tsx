import { CheckSquare, Square } from "lucide-react";
import AddKeyword from "./TrackAddKeyword";
import { useState, useEffect, useRef } from "react";

interface KeywordListProps {
  keywords: { [key: string]: any };
  selectedKeywords: Set<string>;
  onSelectKeyword: (key: string) => void;
  onSelectAll: () => void;
  getRankString: (rank: number | null) => string;
  shopId: string | undefined;
  businessSector: string | undefined;
  onDeleteTrack: (trackId: string) => void;
  onUpdateTrackStatus: (trackId: string, status: "RUNNING" | "STOP") => void;
}

export default function TrackKeywordList({
  keywords,
  selectedKeywords,
  onSelectKeyword,
  onSelectAll,
  getRankString,
  shopId,
  businessSector,
  onDeleteTrack,
  onUpdateTrackStatus,
}: KeywordListProps) {
 
  const isAllSelected =
    Object.keys(keywords).length > 0 &&
    Object.keys(keywords).every((key) => selectedKeywords.has(key));

  // 모달 상태
  const [openModalId, setOpenModalId] = useState<string | null>(null);
  const [confirmInput, setConfirmInput] = useState("");
  const [modalKeyword, setModalKeyword] = useState("");

  // 삭제 버튼 클릭 시
  const handleDeleteClick = (trackId: string, keyword: string) => {
    setOpenModalId(trackId);
    setModalKeyword(keyword);
    setConfirmInput("");
  };

  // 팝업 내 확인 버튼
  const handleConfirmDelete = (trackId: string, keyword: string) => {
    if (confirmInput === keyword) {
      onDeleteTrack(trackId);
      setOpenModalId(null);
    }
  };

  // 팝업 닫기
  const handleCloseModal = () => {
    setOpenModalId(null);
    setConfirmInput("");
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-lg">
      <div className="border-b border-gray-200 p-4 sm:p-6">
        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0 lg:flex-col lg:items-start lg:space-y-3">
          <div className="flex items-center space-x-2">
            <h3 className="word-break-keep text-base font-semibold text-gray-900 sm:text-lg lg:text-xl">
              키워드 목록
            </h3>
            {shopId && businessSector && (
              <AddKeyword shopId={shopId} businessSector={businessSector} />
            )}
          </div>

          <div className="flex items-center space-x-2 lg:self-end">
            <button
              onClick={onSelectAll}
              className="text-gray-500 hover:text-gray-700"
            >
              {isAllSelected ? (
                <CheckSquare size={20} className="lg:size-6" />
              ) : (
                <Square size={20} className="lg:size-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="h-[calc(50vh-12rem)] overflow-y-auto">
        {Object.keys(keywords).map((key) => {
          const trackInfo = keywords[key];
          console.log(trackInfo.id);
          return (
            <div key={key} className="relative">
              <div
                onClick={() => onSelectKeyword(key)}
                className={`w-full border-b border-gray-100 p-4 text-left transition-colors hover:bg-gray-50 ${
                  selectedKeywords.has(key)
                    ? "bg-blue-50 text-blue-700 hover:bg-blue-100"
                    : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">{key}</div>
                  <div className="flex items-center gap-1">
                    {selectedKeywords.has(key) && (
                      <CheckSquare size={16} className="text-blue-600" />
                    )}
                  </div>
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  {trackInfo?.province} •{" "}
                  {getRankString(trackInfo?.rank || null)}
                </div>
                <div className="ml-2 flex flex-wrap justify-end gap-1">
                  <button
                    className="rounded bg-red-50 px-2 py-1 text-xs text-red-600 hover:bg-red-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClick(trackInfo.id, key);
                    }}
                  >
                    삭제
                  </button>
                  <button
                    className="rounded bg-blue-50 px-2 py-1 text-xs text-gray-600 hover:bg-blue-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      onUpdateTrackStatus(trackInfo.id, "RUNNING");
                    }}
                  >
                    재추적
                  </button>
                  <button
                    className="rounded bg-blue-50 px-2 py-1 text-xs text-blue-600 hover:bg-blue-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      onUpdateTrackStatus(trackInfo.id, "STOP");
                    }}
                  >
                    중단
                  </button>
                </div>
              </div>
              {/* 커스텀 팝업 */}
              {openModalId === trackInfo.id && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                  <div className="w-[350px] rounded-lg border bg-white p-6 shadow-xl">
                    <div className="mb-3 text-lg font-semibold text-gray-800">
                      내순위.com 내용:
                    </div>
                    <div className="mb-2 text-sm text-gray-700">
                      추적을 삭제 하시려면 키워드(
                      <span className="font-bold">{modalKeyword}</span>)를
                      입력해주세요.
                      <br />
                      <span className="text-xs text-gray-500">
                        삭제 후 다시 추적할 경우 과거 차트 데이터는 복구되지
                        않습니다.
                      </span>
                    </div>
                    <input
                      className="mt-2 mb-4 w-full rounded border px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      value={confirmInput}
                      onChange={(e) => setConfirmInput(e.target.value)}
                      placeholder={modalKeyword}
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        className="rounded bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-800 hover:bg-yellow-200"
                        onClick={handleCloseModal}
                      >
                        취소
                      </button>
                      <button
                        className={`rounded bg-yellow-700 px-4 py-2 text-sm font-semibold text-white hover:bg-yellow-800 ${confirmInput !== modalKeyword ? "cursor-not-allowed opacity-50" : ""}`}
                        disabled={confirmInput !== modalKeyword}
                        onClick={() =>
                          handleConfirmDelete(trackInfo.id, modalKeyword)
                        }
                      >
                        확인
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
