import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCheckCircle, FiPackage } from "react-icons/fi";

const OrderSuccess = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
        background: "linear-gradient(180deg, #f8fafc, #eefbf3)",
      }}
    >
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ background: "white", padding: 40, borderRadius: 30, boxShadow: "0 24px 50px rgba(15,23,42,0.1)", textAlign: "center", border: "1px solid rgba(15,23,42,0.06)", maxWidth: 520, width: "100%" }}>
        <div style={{ width: 96, height: 96, borderRadius: "50%", background: "linear-gradient(135deg, #d1fae5, #22c55e)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px", color: "#166534" }}>
          <FiCheckCircle size={44} />
        </div>
        <h1 style={{ margin: 0, color: "#0f172a", fontSize: 32 }}>Order placed successfully</h1>
        <p style={{ color: "#64748b", lineHeight: 1.7, margin: "12px 0 0" }}>Thank you for ordering with FreshCart. Your items are being packed now and will move to delivery shortly.</p>
        <div style={{ marginTop: 18, padding: 16, borderRadius: 22, background: "#f8fafc", color: "#334155", display: "inline-flex", alignItems: "center", gap: 10 }}>
          <FiPackage /> Live tracking is available in your orders page
        </div>
        <div style={{ marginTop: 24 }}>
          <Link to="/orders" style={{ textDecoration: "none", background: "linear-gradient(135deg, #fde68a, #f59e0b)", color: "#111827", padding: "13px 22px", borderRadius: 16, display: "inline-flex", alignItems: "center", fontWeight: 900 }}>
            View My Orders
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;