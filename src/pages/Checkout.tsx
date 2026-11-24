import { useContext, useMemo, useState } from "react";
import { motion } from "framer-motion";
import QRCode from "react-qr-code";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FiCreditCard, FiHome, FiInfo, FiPackage, FiPhone, FiShield, FiTruck, FiUser } from "react-icons/fi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../contextapi/CartContext";
import { OrderContext } from "../contextapi/OrderContext";
import { sendOrderEmail } from "../services/EmailService";
import { getAddressFromLocation } from "../services/LocationApi";

const paymentMethods = [
  { label: "UPI", value: "UPI", icon: FiCreditCard, accent: "#16a34a" },
  { label: "Card", value: "Card", icon: FiCreditCard, accent: "#2563eb" },
  { label: "Cash on Delivery", value: "Cash On Delivery", icon: FiHome, accent: "#f97316" },
  { label: "Wallet", value: "Wallet", icon: FiPackage, accent: "#7c3aed" },
  { label: "Net Banking", value: "Net Banking", icon: FiShield, accent: "#0f766e" },
  { label: "QR Payment", value: "QR Payment", icon: FiShield, accent: "#be123c" },
];

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useContext(CartContext);
  const { addOrder } = useContext(OrderContext);

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [slot, setSlot] = useState("Today, 6 PM - 8 PM");
  const [instructions, setInstructions] = useState("");
  const [placingOrder, setPlacingOrder] = useState(false);

  const itemsTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = itemsTotal > 0 ? 40 : 0;
  const platform = itemsTotal > 0 ? 5 : 0;
  const gst = Math.round(itemsTotal * 0.05);
  const discount = itemsTotal > 300 ? 50 : 0;
  const grandTotal = itemsTotal + delivery + platform + gst - discount;

  const currentPayment = useMemo(() => paymentMethods.find((method) => method.value === paymentMode), [paymentMode]);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const data = await getAddressFromLocation(position.coords.latitude, position.coords.longitude);
          setAddress(data.display_name);
          toast.success("Address updated from current location");
        } catch {
          toast.error("Unable to fetch address.");
        }
      },
      (error) => toast.error(error.message)
    );
  };

  const placeOrder = async () => {
    if (!name.trim()) return toast.error("Enter your name");
    if (!mobile.trim()) return toast.error("Enter mobile number");
    if (mobile.trim().length !== 10) return toast.error("Mobile number should contain 10 digits");
    if (!email.trim()) return toast.error("Enter email");
    if (!address.trim()) return toast.error("Enter delivery address");
    if (!paymentMode) return toast.error("Select payment method");

    setPlacingOrder(true);

    const order = {
      order_id: Math.floor(100000 + Math.random() * 900000),
      email,
      mobile,
      address,
      payment: paymentMode,
      orders: cart.map((item) => ({
        name: item.name,
        units: item.quantity,
        price: item.price,
      })),
      cost: {
        shipping: delivery,
        total: grandTotal,
      },
      discount,
      tax: gst,
    };

    try {
      const newOrder = {
        orderNumber: order.order_id,
        customerName: name,
        mobile,
        email,
        address,
        paymentMode,
        grandTotal,
        discount,
        finalAmount: grandTotal,
        orderDate: new Date().toLocaleString(),
        status: "Placed",
        items: cart,
      };

      addOrder(newOrder);
      await sendOrderEmail(order);
      toast.success("Order placed successfully 🎉");
      clearCart();

      setTimeout(() => {
        navigate("/order-success");
      }, 2200);
    } catch (error: any) {
      console.log("FULL ERROR:", error);
      console.log("STATUS:", error?.status);
      console.log("TEXT:", error?.text);
      toast.error(error?.text || "Failed to send email");
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #fffbe6 0%, #f8fafc 18%, #eefbf3 58%, #f6f7fb 100%)", padding: "24px 18px 60px" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 18 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 999, background: "rgba(22,163,74,0.12)", color: "#166534", fontWeight: 800, fontSize: 13 }}>
            <FiShield /> Secure checkout
          </div>
          <h1 style={{ margin: "14px 0 8px", fontSize: "clamp(30px, 4vw, 46px)", color: "#0f172a" }}>Checkout</h1>
          <p style={{ margin: 0, color: "#64748b", maxWidth: 760, lineHeight: 1.7 }}>Complete your delivery details, choose a payment method, and place your order with a polished production-ready checkout flow.</p>
        </motion.div>

        {cart.length === 0 ? (
          <div style={{ background: "white", borderRadius: 28, padding: 40, border: "1px solid rgba(15,23,42,0.06)", boxShadow: "0 24px 50px rgba(15,23,42,0.08)", textAlign: "center" }}>
            <FiPackage size={42} color="#16a34a" />
            <h2 style={{ margin: "16px 0 8px", color: "#0f172a" }}>Your cart is empty</h2>
            <p style={{ margin: 0, color: "#64748b" }}>Add products before checking out.</p>
            <button onClick={() => navigate("/")} style={{ marginTop: 18, border: "none", background: "linear-gradient(135deg, #fde68a, #f59e0b)", color: "#111827", padding: "12px 18px", borderRadius: 16, fontWeight: 900, cursor: "pointer" }}>Continue Shopping</button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.45fr) minmax(320px, 0.9fr)", gap: 22, alignItems: "start" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <section style={{ background: "white", borderRadius: 28, padding: 24, border: "1px solid rgba(15,23,42,0.06)", boxShadow: "0 24px 50px rgba(15,23,42,0.08)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 14, flexWrap: "wrap", marginBottom: 18 }}>
                  <div>
                    <h2 style={{ margin: 0, color: "#0f172a" }}>Delivery details</h2>
                    <p style={{ margin: "6px 0 0", color: "#64748b" }}>Tell us where to deliver your order.</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#16a34a", fontWeight: 800 }}>
                    <FiTruck /> Avg delivery 18 mins
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
                  <Field label="Full Name" value={name} onChange={setName} icon={<FiUser />} placeholder="Enter your full name" />
                  <Field label="Mobile Number" value={mobile} onChange={setMobile} icon={<FiPhone />} placeholder="10 digit mobile number" inputMode="numeric" />
                  <Field label="Email Address" value={email} onChange={setEmail} icon={<FiShield />} placeholder="name@example.com" type="email" />
                </div>

                <div style={{ marginTop: 14 }}>
                  <label style={{ display: "block", marginBottom: 8, color: "#334155", fontWeight: 800, fontSize: 13 }}>Delivery Address</label>
                  <textarea value={address} onChange={(event) => setAddress(event.target.value)} rows={4} placeholder="Enter delivery address" style={{ width: "100%", borderRadius: 20, border: "1px solid #e2e8f0", padding: 14, fontSize: 15, outline: "none", resize: "vertical", fontFamily: "inherit" }} />
                </div>

                <div style={{ marginTop: 14, display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <button type="button" onClick={getCurrentLocation} style={{ border: "none", background: "linear-gradient(135deg, #dbeafe, #93c5fd)", color: "#1d4ed8", padding: "12px 16px", borderRadius: 16, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 900 }}>
                    <FaMapMarkerAlt /> Use current location
                  </button>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 16px", borderRadius: 16, background: "#f8fafc", color: "#334155", border: "1px solid #e2e8f0", fontWeight: 700 }}>
                    <FiInfo /> Order will be delivered to the saved address if you leave this blank.
                  </div>
                </div>
              </section>

              <section style={{ background: "white", borderRadius: 28, padding: 24, border: "1px solid rgba(15,23,42,0.06)", boxShadow: "0 24px 50px rgba(15,23,42,0.08)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14, flexWrap: "wrap", marginBottom: 16 }}>
                  <div>
                    <h2 style={{ margin: 0, color: "#0f172a" }}>Payment method</h2>
                    <p style={{ margin: "6px 0 0", color: "#64748b" }}>Choose how you want to pay.</p>
                  </div>
                  <div style={{ color: "#16a34a", fontWeight: 900 }}>Grand total ₹{grandTotal}</div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    const active = paymentMode === method.value;

                    return (
                      <button key={method.value} type="button" onClick={() => setPaymentMode(method.value)} style={{ textAlign: "left", border: active ? `1px solid ${method.accent}55` : "1px solid #e2e8f0", background: active ? `${method.accent}12` : "white", borderRadius: 20, padding: 16, cursor: "pointer", boxShadow: active ? "0 18px 30px rgba(15,23,42,0.08)" : "none" }}>
                        <div style={{ width: 42, height: 42, borderRadius: 14, background: `${method.accent}18`, display: "flex", alignItems: "center", justifyContent: "center", color: method.accent, marginBottom: 12 }}>
                          <Icon />
                        </div>
                        <div style={{ fontWeight: 900, color: "#0f172a" }}>{method.label}</div>
                        <div style={{ color: "#64748b", fontSize: 13, marginTop: 6 }}>Fast and secure payment flow</div>
                      </button>
                    );
                  })}
                </div>

                {paymentMode === "UPI" && (
                  <div style={{ marginTop: 18, padding: 18, background: "linear-gradient(180deg, #f8fafc, #ffffff)", borderRadius: 24, border: "1px solid #e2e8f0", textAlign: "center" }}>
                    <h3 style={{ color: "#16a34a", marginTop: 0 }}>Scan QR Code to Pay</h3>
                    <p style={{ fontSize: 18, fontWeight: 900, margin: "10px 0 14px" }}>Amount: ₹{grandTotal}</p>
                    <div style={{ background: "white", padding: 16, display: "inline-block", borderRadius: 18, boxShadow: "0 16px 32px rgba(15,23,42,0.08)" }}>
                      <QRCode value={`upi://pay?pa=9014995301@ybl&pn=FreshCart&am=${grandTotal}&cu=INR`} size={180} />
                    </div>
                    <p style={{ marginTop: 14, fontWeight: 800 }}>UPI ID: 9014995301@ybl</p>
                    <small style={{ color: "#64748b" }}>Scan using Google Pay, PhonePe, Paytm, or any UPI app.</small>
                  </div>
                )}

                <div style={{ marginTop: 18 }}>
                  <label style={{ display: "block", marginBottom: 8, color: "#334155", fontWeight: 800, fontSize: 13 }}>Delivery slot</label>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    {["Today, 6 PM - 8 PM", "Today, 8 PM - 10 PM", "Tomorrow, 10 AM - 12 PM"].map((item) => (
                      <button key={item} type="button" onClick={() => setSlot(item)} style={{ border: slot === item ? "1px solid #16a34a55" : "1px solid #e2e8f0", background: slot === item ? "#ecfdf5" : "white", color: "#0f172a", padding: "10px 14px", borderRadius: 999, fontWeight: 800, cursor: "pointer" }}>{item}</button>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: 18 }}>
                  <label style={{ display: "block", marginBottom: 8, color: "#334155", fontWeight: 800, fontSize: 13 }}>Delivery instructions</label>
                  <textarea value={instructions} onChange={(event) => setInstructions(event.target.value)} rows={3} placeholder="Leave at door, call on arrival, etc." style={{ width: "100%", borderRadius: 20, border: "1px solid #e2e8f0", padding: 14, fontSize: 15, outline: "none", resize: "vertical", fontFamily: "inherit" }} />
                </div>
              </section>
            </div>

            <div style={{ position: "sticky", top: 120, display: "flex", flexDirection: "column", gap: 18 }}>
              <section style={{ background: "white", borderRadius: 28, padding: 22, border: "1px solid rgba(15,23,42,0.06)", boxShadow: "0 24px 50px rgba(15,23,42,0.08)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <div>
                    <h2 style={{ margin: 0, color: "#0f172a" }}>Order summary</h2>
                    <p style={{ margin: "6px 0 0", color: "#64748b" }}>{cart.length} items in your cart</p>
                  </div>
                  <div style={{ width: 46, height: 46, borderRadius: 16, background: "#ecfdf5", color: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <FiPackage />
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
                  {cart.map((item) => (
                    <div key={item.id} style={{ display: "flex", gap: 12, alignItems: "center", padding: 12, borderRadius: 18, background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                      <img src={item.image} alt={item.name} loading="lazy" style={{ width: 56, height: 56, borderRadius: 14, objectFit: "cover" }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 900, color: "#0f172a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</div>
                        <div style={{ color: "#64748b", fontSize: 12 }}>{item.quantity} x ₹{item.price}</div>
                      </div>
                      <div style={{ fontWeight: 900, color: "#0f172a" }}>₹{item.price * item.quantity}</div>
                    </div>
                  ))}
                </div>

                <div style={{ display: "grid", gap: 10 }}>
                  <Row label="Subtotal" value={itemsTotal} />
                  <Row label="Discount" value={-discount} />
                  <Row label="Delivery fee" value={delivery} />
                  <Row label="Platform fee" value={platform} />
                  <Row label="GST" value={gst} />
                  <div style={{ borderTop: "1px solid #e2e8f0", marginTop: 4, paddingTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <strong style={{ fontSize: 18, color: "#0f172a" }}>Grand total</strong>
                    <strong style={{ fontSize: 24, color: "#16a34a" }}>₹{grandTotal}</strong>
                  </div>
                </div>
              </section>

              <motion.button
                onClick={placeOrder}
                whileTap={{ scale: 0.98 }}
                disabled={placingOrder}
                style={{ border: "none", borderRadius: 22, background: "linear-gradient(135deg, #22c55e, #16a34a)", color: "white", padding: "16px 18px", fontSize: 16, fontWeight: 900, cursor: placingOrder ? "not-allowed" : "pointer", boxShadow: "0 18px 34px rgba(34,197,94,0.26)", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, opacity: placingOrder ? 0.75 : 1 }}
              >
                <FiShield />
                {placingOrder ? "Placing order..." : `Place Order • ₹${grandTotal}`}
              </motion.button>

              <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", color: "#9a3412", padding: 16, borderRadius: 22, display: "flex", gap: 12, alignItems: "flex-start" }}>
                <FiInfo style={{ marginTop: 2 }} />
                <div style={{ fontSize: 13, lineHeight: 1.6 }}>
                  <strong>Current payment:</strong> {currentPayment?.label || "Select a method"}
                  <div style={{ marginTop: 4 }}>Delivery slot: {slot}</div>
                  {instructions ? <div style={{ marginTop: 4 }}>Instructions: {instructions}</div> : null}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface FieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon: React.ReactNode;
  placeholder: string;
  type?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}

const Field = ({ label, value, onChange, icon, placeholder, type = "text", inputMode }: FieldProps) => (
  <div>
    <label style={{ display: "block", marginBottom: 8, color: "#334155", fontWeight: 800, fontSize: 13 }}>{label}</label>
    <div style={{ display: "flex", alignItems: "center", gap: 10, borderRadius: 18, border: "1px solid #e2e8f0", background: "#fff", padding: "0 14px" }}>
      <span style={{ color: "#64748b" }}>{icon}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} type={type} inputMode={inputMode} placeholder={placeholder} style={{ flex: 1, border: "none", outline: "none", padding: "14px 0", fontSize: 15, background: "transparent", fontFamily: "inherit" }} />
    </div>
  </div>
);

const Row = ({ label, value }: { label: string; value: number }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#334155", fontSize: 14 }}>
    <span>{label}</span>
    <strong style={{ color: value < 0 ? "#dc2626" : "#0f172a" }}>{value < 0 ? `-₹${Math.abs(value)}` : `₹${value}`}</strong>
  </div>
);

export default Checkout;