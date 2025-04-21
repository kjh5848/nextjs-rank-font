
import LoginForm from "@/src/components/common/auth/LoginForm";
import LoadingFallback from "@/src/components/common/LoadingFallback";
import Link from "next/link";
import { Suspense } from "react";

export default function LoginPage() {
  
  return (
    <div className="container mx-auto h-full px-4">
      <div className="flex h-full content-center items-center justify-center">
        <div className="w-full px-4 lg:w-6/12">
          <Suspense fallback={<LoadingFallback message="로딩 중..." />}>
            <LoginForm />
          </Suspense>

          <div className="relative mt-6 flex flex-wrap">
            <div className="w-1/2">
              <Link href="/auth/forgot-password">
                <span className="text-blueGray-500 text-sm hover:underline">
                  비밀번호를 잊으셨나요?
                </span>
              </Link>
            </div>
            <div className="w-1/2 text-right">
              <Link href="/join">
                <span className="text-blueGray-500 text-sm hover:underline">
                  회원가입 &rarr;
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
