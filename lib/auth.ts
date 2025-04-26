import { logtoConfig } from "@/lib/logto";
import { getLogtoContext } from "@logto/next/server-actions";
import { prisma } from "./prisma";
import { RoleType } from "@prisma/client";

const getLogtoId = async () => {
  if (process.env.BACKDOOR) {
    return "8fb1z23mh6bw";
  }
  const { isAuthenticated, claims } = await getLogtoContext(logtoConfig);
  if (!isAuthenticated || !claims) {
    return null;
  }
  return claims?.sub;
};

const getUserIdForRole = async (role: RoleType[]) => {
  if (process.env.BACKDOOR) {
    return "cm9g0nh4m0002fsc2jcw6cr6s";
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
  if (process.env.BACKDOOR) {
    return {
      id: "cm9g0nh4m0002fsc2jcw6cr6s",
      email: "backdoor@taradance.be",
      firstName: "Iwan",
      lastName: "Lemmens",
      role: "ADMIN",
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
