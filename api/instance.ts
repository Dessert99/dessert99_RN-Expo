import axios from "axios";
import { Platform } from "react-native";

export const baseUrls = {
  ios: "http://localhost:3030",
  android: "http://10.0.2.2:3030",
};

export const instance = axios.create({
  baseURL: Platform.OS === "ios" ? baseUrls.ios : baseUrls.android,
});

/*
1. android는 localhost를 사용하면 안된다.
2. 실기기 연결할 경우 npx expo start 했을 때 나오는 ip주소로 사용한다.
*/
