// hooks/useWaitForAuth.ts
"use client";

import { useAuthStore } from "@/src/store/provider/StoreProvider";

let authPromise: Promise<void> | null = null;

export default function useWaitForAuth() {
  const { isAuthPending } = useAuthStore();

  if (isAuthPending) {
    if (!authPromise) {
      authPromise = new Promise<void>((resolve) => {
        const check = () => {
          if (!useAuthStore().isAuthPending) {
            resolve();
          } else {
            setTimeout(check, 100);
          }
        };
        check();
      });
    }
    throw authPromise;
  }

  authPromise = null;
}
