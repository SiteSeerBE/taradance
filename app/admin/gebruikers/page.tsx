"use client";

import ChangeRole from "@/components/admin/ChangeRole";
import { User } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import styles from "./page.module.scss";
import classNames from "classnames";

type UserParameters = {
  orderBy: string;
  direction: "asc" | "desc";
};

type OrderByOptions = "firstName" | "lastName" | "email" | "role";

const Gebruikers: React.FC = () => {
  const [userData, setUserData] = useState<Partial<User>[]>();
  const [orderBy, setOrderBy] = useState<OrderByOptions>("role");
  const [direction, setDirection] = useState<"asc" | "desc">("desc");

  const getSortIndicatorClassNames = (column: OrderByOptions) =>
    classNames({
      [styles.sort]: true,
      [styles.asc]: direction === "asc" && orderBy === column,
      [styles.desc]: direction === "desc" && orderBy === column,
    });

  const changeSort = (column: OrderByOptions) => {
    console.log("Column clicked:", column);
    if (orderBy === column) {
      setDirection(direction === "asc" ? "desc" : "asc");
    } else {
      setDirection("asc");
    }
    setOrderBy(column);
  };

  const getUsers = async () => {
    const userParameters: UserParameters = {
      orderBy: orderBy,
      direction: direction,
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
  }, [orderBy, direction]);

  return (
    <>
      <div className="breadcrumb center container-flex">
        <h1>Gebruikers</h1>
      </div>
      {userData && (
        <div className="table-container">
          <table className="striped">
            <thead>
              <tr>
                <th>
                  <a onClick={() => changeSort("firstName")}>
                    Voornaam{" "}
                    <span className={getSortIndicatorClassNames("firstName")}>
                      &#9662;
                    </span>
                  </a>
                </th>
                <th>
                  <a onClick={() => changeSort("lastName")}>
                    Achternaam{" "}
                    <span className={getSortIndicatorClassNames("lastName")}>
                      &#9662;
                    </span>
                  </a>
                </th>
                <th>
                  <a onClick={() => changeSort("email")}>
                    E-mail{" "}
                    <span className={getSortIndicatorClassNames("email")}>
                      &#9662;
                    </span>
                  </a>
                </th>
                <th>
                  <a onClick={() => changeSort("role")}>
                    Rol{" "}
                    <span className={getSortIndicatorClassNames("role")}>
                      &#9662;
                    </span>
                  </a>
                </th>
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
