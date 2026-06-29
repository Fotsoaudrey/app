import { useState, useEffect, useRef } from "react";

// ─── Google Fonts ───────────────────────────────────────────────────────────
const FontLink = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Outfit:wght@300;400;500;600&display=swap');

    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }

    :root {
      --gold: #C9A84C;
      --gold-light: #E8C96D;
      --dark: #0B0B0B;
      --dark-2: #141414;
      --dark-3: #1E1E1E;
      --cream: #F5F0E8;
      --text-muted: #888;
      --white: #FFFFFF;
    }

    body {
      background: var(--dark);
      color: var(--white);
      font-family: 'Outfit', sans-serif;
      overflow-x: hidden;
    }

    .playfair { font-family: 'Playfair Display', serif; }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--dark); }
    ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 2px; }

    /* Navbar */
    .navbar {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      padding: 20px 60px;
      display: flex; align-items: center; justify-content: space-between;
      transition: all 0.4s ease;
    }
    .navbar.scrolled {
      background: rgba(11,11,11,0.95);
      backdrop-filter: blur(20px);
      padding: 14px 60px;
      border-bottom: 1px solid rgba(201,168,76,0.15);
    }
    .nav-logo { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 900; letter-spacing: 2px; color: var(--gold); text-decoration: none; }
    .nav-logo span { color: var(--white); }
    .nav-links { display: flex; gap: 36px; list-style: none; }
    .nav-links a { color: rgba(255,255,255,0.75); text-decoration: none; font-size: 0.85rem; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; transition: color 0.3s; position: relative; }
    .nav-links a::after { content: ''; position: absolute; bottom: -4px; left: 0; width: 0; height: 1px; background: var(--gold); transition: width 0.3s; }
    .nav-links a:hover { color: var(--gold); }
    .nav-links a:hover::after { width: 100%; }
    .nav-cta { background: var(--gold); color: var(--dark); padding: 10px 24px; border-radius: 2px; font-size: 0.8rem; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; text-decoration: none; transition: all 0.3s; }
    .nav-cta:hover { background: var(--gold-light); transform: translateY(-1px); }

    /* Hero */
    .hero {
      position: relative; height: 100vh; display: flex; align-items: center;
      overflow: hidden;
    }
    .hero-bg {
      position: absolute; inset: 0;
      background: linear-gradient(135deg, #0B0B0B 0%, #1a1208 50%, #0B0B0B 100%);
    }
    .hero-bg::before {
      content: '';
      position: absolute; inset: 0;
      background-image:
        radial-gradient(ellipse 80% 60% at 60% 40%, rgba(201,168,76,0.08) 0%, transparent 70%),
        url("https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600&q=80");
      background-size: cover; background-position: center;
      opacity: 0.35;
    }
    .hero-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(to right, rgba(11,11,11,0.92) 40%, rgba(11,11,11,0.4) 100%);
    }
    .hero-content { position: relative; padding: 0 60px; max-width: 700px; animation: fadeUp 1s ease both; }
    .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(201,168,76,0.12); border: 1px solid rgba(201,168,76,0.3); padding: 6px 16px; border-radius: 40px; font-size: 0.75rem; letter-spacing: 2px; text-transform: uppercase; color: var(--gold); margin-bottom: 28px; }
    .hero-badge span { width: 6px; height: 6px; border-radius: 50%; background: var(--gold); animation: pulse 2s infinite; }
    .hero-title { font-family: 'Playfair Display', serif; font-size: clamp(3rem, 6vw, 5.5rem); line-height: 1.05; font-weight: 900; margin-bottom: 24px; }
    .hero-title em { font-style: italic; color: var(--gold); }
    .hero-sub { color: rgba(255,255,255,0.6); font-size: 1.1rem; line-height: 1.7; margin-bottom: 44px; max-width: 480px; font-weight: 300; }
    .hero-btns { display: flex; gap: 16px; flex-wrap: wrap; }
    .btn-primary { background: var(--gold); color: var(--dark); padding: 14px 36px; font-size: 0.85rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; border-radius: 2px; text-decoration: none; transition: all 0.3s; }
    .btn-primary:hover { background: var(--gold-light); transform: translateY(-2px); box-shadow: 0 10px 30px rgba(201,168,76,0.3); }
    .btn-outline { border: 1px solid rgba(255,255,255,0.3); color: var(--white); padding: 14px 36px; font-size: 0.85rem; font-weight: 500; letter-spacing: 2px; text-transform: uppercase; border-radius: 2px; text-decoration: none; transition: all 0.3s; }
    .btn-outline:hover { border-color: var(--gold); color: var(--gold); }
    .hero-stats { position: absolute; right: 60px; bottom: 80px; display: flex; gap: 48px; animation: fadeUp 1s ease 0.4s both; }
    .stat-item { text-align: center; }
    .stat-num { font-family: 'Playfair Display', serif; font-size: 2.8rem; font-weight: 900; color: var(--gold); line-height: 1; }
    .stat-label { font-size: 0.7rem; letter-spacing: 2px; text-transform: uppercase; color: var(--text-muted); margin-top: 4px; }
    .hero-scroll { position: absolute; bottom: 36px; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 8px; animation: fadeUp 1s ease 0.8s both; }
    .scroll-line { width: 1px; height: 50px; background: linear-gradient(to bottom, var(--gold), transparent); animation: scrollAnim 2s ease infinite; }
    .scroll-text { font-size: 0.65rem; letter-spacing: 3px; text-transform: uppercase; color: var(--text-muted); }

    /* Section common */
    section { padding: 120px 60px; }
    .section-tag { display: inline-block; font-size: 0.7rem; letter-spacing: 3px; text-transform: uppercase; color: var(--gold); margin-bottom: 16px; }
    .section-title { font-family: 'Playfair Display', serif; font-size: clamp(2.2rem, 4vw, 3.5rem); font-weight: 900; line-height: 1.15; }
    .section-title em { font-style: italic; color: var(--gold); }
    .gold-line { width: 60px; height: 2px; background: var(--gold); margin: 24px 0; }

    /* Profile */
    .profile-section { background: var(--dark-2); }
    .profile-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; max-width: 1200px; margin: 0 auto; }
    .profile-img-wrap { position: relative; }
    .profile-img-wrap img { width: 100%; height: 560px; object-fit: cover; border-radius: 4px; display: block; }
    .profile-img-wrap::before {
      content: ''; position: absolute; top: -20px; left: -20px; right: 20px; bottom: 20px;
      border: 1px solid rgba(201,168,76,0.3); border-radius: 4px; z-index: 0;
    }
    .profile-img-wrap img { position: relative; z-index: 1; }
    .profile-badge-img { position: absolute; bottom: -24px; right: -24px; z-index: 2; background: var(--gold); padding: 20px 28px; border-radius: 4px; text-align: center; }
    .profile-badge-img strong { display: block; font-family: 'Playfair Display', serif; font-size: 2rem; font-weight: 900; color: var(--dark); line-height: 1; }
    .profile-badge-img span { font-size: 0.65rem; letter-spacing: 2px; text-transform: uppercase; color: var(--dark); opacity: 0.7; }
    .profile-text p { color: rgba(255,255,255,0.65); line-height: 1.8; margin-bottom: 20px; font-weight: 300; }
    .profile-features { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 36px; }
    .feat-item { display: flex; align-items: center; gap: 10px; font-size: 0.85rem; color: rgba(255,255,255,0.75); }
    .feat-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--gold); flex-shrink: 0; }

    /* Services */
    .services-section { background: var(--dark); }
    .services-header { max-width: 1200px; margin: 0 auto 60px; }
    .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; max-width: 1200px; margin: 0 auto; }
    .service-card {
      background: var(--dark-3); padding: 48px 36px;
      position: relative; overflow: hidden; cursor: pointer;
      transition: all 0.4s ease;
      border-bottom: 2px solid transparent;
    }
    .service-card::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(201,168,76,0.06) 0%, transparent 60%); opacity: 0; transition: opacity 0.4s; }
    .service-card:hover { background: #222; border-bottom-color: var(--gold); }
    .service-card:hover::before { opacity: 1; }
    .service-icon { font-size: 2.5rem; margin-bottom: 20px; }
    .service-num { position: absolute; top: 28px; right: 28px; font-family: 'Playfair Display', serif; font-size: 3.5rem; font-weight: 900; color: rgba(201,168,76,0.06); line-height: 1; }
    .service-card h3 { font-family: 'Playfair Display', serif; font-size: 1.3rem; font-weight: 700; margin-bottom: 12px; }
    .service-card p { color: rgba(255,255,255,0.5); font-size: 0.9rem; line-height: 1.7; font-weight: 300; }
    .service-price { margin-top: 24px; display: inline-block; font-size: 0.75rem; letter-spacing: 1.5px; text-transform: uppercase; color: var(--gold); border: 1px solid rgba(201,168,76,0.3); padding: 6px 14px; border-radius: 2px; }

    /* Why choose us */
    .why-section { background: var(--dark-2); }
    .why-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; max-width: 1200px; margin: 0 auto; }
    .why-img { position: relative; }
    .why-img img { width: 100%; height: 600px; object-fit: cover; border-radius: 4px; }
    .why-img-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(11,11,11,0.8) 0%, transparent 50%); border-radius: 4px; }
    .why-cards { display: grid; gap: 20px; }
    .why-card { display: flex; gap: 20px; padding: 28px; background: var(--dark-3); border-radius: 4px; border-left: 3px solid transparent; transition: all 0.3s; }
    .why-card:hover { border-left-color: var(--gold); background: #222; transform: translateX(4px); }
    .why-icon-wrap { width: 48px; height: 48px; border-radius: 4px; background: rgba(201,168,76,0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 1.3rem; }
    .why-card h4 { font-family: 'Playfair Display', serif; font-size: 1.05rem; font-weight: 700; margin-bottom: 6px; }
    .why-card p { color: rgba(255,255,255,0.5); font-size: 0.85rem; line-height: 1.6; font-weight: 300; }

    /* Testimonials */
    .testi-section { background: var(--dark); }
    .testi-header { max-width: 1200px; margin: 0 auto 60px; text-align: center; }
    .testi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; max-width: 1200px; margin: 0 auto; }
    .testi-card { background: var(--dark-3); padding: 40px 32px; border-radius: 4px; position: relative; transition: transform 0.3s; }
    .testi-card:hover { transform: translateY(-6px); }
    .testi-quote { font-size: 4rem; font-family: 'Playfair Display', serif; color: var(--gold); opacity: 0.3; line-height: 0.5; margin-bottom: 24px; display: block; }
    .testi-text { color: rgba(255,255,255,0.7); font-size: 0.95rem; line-height: 1.75; font-weight: 300; font-style: italic; margin-bottom: 28px; }
    .testi-author { display: flex; align-items: center; gap: 14px; }
    .testi-avatar { width: 46px; height: 46px; border-radius: 50%; background: var(--gold); display: flex; align-items: center; justify-content: center; font-family: 'Playfair Display', serif; font-weight: 900; font-size: 1rem; color: var(--dark); flex-shrink: 0; }
    .testi-name { font-weight: 600; font-size: 0.9rem; }
    .testi-role { font-size: 0.75rem; color: var(--text-muted); }
    .testi-stars { color: var(--gold); font-size: 0.75rem; margin-top: 2px; }

    /* Footer */
    footer { background: #080808; border-top: 1px solid rgba(201,168,76,0.15); padding: 80px 60px 40px; }
    .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 60px; max-width: 1200px; margin: 0 auto 60px; }
    .footer-brand p { color: rgba(255,255,255,0.45); font-size: 0.85rem; line-height: 1.7; margin: 16px 0 24px; font-weight: 300; max-width: 280px; }
    .footer-social { display: flex; gap: 12px; }
    .social-btn { width: 38px; height: 38px; border: 1px solid rgba(255,255,255,0.1); border-radius: 2px; display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.5); font-size: 0.85rem; text-decoration: none; transition: all 0.3s; }
    .social-btn:hover { border-color: var(--gold); color: var(--gold); }
    .footer-col h5 { font-size: 0.75rem; letter-spacing: 2.5px; text-transform: uppercase; color: var(--gold); margin-bottom: 20px; }
    .footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 10px; }
    .footer-col ul li a { color: rgba(255,255,255,0.45); text-decoration: none; font-size: 0.85rem; transition: color 0.3s; }
    .footer-col ul li a:hover { color: var(--white); }
    .footer-bottom { max-width: 1200px; margin: 0 auto; padding-top: 32px; border-top: 1px solid rgba(255,255,255,0.06); display: flex; justify-content: space-between; align-items: center; }
    .footer-bottom p { color: rgba(255,255,255,0.3); font-size: 0.8rem; }

    /* Animations */
    @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
    @keyframes scrollAnim { 0% { transform: scaleY(0); transform-origin: top; } 50% { transform: scaleY(1); transform-origin: top; } 51% { transform: scaleY(1); transform-origin: bottom; } 100% { transform: scaleY(0); transform-origin: bottom; } }

    .reveal { opacity: 0; transform: translateY(40px); transition: opacity 0.7s ease, transform 0.7s ease; }
    .reveal.visible { opacity: 1; transform: none; }

    @media (max-width: 900px) {
      .navbar { padding: 16px 24px; }
      .navbar.scrolled { padding: 12px 24px; }
      .nav-links { display: none; }
      section { padding: 80px 24px; }
      .hero-content { padding: 0 24px; }
      .hero-stats { right: 24px; bottom: 60px; gap: 24px; }
      .stat-num { font-size: 2rem; }
      .profile-grid, .why-grid { grid-template-columns: 1fr; gap: 48px; }
      .services-grid { grid-template-columns: 1fr; }
      .testi-grid { grid-template-columns: 1fr; }
      .footer-grid { grid-template-columns: 1fr 1fr; gap: 40px; }
      .footer-bottom { flex-direction: column; gap: 12px; text-align: center; }
    }
  `}</style>
);

// ─── Reveal Hook ─────────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ─── Navbar ──────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <a href="#accueil" className="nav-logo">PRESS<span>ELITE</span></a>
      <ul className="nav-links">
        {["Accueil", "Profil", "Services", "Pourquoi nous", "Témoignages"].map((l) => (
          <li key={l}><a href={`#${l.toLowerCase().replace(/ /g, "-").replace("é", "e").replace("î", "i")}`}>{l}</a></li>
        ))}
      </ul>
      <a href="#contact" className="nav-cta">Réserver</a>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="accueil" className="hero">
      <div className="hero-bg" />
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="hero-badge"><span />&nbsp;Pressing Premium à Douala</div>
        <h1 className="hero-title">L'art du soin,<br /><em>au fil</em> de vos vêtements.</h1>
        <p className="hero-sub">
          Confiez vos tenues aux mains expertes de PressElite — nettoyage de luxe, repassage parfait et livraison à domicile pour une garde-robe toujours impeccable.
        </p>
        <div className="hero-btns">
          <a href="#services" className="btn-primary">Nos Services</a>
          <a href="#profil" className="btn-outline">En savoir plus</a>
        </div>
      </div>
      <div className="hero-stats">
        <div className="stat-item"><div className="stat-num">10+</div><div className="stat-label">Années d'exp.</div></div>
        <div className="stat-item"><div className="stat-num">5k+</div><div className="stat-label">Clients fidèles</div></div>
        <div className="stat-item"><div className="stat-num">99%</div><div className="stat-label">Satisfaction</div></div>
      </div>
      <div className="hero-scroll">
        <span className="scroll-text">Défiler</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}

// ─── Profile ──────────────────────────────────────────────────────────────────
function Profile() {
  useReveal();
  return (
    <section id="profil" className="profile-section">
      <div className="profile-grid">
        <div className="profile-img-wrap reveal">
          <img src="https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=800&q=80" alt="Notre pressing" />
          <div className="profile-badge-img">
            <strong>10</strong>
            <span>ans d'excellence</span>
          </div>
        </div>
        <div className="reveal" style={{ animationDelay: "0.2s" }}>
          <span className="section-tag">Notre Histoire</span>
          <h2 className="section-title playfair">Un pressing pensé<br /><em>pour l'excellence</em></h2>
          <div className="gold-line" />
          <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.8, marginBottom: 16, fontWeight: 300 }}>
            Fondé en 2014 au cœur de Douala, PressElite est né de la conviction que chaque vêtement mérite une attention particulière. Notre équipe de professionnels passionnés allie techniques modernes et savoir-faire artisanal.
          </p>
          <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.8, marginBottom: 16, fontWeight: 300 }}>
            Nous prenons soin de chaque pièce comme si c'était la nôtre — des costumes sur mesure aux robes de soirée, en passant par le linge de maison de luxe.
          </p>
          <div className="profile-features">
            {["Experts certifiés", "Produits éco-responsables", "Livraison express", "Suivi en temps réel", "Prix transparents", "Garantie résultats"].map((f) => (
              <div key={f} className="feat-item"><div className="feat-dot" />{f}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Services ────────────────────────────────────────────────────────────────
const services = [
  { icon: "👔", title: "Pressing & Nettoyage", desc: "Nettoyage à sec professionnel pour tous types de textiles — costumes, robes, manteaux, uniformes.", price: "À partir de 1 500 XAF" },
  { icon: "🧺", title: "Blanchisserie Premium", desc: "Lavage, séchage et pliage soignés de votre linge courant avec des lessives haut de gamme.", price: "À partir de 1 000 XAF/kg" },
  { icon: "👗", title: "Repassage Professionnel", desc: "Repassage impeccable à la vapeur pour une présentation soignée, plis nets et cols parfaits.", price: "À partir de 500 XAF" },
  { icon: "🧵", title: "Retouches & Couture", desc: "Réparations, ourlets, remplacement de fermetures et ajustements réalisés par nos couturières.", price: "Sur devis" },
  { icon: "🪄", title: "Traitement Anti-taches", desc: "Détachage spécialisé pour les taches rebelles : vin, gras, encre, maquillage et bien plus.", price: "À partir de 2 000 XAF" },
  { icon: "🚚", title: "Collecte & Livraison", desc: "Nous venons chercher vos vêtements à domicile et vous les restituons propres, en 24h à 48h.", price: "Gratuit dès 10 000 XAF" },
];

function Services() {
  return (
    <section id="services" className="services-section">
      <div className="services-header">
        <span className="section-tag">Ce que nous faisons</span>
        <h2 className="section-title playfair">Nos <em>Services</em></h2>
        <div className="gold-line" />
      </div>
      <div className="services-grid">
        {services.map((s, i) => (
          <div key={s.title} className="service-card reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
            <div className="service-num">0{i + 1}</div>
            <div className="service-icon">{s.icon}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            <span className="service-price">{s.price}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Why Us ──────────────────────────────────────────────────────────────────
const whyCards = [
  { icon: "⚡", title: "Rapidité garantie", desc: "Retour de vos articles en 24h pour les commandes urgentes, avec suivi SMS en temps réel." },
  { icon: "🌿", title: "Produits écologiques", desc: "Nous utilisons exclusivement des produits biodégradables, sans danger pour votre famille et l'environnement." },
  { icon: "🛡️", title: "Sécurité & confiance", desc: "Chaque vêtement est étiqueté et suivi individuellement. Votre garde-robe est entre de bonnes mains." },
  { icon: "💎", title: "Qualité premium", desc: "Nos équipements professionnels de dernière génération garantissent un résultat digne des plus grands pressings." },
];

function WhyUs() {
  return (
    <section id="pourquoi-nous" className="why-section">
      <div className="why-grid">
        <div className="why-img reveal">
          <img src="https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=800&q=80" alt="Qualité pressing" />
          <div className="why-img-overlay" />
        </div>
        <div className="reveal" style={{ transitionDelay: "0.2s" }}>
          <span className="section-tag">Notre différence</span>
          <h2 className="section-title playfair">Pourquoi nous<br /><em>choisir ?</em></h2>
          <div className="gold-line" />
          <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: 36, lineHeight: 1.7, fontWeight: 300 }}>
            Depuis 10 ans, PressElite s'impose comme la référence du pressing de qualité à Douala. Voici ce qui nous distingue.
          </p>
          <div className="why-cards">
            {whyCards.map((c) => (
              <div key={c.title} className="why-card">
                <div className="why-icon-wrap">{c.icon}</div>
                <div>
                  <h4>{c.title}</h4>
                  <p>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ────────────────────────────────────────────────────────────
const testimonials = [
  { name: "Sandrine M.", role: "Cliente depuis 2018", text: "PressElite est tout simplement le meilleur pressing de Douala. Mes robes de cérémonie sont toujours parfaites, comme sorties d'une boutique de luxe.", stars: 5 },
  { name: "Jean-Paul N.", role: "Homme d'affaires", text: "Je leur confie mes costumes sur mesure sans la moindre hésitation. Le résultat est irréprochable à chaque fois, et la livraison à domicile est un vrai plus.", stars: 5 },
  { name: "Marie-Claire B.", role: "Cliente fidèle", text: "Service rapide, personnel très professionnel et accueillant. J'ai enfin trouvé un pressing à la hauteur de mes exigences. Je recommande vivement !", stars: 5 },
  { name: "Olivier T.", role: "Directeur commercial", text: "La qualité du repassage est exceptionnelle. Mes chemises n'ont jamais été aussi bien entretenues. Le rapport qualité/prix est excellent.", stars: 5 },
  { name: "Carine F.", role: "Styliste", text: "En tant que professionnelle du textile, je suis très exigeante. PressElite répond parfaitement à mes attentes. Un pressing de confiance à Douala.", stars: 5 },
  { name: "Alain K.", role: "Client régulier", text: "La collecte à domicile est révolutionnaire ! Plus besoin de se déplacer. Service ponctuel, vêtements impeccables. Merci PressElite !", stars: 5 },
];

function Testimonials() {
  return (
    <section id="temoignages" className="testi-section">
      <div className="testi-header">
        <span className="section-tag">Ce qu'ils disent</span>
        <h2 className="section-title playfair">Nos clients <em>témoignent</em></h2>
        <div className="gold-line" style={{ margin: "24px auto" }} />
      </div>
      <div className="testi-grid">
        {testimonials.map((t) => (
          <div key={t.name} className="testi-card reveal">
            <span className="testi-quote">"</span>
            <p className="testi-text">{t.text}</p>
            <div className="testi-author">
              <div className="testi-avatar">{t.name[0]}</div>
              <div>
                <div className="testi-name">{t.name}</div>
                <div className="testi-role">{t.role}</div>
                <div className="testi-stars">{"★".repeat(t.stars)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer id="contact">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="nav-logo" style={{ fontSize: "1.8rem" }}>PRESS<span style={{ color: "#fff" }}>ELITE</span></div>
          <p>Votre partenaire de confiance pour un entretien vestimentaire impeccable à Douala depuis 2014.</p>
          <div className="footer-social">
            {["f", "in", "ig", "tw"].map((s) => (
              <a key={s} href="#" className="social-btn">{s}</a>
            ))}
          </div>
        </div>
        <div className="footer-col">
          <h5>Navigation</h5>
          <ul>
            {["Accueil", "Profil", "Services", "Pourquoi nous", "Témoignages"].map((l) => (
              <li key={l}><a href="#">{l}</a></li>
            ))}
          </ul>
        </div>
        <div className="footer-col">
          <h5>Services</h5>
          <ul>
            {["Pressing", "Blanchisserie", "Repassage", "Retouches", "Livraison"].map((s) => (
              <li key={s}><a href="#">{s}</a></li>
            ))}
          </ul>
        </div>
        <div className="footer-col">
          <h5>Contact</h5>
          <ul>
            <li><a href="#">📍 Akwa, Douala</a></li>
            <li><a href="#">📞 +237 6XX XXX XXX</a></li>
            <li><a href="#">✉️ contact@presselite.cm</a></li>
            <li><a href="#">⏰ Lun–Sam : 8h–19h</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 PressElite Douala. Tous droits réservés.</p>
        <p>Fait avec ♥ pour votre élégance</p>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <FontLink />
      <Navbar />
      <Hero />
      <Profile />
      <Services />
      <WhyUs />
      <Testimonials />
      <Footer />
    </>
  );
}
