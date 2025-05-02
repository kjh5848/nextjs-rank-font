import { CheckSquare, Square } from "lucide-react";
import AddKeyword from "./TrackAddKeyword";

interface KeywordListProps {
  keywords: { [key: string]: any };
  selectedKeywords: Set<string>;
  onSelectKeyword: (key: string) => void;
  onSelectAll: () => void;
  getRankString: (rank: number | null) => string;
  onAddKeyword: (keyword: string, province: string) => void;
}

export default function KeywordList({
  keywords,
  selectedKeywords,
  onSelectKeyword,
  onSelectAll,
  getRankString,
  onAddKeyword,
}: KeywordListProps) {
  const isAllSelected = Object.keys(keywords).length > 0 && 
    Object.keys(keywords).every(key => selectedKeywords.has(key));

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-lg">
      <div className="border-b border-gray-200 p-4 sm:p-6">
        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0 lg:flex-col lg:items-start lg:space-y-3">
          <div className="flex items-center space-x-2">
            <h3 className="text-base font-semibold text-gray-900 sm:text-lg lg:text-xl word-break-keep">
              키워드 목록
            </h3>
            <AddKeyword onAdd={onAddKeyword} />
          </div>
          
          <div className="flex items-center space-x-2 lg:self-end">
            <button
              onClick={onSelectAll}
              className="text-gray-500 hover:text-gray-700"
            >
              {isAllSelected ? <CheckSquare size={20} className="lg:size-6" /> : <Square size={20} className="lg:size-6" />}
            </button>
          </div>
        </div>
      </div>

      <div className="grid max-h-[calc(100vh-20rem)] grid-rows-[repeat(5,auto),1fr] overflow-hidden">
        {/* 상단 5개 고정 키워드 */}
        {Object.keys(keywords).slice(0, 5).map((key) => {
          const trackInfo = keywords[key];
          return (
            <button
              key={key}
              onClick={() => onSelectKeyword(key)}
              className={`w-full border-b border-gray-100 p-4 text-left transition-colors hover:bg-gray-50 sm:p-4 ${
                selectedKeywords.has(key)
                  ? "bg-blue-50 text-blue-700 hover:bg-blue-100"
                  : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium sm:text-base">{key}</div>
                {selectedKeywords.has(key) && (
                  <CheckSquare size={16} className="text-blue-600" />
                )}
              </div>
              <div className="mt-1 text-xs text-gray-500 sm:text-sm">
                {trackInfo?.province} • {getRankString(trackInfo?.rank || null)}
              </div>
            </button>
          );
        })}

        {/* 스크롤 가능한 나머지 키워드 */}
        <div className="overflow-y-auto">
          {Object.keys(keywords).slice(5).map((key) => {
            const trackInfo = keywords[key];
            return (
              <button
                key={key}
                onClick={() => onSelectKeyword(key)}
                className={`w-full border-b border-gray-100 p-4 text-left transition-colors hover:bg-gray-50 sm:p-4 ${
                  selectedKeywords.has(key)
                    ? "bg-blue-50 text-blue-700 hover:bg-blue-100"
                    : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium sm:text-base">{key}</div>
                  {selectedKeywords.has(key) && (
                    <CheckSquare size={16} className="text-blue-600" />
                  )}
                </div>
                <div className="mt-1 text-xs text-gray-500 sm:text-sm">
                  {trackInfo?.province} • {getRankString(trackInfo?.rank || null)}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
} 