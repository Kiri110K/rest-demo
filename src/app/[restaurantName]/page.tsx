"use client";

import { api } from "~/trpc/react";
import { useParams, useRouter } from "next/navigation";
import slugify from "slugify";
import { type RouterOutputs } from "~/trpc/react";

export default function RestaurantByNamePage() {
  const { restaurantName } = useParams<{ restaurantName: string }>();
  const router = useRouter();
  if (!restaurantName || typeof restaurantName !== "string") {
    return <div>Invalid restaurant name</div>;
  }
  const slug = slugify(restaurantName, { lower: true });
  const { data: restaurant, isLoading } = api.restaurants.getBySlug.useQuery({ slug }) as {
    data: RouterOutputs["restaurants"]["getBySlug"];
    isLoading: boolean;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!restaurant) {
    return <div>Restaurant not found</div>;
  }

  type MenuItem = NonNullable<RouterOutputs["restaurants"]["getBySlug"]>["menuItems"][number];

  return (
    <div style={{ padding: 32 }}>
      <button onClick={() => router.back()} style={{ marginBottom: 16 }}>
        Back
      </button>
      <h1>{restaurant.name}</h1>
      {/* Render menu items if needed */}
      {restaurant.menuItems && (
        <ul>
          {restaurant.menuItems.map((item: MenuItem) => (
            <li key={item.id}>{item.name} - {item.price}</li>
          ))}
        </ul>
      )}
    </div>
  );
} 