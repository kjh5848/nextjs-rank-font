import { Badge } from "@/src/components/ui/badge";

interface TrackKeywordListProps {
  trackInfoMap: any;
  selectedInfoEntryKey: string | null;
  onKeywordClick: (entryKey: string) => void;
  onContextMenu: (event: React.MouseEvent, infoId: string) => void;
}

export default function TrackKeywordList({
  trackInfoMap,
  selectedInfoEntryKey,
  onKeywordClick,
  onContextMenu,
}: TrackKeywordListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {Object.keys(trackInfoMap).length === 0 ? (
        <Badge className="bg-gray-200 text-gray-700">
          추적 중인 지역 및 키워드가 없습니다
        </Badge>
      ) : (
        Object.keys(trackInfoMap).map((entryKey) => {
          const info = trackInfoMap[entryKey];
          return (
            <Badge
              key={entryKey}
              variant={selectedInfoEntryKey === entryKey ? "destructive" : "secondary"}
              className="cursor-pointer"
              onClick={() => onKeywordClick(entryKey)}
              onContextMenu={(e) => onContextMenu(e, info.id)}
            >
              {entryKey} / {getRankString(info.rank)}(
              {info.rankChange === 0
                ? "-"
                : info.rankChange < 0
                ? `▲${Math.abs(info.rankChange)}`
                : `▽${Math.abs(info.rankChange)}`}
              )
            </Badge>
          );
        })
      )}
    </div>
  );
}

function getRankString(rank: number | null) {
  if (rank == null) {
    return "추적 대기";
  } else if (rank === -1) {
    return "순위권 이탈";
  } else {
    return `${rank}위`;
  }
} 