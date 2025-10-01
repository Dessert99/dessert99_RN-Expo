import { CreatePostDto } from "@/types";
import { instance } from "./instance";

async function createPost(body: CreatePostDto) {
  const { data } = await instance.post("/posts", body);

  return data;
}

export { createPost };
