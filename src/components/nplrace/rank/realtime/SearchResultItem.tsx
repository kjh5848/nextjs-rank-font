"use client";

import { nplaceRankSearchShop } from "@/src/viewModel/nplace/nplaceRankSearchShopViewModel";

interface SearchResultItemProps {
  item: nplaceRankSearchShop;
}

export default function SearchResultItem({ item }: SearchResultItemProps) {
  const openNewTabWithUrl = () => {
    window.open(
      `https://m.place.naver.com/place/${item.trackInfo.shopId}`,
      "_blank",
    );
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(item.trackInfo.shopId);
    alert(`SHOP_ID이 ${item.trackInfo.shopId}가 복사되었습니다.`);
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start">
        {/* 이미지 */}
        <div className="mr-4 h-24 w-28 overflow-hidden rounded">
          <img
            src={item.trackInfo.shopImageUrl || "/placeholder-shop.png"}
            alt={item.trackInfo.shopName}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              {/* 순위 정보 */}
              <div className="mb-2 flex items-center">
                <span className="text-xl font-bold">
                  {item.rankInfo.rank}위
                </span>
                <span className="ml-2 text-sm text-gray-500">
                  / {item.rankInfo.totalCount}개
                </span>
              </div>

              {/* 업체명 */}
              <h3 className="mb-1 text-lg font-bold">
                {item.trackInfo.shopName}
              </h3>

              {/* 주소 */}
              <p className="mb-1 text-sm text-gray-600">
                {item.trackInfo.roadAddress || item.trackInfo.address}
              </p>

              {/* 리뷰 정보 */}
              <p className="text-sm text-gray-600">
                방문자 리뷰({item.trackInfo.visitorReviewCount}) 블로그 리뷰(
                {item.trackInfo.blogReviewCount})
              </p>
            </div>

            {/* 바로가기 버튼 */}
            <button
              className="rounded-md bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 text-white transition-colors hover:from-blue-600 hover:to-indigo-700"
              onClick={openNewTabWithUrl}
            >
              바로가기
            </button>
          </div>

          {/* 카테고리 및 SHOP_ID */}
          <div className="mt-3 flex items-center">
            <span className="mr-2 text-sm text-gray-500">
              {item.trackInfo.category} {item.trackInfo.scoreInfo}
            </span>
            <button
              className="inline-block rounded bg-blue-100 px-2 py-1 text-xs text-blue-800"
              onClick={copyToClipboard}
            >
              SHOP_ID
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
