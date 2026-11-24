import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import {
  FiUser,
  FiMail,
  FiLock,
  FiPhone,
  FiEye,
  FiEyeOff,
  FiCheckCircle,
  FiShield,
  FiArrowRight,
} from "react-icons/fi";
import type { RegisterRequest } from "../interfaces/RegisterRequest";

const inputWrapperStyle = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  borderRadius: 14,
  padding: "0 14px",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.12)",
  transition: "border-color 0.2s, background 0.2s",
} as const;

const inputStyle = {
  border: "none",
  outline: "none",
  width: "100%",
  padding: "14px 0",
  background: "transparent",
  color: "white",
  fontSize: 15,
  fontFamily: "inherit",
} as const;

const inputWrapperFocusStyle = {
  border: "1px solid rgba(34, 197, 94, 0.5)",
  background: "rgba(255,255,255,0.08)",
} as const;

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { role: "ROLE_CUSTOMER" },
  });

  const formValues = watch();

  const passwordStrength = useMemo(() => {
    const pw = formValues.password || "";
    if (!pw) return { label: "", color: "transparent", width: "0%", score: 0 };

    let score = 0;
    if (pw.length >= 8) score++;
    if (/[a-z]/.test(pw)) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^a-zA-Z0-9]/.test(pw)) score++;

    if (score <= 1) return { label: "Weak", color: "#ef4444", width: "33%", score };
    if (score <= 3) return { label: "Medium", color: "#f59e0b", width: "66%", score };
    return { label: "Strong", color: "#22c55e", width: "100%", score };
  }, [formValues.password]);

  const onSubmit = async (data) => {
    const users = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    const userExists = users.some(
      (user) => user.email.toLowerCase() === data.email.toLowerCase()
    );

    if (userExists) {
      toast.error("Email already registered", {
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

    const newUser = {
      id: users.length + 1,
      ...data,
      phone: data.phone || "",
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    setShowSuccess(true);
    toast.success("Account created successfully! 🎉", {
      position: "top-right",
      style: {
        background: "#f0fdf4",
        color: "#16a34a",
        borderRadius: 12,
        border: "1px solid #bbf7d0",
      },
    });

    setTimeout(() => {
      navigate("/login");
      reset();
    }, 2000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
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
          background: "radial-gradient(circle, rgba(34,197,94,0.12), transparent 70%)",
          top: -100,
          right: -100,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.1), transparent 70%)",
          bottom: -50,
          left: -50,
          pointerEvents: "none",
        }}
      />

      <AnimatePresence mode="wait">
        {showSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={{
              textAlign: "center",
              color: "white",
            }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5 }}
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "rgba(34,197,94,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
              }}
            >
              <FiCheckCircle size={44} color="#22c55e" />
            </motion.div>
            <h2 style={{ margin: 0, fontSize: 28, fontWeight: 800 }}>
              Registration Successful!
            </h2>
            <p style={{ color: "#94a3b8", marginTop: 8 }}>
              Redirecting to login...
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            style={{
              width: "100%",
              maxWidth: 440,
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
                Create Account
              </h1>
              <p style={{ margin: "6px 0 0", color: "#94a3b8", fontSize: 14 }}>
                Join FoodExpress and start ordering
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ display: "flex", flexDirection: "column", gap: 18 }}
            >
              {/* Name */}
              <div>
                <div
                  style={{
                    ...inputWrapperStyle,
                    ...(focusedField === "name"
                      ? inputWrapperFocusStyle
                      : {}),
                    ...(errors.name
                      ? { border: "1px solid rgba(239,68,68,0.5)" }
                      : {}),
                  }}
                >
                  <FiUser color={errors.name ? "#ef4444" : "#94a3b8"} size={18} />
                  <input
                    type="text"
                    placeholder="Full Name"
                    {...register("name", {
                      required: "Name is required",
                      minLength: {
                        value: 3,
                        message: "Name must be at least 3 characters",
                      },
                    })}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    style={inputStyle}
                  />
                </div>
                {errors.name && (
                  <p style={{ color: "#ef4444", margin: "6px 0 0", fontSize: 13, fontWeight: 500 }}>
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <div
                  style={{
                    ...inputWrapperStyle,
                    ...(focusedField === "email"
                      ? inputWrapperFocusStyle
                      : {}),
                    ...(errors.email
                      ? { border: "1px solid rgba(239,68,68,0.5)" }
                      : {}),
                  }}
                >
                  <FiMail color={errors.email ? "#ef4444" : "#94a3b8"} size={18} />
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
                  <p style={{ color: "#ef4444", margin: "6px 0 0", fontSize: 13, fontWeight: 500 }}>
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <div
                  style={{
                    ...inputWrapperStyle,
                    ...(focusedField === "phone"
                      ? inputWrapperFocusStyle
                      : {}),
                    ...(errors.phone
                      ? { border: "1px solid rgba(239,68,68,0.5)" }
                      : {}),
                  }}
                >
                  <FiPhone color={errors.phone ? "#ef4444" : "#94a3b8"} size={18} />
                  <input
                    type="text"
                    placeholder="Phone Number (10 digits)"
                    maxLength={10}
                    {...register("phone", {
                      pattern: {
                        value: /^\d{10}$/,
                        message: "Phone must be exactly 10 digits",
                      },
                    })}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      e.target.value = val;
                    }}
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => setFocusedField(null)}
                    style={inputStyle}
                  />
                </div>
                {errors.phone && (
                  <p style={{ color: "#ef4444", margin: "6px 0 0", fontSize: 13, fontWeight: 500 }}>
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <div
                  style={{
                    ...inputWrapperStyle,
                    ...(focusedField === "password"
                      ? inputWrapperFocusStyle
                      : {}),
                    ...(errors.password
                      ? { border: "1px solid rgba(239,68,68,0.5)" }
                      : {}),
                  }}
                >
                  <FiLock color={errors.password ? "#ef4444" : "#94a3b8"} size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/,
                        message:
                          "Must include uppercase, lowercase, number & special character",
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
                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>

                {/* Password Strength */}
                {formValues.password && (
                  <div style={{ marginTop: 10 }}>
                    <div
                      style={{
                        height: 6,
                        borderRadius: 999,
                        background: "rgba(255,255,255,0.08)",
                        overflow: "hidden",
                      }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: passwordStrength.width }}
                        transition={{ duration: 0.3 }}
                        style={{
                          height: "100%",
                          background: passwordStrength.color,
                          borderRadius: 999,
                        }}
                      />
                    </div>
                    <div
                      style={{
                        marginTop: 6,
                        color: passwordStrength.color,
                        fontSize: 13,
                        fontWeight: 600,
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>
                        {passwordStrength.label}
                        {passwordStrength.label && " — "}
                        {passwordStrength.label === "Weak"
                          ? "Add uppercase, number & special char"
                          : passwordStrength.label === "Medium"
                          ? "Almost there!"
                          : passwordStrength.label === "Strong"
                          ? "Great password!"
                          : ""}
                      </span>
                    </div>
                  </div>
                )}

                {errors.password && (
                  <p style={{ color: "#ef4444", margin: "6px 0 0", fontSize: 13, fontWeight: 500 }}>
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Role */}
              <select
                {...register("role")}
                style={{
                  width: "100%",
                  padding: "14px 14px",
                  borderRadius: 14,
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.06)",
                  color: "#e2e8f0",
                  fontSize: 15,
                  outline: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                <option value="ROLE_CUSTOMER" style={{ background: "#1e293b" }}>
                  Customer
                </option>
                <option value="ROLE_ADMIN" style={{ background: "#1e293b" }}>
                  Admin
                </option>
              </select>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileTap={{ scale: 0.98 }}
                style={{
                  marginTop: 6,
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
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      style={{ display: "inline-block" }}
                    >
                      ⏳
                    </motion.span>
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <FiArrowRight />
                  </>
                )}
              </motion.button>
            </form>

            {/* Login link */}
            <div
              style={{
                marginTop: 24,
                textAlign: "center",
                color: "#94a3b8",
                fontSize: 14,
              }}
            >
              Already have an account?{" "}
              <Link
                to="/login"
                style={{
                  color: "#22c55e",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Sign in
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Register;
