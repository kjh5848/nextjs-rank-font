import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiResponse } from "@/types/api";
import { TrackInfo } from "@/src/model/TrackRepository";
import TrackRepository, { Shop, Group } from '@/model/TrackRepository';

// 타입 정의


export interface RankInfo {
  rank: number;
  totalCount: number;
}

export interface nplaceRankSearchShop {
  trackInfo: TrackInfo;
  rankInfo: RankInfo;
}

export interface SearchParams {
  keyword: string;
  filterType: 'SHOP_ID' | 'COMPANY_NAME';
  filterValue: string;
  province: string;
}

// 검색 API 호출 함수
const fetchSearchResults = async (params: SearchParams): Promise<ApiResponse<{ nplaceRankSearchShopList: nplaceRankSearchShop[] }>> => {
  if (!params.filterValue.trim() || !params.keyword.trim()) {
    throw new Error("업체명/SHOP_ID와 키워드를 모두 입력해주세요.");
  }

  const query = new URLSearchParams({
    keyword: params.keyword,
    filterType: params.filterType,
    filterValue: params.filterValue,
    province: params.province
  });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/nplace/rank/realtime?${query.toString()}`,
    {
      method: "GET",
      credentials: "include"
    }
  );

  if (!response.ok) {
    const errorText = await response.text().catch(() => "서버 오류");
    let errorData;
    try {
      errorData = JSON.parse(errorText);
    } catch (e) {
      errorData = { message: errorText || "서버 오류" };
    }
    throw new Error(errorData.message || "서버 오류가 발생했습니다.");
  }

  const text = await response.text();
  
  if (!text) {
    return {
      code: response.ok ? "0" : String(response.status),
      data: { nplaceRankSearchShopList: [] },
      message: response.statusText || '서버에서 응답이 없습니다.'
    };
  }
  
  try {
    const data = JSON.parse(text);
    return {
      code: String(data.code),
      data: data.data,
      message: data.message || ''
    };
  } catch (error) {
    console.error('응답 처리 중 에러 발생:', error);
    return {
      code: "-1",
      data: { nplaceRankSearchShopList: [] },
      message: "응답 형식이 올바르지 않습니다.",
    };
  }
};

// 검색어 상태를 저장하기 위한 로컬 캐시 키
const RECENT_SEARCH_CACHE_KEY = "recentSearches";

// 최근 검색어 저장 (최대 3개)
const saveRecentSearch = (params: SearchParams) => {
  try {
    const recentSearches = localStorage.getItem(RECENT_SEARCH_CACHE_KEY);
    const searches = recentSearches ? JSON.parse(recentSearches) : [];
    
    // 중복 제거
    const filteredSearches = searches.filter(
      (search: SearchParams) => 
        !(search.filterValue === params.filterValue && 
          search.filterType === params.filterType &&
          search.keyword === params.keyword)
    );
    
    // 최대 3개까지 저장
    const updatedSearches = [params, ...filteredSearches].slice(0, 3);
    localStorage.setItem(RECENT_SEARCH_CACHE_KEY, JSON.stringify(updatedSearches));
  } catch (error) {
    console.error("최근 검색어 저장 실패:", error);
  }
};

// 최근 검색어 불러오기
export const getRecentSearches = (): SearchParams[] => {
  try {
    const recentSearches = localStorage.getItem(RECENT_SEARCH_CACHE_KEY);
    return recentSearches ? JSON.parse(recentSearches) : [];
  } catch (error) {
    console.error("최근 검색어 불러오기 실패:", error);
    return [];
  }
};

// 검색 결과도 저장하기 위한 캐시 키
const RECENT_RESULTS_CACHE_KEY = "recentSearchResults";

// 검색 결과 저장 (최대 3개)
const saveSearchResults = (params: SearchParams, results: ApiResponse<{ nplaceRankSearchShopList: nplaceRankSearchShop[] }>) => {
  try {
    const recentResults = localStorage.getItem(RECENT_RESULTS_CACHE_KEY);
    const cachedResults = recentResults ? JSON.parse(recentResults) : [];
    
    // 새 결과 아이템 생성
    const newResultItem = {
      params,
      results: results.data.nplaceRankSearchShopList,
      timestamp: new Date().getTime(),
    };
    
    // 중복 제거 (같은 검색 파라미터가 있으면 제거)
    const filteredResults = cachedResults.filter(
      (item: any) => 
        !(item.params.filterValue === params.filterValue && 
          item.params.filterType === params.filterType &&
          item.params.keyword === params.keyword)
    );
    
    // 최대 3개까지 저장
    const updatedResults = [newResultItem, ...filteredResults].slice(0, 3);
    localStorage.setItem(RECENT_RESULTS_CACHE_KEY, JSON.stringify(updatedResults));
  } catch (error) {
    console.error("최근 검색 결과 저장 실패:", error);
  }
};

// 최근 검색 결과 불러오기
export const getRecentSearchResults = (): { params: SearchParams, results: nplaceRankSearchShop[], timestamp: number }[] => {
  try {
    const recentResults = localStorage.getItem(RECENT_RESULTS_CACHE_KEY);
    return recentResults ? JSON.parse(recentResults) : [];
  } catch (error) {
    console.error("최근 검색 결과 불러오기 실패:", error);
    return [];
  }
};

// React Query 캐싱을 위한 쿼리 키 생성 함수
const getSearchQueryKey = (params: SearchParams) => [
  'nplaceSearch',
  params.province,
  params.filterType,
  params.filterValue,
  params.keyword
];

// 커스텀 훅: 검색 결과 캐싱 및 조회
export const useNplaceSearch = (params: SearchParams) => {
  return useQuery<ApiResponse<{ nplaceRankSearchShopList: nplaceRankSearchShop[] }>, Error>({
    queryKey: getSearchQueryKey(params),
    queryFn: () => fetchSearchResults(params),
    enabled: false, // 자동으로 쿼리를 실행하지 않음 (수동 트리거)
    staleTime: 1000 * 60 * 5, // 5분
    retry: 1 // 재시도 1회
  });
};

// 커스텀 훅: 검색 실행 및 결과 업데이트
export const useExecuteSearch = () => {
  const queryClient = useQueryClient();
  
  return useMutation<
    ApiResponse<{ nplaceRankSearchShopList: nplaceRankSearchShop[] }>,
    Error,
    SearchParams
  >({
    mutationFn: (params: SearchParams) => {
      saveRecentSearch(params);
      return fetchSearchResults(params);
    },
    onSuccess: (data, params) => {
      // 쿼리 캐시 업데이트
      queryClient.setQueryData(getSearchQueryKey(params), data);
      // 검색 결과 로컬 스토리지에 저장
      saveSearchResults(params, data);
    }
  });
};

export const useNplaceRankReailTimeViewModel = () => {
  const queryClient = useQueryClient();

  // 1. 실시간 검색 (mutateAsync로 export)
  const { mutateAsync: executeSearch, isPending: isSearching } = useMutation<
    ApiResponse<{ nplaceRankSearchShopList: nplaceRankSearchShop[] }>,
    Error,
    SearchParams
  >({
    mutationFn: async (params) => {
      saveRecentSearch(params);
      const result = await fetchSearchResults(params);
      saveSearchResults(params, result);
      return result;
    },
    onSuccess: (data, params) => {
      queryClient.setQueryData(getSearchQueryKey(params), data);
    }
  });

  // 2. 상점 목록 조회
  const {
    data: shopListResult,
    isLoading: isLoadingShopList,
    error: shopListError,
    refetch: refetchShopList,
  } = useQuery<ApiResponse<{ nplaceRankShopList: Shop[] }>>({
    queryKey: ["nplaceRankShopList"],
    queryFn: () => TrackRepository.getShopList(),
  });

  // 3. 그룹 목록 조회
  const {
    data: groupListResult,
    isLoading: isLoadingGroupList,
    error: groupListError,
    refetch: refetchGroupList,
  } = useQuery<ApiResponse<{ groupList: Group[] }>>({
    queryKey: ["groupList"],
    queryFn: () => TrackRepository.getGroupList(),
  });

  // 4. 상점 삭제
  const { mutateAsync: deleteShop, isPending: isDeletingShop } = useMutation<
    ApiResponse<void>,
    Error,
    string
  >({
    mutationFn: (shopId) => TrackRepository.deleteShop(shopId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["nplaceRankShopList"] }),
  });

  // 5. 상점 추가
  const { mutateAsync: addShop, isPending: isAddingShop } = useMutation<
    ApiResponse<any>,
    Error,
    Shop
  >({
    mutationFn: (shop) => TrackRepository.addShop(shop),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["nplaceRankShopList"] }),
  });

  // 6. 그룹 변경
  const { mutateAsync: updateGroup, isPending: isUpdatingGroup } = useMutation<
    ApiResponse<any>,
    Error,
    { shopIds: string[]; group: any }
  >({
    mutationFn: ({ shopIds, group }) => TrackRepository.updateGroup(shopIds, group),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["nplaceRankShopList"] }),
  });

  // 7. 추적 가능한 플레이스 검색
  const { mutateAsync: fetchTrackable, isPending: isFetchingTrackable } = useMutation<
    ApiResponse<any>,
    Error,
    string
  >({
    mutationFn: (url) => TrackRepository.searchTrackable(url),
  });

  // --- 반환: 뷰에서 필요한 데이터/액션만 export ---
  return {
    // 실시간 검색
    executeSearch, isSearching,
    // 상점/그룹 목록
    shopList: shopListResult?.data?.nplaceRankShopList ?? [],
    isLoadingShopList, shopListError, refetchShopList,
    groupList: groupListResult?.data?.groupList ?? [],
    isLoadingGroupList, groupListError, refetchGroupList,
    // 상점/그룹 액션
    addShop, isAddingShop,
    deleteShop, isDeletingShop,
    updateGroup, isUpdatingGroup,
    // 기타
    fetchTrackable, isFetchingTrackable,
  };
}; 