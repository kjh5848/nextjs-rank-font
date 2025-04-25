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
      {/* ────────── 컨테이너 (lg 이상 고정) ────────── */}
      <nav className="bg-rank-sidebar relative z-40 flex flex-wrap items-center justify-between px-6 py-4 shadow-xl lg:fixed lg:top-0 lg:bottom-0 lg:left-0 lg:block lg:w-56 lg:overflow-y-auto">
        <div className="mx-auto flex w-full flex-wrap items-center justify-between px-0 lg:flex-col lg:items-stretch">
          {/* 모바일 토글 버튼 */}
          <button
            aria-label="Toggle sidebar"
            aria-expanded={isOpen}
            onClick={toggleSidebar}
            className="from-rank-primary to-rank-secondary flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r text-white shadow-lg transition-all duration-200 hover:scale-105 lg:hidden"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* 브랜드 (데스크톱만 노출) */}
          <Link href="/" className="flex items-center">
            <Image
              src="/img/brand/rank_rogo.png"
              alt="내순위"
              width={150}
              height={40}
              priority
              sizes="(max-width: 1024px) 120px, 150px"
              className="h-14 w-auto lg:h-20" /* h-8(32px) → lg:h-20(80px) */
            />
          </Link>

          {/* 모바일 사용자 메뉴 */}
          <ul className="flex items-center lg:hidden">
            <li>
              <UserDropdown />
            </li>
          </ul>

          {/* ────────── 드로어 ────────── */}
          <div
            className={`bg-rank-sidebar fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 lg:static lg:translate-x-0 lg:shadow-none ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* 드로어 헤더 (모바일용) */}
            <div className="flex items-center justify-between p-4 lg:hidden">
              <Image
                src="/img/brand/rank_rogo.png"
                alt="내순위"
                width={120}
                height={32}
                className="h-14 w-auto object-contain"
              />
              <button
                aria-label="Close menu"
                onClick={toggleSidebar}
                className="from-rank-primary to-rank-secondary flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r text-white shadow-md"
              >
                <X size={20} />
              </button>
            </div>

            <hr className="my-4 border-blue-100" />

            {/* 타이틀 */}
            <h6 className="text-rank-primary px-6 pb-3 text-xs font-semibold tracking-widest uppercase lg:px-4">
              N-Place 도구
            </h6>

            {/* 네비게이션 */}
            <ul className="flex flex-col gap-1 px-6 lg:px-4">
              <li>
                <Link
                  href="/realtime"
                  onClick={() => setIsOpen(false)}
                  className={`block rounded px-2 py-2 text-sm font-semibold ${
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
                  className={`block rounded px-2 py-2 text-sm font-semibold ${
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

      {/* 오버레이 (모바일) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}
