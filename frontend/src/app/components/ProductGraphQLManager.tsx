"use client";

import { useSubscription } from "@apollo/client/react";
import { gql } from "@apollo/client/core";
import { Product } from "../../generated/graphql.js"

const SUBSCRIBE_PRODUCTS = gql`
  subscription SubscribeProducts {
    product {
      id
      name
      comment
      quantity
      company_id
      company {
        name
      }
    }
  }
`;

export default function ProductGraphQLManager() {
  const { loading, error, data } = useSubscription<{ product: Product[] }>(SUBSCRIBE_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4 border-t mt-8">
      <h1 className="text-xl font-bold mb-4">Product Manager (GraphQL - Subscription)</h1>
      <ul>
        {data && data.product.map((product: Product) => (
          <li key={product.id} className="mb-2 flex items-center">
            <div className="flex-1">
              <span className="font-bold">{product.name}</span> - {product.comment} (
              {product.quantity}) from {product.company?.name || 'Unknown'} ({product.company_id})
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
