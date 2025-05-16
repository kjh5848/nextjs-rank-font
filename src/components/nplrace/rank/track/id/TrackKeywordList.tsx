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
  const [modalType, setModalType] = useState<"delete" | "stop" | "resume" | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  // 삭제 버튼 클릭 시
  const handleDeleteClick = (trackId: string, keyword: string) => {
    setOpenModalId(trackId);
    setModalKeyword(keyword);
    setModalType("delete");
    setConfirmInput("");
  };

  // 추적중단 버튼 클릭 시
  const handleStopClick = (trackId: string, keyword: string) => {
    setOpenModalId(trackId);
    setModalKeyword(keyword);
    setModalType("stop");
    setConfirmInput("");
  };

  // 재추적 버튼 클릭 시
  const handleResumeClick = (trackId: string, keyword: string) => {
    setOpenModalId(trackId);
    setModalKeyword(keyword);
    setModalType("resume");
    setConfirmInput("");
  };

  // 팝업 내 확인 버튼
  const handleConfirmModal = async (trackId: string, keyword: string) => {
    if (confirmInput !== keyword) return;
    try {
      if (modalType === "delete") {
        await onDeleteTrack(trackId);
        setActionMessage("삭제가 완료되었습니다.");
      } else if (modalType === "stop") {
        await onUpdateTrackStatus(trackId, "STOP");
        setActionMessage("추적이 중단되었습니다.");
      } else if (modalType === "resume") {
        await onUpdateTrackStatus(trackId, "RUNNING");
        setActionMessage("재추적이 시작되었습니다.");
      }
    } catch (e: any) {
     if(e.code === "-1"){
      console.log(e);
       setActionMessage(e?.message);
     }
    }
    setTimeout(() => setActionMessage(null), 2500);
    setOpenModalId(null);
  };

  // 팝업 닫기
  const handleCloseModal = () => {
    setOpenModalId(null);
    setConfirmInput("");
    setModalType(null);
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
                      handleResumeClick(trackInfo.id, key);
                    }}
                  >
                    재추적
                  </button>
                  <button
                    className="rounded bg-blue-50 px-2 py-1 text-xs text-blue-600 hover:bg-blue-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStopClick(trackInfo.id, key);
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
                      {modalType === "delete" && (
                        <>
                          추적을 삭제 하시려면 키워드(<span className="font-bold">{modalKeyword}</span>)를 입력해주세요.<br />
                          <span className="text-xs text-gray-500">삭제 후 다시 추적할 경우 과거 차트 데이터는 복구되지 않습니다.</span>
                        </>
                      )}
                      {modalType === "stop" && (
                        <>
                          추적을 <span className="font-bold">중단</span> 하시려면 키워드(<span className="font-bold">{modalKeyword}</span>)를 입력해주세요.<br />
                          <span className="text-xs text-gray-500">중단 후 추적이 불가능합니다.</span>
                        </>
                      )}
                      {modalType === "resume" && (
                        <>
                          추적을 <span className="font-bold">재추적</span> 하시려면 키워드(<span className="font-bold">{modalKeyword}</span>)를 입력해주세요.<br />
                          <span className="text-xs text-gray-500">재추적 시 순위 추적이 다시 시작됩니다.</span>
                        </>
                      )}
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
                        onClick={() => handleConfirmModal(trackInfo.id, modalKeyword)}
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
      {/* 토스트 메시지 */}
      {actionMessage && (
        <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 rounded bg-black/80 px-6 py-3 text-sm text-white shadow-lg animate-fade-in">
          {actionMessage}
        </div>
      )}
    </div>
  );
}
