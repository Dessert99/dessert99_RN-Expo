import { instance } from "./instance";

export const uploadImages = async (body: FormData): Promise<string[]> => {
  const { data } = await instance.post("/images", body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log("[API] -> POST /images 결과", data);
  return data;
};
