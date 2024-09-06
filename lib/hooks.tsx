import { doc, onSnapshot, getFirestore } from "firebase/firestore";
import { auth } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

// Custom hook to read  auth record and user profile doc
const useUserData = () => {
  const [user] = useAuthState(auth);
  const [initials, setInitials] = useState<String | null>(null);

  useEffect(() => {
    let unsubscribe;

    if (user) {
      const ref = doc(getFirestore(), "users", user.uid);
      unsubscribe = onSnapshot(ref, (doc) => {
        if (doc.exists()) {
          setInitials(doc.data()?.username);
        }
      });
    }

    return unsubscribe;
  }, [user]);

  return { user, initials };
};

export { useUserData };
