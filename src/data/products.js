// ============================================================
//  KMC 3D — Catálogo de Productos
//  Categorías: impresion3d | impresionlaser | estampados
// ============================================================

export const categories = [
  { id: 'all',            label: 'Todos',             icon: '🛍️' },
  { id: 'impresion3d',    label: 'Impresión 3D',       icon: '🖨️' },
  { id: 'impresionlaser', label: 'Impresión Láser',    icon: '🔥' },
  { id: 'estampados',     label: 'Estampados',         icon: '🎨' },
];

export const products = [
  // ─── IMPRESIÓN 3D ───────────────────────────────────────
  {
    id: 1,
    slug: 'soporte-movil-3d',
    name: 'Soporte para Móvil Personalizado',
    category: 'impresion3d',
    sub: 'soportes',
    price: 4990,
    priceUnit: 'por unidad',
    rating: 4.8,
    reviews: 32,
    badge: 'Popular',
    image: 'https://images.unsplash.com/photo-1612178537253-bccd437b730e?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1612178537253-bccd437b730e?w=800&q=80',
      'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&q=80',
    ],
    shortDesc: 'Soporte ergonómico impreso en PLA/PETG con diseño personalizable.',
    description: `Soporte de escritorio para smartphone diseñado e impreso en 3D con filamento PLA de alta calidad. 
Puedes elegir color, ángulo de inclinación y añadir grabado con tu nombre o logo. 
Proceso de impresión capa a capa con resolución de 0.2 mm que garantiza superficies lisas y resistentes.
Ideal para teletrabajo, gaming y escritorios personalizados.`,
    specs: [
      { label: 'Material', value: 'PLA / PETG / ABS' },
      { label: 'Colores', value: '+20 opciones' },
      { label: 'Resolución', value: '0.2 mm por capa' },
      { label: 'Tiempo de entrega', value: '2-4 días hábiles' },
      { label: 'Personalización', value: 'Nombre o logo incluido' },
    ],
    inStock: true,
  },
  {
    id: 2,
    slug: 'figura-decorativa-3d',
    name: 'Figura Decorativa a Medida',
    category: 'impresion3d',
    sub: 'figuras',
    tipo: 'marvel',
    price: 12990,
    priceUnit: 'desde',
    rating: 5.0,
    reviews: 18,
    badge: 'Premium',
    image: 'https://images.unsplash.com/photo-1659287740003-1f3e5d1e773c?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1659287740003-1f3e5d1e773c?w=800&q=80',
      'https://images.unsplash.com/photo-1612178537253-bccd437b730e?w=800&q=80',
    ],
    shortDesc: 'Figuras únicas, miniaturas, trofeos y decoración personalizada.',
    description: `Imprimimos cualquier figura que tengas en mente: miniaturas para juegos, trofeos personalizados, decoraciones para eventos o prototipos de producto.
Trabajamos con archivos STL/OBJ que tú nos envíes o diseñamos desde cero según tu idea.
Acabados disponibles: mate, satinado y pintado a mano opcional.`,
    specs: [
      { label: 'Formatos aceptados', value: 'STL, OBJ, 3MF' },
      { label: 'Materiales', value: 'PLA, PETG, Resina' },
      { label: 'Tamaño máximo', value: '250 × 210 × 200 mm' },
      { label: 'Tiempo de entrega', value: '3-7 días hábiles' },
      { label: 'Acabado', value: 'Mate / Satinado / Pintado' },
    ],
    inStock: true,
  },
  {
    id: 3,
    slug: 'llavero-personalizado-3d',
    name: 'Llavero Personalizado 3D',
    category: 'impresion3d',
    sub: 'llaveros',
    price: 2990,
    priceUnit: 'por unidad',
    rating: 4.9,
    reviews: 9,
    badge: 'Nuevo',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80'],
    shortDesc: 'Llaveros únicos impresos en 3D con tu diseño, personaje o logo favorito.',
    description: `Llaveros personalizados impresos en 3D en PLA de alta calidad con acabado detallado.
Elige entre nuestros diseños disponibles o envíanos tu idea para crear uno único.
Disponibles en todos los colores con argolla metálica incluida.`,
    specs: [
      { label: 'Material',          value: 'PLA / PETG' },
      { label: 'Colores',           value: '+20 opciones' },
      { label: 'Argolla',           value: 'Metálica incluida' },
      { label: 'Tiempo de entrega', value: '1-2 días hábiles' },
    ],
    inStock: true,
  },

  // ─── IMPRESIÓN LÁSER ────────────────────────────────────
  {
    id: 4,
    slug: 'grabado-madera-laser',
    name: 'Grabado Láser en Madera',
    category: 'impresionlaser',
    price: 6990,
    priceUnit: 'desde',
    rating: 4.9,
    reviews: 47,
    badge: 'Más Vendido',
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80',
    ],
    shortDesc: 'Grabado de alta precisión en madera, MDF, plywood y bambú.',
    description: `Con nuestra cortadora láser CO₂ podemos grabar cualquier diseño, foto, texto o logo en madera con acabados profesionales. 
Ideal para regalos corporativos, decoración de hogar, señaléticas y productos artesanales.
Trabajamos con tableros de hasta 400×400 mm y cualquier tipo de madera.`,
    specs: [
      { label: 'Materiales', value: 'Madera, MDF, Plywood, Bambú' },
      { label: 'Área máxima', value: '400 × 400 mm' },
      { label: 'Potencia', value: '40W CO₂' },
      { label: 'Resolución', value: '0.1 mm' },
      { label: 'Tiempo de entrega', value: '1-3 días hábiles' },
    ],
    inStock: true,
  },
  {
    id: 5,
    slug: 'corte-acrilico-laser',
    name: 'Corte y Grabado en Acrílico',
    category: 'impresionlaser',
    price: 8990,
    priceUnit: 'desde',
    rating: 4.7,
    reviews: 29,
    badge: null,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    ],
    shortDesc: 'Piezas decorativas, letreros y señaléticas en acrílico de colores.',
    description: `Cortamos y grabamos acrílico transparente, opalino y de colores para crear letreros luminosos, logos corporativos, portarretratos y decoración moderna.
El acabado en acrílico grabado con láser es limpio, preciso y de alta calidad visual.`,
    specs: [
      { label: 'Espesores', value: '2, 3, 4, 5, 6 mm' },
      { label: 'Colores', value: 'Transparente, Blanco, Negro, Colores' },
      { label: 'Área máxima', value: '400 × 400 mm' },
      { label: 'Tiempo de entrega', value: '2-4 días hábiles' },
    ],
    inStock: true,
  },
  {
    id: 6,
    slug: 'grabado-cuero-tela-laser',
    name: 'Grabado Láser en Cuero o Tela',
    category: 'impresionlaser',
    price: 5490,
    priceUnit: 'desde',
    rating: 4.6,
    reviews: 14,
    badge: 'Nuevo',
    image: 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=800&q=80',
    ],
    shortDesc: 'Personaliza billeteras, correas, bolsas o prendas con grabado láser.',
    description: `El grabado láser en cuero genera un efecto oscurecido único y permanente, sin tintas ni adhesivos. 
Perfecto para personalizar accesorios de cuero como billeteras, correas, agendas y bolsas.
También podemos grabar en telas densas para crear etiquetas y parches únicos.`,
    specs: [
      { label: 'Materiales', value: 'Cuero genuino, cuero sintético, tela gruesa' },
      { label: 'Área máxima', value: '300 × 300 mm' },
      { label: 'Tiempo de entrega', value: '2-3 días hábiles' },
    ],
    inStock: true,
  },

  // ─── ESTAMPADOS ──────────────────────────────────────────
  {
    id: 7,
    slug: 'polera-personalizada',
    name: 'Polera Personalizada',
    category: 'estampados',
    price: 11990,
    priceUnit: 'por unidad',
    rating: 4.9,
    reviews: 63,
    badge: 'Top Ventas',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80',
    ],
    shortDesc: 'Poleras 100% algodón con tu diseño, logo o foto en alta definición.',
    description: `Estampamos poleras de algodón 100% con tecnología de sublimación y serigrafía según el tipo de diseño. 
Los colores son vibrantes, duraderos y resistentes al lavado. Disponible en tallas XS a 3XL y múltiples colores de polera.
Ideal para grupos, eventos corporativos, regalos y uniformes.`,
    specs: [
      { label: 'Material', value: '100% Algodón 180g / Mezcla' },
      { label: 'Tallas', value: 'XS, S, M, L, XL, XXL, 3XL' },
      { label: 'Técnica', value: 'Sublimación / Serigrafía / DTF' },
      { label: 'Colores polera', value: '+15 colores disponibles' },
      { label: 'Tiempo de entrega', value: '3-5 días hábiles' },
      { label: 'Cantidad mínima', value: '1 unidad' },
    ],
    inStock: true,
  },
  {
    id: 8,
    slug: 'taza-personalizada',
    name: 'Taza Personalizada',
    category: 'estampados',
    price: 5990,
    priceUnit: 'por unidad',
    rating: 5.0,
    reviews: 88,
    badge: 'Favorito',
    image: '/img/tazas/marvel.png',
    images: [
      '/img/tazas/marvel.png',
      '/img/tazas/beetlejuice.png',
      '/img/tazas/cr7.png',
      '/img/tazas/dybala.png',
    ],
    shortDesc: 'Tazas de cerámica 330ml con foto, nombre o diseño personalizado.',
    description: `Las tazas personalizadas son el regalo perfecto para cualquier ocasión. 
Imprimimos con sublimación en tazas de cerámica blanca de 330ml resistentes al microondas y al lavavajillas.
Puedes enviar tu foto, diseño o simplemente darnos una idea y nosotros la diseñamos.`,
    specs: [
      { label: 'Capacidad', value: '330 ml' },
      { label: 'Material', value: 'Cerámica blanca' },
      { label: 'Técnica', value: 'Sublimación full color' },
      { label: 'Apto', value: 'Microondas y lavavajillas' },
      { label: 'Tiempo de entrega', value: '1-2 días hábiles' },
      { label: 'Diseño', value: 'Incluido si no tienes' },
    ],
    inStock: true,
  },
  {
    id: 9,
    slug: 'pack-tazas-empresa',
    name: 'Pack Corporativo Tazas × 12',
    category: 'estampados',
    price: 59990,
    priceUnit: 'pack 12 unidades',
    rating: 4.8,
    reviews: 21,
    badge: 'Oferta',
    image: '/img/tazas/colo 1.png',
    images: [
      '/img/tazas/colo 1.png',
      '/img/tazas/colo 2.png',
      '/img/tazas/ender.png',
      '/img/tazas/stick.png',
    ],
    shortDesc: 'Pack de 12 tazas con logo corporativo, ideal para regalos de empresa.',
    description: `Packs corporativos con tu logo y mensaje en tazas de alta calidad. 
Incluye diseño personalizado sin costo adicional y empaque individual.
Descuentos especiales para volúmenes mayores. ¡Consulta nuestras tarifas!`,
    specs: [
      { label: 'Cantidad', value: '12 unidades' },
      { label: 'Personalización', value: 'Logo + mensaje personalizados' },
      { label: 'Empaque', value: 'Caja individual incluida' },
      { label: 'Tiempo de entrega', value: '3-5 días hábiles' },
    ],
    inStock: true,
  },
];

// ─── ADMIN: gestión de productos en localStorage ───────────
const ADMIN_KEY = 'kmc_admin_products';

export function getAdminProducts() {
  try { return JSON.parse(localStorage.getItem(ADMIN_KEY) || '[]'); }
  catch { return []; }
}

export function getAllProducts() {
  return [...products, ...getAdminProducts()];
}

export function saveAdminProduct(product) {
  const existing = getAdminProducts();
  const idx = existing.findIndex(p => p.id === product.id);
  if (idx >= 0) existing[idx] = product;
  else existing.push(product);
  localStorage.setItem(ADMIN_KEY, JSON.stringify(existing));
}

export function deleteAdminProduct(id) {
  const updated = getAdminProducts().filter(p => p.id !== id);
  localStorage.setItem(ADMIN_KEY, JSON.stringify(updated));
}

export function getNextAdminId() {
  const all = getAllProducts();
  return Math.max(...all.map(p => p.id ?? 0), 100) + 1;
}

// ─── Helpers públicos (usan todos los productos) ────────────
export const getProductBySlug = (slug) => getAllProducts().find(p => p.slug === slug);
export const getProductsByCategory = (cat) =>
  cat === 'all' ? getAllProducts() : getAllProducts().filter(p => p.category === cat);
