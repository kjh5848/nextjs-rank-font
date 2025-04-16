"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/provider/StoreProvider";
import { Search, MapPin, Tag, ChevronDown } from 'lucide-react';

// 검색 폼 컴포넌트
export default function ModernSearchForm() {
  const [location, setLocation] = useState('서울시');
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [searchType, setSearchType] = useState('업체명');
  
  const handleSearch = () => {
    console.log('검색 실행:', { location, keyword, searchType });
  };

  const locations = ['서울시', '경기도', '인천시', '부산시', '대구시', '대전시'];
  
  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-gradient-to-r from-white to-blue-50 rounded-xl shadow-lg border border-blue-100">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">손쉬운 실시간 조회</h2>
        <p className="text-sm text-gray-500">원하는 정보를 빠르게 찾아보세요</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        {/* 검색 유형 선택 버튼 */}
        <div className="flex space-x-2">
          <button 
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${searchType === '업체명' 
              ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md' 
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'}`}
            onClick={() => setSearchType('업체명')}
          >
            업체명 검색
          </button>
          <button 
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${searchType === 'SHOP_ID' 
              ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md' 
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'}`}
            onClick={() => setSearchType('SHOP_ID')}
          >
            SHOP_ID 검색
          </button>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-3">
        {/* 지역 선택 드롭다운 */}
        <div className="relative md:col-span-3">
          <div 
            className="flex items-center justify-between w-full p-3 bg-white border border-gray-200 rounded-lg cursor-pointer shadow-sm hover:shadow transition-all"
            onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
          >
            <div className="flex items-center">
              <MapPin size={18} className="text-blue-500 mr-2" />
              <span className="text-gray-700">{location}</span>
            </div>
            <ChevronDown size={18} className={`text-blue-500 transition-transform ${isLocationDropdownOpen ? 'transform rotate-180' : ''}`} />
          </div>
          
          {isLocationDropdownOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
              {locations.map((loc) => (
                <div 
                  key={loc} 
                  className="p-3 hover:bg-blue-50 cursor-pointer"
                  onClick={() => {
                    setLocation(loc);
                    setIsLocationDropdownOpen(false);
                  }}
                >
                  {loc}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* 검색어 입력 필드 */}
        <div className="relative md:col-span-6">
          <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 shadow-sm focus-within:ring-2 focus-within:ring-blue-300 focus-within:border-blue-300 transition-all">
            <Tag size={18} className="text-blue-500" />
            <input
              type="text"
              placeholder={searchType === '업체명' ? "업체명을 입력하세요" : "SHOP_ID를 입력하세요"}
              className="w-full p-3 bg-transparent outline-none text-gray-700 placeholder-gray-400"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
        </div>
        
        {/* 키워드 필드 */}
        <div className="md:col-span-3">
          <input
            type="text"
            placeholder="키워드"
            className="w-full p-3 bg-white border border-gray-200 rounded-lg outline-none text-gray-700 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all"
          />
        </div>
      </div>
      
      {/* 검색 버튼 */}
      <div className="mt-4">
        <button
          className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center"
          onClick={handleSearch}
        >
          <Search size={18} className="mr-2" />
          검색 시작
        </button>
      </div>
    </div>
  );
}