"use client";

import { api } from "@/lib/apiRequests";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Alert } from "@/components/Alert/Alert";
import { usePathname } from "next/navigation";

interface AppProviderType {
  authToken: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    login: string,
    email: string,
    password: string,
    password_confirmation: string
  ) => Promise<void>;
  logout: () => void;
}

const AppContext = createContext<AppProviderType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = Cookies.get("authToken");

    if (token) {
      setAuthToken(token);
    } else {
      if (!pathname.includes("/auth") && !pathname.includes("/home")) {
        router.push("/auth");
      }
    }
    setIsLoading(false);
  }, []); // <-- Array de dependências vazio para executar apenas uma vez

  const formatErrorMessages = (errorData: any): string => {
    if (typeof errorData === "string") {
      return errorData;
    }

    if (errorData?.errors) {
      const errors = errorData.errors;
      return Object.values(errors)
        .flat()
        .map((error: any) => `• ${error}<br>`)
        .join("");
    }

    if (errorData?.message) {
      return errorData.message;
    }

    return "Ocorreu um erro desconhecido. Por favor, tente novamente.";
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await api.post(`/auth/login`, {
        email,
        password,
      });

      if (response.data.status) {
        Cookies.set("authToken", response.data.token, { expires: 1 });
        setAuthToken(response.data.token);
        localStorage.setItem("loginSuccess", "true");
        router.push("/table");
      } else {
        Alert.error("", {
          html: formatErrorMessages(response.data.message),
          title: "Login inválido",
        });
      }
    } catch (error: any) {
      Alert.error("", {
        html: formatErrorMessages(error.response?.data),
        title: "Opa!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    login: string,
    email: string,
    password: string,
    password_confirmation: string
  ) => {
    setIsLoading(true);
    try {
      const response = await api.post(`/auth/register`, {
        login,
        email,
        password,
        password_confirmation,
      });

      if (response.data.status) {
        Alert.success("Você já pode fazer login.", {
          title: "Cadastro realizado!",
        });
        router.push("/auth?tipo=login");
      } else {
        Alert.error("", {
          html: formatErrorMessages(response.data.message),
          title: "Erro no cadastro",
        });
      }
    } catch (error: any) {
      Alert.error("", {
        html: formatErrorMessages(error.response?.data),
        title: "Opa!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setAuthToken(null);
    Cookies.remove("authToken");
    localStorage.setItem("logoutSuccess", "true");
    if (!pathname.includes("/home")) {
      router.push("/home");
    }
  };

  return (
    <AppContext.Provider
      value={{ login, register, isLoading, authToken, logout }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const myAppHook = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Contexto will be wrapped inside AppProvider");
  }
  return context;
};
