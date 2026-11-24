import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiCheckCircle, FiClock, FiMapPin, FiPackage, FiPhone, FiUser } from "react-icons/fi";
import { OrderContext } from "../contextapi/OrderContext";

const OrderDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { orders } = useContext(OrderContext);

  const order = orders.find(
    (o) => o.orderNumber.toString() === id
  );

  if (!order) {
    return (
      <div
        style={{
          padding: "50px",
          textAlign: "center",
        }}
      >
        <h2>Order Not Found</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "linear-gradient(180deg, #f8fafc, #eefbf3)",
        minHeight: "100vh",
        padding: "28px 18px 50px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "auto",
          background: "white",
          borderRadius: "28px",
          padding: "28px",
          boxShadow: "0 24px 50px rgba(15,23,42,.08)",
          border: "1px solid rgba(15,23,42,0.06)",
        }}
      >
        <motion.button onClick={() => navigate(-1)} whileTap={{ scale: 0.98 }} style={{ padding: "12px 16px", border: "1px solid #e2e8f0", borderRadius: 14, cursor: "pointer", background: "white", color: "#0f172a", marginBottom: 22, fontWeight: 800, display: "inline-flex", alignItems: "center", gap: 8 }}>
          <FiArrowLeft /> Back
        </motion.button>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: 16, flexWrap: "wrap", marginBottom: 18 }}>
          <div>
            <div style={{ color: "#16a34a", fontWeight: 900, fontSize: 13 }}>Order summary</div>
            <h1 style={{ margin: "8px 0 6px", color: "#0f172a" }}>Order #{order.orderNumber}</h1>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 999, background: "#ecfdf5", color: "#166534", fontWeight: 900 }}>
              <FiCheckCircle /> {order.status}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "#64748b", fontSize: 13 }}>Total amount</div>
            <div style={{ color: "#16a34a", fontSize: 34, fontWeight: 900 }}>₹{order.finalAmount}</div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.2fr) minmax(300px,0.8fr)", gap: 20 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <section style={{ padding: 18, borderRadius: 24, background: "#f8fafc", border: "1px solid #e2e8f0" }}>
              <h2 style={{ marginTop: 0, color: "#0f172a" }}>Items</h2>
              <div style={{ display: "grid", gap: 12 }}>
                {order.items.map((item) => (
                  <div key={item.id} style={{ display: "flex", justifyContent: "space-between", gap: 14, padding: 14, borderRadius: 18, background: "white", border: "1px solid #e2e8f0" }}>
                    <div style={{ display: "flex", gap: 12 }}>
                      <img src={item.image} alt={item.name} loading="lazy" style={{ width: 62, height: 62, objectFit: "cover", borderRadius: 16 }} />
                      <div>
                        <h3 style={{ margin: 0, color: "#0f172a" }}>{item.name}</h3>
                        <p style={{ margin: "6px 0 0", color: "#64748b" }}>Qty: {item.quantity} • {item.weight}</p>
                      </div>
                    </div>
                    <strong style={{ color: "#0f172a" }}>₹{item.price * item.quantity}</strong>
                  </div>
                ))}
              </div>
            </section>

            <section style={{ padding: 18, borderRadius: 24, background: "#f8fafc", border: "1px solid #e2e8f0" }}>
              <h2 style={{ marginTop: 0, color: "#0f172a" }}>Bill details</h2>
              <div style={{ display: "grid", gap: 10, color: "#334155" }}>
                <BillRow label="Items Total" value={order.grandTotal} />
                <BillRow label="Discount" value={-order.discount} />
                <BillRow label="Final Amount" value={order.finalAmount} emphasis />
              </div>
            </section>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <section style={{ padding: 18, borderRadius: 24, background: "#111827", color: "white" }}>
              <h2 style={{ marginTop: 0 }}>Customer details</h2>
              <div style={{ display: "grid", gap: 12, color: "rgba(255,255,255,0.9)" }}>
                <InfoRow icon={<FiUser />} text={order.customerName} />
                <InfoRow icon={<FiPhone />} text={order.mobile} />
                <InfoRow icon={<FiMapPin />} text={order.address} />
                <InfoRow icon={<FiPackage />} text={order.paymentMode} />
              </div>
            </section>

            <section style={{ padding: 18, borderRadius: 24, background: "#ffffff", border: "1px solid #e2e8f0" }}>
              <h2 style={{ marginTop: 0, color: "#0f172a" }}>Order timeline</h2>
              <div style={{ display: "grid", gap: 14 }}>
                {[
                  "Order Placed",
                  "Packed",
                  "Out for Delivery",
                  "Delivered",
                ].map((step, index) => (
                  <div key={step} style={{ display: "flex", alignItems: "center", gap: 12, color: index === 3 ? "#16a34a" : "#334155" }}>
                    <div style={{ width: 34, height: 34, borderRadius: "50%", background: index <= 3 ? "#ecfdf5" : "#f8fafc", color: index <= 3 ? "#16a34a" : "#94a3b8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <FiClock />
                    </div>
                    <div>
                      <div style={{ fontWeight: 900 }}>{step}</div>
                      <div style={{ color: "#64748b", fontSize: 13 }}>{index === 3 ? "Completed" : "In progress"}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

const BillRow = ({ label, value, emphasis = false }: { label: string; value: number; emphasis?: boolean }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: emphasis ? 18 : 14, fontWeight: emphasis ? 900 : 700 }}>
    <span>{label}</span>
    <span style={{ color: value < 0 ? "#dc2626" : emphasis ? "#16a34a" : "#0f172a" }}>{value < 0 ? `-₹${Math.abs(value)}` : `₹${value}`}</span>
  </div>
);

const InfoRow = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
    <span>{icon}</span>
    <span>{text}</span>
  </div>
);

export default OrderDetails;