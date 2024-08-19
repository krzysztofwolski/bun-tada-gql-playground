import { graphql } from "gql.tada";
import { appGqlClient } from "./src/createGqlClient";
import { pprint } from "./src/pprint";

console.log(`>>> ${new Date().toUTCString()}`);

const warehousesResp = await appGqlClient.query(
  graphql(`
    query warehouses {
      warehouses(first: 100) {
        totalCount
        edges {
          node {
            id
            name
            slug
            shippingZones(first: 100) {
              edges {
                node {
                  id
                  name
                }
              }
            }
            isPrivate
            address {
              city
              cityArea
              country {
                code
              }
              countryArea
              firstName
              lastName
              phone
              postalCode
              streetAddress1
              streetAddress2
            }
            clickAndCollectOption
          }
        }
      }
    }
  `),
  {},
);

pprint(warehousesResp.data);
