import { Button } from "@/components/ui/button";

interface ShopInfoProps {
  shopData: any;
  onDeleteShop: () => void;
  onUpdateKeyword: () => void;
}

export default function ShopInfo({ shopData, onDeleteShop, onUpdateKeyword }: ShopInfoProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* 상점 이미지 */}
      <div className="relative">
        <div
          className="h-48 w-full rounded-lg bg-cover bg-center"
          style={{
            backgroundImage: `url('${shopData.nplaceRankShop.shopImageUrl}')`,
          }}
        />
      </div>

      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold">{shopData.nplaceRankShop.shopName}</h2>
          <Button
            variant="outline"
            className="text-sm"
            onClick={() => {
              navigator.clipboard.writeText(shopData.nplaceRankShop.shopId);
              alert(`SHOP_ID ${shopData.nplaceRankShop.shopId} 복사되었습니다.`);
            }}
          >
            SHOP_ID
          </Button>
        </div>
        <p className="mt-2 text-gray-600">
          {shopData.nplaceRankShop.roadAddress || shopData.nplaceRankShop.address}
        </p>
        <div className="mt-2 flex gap-4">
          <div>방문자 리뷰({shopData.nplaceRankShop.visitorReviewCount})</div>
          <div>블로그 리뷰({shopData.nplaceRankShop.blogReviewCount})</div>
        </div>
        <div className="mt-2 flex gap-4">
          <div className="text-gray-700">{shopData.nplaceRankShop.category}</div>
          <div className="text-gray-700">평점({shopData.nplaceRankShop.scoreInfo})</div>
        </div>
        <div className="mt-2 text-gray-700">
          [{" "}
          {shopData.nplaceRankShop.keywordList.length === 0
            ? "키워드 목록이 없습니다."
            : shopData.nplaceRankShop.keywordList.join(" ")}{" "}
          ]
          <Button variant="outline" className="ml-2" onClick={onUpdateKeyword}>
            갱신
          </Button>
        </div>
      </div>

      {/* 삭제 버튼 */}
      <div className="flex justify-end">
        <Button
          className="border-red-500 text-red-500 hover:bg-red-50"
          onClick={onDeleteShop}
        >
          플레이스 삭제
        </Button>
      </div>
    </div>
  );
} 