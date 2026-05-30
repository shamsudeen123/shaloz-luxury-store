"use client";

import { useEffect, useRef, useState } from "react";
import cartierImage from "./images/cartier.jpeg";
import chanelImage from "./images/chanel.jpeg";
import hermesImage from "./images/hermes.jpeg";
import lvImage from "./images/lv.jpeg";
import rolexImage from "./images/rolex.jpeg";

const IMAGES = {
  cartier: cartierImage.src,
  chanel: chanelImage.src,
  hermes: hermesImage.src,
  lv: lvImage.src,
  rolex: rolexImage.src,
};

/* ─── Data ──────────────────────────────────────────────── */
const CATEGORIES = [
  {
    title: "Hermès",
    count: "Bags",
    image: IMAGES.hermes,
  },
  {
    title: "Louis Vuitton",
    count: "Bags",
    image: IMAGES.lv,
  },
  {
    title: "Chanel",
    count: "Dresses",
    image: IMAGES.chanel,
  },
  {
    title: "Rolex",
    count: "Watches",
    image: IMAGES.rolex,
  },
  {
    title: "Cartier",
    count: "Accessories",
    image: IMAGES.cartier,
  },
  {
    title: "Designer Edit",
    count: "Seasonal Picks",
    image: IMAGES.chanel,
  },
];

const PRODUCTS = [
  {
    name: "Hermès Birkin 30",
    category: "Bags",
    brand: "Hermès",
    badge: "Iconic",
    image: IMAGES.hermes,
  },
  {
    name: "Chanel Haute Couture Gown",
    category: "Dresses",
    brand: "Chanel",
    badge: "Exclusive",
    image: IMAGES.chanel,
  },
  {
    name: "Rolex Datejust 41",
    category: "Watches",
    brand: "Rolex",
    badge: "Prestige",
    image: IMAGES.rolex,
  },
  {
    name: "Louis Vuitton Capucines",
    category: "Bags",
    brand: "Louis Vuitton",
    badge: "New",
    image: IMAGES.lv,
  },
  {
    name: "Cartier Love Bracelet",
    category: "Accessories",
    brand: "Cartier",
    badge: "Limited",
    image: IMAGES.cartier,
  },
];

/* ─── useReveal Hook ────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );
    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ─── AnimatedCounter Component ─────────────────────────── */
function AnimatedCounter({ value, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const num = parseInt(value);
        let current = 0;
        const increment = Math.ceil(num / 50);
        const timer = setInterval(() => {
          current = Math.min(current + increment, num);
          setCount(current);
          if (current >= num) clearInterval(timer);
        }, 30);
        io.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [value]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── Page Component ────────────────────────────────────── */
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── Navbar ─────────────────────────────────────── */}
      <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <a href="#hero" className="navbar-logo">
          Shaloz <span>Luxury Store</span>
        </a>

        <nav className="navbar-nav" aria-label="Main navigation">
          {["About", "Categories", "Products", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}>
              {item}
            </a>
          ))}
        </nav>

        <a href="#contact" className="navbar-cta">
          Shop Now
        </a>

        <button
          className="hamburger"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            style={
              menuOpen
                ? { transform: "rotate(45deg) translate(4px, 4px)" }
                : {}
            }
          />
          <span style={menuOpen ? { opacity: 0 } : {}} />
          <span
            style={
              menuOpen
                ? { transform: "rotate(-45deg) translate(4px, -4px)" }
                : {}
            }
          />
        </button>
      </header>

      {/* ── Mobile Menu ────────────────────────────────── */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(10,10,10,0.97)",
            zIndex: 99,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "36px",
          }}
        >
          {["About", "Categories", "Products", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="mobile-menu-item"
            >
              {item}
            </a>
          ))}
        </div>
      )}

      <main>
        {/* ── Hero ──────────────────────────────────────── */}
        <section id="hero" className="hero">
          <div className="hero-content">
            <div className="hero-eyebrow">Luxury fashion house · Est. 2010</div>

            <h1 className="hero-title">
              Shaloz <em>Luxury Store</em>
            </h1>

            <p className="hero-tagline">
              Curated designer bags, watches, shoes, dresses, and accessories for a refined wardrobe.
            </p>

            <div className="hero-actions">
              <a href="#categories" className="btn btn-gold">
                <span>Explore Collection</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0l1.4 1.4L3.8 7H16v2H3.8l5.6 5.6L8 16 0 8z" transform="scale(-1,1) translate(-16,0)" />
                </svg>
              </a>
              <a href="#about" className="btn btn-outline">
                Our Story
              </a>
            </div>
          </div>

          <div className="hero-media" aria-hidden="true">
            <img
              src={IMAGES.hermes}
              alt=""
            />
            <div className="hero-card">
              <span>Private edit</span>
              <strong>200+ curated pieces</strong>
            </div>
          </div>
        </section>

        {/* ── About ─────────────────────────────────────── */}
        <section id="about" className="about">
          <div className="about-inner">
            {/* Visual */}
            <div className="about-visual reveal-left">
              <img
                src={IMAGES.chanel}
                alt="Shaloz Luxury Store"
              />
              <div className="about-frame" aria-hidden="true" />
            </div>

            {/* Text */}
            <div className="reveal-right">
              <span className="section-tag">Our Story</span>
              <h2 className="section-title align-left">
                Crafted for the<br />Discerning Few
              </h2>
              <div className="gold-line align-left" />
              <p>
                Born from a passion for unparalleled craftsmanship, Shaloz Luxury Store is a destination for those who regard fashion as art. Each piece in our curated edit is sourced from the world's finest ateliers — where heritage techniques meet contemporary vision.
              </p>
              <p>
                We believe luxury is not merely a price point — it is a commitment to quality, intention, and enduring elegance. Every stitch, every material, every silhouette is chosen with purpose.
              </p>

              <a href="#categories" className="btn btn-outline">
                Discover More
              </a>

              <div className="about-stats">
                {[
                  { value: "14", suffix: "+", label: "Years of Craft" },
                  { value: "200", suffix: "+", label: "Luxury Pieces" },
                  { value: "40", suffix: "+", label: "Countries Shipped" },
                ].map((s) => (
                  <div className="stat" key={s.label}>
                    <div className="stat-number">
                      <AnimatedCounter value={s.value} suffix={s.suffix} />
                    </div>
                    <div className="stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Categories ────────────────────────────────── */}
        <section id="categories" className="categories">
          <div className="categories-header">
            <span className="section-tag reveal">Shop By</span>
            <h2 className="section-title reveal delay-1">Our Collections</h2>
            <div className="gold-line reveal delay-2" />
            <p className="section-subtitle reveal delay-3">
              Five worlds of luxury, each telling its own story of elegance and desire.
            </p>
          </div>

          <div className="categories-grid">
            {CATEGORIES.map((cat, i) => (
              <div
                className={`category-card reveal delay-${i + 1}`}
                key={cat.title}
                role="button"
                tabIndex={0}
              >
                <div className="category-img">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s cubic-bezier(0.4,0,0.2,1)" }}
                  />
                </div>
                <div className="category-overlay">
                  <h3 className="category-title">{cat.title}</h3>
                  <span className="category-count">{cat.count}</span>
                </div>
                <div className="category-border" aria-hidden="true" />
              </div>
            ))}
          </div>
        </section>

        {/* ── Featured Products ──────────────────────────── */}
        <section id="products" className="products">
          <div className="products-header">
            <span className="section-tag reveal">Curated For You</span>
            <h2 className="section-title reveal delay-1">Luxury Brands</h2>
            <div className="gold-line reveal delay-2" />
            <p className="section-subtitle reveal delay-3">
              A carefully selected edit of our most coveted items this season.
            </p>
          </div>

          <div className="products-grid">
            {PRODUCTS.map((product, i) => (
              <div
                className={`product-card reveal delay-${(i % 6) + 1}`}
                key={product.name}
                role="button"
                tabIndex={0}
              >
                <div className="product-img-wrap">
                  <div className="product-img">
                    <img
                      src={product.image}
                      alt={product.name}
                    />
                  </div>
                  {product.badge && (
                    <span className="product-badge">{product.badge}</span>
                  )}
                  <button className="product-wishlist" aria-label="Add to wishlist">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>
                  <div className="product-quick-add">+ Quick Add</div>
                </div>

                <div className="product-category">{product.brand}</div>
                <h3 className="product-name">{product.name}</h3>
              </div>
            ))}
          </div>

          <a href="#contact" className="btn btn-gold">
            <span>View All Products</span>
          </a>
        </section>

        {/* ── Marquee Strip ─────────────────────────────── */}
        <div className="marquee-strip" aria-hidden="true">
          <div className="marquee-track">
            {[...Array(2)].map((_, rep) =>
              ["Hermès", "Chanel", "Louis Vuitton", "Rolex", "Cartier", "Dior", "Gucci", "Prada", "Valentino", "Versace"].map((b, i) => (
                <span key={`${rep}-${i}`}>{b} <span className="marquee-sep">✦</span> </span>
              ))
            )}
          </div>
        </div>

        {/* ── Contact ───────────────────────────────────── */}
        <section id="contact" className="contact">
          <div className="contact-header">
            <span className="section-tag reveal">Get In Touch</span>
            <h2 className="section-title reveal delay-1">We'd Love to Hear<br />From You</h2>
            <div className="gold-line reveal delay-2" />
          </div>

          <div className="contact-inner">
            <div className="contact-actions">
              <a href="tel:+919895792690" className="contact-email">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.16 6.16l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                +91 98957 92690
              </a>
              <a href="https://wa.me/919895792690" target="_blank" rel="noopener noreferrer" className="contact-email">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                WhatsApp: +91 98957 92690
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ────────────────────────────────────────── */}
      <footer className="footer">
        <div className="footer-top">
          <div>
            <div className="footer-logo">
              Shaloz <span>Luxury Store</span>
            </div>
            <div className="footer-tagline">Timeless Luxury &amp; Style</div>
          </div>

          <nav className="footer-links" aria-label="Footer navigation">
            {["About", "Categories", "Products", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`}>
                {item}
              </a>
            ))}
          </nav>

          <div className="footer-social">
            {/* Instagram */}
            <a href="#" className="social-link" aria-label="Follow us on Instagram" onClick={(e) => e.preventDefault()}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            {/* Facebook */}
            <a href="#" className="social-link" aria-label="Follow us on Facebook" onClick={(e) => e.preventDefault()}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            {/* Pinterest */}
            <a href="#" className="social-link" aria-label="Follow us on Pinterest" onClick={(e) => e.preventDefault()}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.04-2.83.18-.77 1.22-5.17 1.22-5.17s-.31-.62-.31-1.55c0-1.45.84-2.54 1.89-2.54.89 0 1.32.67 1.32 1.47 0 .9-.57 2.24-.87 3.49-.25 1.04.52 1.88 1.54 1.88 1.85 0 3.27-1.95 3.27-4.76 0-2.49-1.79-4.23-4.34-4.23-2.96 0-4.7 2.22-4.7 4.51 0 .89.34 1.85.77 2.37.08.1.09.19.07.29-.08.32-.25 1.04-.29 1.18-.05.19-.16.23-.38.14-1.39-.65-2.26-2.68-2.26-4.32 0-3.51 2.55-6.74 7.35-6.74 3.86 0 6.86 2.75 6.86 6.42 0 3.83-2.41 6.91-5.76 6.91-1.13 0-2.18-.59-2.54-1.28l-.69 2.58c-.25.96-.93 2.17-1.39 2.9.82.26 1.69.4 2.59.4 5.52 0 10-4.48 10-10S17.52 2 12 2z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} <span>Shaloz Luxury Store</span>. All rights reserved.
          </p>
          <p className="footer-copy">
            Privacy Policy &nbsp;·&nbsp; Terms of Service
          </p>
        </div>
      </footer>
    </>
  );
}
