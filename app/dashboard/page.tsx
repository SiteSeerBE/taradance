"use client";

import DataCard from "@/components/user/DataCard";
import LoadingAnimation from "@/components/LoadingAnimation";
import Registration from "@/components/user/Registration";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { User } from "@prisma/client";

const Dashboard: React.FC = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<Partial<User>>();
  const [showRegistration, setShowRegistration] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/user")
      .then((response) => {
        const data = response.data as User;
        setUserData(data);
        if (!data.firstName || !data.lastName || !data.email) {
          setShowRegistration(true);
        }
      })
      .catch((error: unknown) => {
        if (axios.isAxiosError(error) && error.response?.status === 403) {
          router.replace("/aanmelden");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [router]);

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
