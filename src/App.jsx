import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { CartProvider } from './context/CartContext';
import Navbar     from './components/Navbar';
import Footer     from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Home          from './pages/Home';
import Shop          from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Contact       from './pages/Contact';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Navbar />
        <CartDrawer />
        <Routes>
          <Route path="/"           element={<Home />} />
          <Route path="/shop"       element={<Shop />} />
          <Route path="/shop/:slug" element={<ProductDetail />} />
          <Route path="/contact"    element={<Contact />} />
          <Route path="*" element={
            <div style={{ minHeight:'60vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:16 }}>
              <h2 style={{ fontFamily:'var(--font-display)', fontSize:'2rem' }}>Página no encontrada</h2>
              <a href="/" className="btn btn-primary">Ir al inicio</a>
            </div>
          } />
        </Routes>
        <Footer />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
