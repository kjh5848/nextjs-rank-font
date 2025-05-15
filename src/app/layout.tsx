import { StoreProvider } from '@/src/store/provider/StoreProvider';
import { Inter } from "next/font/google";
import QueryProviders from "../store/provider/QueryProviders";
import "@/styles/global.css";
import { headers } from 'next/headers';

export const metadata = {
  title: "내 순위 랭킹",
  description:
    "지역의 상권과 업체 정보를 포함한 순위를 제공하는 플랫폼",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body >
        <QueryProviders>
          <StoreProvider 
          >
            <main className="">{children}</main>
          </StoreProvider>
        </QueryProviders>
      </body>
    </html>
  );
}
