import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Printer, Zap, Shirt, CheckCircle, ChevronDown } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import styles from './Home.module.css';

// ── Hero slides ───────────────────────────────────────────
const slides = [
  {
    badge: '🚀 Tecnología de Vanguardia',
    title: 'Dale vida a\ntus ideas',
    subtitle:
      'Impresión 3D, grabado láser y estampados personalizados. Calidad, precisión y creatividad para cada proyecto.',
    cta: { label: 'Ver Tienda', to: '/shop' },
    image: '/img/logo/logo.png',
    imageStyle: 'contain',
    accent: '#22c55e',
  },
  {
    badge: '🖨️ Impresión 3D',
    title: 'Prototipos que\ninspiran',
    subtitle:
      'Desde figuras decorativas hasta prototipos funcionales. Filamentos PLA, PETG, ASA y más.',
    cta: { label: 'Explorar 3D', to: '/shop?cat=impresion3d' },
    image: '/img/promo/impresora3d.png',
    imageStyle: 'contain',
    accent: '#3b82f6',
  },
  {
    badge: '🔥 Impresión Láser',
    title: 'Precisión en\ncada trazo',
    subtitle:
      'Grabado en madera, acrílico, cuero y más. Resultados profesionales en cada pieza.',
    cta: { label: 'Explorar Láser', to: '/shop?cat=impresionlaser' },
    image: '/img/promo/laser.png',
    imageStyle: 'contain',
    accent: '#f59e0b',
  },
  {
    badge: '🎨 Estampados',
    title: 'Personaliza\ntu estilo',
    subtitle:
      'Poleras y tazas con tu diseño, foto o logo. ¡El regalo perfecto para cualquier ocasión!',
    cta: { label: 'Explorar Estampados', to: '/shop?cat=estampados' },
    image: '/img/promo/estampado.png',
    imageStyle: 'contain',
    accent: '#f59e0b',
  },
];

const SLIDE_DURATION = 5000;

// ── Services ──────────────────────────────────────────────
const services = [
  {
    icon: <Printer size={32} />,
    title: 'Impresión 3D',
    desc: 'Materializa tus ideas con tecnología FDM. Figuras, prototipos, piezas personalizadas y más.',
    link: '/shop?cat=impresion3d',
    color: '#22c55e',
  },
  {
    icon: <Zap size={32} />,
    title: 'Impresión Láser',
    desc: 'Grabado y corte de precisión en madera, acrílico, cuero y tela. Acabados únicos.',
    link: '/shop?cat=impresionlaser',
    color: '#3b82f6',
  },
  {
    icon: <Shirt size={32} />,
    title: 'Estampados',
    desc: 'Poleras y tazas personalizadas con tu foto, logo o diseño. Calidad duradera.',
    link: '/shop?cat=estampados',
    color: '#f59e0b',
  },
];

// ── Features ──────────────────────────────────────────────
const features = [
  'Diseño personalizado incluido',
  'Materiales de alta calidad',
  'Entrega rápida en todo Chile',
  'Atención por WhatsApp',
  'Sin pedido mínimo',
  'Presupuesto sin costo',
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrent(c => (c + 1) % slides.length);
        setAnimating(false);
      }, 400);
    }, SLIDE_DURATION);
    return () => clearInterval(t);
  }, []);

  const slide = slides[current];

  // Show 3 featured products (one per category)
  const featured = [
    products.find(p => p.category === 'impresion3d'),
    products.find(p => p.category === 'estampados' && p.badge === 'Favorito'),
    products.find(p => p.category === 'impresionlaser'),
  ].filter(Boolean);

  return (
    <main className={styles.main}>
      {/* ══════════ HERO ══════════ */}
      <section className={styles.hero}>
        <div className={styles.heroBgGradient} />

        <div className={`container ${styles.heroContent}`}>
          {/* Texto */}
          <div className={`${styles.heroText} ${animating ? styles.heroTextOut : ''}`}>
            <span className={`badge badge-green ${styles.heroBadge}`}>{slide.badge}</span>
            <h1 className={styles.heroTitle}>
              {slide.title.split('\n').map((line, i) => (
                <span key={i}>{line}</span>
              ))}
            </h1>
            <p className={styles.heroSubtitle}>{slide.subtitle}</p>
            <div className={styles.heroActions}>
              <Link to={slide.cta.to} className="btn btn-primary">
                {slide.cta.label} <ArrowRight size={16} />
              </Link>
              <a href="https://wa.me/+56948192023" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                Cotizar ahora
              </a>
            </div>
          </div>

          {/* Imagen */}
          <div className={`${styles.heroImageWrapper} ${animating ? styles.heroImageOut : ''}`}>
            <div className={styles.heroImageGlow} style={{ background: `radial-gradient(ellipse, ${slide.accent}22 0%, transparent 70%)` }} />
            <img
              src={slide.image}
              alt={slide.badge}
              className={styles.heroImage}
            />
          </div>
        </div>

        {/* Slide indicators */}
        <div className={styles.indicators}>
          {slides.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Scroll cue */}
        <a href="#servicios" className={styles.scrollCue}>
          <ChevronDown size={22} />
        </a>
      </section>

      {/* ══════════ SERVICES ══════════ */}
      <section id="servicios" className={`section-padding ${styles.servicesSection}`}>
        <div className="container">
          <div className="section-header">
            <span className="badge badge-green">Lo que hacemos</span>
            <h2>Nuestros Servicios</h2>
            <p>
              Tecnología de última generación para materializar cualquier idea,
              desde prototipos industriales hasta regalos únicos.
            </p>
          </div>

          <div className={styles.servicesGrid}>
            {services.map((s) => (
              <Link to={s.link} key={s.title} className={styles.serviceCard}>
                <div className={styles.serviceIcon} style={{ color: s.color, background: `${s.color}15` }}>
                  {s.icon}
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <span className={styles.serviceLink} style={{ color: s.color }}>
                  Ver productos <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ FEATURES ══════════ */}
      <section className={styles.featuresSection}>
        <div className="container">
          <div className={styles.featuresInner}>
            <div className={styles.featuresText}>
              <span className="badge badge-green">¿Por qué elegirnos?</span>
              <h2>Calidad y creatividad<br />en cada detalle</h2>
              <p>
                Somos un equipo apasionado por la tecnología y el diseño. 
                Cada proyecto lo tratamos como si fuera nuestro.
              </p>
              <Link to="/contact" className="btn btn-outline" style={{ marginTop: '8px' }}>
                Contáctanos
              </Link>
            </div>
            <ul className={styles.featuresList}>
              {features.map((f) => (
                <li key={f} className={styles.featureItem}>
                  <CheckCircle size={18} color="var(--green)" strokeWidth={2} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ══════════ FEATURED PRODUCTS ══════════ */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-green">Productos Destacados</span>
            <h2>Los más solicitados</h2>
            <p>Echa un vistazo a nuestros productos más populares de cada categoría.</p>
          </div>

          <div className={styles.productsGrid}>
            {featured.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/shop" className="btn btn-primary">
              Ver Tienda Completa <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaBox}>
            <div className={styles.ctaGlow} />
            <h2>¿Tienes un proyecto en mente?</h2>
            <p>Cuéntanos tu idea y te damos un presupuesto sin costo en menos de 24 horas.</p>
            <div className={styles.ctaActions}>
              <a
                href="https://wa.me/+56948192023"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Escribir por WhatsApp
              </a>
              <Link to="/contact" className="btn btn-outline">
                Formulario de contacto
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
