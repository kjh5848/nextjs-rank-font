"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import UserDropdown from "@/src/components/common/Dropdowns/UserDropdown";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  /* 라우트가 바뀌면 자동으로 드로어 닫기 */
  useEffect(() => setIsOpen(false), [pathname]);

  const toggleSidebar = () => setIsOpen(prev => !prev);

  return (
    <>
      {/* ────────── 컨테이너 (xl 이상 고정) ────────── */}
      <nav className="bg-rank-sidebar relative z-40 flex flex-wrap items-center justify-between px-4 py-3 shadow-xl md:px-6 md:py-4 xl:fixed xl:top-0 xl:bottom-0 xl:left-0 xl:block xl:w-56 xl:overflow-y-auto">
        <div className="mx-auto flex w-full flex-wrap items-center justify-between px-0 xl:flex-col xl:items-stretch">
          {/* 모바일/태블릿/데스크톱 토글 버튼 */}
          <button
            aria-label="Toggle sidebar"
            aria-expanded={isOpen}
            onClick={toggleSidebar}
            className="from-rank-primary to-rank-secondary flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r text-white shadow-lg transition-all duration-200 hover:scale-105 md:h-10 md:w-10 xl:hidden"
          >
            {isOpen ? <X size={20} className="md:size-6" /> : <Menu size={20} className="md:size-6" />}
          </button>

          {/* 브랜드 */}
          <Link href="/" className="flex items-center">
            <Image
              src="/img/brand/rank_rogo.png"
              alt="내순위"
              width={150}
              height={40}
              priority
              sizes="(max-width: 768px) 100px, (max-width: 1024px) 120px, 150px"
              className="h-10 w-auto md:h-14 xl:h-20"
            />
          </Link>

          {/* 모바일/태블릿/데스크톱 사용자 메뉴 */}
          <ul className="flex items-center xl:hidden">
            <li>
              <UserDropdown />
            </li>
          </ul>

          {/* ────────── 드로어 ────────── */}
          <div
            className={`bg-rank-sidebar fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 xl:static xl:translate-x-0 xl:shadow-none ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* 드로어 헤더 (모바일/태블릿/데스크톱용) */}
            <div className="flex items-center justify-between p-3 md:p-4 xl:hidden">
              <Image
                src="/img/brand/rank_rogo.png"
                alt="내순위"
                width={100}
                height={32}
                className="h-10 w-auto md:h-14 object-contain"
              />
              <button
                aria-label="Close menu"
                onClick={toggleSidebar}
                className="from-rank-primary to-rank-secondary flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r text-white shadow-md"
              >
                <X size={20} />
              </button>
            </div>

            <hr className="my-3 border-blue-100 md:my-4" />

            {/* 타이틀 */}
            <h6 className="text-rank-primary px-4 pb-2 text-xs font-semibold tracking-widest uppercase md:px-6 md:pb-3">
              N-Place 도구
            </h6>

            {/* 네비게이션 */}
            <ul className="flex flex-col gap-1 px-4 md:px-6">
              <li>
                <Link
                  href="/realtime"
                  onClick={() => setIsOpen(false)}
                  className={`block rounded px-2 py-1.5 text-sm font-semibold md:py-2 ${
                    pathname.startsWith("/realtime")
                      ? "from-rank-primary to-rank-secondary bg-gradient-to-r bg-clip-text text-transparent"
                      : "text-white/75 hover:text-white"
                  }`}
                >
                  실시간 순위조회
                </Link>
              </li>
              <li>
                <Link
                  href="/track"
                  onClick={() => setIsOpen(false)}
                  className={`block rounded px-2 py-1.5 text-sm font-semibold md:py-2 ${
                    pathname.startsWith("/track")
                      ? "from-rank-primary to-rank-secondary bg-gradient-to-r bg-clip-text text-transparent"
                      : "text-white/75 hover:text-white"
                  }`}
                >
                  순위추적
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* 오버레이 (모바일/태블릿/데스크톱) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm xl:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}
