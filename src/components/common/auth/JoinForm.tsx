// components/JoinForm.tsx
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthRepository from "@/src/model/AuthRepository"; // AuthRepository 임포트
import { useAuthStore } from "@/src/store/provider/StoreProvider";

interface FormValues {
  username: string;
  password: string;
  passwordConfirm: string;
  companyName: string;
  companyNumber: string;
  tel: string;
  privacyPolicy: boolean;
}

export default function JoinForm() {
  const { user, isAuthLoading } = useAuthStore();
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormValues>();
  const [isVerified, setIsVerified] = useState(false);
  const [isPendingSubmit, setIsPendingSubmit] = useState(false);
  const router = useRouter();
  
  const password = watch("password");

  useEffect(() => {
    if (!isAuthLoading && user) {
      router.replace("/dashboard");
    }
  }, [isAuthLoading, user, router]);


  const onSubmit = async (data: FormValues) => {
    if (!data.privacyPolicy) {
      alert("개인정보 보호 정책에 동의해주세요.");
      return;
    }
    if (!isVerified) {
      alert("사업자등록번호를 인증해주세요.");
      return;
    }

    setIsPendingSubmit(true);
    
    try {
      const cleanCompanyNumber = data.companyNumber.replace(/[^0-9]/g, "");
      
      // AuthRepository.postJoin 사용
      const response = await AuthRepository.postJoin({
        user: {
          username: data.username,
          password: data.password,
          companyName: data.companyName,
          companyNumber: cleanCompanyNumber,
          tel: data.tel,
          // passwordConfirm은 서버에서 필요하지 않으므로 제외
        },
      });

      const result = await response.json();
      
      if (result.code !== 0) {
        alert(result.message || "회원가입 실패");
      } else {
        alert("등록되었습니다.");
        router.replace('/login');
      }
    } catch (error) {
      console.error("Join error:", error);
      alert("회원가입 중 오류가 발생했습니다.");
    } finally {
      setIsPendingSubmit(false);
    }
  };

  const checkCompanyNumber = async () => {
    const companyNumber = watch("companyNumber");
    if (!companyNumber) {
      alert("사업자등록번호를 입력하세요.");
      return;
    }

    // TODO: 실제 사업자등록번호 인증 API 연동 필요
    // const isValid = await verifyCompanyNumberAPI(companyNumber);
    // if (!isValid) {
    //   alert("유효하지 않은 사업자등록번호입니다.");
    //   setIsVerified(false);
    //   return;
    // }
  
    alert("인증되었습니다.");
    setIsVerified(true);
  };

  const handleCompanyNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length > 10) {
      value = value.slice(0, 10); // 최대 10자리까지만 입력 허용
    }

    if (value.length < 3) {
      // 값 그대로 유지
    } else if (value.length < 5) {
      value = `${value.slice(0, 3)}-${value.slice(3)}`;
    } else {
      value = `${value.slice(0, 3)}-${value.slice(3, 5)}-${value.slice(5)}`;
    }
    
    setValue("companyNumber", value, { shouldValidate: true }); // 값 변경 시 유효성 검사 트리거
    setIsVerified(false); // 번호 변경 시 인증 상태 초기화
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^a-z0-9]/g, '');
    setValue("username", value);
  };

  const handleTelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("tel", e.target.value.replace(/[^0-9]/g, ""));
  };

  return (
    <div className="background:var(--color-rank-light) bg-blueGray-200 relative mb-6 flex w-full min-w-0 flex-col rounded-lg border-0 break-words shadow-lg">
      <div className="mb-0 rounded-t px-10 py-10">
        <div className="mb-3 text-center">
          <h6 className="text-blueGray-500 text-sm font-bold">회원가입</h6>
        </div>
        <div className="btn-wrapper">
          <Link
            href="/"
            className="mb-3 flex w-full items-center justify-center rounded-sm bg-[#FEE500] px-4 py-3 text-sm font-bold text-[#3C1E1E] shadow-sm transition-all duration-150 outline-hiddenhover:shadow-md focus:outline-none"
          >
            <Image
              src="/img/auth/kakao_login.png"
              alt="Kakao"
              className="mr-2 h-5 w-5"
              width={20}
              height={20}
            />
            3초 로그인/회원가입
          </Link>
        </div>
        <hr className="border-blueGray-300 mt-6 border-b-1" />
      </div>

      <div className="flex-auto px-4 py-10 pt-0 lg:px-10">
        <div className="text-blueGray-400 mb-3 text-center font-bold">
          <small>회원가입 하기</small>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative mb-3 w-full">
            <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase">
              계정 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="계정"
              className="placeholder-blueGray-300 text-blueGray-600 w-full rounded-sm border-0 bg-white px-3 py-3 text-sm shadow-sm transition-all duration-150 ease-linear focus:ring-3focus:outline-none"
              {...register("username", {
                required: "계정을 입력하세요.",
                onChange: handleUsernameChange,
              })}
            />
            {errors.username && (
              <p className="mt-1 text-xs text-red-500">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="relative mb-3 w-full">
            <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase">
              비밀번호 <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              placeholder="비밀번호"
              className="placeholder-blueGray-300 text-blueGray-600 w-full rounded-sm border-0 bg-white px-3 py-3 text-sm shadow-sm transition-all duration-150 ease-linear focus:ring-3focus:outline-none"
              {...register("password", { required: "비밀번호를 입력하세요." })}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="relative mb-3 w-full">
            <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase">
              비밀번호 재확인 <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              placeholder="비밀번호 재확인"
              className="placeholder-blueGray-300 text-blueGray-600 w-full rounded-sm border-0 bg-white px-3 py-3 text-sm shadow-sm transition-all duration-150 ease-linear focus:ring-3focus:outline-none"
              {...register("passwordConfirm", {
                required: "비밀번호를 다시 입력하세요.",
                validate: (value) =>
                  value === password || "비밀번호가 일치하지 않습니다.",
              })}
            />
            {errors.passwordConfirm && (
              <p className="mt-1 text-xs text-red-500">
                {errors.passwordConfirm.message}
              </p>
            )}
          </div>

          <div className="relative mb-3 w-full">
            <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase">
              업체명 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="업체명"
              className="placeholder-blueGray-300 text-blueGray-600 w-full rounded-sm border-0 bg-white px-3 py-3 text-sm shadow-sm transition-all duration-150 ease-linear focus:ring-3focus:outline-none"
              {...register("companyName", { required: "업체명을 입력하세요." })}
            />
            {errors.companyName && (
              <p className="mt-1 text-xs text-red-500">
                {errors.companyName.message}
              </p>
            )}
          </div>

          <div className="relative mb-3 w-full">
            <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase">
              사업자등록번호 <span className="text-red-500">*</span>
            </label>
            <div className="flex">
              <input
                type="text"
                placeholder="000-00-00000"
                className="placeholder-blueGray-300 text-blueGray-600 w-full rounded-l border-0 bg-white px-3 py-3 text-sm shadow-sm transition-all duration-150 ease-linear focus:ring-3focus:outline-none"
                {...register("companyNumber", {
                  required: "사업자등록번호를 입력하세요.",
                  onChange: handleCompanyNumberChange,
                })}
              />
              <button
                type="button"
                onClick={checkCompanyNumber}
                className="bg-rank-primary rounded-r px-4 py-2 text-sm font-bold text-white shadow-sm transition-all duration-150 hover:shadow-lg"
              >
                인증
              </button>
            </div>
            {errors.companyNumber && (
              <p className="mt-1 text-xs text-red-500">
                {errors.companyNumber.message}
              </p>
            )}
            {isVerified && (
              <p className="mt-1 text-xs text-green-500">인증되었습니다</p>
            )}
          </div>

          <div className="relative mb-3 w-full">
            <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase">
              연락처 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="연락처"
              className="placeholder-blueGray-300 text-blueGray-600 w-full rounded-sm border-0 bg-white px-3 py-3 text-sm shadow-sm transition-all duration-150 ease-linear focus:ring-3focus:outline-none"
              {...register("tel", {
                required: "연락처를 입력하세요.",
                onChange: handleTelChange,
              })}
            />
            {errors.tel && (
              <p className="mt-1 text-xs text-red-500">{errors.tel.message}</p>
            )}
          </div>

          <div>
            <label className="inline-flex cursor-pointer items-center">
              <input
                id="privacyPolicy"
                type="checkbox"
                className="form-checkbox text-blueGray-700 ml-1 h-5 w-5 rounded-sm border-0 transition-all duration-150 ease-linear"
                {...register("privacyPolicy", {
                  required: "개인정보 보호 정책에 동의해야 합니다.",
                })}
              />
              <span className="text-blueGray-600 ml-2 text-sm font-semibold">
                개인정보 동의사항{" "}
                <Link
                  href="/privacy-policy"
                  className="text-rank-primary hover:underline"
                >
                  개인보호 보호 정책
                </Link>
              </span>
            </label>
            {errors.privacyPolicy && (
              <p className="mt-1 text-xs text-red-500">
                {errors.privacyPolicy.message}
              </p>
            )}
          </div>

          <div className="mt-6 text-center">
            <button
              type="submit"
              disabled={isPendingSubmit}
              className="from-rank-primary to-rank-secondary active:bg-blueGray-600 w-full rounded-sm bg-gradient-to-r px-6 py-3 text-sm font-bold text-white uppercase shadow-sm transition-all duration-150 ease-linear outline-hiddenhover:shadow-lg focus:outline-none"
            >
              {isPendingSubmit ? "처리 중..." : "가입"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// TODO: 실제 API 연동 시 아래 함수 구현 필요
// function verifyCompanyNumberAPI(companyNumber: string): Promise<boolean> { 
//   // 실제 API 호출 로직 구현
//   console.log("Verifying company number:", companyNumber); 
//   // 임시로 true 반환
//   return Promise.resolve(true); 
// }
