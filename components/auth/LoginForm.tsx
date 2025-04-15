"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { useState } from "react";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [copied, setCopied] = useState(false);
  const email = "help@nesoone.com";
  const kakaoLink = "https://open.kakao.com/o/sPN16smh";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const onSubmit = async (data: any) => {
    const dto = await fetch(`/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: data
      })
    }).then((response) => response.json());

    if (dto.code === -3) {
      alert(Object.keys(dto.data).map((key) => dto.data[key]).join("\n"));
      return;
    } else if (dto.code !== 0) {
      alert(dto.message);
      return;
    } else {
      window.location.reload();
    }
  };

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
            <img
              src="/img/auth/kakao_login.png"
              alt="Kakao"
              className="w-5 h-5 mr-2"
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

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative w-full mb-3">
            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
              아이디
            </label>
            <input
              {...register("username", { required: "계정을 입력하세요." })}
              type="text"
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="아이디"
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username.message as string}</p>
            )}
          </div>

          <div className="relative w-full mb-3">
            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
              비밀번호
            </label>
            <input
              {...register("password", { required: "비밀번호를 입력하세요." })}
              type="password"
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="비밀번호"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message as string}</p>
            )}
          </div>

          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-gradient-to-r from-rank-primary to-rank-secondary text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full ease-linear transition-all duration-150"
            >
              로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
