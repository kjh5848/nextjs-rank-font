import { jwtDecode } from "jwt-decode";
import Custom from "@/src/util/Custom";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

interface JwtPayload {
  username?: string;
  simpleDescription?: string;
  profileImage?: string;
  roleList?: string[];
  [key: string]: any;
}

interface User {
  username: string;
  simpleDescription: string;
  profileImage: string;
  roleList: string[];
}

interface ResponseType extends Response {
  data?: any;
  message?: string;
}

class UtilFunction {
  static temp(str: string): string {
    return str;
  }

  static getUserByAccessJwt(): User | null {
    if (typeof window === 'undefined') {
      return null; // 서버 사이드 렌더링 시 null 반환
    }

    const accessJwt = localStorage.getItem("accessJwt");
    if (accessJwt == null) {
      return null;
    }
    
    let jwtPayload: JwtPayload;
    try {
      jwtPayload = jwtDecode<JwtPayload>(accessJwt);
    } catch (error) {
      return null;
    }
    
    if (jwtPayload.username == null) {
      return null;
    }
    
    return {
      username: jwtPayload.username,
      simpleDescription: jwtPayload.simpleDescription || "",
      profileImage: jwtPayload.profileImage || "",
      roleList: jwtPayload.roleList || []
    };
  }

  static goBackBy(navigate: AppRouterInstance): void {
    if (typeof window === 'undefined') {
      return; // 서버 사이드 렌더링 시 return
    }

    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get("from") != null) {
      const from = atob(searchParams.get("from") as string);
      navigate.push(from);
    } else {
      navigate.push("/");
    }
  }

  static async handleNotOkResponse(
    response: ResponseType, 
    setLoginUser?: (user: User | null) => void
  ): Promise<void> {
    if (response.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem("accessJwt");
        localStorage.removeItem("refreshJwt");
      }
      
      if (setLoginUser) {
        setLoginUser(null);
      }
      
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const dto = await response.json();
      if (dto?.message) {
        alert(dto.message);
      } else {
        alert(response.statusText);
      }
    } catch (error: any) {
      if (error?.response?.data?.detail != null) {
        alert(JSON.stringify(error.response.data.detail));
      } else if (error?.response?.data?.message != null) {
        alert(error.response.data.message);
      } else {
        alert("오류가 발생했습니다. 관리자에게 문의하세요.");
      }
    }
  }

  static async handleCustomFetchResponse(
    response: Response, 
    url: string, 
    options: RequestInit
  ): Promise<Response> {
    if (!response.ok) {
      if (response.status === 401) {
        if (typeof window === 'undefined') {
          return response; // 서버 사이드 렌더링 시 응답 반환
        }

        const refreshJwt = localStorage.getItem('refreshJwt');
        if (refreshJwt === null) {
          return response;
        }
        
        const responseOfRefresh = await fetch(`${Custom.baseUrl}/v1/auth/refresh`, {
          method: 'POST',
          body: JSON.stringify({ refreshJwt }),
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        if (!responseOfRefresh.ok) {
          return responseOfRefresh;
        }
        
        const dto = await responseOfRefresh.json();
        localStorage.setItem('accessJwt', dto.data.accessJwt);
        localStorage.setItem('refreshJwt', dto.data.refreshJwt);
        
        const newOptions = this.attachAuthorizationHeader(options);
        const responseOfRetry = await fetch(url, newOptions);
        return responseOfRetry;
      }
    }
    return response;
  }

  static attachAuthorizationHeader(options: RequestInit = {}): RequestInit {
    if (typeof window === 'undefined') {
      return options; // 서버 사이드 렌더링 시 기존 옵션 반환
    }

    const accessJwt = localStorage.getItem('accessJwt');
    const headers = { ...options.headers } as Record<string, string>;
    
    if (accessJwt) {
      headers['Authorization'] = `Bearer ${accessJwt}`;
    }
    
    return {
      ...options,
      headers
    };
  }
}

export default UtilFunction;