import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import styles from './CartDrawer.module.css';

const fmt = (n) =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(n);

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, totalItems, totalPrice } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className={styles.overlay} onClick={closeCart} />

      {/* Drawer */}
      <aside className={styles.drawer}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.title}>
            <ShoppingBag size={20} />
            <span>Carrito</span>
            {totalItems > 0 && <span className={styles.count}>{totalItems}</span>}
          </div>
          <button className={styles.closeBtn} onClick={closeCart} aria-label="Cerrar">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className={styles.body}>
          {items.length === 0 ? (
            <div className={styles.empty}>
              <ShoppingBag size={48} strokeWidth={1} />
              <p>Tu carrito está vacío</p>
              <button className="btn btn-outline" onClick={closeCart} style={{ marginTop: '16px' }}>
                Explorar Tienda
              </button>
            </div>
          ) : (
            <ul className={styles.list}>
              {items.map(({ product, quantity }) => (
                <li key={product.id} className={styles.item}>
                  <img src={product.image} alt={product.name} className={styles.img} />
                  <div className={styles.info}>
                    <p className={styles.name}>{product.name}</p>
                    <p className={styles.price}>{fmt(product.price)}</p>
                    <div className={styles.qtyRow}>
                      <button
                        className={styles.qtyBtn}
                        onClick={() => updateQty(product.id, quantity - 1)}
                        disabled={quantity <= 1}
                      >
                        <Minus size={12} />
                      </button>
                      <span className={styles.qty}>{quantity}</span>
                      <button
                        className={styles.qtyBtn}
                        onClick={() => updateQty(product.id, quantity + 1)}
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                  <button
                    className={styles.removeBtn}
                    onClick={() => removeItem(product.id)}
                    aria-label="Eliminar"
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.subtotal}>
              <span>Subtotal</span>
              <strong>{fmt(totalPrice)}</strong>
            </div>
            <p className={styles.hint}>Envío y descuentos se calculan al finalizar.</p>
            <a
              href="https://wa.me/+56948192023"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={closeCart}
            >
              Cotizar por WhatsApp
            </a>
            <Link to="/shop" className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }} onClick={closeCart}>
              Seguir Comprando
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
