"use client";

import React, { useEffect, useLayoutEffect, useState } from "react";
import { myAppHook } from "@/context/AppProvider";
import { useRouter, useSearchParams } from "next/navigation";
import { Alert } from "@/components/Alert/Alert";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./auth.css";
import { Toast } from "@/components/Toast/Toast";
import { api } from "@/lib/apiRequests";

// Toast simples
const Auth: React.FC = () => {
  const searchParams = useSearchParams();
  const tipo = searchParams.get("tipo");
  const isLogin = tipo !== "cadastro" && tipo !== "recuperar";
  const isForgot = tipo === "recuperar";

  // Fade animation state
  const [fade, setFade] = useState(false);
  useEffect(() => {
    setFade(false);
    const timeout = setTimeout(() => setFade(true), 10);
    return () => clearTimeout(timeout);
  }, [tipo]);

  // Schema de validação
  const authSchema = yup.object().shape({
    ...(!isLogin && {
      login: yup
        .string()
        .required("Campo obrigatório")
        .min(3, "Mínimo 3 caracteres")
        .max(40, "Máximo de 40 caracteres"),
    }),
    email: yup.string().email("Email inválido").required("Campo obrigatório"),
    password: yup
      .string()
      .required("Campo obrigatório")
      .min(6, "Senha deve ter 6+ caracteres"),
    ...(!isLogin && {
      password_confirmation: yup
        .string()
        .oneOf([yup.ref("password")], "Senhas não coincidem")
        .required("Confirme sua senha"),
    }),
  });

  type FormData = yup.InferType<typeof authSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(authSchema),
    defaultValues: {
      login: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const { login, register: registerUser, authToken } = myAppHook();
  const router = useRouter();
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);

  useEffect(() => {
    if (authToken) {
      router.push("/table");
    }
  }, [authToken, router]);

  const onSubmit = async (formData: FormData) => {
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        if (
          typeof formData.login !== "string" ||
          typeof formData.password_confirmation !== "string"
        ) {
          Alert.error("Dados de cadastro inválidos");
          return;
        }

        await registerUser(
          formData.login ?? "",
          formData.email,
          formData.password,
          formData.password_confirmation ?? ""
        );
      }
    } catch (error) {
      Alert.error("Erro na autenticação");
    } finally {
      reset();
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotLoading(true);
    try {
      const response = await api.post("/auth/forgot-password", {
        email: forgotEmail,
      });

      if (response.data.status) {
        Toast.success(
          "Se o e-mail estiver cadastrado, você receberá instruções."
        );
        setForgotEmail("");
        router.push("/auth");
      } else {
        Toast.error(
          response.data.message || "Erro ao solicitar recuperação de senha."
        );
      }
    } catch (error: any) {
      Toast.error("Erro ao solicitar recuperação de senha.");
    } finally {
      setForgotLoading(false);
    }
  };

  if (isForgot) {
    return (
      <main className={`auth-main auth-fade${fade ? " auth-fade-active" : ""}`}>
        <div className="auth-card">
          <a href="/home" className="return-btn">
            Voltar para página Inicial
          </a>
          <h3 className="auth-title">Recupere sua senha</h3>
          <form className="auth-form" onSubmit={handleForgotPassword}>
            <div className="input-group">
              <input
                type="email"
                placeholder="Digite seu e-mail"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              disabled={forgotLoading}
              className={forgotLoading ? "loading" : ""}
            >
              {forgotLoading ? "Enviando..." : "Enviar link de recuperação"}
            </button>
          </form>
          <p className="auth-subtext">
            <button
              type="button"
              className="auth-change"
              onClick={() => router.push("/auth")}
            >
              Voltar ao login
            </button>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className={`auth-main auth-fade${fade ? " auth-fade-active" : ""}`}>
      <div className="auth-card">
        <a href="/home" className="return-btn">
          Voltar para página Inicial
        </a>
        <h3 className="auth-title">
          {isLogin ? "Login" : "Cadastro de Usuário"}
        </h3>

        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          {!isLogin && (
            <div className="input-group">
              <input {...register("login")} type="text" placeholder="Usuário" />
              {errors.login && (
                <span className="error-message">{errors.login.message}</span>
              )}
            </div>
          )}

          <div className="input-group">
            <input {...register("email")} type="email" placeholder="Email" />
            {errors.email && (
              <span className="error-message">{errors.email.message}</span>
            )}
          </div>

          <div className="input-group">
            <input
              {...register("password")}
              type="password"
              placeholder="Senha"
            />
            {errors.password && (
              <span className="error-message">{errors.password.message}</span>
            )}
          </div>

          {/* Confirmação de senha (cadastro) */}
          {!isLogin && (
            <div className="input-group">
              <input
                {...register("password_confirmation")}
                type="password"
                placeholder="Confirme a Senha"
              />
              {errors.password_confirmation && (
                <span className="error-message">
                  {errors.password_confirmation.message}
                </span>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={isSubmitting ? "loading" : ""}
          >
            {isSubmitting ? "Processando..." : isLogin ? "Entrar" : "Cadastrar"}
          </button>
        </form>

        {isLogin && (
          <p className="auth-subtext">
            <button
              type="button"
              className="auth-change"
              onClick={() => router.push("/auth?tipo=recuperar")}
            >
              Esqueceu a senha?
            </button>
          </p>
        )}

        <p className="auth-subtext">
          {isLogin ? "Não tem uma conta? " : "Você já tem uma conta? "}
          <a
            href={isLogin ? "/auth?tipo=cadastro" : "/auth"}
            className="auth-change"
          >
            {isLogin ? "Cadastre-se" : "Entrar"}
          </a>
        </p>
      </div>
    </main>
  );
};

export default Auth;
