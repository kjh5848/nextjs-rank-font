import { ApiResponse } from "@/types/api";
import { processApiResponse } from "@/utils/responseHandler";

interface Group {
  id: number;
  serviceSort: string;
  groupName: string;
  memo?: string;
  count?: number;
  createDate?: string;
}
export type ReqSaveGroupDTO = {
  group: {
    serviceSort: string;
    groupName: string;
    memo?: string;
  };
};

export type ReqDeleteGroupDTO = {
  group: {
    id: number;
    serviceSortName: string;
    serviceSortValue: string;
    groupName: string;
    memo?: string;
    count?: number;
    createDate?: string;
  };
};

class GroupRepository {
  static apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.내순위.com";

  // 그룹 생성
  static async saveGroup(reqDto: ReqSaveGroupDTO): Promise<ApiResponse<Group>> {
    const response = await fetch(`${this.apiBaseUrl}/v1/group`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqDto),
    });
    if (!response.ok) throw new Error("그룹 생성에 실패했습니다.");
    return processApiResponse(response);
  }

  // 그룹 목록 조회
  static async getGroupList(): Promise<ApiResponse<{ groupList: Group[] }>> {
    const response = await fetch(`${this.apiBaseUrl}/v1/group/list`, {
      credentials: "include",
    });
    if (!response.ok) throw new Error("그룹 목록 조회에 실패했습니다.");
    return processApiResponse(response);
  }

//   // 그룹 수정
//   static async updateGroup(reqDto: ReqUpdateGroupDTO): Promise<ApiResponse<Group>> {
//     const response = await fetch(`${this.apiBaseUrl}/v1/group`, {
//       method: "PATCH",
//       credentials: "include",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(reqDto),
//     });
//     if (!response.ok) throw new Error("그룹 수정에 실패했습니다.");
//     return processApiResponse(response);
//   }

  // 그룹 삭제
  static async deleteGroup(reqDto: ReqDeleteGroupDTO): Promise<ApiResponse<void>> {
    const response = await fetch(`${this.apiBaseUrl}/v1/group`, {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqDto),
    });
    if (!response.ok) throw new Error("그룹 삭제에 실패했습니다.");
    return processApiResponse(response);
  }

//   // 그룹-상점 연결
//   static async connectGroupAndShop(reqDto: ReqConnectGroupAndShopDTO): Promise<ApiResponse<void>> {
//     const response = await fetch(`${this.apiBaseUrl}/v1/group/shop`, {
//       method: "POST",
//       credentials: "include",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(reqDto),
//     });
//     if (!response.ok) throw new Error("그룹-상점 연결에 실패했습니다.");
//     return processApiResponse(response);
//   }
}

export default GroupRepository;

