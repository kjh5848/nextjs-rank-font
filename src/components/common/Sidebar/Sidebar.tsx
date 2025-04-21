"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import UserDropdown from "@/src/components/common/Dropdowns/UserDropdown";
import { useState } from "react";
import { Menu, X } from 'lucide-react';

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = useState("hidden");
  const pathname = usePathname();

  const toggleSidebar = () => {
    setCollapseShow(collapseShow === "hidden" ? "block" : "hidden");
  };

  return (
    <>
      <nav className="relative z-10 flex flex-wrap items-center justify-between bg-rank-sidebar px-6 py-4 shadow-xl lg:fixed lg:bottom-0 lg:left-0 lg:top-0 lg:block lg:w-56 lg:flex-row lg:flex-nowrap lg:overflow-hidden lg:overflow-y-auto">
        <div className="mx-auto flex w-full flex-wrap items-center justify-between px-0 lg:flex-col lg:flex-nowrap lg:items-stretch">
          {/* Toggler */}
          <button
            className="flex h-10 w-10 transform cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-rank-primary to-rank-secondary text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl lg:hidden"
            type="button"
            onClick={toggleSidebar}
            aria-label="Toggle navigation"
          >
            <Menu size={24} />
          </button>

          {/* Brand */}
          <Link
            href="/"
            className="flex items-center text-left text-white lg:pb-2 lg:text-left"
          >
            <Image
              alt="logo"
              className="h-20 w-auto lg:h-20"
              src="/img/brand/rank_rogo.png"
              width={150}
              height={28}
              priority
            />
          </Link>

          {/* User */}
          <ul className="flex list-none flex-wrap items-center lg:hidden">
            <li className="relative inline-block">
              <UserDropdown />
            </li>
          </ul>

          {/* Collapse */}
          <div
            className={
              "fixed inset-0 z-40 h-screen transform bg-rank-sidebar transition-transform duration-300 ease-in-out lg:relative lg:mt-4 lg:flex lg:h-auto lg:transform-none lg:flex-col lg:items-stretch lg:opacity-100 lg:shadow-none " +
              (collapseShow === "hidden"
                ? "-translate-x-full"
                : "translate-x-100")
            }
          >
            {/* Collapse header */}
            <div className="flex items-center justify-between p-4 lg:hidden">
              <Link href="/" className="flex items-center">
                <Image
                  src="/img/brand/rank_rogo.png"
                  alt="내순위"
                  width={150}
                  height={28}
                  className="h-10 w-auto object-contain"
                  priority
                />
              </Link>
              <button
                type="button"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-rank-primary to-rank-secondary text-white shadow-md transition-all duration-200 hover:shadow-lg"
                onClick={toggleSidebar}
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Divider */}
            <hr className="my-4 lg:min-w-full" />

            {/* Heading */}
            <h6 className="text-md block bg-gradient-to-r from-rank-primary to-rank-secondary bg-clip-text px-6 pb-4 pt-1 font-bold uppercase text-transparent no-underline lg:min-w-full lg:px-0">
              N-PLRACE 도구
            </h6>

            {/* Navigation */}
            <ul className="flex list-none flex-col px-6 lg:min-w-full lg:flex-col lg:px-0">
              <li className="items-center">
                <Link
                  href="/realtime"
                  className={
                    "block bg-clip-text py-3 text-sm font-bold uppercase text-transparent text-white " +
                    (pathname.includes("/realtime")
                      ? "opacity-100"
                      : "opacity-75 hover:opacity-100")
                  }
                >
                  <i
                    className={
                      "fas fa-tv mr-2 text-sm " +
                      (pathname.includes("/realtime")
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  실시간 순위조회
                </Link>
              </li>

              <li className="items-center">
                <Link
                  href="/track"
                  className={
                    "text-md block bg-gradient-to-r from-rank-primary to-rank-secondary bg-clip-text py-3 font-bold uppercase text-transparent " +
                    (pathname.includes("/track")
                      ? "opacity-100"
                      : "opacity-75 hover:opacity-100")
                  }
                >
                  <i
                    className={
                      "fas fa-table mr-2 text-sm " +
                      (pathname.includes("/track")
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  순위추적
                </Link>
              </li>

              <li className="items-center">
                <Link
                  href="/admin/maps"
                  className={
                    "block bg-gradient-to-r from-rank-primary to-rank-secondary bg-clip-text py-3 text-xs font-bold uppercase text-transparent " +
                    (pathname.includes("/admin/maps")
                      ? "opacity-100"
                      : "opacity-75 hover:opacity-100")
                  }
                >
                  <i
                    className={
                      "fas fa-map-marked mr-2 text-sm " +
                      (pathname.includes("/admin/maps")
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Maps
                </Link>
              </li>
            </ul>

            {/* Divider */}
            <hr className="my-4 lg:min-w-full" />

            {/* Heading */}
            <h6 className="block bg-gradient-to-r from-rank-primary to-rank-secondary bg-clip-text px-6 pb-4 pt-1 text-xs font-bold uppercase text-transparent no-underline lg:min-w-full lg:px-0">
              Auth Layout Pages
            </h6>

            {/* Navigation */}
            <ul className="flex list-none flex-col px-6 lg:mb-4 lg:min-w-full lg:flex-col lg:px-0">
              <li className="items-center">
                <Link
                  href="/login"
                  className="block bg-gradient-to-r from-rank-primary to-rank-secondary bg-clip-text py-3 text-xs font-bold uppercase text-transparent opacity-75 hover:opacity-100"
                >
                  <i className="fas fa-fingerprint text-blueGray-400 mr-2 text-sm"></i>{" "}
                  Login
                </Link>
              </li>

              <li className="items-center">
                <Link
                  href="/join"
                  className="block bg-gradient-to-r from-rank-primary to-rank-secondary bg-clip-text py-3 text-xs font-bold uppercase text-transparent opacity-75 hover:opacity-100"
                >
                  <i className="fas fa-clipboard-list text-blueGray-300 mr-2 text-sm"></i>{" "}
                  Register
                </Link>
              </li>
            </ul>

            {/* Divider */}
            <hr className="my-4 lg:min-w-full" />

            {/* Heading */}
            <h6 className="block bg-gradient-to-r from-rank-primary to-rank-secondary bg-clip-text px-6 pb-4 pt-1 text-xs font-bold uppercase text-transparent no-underline lg:min-w-full lg:px-0">
              No Layout Pages
            </h6>

            {/* Navigation */}
            <ul className="flex list-none flex-col px-6 pb-6 lg:mb-4 lg:min-w-full lg:flex-col lg:px-0">
              <li className="items-center">
                <Link
                  href="/landing"
                  className="block bg-gradient-to-r from-rank-primary to-rank-secondary bg-clip-text py-3 text-xs font-bold uppercase text-transparent opacity-75 hover:opacity-100"
                >
                  <i className="fas fa-newspaper text-blueGray-400 mr-2 text-sm"></i>{" "}
                  Landing Page
                </Link>
              </li>

              <li className="items-center">
                <Link
                  href="/profile"
                  className="block bg-gradient-to-r from-rank-primary to-rank-secondary bg-clip-text py-3 text-xs font-bold uppercase text-transparent opacity-75 hover:opacity-100"
                >
                  <i className="fas fa-user-circle text-blueGray-400 mr-2 text-sm"></i>{" "}
                  Profile Page
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* 배경 오버레이 - 모바일에서 사이드바가 열릴 때 배경을 어둡게 처리 */}
      {collapseShow !== "hidden" && (
        <div
          className="fixed inset-0 bg-black lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}