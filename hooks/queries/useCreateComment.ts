import { createComment } from "@/api/comment";
import { queryClient } from "@/api/queryClient";
import { queryKeys } from "@/constants";
import { useMutation } from "@tanstack/react-query";

export function useCreateComment() {
  return useMutation({
    mutationFn: createComment,
    // 댓글 등록이 성공하면 게시글 id가 온다. 이거로 게시글 상태를 업데이트 해야 한다.
    onSuccess: (postId: number) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST, postId],
      });
    },
  });
}
