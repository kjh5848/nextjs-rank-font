import TrackRepository, { Shop, TrackInfo, TrackData, RankCheckData } from '@/model/TrackRepository';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiResponse } from '@/types/api';

interface NplaceRankTrackWithIdViewModelProps {
  id: string;
  keyword: string;
  province: string;
}

export const useNplaceRankTrackWithIdViewModel = ({ id, keyword, province }: NplaceRankTrackWithIdViewModelProps) => {
  const queryClient = useQueryClient();

  // 플레이스 정보 조회
  const {
    data: shopWithIdResult,
    error,
    isLoading,
    refetch
  } = useQuery<ApiResponse<{ nplaceRankShop: Shop }>>({
    queryKey: ['nplaceRankShop', id],
    queryFn: async () => {
      const response = await TrackRepository.getShopDetail(id);
      console.log(`[NplaceRankTrackWithIdViewModel] ▶ 플레이스 정보 조회 결과: ${JSON.stringify(response)}`);
      return response;
    }
  });

  // 플레이스 삭제
  const { mutate: deleteShop } = useMutation<ApiResponse<void>, Error>({
    mutationFn: async () => {
      return await TrackRepository.deleteShop(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nplaceRankShop'] });
    }
  });

  // 트랙 추가 → addKeyword로 이름 변경 및 businessSector, shopId 활용
  const { mutateAsync: addKeyword, isPending: isAddingKeyword } = useMutation<ApiResponse<TrackInfo>, Error, { keyword: string; province: string }>({
    mutationFn: async ({ keyword, province }) => {
      if (!shopWithIdResult?.data?.nplaceRankShop) throw new Error('상점 정보가 없습니다.');
      return await TrackRepository.addTrack({
        keyword,
        province,
        shopId: shopWithIdResult.data.nplaceRankShop.id,
        businessSector: shopWithIdResult.data.nplaceRankShop.businessSector || '',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nplaceRankShop', id] });
    }
  });

  // 트랙 삭제
  const { mutate: deleteTrack } = useMutation<ApiResponse<void>, Error, string>({
    mutationFn: async (trackId) => {
      return await TrackRepository.deleteTrack(trackId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nplaceRankShop', id] });
    }
  });

  // 트랙 상태 업데이트
  const { mutate: updateTrackStatus } = useMutation<ApiResponse<void>, Error, { trackId: string, status: 'RUNNING' | 'STOP' }>({
    mutationFn: async ({ trackId, status }) => {
      return await TrackRepository.updateTrackStatus(trackId, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nplaceRankShop', id] });
    }
  });

 

  // 키워드 목록 갱신
  const updateKeywordsMutation = useMutation({
    mutationFn: async () => {
      return await TrackRepository.updateKeywords(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nplaceRankShop', id] });
    }
  });

  // 순위 트랙 목록 (정렬된)
  const getNplaceRankTrackList = (selectedInfoEntryKey: string | null) => {
    if (!shopWithIdResult?.data?.nplaceRankShop || selectedInfoEntryKey === null) return [];
    
    const trackList = shopWithIdResult.data.nplaceRankShop.nplaceRankTrackInfoMap?.[selectedInfoEntryKey]?.nplaceRankTrackList || [];
    return [...trackList].sort((a, b) => a.chartDate > b.chartDate ? -1 : 1);
  };

  return {
    shopId: shopWithIdResult?.data?.nplaceRankShop?.id,
    businessSector: shopWithIdResult?.data?.nplaceRankShop?.businessSector,
    shop: shopWithIdResult?.data?.nplaceRankShop,
    isLoading,
    error,
    refetch,
    deleteShop,
    addKeyword,
    deleteTrack,
    updateTrackStatus,
    updateKeywords: updateKeywordsMutation.mutateAsync,
    isUpdatingKeywords: updateKeywordsMutation.isPending,
    isAddingKeyword,
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