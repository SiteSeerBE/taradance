"use client";
import { useState } from "react";
import ThemeContext from "./theme-context";

export default function ThemeProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useState<"dark" | "light">(
    defaultDark ? "dark" : "light"
  );

  return (
    <>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <html lang="en" data-theme={theme}>
          {children}
        </html>
      </ThemeContext.Provider>
    </>
  );
}
