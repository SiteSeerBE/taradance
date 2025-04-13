"use client";

import { RoleType } from "@prisma/client";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

type ChangeRoleProps = {
  id: string;
  currentRole?: RoleType;
};

const setRole = async (id: string, role: RoleType) => {
  const response = await axios.post("/api/user/changeRole", {
    id,
    role,
  });
  if (response.status !== 200) {
    throw new Error("Error changing role");
  }
  return response.data;
};

const handleRoleChange = async (id: string, role: RoleType) => {
  toast
    .promise(setRole(id, role), {
      loading: "Rol wijzigen",
      success: "Rol gewijzigd naar " + role,
      error: "Rol wijzigen mislukt",
    })
    .catch((error) => {
      console.error("Error changing role:", error);
    });
};

const ChangeRole: React.FC<ChangeRoleProps> = (props) => {
  const [role, setRole] = useState<String | undefined>(props.currentRole);

  return (
    <>
      <details className="dropdown" style={{ marginBottom: 0 }}>
        <summary>{role || "Kies..."}</summary>
        <ul>
          {Object.values(RoleType).map((RoleTypeElement) => (
            <li key={RoleTypeElement}>
              <a
                onClick={(e) => {
                  handleRoleChange(props.id, RoleTypeElement);
                  setRole(RoleTypeElement);
                }}
              >
                {RoleTypeElement}
              </a>
            </li>
          ))}
        </ul>
      </details>
    </>
  );
};

export default ChangeRole;
