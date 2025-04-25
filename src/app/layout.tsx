import { StoreProvider } from '@/src/store/provider/StoreProvider';
import { Inter } from "next/font/google";
import QueryProviders from "../store/provider/QueryProviders";
import "@/styles/global.css";
import { getUserFromSession } from '../util/auth/Auth';
import { headers } from 'next/headers';
const inter = Inter({ subsets: ["latin"], display: 'swap' });

export const metadata = {
  title: "내 순위 랭킹",
  description:
    "지역의 상권과 업체 정보를 포함한 순위를 제공하는 플랫폼",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = headers();
  const sessionId = (await headersList).get('cookie')?.match(/JSESSIONID=([^;]+)/)?.[1];
  
  // 서버에서 사용자 정보 가져오기 시도
  const initialUser = await getUserFromSession();
  
  return (
    <html lang="ko">
      <body className={inter.className}>
        <QueryProviders>
          <StoreProvider 
            initialUser={initialUser}
            initialSessionId={sessionId}  // 세션 ID 전달
          >
            <main className="">{children}</main>
          </StoreProvider>
        </QueryProviders>
      </body>
    </html>
  );
}
