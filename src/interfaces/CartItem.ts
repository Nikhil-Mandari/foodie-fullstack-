import type { Product } from "./Product";

export interface CartItem extends Omit<Product, "quantity"> {
  quantity: number;
  unit?: string;
}