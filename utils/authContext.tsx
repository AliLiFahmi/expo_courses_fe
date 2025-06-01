import { useRouter } from "expo-router";
import { createContext, PropsWithChildren, useState } from "react";
import { useAuth } from "../hooks/useAuth";

type User = {
  id: string;
  full_name: string;
  email: string;
};

type AuthState = {
  isLoading: boolean;
  error: string | null;
  user: User | null;
  login: (data: { email: string; password: string }) => Promise<void>;
  register: (data: {
    full_name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthState>({
  isLoading: false,
  error: null,
  user: null,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
  const router = useRouter();
  const {
    login: authLogin,
    register: authRegister,
    logout: authLogout,
    isLoading,
    error,
  } = useAuth();
  const [user, setUser] = useState<User | null>(null);

  const login = async (data: { email: string; password: string }) => {
    try {
      const response = await authLogin(data);
      setUser(response.user);
      router.replace("/");
    } catch (err) {
      console.error(err);
    }
  };

  const register = async (data: {
    full_name: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await authRegister(data);
      setUser(response.user);
      router.replace("/");
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    try {
      await authLogout();
      setUser(null);
      router.replace("/login");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <AuthContext.Provider
      value={{ isLoading, error, user, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
