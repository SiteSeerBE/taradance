import { env } from "process";

export const logtoConfig = {
  endpoint: "https://pohjzp.logto.app/",
  appId: process.env.LOGTO_APP_ID!,
  appSecret: process.env.LOGTO_APP_SECRET!,
  baseUrl: "http://localhost:3000", // Change to your own base URL
  cookieSecret: process.env.LOGTO_COOKIE_SECRET!, // Auto-generated 32 digit secret
  cookieSecure: process.env.NODE_ENV === "production",
};
