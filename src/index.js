// Точка входа в приложение
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { useThemeStore } from './store/themeStore';

const ThemeWrapper = () => {
  const { theme, accentColor } = useThemeStore();
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-accent', accentColor);
  }, [theme, accentColor]);
  return <App />;
};

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeWrapper />
  </BrowserRouter>
);
