import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// 타입 정의
type Shop = {
  id: string;
  shopId: string;
  shopName: string;
  shopImageUrl: string;
  groupName: string;
  nplaceRankTrackInfoList: TrackInfo[];
};

type TrackInfo = {
  id: string;
  keyword: string;
  province: string;
  rank: number | null;
  rankChange: number;
};

type Group = {
  id: string;
  groupName: string;
};

export const useNplaceRankTrackViewModel = () => {
  const queryClient = useQueryClient();

  // 상점 목록 조회
  const { 
    data: shopListResult, 
    error, 
    isLoading, 
    refetch: refetchShopList
  } = useQuery({
    queryKey: ['nplaceRankShopList'],
    queryFn: async () => {
      const response = await fetch('/api/nplace/rank/shop');
      if (!response.ok) {
        throw new Error('상점 목록을 불러오는데 실패했습니다.');
      }
      const data = await response.json();
      if (data.code !== 0) {
        throw new Error(data.message || '상점 목록을 불러오는데 실패했습니다.');
      }
      return data;
    }
  });

  // 그룹 목록 조회
  const {
    data: groupListResult,
    error: groupListError,
    isLoading: isLoadingGroupList
  } = useQuery({
    queryKey: ['groupList'],
    queryFn: async () => {
      const response = await fetch('/api/group/list');
      if (!response.ok) {
        throw new Error('그룹 목록을 불러오는데 실패했습니다.');
      }
      const data = await response.json();
      if (data.code !== 0 && data.code !== -8) {
        throw new Error(data.message || '그룹 목록을 불러오는데 실패했습니다.');
      }
      return data;
    }
  });

  // 추적 가능한 플레이스 검색
  const trackableMutation = useMutation({
    mutationFn: async (url: string) => {
      const response = await fetch(`/api/nplace/rank/trackable?url=${encodeURIComponent(url)}`);
      if (!response.ok) {
        throw new Error('검색에 실패했습니다.');
      }
      const data = await response.json();
      if (data.code === -8) {
        throw new Error('검색 결과가 없습니다.');
      }
      if (data.code !== 0) {
        throw new Error(data.message || '검색에 실패했습니다.');
      }
      return data;
    }
  });

  // 상점 추가
  const addShopMutation = useMutation({
    mutationFn: async (shop: any) => {
      const response = await fetch('/api/nplace/rank/shop', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nplaceRankShop: shop
        })
      });
      if (!response.ok) {
        throw new Error('상점 추가에 실패했습니다.');
      }
      const data = await response.json();
      if (data.code !== 0) {
        throw new Error(data.message || '상점 추가에 실패했습니다.');
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nplaceRankShopList'] });
    }
  });

  // 그룹 변경
  const updateGroupMutation = useMutation({
    mutationFn: async (params: { shopIds: string[], group: any }) => {
      const response = await fetch('/api/nplace/rank/shop/group', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nplaceRankShopList: params.shopIds,
          group: params.group
        })
      });
      if (!response.ok) {
        throw new Error('그룹 변경에 실패했습니다.');
      }
      const data = await response.json();
      if (data.code !== 0) {
        throw new Error(data.message || '그룹 변경에 실패했습니다.');
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nplaceRankShopList'] });
    }
  });

  return {
    shopList: shopListResult?.data?.nplaceRankShopList as Shop[] || [],
    isLoading,
    error,
    refetchShopList,

    groupList: groupListResult?.data?.groupList as Group[] || [],
    groupListError,
    isLoadingGroupList,

    // 추적 가능한 플레이스 검색
    fetchTrackable: trackableMutation.mutateAsync,
    isFetchingTrackable: trackableMutation.isPending,
    
    // 상점 추가
    addShop: addShopMutation.mutateAsync,
    isAddingShop: addShopMutation.isPending,
    
    // 그룹 변경
    updateGroup: (shopIds: string[], group: any) => updateGroupMutation.mutateAsync({ shopIds, group }),
    isUpdatingGroup: updateGroupMutation.isPending
  };
}; 