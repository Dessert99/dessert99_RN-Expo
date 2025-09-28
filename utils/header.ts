import { instance } from "@/api/instance";

export const setHeader = (key: string, value: string) => {
  instance.defaults.headers.common[key] = value;
};

export const removeHeader = (key: string) => {
  if (!instance.defaults.headers.common[key]) {
    return;
  }
  delete instance.defaults.headers.common[key];
};
