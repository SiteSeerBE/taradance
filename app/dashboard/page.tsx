"use client";

import DataCard from "@/components/user/DataCard";
import Registration from "@/components/user/Registration";
import { User } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import AccessDenied from "@/components/user/AccessDenied";
import LoadingAnimation from "@/components/LoadingAnimation";

const Dashboard: React.FC = () => {
  const [userData, setUserData] = useState<User>();
  const [showRegistration, setShowRegistration] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, update, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      axios
        .get("/api/user")
        .then((response) => {
          if (response.data) {
            return response.data;
          }
        })
        .then((data: User) => {
          setUserData(data);
          setIsLoading(false);
        });
    }
    if (status === "unauthenticated") {
      setIsLoading(false);
    }
  }, [status]);

  const setPending = () => {
    if (session?.user.roles.length === 0) {
      update({ roles: ["PENDING"] });
    }
    setShowRegistration(false);
  };

  if (session?.user.roles.length === 0) {
    setShowRegistration(true);
  }

  return (
    <>
      {isLoading && <LoadingAnimation />}
      {status === "unauthenticated" && <AccessDenied />}
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
