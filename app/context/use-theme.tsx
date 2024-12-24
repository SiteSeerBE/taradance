"use client";

import { useContext } from "react";
import ThemeContext from "./theme-context";

export function useTheme() {
  const consumer = useContext(ThemeContext);

  if (!consumer) {
    throw new Error("useThemes must be used within a ThemeProvider");
  }

  return consumer;
}
