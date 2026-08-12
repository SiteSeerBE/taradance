import { createMollieClient, type MollieClient } from "@mollie/api-client";

// Lazily instantiated so importing this module never throws — Vercel
// collects page/route data at build time (before env vars like
// MOLLIE_API_KEY are necessarily available), and createMollieClient throws
// immediately if apiKey is undefined.
let client: MollieClient | null = null;

export const getMollieClient = (): MollieClient => {
  if (!client) {
    const apiKey = process.env.MOLLIE_API_KEY;
    if (!apiKey) {
      throw new Error("MOLLIE_API_KEY is not set");
    }
    client = createMollieClient({ apiKey });
  }
  return client;
};
