import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface QuantityButtonProps {
  onClick: () => void;
  icon: ReactNode;
  variant?: "primary" | "secondary";
}

const QuantityButton = ({ onClick, icon, variant = "primary" }: QuantityButtonProps) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.92 }}
      style={{
        width: 38,
        height: 38,
        border: "none",
        borderRadius: "50%",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: variant === "primary" ? "#111827" : "#16a34a",
        background: variant === "primary" ? "linear-gradient(135deg, #fde68a, #f59e0b)" : "#ecfdf5",
        boxShadow: variant === "primary" ? "0 12px 22px rgba(245,158,11,0.22)" : "none",
      }}
    >
      {icon}
    </motion.button>
  );
};

export default QuantityButton;
