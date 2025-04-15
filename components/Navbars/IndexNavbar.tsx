"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full flex justify-center px-4 py-3">
      <nav className="fixed z-50 bg-white shadow-card rounded-full max-w-7xl w-full">
        <div className="px-4 sm:px-6">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Image
                  src="/img/brand/rank_rogo.png"
                  alt="내순위"
                  width={100}
                  height={100}
                  className="object-contain w-auto h-12"
                  priority
                />
              </Link>
            </div>

            {/* 데스크탑 메뉴 */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/dashboard">
                <span className="text-rank-dark px-4 py-2 rounded-full text-sm font-medium hover:text-rank-primary transition-colors">
                  대시보드
                </span>
              </Link>
              <Link href="/login">
                <span className="text-rank-dark px-4 py-2 rounded-full text-sm font-medium hover:text-rank-primary transition-colors">
                  로그인
                </span>
              </Link>
              <Link href="/join">
                <span className="bg-rank-secondary text-gray-900 px-4 py-2 rounded-full text-sm font-medium hover:bg-opacity-90 transition-colors">
                  회원가입
                </span>
              </Link>
            </div>

            {/* 모바일 메뉴 버튼 */}
            <div className="md:hidden flex items-center">
              <Link href="/login" className="block">
                <span className="block px-3 py-2 text-rank-dark hover:text-rank-primary text-sm font-medium transition-colors">
                  로그인
                </span>
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-rank-dark hover:text-rank-primary p-2"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {isOpen && (
          <div className="md:hidden bg-white rounded-3xl mt-2 shadow-lg absolute w-full">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/join" className="block">
                <span className="block px-3 py-2 text-gray-900 hover:bg-rank-secondary text-sm font-medium rounded-md transition-colors">
                  회원가입
                </span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
