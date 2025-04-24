import { useRef } from "react";

interface TrackNplaceSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (url: string) => void;
  onAdd: () => void;
  trackableResult: any;
  isFetchingTrackable: boolean;
  isAddingShop: boolean;
}

export default function TrackNplaceSearch({
  isOpen,
  onClose,
  onSearch,
  onAdd,
  trackableResult,
  isFetchingTrackable,
  isAddingShop,
}: TrackNplaceSearchProps) {
  const trackableModalUrlInputRef = useRef<HTMLInputElement>(null);
  const trackableModalSearchButtonRef = useRef<HTMLButtonElement>(null);

  const handleTrackableModalUrlInputKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      trackableModalSearchButtonRef.current?.click();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      <div className="relative z-50 w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">추적가능 플레이스 검색</h3>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div>URL을 입력해주세요</div>
          <div className="space-y-1 text-sm text-gray-500">
            <div>검색 주소 예시) https://map.naver.com/p/search/홍철책빵/place/1203311506</div>
            <div>엔트리 주소 예시) https://map.naver.com/p/entry/place/1203311506</div>
            <div>모바일 주소 예시) https://m.place.naver.com/restaurant/1203311506/home</div>
            <div>플레이스 ID 예시) 1203311506</div>
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                ref={trackableModalUrlInputRef}
                type="text"
                placeholder="URL"
                onKeyUp={handleTrackableModalUrlInputKeyUp}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-hiddenfocus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            </div>
            <button
              ref={trackableModalSearchButtonRef}
              onClick={() => onSearch(trackableModalUrlInputRef.current?.value || '')}
              disabled={isFetchingTrackable}
              className="rounded-lg bg-blue-500 px-4 py-2 text-white shadow-md hover:bg-blue-600 disabled:opacity-50"
            >
              {isFetchingTrackable ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                "검색"
              )}
            </button>
          </div>

          <hr className="my-4" />

          {trackableResult && (
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div
                        className="h-12 w-12 rounded-lg bg-cover bg-center shadow-xs"
                        style={{
                          backgroundImage: `url('${trackableResult.nplaceRankShop.shopImageUrl}')`,
                        }}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">
                        {trackableResult.nplaceRankShop.shopName}
                      </div>
                      <div className="mt-1 text-sm text-gray-500">
                        {trackableResult.nplaceRankShop.roadAddress || trackableResult.nplaceRankShop.address}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right">
                      <button
                        onClick={onAdd}
                        disabled={isAddingShop}
                        className="rounded-lg border border-blue-500 px-3 py-1 text-sm text-blue-500 hover:bg-blue-50 disabled:opacity-50"
                      >
                        {isAddingShop ? (
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
                        ) : (
                          "등록"
                        )}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 