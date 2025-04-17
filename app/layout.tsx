// app/layout.tsx  (서버 컴포넌트)
import { cookies } from 'next/headers';
import '@/styles/global.css';
import { StoreProvider, User } from '@/store/provider/StoreProvider';
import AuthInitializer from '@/components/auth/AuthInitializer'; // AuthInitializer 임포트
import AuthRepository from '@/model/AuthRepository'; // AuthRepository 임포트

// 서버 측에서 사용자 정보를 가져오는 함수 (예시)
async function getUserFromSession(): Promise<User | null> {
  try {
    // 서버 환경에서는 쿠키를 직접 사용하거나, 서버용 checkAuth 함수 필요
    // 여기서는 예시로 checkAuth를 호출하지만, 실제 구현은 환경에 맞게 조정 필요
    // 참고: 클라이언트 fetch와 달리 서버에서는 쿠키 자동 전송 방식이 다를 수 있음

    // Next.js 서버 컴포넌트에서 fetch 시 쿠키 자동 전달을 위해 headers 사용 가능
    const cookieStore = await cookies(); // await 추가
    const cookieHeader = cookieStore.getAll().map(cookie => `${cookie.name}=${cookie.value}`).join('; ');

    // AuthRepository에 apiBaseUrl이 정의되어 있는지 확인 필요. 없다면 직접 URL 입력
    const baseUrl = AuthRepository.apiBaseUrl || process.env.NEXT_PUBLIC_API_BASE_URL || ''; // AuthRepository.apiBaseUrl 사용 및 환경 변수 fallback 추가
    const response = await fetch(`${baseUrl}/api/auth/check`, { // 수정된 baseUrl 사용
      headers: {
        'Cookie': cookieHeader, // 쿠키 헤더 추가
      },
      cache: 'no-store', // 캐시 사용 안 함
    });


    if (response.ok) {
      const text = await response.text();
      try {
        const json = JSON.parse(text);
        // API 응답 구조에 맞게 사용자 정보 추출
        if (json.code === 0 && json.data?.user) {
          return json.data.user as User;
        }
      } catch (e) {
        console.error("Server checkAuth JSON parse error:", e);
      }
    } else {
       console.error("Server checkAuth response not OK:", response.status, await response.text());
    }
  } catch (error) {
    console.error('Server session check error:', error);
  }
  return null;
}


export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // 서버에서 사용자 정보 가져오기 시도
  const initialUser = await getUserFromSession();

  return (
    <html lang="ko">
      <body>
        {/* StoreProvider는 클라이언트 컴포넌트이므로 그대로 둠 */}
        <StoreProvider>
          {/* AuthInitializer를 렌더링하고 서버에서 가져온 사용자 정보 전달 */}
          <AuthInitializer user={initialUser} />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
