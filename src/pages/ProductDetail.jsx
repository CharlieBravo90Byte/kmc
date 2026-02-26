import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart, ArrowLeft, Star, Check,
  Package, Truck, Shield, MessageCircle,
} from 'lucide-react';
import { getProductBySlug, products } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import styles from './ProductDetail.module.css';

const fmt = (n) =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(n);

const guarantees = [
  { icon: <Package size={18} />,      label: 'Empaque seguro' },
  { icon: <Truck size={18} />,        label: 'Envío a todo Chile' },
  { icon: <Shield size={18} />,       label: 'Garantía de calidad' },
  { icon: <MessageCircle size={18} />, label: 'Soporte WhatsApp' },
];

export default function ProductDetail() {
  const { slug }      = useParams();
  const navigate      = useNavigate();
  const { addItem, openCart } = useCart();

  const product = getProductBySlug(slug);

  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty]                 = useState(1);
  const [added, setAdded]             = useState(false);

  // Reset when product changes
  useEffect(() => {
    setActiveImage(0);
    setQty(1);
    setAdded(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!product) {
    return (
      <div className="page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, minHeight: '60vh' }}>
        <h2>Producto no encontrado</h2>
        <Link to="/shop" className="btn btn-primary">Volver a la tienda</Link>
      </div>
    );
  }

  const images = product.images?.length ? product.images : [product.image];
  const stars  = Math.round(product.rating);

  // Related products: same category, different id
  const related = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    addItem(product, qty);
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 2500);
  };

  const whatsappMsg = encodeURIComponent(
    `Hola! Me interesa el producto "${product.name}" (${fmt(product.price)}). ¿Pueden darme más información?`
  );

  return (
    <main className="page-wrapper">
      <div className="container section-padding-sm">

        {/* ── Breadcrumb ── */}
        <nav className={styles.breadcrumb}>
          <Link to="/shop"><ArrowLeft size={14} /> Volver a tienda</Link>
          <span>/</span>
          <Link to={`/shop?cat=${product.category}`}>
            {product.category === 'impresion3d' ? 'Impresión 3D' :
             product.category === 'impresionlaser' ? 'Impresión Láser' : 'Estampados'}
          </Link>
          <span>/</span>
          <span className={styles.breadcrumbCurrent}>{product.name}</span>
        </nav>

        {/* ── Main layout ── */}
        <div className={styles.layout}>

          {/* Gallery */}
          <div className={styles.gallery}>
            <div className={styles.mainImage}>
              <img src={images[activeImage]} alt={product.name} />
              {product.badge && <span className={styles.badge}>{product.badge}</span>}
            </div>
            {images.length > 1 && (
              <div className={styles.thumbs}>
                {images.map((img, i) => (
                  <button
                    key={i}
                    className={`${styles.thumb} ${i === activeImage ? styles.thumbActive : ''}`}
                    onClick={() => setActiveImage(i)}
                  >
                    <img src={img} alt={`Vista ${i + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info panel */}
          <div className={styles.panel}>
            <p className={styles.category}>
              {product.category === 'impresion3d' ? '🖨️ Impresión 3D' :
               product.category === 'impresionlaser' ? '🔥 Impresión Láser' : '🎨 Estampados'}
            </p>
            <h1 className={styles.title}>{product.name}</h1>

            {/* Rating */}
            <div className={styles.ratingRow}>
              <div className={styles.stars}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < stars ? '#fbbf24' : 'none'}
                    color={i < stars ? '#fbbf24' : '#475569'}
                    strokeWidth={1.5}
                  />
                ))}
              </div>
              <span className={styles.ratingVal}>{product.rating}</span>
              <span className={styles.ratingCount}>({product.reviews} reseñas)</span>
            </div>

            {/* Price */}
            <div className={styles.priceBlock}>
              {product.priceUnit && <span className={styles.priceUnit}>{product.priceUnit}</span>}
              <span className={styles.price}>{fmt(product.price)}</span>
            </div>

            {/* Short desc */}
            <p className={styles.shortDesc}>{product.shortDesc}</p>

            {/* Qty + Add */}
            <div className={styles.addRow}>
              <div className={styles.qtyControl}>
                <button
                  className={styles.qtyBtn}
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  disabled={qty <= 1}
                >−</button>
                <span className={styles.qtyNum}>{qty}</span>
                <button className={styles.qtyBtn} onClick={() => setQty(q => q + 1)}>+</button>
              </div>
              <button
                className={`${styles.addBtn} ${added ? styles.addBtnAdded : ''}`}
                onClick={handleAddToCart}
              >
                {added ? <><Check size={18} /> Agregado</> : <><ShoppingCart size={18} /> Agregar al carrito</>}
              </button>
            </div>

            <a
              href={`https://wa.me/+56948192023?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-ghost ${styles.whatsappBtn}`}
            >
              <MessageCircle size={18} />
              Consultar por WhatsApp
            </a>

            {/* Guarantees */}
            <div className={styles.guarantees}>
              {guarantees.map(g => (
                <div key={g.label} className={styles.guaranteeItem}>
                  <span className={styles.guaranteeIcon}>{g.icon}</span>
                  <span>{g.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Description & Specs ── */}
        <div className={styles.details}>
          <div className={styles.description}>
            <h2>Descripción</h2>
            {product.description.split('\n').map((line, i) => (
              line.trim() ? <p key={i}>{line.trim()}</p> : null
            ))}
          </div>

          {product.specs?.length > 0 && (
            <div className={styles.specs}>
              <h2>Especificaciones</h2>
              <table className={styles.specsTable}>
                <tbody>
                  {product.specs.map(spec => (
                    <tr key={spec.label}>
                      <td className={styles.specLabel}>{spec.label}</td>
                      <td className={styles.specValue}>{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ── Related Products ── */}
        {related.length > 0 && (
          <section className={styles.related}>
            <div className="section-header" style={{ textAlign: 'left', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '1.6rem', background: 'linear-gradient(135deg,#fff,var(--green-light))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Productos relacionados
              </h2>
            </div>
            <div className={styles.relatedGrid}>
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
