import { Link } from "react-router-dom";
import {
  FaClipboardList,
  FaHeart,
  FaUserCircle,
  FaShoppingBag,
  FaMapMarkerAlt,
  FaSignOutAlt,
  FaUserCog,
} from "react-icons/fa";

const Sidebar = () => {
  // Read from localStorage to get the current logged-in user
  let userName = "User";
  let userRole = "Customer";
  try {
    const userJson = localStorage.getItem("loggedInUser");
    if (userJson) {
      const user = JSON.parse(userJson);
      if (user.name) userName = user.name;
      if (user.role) userRole = user.role === "ROLE_ADMIN" ? "Admin" : "Customer";
    }
  } catch {
    // fallback to defaults
  }

  return (
    <div
      style={{
        width: "100%",
        background: "linear-gradient(180deg, #111827, #1f2937)",
        borderRadius: "28px",
        overflow: "hidden",
        boxShadow: "0 24px 50px rgba(15,23,42,0.16)",
        color: "white",
      }}
    >
      <div
        style={{
          padding: "28px 24px",
          textAlign: "center",
          background: "linear-gradient(135deg, rgba(253,230,138,0.16), rgba(34,197,94,0.18))",
        }}
      >
        <div style={{ width: 88, height: 88, borderRadius: "50%", background: "linear-gradient(135deg, #fde68a, #f59e0b)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", color: "#111827", boxShadow: "0 16px 28px rgba(245,158,11,0.24)" }}>
          <FaUserCircle size={54} />
        </div>

        <h2 style={{ margin: "0", fontSize: 22 }}>
          {userName}
        </h2>

        <p style={{ opacity: 0.9, fontSize: 14, margin: "8px 0 0" }}>
          {userRole}
        </p>
      </div>

      <div style={{ padding: 14, display: "grid", gap: 10 }}>
        <Link to="/orders" style={menuStyle}>
          <FaClipboardList />
          My Orders
        </Link>

        <Link to="/profile" style={menuStyle}>
          <FaUserCog />
          Profile
        </Link>

        <Link to="/checkout" style={menuStyle}>
          <FaMapMarkerAlt />
          My Address
        </Link>

        <Link to="/" style={menuStyle}>
          <FaShoppingBag />
          Back Home
        </Link>
      </div>
    </div>
  );
};

const menuStyle = {
  display: "flex",
  alignItems: "center",
  gap: "15px",
  padding: "14px 16px",
  textDecoration: "none",
  color: "#e5e7eb",
  fontSize: "15px",
  fontWeight: 700,
  borderRadius: "18px",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.08)",
};

export default Sidebar;