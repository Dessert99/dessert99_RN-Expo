import { deletePost } from "@/api/post";
import { queryClient } from "@/api/queryClient";
import { queryKeys } from "@/constants";
import { useMutation } from "@tanstack/react-query";

export function useDeletePost() {
  return useMutation({
    mutationFn: deletePost,

    // 삭제가 성공했을 때 게시글 목록을 쿼리 무효화해서 상태를 업데이트해야 한다.
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });
    },
  });
}
