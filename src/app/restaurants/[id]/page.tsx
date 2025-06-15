"use client";

import { api } from "~/trpc/react";
import { useParams } from "next/navigation";
import { CartProvider } from "~/app/_components/CartContext";
import { MenuList } from "~/app/_components/MenuList";
import { CartSidebar } from "~/app/_components/CartSidebar";

export default function RestaurantPage() {
  const { id } = useParams();
  const { data: restaurant, isLoading } = api.restaurants.getById.useQuery({
    id: id as string,
  });

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-xl">Restaurant not found</div>
      </div>
    );
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Restaurant Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">{restaurant.name}</h1>
            {restaurant.description && (
              <p className="mt-2 text-gray-600">{restaurant.description}</p>
            )}
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Menu Section */}
            <div className="lg:col-span-2">
              <MenuList menuItems={restaurant.menuItems} restaurantId={restaurant.id} />
            </div>

            {/* Cart Sidebar */}
            <div className="lg:col-span-1">
              <CartSidebar />
            </div>
          </div>
        </div>
      </div>
    </CartProvider>
  );
} 