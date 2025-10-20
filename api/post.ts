import { CreatePostDto, CreateVoteDto, Post, VoteOption } from "@/types";
import { instance } from "./instance";

export async function createPost(body: CreatePostDto) {
  const { data } = await instance.post("/posts", body);

  return data;
}

// 게시글 요청 로직 : 파라미터-페이지, 리턴 타입 - Post배열
export async function getPosts(page = 1): Promise<Post[]> {
  console.log("[API] -> GET /posts");
  const { data } = await instance.get(`/posts?page=${page}`);
  return data;
}

/* 이 포스트의 배열이 리턴 값.
interface Post {
  id: number;
  userId: number;
  title: string;
  description: string;
  createdAt: string;
  author: User;
  imageUris: ImageUri[];
  likes: { userId: number }[];
  hasVote: boolean;
  voteCount: number;
  commentCount: number;
  viewCount: number;
  votes?: PostVote[];
  comments?: PostComment[];
}
*/

// 게시글 삭제 요청: 어떤 게시글이 삭제되었는지 리턴값이 온다.
export async function deletePost(id: number): Promise<number> {
  console.log("[API] -> DELETE /posts");
  const { data } = await instance.delete(`/posts/${id}`);
  return data;
}

// 특정 id 게시글 요청 로직
export async function getPost(id: number): Promise<Post> {
  console.log("[API] -> GET /posts/id");
  const { data } = await instance.get(`/posts/${id}`);
  return data;
}

type RequestUpdatePost = {
  id: number;
  body: CreatePostDto;
};

// 게시글 수정 요청. 리턴은 수정된 게시글 id만 오게 된다.
export async function updatePost({
  id,
  body,
}: RequestUpdatePost): Promise<number> {
  console.log("[API] -> PATCH /posts");
  const { data } = await instance.patch(`/posts/${id}`, body);
  return data;
}

export async function createVote({
  postId,
  voteOptionId,
}: CreateVoteDto): Promise<{ postId: number; voteOption: VoteOption }> {
  const { data } = await instance.post(`/posts/${postId}/vote/${voteOptionId}`);
  return data;
}
