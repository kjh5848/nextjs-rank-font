import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

type TrackInfo = {
  id: string;
  keyword: string;
  province: string;
  rank: number;
  rankChange: number;
  nplaceRankTrackList: TrackData[];
};

type TrackData = {
  id: string;
  rank: number;
  visitorReviewCount: number;
  blogReviewCount: number;
  saveCount: number;
  scoreInfo: string;
  chartDate: string;
};

type ShopData = {
  nplaceRankShop: {
    id: string;
    shopId: string;
    shopName: string;
    shopImageUrl: string;
    address: string;
    roadAddress: string;
    visitorReviewCount: number;
    blogReviewCount: number;
    category: string;
    scoreInfo: string;
    keywordList: string[];
    businessSector: string;
    createDate: string;
    nplaceRankTrackInfoMap: {
      [key: string]: TrackInfo;
    };
  };
};

type RankCheckData = {
  rankInfo: {
    rank: number;
  };
  trackInfo: {
    shopName: string;
    category: string;
    scoreInfo: string;
    visitorReviewCount: number;
    blogReviewCount: number;
    saveCount: number;
  };
};

export const useNplaceRankTrackWithIdViewModel = (id: string) => {
  const queryClient = useQueryClient();

  // 플레이스 정보 조회
  const { 
    data: shopWithIdResult, 
    error, 
    isLoading,
    refetch 
  } = useQuery<{ data: ShopData; code: number; message: string }>({
    queryKey: ['nplaceRankShop', id],
    queryFn: async () => {
      const response = await fetch(`/api/nplace/rank/shop/${id}`);
      if (!response.ok) {
        throw new Error('플레이스 정보를 불러오는데 실패했습니다');
      }
      return response.json();
    }
  });

  // 플레이스 삭제
  const deleteShopMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/nplace/rank/shop/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('플레이스 삭제에 실패했습니다');
      }
      return response.json();
    },
    onSuccess: (data) => {
      if (data.code !== 0) {
        throw new Error(data.message || '플레이스 삭제에 실패했습니다');
      }
    }
  });

  // 키워드 추가
  const addTrackMutation = useMutation({
    mutationFn: async ({ keyword, province }: { keyword: string; province: string }) => {
      if (!shopWithIdResult?.data) throw new Error('플레이스 정보가 없습니다');
      
      const response = await fetch(`/api/nplace/rank/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nplaceRankTrackInfo: {
            keyword,
            province,
            shopId: shopWithIdResult.data.nplaceRankShop.shopId,
            businessSector: shopWithIdResult.data.nplaceRankShop.businessSector
          }
        })
      });
      
      if (!response.ok) {
        throw new Error('키워드 추가에 실패했습니다');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nplaceRankShop', id] });
    }
  });

  // 키워드 삭제
  const deleteKeywordMutation = useMutation({
    mutationFn: async (keywordId: string) => {
      const response = await fetch(`/api/nplace/rank/track/${keywordId}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('키워드 삭제에 실패했습니다');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nplaceRankShop', id] });
    }
  });

  // 키워드 추적 상태 변경 (재시작/중단)
  const updateTrackStatusMutation = useMutation({
    mutationFn: async ({ keywordId, status }: { keywordId: string; status: 'RUNNING' | 'STOP' }) => {
      const response = await fetch(`/api/nplace/rank/track/${keywordId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nplaceRankTrackInfoStatus: {
            status,
            id: keywordId,
          }
        })
      });
      
      if (!response.ok) {
        throw new Error('키워드 상태 변경에 실패했습니다');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nplaceRankShop', id] });
    }
  });

  // 순위 비교 데이터 조회
  const fetchRankCheckData = async (
    selectedInfoEntryKey: string,
    trackInfo: TrackData
  ): Promise<RankCheckData[]> => {
    if (!shopWithIdResult?.data) throw new Error('플레이스 정보가 없습니다');
    
    const response = await fetch(`/api/nplace/rank/realtime/list`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nplaceRankCheckData: {
          keyword: shopWithIdResult.data.nplaceRankShop.nplaceRankTrackInfoMap[selectedInfoEntryKey].keyword,
          province: shopWithIdResult.data.nplaceRankShop.nplaceRankTrackInfoMap[selectedInfoEntryKey].province,
          searchDate: trackInfo.chartDate
        }
      })
    });
    
    const data = await response.json();
    
    if (data.code !== 0) {
      throw new Error(data.message || '순위 정보를 불러오는데 실패했습니다');
    }
    
    if (data.data.nplaceRankDataList.length === 0) {
      throw new Error('순위 정보가 없습니다');
    }
    
    return data.data.nplaceRankDataList;
  };

  // 키워드 목록 갱신
  const updateKeywordsMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/nplace/rank/shop/${id}/keyword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nplaceRankShop: { id }
        })
      });
      
      if (!response.ok) {
        throw new Error('키워드 목록 갱신에 실패했습니다');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nplaceRankShop', id] });
    }
  });

  // 순위 트랙 목록 (정렬된)
  const getNplaceRankTrackList = (selectedInfoEntryKey: string | null) => {
    if (!shopWithIdResult?.data || selectedInfoEntryKey === null) return [];
    
    return [...shopWithIdResult.data.nplaceRankShop.nplaceRankTrackInfoMap[selectedInfoEntryKey].nplaceRankTrackList]
      .sort((a, b) => a.chartDate > b.chartDate ? -1 : 1);
  };

  return {
    shopWithIdResult,
    isLoading,
    error,
    refetchShopData: refetch,
    deleteShop: deleteShopMutation.mutateAsync,
    isDeleting: deleteShopMutation.isPending,
    addTrack: addTrackMutation.mutateAsync,
    isAddingTrack: addTrackMutation.isPending,
    deleteKeyword: deleteKeywordMutation.mutateAsync,
    updateTrackStatus: updateTrackStatusMutation.mutateAsync,
    fetchRankCheckData,
    updateKeywords: updateKeywordsMutation.mutateAsync,
    isUpdatingKeywords: updateKeywordsMutation.isPending,
    getNplaceRankTrackList,
    getRankString: (rank: number | null) => {
      if (rank == null) {
        return "추적 대기";
      } else if (rank === -1) {
        return "순위권 이탈";
      } else {
        return `${rank}위`;
      }
    }
  };
}; 