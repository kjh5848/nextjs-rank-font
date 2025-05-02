import { CheckSquare, Square } from "lucide-react";
import AddKeywordButton from "./TrackAddKeywordButton";

interface KeywordListProps {
  keywords: { [key: string]: any };
  selectedKeywords: Set<string>;
  onSelectKeyword: (key: string) => void;
  onSelectAll: () => void;
  getRankString: (rank: number | null) => string;
  onAddKeyword: () => void;
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
    <div className="overflow-y-auto p-4 sm:p-6">
      <div className="mb-4 flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0 lg:flex-col lg:items-start lg:space-y-3">
        <div className="flex items-center space-x-2">
          <h3 className="text-base font-semibold text-gray-900 sm:text-lg lg:text-xl word-break-keep">
            키워드 목록
          </h3>
          <AddKeywordButton onClick={onAddKeyword} />
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
      <div className="grid gap-2 sm:space-y-2">
        {Object.keys(keywords).map((key) => {
          const trackInfo = keywords[key];
          return (
            <button
              key={key}
              onClick={() => onSelectKeyword(key)}
              className={`w-full rounded-lg p-2 text-left transition-colors sm:p-3 ${
                selectedKeywords.has(key)
                  ? "bg-blue-50 text-blue-700"
                  : "hover:bg-gray-50"
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
  );
} 