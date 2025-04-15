// 세션 기반 인증을 지원하는 AuthRepository

interface UserDto {
  username: string;
  password: string;
  name?: string;
  simpleDescription?: string;
}

interface AuthRequestDto {
  user: UserDto;
  [key: string]: any;
}

class AuthRepository {
  static url = "/v1/auth";
  static apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081";

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
    return await fetch(`${this.apiBaseUrl}${this.url}/login`, {
      method: "POST",
      credentials: "include", // 세션 쿠키를 포함하기 위해 필요
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqDto)
    });
  }

  // 인증 상태 확인 (세션 쿠키를 사용한 인증 확인)
  static async checkAuth(): Promise<Response> {
    return await fetch(`${this.apiBaseUrl}${this.url}/me`, {
      method: "GET",
      credentials: "include", // 세션 쿠키를 포함하기 위해 필요
    });
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