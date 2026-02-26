import { useState, useEffect } from 'react';
import {
  categories,
  getAdminProducts,
  saveAdminProduct,
  deleteAdminProduct,
  getNextAdminId,
} from '../data/products';
import styles from './Admin.module.css';

// ─── Configuración ────────────────────────────────────────
const PIN = 'kmc2026';

const SUB_CATS = {
  impresion3d: [
    { id: 'figuras',  label: '🗿 Figuras' },
    { id: 'llaveros', label: '🔑 Llaveros' },
    { id: 'soportes', label: '📱 Soportes' },
  ],
};

const FRANQUICIAS = [
  { id: 'pokemon',    label: '⚡ Pokémon' },
  { id: 'marvel',     label: '🦸 Marvel' },
  { id: 'supermario', label: '🍄 Super Mario Bros' },
  { id: 'pitufos',    label: '🔵 Los Pitufos' },
  { id: 'starwars',   label: '⭐ Star Wars' },
];

const QUICK_IMAGES = [
  '/img/tazas/marvel.png',
  '/img/tazas/beetlejuice.png',
  '/img/tazas/cr7.png',
  '/img/tazas/dybala.png',
  '/img/tazas/ender.png',
  '/img/tazas/stick.png',
  '/img/tazas/colo 1.png',
  '/img/tazas/colo 2.png',
  '/img/promo/impresora3d.png',
  '/img/promo/laser.png',
  '/img/promo/estampado.png',
];

const EMPTY_FORM = {
  name: '', slug: '', category: 'impresion3d', sub: '', tipo: '',
  price: '', priceUnit: 'por unidad', badge: '', shortDesc: '',
  description: '', image: '', inStock: true, rating: 5.0, reviews: 0,
  specs: [{ label: '', value: '' }],
};

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function generateCode(products) {
  if (!products.length) return '// No hay productos agregados aún.';
  return products.map(p => {
    const specsLines = (p.specs ?? [])
      .map(s => `      { label: '${s.label}', value: '${s.value}' }`)
      .join(',\n');
    const imagesStr = (p.images ?? (p.image ? [p.image] : []))
      .map(i => `'${i}'`).join(', ');
    return `  {
    id: ${p.id},
    slug: '${p.slug}',
    name: '${p.name}',
    category: '${p.category}',${p.sub ? `\n    sub: '${p.sub}',` : ''}${p.tipo ? `\n    tipo: '${p.tipo}',` : ''}
    price: ${p.price},
    priceUnit: '${p.priceUnit}',
    rating: ${p.rating},
    reviews: ${p.reviews},
    badge: ${p.badge ? `'${p.badge}'` : 'null'},
    image: '${p.image}',
    images: [${imagesStr}],
    shortDesc: \`${p.shortDesc}\`,
    description: \`${p.description}\`,
    specs: [
${specsLines}
    ],
    inStock: ${p.inStock},
  }`;
  }).join(',\n');
}

// ─── Componente principal ─────────────────────────────────
export default function Admin() {
  const [auth, setAuth]           = useState(false);
  const [pin, setPin]             = useState('');
  const [pinError, setPinError]   = useState('');
  const [tab, setTab]             = useState('add');
  const [form, setForm]           = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [adminProds, setAdminProds] = useState([]);
  const [saved, setSaved]         = useState(false);
  const [copied, setCopied]       = useState(false);
  const [imgError, setImgError]   = useState(false);

  useEffect(() => { setAdminProds(getAdminProducts()); }, []);

  // ─── Auth ──────────────────────────────────────────────
  const handleLogin = () => {
    if (pin === PIN) { setAuth(true); }
    else { setPinError('PIN incorrecto. Inténtalo de nuevo.'); setPin(''); }
  };

  // ─── Form helpers ──────────────────────────────────────
  const setField = (field, value) => {
    setForm(prev => {
      const next = { ...prev, [field]: value };
      if (field === 'name') next.slug = slugify(value);
      if (field === 'category' && value !== 'impresion3d') { next.sub = ''; next.tipo = ''; }
      if (field === 'sub' && value !== 'figuras') next.tipo = '';
      return next;
    });
  };

  const setSpec = (i, key, val) => setForm(prev => {
    const specs = [...prev.specs];
    specs[i] = { ...specs[i], [key]: val };
    return { ...prev, specs };
  });

  const addSpec    = () => setForm(prev => ({ ...prev, specs: [...prev.specs, { label: '', value: '' }] }));
  const removeSpec = (i) => setForm(prev => ({ ...prev, specs: prev.specs.filter((_, idx) => idx !== i) }));

  // ─── Save ──────────────────────────────────────────────
  const handleSave = () => {
    if (!form.name || !form.price) return;
    const product = {
      ...form,
      id:      editingId ?? getNextAdminId(),
      price:   Number(form.price),
      rating:  Number(form.rating),
      reviews: Number(form.reviews),
      specs:   form.specs.filter(s => s.label && s.value),
      images:  form.image ? [form.image] : [],
    };
    saveAdminProduct(product);
    setAdminProds(getAdminProducts());
    setForm(EMPTY_FORM);
    setEditingId(null);
    setImgError(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    setTab('products');
  };

  const handleEdit = (p) => {
    setForm({ ...EMPTY_FORM, ...p, specs: p.specs?.length ? p.specs : [{ label: '', value: '' }] });
    setEditingId(p.id);
    setImgError(false);
    setTab('add');
    window.scrollTo(0, 0);
  };

  const handleDelete = (id) => {
    if (!window.confirm('¿Eliminar este producto del panel de admin?')) return;
    deleteAdminProduct(id);
    setAdminProds(getAdminProducts());
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateCode(adminProds));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // ─── LOCK SCREEN ───────────────────────────────────────
  if (!auth) {
    return (
      <div className={styles.lock}>
        <div className={styles.lockCard}>
          <div className={styles.lockIcon}>🔐</div>
          <h1 className={styles.lockTitle}>KMC Admin</h1>
          <p className={styles.lockSub}>Panel de administración privado</p>
          <input
            type="password"
            className={styles.pinInput}
            placeholder="Ingresa el PIN"
            value={pin}
            autoFocus
            onChange={e => { setPin(e.target.value); setPinError(''); }}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
          />
          {pinError && <p className={styles.pinError}>{pinError}</p>}
          <button className={styles.loginBtn} onClick={handleLogin}>Entrar →</button>
          <p className={styles.lockHint}>Solo personal autorizado</p>
        </div>
      </div>
    );
  }

  // ─── PANEL PRINCIPAL ───────────────────────────────────
  return (
    <div className={styles.wrap}>

      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.logo}>⚙️ KMC Admin</span>
          <span className={styles.badge}>{adminProds.length} producto{adminProds.length !== 1 ? 's' : ''} guardado{adminProds.length !== 1 ? 's' : ''}</span>
        </div>
        <div className={styles.headerRight}>
          <a href="/" target="_blank" rel="noreferrer" className={styles.viewSiteBtn}>
            🌐 Ver tienda
          </a>
          <button className={styles.logoutBtn} onClick={() => setAuth(false)}>
            Salir
          </button>
        </div>
      </header>

      {/* Tabs */}
      <nav className={styles.tabs}>
        {[
          { id: 'add',      label: editingId ? '✏️ Editando' : '➕ Nuevo producto' },
          { id: 'products', label: `📦 Mis productos (${adminProds.length})` },
          { id: 'export',   label: '📋 Exportar código' },
        ].map(t => (
          <button
            key={t.id}
            className={`${styles.tabBtn} ${tab === t.id ? styles.tabActive : ''}`}
            onClick={() => setTab(t.id)}
          >{t.label}</button>
        ))}
      </nav>

      <main className={styles.content}>

        {/* ════════════════ TAB: AGREGAR ════════════════ */}
        {tab === 'add' && (
          <div>
            {saved && <div className={styles.successBanner}>✅ Producto guardado. Ya aparece en la tienda.</div>}

            <div className={styles.grid}>

              {/* ── Columna izquierda ── */}
              <div>

                {/* Sección: Info básica */}
                <section className={styles.section}>
                  <h3 className={styles.sectionTitle}>Información básica</h3>

                  <label className={styles.label}>Nombre del producto *</label>
                  <input className={styles.input} value={form.name}
                    onChange={e => setField('name', e.target.value)}
                    placeholder="Ej: Figura Goku Saiyan 3D" />

                  <label className={styles.label}>Slug (URL del producto)</label>
                  <input className={styles.input} value={form.slug}
                    onChange={e => setField('slug', e.target.value)}
                    placeholder="figura-goku-saiyan-3d" />
                  <p className={styles.hint}>Se genera automáticamente desde el nombre</p>

                  <div className={styles.row2}>
                    <div>
                      <label className={styles.label}>Precio (CLP) *</label>
                      <input className={styles.input} type="number" value={form.price}
                        onChange={e => setField('price', e.target.value)} placeholder="4990" />
                    </div>
                    <div>
                      <label className={styles.label}>Unidad</label>
                      <select className={styles.select} value={form.priceUnit}
                        onChange={e => setField('priceUnit', e.target.value)}>
                        <option value="por unidad">por unidad</option>
                        <option value="desde">desde</option>
                        <option value="el par">el par</option>
                        <option value="pack 12 unidades">pack 12 unidades</option>
                        <option value="por m²">por m²</option>
                      </select>
                    </div>
                  </div>

                  <div className={styles.row2}>
                    <div>
                      <label className={styles.label}>Badge (opcional)</label>
                      <input className={styles.input} value={form.badge}
                        onChange={e => setField('badge', e.target.value)}
                        placeholder="Nuevo / Popular / Oferta" />
                    </div>
                    <div>
                      <label className={styles.label}>Stock</label>
                      <select className={styles.select} value={form.inStock ? 'true' : 'false'}
                        onChange={e => setField('inStock', e.target.value === 'true')}>
                        <option value="true">✅ Disponible</option>
                        <option value="false">❌ Agotado</option>
                      </select>
                    </div>
                  </div>
                </section>

                {/* Sección: Categoría */}
                <section className={styles.section}>
                  <h3 className={styles.sectionTitle}>Categoría</h3>

                  <label className={styles.label}>Categoría principal *</label>
                  <select className={styles.select} value={form.category}
                    onChange={e => setField('category', e.target.value)}>
                    <option value="impresion3d">🖨️ Impresión 3D</option>
                    <option value="impresionlaser">🔥 Impresión Láser</option>
                    <option value="estampados">🎨 Estampados</option>
                  </select>

                  {form.category === 'impresion3d' && (
                    <>
                      <label className={styles.label}>Sub-categoría</label>
                      <select className={styles.select} value={form.sub}
                        onChange={e => setField('sub', e.target.value)}>
                        <option value="">— Sin sub-categoría —</option>
                        {SUB_CATS.impresion3d.map(s =>
                          <option key={s.id} value={s.id}>{s.label}</option>)}
                      </select>
                    </>
                  )}

                  {form.category === 'impresion3d' && form.sub === 'figuras' && (
                    <>
                      <label className={styles.label}>Franquicia</label>
                      <select className={styles.select} value={form.tipo}
                        onChange={e => setField('tipo', e.target.value)}>
                        <option value="">— Sin franquicia —</option>
                        {FRANQUICIAS.map(f =>
                          <option key={f.id} value={f.id}>{f.label}</option>)}
                      </select>
                    </>
                  )}
                </section>

                {/* Sección: Descripción */}
                <section className={styles.section}>
                  <h3 className={styles.sectionTitle}>Descripción</h3>

                  <label className={styles.label}>Descripción corta</label>
                  <input className={styles.input} value={form.shortDesc}
                    onChange={e => setField('shortDesc', e.target.value)}
                    placeholder="Frase breve que aparece en la tarjeta" />

                  <label className={styles.label}>Descripción completa</label>
                  <textarea className={styles.textarea} value={form.description}
                    onChange={e => setField('description', e.target.value)}
                    rows={5} placeholder="Descripción detallada del producto..." />
                </section>
              </div>

              {/* ── Columna derecha ── */}
              <div>

                {/* Sección: Imagen */}
                <section className={styles.section}>
                  <h3 className={styles.sectionTitle}>Imagen</h3>

                  <label className={styles.label}>Ruta o URL de imagen</label>
                  <input className={styles.input} value={form.image}
                    onChange={e => { setField('image', e.target.value); setImgError(false); }}
                    placeholder="/img/productos/mi-foto.jpg" />
                  <p className={styles.hint}>
                    💡 Copia tu imagen a <code>public/img/productos/</code> y escribe la ruta aquí
                  </p>

                  {/* Preview */}
                  <div className={styles.imgPreview}>
                    {form.image && !imgError
                      ? <img src={form.image} alt="preview" onError={() => setImgError(true)} />
                      : <div className={styles.imgPlaceholder}>
                          <span>🖼️</span>
                          <p>{imgError ? 'No se pudo cargar la imagen' : 'Vista previa de imagen'}</p>
                        </div>
                    }
                  </div>

                  {/* Imágenes rápidas */}
                  <p className={styles.label} style={{ marginTop: 12 }}>Imágenes disponibles en el proyecto</p>
                  <div className={styles.quickImgs}>
                    {QUICK_IMAGES.map(path => (
                      <button key={path} className={`${styles.quickImg} ${form.image === path ? styles.quickImgActive : ''}`}
                        onClick={() => { setField('image', path); setImgError(false); }}>
                        <img src={path} alt="" />
                        <span>{path.split('/').pop()}</span>
                      </button>
                    ))}
                  </div>
                </section>

                {/* Sección: Specs */}
                <section className={styles.section}>
                  <h3 className={styles.sectionTitle}>Especificaciones</h3>
                  {form.specs.map((spec, i) => (
                    <div key={i} className={styles.specRow}>
                      <input className={styles.specInput} value={spec.label}
                        onChange={e => setSpec(i, 'label', e.target.value)}
                        placeholder="Ej: Material" />
                      <input className={styles.specInput} value={spec.value}
                        onChange={e => setSpec(i, 'value', e.target.value)}
                        placeholder="Ej: PLA / PETG" />
                      <button className={styles.removeSpec} onClick={() => removeSpec(i)} title="Eliminar">✕</button>
                    </div>
                  ))}
                  <button className={styles.addSpecBtn} onClick={addSpec}>+ Agregar especificación</button>
                </section>

                {/* Rating / Reseñas */}
                <section className={styles.section}>
                  <div className={styles.row2}>
                    <div>
                      <label className={styles.label}>Rating (1–5)</label>
                      <input className={styles.input} type="number" min="1" max="5" step="0.1"
                        value={form.rating} onChange={e => setField('rating', e.target.value)} />
                    </div>
                    <div>
                      <label className={styles.label}>N° reseñas</label>
                      <input className={styles.input} type="number" min="0"
                        value={form.reviews} onChange={e => setField('reviews', e.target.value)} />
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* Botones de acción */}
            <div className={styles.formActions}>
              {editingId && (
                <button className={styles.cancelBtn}
                  onClick={() => { setForm(EMPTY_FORM); setEditingId(null); setImgError(false); }}>
                  Cancelar edición
                </button>
              )}
              <button
                className={styles.saveBtn}
                onClick={handleSave}
                disabled={!form.name || !form.price}
              >
                {editingId ? '💾 Guardar cambios' : '✅ Agregar producto'}
              </button>
            </div>
          </div>
        )}

        {/* ════════════════ TAB: PRODUCTOS ════════════════ */}
        {tab === 'products' && (
          <div>
            {adminProds.length === 0 ? (
              <div className={styles.empty}>
                <span>📦</span>
                <p>Todavía no has agregado ningún producto</p>
                <button className={styles.saveBtn} onClick={() => setTab('add')}>
                  Agregar primer producto
                </button>
              </div>
            ) : (
              <div className={styles.prodList}>
                {adminProds.map(p => {
                  const catLabel = categories.find(c => c.id === p.category)?.label ?? p.category;
                  return (
                    <div key={p.id} className={styles.prodRow}>
                      <div className={styles.prodThumb}>
                        {p.image
                          ? <img src={p.image} alt={p.name} />
                          : <span>🖼️</span>
                        }
                      </div>
                      <div className={styles.prodInfo}>
                        <p className={styles.prodName}>{p.name}</p>
                        <p className={styles.prodMeta}>
                          {catLabel}{p.sub ? ` › ${p.sub}` : ''}{p.tipo ? ` › ${p.tipo}` : ''}
                        </p>
                        <p className={styles.prodPrice}>
                          ${p.price?.toLocaleString('es-CL')} <span>{p.priceUnit}</span>
                        </p>
                      </div>
                      <div className={styles.prodActions}>
                        <button className={styles.editBtn} onClick={() => handleEdit(p)}>✏️ Editar</button>
                        <button className={styles.deleteBtn} onClick={() => handleDelete(p.id)}>🗑️ Eliminar</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ════════════════ TAB: EXPORTAR ════════════════ */}
        {tab === 'export' && (
          <div className={styles.exportWrap}>
            <div className={styles.exportTop}>
              <div>
                <h3 className={styles.sectionTitle}>Código para products.js</h3>
                <p className={styles.hint}>
                  Copia este bloque y pégalo dentro del array <code>products</code> en <code>src/data/products.js</code>
                </p>
              </div>
              <button className={`${styles.copyBtn} ${copied ? styles.copyBtnDone : ''}`} onClick={handleCopy}>
                {copied ? '✅ ¡Copiado!' : '📋 Copiar código'}
              </button>
            </div>
            <pre className={styles.code}><code>{generateCode(adminProds)}</code></pre>
            <div className={styles.exportNote}>
              <p>💡 <strong>Los productos que agregas aquí ya aparecen en la tienda automáticamente</strong> mientras el servidor esté activo (guardados en el navegador).</p>
              <p>📌 Usa el código de arriba si quieres hacerlos permanentes en <code>products.js</code> (sobreviven al borrar caché).</p>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
