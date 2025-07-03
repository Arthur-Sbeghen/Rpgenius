// styles.ts
import styled from "styled-components";

export const Sidebar = styled.nav`
  box-sizing: border-box;
  height: 100vh;
  width: 250px;
  padding: 5px 1em;
  background-color: var(--base-clr);
  border-right: 1px solid var(--line-clr);
  position: sticky;
  top: 0;
  transition: 300ms ease-in-out;
  overflow: hidden;

  &.close {
    padding: 5px;
    width: 60px;
  }

  ul {
    list-style: none;
  }

  .sidebar-header {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 16px;
  }

  .logo {
    font-weight: 600;
  }

  .toggle-btn {
    margin-left: auto;
    padding: 1em;
    border: none;
    border-radius: 0.5em;
    background: none;
    cursor: pointer;

    &:hover {
      background-color: var(--hover-clr);
    }
  }

  .menu-item {
    border-radius: 0.5em;
    padding: 0.85em;
    text-decoration: none;
    color: var(--text-clr);
    display: flex;
    align-items: center;
    gap: 1em;

    &:hover {
      background-color: var(--hover-clr);
    }
  }

  .dropdown-btn {
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    font: inherit;
    cursor: pointer;
  }

  .sub-menu {
    display: grid;
    grid-template-rows: 0fr;
    transition: 300ms ease-in-out;

    &.show {
      grid-template-rows: 1fr;
    }

    > div {
      overflow: hidden;
    }
  }
`;
