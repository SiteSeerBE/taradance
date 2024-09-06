"use client";

import {
  getAuth,
  initializeAuth,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { createContext, use, useContext, useEffect, useState } from "react";

interface TaradanceUser {
  uid: User | null;
  // Other user properties
}

const AuthContext = createContext<{
  user: User | null;
  loading: boolean;
}>({
  user: null,
  loading: false,
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  async function setClaims(user: User) {
    const idTokenResult = await user.getIdTokenResult(true);
    console.log(idTokenResult.claims);
  }

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
