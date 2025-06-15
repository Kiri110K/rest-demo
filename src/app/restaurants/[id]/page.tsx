"use client";

import { api } from "~/trpc/react";
import type { RouterOutputs } from "~/trpc/react";
import { useParams } from "next/navigation";
import { useState } from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

type RestaurantWithMenu = RouterOutputs["restaurants"]["getById"];

export default function RestaurantPage() {
  const params = useParams();
  const [cart, setCart] = useState<CartItem[]>([]);
  const { data: restaurant } = api.restaurants.getById.useQuery({
    id: params.id as string,
  });

  if (!restaurant) return <div>Loading...</div>;

  const addToCart = (menuItem: RestaurantWithMenu["menuItems"][number]) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === menuItem.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevCart, { ...menuItem, quantity: 1 }];
    });
  };

  const removeFromCart = (menuItemId: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.id !== menuItemId),
    );
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">{restaurant.name}</h1>
      
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Menu</h2>
          <div className="space-y-4">
            {restaurant.menuItems.map((item) => (
              <div
                key={item.id}
                className="rounded-lg border p-4 shadow-sm"
              >
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-gray-600">{item.description}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-lg font-bold">
                    ${item.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => addToCart(item)}
                    className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-2xl font-semibold">Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <div className="mt-4 border-t pt-4">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => alert("Checkout functionality coming soon!")}
                  className="mt-4 w-full rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                >
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 