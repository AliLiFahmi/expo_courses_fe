import { useRouter } from "expo-router";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
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
  isAuthenticated: boolean;
  isInitialized: boolean; // untuk menandakan apakah pengecekan awal sudah selesai
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
  isAuthenticated: false,
  isInitialized: false,
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
    checkAuthStatus,
    isLoading,
    error,
  } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Cek status auth saat aplikasi pertama kali dimuat
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const authData = await checkAuthStatus();
        if (authData) {
          setUser(authData.user);
          // Jika sudah login, redirect ke home
          router.replace("/");
        } else {
          // Jika belum login, redirect ke login page
          router.replace("/login");
        }
      } catch (err) {
        console.error("Error initializing auth:", err);
        router.replace("/login");
      } finally {
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, []);

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
      value={{
        isLoading,
        error,
        user,
        isAuthenticated: !!user,
        isInitialized,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
