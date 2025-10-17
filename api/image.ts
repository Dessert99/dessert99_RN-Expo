import { instance } from "./instance";

export const uploadImages = async (body: FormData): Promise<string[]> => {
  console.log("[API] -> POST /images");
  const { data } = await instance.post("/images", body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};
