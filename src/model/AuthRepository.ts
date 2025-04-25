// 세션 기반 인증을 지원하는 AuthRepository
// "https://xn--220b334axrd.com"
interface UserDto {
  username: string;
  password: string;
  name?: string;
  companyName?: string
  companyNumber?: string
  tel?: string
  simpleDescription?: string;
}

interface AuthRequestDto {
  user: UserDto;
  [key: string]: any;
}

class AuthRepository {
  static url = "/v1/auth";
  static apiBaseUrl = process.env.NEXT_PUBLIC_API_URL

  // 회원가입 요청
  static async postJoin(reqDto: AuthRequestDto): Promise<Response> {
    return await fetch(`${this.apiBaseUrl}${this.url}/join`, {
      method: "POST",
      credentials: "include", // 세션 쿠키를 포함하기 위해 필요
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqDto)
    });
  }

  // 로그인 요청 (세션 기반)
  static async postLogin(reqDto: AuthRequestDto): Promise<Response> {
    const response = await fetch(`${this.apiBaseUrl}${this.url}/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        // 이미 로그인된 세션이 있다면 전송
        ...(document.cookie && { "Cookie": document.cookie })
      },
      body: JSON.stringify(reqDto)
    });

    return response;
  }

  // 인증 상태 확인 (세션 쿠키를 사용한 인증 확인)
  static async checkAuth(): Promise<Response> {
    try {
      const response = await fetch(`${this.apiBaseUrl}${this.url}/info`, {
        credentials: "include",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
          // 기존 세션 ID를 쿠키에서 가져와서 명시적으로 전송
        }
      });
      
      // 응답 헤더 로깅
      console.log('서버 응답 헤더:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries())
      });

      // 새로운 세션 ID가 발급되면 경고
      const setCookie = response.headers.get('set-cookie');
      if (setCookie && setCookie.includes('JSESSIONID')) {
        console.warn('서버가 새로운 세션 ID를 발급했습니다:', setCookie);
      }

      return response;
    } catch (error) {
      console.error('인증 확인 중 에러 발생:', error);
      throw error;
    }
  }

  // 로그아웃 요청 (세션 쿠키 제거)
  static async logout(): Promise<Response> {
    return await fetch(`${this.apiBaseUrl}${this.url}/logout`, {
      method: "POST",
      credentials: "include", // 세션 쿠키를 포함하기 위해 필요
    });
  }
}

export default AuthRepository;