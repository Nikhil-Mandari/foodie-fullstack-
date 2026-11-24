interface CartSummaryProps {
  itemsTotal: number;
  delivery: number;
  platform: number;
  gst: number;
  discount: number;
  couponDiscount: number;
  grandTotal: number;
}

const CartSummary = ({ itemsTotal, delivery, platform, gst, discount, couponDiscount, grandTotal }: CartSummaryProps) => {
  const rows = [
    { label: "Items Total", value: `₹${itemsTotal}` },
    { label: "Delivery Charge", value: `₹${delivery}` },
    { label: "Platform Fee", value: `₹${platform}` },
    { label: "GST", value: `₹${gst}` },
    { label: "Existing Discount", value: `-₹${discount}` },
    { label: "Coupon Discount", value: `-₹${couponDiscount}` },
  ];

  return (
    <div
      style={{
        background: "linear-gradient(180deg, #ffffff, #f8fafc)",
        borderRadius: 22,
        padding: 20,
        border: "1px solid rgba(15,23,42,0.06)",
        boxShadow: "0 18px 36px rgba(15,23,42,0.06)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <strong style={{ fontSize: 16, color: "#0f172a" }}>Price summary</strong>
        <span style={{ fontSize: 12, color: "#16a34a", fontWeight: 800, background: "#ecfdf5", padding: "6px 10px", borderRadius: 999 }}>Auto updated</span>
      </div>
      {rows.map((row) => (
        <div key={row.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, color: "#334155", fontSize: 14 }}>
          <span>{row.label}</span>
          <span style={{ fontWeight: 700 }}>{row.value}</span>
        </div>
      ))}
      <div style={{ borderTop: "1px solid rgba(15, 23, 42, 0.08)", paddingTop: 14, marginTop: 6, display: "flex", justifyContent: "space-between", color: "#111827" }}>
        <strong>Grand Total</strong>
        <strong style={{ fontSize: 18 }}>₹{grandTotal}</strong>
      </div>
    </div>
  );
};

export default CartSummary;
