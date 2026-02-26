import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext(null);

const initialState = {
  items: [],          // { product, quantity }
  isOpen: false,
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const exists = state.items.find(i => i.product.id === action.product.id);
      if (exists) {
        return {
          ...state,
          items: state.items.map(i =>
            i.product.id === action.product.id
              ? { ...i, quantity: i.quantity + (action.qty || 1) }
              : i
          ),
        };
      }
      return { ...state, items: [...state.items, { product: action.product, quantity: action.qty || 1 }] };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.product.id !== action.id) };

    case 'UPDATE_QTY':
      return {
        ...state,
        items: state.items.map(i =>
          i.product.id === action.id ? { ...i, quantity: Math.max(1, action.qty) } : i
        ),
      };
    case 'CLEAR':
      return { ...state, items: [] };

    case 'OPEN_CART':
      return { ...state, isOpen: true };
    case 'CLOSE_CART':
      return { ...state, isOpen: false };
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState, (init) => {
    try {
      const saved = localStorage.getItem('kmc_cart');
      return saved ? { ...init, items: JSON.parse(saved) } : init;
    } catch {
      return init;
    }
  });

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem('kmc_cart', JSON.stringify(state.items));
  }, [state.items]);

  const totalItems = state.items.reduce((acc, i) => acc + i.quantity, 0);
  const totalPrice = state.items.reduce((acc, i) => acc + i.product.price * i.quantity, 0);

  const addItem    = (product, qty = 1) => dispatch({ type: 'ADD_ITEM', product, qty });
  const removeItem = (id)               => dispatch({ type: 'REMOVE_ITEM', id });
  const updateQty  = (id, qty)          => dispatch({ type: 'UPDATE_QTY', id, qty });
  const clearCart  = ()                 => dispatch({ type: 'CLEAR' });
  const openCart   = ()                 => dispatch({ type: 'OPEN_CART' });
  const closeCart  = ()                 => dispatch({ type: 'CLOSE_CART' });
  const toggleCart = ()                 => dispatch({ type: 'TOGGLE_CART' });

  return (
    <CartContext.Provider value={{
      items: state.items,
      isOpen: state.isOpen,
      totalItems,
      totalPrice,
      addItem,
      removeItem,
      updateQty,
      clearCart,
      openCart,
      closeCart,
      toggleCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
