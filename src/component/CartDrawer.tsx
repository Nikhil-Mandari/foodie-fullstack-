import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FiCheckCircle, FiMinus, FiPlus, FiShield, FiTrash2, FiX } from "react-icons/fi";
import { RiSecurePaymentFill } from "react-icons/ri";
import { MdDeliveryDining } from "react-icons/md";
import type { CartItem } from "../interfaces/CartItem";
import type { Coupon } from "../interfaces/Coupon";
import { coupons } from "./data/Coupons";
import EmptyCart from "./EmptyCart";
import CartSummary from "./CartSummary";
import QuantityButton from "./QuantityButton";
import { useNavigate } from "react-router-dom";


interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onRemove: (id: number) => void;
  onClear: () => void;
  onContinue: () => void;
}

const CartDrawer = ({ open, onClose, items, onIncrease, onDecrease, onRemove, onClear, onContinue }: CartDrawerProps) => {
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponMessage, setCouponMessage] = useState("");
  const [couponStatus, setCouponStatus] = useState<"success" | "error" | "neutral">("neutral");

  const itemsTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = itemsTotal > 0 ? 40 : 0;
  const platform = itemsTotal > 0 ? 5 : 0;
  const gst = Math.round(itemsTotal * 0.05);
  const discount = itemsTotal > 300 ? 50 : 0;
  const couponDiscount = appliedCoupon ? Math.round((itemsTotal * appliedCoupon.discount) / 100) : 0;
  const grandTotal = itemsTotal + delivery + platform + gst - discount - couponDiscount;

  const navigate = useNavigate();

  const handleApplyCoupon = () => {
    const normalizedCode = couponCode.trim().toUpperCase();
    if (!normalizedCode) {
      setCouponStatus("error");
      setCouponMessage("Enter a coupon code to apply.");
      return;
    }

    const coupon = coupons.find((item) => item.code.toUpperCase() === normalizedCode);
    if (!coupon) {
      setCouponStatus("error");
      setCouponMessage("Invalid Coupon Code");
      return;
    }

    setAppliedCoupon(coupon);
    setCouponStatus("success");
    setCouponMessage("Coupon Applied Successfully");
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponStatus("neutral");
    setCouponMessage("");
  };

  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      onClear();
      handleRemoveCoupon();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.55)", backdropFilter: "blur(8px)", zIndex: 1100 }} />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            style={{ position: "fixed", top: 0, right: 0, width: "min(460px, 100%)", height: "100vh", background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)", zIndex: 1200, boxShadow: "-16px 0 50px rgba(15, 23, 42, 0.18)", display: "flex", flexDirection: "column" }}
          >
            <div style={{ padding: 18, background: "linear-gradient(135deg, #111827, #1f2937)", color: "white" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                <div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", fontWeight: 700 }}>Premium cart</div>
                  <h3 style={{ margin: "6px 0 0", fontSize: 22 }}>Your Cart</h3>
                  <div style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 10, color: "rgba(255,255,255,0.85)", fontSize: 13 }}>
                    <FiShield /> Secure checkout
                    <span>•</span>
                    <MdDeliveryDining /> 20 minute delivery
                  </div>
                </div>
                <button onClick={onClose} style={{ border: "none", background: "rgba(255,255,255,0.12)", color: "white", width: 40, height: 40, borderRadius: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <FiX size={18} />
                </button>
              </div>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 16 }}>
              {items.length === 0 ? (
                <EmptyCart onContinue={onContinue} />
              ) : (
                <>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "12px 14px", borderRadius: 18, background: "white", border: "1px solid rgba(15,23,42,0.06)", boxShadow: "0 14px 30px rgba(15,23,42,0.05)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#16a34a", fontWeight: 800 }}>
                      <MdDeliveryDining />
                      <span>Fast delivery in 20 mins</span>
                    </div>
                    <button onClick={handleClear} style={{ border: "none", background: "#fff1f2", color: "#dc2626", cursor: "pointer", fontWeight: 800, display: "flex", alignItems: "center", gap: 6, borderRadius: 999, padding: "8px 12px" }}>
                      <FiTrash2 /> Clear cart
                    </button>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {items.map((item) => (
                      <motion.div key={item.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ background: "white", borderRadius: 22, padding: 12, boxShadow: "0 12px 26px rgba(15,23,42,0.06)", border: "1px solid rgba(15,23,42,0.05)" }}>
                        <div style={{ display: "flex", gap: 12 }}>
                          <img src={item.image} alt={item.name} loading="lazy" style={{ width: 84, height: 84, objectFit: "cover", borderRadius: 18, flexShrink: 0 }} />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                              <div style={{ minWidth: 0 }}>
                                <h4 style={{ margin: 0, fontSize: 15, color: "#0f172a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</h4>
                                <p style={{ margin: "4px 0 0", fontSize: 12, color: "#64748b" }}>{item.category}</p>
                              </div>
                              <button onClick={() => onRemove(item.id)} style={{ border: "none", background: "#f8fafc", color: "#dc2626", cursor: "pointer", width: 34, height: 34, borderRadius: 12 }}>
                                <FiTrash2 />
                              </button>
                            </div>

                            <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                              <div style={{ color: "#64748b", fontSize: 13 }}>{item.weight}</div>
                              <div style={{ fontWeight: 900, color: "#0f172a" }}>₹{item.price * item.quantity}</div>
                            </div>

                            <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <QuantityButton onClick={() => onDecrease(item.id)} icon={<FiMinus />} variant="secondary" />
                                <span style={{ minWidth: 28, textAlign: "center", fontWeight: 900, color: "#16a34a" }}>{item.quantity}</span>
                                <QuantityButton onClick={() => onIncrease(item.id)} icon={<FiPlus />} variant="primary" />
                              </div>
                              <div style={{ fontSize: 12, color: "#64748b" }}>₹{item.price} each</div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div style={{ padding: 0 }}>
                    <div style={{ marginBottom: 18, padding: 16, borderRadius: 22, background: "white", border: "1px solid rgba(15,23,42,0.06)", boxShadow: "0 16px 30px rgba(15,23,42,0.05)" }}>
                      <div style={{ marginBottom: 12 }}>
                        <h4 style={{ margin: 0, fontSize: 16, color: "#0f172a" }}>Coupon and offers</h4>
                        <p style={{ marginTop: 6, fontSize: 13, color: "#64748b" }}>Apply one of the live promo codes below.</p>
                      </div>

                      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                        <input
                          value={couponCode}
                          onChange={(event) => {
                            setCouponCode(event.target.value);
                            if (couponStatus !== "neutral") {
                              setCouponStatus("neutral");
                              setCouponMessage("");
                            }
                          }}
                          placeholder="Enter coupon code"
                          disabled={!!appliedCoupon}
                          style={{ flex: 1, minWidth: 160, borderRadius: 16, border: "1px solid #e2e8f0", padding: "13px 14px", fontSize: 14, color: "#0f172a", background: appliedCoupon ? "#f8fafc" : "white", outline: "none" }}
                        />
                        <button type="button" onClick={appliedCoupon ? handleRemoveCoupon : handleApplyCoupon} style={{ border: "none", borderRadius: 16, padding: "13px 18px", fontWeight: 900, cursor: "pointer", color: "#111827", background: appliedCoupon ? "#fecaca" : "linear-gradient(135deg, #fde68a, #f59e0b)", minWidth: 126 }}>
                          {appliedCoupon ? "Remove" : "Apply"}
                        </button>
                      </div>

                      <div style={{ marginTop: 12, minHeight: 20, color: couponStatus === "success" ? "#16a34a" : couponStatus === "error" ? "#dc2626" : "#64748b", fontSize: 13, fontWeight: 700 }}>
                        {couponMessage || "Try SAVE10, SAVE20, SAVE30, NEW50"}
                      </div>

                      <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 10 }}>
                        {coupons.map((coupon) => (
                          <span key={coupon.code} style={{ padding: "8px 12px", borderRadius: 999, border: "1px solid #dbeafe", background: "#eff6ff", color: "#1d4ed8", fontWeight: 800, fontSize: 12 }}>
                            {coupon.code}
                          </span>
                        ))}
                      </div>
                    </div>

                    <CartSummary itemsTotal={itemsTotal} delivery={delivery} platform={platform} gst={gst} discount={discount} couponDiscount={couponDiscount} grandTotal={grandTotal} />

                    <motion.button
                      onClick={() => {
                        onClose();
                        navigate("/checkout");
                      }}
                      whileTap={{ scale: 0.97 }}
                      style={{ marginTop: 14, width: "100%", border: "none", borderRadius: 18, background: "linear-gradient(135deg, #22c55e, #16a34a)", color: "white", padding: "15px 16px", fontSize: 16, fontWeight: 900, cursor: "pointer", boxShadow: "0 16px 30px rgba(34,197,94,0.24)", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
                    >
                      <FiCheckCircle />
                      Proceed to Checkout
                      <RiSecurePaymentFill />
                    </motion.button>
                  </div>
                </>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
