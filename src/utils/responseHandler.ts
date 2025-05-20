import { ApiResponse } from "@/types/api";

export async function processApiResponse<T>(response: Response, skipRedirect: boolean = false): Promise<ApiResponse<T>> {
  const text = await response.text();
  
  if (!text) {
    return {
      code: response.ok ? "0" : String(response.status),
      message: response.statusText || '서버에서 응답이 없습니다.',
      data: null as unknown as T
    };
  }
  
  try {
    // HTML 응답인지 확인 (<!DOCTYPE 또는 <html로 시작하는지)
    if (text.trim().toLowerCase().startsWith('<!doctype') || text.trim().toLowerCase().startsWith('<html')) {
      if (typeof window !== "undefined" && !skipRedirect) {
        // 세션 쿠키 삭제
        document.cookie = "JSESSIONID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        // 로그인 페이지로 직접 이동
        window.location.href = "/";
      }
      return {
        code: "401",
        data: null as unknown as T,
        message: '세션이 만료되었습니다. 다시 로그인해주세요.'
      };
    }
    
    const data = JSON.parse(text);
    
    // 세션 만료 또는 로그인 필요 응답 처리
    if ((data.code === "-99" || data.code === "401" || data.code === "-9") && !skipRedirect) {
      // console.log('[API 응답] 세션 만료 감지:', data);
      if (typeof window !== "undefined") {
        // 세션 쿠키 삭제
        document.cookie = "JSESSIONID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        // 로그인 페이지로 직접 이동
        window.location.href = "/";
      }
      return {
        code: "401",
        data: null as unknown as T,
        message: data.message || '로그인이 필요한 서비스입니다.'
      };
    }
    
    return {
      code: String(data.code),
      data: data.data,
      message: data.message || ''
    };
  } catch (error) {
    console.error('응답 처리 중 에러 발생:', error);
    return {
      code: "-1",
      data: null as unknown as T,
      message: '응답 형식이 올바르지 않습니다. 서버 연결을 확인해주세요.'
    };
  }
} 