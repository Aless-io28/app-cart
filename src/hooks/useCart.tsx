import { useContext } from "react";
import { ProductsCartContext } from "../context/productsCart.tsx";

export function useCart() {
  const context = useContext(ProductsCartContext);

  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
