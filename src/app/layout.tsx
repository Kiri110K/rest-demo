import "~/styles/globals.css";
import { TRPCReactProvider } from "~/trpc/react";
import { CartProvider } from "../components/CartContext";
import CartSidebar from "../components/CartSidebar";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <CartSidebar />
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </CartProvider>
      </body>
    </html>
  );
}
