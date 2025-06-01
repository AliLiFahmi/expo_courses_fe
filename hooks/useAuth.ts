import { useRouter } from "expo-router";
import { useState } from "react";
import api from "../lib/api-helper";
import { removeData, storeData } from "./useAsyncStorage";
import { removeSecureItem, storeSecureItem } from "./useSecureStore";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData extends LoginData {
  full_name: string;
  email: string;
  password: string;
}

interface AuthResponse {
  access_token: string;
  user: {
    id: string;
    full_name: string;
    email: string;
  };
}

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const login = async (data: LoginData) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await api.post<AuthResponse>("/v1/login", data);

      // Store token in secure storage
      await storeSecureItem("token", response.data.access_token);
      // Store user data in async storage
      await storeData("user", response.data.user);
      console.log(response.data);
      // router.replace("/");
      return response.data;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Terjadi kesalahan saat login"
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await api.post<AuthResponse>("/v1/register", data);

      // Store token in secure storage
      await storeSecureItem("token", response.data.access_token);
      // Store user data in async storage
      await storeData("user", response.data.user);

      // router.replace("/");
      return response.data;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Terjadi kesalahan saat registrasi"
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await removeSecureItem("token");
      await removeData("user");
      // router.replace("/login");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Terjadi kesalahan saat logout"
      );
      throw err;
    }
  };

  return {
    login,
    register,
    logout,
    isLoading,
    error,
  };
};
