"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import useAuthLoginViewModelLocal from "@/src/viewModel/useAuthLoginViewModelLocal";
import { useAuthStore } from "@/src/store/provider/StoreProvider";

export default function LoginForm() {
  const { login, isPendingLogin } = useAuthLoginViewModelLocal();
  const { setLoginUser } = useAuthStore();
  
  const refs = useRef({
    idElement: null as HTMLInputElement | null,
    pwElement: null as HTMLInputElement | null,
    rememberMeElement: null as HTMLInputElement | null,
  });

  const validateFields = () => {
    if (!refs.current.idElement?.value) {
      alert("아이디를 입력해주세요.");
      refs.current.idElement?.focus();
      return false;
    }

    if (!refs.current.pwElement?.value) {
      alert("비밀번호를 입력해주세요.");
      refs.current.pwElement?.focus();
      return false;
    }

    return true;
  };
  const requestLogin = async () => {
    if (!validateFields()) return;
    const { idElement, pwElement, rememberMeElement } = refs.current;
    const dto = {
      user: { username: idElement.value, password: pwElement.value },
    };

    const result = await login(dto, rememberMeElement.checked);
    if (result.ok && result.user) {
      setLoginUser(result.user);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      requestLogin();
    }
  };

  useEffect(() => {
    // 아이디 입력 필드에 포커스
    refs.current.idElement?.focus();

    // 저장된 아이디가 있으면 설정
    const rememberId = JSON.parse(localStorage.getItem("rememberId") || "null");
    if (
      rememberId &&
      refs.current.idElement &&
      refs.current.rememberMeElement
    ) {
      refs.current.idElement.value = rememberId;
      refs.current.rememberMeElement.checked = true;
    }

    // 로그인 유저 초기화
    setLoginUser(null);
  }, [setLoginUser]);

  return (
    <div className="bg-blueGray-200 relative mb-6 flex w-full min-w-0 flex-col break-words rounded-lg border-0 bg-rank-light shadow-lg">
      <div className="mb-0 rounded-t px-10 py-10">
        <div className="mb-3 text-center">
          <h6 className="text-blueGray-500 text-sm font-bold">로그인</h6>
        </div>
        <div className="btn-wrapper">
          <Link
            href="/"
            className="mb-3 flex w-full items-center justify-center rounded bg-[#FEE500] px-4 py-3 text-sm font-bold text-[#3C1E1E] shadow outline-none transition-all duration-150 hover:shadow-md focus:outline-none"
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
        <hr className="border-b-1 border-blueGray-300 mt-6" />
      </div>

      <div className="flex-auto px-4 py-10 pt-0 lg:px-10">
        <div className="text-blueGray-400 mb-3 text-center font-bold">
          <small>로그인 하기</small>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            requestLogin();
          }}
        >
          <div className="relative mb-3 w-full">
            <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase">
              아이디
            </label>
            <input
              type="text"
              ref={(el) => {
                refs.current.idElement = el;
              }}
              className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
              placeholder="아이디"
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="relative mb-3 w-full">
            <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase">
              비밀번호
            </label>
            <input
              type="password"
              ref={(el) => {
                refs.current.pwElement = el;
              }}
              className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
              placeholder="비밀번호"
              onKeyDown={handleKeyDown}
            />
          </div>

          <div>
            <label className="inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                ref={(el) => {
                  refs.current.rememberMeElement = el;
                }}
                className="form-checkbox text-blueGray-700 ml-1 h-5 w-5 rounded border-0 transition-all duration-150 ease-linear"
              />
              <span className="text-blueGray-600 ml-2 text-sm font-semibold">
                기억하기
              </span>
            </label>
          </div>

          <div className="mt-6 text-center">
            <button
              
              disabled={isPendingLogin}
              className="active:bg-blueGray-600 w-full rounded bg-gradient-to-r from-rank-primary to-rank-secondary px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
            >
              {isPendingLogin ? "로그인 중..." : "로그인"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
