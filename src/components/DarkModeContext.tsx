"use client";

import { createContext, createSignal, JSX, useContext } from "solid-js";
import { Theme } from "~/lib/theme-model";

const defaultSignalValue = createSignal(true);
export const context = createContext(defaultSignalValue);

export interface ProviderProps {
  children: JSX.Element;
}

export const Provider = (props: ProviderProps) => {
  const [darkMode] = defaultSignalValue;

  return (
    <context.Provider value={defaultSignalValue}>
      <div class={darkMode() ? Theme.Dark : Theme.Light}>{props.children}</div>
    </context.Provider>
  );
};

export const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useContext(context);

  const toggleDarkMode = () => setDarkMode(!darkMode());

  return (
    <button
      class="dark-mode-toggle"
      onClick={toggleDarkMode}
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
