import { useContext } from "react";
import { motion } from "framer-motion";
import { FiPackage } from "react-icons/fi";
import { OrderContext } from "../contextapi/OrderContext";
import Sidebar from "../component/Sidebar";
import OrderCard from "../component/OrderCard";

const Orders = () => {
  const { orders } = useContext(OrderContext);

  return (
    <div
      style={{
        background: "linear-gradient(180deg, #f8fafc, #eefbf3)",
        minHeight: "100vh",
        padding: "28px 18px 48px",
      }}
    >
      <div
        style={{
          maxWidth: "1440px",
          margin: "auto",
          display: "grid",
          gridTemplateColumns: "300px 1fr",
          gap: "24px",
          alignItems: "start",
        }}
      >
        <Sidebar />

        <div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ background: "linear-gradient(135deg, #111827, #1f2937)", color: "white", borderRadius: 28, padding: 24, marginBottom: 22, boxShadow: "0 24px 50px rgba(15,23,42,0.16)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <div style={{ width: 46, height: 46, borderRadius: 16, background: "linear-gradient(135deg, #fde68a, #f59e0b)", color: "#111827", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FiPackage />
              </div>
              <div>
                <div style={{ color: "rgba(255,255,255,0.72)", fontSize: 13, fontWeight: 700 }}>Order center</div>
                <h1 style={{ margin: 0, fontSize: 34 }}>My Orders</h1>
              </div>
            </div>
            <p style={{ margin: 0, color: "rgba(255,255,255,0.8)", maxWidth: 720, lineHeight: 1.7 }}>Track packed, out for delivery, and delivered orders with an updated, premium summary view.</p>
          </motion.div>

          {orders.length === 0 ? (
            <div
              style={{
                background: "white",
                padding: "60px 24px",
                borderRadius: "24px",
                textAlign: "center",
                boxShadow: "0 18px 40px rgba(15,23,42,.08)",
                border: "1px solid rgba(15,23,42,0.06)",
              }}
            >
              <h2 style={{ marginBottom: 8, color: "#0f172a" }}>No Orders Found</h2>

              <p
                style={{
                  color: "#64748b",
                  lineHeight: 1.7,
                }}
              >
                Place your first order to see it here.
              </p>
            </div>
          ) : (
            orders.map((order) => <OrderCard key={order.orderNumber} order={order} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;