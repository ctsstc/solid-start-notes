"use client";

import { createContext, createSignal, JSX, useContext } from "solid-js";

const defaultSignalValue = createSignal(true);
export const context = createContext(defaultSignalValue);

export interface ProviderProps {
  children: JSX.Element;
}

export const Provider = (props: ProviderProps) => {
  const [darkMode] = defaultSignalValue;

  return (
    <context.Provider value={defaultSignalValue}>
      <div class={darkMode() ? "dark" : "light"}>{props.children}</div>
    </context.Provider>
  );
};

export const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useContext(context);

  return (
    <button
      class="dark-mode-toggle"
      onClick={() => setDarkMode(!darkMode())}
      style={{
        "background-color": darkMode() ? "var(--gray-20)" : "var(--gray-80)",
        color: darkMode() ? "white" : "black",
        "padding-top": "6px",
      }}
    >
      {darkMode() ? "☀️" : "🌙"}
    </button>
  );
};
