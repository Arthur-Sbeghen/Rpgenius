"use client";

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

interface AppProviderType {
  authToken: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    password_confirmation: string
  ) => Promise<void>;
  logout: () => void;
}

const AppContext = createContext<AppProviderType | undefined>(undefined);

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth`;

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("authToken");

    if (token) {
      setAuthToken(token);
    } else {
      if (
        !window.location.pathname.includes("/auth") &&
        !window.location.pathname.includes("/home")
      ) {
        router.push("/auth");
      }
    }
    setIsLoading(false);
  }, []); // <-- Array de dependências vazio para executar apenas uma vez

  const formatErrorMessages = (errorData: any): string => {
    // Se for uma string simples, retorna como está
    if (typeof errorData === "string") {
      return errorData;
    }

    // Se for um objeto de erros do Laravel (com propriedade 'errors')
    if (errorData?.errors) {
      const errors = errorData.errors;
      return Object.values(errors)
        .flat()
        .map((error: any) => `• ${error}<br>`)
        .join("");
    }

    // Se for uma mensagem padrão na propriedade 'message'
    if (errorData?.message) {
      return errorData.message;
    }

    // Mensagem padrão caso não reconheça o formato
    return "Ocorreu um erro desconhecido. Por favor, tente novamente.";
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      if (response.data.status) {
        Cookies.set("authToken", response.data.token, { expires: 1 });
        setAuthToken(response.data.token);
        localStorage.setItem("loginSuccess", "true");
        router.push("/table");
      } else {
        await Swal.fire({
          icon: "error",
          title: "Login inválido",
          theme: "dark",
          html: formatErrorMessages(response.data.message),
        });
      }
    } catch (error: any) {
      await Swal.fire({
        icon: "error",
        title: "Erro no servidor",
        theme: "dark",
        html: formatErrorMessages(error.response?.data),
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
      const response = await axios.post(`${API_URL}/register`, {
        login,
        email,
        password,
        password_confirmation,
      });

      if (response.data.status) {
        await Swal.fire({
          icon: "success",
          title: "Cadastro realizado!",
          theme: "dark",
          text: "Você já pode fazer login.",
        });
        router.push("/auth?tipo=login");
      } else {
        await Swal.fire({
          icon: "error",
          title: "Erro no cadastro",
          theme: "dark",
          html: formatErrorMessages(response.data.message),
        });
      }
    } catch (error: any) {
      await Swal.fire({
        icon: "error",
        title: "Erro no servidor",
        theme: "dark",
        html: formatErrorMessages(error.response?.data),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setAuthToken(null);
    Cookies.remove("authToken");
    localStorage.setItem("logoutSuccess", "true");
    if (window.location.pathname !== "/home") {
      window.location.href = "/home";
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
