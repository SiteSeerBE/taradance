"use client";

import { User } from "firebase/auth";
import { register } from "module";
import { createContext } from "react";

export interface TaradanceUser {
  user: User | null;
  registered: boolean;
}

export const UserContext = createContext<TaradanceUser>({
  user: null,
  registered: false,
});
