import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client/core";

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_HASURA_URL,
      headers: {
        "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET || "",
      },
    }),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
