import { deleteSecureStore, getSecureStore } from "@/utils/secureStore";
import axios from "axios";
import { router } from "expo-router";
import { Platform } from "react-native";

export const baseUrls = {
  ios: "http://localhost:3030",
  android: "http://10.0.2.2:3030",
};
/*
1. android는 localhost를 사용하면 안된다.
2. 실기기 연결할 경우 npx expo start 했을 때 나오는 ip주소로 사용한다.
*/

export const instance = axios.create({
  baseURL: Platform.OS === "ios" ? baseUrls.ios : baseUrls.android,
});

// 요청 인터셉터 추가하기
instance.interceptors.request.use(
  async function (config) {
    // 요청이 전달되기 전에 작업 수행
    const accessToken = await getSecureStore("accessToken");

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    console.log("[요청 인터셉터] -> 토큰: ", accessToken);

    return config;
  },
  function (error) {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가하기
instance.interceptors.response.use(
  function (response) {
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 데이터가 있는 작업 수행
    return response;
  },
  async function (error) {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 오류가 있는 작업 수행
    if (error.response?.status === 401) {
      await deleteSecureStore("accessToken");
      console.log("[응답 인터셉터] -> 토큰 만료");
      router.replace("/auth");
    }
    return Promise.reject(error);
  }
);
