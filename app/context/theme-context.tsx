"use client";

import { createContext, Dispatch, SetStateAction } from "react";

type TContext = {
  theme: "dark" | "light";
  setTheme: Dispatch<SetStateAction<"dark" | "light">>;
};

const ThemeContext = createContext<TContext | undefined>(undefined);

export default ThemeContext;
