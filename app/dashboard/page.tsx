"use client";

import DataCard from "@/components/user/DataCard";
import LoadingAnimation from "@/components/LoadingAnimation";
import Registration from "@/components/user/Registration";
import axios from "axios";
import { useEffect, useState } from "react";
import type { User } from "@prisma/client";

const Dashboard: React.FC = () => {
  const [userData, setUserData] = useState<Partial<User>>();
  const [showRegistration, setShowRegistration] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false);
        if (!data.firstName || !data.lastName || !data.email) {
          setShowRegistration(true);
        }
      });
  }, [showRegistration]);

  return (
    <>
      {isLoading && <LoadingAnimation />}
      {!isLoading && showRegistration && (
        <Registration
          userData={userData}
          setShowRegistration={setShowRegistration}
        />
      )}
      {!isLoading && !showRegistration && userData && (
        <DataCard
          userData={userData}
          setShowRegistration={setShowRegistration}
        />
      )}
    </>
  );
};

export default Dashboard;
