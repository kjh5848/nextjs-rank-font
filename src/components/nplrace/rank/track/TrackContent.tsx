"use client";

import { useForm } from "react-hook-form";
import TrackHeader from "./TrackHeader";
import TrackFilter from "./TrackFilter";
import TrackList from "./TrackList";
import TrackKeywordTable from "./TrackKeywordTable";
import TrackGroup from "./TrackGroup";
import TrackNplaceSearch from "./TrackNplaceSearch";
import TrackGridView from "./id/TrackGridView";
import { useTrackContent } from "@/use/useTrackContent";
import { TrackData } from "@/model/TrackRepository";


export default function TrackContent() {
  const {
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


  return (
    <div>
      <div className="">
          <TrackHeader />
        <div className="mb-6 overflow-hidden rounded-xl border border-blue-100 bg-gradient-to-r from-white to-blue-50 shadow-lg">
          <div className="mt-2 p-4 sm:p-6">

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
    </div>
  );
}
