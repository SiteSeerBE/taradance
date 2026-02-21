"use client";
import { useEffect, useState } from "react";
import ThemeContext from "./theme-context";

export default function ThemeProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [theme, setTheme] = useState<"dark" | "light">("light");

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)")
      .matches;
    setTheme(prefersDark ? "dark" : "light");
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.colorMode = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
