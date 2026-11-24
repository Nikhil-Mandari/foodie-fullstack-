export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  originalPrice: number;
  rating: number;
  reviews: number;
  deliveryTime: string;
  stock: number;
  discount: number;
  weight: string;
  badge: string;
  veg: boolean;
  quantity?: string;
  availability?: string;
  gallery?: string[];
}