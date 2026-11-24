import { motion } from "framer-motion";
import { FiShoppingBag, FiArrowRight } from "react-icons/fi";

interface EmptyCartProps {
  onContinue: () => void;
}

const EmptyCart = ({ onContinue }: EmptyCartProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        textAlign: "center",
        padding: "42px 18px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        minHeight: 360,
      }}
    >
      <div
        style={{
          width: 108,
          height: 108,
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(34,197,94,0.12), rgba(245,158,11,0.12))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#16a34a",
          boxShadow: "inset 0 0 0 10px rgba(255,255,255,0.65)",
        }}
      >
        <FiShoppingBag size={42} />
      </div>
      <h3 style={{ margin: 0, fontSize: 22, color: "#111827" }}>Your cart is empty</h3>
      <p style={{ color: "#64748b", maxWidth: 280, lineHeight: 1.6 }}>Add fresh essentials, meals, and daily groceries to unlock a faster checkout flow.</p>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onContinue}
        style={{
          marginTop: 8,
          background: "linear-gradient(135deg, #fde68a, #f59e0b)",
          color: "#111827",
          border: "none",
          borderRadius: 16,
          padding: "12px 18px",
          fontWeight: 900,
          cursor: "pointer",
          boxShadow: "0 14px 28px rgba(245,158,11,0.22)",
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        Continue Shopping
        <FiArrowRight />
      </motion.button>
    </motion.div>
  );
};

export default EmptyCart;
