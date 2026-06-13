import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextValue = {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  requireAuth: (returnPath?: string) => boolean;
};

const API_URL = 'http://localhost:5000';
const TOKEN_KEY = 'luxor-auth-token';
const RETURN_TO_KEY = 'luxor-return-to';

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem(TOKEN_KEY));
  const [loading, setLoading] = useState(true);

  const persistCartSync = (cartItems: unknown[]) => {
    window.dispatchEvent(new CustomEvent('auth-cart-synced', { detail: cartItems }));
    localStorage.removeItem('luxor-cart');
  };

  const syncGuestCart = async (authToken: string) => {
    const rawGuestCart = localStorage.getItem('luxor-cart');
    let guestCart: unknown[] = [];

    if (rawGuestCart) {
      try {
        const parsed = JSON.parse(rawGuestCart) as unknown;
        guestCart = Array.isArray(parsed) ? parsed : [];
      } catch {
        guestCart = [];
      }
    }

    if (guestCart.length === 0) {
      return [];
    }

    const response = await fetch(`${API_URL}/api/cart/sync`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify({ guestCart })
    });

    if (!response.ok) {
      throw new Error('Unable to sync guest cart');
    }

    const syncedCart = await response.json();
    persistCartSync(syncedCart);
    return syncedCart;
  };

  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!response.ok) {
          localStorage.removeItem(TOKEN_KEY);
          setToken(null);
          setUser(null);
          return;
        }

        const data = await response.json();
        setUser(data.user);
      } catch {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [token]);

  const login = async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Login failed' }));
      throw new Error(error.message || 'Login failed');
    }

    const data = await response.json();
    localStorage.setItem(TOKEN_KEY, data.token);
    setToken(data.token);
    setUser(data.user);
    await syncGuestCart(data.token);
  };

  const register = async (name: string, email: string, password: string) => {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Registration failed' }));
      throw new Error(error.message || 'Registration failed');
    }

    const data = await response.json();
    localStorage.setItem(TOKEN_KEY, data.token);
    setToken(data.token);
    setUser(data.user);
    await syncGuestCart(data.token);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(RETURN_TO_KEY);
    setToken(null);
    setUser(null);
  };

  const requireAuth = (returnPath = '#checkout') => {
    if (user && token) return true;
    localStorage.setItem(RETURN_TO_KEY, returnPath);
    window.location.hash = '#auth';
    return false;
  };

  const value: AuthContextValue = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    requireAuth
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
};
