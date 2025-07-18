"use client";

import { useEffect } from "react";
import "./style.css";
import { Alert } from "@/components/Alert/Alert";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <header className="home-header">
        <h1 className="home-h1">RPGenius</h1>
        <section title="Opções">
          <ul className="options">
            <li>
              <Link href="/auth" className="btn" id="btnEntrar">
                Entrar
              </Link>
            </li>
            <li>
              <Link href="/auth?tipo=cadastro" className="btn" id="btnCadastro">
                Cadastrar-se
              </Link>
            </li>
          </ul>
        </section>
      </header>

      <main className="home-main">
        
          <div className="apresentacao">
            <p className="f1">Suas campanhas de RPG em um só lugar!</p>
          </div>
          <p className="f2">
            Com o Rpgenius, você pode criar e gerenciar fichas e mesas de RPG,
            facilitando sua diversão! Solte sua criatividade, reúna seus amigos
            e explore seu mundo com apoio do RPGenius!
          </p>
        

        <div className="funcionalidades">
          <div className="card">
            <h3 className="home-h3">Crie mesas</h3>

            <div className="cont">
              <p className="f">
                Crie uma mesa, selecione seu sistema favorito e adicione todos
                seus amigos para começar uma grande aventura! Você poderá ver
                como estão seus companheiros e salvar automaticamente sua ficha
                ao longo da campanha.
              </p>
            </div>
          </div>
          <div className="card">
            <h3 className="home-h3">Gerencie suas fichas</h3>

            <div className="cont">
              <p className="f">
                Crie as fichas dos seus personagens de modo rápido, com a nossa
                ajuda para preencher as informações! Com nossos modelos de
                fichas prontos você pode começar a criar suas fichas, podendo
                também rolar os dados de atributos e o que precisar!
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="home-footer">
        <p className="home-p">
          Desenvolvido por Arthur Sbeghen, Enrico Parolin, Rômulo Girotto e
          Sarah Tumelero da Silveira
        </p>
      </footer>
    </>
  );
}
