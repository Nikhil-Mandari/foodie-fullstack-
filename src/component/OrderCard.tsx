import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiClock, FiPackage, FiTruck } from "react-icons/fi";
import type { Order } from "../interfaces/Order";

interface Props {
  order: Order;
}

const OrderCard = ({ order }: Props) => {
  const statusColor = order.status.toLowerCase().includes("deliver") ? "#16a34a" : order.status.toLowerCase().includes("pack") ? "#f59e0b" : "#2563eb";

  return (
    <Link
      to={`/orders/${order.orderNumber}`}
      style={{
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <motion.div
        whileHover={{ y: -4 }}
        style={{
          background: "white",
          borderRadius: "24px",
          padding: "22px",
          marginBottom: "18px",
          boxShadow: "0 18px 40px rgba(15,23,42,.08)",
          border: "1px solid rgba(15,23,42,0.06)",
          cursor: "pointer",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", gap: 14, flexWrap: "wrap" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 999, background: `${statusColor}14`, color: statusColor, fontWeight: 900, fontSize: 13 }}>
              <FiPackage /> {order.status}
            </div>

            <p style={{ color: "#64748b", marginTop: 10, display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
              <FiClock /> {order.orderDate}
            </p>
          </div>

          <h2 style={{ color: "#16a34a", margin: 0 }}>
            ₹{order.finalAmount}
          </h2>
        </div>

        <div style={{ height: 1, background: "#e2e8f0", margin: "18px 0" }} />

        <h3 style={{ margin: 0, color: "#0f172a" }}>
          Order #{order.orderNumber}
        </h3>

        <p style={{ color: "#475569", lineHeight: 1.6, margin: "10px 0 0" }}>
          {order.items.slice(0, 3).map((item) => item.name).join(", ")}
        </p>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 18, gap: 12 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#475569", fontWeight: 700 }}>
            <FiTruck /> {order.items.length} Items
          </span>

          <span style={{ color: "#16a34a", fontWeight: 900, display: "inline-flex", alignItems: "center", gap: 8 }}>
            View Details →
          </span>
        </div>
      </motion.div>
    </Link>
  );
};

export default OrderCard;