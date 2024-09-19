"use client";

import DataCard from "@/components/user/DataCard";
import Registration from "@/components/user/Registration";
import { User } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Dashboard: React.FC = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<User>();
  const [showRegistration, setShowRegistration] = useState(false);
  const { data: session, update } = useSession();
  if (!session) {
    router.push("/api/auth/signin");
    return;
  }
  useEffect(() => {
    axios
      .get("/api/user")
      .then((response) => {
        if (response.data) {
          return response.data;
        }
      })
      .then((data: User) => {
        setUserData(data);
      });
  }, []);
  const setPending = () => {
    if (session.user.roles.length === 0) {
      update({ roles: ["PENDING"] });
    }
    setShowRegistration(false);
  };
  if (session.user.roles.length === 0) {
    setShowRegistration(true);
  }
  return (
    <>
      {showRegistration && userData && (
        <Registration userData={userData} setPending={setPending} />
      )}
      {!showRegistration && userData && (
        <DataCard
          userData={userData}
          updateData={() => {
            setShowRegistration(true);
          }}
        />
      )}
    </>
  );
};

export default Dashboard;
