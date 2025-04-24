import { Button } from "@/components/ui/button";

interface TrackDataViewProps {
  view: "list" | "grid";
  trackList: any[];
  onViewChange: (view: "list" | "grid") => void;
  onDownloadExcel: () => void;
  onRankCheck: (track: any) => void;
}

export default function TrackDataView({
  view,
  trackList,
  onViewChange,
  onDownloadExcel,
  onRankCheck,
}: TrackDataViewProps) {
  return (
    <div className="mt-6">
      <div className="mb-4 flex justify-between">
        <Button variant="outline" onClick={onDownloadExcel}>
          다운로드
        </Button>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => onViewChange("list")}
            className={view === "list" ? "bg-gray-100" : ""}
          >
            리스트 보기
          </Button>
          <Button
            variant="outline"
            onClick={() => onViewChange("grid")}
            className={view === "grid" ? "bg-gray-100" : ""}
          >
            그리드 보기
          </Button>
        </div>
      </div>

      {view === "list" ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  순위
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  방문자 리뷰
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  블로그 리뷰
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  저장수
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  평점
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  일자
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  순위비교
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {trackList.map((track, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {track.rank > 0 ? track.rank : "순위권 이탈"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {track.rank > 0 ? track.visitorReviewCount : ""}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {track.rank > 0 ? track.blogReviewCount : ""}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {track.rank > 0 ? track.saveCount : ""}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {track.rank > 0 ? track.scoreInfo : ""}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {track.chartDate.split(".")[0].replace("T", " ")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onRankCheck(track)}
                    >
                      비교
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {trackList.slice(0, 30).map((track) => (
            <div key={track.id} className="rounded-lg border p-4 text-center">
              <div className="text-sm">
                <div>
                  {track.chartDate.slice(5, 10)} {track.chartDate.slice(11, 16)}
                </div>
                <div className="font-bold">
                  {track.rank > 0 ? `${track.rank}위` : "순위권 이탈"}
                </div>
                <div className="font-bold text-green-600">
                  {track.rank > 0 ? track.saveCount : ""}
                </div>
                <div className="text-gray-600">블 {track.blogReviewCount}개</div>
                <div className="text-gray-600">방 {track.visitorReviewCount}개</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 