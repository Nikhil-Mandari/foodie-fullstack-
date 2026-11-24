import { useContext, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowLeft, FiArrowRight, FiClock, FiShield, FiTruck } from "react-icons/fi";
import { useSearchParams, Link } from "react-router-dom";
import ProductCard from "../component/ProductCard";
import { featuredCollections, heroSlides, productHighlights, quickSearchPills, storeCategories, storeProducts } from "../component/data/StoreData";
import { CartContext } from "../contextapi/CartContext";

const Home = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.trim().toLowerCase() || "";
  const [slideIndex, setSlideIndex] = useState(0);
  const [activeCollection, setActiveCollection] = useState(featuredCollections[0].title);
  const { cart, addToCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSlideIndex((value) => (value + 1) % heroSlides.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  const filteredProducts = useMemo(() => {
    if (!query) {
      return storeProducts;
    }

    return storeProducts.filter((product) => {
      const haystack = `${product.name} ${product.description} ${product.category} ${product.badge}`.toLowerCase();
      return haystack.includes(query);
    });
  }, [query]);

  const visibleCollections = query
    ? [
        {
          title: `Search results for "${query}"`,
          subtitle: `${filteredProducts.length} matching items found`,
          products: filteredProducts,
        },
      ]
    : featuredCollections;

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #fffbe6 0%, #f8fafc 20%, #eefbf3 56%, #f6f7fb 100%)", paddingBottom: 60 }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "24px 20px 0" }}>
        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ position: "relative", overflow: "hidden", borderRadius: 32, minHeight: 420, background: heroSlides[slideIndex].accent, boxShadow: "0 30px 60px rgba(15,23,42,0.14)" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(120deg, rgba(255,255,255,0.12), rgba(15,23,42,0.18))" }} />
          <div style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, padding: 28, alignItems: "center" }}>
            <div style={{ color: "white" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 999, background: "rgba(255,255,255,0.16)", backdropFilter: "blur(10px)", fontWeight: 800, fontSize: 13 }}>
                <FiShield /> {heroSlides[slideIndex].helper}
              </div>
              <h1 style={{ margin: "18px 0 10px", fontSize: "clamp(32px, 5vw, 58px)", lineHeight: 1.02, maxWidth: 660 }}>{heroSlides[slideIndex].title}</h1>
              <p style={{ margin: 0, maxWidth: 560, fontSize: 16, lineHeight: 1.7, opacity: 0.92 }}>{heroSlides[slideIndex].description}</p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
                <Link to="/veg" style={{ textDecoration: "none" }}>
                  <button style={{ border: "none", padding: "14px 20px", borderRadius: 16, background: "white", color: "#111827", fontWeight: 900, cursor: "pointer", boxShadow: "0 16px 30px rgba(0,0,0,0.12)" }}>{heroSlides[slideIndex].cta}</button>
                </Link>
                <Link to="/nonveg" style={{ textDecoration: "none" }}>
                  <button style={{ border: "1px solid rgba(255,255,255,0.3)", padding: "14px 20px", borderRadius: 16, background: "rgba(255,255,255,0.14)", color: "white", fontWeight: 900, cursor: "pointer", backdropFilter: "blur(10px)" }}>Explore Non Veg</button>
                </Link>
              </div>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 24 }}>
                {productHighlights.map((highlight) => (
                  <div key={highlight} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 999, background: "rgba(255,255,255,0.14)", backdropFilter: "blur(10px)", fontSize: 13, fontWeight: 700 }}>
                    <FiTruck /> {highlight}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "grid", gap: 16 }}>
              <motion.div initial={{ scale: 0.98 }} animate={{ scale: 1 }} transition={{ duration: 0.4 }} style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(18px)", borderRadius: 28, padding: 16, border: "1px solid rgba(255,255,255,0.22)" }}>
                <img src={heroSlides[slideIndex].image} alt={heroSlides[slideIndex].title} loading="lazy" style={{ width: "100%", height: 280, objectFit: "cover", borderRadius: 22 }} />
              </motion.div>
            </div>
          </div>

          <button onClick={() => setSlideIndex((value) => (value - 1 + heroSlides.length) % heroSlides.length)} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", width: 44, height: 44, borderRadius: 16, border: "none", background: "rgba(255,255,255,0.92)", color: "#111827", cursor: "pointer" }}>
            <FiArrowLeft />
          </button>
          <button onClick={() => setSlideIndex((value) => (value + 1) % heroSlides.length)} style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", width: 44, height: 44, borderRadius: 16, border: "none", background: "rgba(255,255,255,0.92)", color: "#111827", cursor: "pointer" }}>
            <FiArrowRight />
          </button>

          <div style={{ position: "absolute", left: 28, bottom: 22, display: "flex", gap: 10 }}>
            {heroSlides.map((_, index) => (
              <button key={index} type="button" onClick={() => setSlideIndex(index)} style={{ width: slideIndex === index ? 28 : 10, height: 10, borderRadius: 999, border: "none", background: slideIndex === index ? "white" : "rgba(255,255,255,0.5)", cursor: "pointer" }} />
            ))}
          </div>
        </motion.section>

        <section style={{ marginTop: 30 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: 16, flexWrap: "wrap", marginBottom: 16 }}>
            <div>
              <div style={{ color: "#16a34a", fontWeight: 900, fontSize: 13, letterSpacing: 1, textTransform: "uppercase" }}>Categories</div>
              <h2 style={{ margin: "8px 0 0", fontSize: 28, color: "#0f172a" }}>Shop by mood, meal, or pantry need</h2>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {quickSearchPills.map((item) => (
                <Link key={item} to={`/?q=${encodeURIComponent(item)}`} style={{ textDecoration: "none", color: "#111827" }}>
                  <div style={{ padding: "9px 12px", borderRadius: 999, background: "white", border: "1px solid rgba(15,23,42,0.08)", fontSize: 13, fontWeight: 800 }}>{item}</div>
                </Link>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 14 }}>
            {storeCategories.map((category) => {
              const Icon = category.icon;

              return (
                <motion.div key={category.slug} whileHover={{ y: -4, scale: 1.02 }} style={{ background: "white", borderRadius: 24, padding: 16, border: "1px solid rgba(15,23,42,0.06)", boxShadow: "0 16px 30px rgba(15,23,42,0.06)", textAlign: "center" }}>
                  <div style={{ width: 62, height: 62, borderRadius: "50%", margin: "0 auto 12px", background: `linear-gradient(135deg, ${category.accent}22, ${category.accent}44)`, display: "flex", alignItems: "center", justifyContent: "center", color: category.accent }}>
                    <Icon size={28} />
                  </div>
                  <div style={{ fontWeight: 900, color: "#0f172a", fontSize: 14 }}>{category.label}</div>
                  <div style={{ color: "#64748b", fontSize: 12, marginTop: 6 }}>{category.description}</div>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section style={{ marginTop: 32 }}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
            {featuredCollections.map((collection) => (
              <button key={collection.title} type="button" onClick={() => setActiveCollection(collection.title)} style={{ border: activeCollection === collection.title ? "1px solid rgba(22,163,74,0.24)" : "1px solid rgba(15,23,42,0.08)", background: activeCollection === collection.title ? "linear-gradient(135deg, #ecfdf5, #d1fae5)" : "white", color: "#0f172a", padding: "11px 16px", borderRadius: 999, fontWeight: 900, cursor: "pointer" }}>
                {collection.title}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {visibleCollections.map((collection) => (
              <motion.div key={collection.title} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} style={{ marginBottom: 32 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: 16, flexWrap: "wrap", marginBottom: 16 }}>
                  <div>
                    <h2 style={{ margin: 0, fontSize: 28, color: "#0f172a" }}>{collection.title}</h2>
                    <p style={{ margin: "6px 0 0", color: "#64748b" }}>{collection.subtitle}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#16a34a", fontWeight: 800 }}>
                    <FiClock /> Fast delivery in every section
                  </div>
                </div>

                {collection.products.length === 0 ? (
                  <div style={{ background: "white", borderRadius: 26, border: "1px solid rgba(15,23,42,0.08)", padding: 30, textAlign: "center", color: "#64748b" }}>
                    No products matched your search.
                  </div>
                ) : (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 20 }}>
                    {collection.products.slice(0, activeCollection === collection.title ? 12 : 8).map((product) => {
                      const quantity = cart.find((entry) => entry.id === product.id)?.quantity ?? 0;

                      return (
                      <ProductCard
                        key={product.id}
                        product={product}
                        quantity={quantity}
                        onAdd={() => addToCart(product)}
                        onIncrease={() => increaseQuantity(product.id)}
                        onDecrease={() => decreaseQuantity(product.id)}
                      />
                      );
                    })}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </section>
      </div>
    </div>
  );
};

export default Home;