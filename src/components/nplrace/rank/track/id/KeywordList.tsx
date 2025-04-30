import { CheckSquare, Square } from "lucide-react";
import AddKeywordButton from "./AddKeywordButton";

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
    <div className="sticky top-4 h-[calc(100vh-2rem)] overflow-y-auto rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">키워드 목록</h3>
        <div className="flex items-center space-x-2">
          <AddKeywordButton onClick={onAddKeyword} />
          <button
            onClick={onSelectAll}
            className="text-gray-500 hover:text-gray-700"
          >
            {isAllSelected ? (
              <CheckSquare size={20} />
            ) : (
              <Square size={20} />
            )}
          </button>
        </div>
      </div>
      <div className="space-y-2">
        {Object.keys(keywords).map((key) => {
          const trackInfo = keywords[key];
          return (
            <button
              key={key}
              onClick={() => onSelectKeyword(key)}
              className={`w-full rounded-lg p-3 text-left transition-colors ${
                selectedKeywords.has(key)
                  ? "bg-blue-50 text-blue-700"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="font-medium">{key}</div>
                {selectedKeywords.has(key) && (
                  <CheckSquare size={16} className="text-blue-600" />
                )}
              </div>
              <div className="mt-1 text-sm text-gray-500">
                {trackInfo?.province} • {getRankString(trackInfo?.rank || null)}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
} 