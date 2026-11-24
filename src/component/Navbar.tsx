import { useContext, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiBell,
  FiChevronDown,
  FiClock,
  FiGrid,
  FiHeart,
  FiHome,
  FiLogIn,
  FiLogOut,
  FiMapPin,
  FiMenu,
  FiMic,
  FiMoon,
  FiPackage,
  FiSearch,
  FiShoppingBag,
  FiUser,
} from "react-icons/fi";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import CartBadge from "./CartBadge";
import CartDrawer from "./CartDrawer";
import LogoutModal from "./LogoutModal";
import { storeCategories, quickSearchPills, recentSearchKey, trendingSearches } from "./data/StoreData";
import { CartContext } from "../contextapi/CartContext";
import type { LoggedInUser } from "../interfaces/LoginRequest";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [, setSearchParams] = useSearchParams();
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useContext(CartContext);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const loggedInUser: LoggedInUser | null = (() => {
    try {
      const userJson = localStorage.getItem("loggedInUser");
      return userJson ? JSON.parse(userJson) : null;
    } catch {
      return null;
    }
  })();

  const recentSearches = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem(recentSearchKey) || "[]") as string[];
    } catch {
      return [] as string[];
    }
  }, [searchOpen]);

  const totalQuantity = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const navItems = [
    { to: "/", label: "Home", icon: FiHome },
    { to: "/veg", label: "Veg", icon: FiGrid },
    { to: "/nonveg", label: "Non Veg", icon: FiShoppingBag },
    { to: "/orders", label: "Orders", icon: FiPackage, protected: true },
    { to: "/profile", label: "Profile", icon: FiUser, protected: true },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const submitSearch = (value: string) => {
    const query = value.trim();
    if (!query) return;

    try {
      const current = JSON.parse(localStorage.getItem(recentSearchKey) || "[]") as string[];
      const next = [query, ...current.filter((item) => item.toLowerCase() !== query.toLowerCase())].slice(0, 8);
      localStorage.setItem(recentSearchKey, JSON.stringify(next));
    } catch {
      localStorage.setItem(recentSearchKey, JSON.stringify([query]));
    }

    setSearchParams({ q: query });
    navigate(`/?q=${encodeURIComponent(query)}`);
    setSearchOpen(false);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("rememberMe");
    setLogoutModalOpen(false);

    toast.success("Logged out successfully 👋", {
      position: "top-right",
      style: {
        background: "#f0fdf4",
        color: "#16a34a",
        borderRadius: 12,
        border: "1px solid #bbf7d0",
      },
    });

    navigate("/login");
  };

  const isLoggedIn = !!loggedInUser;
  const userInitial = loggedInUser?.name?.charAt(0).toUpperCase() || "U";
  const activePath = location.pathname;

  return (
    <>
      <motion.header
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          background: scrolled ? "rgba(255,255,255,0.94)" : "rgba(255,255,255,0.88)",
          backdropFilter: "blur(18px)",
          boxShadow: scrolled ? "0 18px 50px rgba(15,23,42,0.12)" : "0 10px 35px rgba(15,23,42,0.06)",
          borderBottom: "1px solid rgba(15,23,42,0.06)",
        }}
      >
        <div style={{ background: "linear-gradient(90deg, #111827, #1f2937, #111827)", color: "white", padding: "10px 20px" }}>
          <div style={{ maxWidth: 1440, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <span style={{ fontWeight: 700, fontSize: 13 }}>🚀 Free Delivery above ₹199</span>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", color: "rgba(255,255,255,0.8)", fontSize: 12 }}>
              <span>20 min delivery</span>
              <span>Fresh stock daily</span>
              <span>Secure checkout</span>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "14px 20px 10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, justifyContent: "space-between", flexWrap: "wrap" }}>
            <Link to="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
              <div style={{ width: 44, height: 44, borderRadius: 16, background: "linear-gradient(135deg, #fde68a, #f59e0b 55%, #16a34a)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 24px rgba(245,158,11,0.25)" }}>
                <span style={{ fontSize: 22 }}>🍋</span>
              </div>
              <div>
                <div style={{ color: "#0f172a", fontWeight: 900, fontSize: 20, lineHeight: 1 }}>FreshCart</div>
                <div style={{ color: "#64748b", fontSize: 12 }}>Blinkit-inspired grocery store</div>
              </div>
            </Link>

            <div style={{ display: "flex", alignItems: "center", gap: 14, flex: 1, minWidth: 280, justifyContent: "flex-end", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 18, background: "#fff7cc", border: "1px solid rgba(245,158,11,0.18)", color: "#92400e", minWidth: 180 }}>
                <FiMapPin />
                <div>
                  <div style={{ fontSize: 11, opacity: 0.72 }}>Deliver to</div>
                  <div style={{ fontWeight: 800, fontSize: 13 }}>Hyderabad, Telangana</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 18, background: "white", border: "1px solid rgba(15,23,42,0.08)", color: "#0f172a" }}>
                <FiClock />
                <div>
                  <div style={{ fontSize: 11, color: "#64748b" }}>Delivery in</div>
                  <div style={{ fontWeight: 800, fontSize: 13 }}>18 mins</div>
                </div>
              </div>

              <motion.div style={{ position: "relative", flex: "1 1 340px", maxWidth: 560, minWidth: 260 }} animate={{ scale: searchOpen ? 1.01 : 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, borderRadius: 18, padding: "10px 14px", background: "white", border: searchOpen ? "1px solid rgba(22,163,74,0.5)" : "1px solid rgba(15,23,42,0.08)", boxShadow: searchOpen ? "0 16px 35px rgba(22,163,74,0.12)" : "none" }}>
                  <FiSearch color="#64748b" />
                  <input
                    value={searchValue}
                    onChange={(event) => setSearchValue(event.target.value)}
                    onFocus={() => setSearchOpen(true)}
                    onBlur={() => setTimeout(() => setSearchOpen(false), 160)}
                    onKeyDown={(event) => event.key === "Enter" && submitSearch(searchValue)}
                    placeholder="Search fruits, milk, snacks, meals..."
                    style={{ flex: 1, border: "none", outline: "none", fontSize: 14, background: "transparent", color: "#0f172a" }}
                  />
                  <button onClick={() => submitSearch(searchValue)} type="button" style={{ border: "none", background: "linear-gradient(135deg, #fde68a, #f59e0b)", color: "#111827", width: 36, height: 36, borderRadius: 12, cursor: "pointer" }}>
                    <FiMic />
                  </button>
                </div>

                <AnimatePresence>
                  {searchOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      style={{ position: "absolute", top: 58, left: 0, right: 0, background: "white", borderRadius: 20, boxShadow: "0 24px 50px rgba(15,23,42,0.12)", border: "1px solid rgba(15,23,42,0.06)", overflow: "hidden" }}
                    >
                      <div style={{ padding: 14, borderBottom: "1px solid #eef2f7" }}>
                        <div style={{ fontSize: 12, fontWeight: 800, color: "#64748b", marginBottom: 10 }}>Recent searches</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                          {(recentSearches.length ? recentSearches : quickSearchPills).slice(0, 6).map((item) => (
                            <button key={item} type="button" onMouseDown={() => submitSearch(item)} style={{ border: "none", background: "#f8fafc", color: "#0f172a", padding: "8px 12px", borderRadius: 999, cursor: "pointer", fontWeight: 700, fontSize: 12 }}>
                              {item}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div style={{ padding: 14 }}>
                        <div style={{ fontSize: 12, fontWeight: 800, color: "#64748b", marginBottom: 10 }}>Trending</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                          {trendingSearches.map((item) => (
                            <button key={item} type="button" onMouseDown={() => submitSearch(item)} style={{ border: "1px solid rgba(245,158,11,0.16)", background: "#fffaf0", color: "#9a3412", padding: "8px 12px", borderRadius: 999, cursor: "pointer", fontWeight: 700, fontSize: 12 }}>
                              {item}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <button type="button" onClick={() => setDarkMode((value) => !value)} style={{ border: "1px solid rgba(15,23,42,0.08)", background: darkMode ? "#111827" : "white", color: darkMode ? "#f9fafb" : "#0f172a", width: 44, height: 44, borderRadius: 16, cursor: "pointer" }} aria-label="Toggle dark mode UI">
                <FiMoon />
              </button>

              <button type="button" onClick={() => toast.info("Wishlist UI coming soon", { position: "top-right" })} style={{ border: "1px solid rgba(15,23,42,0.08)", background: "white", color: "#0f172a", width: 44, height: 44, borderRadius: 16, cursor: "pointer" }}>
                <FiHeart />
              </button>

              <button type="button" onClick={() => toast.info("Notifications center UI coming soon", { position: "top-right" })} style={{ border: "1px solid rgba(15,23,42,0.08)", background: "white", color: "#0f172a", width: 44, height: 44, borderRadius: 16, cursor: "pointer" }}>
                <FiBell />
              </button>

              <button type="button" onClick={() => navigate("/orders")} style={{ border: "1px solid rgba(15,23,42,0.08)", background: "white", color: "#0f172a", width: 44, height: 44, borderRadius: 16, cursor: "pointer" }}>
                <FiPackage />
              </button>

              <CartBadge count={totalQuantity} onClick={() => setDrawerOpen(true)} />

              {isLoggedIn ? (
                <div style={{ position: "relative" }}>
                  <button type="button" onClick={() => setMobileMenuOpen((value) => !value)} style={{ border: "1px solid rgba(15,23,42,0.08)", background: "white", color: "#0f172a", padding: "8px 12px 8px 8px", borderRadius: 999, cursor: "pointer", display: "flex", alignItems: "center", gap: 10, boxShadow: "0 8px 20px rgba(15,23,42,0.06)" }}>
                    <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg, #fde68a, #f59e0b)", color: "#111827", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900 }}>{userInitial}</div>
                    <div style={{ textAlign: "left", lineHeight: 1.1 }}>
                      <div style={{ fontSize: 11, color: "#64748b" }}>Welcome</div>
                      <div style={{ fontWeight: 800, fontSize: 13 }}>{loggedInUser?.name || "User"}</div>
                    </div>
                    <FiChevronDown />
                  </button>

                  <AnimatePresence>
                    {mobileMenuOpen && (
                      <motion.div initial={{ opacity: 0, y: -8, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.98 }} style={{ position: "absolute", right: 0, top: 54, width: 240, background: "white", borderRadius: 20, boxShadow: "0 24px 50px rgba(15,23,42,0.14)", border: "1px solid rgba(15,23,42,0.06)", overflow: "hidden" }}>
                        <Link to="/profile" onClick={() => setMobileMenuOpen(false)} style={{ display: "flex", alignItems: "center", gap: 12, padding: 14, textDecoration: "none", color: "#0f172a", borderBottom: "1px solid #eef2f7" }}>
                          <FiUser /> Profile
                        </Link>
                        <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} style={{ display: isLoggedIn ? "flex" : "none", alignItems: "center", gap: 12, padding: 14, textDecoration: "none", color: "#0f172a", borderBottom: "1px solid #eef2f7" }}>
                          <FiGrid /> Dashboard
                        </Link>
                        <button type="button" onClick={() => { setMobileMenuOpen(false); setLogoutModalOpen(true); }} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: 14, border: "none", background: "white", color: "#dc2626", textAlign: "left", cursor: "pointer" }}>
                          <FiLogOut /> Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div style={{ display: "flex", gap: 10 }}>
                  <Link to="/login" style={{ textDecoration: "none", color: "#0f172a", background: "white", border: "1px solid rgba(15,23,42,0.08)", padding: "11px 16px", borderRadius: 999, fontWeight: 800, display: "flex", alignItems: "center", gap: 8 }}>
                    <FiLogIn /> Login
                  </Link>
                  <Link to="/register" style={{ textDecoration: "none", color: "#111827", background: "linear-gradient(135deg, #fde68a, #f59e0b)", padding: "11px 16px", borderRadius: 999, fontWeight: 900, display: "flex", alignItems: "center", gap: 8 }}>
                    <FiUser /> Sign Up
                  </Link>
                </div>
              )}

              <button type="button" onClick={() => setMobileMenuOpen((value) => !value)} style={{ display: "none" }} aria-label="Open menu">
                <FiMenu />
              </button>
            </div>
          </div>

          <div style={{ marginTop: 14, display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4 }}>
            {navItems.map((item) => {
              const active = activePath === item.to;
              const Icon = item.icon;

              if (item.protected && !isLoggedIn) {
                return null;
              }

              return (
                <Link key={item.to} to={item.to} style={{ textDecoration: "none", color: active ? "#111827" : "#475569", background: active ? "linear-gradient(135deg, #fef3c7, #fde68a)" : "white", border: active ? "1px solid rgba(245,158,11,0.2)" : "1px solid rgba(15,23,42,0.08)", padding: "10px 14px", borderRadius: 999, fontWeight: 800, whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 8, boxShadow: active ? "0 14px 24px rgba(245,158,11,0.12)" : "none" }}>
                  <Icon />
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div style={{ marginTop: 12, display: "flex", gap: 10, overflowX: "auto", paddingBottom: 2 }}>
            {storeCategories.slice(0, 12).map((category) => (
              <Link key={category.slug} to={`/?q=${encodeURIComponent(category.label)}`} style={{ textDecoration: "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 999, background: "#f8fafc", border: "1px solid rgba(15,23,42,0.06)", color: "#0f172a", whiteSpace: "nowrap" }}>
                  <category.icon color={category.accent} />
                  <span style={{ fontSize: 13, fontWeight: 700 }}>{category.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </motion.header>

      {/* Cart Drawer */}

      <CartDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        items={cart}
        onIncrease={increaseQuantity}
        onDecrease={decreaseQuantity}
        onRemove={removeFromCart}
        onClear={clearCart}
        onContinue={() => setDrawerOpen(false)}
      />

      {/* Logout Modal */}

      <LogoutModal
        open={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onLogout={handleLogout}
      />
    </>
  );
};

export default Navbar;