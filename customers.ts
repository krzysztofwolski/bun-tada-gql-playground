import { graphql } from "gql.tada";
import { appGqlClient } from "./src/createGqlClient";
import { pprint } from "./src/pprint";

const customersArray: {
  id: string;
  isStaff: boolean;
  firstName: string;
  lastName: string;
  email: string;
  metadata: {
    key: string;
    value: string;
  }[];
}[] = [];

console.log(`>>> ${new Date().toUTCString()}`);

const customersQuery = graphql(`
  query GetAllCustomers($first: Int = 2, $after: String) {
    customers(first: $first, after: $after) {
      totalCount
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          isStaff
          firstName
          lastName
          email
          metadata {
            key
            value
          }
        }
      }
    }
  }
`);

const resp = await appGqlClient.query(customersQuery, {});

resp.data?.customers?.edges.forEach((edge) => {
  customersArray.push({
    id: edge.node.id,
    isStaff: edge.node.isStaff,
    firstName: edge.node.firstName,
    lastName: edge.node.lastName,
    email: edge.node.email,
    metadata: edge.node.metadata,
  });
});

let hasNextPage = resp.data?.customers?.pageInfo.hasNextPage;
let after = resp.data?.customers?.pageInfo.endCursor;

while (hasNextPage) {
  console.log(
    `Fetching next page with cursor: ${after}. Already fetched: ${customersArray.length} out of ${resp.data?.customers?.totalCount}.`,
  );
  const nextResp = await appGqlClient.query(customersQuery, {
    after,
  });

  resp.data?.customers?.edges.forEach((edge) => {
    customersArray.push({
      id: edge.node.id,
      isStaff: edge.node.isStaff,
      firstName: edge.node.firstName,
      lastName: edge.node.lastName,
      email: edge.node.email,
      metadata: edge.node.metadata,
    });
  });

  hasNextPage = nextResp.data?.customers?.pageInfo.hasNextPage;
  after = nextResp.data?.customers?.pageInfo.endCursor;
}

console.log("Finished fetching all pages.");

pprint(customersArray);
