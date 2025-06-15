"use client";

import { api } from "~/trpc/react";
import { useParams, useRouter } from "next/navigation";
import slugify from "slugify";
import { type RouterOutputs } from "~/trpc/react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardTitle } from "../../components/ui/card";
import { useCart } from "../../components/CartContext";

export default function RestaurantByNamePage() {
  const params: Record<string, string | string[] | undefined> = useParams();
  const restaurantName = typeof params.restaurantName === "string" ? params.restaurantName : undefined;
  const router = useRouter();
  const { addItem } = useCart();
  if (!restaurantName) {
    return <div>Invalid restaurant name</div>;
  }
  const slug = slugify(restaurantName, { lower: true });
  const { data: restaurant, isLoading } = api.restaurants.getBySlug.useQuery({ slug });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!restaurant) {
    return <div>Restaurant not found</div>;
  }

  type MenuItem = NonNullable<RouterOutputs["restaurants"]["getBySlug"]>["menuItems"][number];

  return (
    <div style={{ padding: 32 }}>
      <Button variant="outline" onClick={() => router.back()} className="mb-4">
        Back
      </Button>
      <h1 className="text-2xl font-bold mb-6">{restaurant.name}</h1>
      {/* Render menu items if needed */}
      {restaurant?.menuItems && (
        <div className="grid gap-4">
          {restaurant.menuItems.map((item: MenuItem) => (
            <Card key={item.id}>
              <CardContent className="flex flex-col gap-2 p-4">
                <CardTitle className="text-lg">{item.name}</CardTitle>
                <div className="text-muted-foreground">{item.description}</div>
                <div className="font-semibold">${item.price.toFixed(2)}</div>
                <Button size="sm" className="self-end" onClick={() => addItem({ menuItemId: item.id, name: item.name, price: item.price })}>
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 