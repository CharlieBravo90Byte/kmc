import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import styles from './Navbar.module.css';

const navLinks = [
  { to: '/',        label: 'Inicio'   },
  { to: '/shop',    label: 'Tienda'   },
  { to: '/contact', label: 'Contacto' },
];

// (limpieza de versión anterior)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems, toggleCart } = useCart();
  const location = useLocation();

  useEffect(() => { setMenuOpen(false); }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <div className={`container ${styles.inner}`}>
          <Link to="/" className={styles.logo}>
            <img src="/img/logo/logo.png" alt="KMC 3D" className={styles.logoImg} />
            <span>KMC<span className={styles.logo3d}>_3D</span></span>
          </Link>

          <ul className={styles.links}>
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end
                  className={({ isActive }) =>
                    `${styles.link} ${isActive ? styles.linkActive : ''}`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            <button className={styles.cartBtn} onClick={toggleCart} aria-label="Abrir carrito">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className={styles.badge}>{totalItems > 99 ? '99+' : totalItems}</span>
              )}
            </button>
            <button
              className={styles.hamburger}
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Menú"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className={styles.mobileMenu}>
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end
                className={({ isActive }) =>
                  `${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ''}`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}
