import { UserScope } from "@logto/next";

export const logtoConfig = {
  endpoint: "https://cfb8d8.logto.app/",
  appId: "bf1osk635o2oowzxrru9x",
  appSecret: "iRkP4603sx644ERiovOQTyFNLKhiBNn2",
  baseUrl: "http://localhost:3000", // Change to your own base URL
  cookieSecret: "UpE1GuqYKxoIMsZVQUt48OvCvycuYYDu", // Auto-generated 32 digit secret
  cookieSecure: process.env.NODE_ENV === "production",
  scopes: [UserScope.Roles],
};
