import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle, FiLogOut, FiX } from "react-icons/fi";

interface LogoutModalProps {
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const LogoutModal = ({ open, onClose, onLogout }: LogoutModalProps) => {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(15, 23, 42, 0.6)",
              backdropFilter: "blur(8px)",
              zIndex: 2000,
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "white",
              borderRadius: 24,
              padding: 36,
              maxWidth: 400,
              width: "90%",
              zIndex: 2100,
              boxShadow: "0 25px 60px rgba(15, 23, 42, 0.3)",
              textAlign: "center",
            }}
          >
            <button
              onClick={onClose}
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                border: "none",
                background: "#f3f4f6",
                width: 36,
                height: 36,
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FiX size={18} />
            </button>

            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "#fef2f2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
                color: "#ef4444",
              }}
            >
              <FiAlertCircle size={32} />
            </div>

            <h2 style={{ margin: "0 0 8px", color: "#111827", fontSize: 22 }}>
              Confirm Logout
            </h2>
            <p style={{ margin: "0 0 28px", color: "#6b7280", fontSize: 15 }}>
              Are you sure you want to log out? You'll need to sign in again to access your account.
            </p>

            <div style={{ display: "flex", gap: 12 }}>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={onClose}
                style={{
                  flex: 1,
                  padding: "12px 20px",
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
                whileTap={{ scale: 0.97 }}
                onClick={onLogout}
                style={{
                  flex: 1,
                  padding: "12px 20px",
                  borderRadius: 12,
                  border: "none",
                  background: "linear-gradient(135deg, #ef4444, #dc2626)",
                  color: "white",
                  fontWeight: 700,
                  cursor: "pointer",
                  fontSize: 15,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  boxShadow: "0 10px 24px rgba(220, 38, 38, 0.2)",
                }}
              >
                <FiLogOut />
                Logout
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LogoutModal;
