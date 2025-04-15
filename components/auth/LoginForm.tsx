"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8081/v1/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error("로그인 실패");

      const data = await response.json();
      console.log("로그인 성공:", data);
      alert("로그인 성공!");
      router.push("/");
    } catch (err) {
      console.error(err);
      setError("아이디 또는 비밀번호가 올바르지 않습니다.");
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

        {error && (
          <p className="text-red-500 text-center text-sm mb-4">{error}</p>
        )}

        <form onSubmit={handleLogin}>
          <div className="relative w-full mb-3">
            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
              아이디
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="아이디"
            />
          </div>

          <div className="relative w-full mb-3">
            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
              비밀번호
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="비밀번호"
            />
          </div>

          <div>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
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
