"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import UserDropdown from "@/src/components/common/Dropdowns/UserDropdown";
import { useState } from "react";
import { Menu, X } from 'lucide-react';

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = useState("hidden");
  const pathname = usePathname();

  const toggleSidebar = () => {
    setCollapseShow(collapseShow === "hidden" ? "bg-white m-2 py-3 px-6 " : "hidden");
  };

  return (
    <>
      <nav className="relative z-10 flex flex-wrap items-center justify-between bg-rank-dark px-6 py-4 shadow-xl md:fixed md:bottom-0 md:left-0 md:top-0 md:block md:w-64 md:flex-row md:flex-nowrap md:overflow-hidden md:overflow-y-auto">
        <div className="mx-auto flex w-full flex-wrap items-center justify-between px-0 md:min-h-full md:flex-col md:flex-nowrap md:items-stretch">
          {/* Toggler - 개선된 토글 버튼 */}
          <button
            className="flex h-10 w-10 transform cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-rank-primary to-rank-secondary text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl md:hidden"
            type="button"
            onClick={toggleSidebar}
            aria-label="Toggle navigation"
          >
            <Menu size={24} />
          </button>

          {/* Brand */}
          <Link
            href="/"
            className="mr-0 inline-block whitespace-nowrap bg-gradient-to-r from-rank-primary to-rank-secondary bg-clip-text p-4 px-0 text-left text-sm font-bold uppercase text-white md:block md:pb-2"
          >
            RANK
          </Link>

          {/* User */}
          <ul className="flex list-none flex-wrap items-center md:hidden">
            <li className="relative inline-block">
              <UserDropdown />
            </li>
          </ul>

          {/* Collapse - 모바일 토글 배경은 여기서 수정 (bg-white 클래스) */}
          <div
            className={
              "absolute left-0 right-0 top-0 z-40 h-auto flex-1 items-center overflow-y-auto overflow-x-hidden rounded bg-rank-dark shadow md:relative md:mt-4 md:flex md:flex-col md:items-stretch md:opacity-100 md:shadow-none " +
              collapseShow
            }
          >
            {/* Collapse header - 개선된 닫기 버튼 */}
            <div className="border-blueGray-200 mb-4 block md:hidden md:min-w-full">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    href="/"
                    className="text-blueGray-600 mr-0 inline-block whitespace-nowrap bg-gradient-to-r from-rank-primary to-rank-secondary bg-clip-text p-4 px-0 text-left text-sm font-bold uppercase md:block md:pb-2"
                  >
                    RANK
                  </Link>
                </div>
                <div className="flex w-6/12 justify-end">
                  <button
                    type="button"
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-rank-primary to-rank-secondary text-white shadow-md transition-all duration-200 hover:shadow-lg"
                    onClick={toggleSidebar}
                    aria-label="Close menu"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>
            </div>

            {/* Form */}
            {/* <form className="mt-6 mb-4 md:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="px-3 py-2 h-12 border-solid border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal border rounded"
                />
              </div>
            </form> */}

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />

            {/* Heading */}
            <h6 className="block bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text pb-4 pt-1 text-lg font-bold uppercase text-rank-dark text-transparent no-underline md:min-w-full">
              N-PLRACE 도구
            </h6>

            {/* Navigation */}
            <ul className="flex list-none flex-col md:min-w-full md:flex-col">
              <li className="items-center">
                <Link
                  href="/realtime"
                  className={
                    "text-md block bg-gradient-to-r from-rank-primary to-rank-secondary bg-clip-text py-3 font-bold uppercase text-transparent " +
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
                  실시간 순위추적
                </Link>
              </li>

              <li className="items-center">
                <Link
                  href="/admin/tables"
                  className={
                    "text-md block bg-gradient-to-r from-rank-primary to-rank-secondary bg-clip-text py-3 font-bold uppercase text-transparent " +
                    (pathname.includes("/tables")
                      ? "opacity-100"
                      : "opacity-75 hover:opacity-100")
                  }
                >
                  <i
                    className={
                      "fas fa-table mr-2 text-sm " +
                      (pathname.includes("/admin/tables")
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
            <hr className="my-4 md:min-w-full" />

            {/* Heading */}
            <h6 className="block bg-gradient-to-r from-rank-primary to-rank-secondary bg-clip-text pb-4 pt-1 text-xs font-bold uppercase text-transparent no-underline md:min-w-full">
              Auth Layout Pages
            </h6>

            {/* Navigation */}
            <ul className="flex list-none flex-col md:mb-4 md:min-w-full md:flex-col">
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
            <hr className="my-4 md:min-w-full" />

            {/* Heading */}
            <h6 className="block bg-gradient-to-r from-rank-primary to-rank-secondary bg-clip-text pb-4 pt-1 text-xs font-bold uppercase text-transparent no-underline md:min-w-full">
              No Layout Pages
            </h6>

            {/* Navigation */}
            <ul className="flex list-none flex-col md:mb-4 md:min-w-full md:flex-col">
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
    </>
  );
}