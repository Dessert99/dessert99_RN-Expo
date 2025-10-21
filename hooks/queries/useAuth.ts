import { postLogin, postSignup } from "@/api/auth";
import { queryClient } from "@/api/queryClient";
import { deleteSecureStore, saveSecureStore } from "@/utils/secureStore";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";

function useLogin() {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: async ({ accessToken }) => {
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
  const loginMutation = useLogin();
  const signupMutation = useSignup();

  const logout = async () => {
    await deleteSecureStore("accessToken");
    queryClient.resetQueries({ queryKey: ["auth"] });
    console.log("로그아웃");
  };

  return {
    loginMutation,
    signupMutation,
    logout,
  };
}
