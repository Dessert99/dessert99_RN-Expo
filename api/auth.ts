import { Profile } from "@/types";
import { getSecureStore } from "@/utils/secureStore";
import { instance } from "./instance";

type RequestUser = {
  email: string;
  password: string;
};

export const postSignup = async (body: RequestUser): Promise<void> => {
  const { data } = await instance.post("/auth/signup", body);
  return data;
};

export const postLogin = async (
  body: RequestUser
): Promise<{ accessToken: string }> => {
  const { data } = await instance.post("/auth/signin", body);

  return data;
};

export const getMe = async (): Promise<Profile> => {
  console.log("[API] -> GET /auth/me");
  const accessToken = await getSecureStore("accessToken");
  const { data } = await instance.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};
