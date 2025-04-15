import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuthStoreGlobal } from "@/store/provider/StoreProvider";
import UtilFunction from "@/util/UtilFunction";
import AuthRepository from "@/model/AuthRepository";

const useLogin = () => {
  const router = useRouter();
  const { setLoginUser } = useAuthStoreGlobal();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  // 아이디 기억하기 기능
  useEffect(() => {
    const rememberedId = localStorage.getItem("rememberId");
    if (rememberedId) {
      try {
        const parsedId = JSON.parse(rememberedId);
        setUsername(parsedId);
        setRememberMe(true);
      } catch (e) {
        localStorage.removeItem("rememberId");
      }
    }
  }, []);
  
  // 입력값 유효성 검사
  const validateInputs = () => {
    if (!username.trim()) {
      setErrorMessage("아이디를 입력해주세요.");
      return false;
    }

    if (!password) {
      setErrorMessage("비밀번호를 입력해주세요.");
      return false;
    }

    return true;
  };
  
  // 아이디 기억하기 처리
  const handleRememberId = (username: string) => {
    if (rememberMe) {
      localStorage.setItem("rememberId", JSON.stringify(username.trim()));
    } else {
      localStorage.removeItem("rememberId");
    }
  };
  
  // JWT 토큰 저장
  const saveAuthTokens = (accessJwt: string, refreshJwt: string) => {
    localStorage.setItem("accessJwt", accessJwt);
    localStorage.setItem("refreshJwt", refreshJwt);
  };
  
  // 로그인 처리 함수
  const processLogin = async (username: string, password: string) => {
    const reqDto = {
      user: {
        username: username.trim(),
        password,
      },
    };

    const response = await AuthRepository.postLogin(reqDto);

    if (response?.status === 200) {
      const dto = await response.json();
      
      // 아이디 기억하기 처리
      handleRememberId(username);
      
      // JWT 토큰 저장
      saveAuthTokens(dto.data.accessJwt, dto.data.refreshJwt);
      
      // 로그인 상태 업데이트
      setLoginUser(UtilFunction.getUserByAccessJwt());
      
      // 홈으로 리다이렉트
      router.push("/");
      return true;
    } else {
      await UtilFunction.handleNotOkResponse(response, setLoginUser);
      return false;
    }
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // 입력값 검증
    if (!validateInputs()) {
      return;
    }

    setIsPending(true);

    try {
      await processLogin(username, password);
    } catch (error) {
      setErrorMessage("로그인 과정에서 오류가 발생했습니다.");
      console.error("Login error:", error);
    } finally {
      setIsPending(false);
    }
  };
  
  return {
    username,
    setUsername,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    isPending,
    errorMessage,
    handleSubmit
  };
};

export default useLogin;
