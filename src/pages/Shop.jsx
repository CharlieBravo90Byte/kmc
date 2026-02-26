import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, ChevronRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { getAllProducts, categories } from '../data/products';
import styles from './Shop.module.css';

const sortOptions = [
  { value: 'default',    label: 'Relevancia' },
  { value: 'price-asc',  label: 'Precio: menor a mayor' },
  { value: 'price-desc', label: 'Precio: mayor a menor' },
  { value: 'rating',     label: 'Mejor valorados' },
  { value: 'reviews',    label: 'Más reseñas' },
];

// Sub-categorías por categoría
const subCategories = {
  impresion3d: [
    { id: 'figuras',  label: 'Figuras',  icon: '🗿' },
    { id: 'llaveros', label: 'Llaveros', icon: '🔑' },
    { id: 'soportes', label: 'Soportes', icon: '📱' },
  ],
};

// Franquicias (sólo visible cuando sub=figuras)
const franquicias = [
  { id: 'pokemon',    label: 'Pokémon',         icon: '⚡' },
  { id: 'marvel',     label: 'Marvel',          icon: '🦸' },
  { id: 'supermario', label: 'Super Mario Bros', icon: '🍄' },
  { id: 'pitufos',    label: 'Los Pitufos',      icon: '🔵' },
  { id: 'starwars',   label: 'Star Wars',        icon: '⭐' },
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery]               = useState('');
  const [sort, setSort]                 = useState('default');
  const [showFilters, setShowFilters]   = useState(false);

  const activeCategory = searchParams.get('cat')  || 'all';
  const activeSub      = searchParams.get('sub')  || '';
  const activeTipo     = searchParams.get('tipo') || '';

  const setCategory = (cat) => {
    const p = new URLSearchParams();
    if (cat !== 'all') p.set('cat', cat);
    setSearchParams(p);
  };
  const setSub = (sub) => {
    const p = new URLSearchParams(searchParams);
    if (sub) p.set('sub', sub); else p.delete('sub');
    p.delete('tipo');
    setSearchParams(p);
  };
  const setTipo = (tipo) => {
    const p = new URLSearchParams(searchParams);
    if (tipo) p.set('tipo', tipo); else p.delete('tipo');
    setSearchParams(p);
  };

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []);

  const currentSubs = subCategories[activeCategory] || [];

  const filtered = useMemo(() => {
    let list = getAllProducts();
    if (activeCategory !== 'all') list = list.filter(p => p.category === activeCategory);
    if (activeSub)  list = list.filter(p => p.sub  === activeSub);
    if (activeTipo) list = list.filter(p => p.tipo === activeTipo);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.shortDesc.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    switch (sort) {
      case 'price-asc':  return [...list].sort((a, b) => a.price - b.price);
      case 'price-desc': return [...list].sort((a, b) => b.price - a.price);
      case 'rating':     return [...list].sort((a, b) => b.rating - a.rating);
      case 'reviews':    return [...list].sort((a, b) => b.reviews - a.reviews);
      default:           return list;
    }
  }, [activeCategory, activeSub, activeTipo, query, sort]);

  const catLabel  = categories.find(c => c.id === activeCategory)?.label || 'Todos';
  const subLabel  = currentSubs.find(s => s.id === activeSub)?.label     || '';
  const tipoLabel = franquicias.find(f => f.id === activeTipo)?.label    || '';

  return (
    <main className="page-wrapper">
      <div className={styles.pageHeader}>
        <div className="container">
          <span className="badge badge-green">Tienda</span>
          <h1 className={styles.pageTitle}>Nuestros Productos</h1>
          <p className={styles.pageSubtitle}>
            Impresión 3D · Grabado Láser · Estampados Personalizados
          </p>
        </div>
      </div>

      <div className="container section-padding-sm">
        {/* Toolbar */}
        <div className={styles.toolbar}>
          <div className={styles.searchBox}>
            <Search size={16} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className={styles.searchInput}
            />
            {query && (
              <button className={styles.clearBtn} onClick={() => setQuery('')}>
                <X size={14} />
              </button>
            )}
          </div>
          <div className={styles.toolbarRight}>
            <select value={sort} onChange={e => setSort(e.target.value)} className={styles.sortSelect}>
              {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <button
              className={`${styles.filterToggle} ${showFilters ? styles.filterToggleActive : ''}`}
              onClick={() => setShowFilters(v => !v)}
            >
              <SlidersHorizontal size={16} /> Filtros
            </button>
          </div>
        </div>

        {/* Categorías principales */}
        <div className={`${styles.catBar} ${showFilters ? styles.catBarVisible : ''}`}>
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`${styles.catBtn} ${activeCategory === cat.id ? styles.catBtnActive : ''}`}
              onClick={() => setCategory(cat.id)}
            >
              <span>{cat.icon}</span>{cat.label}
            </button>
          ))}
        </div>

        {/* Sub-categorías: Figuras / Llaveros / Soportes */}
        {currentSubs.length > 0 && (
          <div className={styles.subBar}>
            <ChevronRight size={13} className={styles.subArrow} />
            <button
              className={`${styles.subBtn} ${!activeSub ? styles.subBtnActive : ''}`}
              onClick={() => setSub('')}
            >
              Todos
            </button>
            {currentSubs.map(s => (
              <button
                key={s.id}
                className={`${styles.subBtn} ${activeSub === s.id ? styles.subBtnActive : ''}`}
                onClick={() => setSub(activeSub === s.id ? '' : s.id)}
              >
                {s.icon} {s.label}
              </button>
            ))}
          </div>
        )}

        {/* Franquicias: Pokémon / Marvel / etc. — sólo cuando sub=figuras */}
        {activeSub === 'figuras' && (
          <div className={styles.tipoBar}>
            <ChevronRight size={13} className={styles.subArrow} />
            <button
              className={`${styles.tipoBtn} ${!activeTipo ? styles.tipoBtnActive : ''}`}
              onClick={() => setTipo('')}
            >
              Todas
            </button>
            {franquicias.map(f => (
              <button
                key={f.id}
                className={`${styles.tipoBtn} ${activeTipo === f.id ? styles.tipoBtnActive : ''}`}
                onClick={() => setTipo(activeTipo === f.id ? '' : f.id)}
              >
                {f.icon} {f.label}
              </button>
            ))}
          </div>
        )}

        {/* Info resultados con migas de pan */}
        <div className={styles.resultsInfo}>
          <span>
            <strong>{filtered.length}</strong> producto{filtered.length !== 1 ? 's' : ''} en{' '}
            <em>{catLabel}</em>
            {subLabel  && <><ChevronRight size={11} style={{margin:'0 2px',verticalAlign:'middle'}} /><em>{subLabel}</em></>}
            {tipoLabel && <><ChevronRight size={11} style={{margin:'0 2px',verticalAlign:'middle'}} /><em>{tipoLabel}</em></>}
            {query     && <> · &ldquo;{query}&rdquo;</>}
          </span>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className={styles.productsGrid}>
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div className={styles.empty}>
            <Search size={48} strokeWidth={1} />
            <h3>Sin resultados</h3>
            <p>Intenta con otra búsqueda o cambia los filtros.</p>
            <button className="btn btn-outline" onClick={() => { setQuery(''); setCategory('all'); }}>
              Ver todos los productos
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
