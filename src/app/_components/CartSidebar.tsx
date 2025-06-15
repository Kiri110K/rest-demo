"use client";

import { useCart } from "./CartContext";

export function CartSidebar() {
  const { items, removeItem, updateQuantity, total } = useCart();

  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">Your Cart</h2>
      {items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-start justify-between border-b pb-4"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-600">
                  ${item.price.toFixed(2)} each
                </p>
                <div className="mt-2 flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="rounded-md border px-2 py-1 text-sm hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="text-sm">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="rounded-md border px-2 py-1 text-sm hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="ml-4 flex flex-col items-end">
                <p className="font-semibold text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeItem(item.id)}
                  className="mt-2 text-sm text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              onClick={() => alert("Checkout functionality coming soon!")}
              className="mt-4 w-full rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 