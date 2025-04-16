"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import useAuthLoginViewModelLocal from "@/viewModel/useAuthLoginViewModelLocal";
import { useAuthStore } from "@/store/provider/StoreProvider";

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

  const requestLogin = () => {
    if (!validateFields()) {
      return;
    }

    const { idElement, pwElement, rememberMeElement } = refs.current;
    
    if (idElement && pwElement && rememberMeElement) {
      const reqDto = {
        user: {
          username: idElement.value,
          password: pwElement.value,
        }
      };

      login(reqDto, rememberMeElement.checked);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      requestLogin();
    }
  };

  useEffect(() => {
    // 아이디 입력 필드에 포커스
    refs.current.idElement?.focus();
    
    // 저장된 아이디가 있으면 설정
    const rememberId = JSON.parse(localStorage.getItem("rememberId") || "null");
    if (rememberId && refs.current.idElement && refs.current.rememberMeElement) {
      refs.current.idElement.value = rememberId;
      refs.current.rememberMeElement.checked = true;
    }

    // 로그인 유저 초기화
    setLoginUser(null);
  }, [setLoginUser]);

  return (
    <div className="bg-rank-light relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
      <div className="rounded-t mb-0 px-10 py-10">
        <div className="text-center mb-3">
          <h6 className="text-blueGray-500 text-sm font-bold">로그인</h6>
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
          <small>로그인 하기</small>
        </div>

        <form onSubmit={(e) => {
          e.preventDefault();
          requestLogin();
        }}>
          <div className="relative w-full mb-3">
            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
              아이디
            </label>
            <input
              type="text"
              ref={(el) => { refs.current.idElement = el; }}
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="아이디"
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="relative w-full mb-3">
            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
              비밀번호
            </label>
            <input
              type="password"
              ref={(el) => { refs.current.pwElement = el; }}
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="비밀번호"
              onKeyDown={handleKeyDown}
            />
          </div>

          <div>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                ref={(el) => { refs.current.rememberMeElement = el; }}
                className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
              />
              <span className="ml-2 text-sm font-semibold text-blueGray-600">
                기억하기
              </span>
            </label>
          </div>

          <div className="text-center mt-6">
            <button
              type="submit"
              disabled={isPendingLogin}
              className="bg-gradient-to-r from-rank-primary to-rank-secondary text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full ease-linear transition-all duration-150"
            >
              {isPendingLogin ? "로그인 중..." : "로그인"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
