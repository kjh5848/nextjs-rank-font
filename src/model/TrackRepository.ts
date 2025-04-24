// 타입 정의
export type Shop = {
  id: string;
  shopId: string;
  shopName: string;
  shopImageUrl: string;
  groupName: string;
  nplaceRankTrackInfoList: TrackInfo[];
};

export type TrackInfo = {
  id: string;
  keyword: string;
  province: string;
  rank: number | null;
  rankChange: number;
};

export type Group = {
  id: string;
  groupName: string;
};

class TrackRepository {
  static url = "/v1/nplace/rank";
  static apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

  // 상점 목록 조회
  static async getShopList(): Promise<{ code: number; data: { nplaceRankShopList: Shop[] }; message?: string }> {
    const response = await fetch(`${this.apiBaseUrl}${this.url}/shop`, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error('상점 목록을 불러오는데 실패했습니다.');
    }
    const text = await response.text();
    console.log('shop응답 텍스트:', text);
    const data = JSON.parse(text);
    console.log('shop파싱된 데이터:', data);
    if (data.code !== 0) {
      throw new Error(data.message || '상점 목록을 불러오는데 실패했습니다.');
    }
    return data;
  }

  // 그룹 목록 조회
  static async getGroupList(): Promise<{ code: number; data: { groupList: Group[] }; message?: string }> {
    const response = await fetch(`${this.apiBaseUrl}/v1/group/list`, {
      credentials: "include",
    });
  
    if (!response.ok) {
      throw new Error('그룹 목록을 불러오는데 실패했습니다.');
    }
    const text = await response.text();
    console.log('list응답 텍스트:', text);
    const data = JSON.parse(text);
    console.log('list파싱된 데이터:', data);
    if (data.code !== 0 && data.code !== -8) {
      throw new Error(data.message || '그룹 목록을 불러오는데 실패했습니다.');
    }
    return data;
  }

  // 추적 가능한 플레이스 검색
  static async searchTrackable(url: string): Promise<any> {
    const response = await fetch(`${this.apiBaseUrl}${this.url}/trackable?url=${encodeURIComponent(url)}`, {
      credentials: "include",
    });
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

  // 상점 추가
  static async addShop(shop: any): Promise<any> {
    const response = await fetch(`${this.apiBaseUrl}${this.url}/shop`, {
      method: 'POST',
      credentials: "include",
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
  }

  // 그룹 변경
  static async updateGroup(shopIds: string[], group: any): Promise<any> {
    const response = await fetch(`${this.apiBaseUrl}${this.url}/shop/group`, {
      method: 'POST',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nplaceRankShopList: shopIds,
        group: group
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
  }

  // 상점 상세 정보 조회
  static async getShopDetail(id: string): Promise<any> {
    const response = await fetch(`${this.apiBaseUrl}${this.url}/shop/${id}`, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error('상점 정보를 불러오는데 실패했습니다.');
    }
    const data = await response.json();
    if (data.code !== 0) {
      throw new Error(data.message || '상점 정보를 불러오는데 실패했습니다.');
    }
    return data;
  }

  // 상점 삭제
  static async deleteShop(id: string): Promise<any> {
    const response = await fetch(`${this.apiBaseUrl}${this.url}/shop/${id}`, {
      method: 'DELETE',
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error('상점 삭제에 실패했습니다.');
    }
    const data = await response.json();
    if (data.code !== 0) {
      throw new Error(data.message || '상점 삭제에 실패했습니다.');
    }
    return data;
  }

  // 키워드 갱신
  static async updateKeywords(id: string): Promise<any> {
    const response = await fetch(`${this.apiBaseUrl}${this.url}/shop/${id}/keyword`, {
      method: 'POST',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nplaceRankShop: {
          id: id
        }
      })
    });
    if (!response.ok) {
      throw new Error('키워드 갱신에 실패했습니다.');
    }
    const data = await response.json();
    if (data.code !== 0) {
      throw new Error(data.message || '키워드 갱신에 실패했습니다.');
    }
    return data;
  }

  // 키워드 추가
  static async addTrack(trackInfo: {
    keyword: string;
    province: string;
    shopId: string;
    businessSector: string;
  }): Promise<any> {
    const response = await fetch(`${this.apiBaseUrl}${this.url}/track`, {
      method: 'POST',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nplaceRankTrackInfo: trackInfo
      })
    });
    if (!response.ok) {
      throw new Error('키워드 추가에 실패했습니다.');
    }
    const data = await response.json();
    if (data.code !== 0) {
      throw new Error(data.message || '키워드 추가에 실패했습니다.');
    }
    return data;
  }

  // 순위 체크 데이터 조회
  static async getRankCheckData(keyword: string, province: string, searchDate: string): Promise<any> {
    const response = await fetch(`${this.apiBaseUrl}${this.url}/realtime/list`, {
      method: 'POST',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nplaceRankCheckData: {
          keyword,
          province,
          searchDate
        }
      })
    });
    if (!response.ok) {
      throw new Error('순위 체크 데이터를 불러오는데 실패했습니다.');
    }
    const data = await response.json();
    if (data.code !== 0) {
      throw new Error(data.message || '순위 체크 데이터를 불러오는데 실패했습니다.');
    }
    return data;
  }
}

export default TrackRepository; 