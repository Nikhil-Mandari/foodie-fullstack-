import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiLogIn,
  FiShield,
} from "react-icons/fi";
import type { LoginRequest, LoggedInUser } from "../interfaces/LoginRequest";

const inputWrapperStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  borderRadius: 14,
  padding: "0 14px",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.12)",
  transition: "border-color 0.2s, background 0.2s",
};

const inputStyle: React.CSSProperties = {
  border: "none",
  outline: "none",
  width: "100%",
  padding: "14px 0",
  background: "transparent",
  color: "white",
  fontSize: 15,
  fontFamily: "inherit",
};

const inputWrapperFocusStyle: React.CSSProperties = {
  border: "1px solid rgba(34, 197, 94, 0.5)",
  background: "rgba(255,255,255,0.08)",
};

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginRequest>();

  const onSubmit = async (data: LoginRequest) => {
    // Simulate a brief loading
    await new Promise((resolve) => setTimeout(resolve, 800));

    const users: LoggedInUser[] = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    const foundUser = users.find(
      (user) =>
        user.email.toLowerCase() === data.email.toLowerCase() &&
        user.password === data.password
    );

    if (!foundUser) {
      toast.error("Invalid Email or Password", {
        position: "top-right",
        style: {
          background: "#fef2f2",
          color: "#dc2626",
          borderRadius: 12,
          border: "1px solid #fecaca",
        },
      });
      return;
    }

    // Save logged in user
    localStorage.setItem("loggedInUser", JSON.stringify(foundUser));

    if (rememberMe) {
      localStorage.setItem("rememberMe", "true");
    } else {
      localStorage.removeItem("rememberMe");
    }

    toast.success(`Welcome back, ${foundUser.name}! 🎉`, {
      position: "top-right",
      style: {
        background: "#f0fdf4",
        color: "#16a34a",
        borderRadius: 12,
        border: "1px solid #bbf7d0",
      },
    });

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated background orbs */}
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.12), transparent 70%)",
          top: -80,
          left: -80,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 350,
          height: 350,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(34,197,94,0.1), transparent 70%)",
          bottom: -100,
          right: -100,
          pointerEvents: "none",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          width: "100%",
          maxWidth: 420,
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(20px)",
          borderRadius: 28,
          padding: 40,
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "linear-gradient(135deg, #22c55e, #16a34a)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
              boxShadow: "0 12px 24px rgba(34,197,94,0.3)",
            }}
          >
            <FiShield size={26} color="white" />
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: 24,
              fontWeight: 800,
              color: "white",
              letterSpacing: "-0.5px",
            }}
          >
            Welcome Back
          </h1>
          <p style={{ margin: "6px 0 0", color: "#94a3b8", fontSize: 14 }}>
            Sign in to continue ordering delicious food
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "flex", flexDirection: "column", gap: 20 }}
        >
          {/* Email */}
          <div>
            <div
              style={{
                ...inputWrapperStyle,
                ...(focusedField === "email" ? inputWrapperFocusStyle : {}),
                ...(errors.email
                  ? { border: "1px solid rgba(239,68,68,0.5)" }
                  : {}),
              }}
            >
              <FiMail
                color={errors.email ? "#ef4444" : "#94a3b8"}
                size={18}
              />
              <input
                type="email"
                placeholder="Email Address"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email",
                  },
                })}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                style={inputStyle}
              />
            </div>
            {errors.email && (
              <p
                style={{
                  color: "#ef4444",
                  margin: "6px 0 0",
                  fontSize: 13,
                  fontWeight: 500,
                }}
              >
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <div
              style={{
                ...inputWrapperStyle,
                ...(focusedField === "password" ? inputWrapperFocusStyle : {}),
                ...(errors.password
                  ? { border: "1px solid rgba(239,68,68,0.5)" }
                  : {}),
              }}
            >
              <FiLock
                color={errors.password ? "#ef4444" : "#94a3b8"}
                size={18}
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                style={inputStyle}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  border: "none",
                  background: "transparent",
                  color: "#94a3b8",
                  cursor: "pointer",
                  padding: 0,
                  display: "flex",
                }}
              >
                {showPassword ? (
                  <FiEyeOff size={18} />
                ) : (
                  <FiEye size={18} />
                )}
              </button>
            </div>
            {errors.password && (
              <p
                style={{
                  color: "#ef4444",
                  margin: "6px 0 0",
                  fontSize: 13,
                  fontWeight: 500,
                }}
              >
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: "#94a3b8",
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{
                  width: 16,
                  height: 16,
                  accentColor: "#22c55e",
                  cursor: "pointer",
                }}
              />
              Remember me
            </label>
            <span
              style={{
                color: "#64748b",
                fontSize: 14,
                cursor: "pointer",
                textDecoration: "none",
              }}
              onClick={() =>
                toast.info("Password reset feature coming soon!", {
                  style: {
                    background: "#eff6ff",
                    color: "#2563eb",
                    borderRadius: 12,
                    border: "1px solid #bfdbfe",
                  },
                })
              }
            >
              Forgot password?
            </span>
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileTap={{ scale: 0.98 }}
            style={{
              marginTop: 4,
              padding: "15px 20px",
              border: "none",
              borderRadius: 14,
              background: "linear-gradient(135deg, #22c55e, #16a34a)",
              color: "white",
              fontWeight: 800,
              fontSize: 16,
              cursor: isSubmitting ? "not-allowed" : "pointer",
              boxShadow: "0 12px 28px rgba(34,197,94,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              opacity: isSubmitting ? 0.7 : 1,
            }}
          >
            {isSubmitting ? (
              <>
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 1,
                    ease: "linear",
                  }}
                  style={{ display: "inline-block" }}
                >
                  ⏳
                </motion.span>
                Signing in...
              </>
            ) : (
              <>
                Sign In
                <FiLogIn />
              </>
            )}
          </motion.button>
        </form>

        {/* Register link */}
        <div
          style={{
            marginTop: 24,
            textAlign: "center",
            color: "#94a3b8",
            fontSize: 14,
          }}
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{
              color: "#22c55e",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Create one
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
