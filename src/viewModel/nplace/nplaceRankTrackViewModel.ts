import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import TrackRepository, { Shop, Group } from '@/src/model/TrackRepository';



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
    queryFn: () => TrackRepository.getShopList()
  });


  // 그룹 목록 조회
  const {
    data: groupListResult,
    error: groupListError,
    isLoading: isLoadingGroupList
  } = useQuery({
    queryKey: ['groupList'],
    queryFn: () => TrackRepository.getGroupList()
  });

  // 추적 가능한 플레이스 검색
  const trackableMutation = useMutation({
    mutationFn: (url: string) => TrackRepository.searchTrackable(url)
  });

  // 상점 추가
  const addShopMutation = useMutation({
    mutationFn: (shop: any) => TrackRepository.addShop(shop),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nplaceRankShopList'] });
    }
  });

  // 그룹 변경
  const updateGroupMutation = useMutation({
    mutationFn: (params: { shopIds: string[], group: any }) => 
      TrackRepository.updateGroup(params.shopIds, params.group),
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