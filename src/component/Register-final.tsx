/*
import { motion } from "framer-motion";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { FiCheckCircle, FiLock, FiMail, FiShield, FiUser } from "react-icons/fi";
import type { RegisterRequest } from "../interfaces/RegisterRequest";
import { registerUserService } from "../services/AuthService";

function Register() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterRequest>({
    defaultValues: {
      role: "ROLE_CUSTOMER",
    },
  });

  const formValues = watch();

  const passwordStrength = useMemo(() => {
    const value = formValues.password || "";
    if (value.length === 0) return { label: "Enter a password", color: "#94a3b8", width: "0%" };
    if (value.length < 6) return { label: "Weak", color: "#ef4444", width: "33%" };
    if (value.length < 10) return { label: "Good", color: "#f59e0b", width: "66%" };
    return { label: "Strong", color: "#22c55e", width: "100%" };
  }, [formValues.password]);

  const onSubmit = async (data: RegisterRequest) => {
    try {
      await registerUserService(data);
      reset();
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8fff9 0%, #eefbf3 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        style={{
          width: "100%",
          maxWidth: 980,
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(14px)",
          borderRadius: 28,
          boxShadow: "0 20px 45px rgba(15, 23, 42, 0.12)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "36px",
            background: "linear-gradient(145deg, #16a34a, #22c55e)",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 700, marginBottom: 18 }}>
              <FiShield size={20} />
              <span>FoodExpress Account</span>
            </div>
            <h1 style={{ margin: 0, fontSize: 32, lineHeight: 1.2 }}>Create your account</h1>
            <p style={{ marginTop: 10, fontSize: 15, opacity: 0.95 }}>
              Join in seconds and enjoy fresh food delivery with a seamless experience.
            </p>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.18)",
              borderRadius: 20,
              padding: 16,
              border: "1px solid rgba(255,255,255,0.25)",
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>Live preview</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ fontSize: 16, fontWeight: 700 }}>{formValues.name || "Your name"}</div>
              <div style={{ fontSize: 14, opacity: 0.9 }}>{formValues.email || "your@email.com"}</div>
              <div style={{ fontSize: 13, opacity: 0.9 }}>
                Role: {formValues.role === "ROLE_ADMIN" ? "Admin" : "Customer"}
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} style={{ padding: "36px", display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={{ display: "block", fontWeight: 700, marginBottom: 8, color: "#0f172a" }}>Full Name</label>
            <div style={{ display: "flex", alignItems: "center", gap: 10, border: errors.name ? "1px solid #ef4444" : "1px solid #e2e8f0", borderRadius: 12, padding: "0 12px", background: "#f8fafc" }}>
              <FiUser color="#16a34a" />
              <input
                type="text"
                {...register("name", {
                  required: "Name is required",
                  minLength: { value: 3, message: "Name must be at least 3 characters" },
                })}
                placeholder="Enter your name"
                style={{ border: "none", outline: "none", width: "100%", padding: "12px 0", background: "transparent" }}
              />
            </div>
            {errors.name && <p style={{ color: "#ef4444", margin: "6px 0 0", fontSize: 13 }}>{errors.name.message}</p>}
          </div>

          <div>
            <label style={{ display: "block", fontWeight: 700, marginBottom: 8, color: "#0f172a" }}>Email Address</label>
            <div style={{ display: "flex", alignItems: "center", gap: 10, border: errors.email ? "1px solid #ef4444" : "1px solid #e2e8f0", borderRadius: 12, padding: "0 12px", background: "#f8fafc" }}>
              <FiMail color="#16a34a" />
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Please enter a valid email" },
                })}
                placeholder="Enter your email"
                style={{ border: "none", outline: "none", width: "100%", padding: "12px 0", background: "transparent" }}
              />
            </div>
            {errors.email && <p style={{ color: "#ef4444", margin: "6px 0 0", fontSize: 13 }}>{errors.email.message}</p>}
          </div>

          <div>
            <label style={{ display: "block", fontWeight: 700, marginBottom: 8, color: "#0f172a" }}>Password</label>
            <div style={{ display: "flex", alignItems: "center", gap: 10, border: errors.password ? "1px solid #ef4444" : "1px solid #e2e8f0", borderRadius: 12, padding: "0 12px", background: "#f8fafc" }}>
              <FiLock color="#16a34a" />
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" },
                })}
                placeholder="Create a password"
                style={{ border: "none", outline: "none", width: "100%", padding: "12px 0", background: "transparent" }}
              />
            </div>
            <div style={{ marginTop: 8 }}>
              <div style={{ height: 8, borderRadius: 999, background: "#e2e8f0", overflow: "hidden" }}>
                <div style={{ height: "100%", width: passwordStrength.width, background: passwordStrength.color, transition: "width 0.3s ease" }} />
              </div>
              <div style={{ marginTop: 6, color: passwordStrength.color, fontSize: 13, fontWeight: 700 }}>{passwordStrength.label}</div>
            </div>
            {errors.password && <p style={{ color: "#ef4444", margin: "6px 0 0", fontSize: 13 }}>{errors.password.message}</p>}
          </div>

          <div>
            <label style={{ display: "block", fontWeight: 700, marginBottom: 8, color: "#0f172a" }}>Role</label>
            <select
              {...register("role")}
              style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1px solid #e2e8f0", background: "#f8fafc", outline: "none" }}
            >
              <option value="ROLE_CUSTOMER">Customer</option>
              <option value="ROLE_ADMIN">Admin</option>
            </select>
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            style={{
              marginTop: 6,
              padding: "13px 16px",
              border: "none",
              borderRadius: 999,
              background: "linear-gradient(135deg, #22c55e, #16a34a)",
              color: "white",
              fontWeight: 800,
              cursor: isSubmitting ? "not-allowed" : "pointer",
              boxShadow: "0 10px 24px rgba(34, 197, 94, 0.22)",
            }}
          >
            {isSubmitting ? "Creating account..." : "Register"}
          </motion.button>

          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#64748b", fontSize: 13 }}>
            <FiCheckCircle color="#22c55e" />
            Secure registration with live form validation
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default Register;
*/
