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
        <h2 className="systems">Nossos sistemas:</h2>
        <div className="slider">
  <div className="slide-track">
    <div className="slide">
      <img src="https://www.rederpg.com.br/wp/wp-content/uploads/2020/05/DD-Logo.png" height="100" width="250" alt="D&D 5e" />
    </div>
    <div className="slide">
      <img src="https://cdn1.epicgames.com/spt-assets/5e757cef8527449aa2a5f510a5f4abe3/call-of-cthulhu-logo-1nv5w.png?resize=1&w=480&h=270&quality=medium" height="100" width="250" alt="Call of Cthulhu" />
    </div>
    <div className="slide">
      <img src="https://rpgpedia.com/images/home/logo-tormenta20.png" height="100" width="250" alt="Tormenta" />
    </div>
    <div className="slide">
      <img src="https://upload.wikimedia.org/wikipedia/commons/4/40/Vampire_The_Masquerade_logo_V5.png" height="100" width="250" alt="Vampire: The Masquerade" />
    </div>
    <div className="slide">
      <img src="https://rpgpedia.com/images/home/logo-ordem-paranormal.png" height="100" width="250" alt="Ordem Paranormal" />
    </div>
    <div className="slide">
      <img src="https://rpgpedia.com/images/home/logo-som-das-seis.png" height="100" width="250" alt="Som das Seis" />
    </div>
    <div className="slide">
      <img src="https://www.rederpg.com.br/wp/wp-content/uploads/2020/05/DD-Logo.png" height="100" width="250" alt="D&D 5e" />
    </div>
    <div className="slide">
      <img src="https://cdn1.epicgames.com/spt-assets/5e757cef8527449aa2a5f510a5f4abe3/call-of-cthulhu-logo-1nv5w.png?resize=1&w=480&h=270&quality=medium" height="100" width="250" alt="Call of Cthulhu" />
    </div>
    <div className="slide">
      <img src="https://rpgpedia.com/images/home/logo-tormenta20.png" height="100" width="250" alt="Tormenta" />
    </div>
    <div className="slide">
      <img src="https://upload.wikimedia.org/wikipedia/commons/4/40/Vampire_The_Masquerade_logo_V5.png" height="100" width="250" alt="Vampire: The Masquerade" />
    </div>
    <div className="slide">
      <img src="https://rpgpedia.com/images/home/logo-ordem-paranormal.png" height="100" width="250" alt="Ordem Paranormal" />
    </div>
    <div className="slide">
      <img src="https://rpgpedia.com/images/home/logo-som-das-seis.png" height="100" width="250" alt="Som das Seis" />
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
