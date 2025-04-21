'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useQueryClient } from '@tanstack/react-query';
import { useNplaceRankTrackViewModel } from '@/src/viewModel/nplace/nplaceRankTrackViewModel';
import { useForm } from 'react-hook-form';
import ExcelUploadModal from '@/components/nplrace/rank/track/ExcelUploadModal';

export default function TrackPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    shopList,
    isLoading,
    error,
    groupList,
    addShop,
    fetchTrackable,
    isAddingShop,
    isFetchingTrackable,
    groupListError,
    updateGroup,
    isUpdatingGroup
  } = useNplaceRankTrackViewModel();

  const trackableModalUrlInputRef = useRef<HTMLInputElement>(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // 상태 관리
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [selectedShopList, setSelectedShopList] = useState<Set<string>>(new Set());
  const [isTrackableModalShow, setIsTrackableModalShow] = useState(false);
  const [isGroupChangeModalShow, setIsGroupChangeModalShow] = useState(false);
  const [isExcelUploadModalShow, setIsExcelUploadModalShow] = useState(false);
  const [trackableResult, setTrackableResult] = useState<any>(null);

  // 필터링된 상점 목록
  const filteredShopList = selectedGroup === 'all' 
    ? shopList 
    : shopList?.filter(shop => {
        const groupNames = shop.groupName.split(', ');
        return groupNames.includes(selectedGroup);
      }) || [];

  // URL 파라미터 업데이트
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set('type', selectedGroup);
    
    // URL 업데이트 (Next.js에서는 history API 직접 사용)
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, '', newUrl);
  }, [selectedGroup]);

  // URL에서 초기 그룹 값 가져오기
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const groupType = params.get('type');
    if (groupType) {
      setSelectedGroup(groupType);
    }
  }, []);

  // 선택된 상점 목록 관리
  const handleShopSelect = (shopId: string) => {
    setSelectedShopList(prev => {
      const newSelected = new Set(prev);
      if (newSelected.has(shopId)) {
        newSelected.delete(shopId);
      } else {
        newSelected.add(shopId);
      }
      return newSelected;
    });
  };

  // 트랙킹 가능한 상점 검색
  const handleTrackableSearch = async () => {
    if (!trackableModalUrlInputRef.current?.value) {
      alert("URL를 입력해주세요.");
      trackableModalUrlInputRef.current?.focus();
      return;
    }

    try {
      const result = await fetchTrackable(trackableModalUrlInputRef.current.value);
      setTrackableResult(result.data);
    } catch (error) {
      console.error('검색 실패', error);
      alert('검색에 실패했습니다.');
    }
  };

  // 선택된 트랙킹 가능한 상점 등록
  const handleAddTrackable = async () => {
    if (!trackableResult) return;

    try {
      await addShop(trackableResult.nplaceRankShop);
      alert('플레이스가 등록되었습니다.');
      handleTrackableModalClose();
    } catch (error) {
      console.error('등록 실패', error);
      alert('등록에 실패했습니다.');
    }
  };

  // 모달 관련 핸들러
  const handleTrackableModalClose = () => {
    if (trackableModalUrlInputRef.current) {
      trackableModalUrlInputRef.current.value = '';
    }
    setTrackableResult(null);
    setIsTrackableModalShow(false);
  };

  const handleGroupChangeModalShow = () => {
    if (selectedShopList.size === 0) {
      alert("플레이스를 1개 이상 선택해주세요.");
      return;
    }
    setIsGroupChangeModalShow(true);
  };

  const handleChangeGroupModalClose = () => {
    reset();
    setIsGroupChangeModalShow(false);
  };

  const onChangeGroupModalSubmit = async (data: any) => {
    try {
      await updateGroup(Array.from(selectedShopList), data);
      alert('그룹이 변경되었습니다.');
      setSelectedShopList(new Set());
      handleChangeGroupModalClose();
    } catch (error) {
      console.error('그룹 변경 실패', error);
      alert('그룹 변경에 실패했습니다.');
    }
  };

  // 순위 표시 함수
  const getRankString = (rank: number | null) => {
    if (rank == null) {
      return "추적 대기";
    } else if (rank === -1) {
      return "순위권 이탈";
    } else {
      return `${rank}위`;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 my-4 text-sm text-red-700 bg-red-100 rounded-lg">
        오류가 발생했습니다: {error.message}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6 rounded">
        매일 오후 1시에 순차적으로 순위를 추적합니다
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="p-6">
          <div className="flex flex-wrap justify-between items-center mb-4">
            <div className="flex gap-3 mb-2 sm:mb-0">
              <select
                className="border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-36"
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
              >
                <option value="all">전체</option>
                <option value="기본">기본</option>
                {groupList?.map((group) => (
                  <option key={group.id} value={group.groupName}>
                    {group.groupName}
                  </option>
                ))}
              </select>
              <button 
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
                onClick={handleGroupChangeModalShow}
              >
                그룹 변경
              </button>
            </div>
            
            <div className="flex gap-2">
              <button 
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
                onClick={() => setIsTrackableModalShow(true)}
              >
                추적가능 플레이스 검색
              </button>
              <button 
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
                onClick={() => setIsExcelUploadModalShow(true)}
              >
                업로드
              </button>
            </div>
          </div>
          
          <hr className="my-4" />
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    No.
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">
                    그룹
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    이미지
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    플레이스 / 순위
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredShopList.map((shop) => (
                  <tr 
                    key={shop.id} 
                    onClick={() => handleShopSelect(shop.id)}
                    onDoubleClick={() => router.push(`/track/${shop.id}`)}
                    className={`cursor-pointer hover:bg-gray-50 ${selectedShopList.has(shop.id) ? 'bg-green-50' : ''}`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {shop.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {shop.groupName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-[70px] h-[70px] bg-cover bg-center rounded-lg" style={{ backgroundImage: `url('${shop.shopImageUrl}')` }}></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 mb-1">{shop.shopName}</div>
                      <div className="flex flex-wrap gap-1">
                        {shop.nplaceRankTrackInfoList.length === 0 ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-800">
                            추적 중인 지역 및 키워드가 없습니다
                          </span>
                        ) : (
                          shop.nplaceRankTrackInfoList.map((info, index) => (
                            <span 
                              key={index}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-200 text-yellow-800"
                            >
                              <span>{`[${info.province}]${info.keyword}`}</span>
                              <span>{" / "}{getRankString(info.rank)}{"("}</span>
                              <span>
                                {info.rankChange === 0 
                                  ? "-" 
                                  : info.rankChange < 0 
                                    ? "▲" 
                                    : "▽"}
                              </span>
                              <span>{`${info.rankChange !== 0 ? Math.abs(info.rankChange) : ""})`}</span>
                            </span>
                          ))
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* 키워드 도구 테이블 */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-xs text-center">
              <thead className="bg-gray-50">
                <tr>
                  <th rowSpan={2} className="px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    키워드
                  </th>
                  <th colSpan={2} className="px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    월간검색수
                  </th>
                  <th rowSpan={2} className="px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    검색수합계
                  </th>
                  <th colSpan={2} className="px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    월간 블로그 발행
                  </th>
                  <th colSpan={2} className="px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    월평균클릭수
                  </th>
                  <th colSpan={2} className="px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    월평균클릭율
                  </th>
                  <th rowSpan={2} className="px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    경쟁정도
                  </th>
                  <th rowSpan={2} className="px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    월평균노출광고수
                  </th>
                </tr>
                <tr>
                  <th className="px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">PC</th>
                  <th className="px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
                  <th className="px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">수량</th>
                  <th className="px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">포화도</th>
                  <th className="px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">PC</th>
                  <th className="px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
                  <th className="px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">PC</th>
                  <th className="px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* 키워드 도구 데이터가 여기에 들어갑니다 */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* 추적가능 플레이스 검색 모달 */}
      {isTrackableModalShow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-xl font-semibold">추적가능 플레이스 검색</h3>
              <button onClick={handleTrackableModalClose} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <div>URL을 입력해주세요</div>
              <div className="text-xs font-semibold mt-2">
                <div>검색 주소 예시) https://map.naver.com/p/search/홍철책빵/place/1203311506</div>
                <div>엔트리 주소 예시) https://map.naver.com/p/entry/place/1203311506</div>
                <div>모바일 주소 예시) https://m.place.naver.com/restaurant/1203311506/home</div>
                <div>플레이스 ID 예시) 1203311506</div>
              </div>
              
              <div className="flex gap-2 mt-4">
                <input
                  ref={trackableModalUrlInputRef}
                  type="text"
                  placeholder="URL"
                  onKeyUp={(e) => e.key === 'Enter' && handleTrackableSearch()}
                  className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
                <button
                  onClick={handleTrackableSearch}
                  disabled={isFetchingTrackable}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:bg-blue-300"
                >
                  {isFetchingTrackable ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : '검색'}
                </button>
              </div>
              
              <hr className="my-4" />
              
              {trackableResult && (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="w-[70px] h-[70px] bg-cover bg-center rounded-lg" style={{ backgroundImage: `url('${trackableResult.nplaceRankShop.shopImageUrl}')` }}></div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{trackableResult.nplaceRankShop.shopName}</div>
                          <div className="text-sm text-gray-500 mt-1">
                            {trackableResult.nplaceRankShop.roadAddress || trackableResult.nplaceRankShop.address}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <button
                            onClick={handleAddTrackable}
                            disabled={isAddingShop}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-14 disabled:bg-blue-300"
                          >
                            {isAddingShop ? (
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
                            ) : '등록'}
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            
            <div className="border-t p-4 flex justify-end space-x-2">
              <button
                onClick={handleTrackableModalClose}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* 그룹 변경 모달 */}
      {isGroupChangeModalShow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-xl font-semibold">그룹 변경</h3>
              <button onClick={handleChangeGroupModalClose} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit(onChangeGroupModalSubmit)}>
              <div className="p-6">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="group">
                    그룹
                  </label>
                  <select
                    {...register('id', { required: '그룹을 선택하세요' })}
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    {groupList?.map((group) => (
                      <option key={group.id} value={group.id}>{group.groupName}</option>
                    ))}
                  </select>
                  {errors.id && (
                    <p className="text-red-500 text-xs italic">{errors.id.message as string}</p>
                  )}
                </div>
              </div>
              
              <div className="border-t p-4 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleChangeGroupModalClose}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={isUpdatingGroup}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded disabled:bg-blue-300"
                >
                  {isUpdatingGroup ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
                  ) : '변경'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* 엑셀 업로드 모달 */}
      <ExcelUploadModal 
        show={isExcelUploadModalShow} 
        handleClose={() => setIsExcelUploadModalShow(false)} 
      />
    </div>
  );
}
