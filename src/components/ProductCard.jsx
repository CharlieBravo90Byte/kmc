import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import styles from './ProductCard.module.css';

const fmt = (n) =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(n);

export default function ProductCard({ product }) {
  const { addItem, openCart } = useCart();

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    openCart();
  };

  const stars = Math.round(product.rating);

  return (
    <Link to={`/shop/${product.slug}`} className={styles.card}>
      {/* Image */}
      <div className={styles.imageWrapper}>
        <img src={product.image} alt={product.name} className={styles.image} loading="lazy" />
        {product.badge && <span className={styles.badge}>{product.badge}</span>}
        <div className={styles.overlay}>
          <button className={styles.addBtn} onClick={handleAdd} aria-label="Agregar al carrito">
            <ShoppingCart size={18} />
            Agregar
          </button>
        </div>
      </div>

      {/* Info */}
      <div className={styles.info}>
        <p className={styles.category}>{product.category === 'impresion3d' ? 'Impresión 3D' : product.category === 'impresionlaser' ? 'Láser' : 'Estampados'}</p>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.desc}>{product.shortDesc}</p>

        <div className={styles.footer}>
          <div className={styles.ratingRow}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={13}
                fill={i < stars ? '#fbbf24' : 'none'}
                color={i < stars ? '#fbbf24' : '#475569'}
                strokeWidth={1.5}
              />
            ))}
            <span className={styles.reviews}>({product.reviews})</span>
          </div>
          <div className={styles.priceBlock}>
            {product.priceUnit && <span className={styles.priceUnit}>{product.priceUnit}</span>}
            <span className={styles.price}>{fmt(product.price)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
