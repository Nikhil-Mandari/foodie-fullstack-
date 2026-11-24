import { useEffect, useMemo, type ReactNode } from "react";
import { toast } from "react-toastify";
import { useImmer } from "use-immer";
import { CartContext } from "./CartContext";
import { addToCart, clearCart, decreaseQuantity, increaseQuantity, removeFromCart } from "./CartActions";
import type { CartItem } from "../interfaces/CartItem";
import type { Product } from "../interfaces/Product";

interface CartProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = "food-express-cart";

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useImmer<CartItem[]>(() => {
    if (typeof window === "undefined") return [];

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    try {
      return JSON.parse(stored) as CartItem[];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    }
  }, [cart]);

  const value = useMemo(
    () => ({
      cart,
      addToCart: (product: Product) =>
        setCart((draft) => {
          addToCart(draft, product);
          toast.success(`Added ${product.name} to cart`);
        }),
      removeFromCart: (id: number) =>
        setCart((draft) => {
          removeFromCart(draft, id);
          toast.info("Removed from cart");
        }),
      increaseQuantity: (id: number) =>
        setCart((draft) => {
          increaseQuantity(draft, id);
          toast.success("Quantity updated");
        }),
      decreaseQuantity: (id: number) =>
        setCart((draft) => {
          decreaseQuantity(draft, id);
          toast.info("Quantity updated");
        }),
      clearCart: () =>
        setCart((draft) => {
          clearCart(draft);
          toast.success("Cart cleared");
        }),
    }),
    [cart, setCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}