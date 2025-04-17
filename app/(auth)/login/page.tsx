
import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  
  return (
    <div className="container mx-auto px-4 h-full">
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-6/12 px-4">
          <LoginForm />
          
          <div className="flex flex-wrap mt-6 relative">
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
