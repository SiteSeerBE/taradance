import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { getServerSession } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "database",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    // save user.id in session
    async session({ session, user }) {
      session.user.id = user.id;
      const userData = await prisma.user.findUnique({
        where: { id: user.id },
        select: { roles: true },
      });
      if (userData?.roles) {
        session.user.roles = userData.roles.map((item) => item.role);
      }
      return session;
    },
  },
};

//my custom code

/**
 * Returns the userId if the user has one of the given roles.
 * @param {string[]} roles - All roles that have access (optional).
 *
 *  * @example
 * ```typescript
 * const userIdWithAccess = await getUserIdWithAccess(["ADMIN", "WRITER"]);
 * if (!userIdWithAccess) {
 * return NextResponse.json(
 *  { error: "You are not authorized on this route" },
 * { status: 403 }
 * );
 * }
 * ```
 */
const getUserIdWithAccess = async (roles?: string[]) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  if (!roles) {
    return session.user.id as string;
  }
  if (session?.user.roles.some((role: string) => roles.includes(role))) {
    return session.user.id as string;
  }
  return null;
};
const getCurrentServerSession = async (roles?: string[]) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  if (!roles) {
    return session;
  }
  if (session?.user.roles.some((role: string) => roles.includes(role))) {
    return session;
  }
  return null;
};
export { getCurrentServerSession, getUserIdWithAccess };
