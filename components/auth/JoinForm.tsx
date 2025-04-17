// components/JoinForm.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthRepository from "@/model/AuthRepository"; // AuthRepository 임포트

interface FormValues {
  userName: string;
  password: string;
  passwordConfirm: string;
  companyName: string;
  companyNumber: string;
  tel: string;
  privacyPolicy: boolean;
}

export default function JoinForm() {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormValues>();
  const [isVerified, setIsVerified] = useState(false);
  const [isPendingSubmit, setIsPendingSubmit] = useState(false);
  const router = useRouter();
  
  const password = watch("password");

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
          userName: data.userName,
          password: data.password,
          companyName: data.companyName,
          companyNumber: cleanCompanyNumber,
          tel: data.tel,
          // passwordConfirm은 서버에서 필요하지 않으므로 제외
        }
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
    setValue("userName", value);
  };

  const handleTelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("tel", e.target.value.replace(/[^0-9]/g, ""));
  };

  return (
    <div className="bg-rank-light relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
      <div className="rounded-t mb-0 px-10 py-10">
        <div className="text-center mb-3">
          <h6 className="text-blueGray-500 text-sm font-bold">회원가입</h6>
        </div>
        <div className="btn-wrapper">
          <Link
            href="/"
            className="w-full bg-[#FEE500] text-[#3C1E1E] px-4 py-3 rounded outline-none focus:outline-none mb-3 font-bold text-sm shadow hover:shadow-md flex items-center justify-center transition-all duration-150"
          >
            <Image
              src="/img/auth/kakao_login.png"
              alt="Kakao"
              className="w-5 h-5 mr-2"
              width={20}
              height={20}
            />
            3초 로그인/회원가입
          </Link>
        </div>
        <hr className="mt-6 border-b-1 border-blueGray-300" />
      </div>

      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        <div className="text-blueGray-400 text-center mb-3 font-bold">
          <small>회원가입 하기</small>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative w-full mb-3">
            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
              계정 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="계정"
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              {...register("userName", { 
                required: "계정을 입력하세요.",
                onChange: handleUsernameChange
              })}
            />
            {errors.userName && <p className="text-red-500 text-xs mt-1">{errors.userName.message}</p>}
          </div>

          <div className="relative w-full mb-3">
            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
              비밀번호 <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              placeholder="비밀번호"
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              {...register("password", { required: "비밀번호를 입력하세요." })}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <div className="relative w-full mb-3">
            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
              비밀번호 재확인 <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              placeholder="비밀번호 재확인"
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              {...register("passwordConfirm", {
                required: "비밀번호를 다시 입력하세요.",
                validate: (value) => value === password || "비밀번호가 일치하지 않습니다."
              })}
            />
            {errors.passwordConfirm && <p className="text-red-500 text-xs mt-1">{errors.passwordConfirm.message}</p>}
          </div>

          <div className="relative w-full mb-3">
            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
              업체명 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="업체명"
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              {...register("companyName", { required: "업체명을 입력하세요." })}
            />
            {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName.message}</p>}
          </div>

          <div className="relative w-full mb-3">
            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
              사업자등록번호 <span className="text-red-500">*</span>
            </label>
            <div className="flex">
              <input
                type="text"
                placeholder="000-00-00000"
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded-l text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                {...register("companyNumber", { 
                  required: "사업자등록번호를 입력하세요.",
                  onChange: handleCompanyNumberChange
                })}
              />
              <button
                type="button"
                onClick={checkCompanyNumber}
                className="bg-rank-primary text-white px-4 py-2 rounded-r text-sm font-bold shadow hover:shadow-lg transition-all duration-150"
              >
                인증
              </button>
            </div>
            {errors.companyNumber && <p className="text-red-500 text-xs mt-1">{errors.companyNumber.message}</p>}
            {isVerified && <p className="text-green-500 text-xs mt-1">인증되었습니다</p>}
          </div>

          <div className="relative w-full mb-3">
            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
              연락처 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="연락처"
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              {...register("tel", { 
                required: "연락처를 입력하세요.",
                onChange: handleTelChange
              })}
            />
            {errors.tel && <p className="text-red-500 text-xs mt-1">{errors.tel.message}</p>}
          </div>

          <div>
            <label className="inline-flex items-center cursor-pointer">
              <input
                id="privacyPolicy"
                type="checkbox"
                className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                {...register("privacyPolicy", { required: "개인정보 보호 정책에 동의해야 합니다." })}
              />
              <span className="ml-2 text-sm font-semibold text-blueGray-600">
                개인정보 동의사항{' '}
                <Link href="/privacy-policy" className="text-rank-primary hover:underline">
                  개인보호 보호 정책
                </Link>
              </span>
            </label>
            {errors.privacyPolicy && <p className="text-red-500 text-xs mt-1">{errors.privacyPolicy.message}</p>}
          </div>

          <div className="text-center mt-6">
            <button
              type="submit"
              disabled={isPendingSubmit}
              className="bg-gradient-to-r from-rank-primary to-rank-secondary text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full ease-linear transition-all duration-150"
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
