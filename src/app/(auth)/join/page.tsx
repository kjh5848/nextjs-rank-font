"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/store/provider/StoreProvider";
import JoinForm from "@/src/components/common/auth/JoinForm";
import Link from "next/link";

export default function JoinPage() {
  
  return (
    <div className="container mx-auto px-4 h-full">
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-6/12 px-4">
          <JoinForm />

          <div className="flex flex-wrap mt-6 relative">
            <div className="w-1/2">
              <Link href="/login">
                <span className="text-blueGray-500 text-sm hover:underline">
                  이미 계정이 있으신가요?
                </span>
              </Link>
            </div>
            <div className="w-1/2 text-right">
              <Link href="/">
                <span className="text-blueGray-500 text-sm hover:underline">
                  Home
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}