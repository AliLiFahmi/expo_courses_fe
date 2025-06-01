import * as SecureStore from "expo-secure-store";

export const storeSecureItem = async (key: string, value: string) => {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.error("Error storing secure item:", error);
    throw error;
  }
};

export const getSecureItem = async (key: string) => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.error("Error getting secure item:", error);
    throw error;
  }
};

export const removeSecureItem = async (key: string) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error("Error removing secure item:", error);
    throw error;
  }
};

export const useSecureStore = () => {
  return {
    storeSecureItem,
    getSecureItem,
    removeSecureItem,
  };
};
