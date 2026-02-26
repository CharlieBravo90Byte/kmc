# KMC 3D — Tienda Web

> Tienda online para **KMC 3D** — Impresión 3D, grabado láser y estampados personalizados en Chile.

Construida con **React 19 · Vite 8 · CSS Modules** como Single Page Application (SPA) con panel de administración independiente.

---

## 🚀 Arranque rápido

```bash
npm install
npm run dev
```

O doble clic en `start.bat`

| Página | URL |
|--------|-----|
| 🛍️ Tienda | http://localhost:5173/ |
| ⚙️ Admin | http://localhost:5173/admin/ |

---

## 🗂️ Estructura del proyecto

```
kmc/
├── index.html              → Entry point de la tienda pública
├── admin/
│   └── index.html          → Entry point del panel de administración (página separada)
├── public/
│   └── img/
│       ├── logo/           → logo.png, logo-small.png
│       ├── promo/          → impresora3d.png, laser.png, estampado.png
│       └── tazas/          → beetlejuice, colo 1&2, cr7, dybala, ender, marvel, stick
├── src/
│   ├── main.jsx            → Monta la tienda en #root
│   ├── admin-main.jsx      → Monta el admin en #admin-root
│   ├── App.jsx             → Router + layout público
│   ├── index.css           → Variables CSS + utilidades globales
│   ├── components/
│   │   ├── Navbar          → Navegación sticky + menú móvil
│   │   ├── Footer          → Pie de página con datos de contacto
│   │   ├── ProductCard     → Tarjeta de producto con overlay
│   │   └── CartDrawer      → Carrito lateral + checkout WhatsApp
│   ├── context/
│   │   └── CartContext     → Estado global del carrito (useReducer + localStorage)
│   ├── data/
│   │   └── products.js     → Catálogo base + helpers admin (localStorage)
│   └── pages/
│       ├── Home            → Hero animado, servicios, productos destacados
│       ├── Shop            → Tienda con filtros en cascada (3 niveles)
│       ├── ProductDetail   → Detalle de producto, galería, especificaciones
│       ├── Contact         → Formulario → WhatsApp
│       └── Admin           → Panel de administración privado
└── _old-html/              → Sitio HTML original archivado
```

---

## 🛠️ Tecnologías

| Tecnología | Versión | Uso |
|---|---|---|
| React | 19 | Framework UI |
| Vite | 8 (beta) | Bundler / Dev server |
| React Router | v7 | Navegación SPA |
| CSS Modules | — | Estilos por componente |
| Lucide React | — | Íconos |
| localStorage | — | Carrito + productos admin |

---

## 🏪 Funcionalidades de la tienda

- **Hero** con 4 slides animados (impresora 3D, láser, estampados, logo)
- **Shop** con filtros en cascada:
  - Nivel 1 → Categoría (Impresión 3D / Láser / Estampados)
  - Nivel 2 → Sub-categoría (Figuras / Llaveros / Soportes)
  - Nivel 3 → Franquicia (Pokémon / Marvel / Super Mario / Pitufos / Star Wars)
- **Carrito** lateral con contador y checkout por WhatsApp
- **Detalle de producto** con galería de imágenes y tabla de especificaciones
- **Formulario de contacto** que genera mensaje pre-cargado en WhatsApp
- Persistencia del carrito en `localStorage`

---

## ⚙️ Panel de administración

Acceso: `http://localhost:5173/admin/` — **no aparece en ningún menú**

```
PIN por defecto: kmc2026   (modificar en src/pages/Admin.jsx → const PIN)
```

### ¿Qué puedes hacer?
| Pestaña | Descripción |
|---------|-------------|
| ➕ Nuevo producto | Agregar con formulario: nombre, categoría, imagen, specs, precio |
| 📦 Mis productos | Listar, editar y eliminar productos creados desde el panel |
| 📋 Exportar código | Genera el bloque JS listo para pegar en `products.js` |

### Agregar imagen de un producto
1. Copia la imagen a `public/img/productos/`
2. En el campo imagen escribe `/img/productos/nombre-archivo.jpg`
3. La vista previa se muestra de inmediato

> Los productos del admin se guardan en `localStorage` del navegador y aparecen en la tienda automáticamente. Para hacerlos permanentes, usa "Exportar código" y pega el bloque en `src/data/products.js`.

---

## 📦 Agregar productos permanentes

Edita `src/data/products.js` siguiendo esta estructura:

```js
{
  id: 10,                        // ID único
  slug: 'mi-producto',           // URL del producto (/shop/mi-producto)
  name: 'Nombre del Producto',
  category: 'impresion3d',       // impresion3d | impresionlaser | estampados
  sub: 'figuras',                // (solo impresion3d) figuras | llaveros | soportes
  tipo: 'marvel',                // (solo figuras) pokemon | marvel | supermario | pitufos | starwars
  price: 4990,
  priceUnit: 'por unidad',
  rating: 5.0,
  reviews: 0,
  badge: 'Nuevo',                // null para sin badge
  image: '/img/productos/foto.jpg',
  images: ['/img/productos/foto.jpg'],
  shortDesc: 'Descripción corta para la tarjeta.',
  description: `Descripción completa del producto.`,
  specs: [
    { label: 'Material', value: 'PLA' },
  ],
  inStock: true,
}
```

---

## 🎨 Tema y estilos

Variables CSS globales en `src/index.css`:

```css
--bg-primary:    #080b10   /* Fondo oscuro principal */
--bg-secondary:  #0f1117   /* Fondo tarjetas */
--green:         #22c55e   /* Color de acento */
--font-body:     'Inter'
--font-display:  'Space Grotesk'
```

---

## 🏗️ Build para producción

```bash
npm run build
npm run preview
```

Genera dos bundles separados en `dist/`:
- `dist/index.html` → Tienda pública
- `dist/admin/index.html` → Panel de administración

---

## 📞 Contacto KMC

- **Email:** ca.bravoj29@gmail.com
- **WhatsApp:** +56 9 48192023
- **País:** Chile
