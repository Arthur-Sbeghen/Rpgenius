"use client";

import React, { useEffect, useState } from "react";
import "./auth.css";
import { myAppHook } from "@/context/AppProvider";
import { useRouter, useSearchParams } from "next/navigation";

interface formData {
  login?: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [formdata, setFormData] = useState<formData>({
    login: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const searchParams = useSearchParams();

  useEffect(() => {
    const tipo = searchParams.get("tipo");
    setIsLogin(tipo !== "cadastro");
  }, [searchParams]);

  const { login, register, isLoading, authToken } = myAppHook();

  const router = useRouter();
  useEffect(() => {
    if (authToken) {
      router.push("/table");
      return;
    }
  }, [authToken, isLoading]);

  const handleOnChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formdata,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (isLogin) {
        await login(formdata.email, formdata.password);
      } else {
        await register(
          formdata.login!,
          formdata.email,
          formdata.password,
          formdata.password_confirmation!
        );
      }
    } catch (error) {
      console.log("Autenticação falhou: " + error);
    }
  };

  return (
    <>
      <div className="auth-container">
        <div className="auth-card">
          <h3 className="auth-title">{isLogin ? "Login" : "Cadastro"}</h3>
          <form className="auth-form" onSubmit={handleFormSubmit}>
            {!isLogin && (
              <input
                name="login"
                type="text"
                placeholder="Login"
                value={formdata.login}
                onChange={handleOnChangeInput}
                required
              />
            )}
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formdata.email}
              onChange={handleOnChangeInput}
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Senha"
              value={formdata.password}
              onChange={handleOnChangeInput}
              required
            />
            {!isLogin && (
              <input
                name="password_confirmation"
                type="password"
                placeholder="Confirmar Senha"
                value={formdata.password_confirmation}
                onChange={handleOnChangeInput}
                required
              />
            )}
            <button type="submit">{isLogin ? "Entrar" : "Registrar"}</button>
          </form>

          <p className="auth-subtext">
            {isLogin ? "Não tem uma conta? " : "Você já tem uma conta? "}
            <span className="auth-change" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Cadastre-se" : "Login"}
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Auth;
