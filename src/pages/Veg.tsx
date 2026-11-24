import { useContext } from "react";
import { motion } from "framer-motion";
import ProductCard from "../component/ProductCard";
import { storeProducts } from "../component/data/StoreData";
import { CartContext } from "../contextapi/CartContext";

const Veg = () => {
  const { cart, addToCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
  const products = storeProducts.filter((product) => product.veg);

  return (
    <div style={{ minHeight: "100vh", padding: "32px 20px 56px", background: "linear-gradient(180deg, #f8fff9 0%, #eefbf3 48%, #f6f7fb 100%)" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 24 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 999, background: "rgba(34,197,94,0.12)", color: "#15803d", fontWeight: 700, fontSize: 13 }}>
            Fresh veg picks
          </div>
          <h1 style={{ margin: "14px 0 8px", fontSize: "clamp(30px, 4vw, 48px)", color: "#0f172a" }}>Vegetable-first grocery essentials</h1>
          <p style={{ margin: 0, maxWidth: 760, color: "#475569", fontSize: 16, lineHeight: 1.7 }}>
            Browse a premium Blinkit-style assortment of produce, dairy, bakery, pantry, and fresh convenience items built for fast checkout and repeat buying.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 20 }}>
          {products.map((item) => {
            const quantity = cart.find((entry) => entry.id === item.id)?.quantity ?? 0;

            return (
              <ProductCard
                key={item.id}
                product={item}
                quantity={quantity}
                onAdd={() => addToCart(item)}
                onIncrease={() => increaseQuantity(item.id)}
                onDecrease={() => decreaseQuantity(item.id)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Veg;