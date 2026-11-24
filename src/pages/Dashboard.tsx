import { useMemo } from "react";
import { Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiCalendar,
  FiShoppingBag,
  FiTruck,
  FiStar,
  FiArrowRight,
  FiShield,
} from "react-icons/fi";
import type { LoggedInUser } from "../interfaces/LoginRequest";

const Dashboard = () => {
  const userJson = localStorage.getItem("loggedInUser");
  if (!userJson) {
    return <Navigate to="/login" replace />;
  }

  const user: LoggedInUser = JSON.parse(userJson);

  const stats = useMemo(
    () => [
      {
        icon: <FiShoppingBag size={22} />,
        label: "Total Orders",
        value: "0",
        color: "#22c55e",
        bg: "rgba(34,197,94,0.1)",
      },
      {
        icon: <FiTruck size={22} />,
        label: "Delivered",
        value: "0",
        color: "#3b82f6",
        bg: "rgba(59,130,246,0.1)",
      },
      {
        icon: <FiStar size={22} />,
        label: "Favorites",
        value: "0",
        color: "#f59e0b",
        bg: "rgba(245,158,11,0.1)",
      },
      {
        icon: <FiShield size={22} />,
        label: "Role",
        value: user.role === "ROLE_ADMIN" ? "Admin" : "Customer",
        color: "#8b5cf6",
        bg: "rgba(139,92,246,0.1)",
      },
    ],
    [user.role]
  );

  const quickActions = [
    {
      label: "Browse Menu",
      to: "/veg",
      emoji: "🥗",
      color: "#22c55e",
    },
    {
      label: "My Orders",
      to: "/orders",
      emoji: "📦",
      color: "#3b82f6",
    },
    {
      label: "My Profile",
      to: "/profile",
      emoji: "👤",
      color: "#8b5cf6",
    },
    {
      label: "Non-Veg",
      to: "/nonveg",
      emoji: "🍗",
      color: "#ef4444",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #f8fff9 0%, #eefbf3 50%, #f8fff9 100%)",
        padding: "32px 24px",
      }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            background:
              "linear-gradient(135deg, #16a34a, #22c55e)",
            borderRadius: 24,
            padding: "32px 36px",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 20,
            boxShadow: "0 20px 40px rgba(22,163,74,0.2)",
            marginBottom: 32,
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: 28,
                fontWeight: 800,
              }}
            >
              Welcome, {user.name}!
            </h1>
            <p style={{ marginTop: 8, opacity: 0.9, fontSize: 15 }}>
              Ready to order your favorite meals?
            </p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                fontWeight: 800,
                color: "white",
              }}
            >
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{
            background: "white",
            borderRadius: 20,
            padding: 28,
            boxShadow: "0 10px 30px rgba(15,23,42,0.06)",
            marginBottom: 32,
            border: "1px solid rgba(34,197,94,0.06)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg, #22c55e, #16a34a)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 26,
                fontWeight: 800,
                color: "white",
                flexShrink: 0,
              }}
            >
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <h2
                style={{
                  margin: 0,
                  fontSize: 20,
                  color: "#111827",
                }}
              >
                {user.name}
              </h2>
              <div
                style={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    color: "#6b7280",
                    fontSize: 14,
                  }}
                >
                  <FiMail size={14} />
                  {user.email}
                </div>
                {user.phone && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      color: "#6b7280",
                      fontSize: 14,
                    }}
                  >
                    <FiPhone size={14} />
                    {user.phone}
                  </div>
                )}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    color: "#6b7280",
                    fontSize: 14,
                  }}
                >
                  <FiCalendar size={14} />
                  {user.role === "ROLE_ADMIN" ? "Admin" : "Customer"} account
                </div>
              </div>
            </div>
            <Link
              to="/profile"
              style={{
                padding: "10px 20px",
                borderRadius: 12,
                border: "1px solid #e5e7eb",
                background: "white",
                color: "#374151",
                fontWeight: 700,
                cursor: "pointer",
                fontSize: 14,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              Edit Profile
              <FiArrowRight />
            </Link>
          </div>
        </motion.div>

        {/* Statistics */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 16,
            marginBottom: 32,
          }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
              style={{
                background: "white",
                borderRadius: 18,
                padding: 22,
                boxShadow: "0 10px 25px rgba(15,23,42,0.04)",
                border: "1px solid rgba(34,197,94,0.06)",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: stat.bg,
                  color: stat.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 14,
                }}
              >
                {stat.icon}
              </div>
              <div
                style={{ fontSize: 24, fontWeight: 800, color: "#111827" }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: 14, color: "#6b7280", marginTop: 4 }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <h2
          style={{
            fontSize: 20,
            fontWeight: 800,
            color: "#111827",
            marginBottom: 16,
          }}
        >
          Quick Actions
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 14,
          }}
        >
          {quickActions.map((action, index) => (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
            >
              <Link
                to={action.to}
                style={{
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: 18,
                  background: "white",
                  borderRadius: 16,
                  boxShadow: "0 10px 25px rgba(15,23,42,0.04)",
                  border: "1px solid rgba(34,197,94,0.06)",
                  transition: "all 0.2s",
                  color: "#111827",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = action.color;
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 14px 30px rgba(15,23,42,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    "rgba(34,197,94,0.06)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 25px rgba(15,23,42,0.04)";
                }}
              >
                <span style={{ fontSize: 28 }}>{action.emoji}</span>
                <span
                  style={{ fontWeight: 700, fontSize: 15, color: "#374151" }}
                >
                  {action.label}
                </span>
                <FiArrowRight
                  size={16}
                  style={{ marginLeft: "auto", color: "#9ca3af" }}
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
