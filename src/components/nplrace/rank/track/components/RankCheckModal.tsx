import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
  if (!show) return null;

  return (
    <Dialog open={show} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>순위 비교</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    순위
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    상점명
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
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {rankCheckData.map((data, index) => (
                  <tr
                    key={index}
                    className={
                      data.shopId === selectedPlace.shopId ? "bg-blue-50" : ""
                    }
                  >
                    <td className="px-6 py-4 whitespace-nowrap">{data.rank}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {data.shopName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {data.visitorReviewCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {data.blogReviewCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {data.saveCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {data.scoreInfo}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button onClick={onClose}>닫기</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 