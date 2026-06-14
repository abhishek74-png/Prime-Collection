import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from './AuthContext';

export type CartProduct = {
  _id?: string;
  product?: string | { _id: string };
  slug: string;
  name?: string;
  title?: string;
  price: number;
  image?: string;
};

export type CartItem = CartProduct & {
  quantity: number;
};

interface CartContextValue {
  items: CartItem[];
  count: number;
  addToCart: (product: CartProduct) => void;
  buyNow: (product: CartProduct) => void;
  removeFromCart: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
}

const API_URL = 'http://localhost:5000';
const GUEST_CART_KEY = 'luxor-cart';
const CartContext = createContext<CartContextValue | null>(null);

const getInitialCart = (): CartItem[] => {
  try {
    const savedCart = localStorage.getItem(GUEST_CART_KEY);
    if (!savedCart) return [];

    const parsed = JSON.parse(savedCart) as unknown;
    return Array.isArray(parsed) ? parsed as CartItem[] : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { token } = useAuth();
  const [items, setItems] = useState<CartItem[]>(getInitialCart);

  const count = useMemo(() => items.reduce((total, item) => total + item.quantity, 0), [items]);

  useEffect(() => {
    if (!token) {
      localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
      return;
    }

    const loadServerCart = async () => {
      try {
        const response = await fetch(`${API_URL}/api/cart`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.ok) {
          const serverCart = await response.json();
          setItems(serverCart);
          localStorage.removeItem(GUEST_CART_KEY);
        }
      } catch {
        localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
      }
    };

    void loadServerCart();
  }, [token]);

  useEffect(() => {
    const onSyncedCart = (event: Event) => {
      const customEvent = event as CustomEvent<CartItem[]>;
      setItems(customEvent.detail || []);
      localStorage.removeItem(GUEST_CART_KEY);
    };

    window.addEventListener('auth-cart-synced', onSyncedCart);
    return () => window.removeEventListener('auth-cart-synced', onSyncedCart);
  }, []);

  useEffect(() => {
    if (!token) return;

    const timeout = window.setTimeout(() => {
      fetch(`${API_URL}/api/cart`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ items })
      }).catch(() => {
        localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
      });
    }, 350);

    return () => window.clearTimeout(timeout);
  }, [items, token]);

  const addToCart = (product: CartProduct) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.slug === product.slug);

      if (existingItem) {
        return currentItems.map((item) =>
          item.slug === product.slug ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [...currentItems, { ...product, quantity: 1 }];
    });
  };

  const buyNow = (product: CartProduct) => {
    addToCart(product);
  };

  const removeFromCart = (slug: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.slug !== slug));
  };

  const updateQuantity = (slug: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(slug);
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) => (item.slug === slug ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const value = useMemo(
    () => ({ items, count, addToCart, buyNow, removeFromCart, updateQuantity, clearCart }),
    [count, items]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }

  return context;
};
