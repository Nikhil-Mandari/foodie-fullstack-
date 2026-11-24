import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiSave,
  FiArrowLeft,
  FiShield,
  FiCheckCircle,
} from "react-icons/fi";
import type { LoggedInUser } from "../interfaces/LoginRequest";

const inputStyle: React.CSSProperties = {
  border: "1px solid #e5e7eb",
  outline: "none",
  width: "100%",
  padding: "13px 14px",
  borderRadius: 12,
  fontSize: 15,
  color: "#111827",
  background: "#f9fafb",
  fontFamily: "inherit",
  transition: "border-color 0.2s, box-shadow 0.2s",
  boxSizing: "border-box",
};

const inputFocusStyle: React.CSSProperties = {
  borderColor: "#22c55e",
  boxShadow: "0 0 0 3px rgba(34,197,94,0.1)",
};

const Profile = () => {
  const navigate = useNavigate();
  const userJson = localStorage.getItem("loggedInUser");

  if (!userJson) {
    return <Navigate to="/login" replace />;
  }

  const initialUser: LoggedInUser = JSON.parse(userJson);
  const [name, setName] = useState(initialUser.name);
  const [email, setEmail] = useState(initialUser.email);
  const [phone, setPhone] = useState(initialUser.phone || "");
  const [isEditing, setIsEditing] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSave = () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty", {
        style: {
          background: "#fef2f2",
          color: "#dc2626",
          borderRadius: 12,
          border: "1px solid #fecaca",
        },
      });
      return;
    }

    if (!email.trim()) {
      toast.error("Email cannot be empty", {
        style: {
          background: "#fef2f2",
          color: "#dc2626",
          borderRadius: 12,
          border: "1px solid #fecaca",
        },
      });
      return;
    }

    // Update in loggedInUser
    const updatedUser: LoggedInUser = {
      ...initialUser,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
    };

    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

    // Also update in users array
    try {
      const users: LoggedInUser[] = JSON.parse(
        localStorage.getItem("users") || "[]"
      );
      const index = users.findIndex((u) => u.id === initialUser.id);
      if (index !== -1) {
        users[index] = updatedUser;
        localStorage.setItem("users", JSON.stringify(users));
      }
    } catch {
      // Silently fail - loggedInUser is the primary source
    }

    setIsEditing(false);
    toast.success("Profile updated successfully! ✅", {
      style: {
        background: "#f0fdf4",
        color: "#16a34a",
        borderRadius: 12,
        border: "1px solid #bbf7d0",
      },
    });
  };

  const getInputStyle = (fieldName: string) => ({
    ...inputStyle,
    ...(focusedField === fieldName ? inputFocusStyle : {}),
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #f8fff9 0%, #eefbf3 50%, #f8fff9 100%)",
        padding: "32px 24px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ maxWidth: 560, width: "100%" }}>
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          style={{
            padding: "10px 16px",
            border: "none",
            borderRadius: 12,
            background: "white",
            color: "#374151",
            cursor: "pointer",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 20,
            boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
            fontSize: 14,
          }}
        >
          <FiArrowLeft />
          Back
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            background: "white",
            borderRadius: 24,
            padding: 36,
            boxShadow: "0 15px 40px rgba(15,23,42,0.06)",
            border: "1px solid rgba(34,197,94,0.06)",
          }}
        >
          {/* Avatar */}
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div
              style={{
                width: 88,
                height: 88,
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg, #22c55e, #16a34a)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 36,
                fontWeight: 800,
                color: "white",
                margin: "0 auto 16px",
                boxShadow: "0 12px 28px rgba(22,163,74,0.2)",
              }}
            >
              {name.charAt(0).toUpperCase()}
            </div>
            <h1
              style={{
                margin: 0,
                fontSize: 22,
                fontWeight: 800,
                color: "#111827",
              }}
            >
              {isEditing ? "Edit Profile" : "My Profile"}
            </h1>
            <p style={{ margin: "4px 0 0", color: "#6b7280", fontSize: 14 }}>
              {initialUser.role === "ROLE_ADMIN" ? "Admin" : "Customer"}
            </p>
          </div>

          {/* Form Fields */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            {/* Name */}
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: 6,
                  fontWeight: 600,
                  color: "#374151",
                  fontSize: 14,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <FiUser size={14} color="#22c55e" />
                  Full Name
                </div>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!isEditing}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                style={{
                  ...getInputStyle("name"),
                  ...(!isEditing
                    ? { background: "#f3f4f6", cursor: "not-allowed" }
                    : {}),
                }}
              />
            </div>

            {/* Email */}
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: 6,
                  fontWeight: 600,
                  color: "#374151",
                  fontSize: 14,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <FiMail size={14} color="#22c55e" />
                  Email Address
                </div>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditing}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                style={{
                  ...getInputStyle("email"),
                  ...(!isEditing
                    ? { background: "#f3f4f6", cursor: "not-allowed" }
                    : {}),
                }}
              />
            </div>

            {/* Phone */}
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: 6,
                  fontWeight: 600,
                  color: "#374151",
                  fontSize: 14,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <FiPhone size={14} color="#22c55e" />
                  Phone Number
                </div>
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  setPhone(val);
                }}
                maxLength={10}
                disabled={!isEditing}
                onFocus={() => setFocusedField("phone")}
                onBlur={() => setFocusedField(null)}
                style={{
                  ...getInputStyle("phone"),
                  ...(!isEditing
                    ? { background: "#f3f4f6", cursor: "not-allowed" }
                    : {}),
                }}
              />
            </div>

            {/* Role (read-only) */}
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: 6,
                  fontWeight: 600,
                  color: "#374151",
                  fontSize: 14,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <FiShield size={14} color="#22c55e" />
                  Role
                </div>
              </label>
              <input
                type="text"
                value={
                  initialUser.role === "ROLE_ADMIN" ? "Admin" : "Customer"
                }
                disabled
                style={{
                  ...inputStyle,
                  background: "#f3f4f6",
                  cursor: "not-allowed",
                  color: "#6b7280",
                }}
              />
            </div>
          </div>

          {/* Actions */}
          <div
            style={{
              marginTop: 28,
              display: "flex",
              gap: 12,
            }}
          >
            {isEditing ? (
              <>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setIsEditing(false);
                    setName(initialUser.name);
                    setEmail(initialUser.email);
                    setPhone(initialUser.phone || "");
                  }}
                  style={{
                    flex: 1,
                    padding: "13px 20px",
                    borderRadius: 12,
                    border: "1px solid #e5e7eb",
                    background: "white",
                    color: "#374151",
                    fontWeight: 700,
                    cursor: "pointer",
                    fontSize: 15,
                  }}
                >
                  Cancel
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  style={{
                    flex: 1,
                    padding: "13px 20px",
                    borderRadius: 12,
                    border: "none",
                    background:
                      "linear-gradient(135deg, #22c55e, #16a34a)",
                    color: "white",
                    fontWeight: 700,
                    cursor: "pointer",
                    fontSize: 15,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    boxShadow: "0 10px 24px rgba(22,163,74,0.2)",
                  }}
                >
                  <FiSave />
                  Save Changes
                </motion.button>
              </>
            ) : (
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsEditing(true)}
                style={{
                  width: "100%",
                  padding: "13px 20px",
                  borderRadius: 12,
                  border: "none",
                  background:
                    "linear-gradient(135deg, #22c55e, #16a34a)",
                  color: "white",
                  fontWeight: 700,
                  cursor: "pointer",
                  fontSize: 15,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  boxShadow: "0 10px 24px rgba(22,163,74,0.2)",
                }}
              >
                <FiCheckCircle />
                Edit Profile
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
