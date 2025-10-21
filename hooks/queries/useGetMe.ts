import { getMe } from "@/api/auth";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export function useGetMe() {
  const { data, isError } = useQuery({
    queryFn: getMe,
    queryKey: ["auth", "getMe"],
    retry: false,
  });

  useEffect(() => {
    if (isError) {
      console.log("내 정보 가져오기 에러");
    }
  }, [isError]); // isError가 변경될 때만 실행

  return {
    auth: {
      id: data?.id || "",
      nickname: data?.nickname || "",
    },
  };
}
