"use client";

import { useForm } from "react-hook-form";
import TrackHeader from "./TrackHeader";
import TrackFilter from "./TrackFilter";
import TrackList from "./TrackList";
import TrackKeywordTable from "./TrackKeywordTable";
import TrackGroup from "./TrackGroup";
import TrackNplaceSearch from "./TrackNplaceSearch";
import { useTrackContent } from "@/use/useTrackContent";

export default function TrackContent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const {
    // States
    selectedGroup,
    setSelectedGroup,
    selectedShopList,
    isTrackableModalShow,
    setIsTrackableModalShow,
    isGroupChangeModalShow,
    isExcelUploadModalShow,
    trackableResult,
    isLoading,
    error,
    groupList,
    isAddingShop,
    isFetchingTrackable,
    filteredShopList,

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
  } = useTrackContent();

  

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-4 rounded-lg bg-red-100 p-4 text-sm text-red-700">
        오류가 발생했습니다: {error.message}
      </div>
    );
  }

  return (
    <div>
      

      <div className="mb-6 overflow-hidden rounded-xl border border-blue-100 bg-gradient-to-r from-white to-blue-50 shadow-lg">
        <div className="p-4 sm:p-6">
          <TrackFilter
            selectedGroup={selectedGroup}
            setSelectedGroup={setSelectedGroup}
            groupList={groupList}
            handleGroupChangeModalShow={handleGroupChangeModalShow}
            setIsTrackableModalShow={setIsTrackableModalShow}
          />

          <hr className="my-4 border-gray-200" />

          <TrackList
            handleSelectAll={handleSelectAll}
            filteredShopList={filteredShopList}
            selectedShopList={selectedShopList}
            handleShopSelect={handleShopSelect}
            getRankString={getRankString}
          />
        </div>
      </div>

      <TrackKeywordTable />

      <TrackNplaceSearch
        isOpen={isTrackableModalShow}
        onClose={handleTrackableModalClose}
        onSearch={handleTrackableSearch}
        onAdd={handleAddTrackable}
        trackableResult={trackableResult}
        isFetchingTrackable={isFetchingTrackable}
        isAddingShop={isAddingShop}
      />

      <TrackGroup
        isOpen={isGroupChangeModalShow}
        onClose={handleChangeGroupModalClose}
        onSubmit={onChangeGroupModalSubmit}
        groupList={groupList}
      />
    </div>
  );
}
