import { motion } from "framer-motion";
import { FiHeart, FiMinus, FiPlus, FiShoppingBag, FiStar, FiTruck } from "react-icons/fi";
import type { Product } from "../interfaces/Product";
import QuantityButton from "./QuantityButton";

interface ProductCardProps {
  product: Product;
  quantity: number;
  onAdd: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
}

const ProductCard = ({ product, quantity, onAdd, onIncrease, onDecrease }: ProductCardProps) => {
  const isAdded = quantity > 0;
  const discountLabel = `${product.discount}% OFF`;
  const stockLabel = product.stock > 20 ? `${product.stock} left` : `Only ${product.stock} left`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -6, scale: 1.02 }}
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(248,250,252,0.98))",
        borderRadius: 28,
        padding: 16,
        boxShadow: "0 22px 40px rgba(15, 23, 42, 0.08)",
        border: "1px solid rgba(15,23,42,0.06)",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        overflow: "hidden",
      }}
    >
      <div style={{ position: "relative" }}>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          style={{ width: "100%", height: 190, objectFit: "cover", borderRadius: 20 }}
        />
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            background: "rgba(255,255,255,0.96)",
            color: product.veg ? "#16a34a" : "#dc2626",
            padding: "7px 11px",
            borderRadius: 999,
            fontSize: 11,
            fontWeight: 700,
            boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: product.veg ? "#16a34a" : "#dc2626" }} />
          {product.badge}
        </div>
        <button type="button" style={{ position: "absolute", top: 10, right: 10, width: 36, height: 36, borderRadius: "50%", border: "none", background: "rgba(255,255,255,0.96)", color: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 8px 20px rgba(0,0,0,0.08)" }} aria-label="Add to wishlist">
          <FiHeart size={16} />
        </button>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#f59e0b", fontWeight: 800 }}>
          <FiStar />
          <span style={{ fontSize: 13 }}>{product.rating.toFixed(1)}</span>
          <span style={{ color: "#64748b", fontSize: 12, fontWeight: 600 }}>({product.reviews})</span>
        </div>
        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: product.stock > 0 ? "#16a34a" : "#ca8a04",
            background: product.stock > 0 ? "rgba(22,163,74,0.12)" : "rgba(202,138,4,0.12)",
            padding: "5px 8px",
            borderRadius: 999,
          }}
        >
          {stockLabel}
        </span>
      </div>

      <div>
        <h3 style={{ margin: 0, fontSize: 18, color: "#111827", lineHeight: 1.3 }}>{product.name}</h3>
        <p style={{ margin: "6px 0 0", color: "#64748b", fontSize: 13, lineHeight: 1.55 }}>{product.description}</p>
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <span style={{ padding: "6px 10px", borderRadius: 999, background: "#fff7ed", color: "#c2410c", fontSize: 12, fontWeight: 700 }}>
          {discountLabel}
        </span>
        <span style={{ padding: "6px 10px", borderRadius: 999, background: "#ecfeff", color: "#0f766e", fontSize: 12, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 6 }}>
          <FiTruck size={12} /> {product.deliveryTime}
        </span>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 12, color: "#64748b" }}>{product.weight}</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: "#0f172a" }}>₹{product.price}</div>
            <div style={{ fontSize: 13, color: "#94a3b8", textDecoration: "line-through" }}>₹{product.originalPrice}</div>
          </div>
        </div>

        {isAdded ? (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <QuantityButton onClick={onDecrease} icon={<FiMinus />} variant="secondary" />
            <span style={{ minWidth: 26, textAlign: "center", fontWeight: 800, color: "#16a34a" }}>{quantity}</span>
            <QuantityButton onClick={onIncrease} icon={<FiPlus />} variant="primary" />
          </div>
        ) : (
          <motion.button
            onClick={onAdd}
            whileTap={{ scale: 0.95 }}
            style={{
              border: "none",
              background: "linear-gradient(135deg, #fde68a, #f59e0b)",
              color: "#111827",
              borderRadius: 16,
              padding: "11px 14px",
              fontWeight: 900,
              cursor: "pointer",
              boxShadow: "0 12px 24px rgba(245, 158, 11, 0.22)",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <FiShoppingBag />
            Add
          </motion.button>
        )}
      </div>
    </motion.article>
  );
};

export default ProductCard;
