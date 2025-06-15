"use client";

import { useCart } from "./CartContext";
import type { MenuItem } from "~/server/api/routers/restaurants";

interface MenuListProps {
  menuItems: MenuItem[];
  restaurantId: string;
}

export function MenuList({ menuItems, restaurantId }: MenuListProps) {
  const { addItem } = useCart();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Menu</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col rounded-lg border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
              {item.description && (
                <p className="mt-2 text-gray-600">{item.description}</p>
              )}
              <p className="mt-2 text-lg font-bold text-gray-900">
                ${item.price.toFixed(2)}
              </p>
            </div>
            <button
              onClick={() => addItem(item)}
              className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 