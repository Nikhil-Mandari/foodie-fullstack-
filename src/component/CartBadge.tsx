import { AnimatePresence, motion } from "framer-motion";
import { FiShoppingCart } from "react-icons/fi";

interface CartBadgeProps {
  count: number;
  onClick: () => void;
}

const CartBadge = ({ count, onClick }: CartBadgeProps) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      style={{
        border: "none",
        background: "linear-gradient(135deg, #22c55e, #16a34a)",
        color: "white",
        borderRadius: 999,
        padding: "10px 16px",
        display: "flex",
        alignItems: "center",
        gap: 8,
        cursor: "pointer",
        boxShadow: "0 10px 24px rgba(22,163,74,0.25)",
        fontWeight: 700,
      }}
    >
      <FiShoppingCart />
      <span>Cart</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={count}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          transition={{ type: "spring", stiffness: 500, damping: 20 }}
          style={{
            minWidth: 24,
            height: 24,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.2)",
            fontSize: 12,
            padding: "0 6px",
          }}
        >
          {count}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
};

export default CartBadge;
