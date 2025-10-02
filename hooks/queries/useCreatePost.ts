import { createPost } from "@/api/post";
import { queryClient } from "@/api/queryClient";
import { queryKeys } from "@/constants";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";

function useCreatePost() {
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      router.replace("/");
      // 쿼리 무효화하고 상태 최신화. 쿼리가 오래되었다는 것을 판단하고 다시 리패치할 때 사용한다.
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });
    },
  });
}

export default useCreatePost;
