"use client";

import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { getCollectionItem } from "./CRUD/getCollectionItem";
import { DocumentData } from "./dataTypes";

const AuthContext = createContext<{
  loading: boolean;
  roles: string[];
  user: User | null;
  person: DocumentData | null;
  setPerson: React.Dispatch<React.SetStateAction<DocumentData | null>>;
}>({
  loading: false,
  person: null,
  roles: [],
  user: null,
  setPerson: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [roles, setRoles] = useState<string[]>([]);
  const [person, setPerson] = useState<DocumentData | null>(null);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        getCollectionItem("users", user.uid).then((userData) => {
          if (userData) {
            setRoles(userData.roles);
          }
        });
        getCollectionItem("people", user.uid).then((personData) => {
          if (personData) {
            setPerson(personData);
          }
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ loading, roles, user, person, setPerson }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
