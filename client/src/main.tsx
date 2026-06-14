import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { SmoothScroll } from './components/SmoothScroll';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <SmoothScroll>
          <App />
        </SmoothScroll>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
