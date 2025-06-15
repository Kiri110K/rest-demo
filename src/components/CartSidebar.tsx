"use client";

import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "./ui/sheet";
import { Button } from "./ui/button";
import { Card, CardContent, CardTitle } from "./ui/card";
import { useCart } from "./CartContext";
import { ShoppingCart } from "lucide-react";

export default function CartSidebar() {
  const { items, removeItem, clearCart } = useCart();
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="fixed top-4 right-4 z-50 flex items-center gap-2 shadow-md"
          size="icon"
          aria-label="Open cart"
        >
          <ShoppingCart className="w-5 h-5" />
          {items.length > 0 && (
            <span className="ml-1 text-xs font-bold">{items.length}</span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 mt-4 flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="text-muted-foreground text-center mt-8">Cart is empty</div>
          ) : (
            items.map((item) => (
              <Card key={item.menuItemId} className="p-2">
                <CardContent className="flex flex-col gap-1 p-2">
                  <CardTitle className="text-base">{item.name}</CardTitle>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Qty: {item.qty}</span>
                    <span className="font-semibold">${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                  <Button size="sm" variant="destructive" onClick={() => removeItem(item.menuItemId)}>
                    Remove
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>
        <SheetFooter>
          <div className="flex flex-col w-full gap-2">
            <div className="flex items-center justify-between text-lg font-bold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Button className="w-full" disabled={items.length === 0} onClick={() => { clearCart(); alert("Checkout coming soon!"); }}>
              Checkout
            </Button>
            <Button className="w-full" variant="outline" disabled={items.length === 0} onClick={clearCart}>
              Clear Cart
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
} 