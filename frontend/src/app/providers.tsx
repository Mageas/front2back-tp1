"use client";

import { ApolloProvider } from "@apollo/client/react";
import createApolloClient from "../helpers/apolloClient";

export function Providers({ children }: { children: React.ReactNode }) {
  const client = createApolloClient();

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
