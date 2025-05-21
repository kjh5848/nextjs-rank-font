import TrackRepository, { Shop, TrackInfo, TrackData, RankCheckData } from '@/src/model/TrackRepository';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiResponse } from '@/types/api';

interface NplaceRankTrackWithIdViewModelProps {
  id: string;
}

export const useNplaceRankTrackWithIdViewModel = ({ id }: NplaceRankTrackWithIdViewModelProps) => {
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
      return response;
    }
  });

  // 플레이스 삭제
  const { mutate: deleteShop } = useMutation<ApiResponse<void>, Error>({
    mutationFn: async () => {
      return await TrackRepository.deleteShop(id);
    },
    onSuccess: async () => {
      // 쿼리 무효화 후 이전 페이지로 이동
      await queryClient.invalidateQueries({ queryKey: ['nplaceRankShop'] });
      // 데이터가 업데이트될 때까지 잠시 대기
      await new Promise(resolve => setTimeout(resolve, 100));
      if (typeof window !== 'undefined') {
        window.history.back();
      }
    },
    onError: (error) => {
      console.error('플레이스 삭제 중 오류:', error);
    }
  });

  // 트랙 추가 → addKeyword로 이름 변경 및 businessSector, shopId 활용
  const { mutateAsync: addKeyword, isPending: isAddingKeyword } = useMutation<
    ApiResponse<TrackInfo>,
    Error,
    { keyword: string; province: string }
  >({
    mutationFn: async ({ keyword, province }) => {
      if (!shopWithIdResult?.data?.nplaceRankShop) {
        throw new Error("상점 정보가 없습니다.");
      }

      if (!keyword.trim()) throw new Error("키워드를 입력해주세요.");
      if (!province.trim()) throw new Error("지역을 선택해주세요.");
      if (!shopWithIdResult.data.nplaceRankShop.id)
        throw new Error("상점 ID가 없습니다.");

      const result = await TrackRepository.addTrack({
        keyword: keyword.trim(),
        province: province.trim(),
        shopId: shopWithIdResult.data.nplaceRankShop.shopId,
        businessSector:
          shopWithIdResult.data.nplaceRankShop.businessSector || "",
      });

      return result;
    },

    onSuccess: async (data) => {
      // 서버에서 내려준 최신 객체로 캐시 전체 덮어쓰기
      queryClient.setQueryData(["nplaceRankShop", id], data);

      // 필요하다면 관련 쿼리 무효화(리스트 등)
      await queryClient.invalidateQueries({ queryKey: ["nplaceRankShop"] });
    },
  });


  
  // 트랙 삭제
  const { mutateAsync: deleteTrack } = useMutation<ApiResponse<void>, Error, string>({
    mutationFn: async (trackId) => {
      return await TrackRepository.deleteTrack(trackId);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['nplaceRankShop', id] });
    }
  });


  // 트랙 상태 업데이트
  const { mutateAsync: updateTrackStatus } = useMutation<ApiResponse<void>, Error, { trackId: string, status: 'RUNNING' | 'STOP' }>({
    mutationFn: async ({ trackId, status }) => {
      return await TrackRepository.updateTrackStatus(trackId, status);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['nplaceRankShop', id] });
    }
  });

 
  // 키워드 목록 갱신
  const updateKeywordsMutation = useMutation({
    mutationFn: async () => {
      return await TrackRepository.updateKeywords(id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['nplaceRankShop', id] });
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

