import { Client, fetchExchange } from "@urql/core";
import { authExchange } from "@urql/exchange-auth";

// Basic validation for the GRAPHQL_API_URL env variable
const getGraphqlApiUrl = () => {
  const fromEnv = process.env.GRAPHQL_API_URL;
  if (!fromEnv) {
    throw new Error("GRAPHQL_API_URL is not set - check your .env file");
  }
  if (fromEnv.charAt(fromEnv.length - 1) != "/") {
    console.warn(
      "GRAPHQL_API_URL is not ending with a slash - this might cause issues",
    );
  }
  const url = new URL(fromEnv);
  return url.toString();
};

const getAppToken = () => {
  const fromEnv = process.env.APP_TOKEN;
  if (!fromEnv) {
    throw new Error("APP_TOKEN is not set - check your .env file");
  }
  return fromEnv;
};

const createClient = (token?: string) => {
  return new Client({
    url: getGraphqlApiUrl(),
    requestPolicy: "network-only",
    exchanges: [
      authExchange(async (utils) => {
        return {
          async refreshAuth() {},
          didAuthError(error, _operation) {
            return error.graphQLErrors.some(
              (e) => e.extensions?.code === "FORBIDDEN",
            );
          },
          addAuthToOperation(operation) {
            if (!token) return operation;
            return utils.appendHeaders(operation, {
              Authorization: `Bearer ${token}`,
            });
          },
        };
      }),
      fetchExchange,
    ],
  });
};

export const unauthenticatedGqlClient = createClient();
export const appGqlClient = createClient(getAppToken());
