"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import NotificationDropdown from "@/components/Dropdowns/NotificationDropdown";
import UserDropdown from "@/components/Dropdowns/UserDropdown";
import { useState } from "react";
import { Menu, X } from 'lucide-react';

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = useState("hidden");
  const pathname = usePathname();

  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-rank-dark flex-wrap items-center justify-between md:w-64 z-10 py-4 px-6 relative flex">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex-wrap items-center justify-between w-full mx-auto flex">
          {/* Toggler - 개선된 토글 버튼 */}
          <button
            className="cursor-pointer md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-rank-primary to-rank-secondary text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
            aria-label="Toggle navigation"
          >
            <Menu size={24} />
          </button>
          
          {/* Brand */}
          <Link
            href="/"
            className="md:block text-left md:pb-2 text-white mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0 bg-clip-text bg-gradient-to-r from-rank-primary to-rank-secondary"
          >
            RANK
          </Link>
          
          {/* User */}
          <ul className="md:hidden items-center flex-wrap list-none flex">
            <li className="inline-block relative">
              <NotificationDropdown />
            </li>
            <li className="inline-block relative">
              <UserDropdown />
            </li>
          </ul>
          
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header - 개선된 닫기 버튼 */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex-wrap flex">
                <div className="w-6/12">
                  <Link
                    href="/"
                    className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0 bg-clip-text bg-gradient-to-r from-rank-primary to-rank-secondary"
                  >
                    RANK
                  </Link>
                </div>
                <div className="w-6/12 justify-end flex">
                  <button
                    type="button"
                    className="cursor-pointer flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-rank-primary to-rank-secondary text-white shadow-md hover:shadow-lg transition-all duration-200"
                    onClick={() => setCollapseShow("hidden")}
                    aria-label="Close menu"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Form */}
            <form className="mt-6 mb-4 md:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="px-3 py-2 h-12 border-solid border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal border rounded"
                />
              </div>
            </form>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            
            {/* Heading */}
            <h6 className="md:min-w-full text-transparent bg-clip-text bg-gradient-to-r from-rank-primary to-rank-secondary text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Admin Layout Pages
            </h6>
            
            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex-col list-none flex">
              <li className="items-center">
                <Link
                  href="/dashboard"
                  className={
                    "text-xs uppercase py-3 font-bold block text-transparent bg-clip-text bg-gradient-to-r from-rank-primary to-rank-secondary " +
                    (pathname.includes("/admin/dashboard")
                      ? "opacity-100"
                      : "opacity-75 hover:opacity-100")
                  }
                >
                  <i
                    className={
                      "fas fa-tv mr-2 text-sm " +
                      (pathname.includes("/dashboard")
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  대시보드
                </Link>
              </li>

              <li className="items-center">
                <Link
                  href="/admin/tables"
                  className={
                    "text-xs uppercase py-3 font-bold block text-transparent bg-clip-text bg-gradient-to-r from-rank-primary to-rank-secondary " +
                    (pathname.includes("/admin/tables")
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
                  Tables
                </Link>
              </li>

              <li className="items-center">
                <Link
                  href="/admin/maps"
                  className={
                    "text-xs uppercase py-3 font-bold block text-transparent bg-clip-text bg-gradient-to-r from-rank-primary to-rank-secondary " +
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
            <h6 className="md:min-w-full text-transparent bg-clip-text bg-gradient-to-r from-rank-primary to-rank-secondary text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Auth Layout Pages
            </h6>
            
            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex-col list-none md:mb-4 flex">
              <li className="items-center">
                <Link
                  href="/login"
                  className="text-transparent bg-clip-text bg-gradient-to-r from-rank-primary to-rank-secondary opacity-75 hover:opacity-100 text-xs uppercase py-3 font-bold block"
                >
                  <i className="fas fa-fingerprint text-blueGray-400 mr-2 text-sm"></i>{" "}
                  Login
                </Link>
              </li>

              <li className="items-center">
                <Link
                  href="/join"
                  className="text-transparent bg-clip-text bg-gradient-to-r from-rank-primary to-rank-secondary opacity-75 hover:opacity-100 text-xs uppercase py-3 font-bold block"
                >
                  <i className="fas fa-clipboard-list text-blueGray-300 mr-2 text-sm"></i>{" "}
                  Register
                </Link>
              </li>
            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            
            {/* Heading */}
            <h6 className="md:min-w-full text-transparent bg-clip-text bg-gradient-to-r from-rank-primary to-rank-secondary text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              No Layout Pages
            </h6>
            
            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex-col list-none md:mb-4 flex">
              <li className="items-center">
                <Link
                  href="/landing"
                  className="text-transparent bg-clip-text bg-gradient-to-r from-rank-primary to-rank-secondary opacity-75 hover:opacity-100 text-xs uppercase py-3 font-bold block"
                >
                  <i className="fas fa-newspaper text-blueGray-400 mr-2 text-sm"></i>{" "}
                  Landing Page
                </Link>
              </li>

              <li className="items-center">
                <Link
                  href="/profile"
                  className="text-transparent bg-clip-text bg-gradient-to-r from-rank-primary to-rank-secondary opacity-75 hover:opacity-100 text-xs uppercase py-3 font-bold block"
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