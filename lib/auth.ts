import { logtoConfig } from "@/lib/logto";
import { getLogtoContext } from "@logto/next/server-actions";
import { prisma } from "./prisma";
import { RoleType } from "@prisma/client";

const getLogtoId = async () => {
  if (process.env.BACKDOOR_ROLE) {
    return process.env.BACKDOOR_ROLE === "ADMIN" ? process.env.ADMIN_LOGTO_ID : process.env.DANSER_LOGTO_ID;
  }
  const { isAuthenticated, claims } = await getLogtoContext(logtoConfig);
  if (!isAuthenticated || !claims) {
    return null;
  }
  return claims?.sub;
};

const getUserIdForRole = async (role: RoleType[]) => {
  if (process.env.BACKDOOR_ROLE) {
    return process.env.BACKDOOR_ROLE === "ADMIN" ? process.env.ADMIN_USER_ID : process.env.DANSER_USER_ID;
  }
  const { isAuthenticated, claims } = await getLogtoContext(logtoConfig);
  if (!isAuthenticated || !claims) {
    return null;
  }
  const logtoId = claims?.sub;
  const user = await prisma.user.findUnique({
    where: {
      logtoId,
    },
    select: {
      id: true,
      role: true,
    },
  });
  if (user?.role && role.includes(user.role)) {
    return user.id;
  }
  return null;
};

const getUserCredentials = async () => {
  if (process.env.BACKDOOR_ROLE) {
    return {
      id: process.env.BACKROOR_ROLE == "ADMIN" ? process.env.ADMIN_USER_ID : process.env.DANSER_USER_ID,
      email: "backdoor@taradance.be",
      firstName: "Iwan",
      lastName: "Lemmens",
      role: process.env.BACKDOOR_ROLE,
    };
  }
  const { isAuthenticated, claims } = await getLogtoContext(logtoConfig);
  if (!isAuthenticated || !claims) {
    return null;
  }
  const logtoId = claims?.sub;
  const user = await prisma.user.findUnique({
    where: {
      logtoId,
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
    },
  });
  if (user) {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    };
  }
  return null;
};

export { getLogtoId, getUserIdForRole, getUserCredentials };
