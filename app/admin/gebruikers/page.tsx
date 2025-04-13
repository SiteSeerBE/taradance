"use client";

import ChangeRole from "@/components/admin/ChangeRole";
import { User } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type UserParameters = {
  orderBy: string;
  direction: "asc" | "desc";
  skip: number;
  take: number;
};

const Gebruikers: React.FC = () => {
  const [userData, setUserData] = useState<Partial<User>[]>();
  const [pageNumber, setPageNumber] = useState(0);

  const getUsers = async () => {
    const userParameters: UserParameters = {
      orderBy: "firstName",
      direction: "asc",
      skip: pageNumber * 10,
      take: 10,
    };

    const response = await axios.get("/api/users", { params: userParameters });
    if (response.data) {
      return response.data;
    } else {
      throw new Error("Geen gebruikers gevonden");
    }
  };

  useEffect(() => {
    toast
      .promise(getUsers(), {
        loading: "Loading",
        success: "Gebruikers geladen",
        error: "Geen gebruikers gevonden",
      })
      .then((data: User[]) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [pageNumber]);

  return (
    <>
      <div className="breadcrumb center container-flex">
        <h1>Gebruikers</h1>
      </div>
      {userData && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Voornaam</th>
                <th>Naam</th>
                <th>Email</th>
                <th>Rol</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user) => (
                <tr key={user.email}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.id && (
                      <ChangeRole
                        currentRole={user.role || undefined}
                        id={user.id}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Gebruikers;
