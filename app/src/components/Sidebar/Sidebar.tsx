// Sidebar.tsx
"use client";

import { useState } from "react";
import "./style.css";
import { myAppHook } from "@/context/AppProvider";

interface SidebarProps {
  isClosed: boolean;
  toggleSidebar: () => void;
}

export function Sidebar({ isClosed, toggleSidebar }: SidebarProps) {

  const {logout} = myAppHook();

  // const [activeSubMenus, setActiveSubMenus] = useState<number[]>([]);

  // const toggleSubMenu = (menu: number) => {
  //   const index = activeSubMenus.findIndex((a) => a === menu);

  //   if (index === -1) {
  //     setActiveSubMenus([...activeSubMenus, menu]);
  //   } else {
  //     setActiveSubMenus(activeSubMenus.filter((_, i) => i !== index));
  //   }
  // };

  // const verifySubMenuIsActive = (menu: number) => {
  //   return activeSubMenus.find((a) => a === menu) !== undefined;
  // };

  return (
    <nav id="sidebar" className={isClosed ? "close" : ""}>
      <ul>
        <li>
          <span className="logo">RPGenius</span>
          <button onClick={toggleSidebar} id="toggle-btn">
            <i className={isClosed ? 'fa-solid fa-angles-left fa-rotate-180' : 'fa-solid fa-angles-left'} style={{color: '#ffffff'}}></i>
          </button>
        </li>
        <li className="active">
          <a href="/home">
            <i className="fa-solid fa-house"></i>
            <span className={isClosed ? 'span-hidden' : ''}>Home</span>
          </a>
        </li>
        <li>
          <a href="/table">
            <i className="fa-solid fa-dice-d20"></i>
            <span className={isClosed ? 'span-hidden' : ''}>Dashboard</span>
          </a>
        </li>
        {/* <li>
          <button
            onClick={() => {
              toggleSubMenu(1);
            }}
            className={
              verifySubMenuIsActive(1) ? "dropdown-btn rotate" : "dropdown-btn"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed"
            >
              <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h207q16 0 30.5 6t25.5 17l57 57h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H447l-80-80H160v480Zm0 0v-480 480Zm400-160v40q0 17 11.5 28.5T600-320q17 0 28.5-11.5T640-360v-40h40q17 0 28.5-11.5T720-440q0-17-11.5-28.5T680-480h-40v-40q0-17-11.5-28.5T600-560q-17 0-28.5 11.5T560-520v40h-40q-17 0-28.5 11.5T480-440q0 17 11.5 28.5T520-400h40Z" />
            </svg>
            <span>Table</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed"
            >
              <path d="M480-361q-8 0-15-2.5t-13-8.5L268-556q-11-11-11-28t11-28q11-11 28-11t28 11l156 156 156-156q11-11 28-11t28 11q11 11 11 28t-11 28L508-372q-6 6-13 8.5t-15 2.5Z" />
            </svg>
          </button>
          <ul
            className={verifySubMenuIsActive(1) ? "sub-menu show" : "sub-menu"}
          >
            <div>
              <a href=""></a>
            </div>
          </ul>
        </li> */}
        <li>
          <a href="profile.html">
            <i className="fa-solid fa-user"></i>
            <span className={isClosed ? 'span-hidden' : ''}>Profile</span>
          </a>
        </li>
        <li>
          <a onClick={logout}>
            <i className="fa-solid fa-right-from-bracket fa-rotate-180"></i>
            <span className={isClosed ? 'span-hidden' : ''}>Sair</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
