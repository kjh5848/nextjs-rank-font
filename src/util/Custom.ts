import UtilFunction from "@/src/util/UtilFunction";

class Custom {
  static baseUrl = "https://jaylogapi.jaybon.org";

  static async fetch(url: string, options: RequestInit = {}): Promise<Response> {
    const customUrl = `${this.baseUrl}${url}`;
    const customOptions = UtilFunction.attachAuthorizationHeader(options);
    
    // 브라우저 환경에서만 fetch 실행
    if (typeof window !== 'undefined') {
      const response = await window.fetch(customUrl, customOptions);
      return await UtilFunction.handleCustomFetchResponse(response, customUrl, customOptions);
    } else {
      // 서버 사이드 렌더링 환경에서는 기본 fetch 사용
      const response = await fetch(customUrl, customOptions);
      return response;
    }
  }
}

export default Custom;