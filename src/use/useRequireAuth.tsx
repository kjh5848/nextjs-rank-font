// hooks/useRequireAuth.ts
"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/store/provider/StoreProvider";
import useWaitForAuth from "./useWaitForAuth";

export default function useRequireAuth() {
  useWaitForAuth(); // 로딩 대기

  const { user } = useAuthStore();
  const router = useRouter();

  if (!user) {
    router.push("/login"); // 인증 안됐으면 리디렉션
    return null;
  }

  return user;
}
