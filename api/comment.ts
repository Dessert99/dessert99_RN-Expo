import { CreateCommentDto } from "@/types";
import { instance } from "./instance";

/*
interface CreateCommentDto {
  content: string;
  postId: number;
  parentCommentId?: number;
}
*/

// 댓글 생성 요청
export const createComment = async (body: CreateCommentDto) => {
  const { data } = await instance.post("/comments", body);

  return data;
};

// 댓글 삭제 요청
export const deleteComment = async (id: number) => {
  const { data } = await instance.delete(`/comments/${id}`);
  return data;
};

// 게시물을 조회할 때 댓글도 함께 오므로 댓글 조회 api는 필요 없다.
