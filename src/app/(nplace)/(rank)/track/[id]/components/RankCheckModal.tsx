"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";

interface RankCheckModalProps {
  show: boolean;
  onClose: () => void;
  selectedPlace: any;
  rankCheckData: any[];
}

export default function RankCheckModal({
  show,
  onClose,
  selectedPlace,
  rankCheckData,
}: RankCheckModalProps) {
  if (!rankCheckData || rankCheckData.length === 0) return null;

  return (
    <Dialog open={show} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>플레이스 순위</DialogTitle>
        </DialogHeader>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">순위</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">업체명</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">카테고리</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">평점</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">방문자리뷰</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">블로그리뷰</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">저장수</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rankCheckData.map((place) => (
                <tr
                  key={place.rankInfo.rank}
                  className={place.rankInfo.rank === selectedPlace?.rank ? "bg-yellow-50" : ""}
                >
                  <td className="px-6 py-4 whitespace-nowrap">{place.rankInfo.rank}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{place.trackInfo.shopName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{place.trackInfo.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{place.trackInfo.scoreInfo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {place.trackInfo.visitorReviewCount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {place.trackInfo.blogReviewCount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{place.trackInfo.saveCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );
} 