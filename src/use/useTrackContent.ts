import { useState, useRef } from "react";
import { useNplaceRankTrackViewModel } from "@/src/viewModel/nplace/nplaceRankTrackViewModel";
import { TrackInfo, TrackData } from "@/model/TrackRepository";

export function useTrackContent() {

  const {
    shopList: nplaceRankShopList,
    isLoading,
    error,
    groupList,
    addShop,
    fetchTrackable,
    isAddingShop,
    isFetchingTrackable,
    groupListError,
    updateGroup,
    isUpdatingGroup,
    deleteShop,
  } = useNplaceRankTrackViewModel();
  

  // 선택된 상점의 상세 정보를 관리하는 상태
  const [selectedShopDetail, setSelectedShopDetail] = useState<{
    shopId: string;
    trackInfoList: TrackInfo[];
    trackDataList: TrackData[];
  } | null>(null);

  // 선택된 상점의 상세 정보를 가져오는 함수
  const fetchSelectedShopDetail = async (shopId: string) => {
    try {
      const shop = nplaceRankShopList?.find(s => s.id === shopId);
      if (!shop) return;

      const trackInfoList = shop.nplaceRankTrackInfoList || [];
      const trackDataList = trackInfoList.flatMap(track => track.nplaceRankTrackList || []);
      
      setSelectedShopDetail({
        shopId,
        trackInfoList,
        trackDataList,
      });
    } catch (error) {
      console.error("상점 상세 정보 조회 실패:", error);
    }
  };

  // Refs
  const trackableModalUrlInputRef = useRef<HTMLInputElement>(null);
  const trackableModalSearchButtonRef = useRef<HTMLButtonElement>(null);

  // States
  const [selectedGroup, setSelectedGroup] = useState("all");
  const [selectedShopList, setSelectedShopList] = useState<Set<string>>(new Set());
  const [isTrackableModalShow, setIsTrackableModalShow] = useState(false);
  const [isGroupChangeModalShow, setIsGroupChangeModalShow] = useState(false);
  const [trackableResult, setTrackableResult] = useState<any>(null);

  // Filtered shop list
  const filteredShopList = selectedGroup === 'all' 
    ? nplaceRankShopList 
    : nplaceRankShopList?.filter(shop => {
      if (!shop.groupName) return false;
      const groupNames = shop.groupName.split(',');
      return groupNames.some(name => name.trim() === selectedGroup);
    });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allShopIds = filteredShopList.map((shop) => shop.id);
      setSelectedShopList(new Set(allShopIds));
    } else {
      setSelectedShopList(new Set());
    }
  };

  // Handlers
  const handleShopSelect = async (shopId: string) => {
    setSelectedShopList(prev => {
      const newSet = new Set(prev);
      if (newSet.has(shopId)) {
        newSet.delete(shopId);
        setSelectedShopDetail(null);
      } else {
        newSet.add(shopId);
        fetchSelectedShopDetail(shopId);
      }
      return newSet;
    });
  };

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
      console.error("검색 실패", error);
      alert("검색에 실패했습니다.");
    }
  };

  const handleAddTrackable = async () => {
    if (!trackableResult) return;

    try {
      await addShop(trackableResult.nplaceRankShop);
      alert("플레이스가 등록되었습니다.");
      handleTrackableModalClose();
    } catch (error) {
      console.error("등록 실패", error);
      alert("등록에 실패했습니다.");
    }
  };

  const handleTrackableModalClose = () => {
    if (trackableModalUrlInputRef.current) {
      trackableModalUrlInputRef.current.value = "";
    }
    setTrackableResult(null);
    setIsTrackableModalShow(false);
  };

  const handleTrackableModalUrlInputKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      trackableModalSearchButtonRef.current?.click();
    }
  };

  const handleGroupChangeModalShow = () => {
    if (selectedShopList.size === 0) {
      alert("플레이스를 1개 이상 선택해주세요.");
      return;
    }
    setIsGroupChangeModalShow(true);
  };

  const handleChangeGroupModalClose = () => {
    setIsGroupChangeModalShow(false);
  };

  const onChangeGroupModalSubmit = async (data: any) => {
    try {
      await updateGroup(Array.from(selectedShopList), data);
      alert("그룹이 변경되었습니다.");
      setSelectedShopList(new Set());
      handleChangeGroupModalClose();
    } catch (error) {
      console.error("그룹 변경 실패", error);
      alert("그룹 변경에 실패했습니다.");
    }
  };

  const getRankString = (rank: number | null) => {
    if (rank === null) {
      return "추적 대기";
    } else if (rank === -1) {
      return "순위권 이탈";
    } else {
      return `${rank}위`;
    }
  };

  return {
    // States
    selectedGroup,
    setSelectedGroup,
    selectedShopList,
    isTrackableModalShow,
    setIsTrackableModalShow,
    isGroupChangeModalShow,
    trackableResult,
    isLoading,
    error,
    groupList,
    isAddingShop,
    isFetchingTrackable,
    groupListError,
    isUpdatingGroup,
    filteredShopList,
    deleteShop,

    // Refs
    trackableModalUrlInputRef,
    trackableModalSearchButtonRef,

    // Handlers
    handleShopSelect,
    handleTrackableSearch,
    handleAddTrackable,
    handleTrackableModalClose,
    handleTrackableModalUrlInputKeyUp,
    handleGroupChangeModalShow,
    handleChangeGroupModalClose,
    onChangeGroupModalSubmit,
    getRankString,
    handleSelectAll,
    fetchSelectedShopDetail,
    
  };
} 