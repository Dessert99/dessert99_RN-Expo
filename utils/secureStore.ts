import * as SecureStore from "expo-secure-store";

export const saveSecureStore = async (key: string, value: string) => {
  await SecureStore.setItemAsync(key, value);
};

export const getSecureStore = async (key: string) => {
  const storedData = (await SecureStore.getItemAsync(key)) ?? null;

  return storedData;
};

export const deleteSecureStore = async (key: string) => {
  await SecureStore.deleteItemAsync(key);
};
