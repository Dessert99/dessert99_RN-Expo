import { useGetMe } from "@/hooks/queries/useGetMe";
import { useFocusEffect } from "expo-router";
import React, { ReactNode } from "react";

interface AuthRouteProps {
  children: ReactNode;
}

// 로그인 권한이 필요한 페이지를 이 컴포넌트로 감싸주면 권한을 부여할 수 있다.
function AuthRoute({ children }: AuthRouteProps) {
  const { auth } = useGetMe();
  //화면이 포커스 되었을 때 작업 수행
  useFocusEffect(() => {
    console.log("로그인 되어있음", auth);
    // !auth.id && router.replace("/auth"); // 유저 아이디가 없을 때 보내기
  });
  return <>{children}</>;
}

export default AuthRoute;
