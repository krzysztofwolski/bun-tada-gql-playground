import { graphql } from "gql.tada";
import { unauthenticatedGqlClient } from "./src/createGqlClient";
import { pprint } from "./src/pprint";

console.log(`>>> ${new Date().toUTCString()}`);

const resp = await unauthenticatedGqlClient.query(
  graphql(`
    {
      shop {
        domain {
          host
        }
      }
    }
  `),
  {},
);

pprint(resp.data);
