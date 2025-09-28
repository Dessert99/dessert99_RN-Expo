import { getMe, postLogin, postSignup } from "@/api/auth";
import { queryClient } from "@/api/queryClient";
import { removeHeader, setHeader } from "@/utils/header";
import { deleteSecureStore, saveSecureStore } from "@/utils/secureStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { useEffect } from "react";

function useGetMe() {
  const { data, isError } = useQuery({
    queryFn: getMe,
    queryKey: ["auth", "getMe"],
  });

  //만약 만료된 토큰이라면 isError를 반환하므로 헤더와 secureStore에서 토큰을 지워준다.
  useEffect(() => {
    if (isError) {
      removeHeader("Authorization");
      deleteSecureStore("accessToken");
      console.log("토큰이 만료되었습니다.");
    }
  }, [isError]);

  return { data };
}

function useLogin() {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: async ({ accessToken }) => {
      setHeader("Authorization", `Beaer ${accessToken}`);
      await saveSecureStore("accessToken", accessToken);
      queryClient.fetchQuery({ queryKey: ["auth", "getMe"] }); // 이 키에 해당하는 Query를 패칭할 수 있다.
      console.log("로그인 성공");
      router.replace("/");
    },
    onError: () => {},
  });
}

function useSignup() {
  return useMutation({
    mutationFn: postSignup,
    onSuccess: () => {
      router.replace("/auth/login");
    },
    onError: () => {},
  });
}

export function useAuth() {
  const { data } = useGetMe();
  const loginMutation = useLogin();
  const signupMutation = useSignup();

  const logout = () => {
    removeHeader("Authorization");
    deleteSecureStore("accessToken");
    queryClient.resetQueries({ queryKey: ["auth"] });
    console.log("로그아웃");
  };

  return {
    auth: {
      id: data?.id || null,
    },
    loginMutation,
    signupMutation,
    logout,
  };
}
