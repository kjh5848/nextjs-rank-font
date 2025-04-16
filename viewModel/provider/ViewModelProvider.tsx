// "use client"; // Next.js에서 클라이언트 컴포넌트임을 명시

// import { createContext, useContext } from "react";
// import useMainViewModelLocal from "@/viewModel/useMainViewModelLocal";
// import useMyViewModelLocal from "@/viewModel/useMyViewModelLocal";

// // ViewModel 컨텍스트 타입 정의
// interface ViewModelContextType {
//   mainViewModel: ReturnType<typeof useMainViewModelLocal>;
//   myViewModel: ReturnType<typeof useMyViewModelLocal>;
// }

// // ViewModel 컨텍스트 생성 (초기값은 null)
// const ViewModelContext = createContext<ViewModelContextType | null>(null);

// /**
//  * ViewModel 프로바이더 컴포넌트
//  * @param children - 하위 컴포넌트들
//  */
// export function ViewModelProvider({ children }: { children: React.ReactNode }) {
//   // 각 ViewModel 인스턴스 생성
//   const mainViewModel = useMainViewModelLocal();
//   const myViewModel = useMyViewModelLocal();

//   return (
//     <ViewModelContext.Provider
//       value={{
//         mainViewModel,
//         myViewModel,
//       }}
//     >
//       {children}
//     </ViewModelContext.Provider>
//   );
// }

// /**
//  * 메인 ViewModel을 사용하기 위한 커스텀 훅
//  * @returns 메인 ViewModel 인스턴스
//  */
// export function useMainViewModelGlobal() {
//   const context = useContext(ViewModelContext);
//   if (!context) {
//     throw new Error("useMainViewModelGlobal must be used within a ViewModelProvider");
//   }
//   return context.mainViewModel;
// }

// /**
//  * 마이 ViewModel을 사용하기 위한 커스텀 훅
//  * @returns 마이 ViewModel 인스턴스
//  */
// export function useMyViewModelGlobal() {
//   const context = useContext(ViewModelContext);
//   if (!context) {
//     throw new Error("useMyViewModelGlobal must be used within a ViewModelProvider");
//   }
//   return context.myViewModel;
// } 