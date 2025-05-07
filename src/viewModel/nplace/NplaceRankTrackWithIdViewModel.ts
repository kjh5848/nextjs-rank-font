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

  // 트랙 추가
  const { mutate: addTrack } = useMutation<ApiResponse<TrackInfo>, Error, { keyword: string; province: string; shopId: string; businessSector: string }>({
    mutationFn: async (trackData) => {
      return await TrackRepository.addTrack(trackData);
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

  // 순위 체크 데이터 조회
  const { data: rankCheckResult } = useQuery<ApiResponse<RankCheckData>, Error>({
    queryKey: ['rankCheck', id],
    queryFn: async () => {
      return await TrackRepository.getRankCheckData(id, 'NAVER', 'PLACE');
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
    shop: shopWithIdResult?.data?.nplaceRankShop,
    rankCheckData: rankCheckResult?.data,
    isLoading,
    error,
    refetch,
    deleteShop,
    addTrack,
    deleteTrack,
    updateTrackStatus,
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