import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { CartItem, Product, Customer, PaymentMethod, User } from '@/types/pos';
import { currentUser } from '@/data/mockData';

interface POSSettings {
  currency: 'ngn' | 'usd' | 'eur' | 'gbp';
  taxRate: number;
  isDarkMode: boolean;
}

interface POSContextType {
  cart: CartItem[];
  customer: Customer | null;
  user: User;
  settings: POSSettings;
  setSettings: (updates: Partial<POSSettings>) => void;
  formatCurrency: (amount: number) => string;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  applyItemDiscount: (productId: string, type: 'percentage' | 'fixed', value: number) => void;
  clearCart: () => void;
  setCustomer: (customer: Customer | null) => void;
  getSubtotal: () => number;
  getTax: () => number;
  getDiscount: () => number;
  getTotal: () => number;
}

const POSContext = createContext<POSContextType | undefined>(undefined);

export const POSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [user] = useState<User>(currentUser);
  const [settings, setSettingsState] = useState<POSSettings>(() => {
    const stored = localStorage.getItem('pos-settings');
    if (stored) {
      try {
        return JSON.parse(stored) as POSSettings;
      } catch {
        return { currency: 'ngn', taxRate: 7.5, isDarkMode: false };
      }
    }
    return { currency: 'ngn', taxRate: 7.5, isDarkMode: false };
  });

  const addToCart = useCallback((product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  const applyItemDiscount = useCallback(
    (productId: string, type: 'percentage' | 'fixed', value: number) => {
      setCart((prev) =>
        prev.map((item) =>
          item.product.id === productId
            ? { ...item, discount: { type, value } }
            : item
        )
      );
    },
    []
  );

  const clearCart = useCallback(() => {
    setCart([]);
    setCustomer(null);
  }, []);

  const setSettings = useCallback((updates: Partial<POSSettings>) => {
    setSettingsState((prev) => ({ ...prev, ...updates }));
  }, []);

  useEffect(() => {
    localStorage.setItem('pos-settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', settings.isDarkMode);
  }, [settings.isDarkMode]);

  const formatCurrency = useCallback(
    (amount: number) => {
      const config =
        {
          ngn: { locale: 'en-NG', currency: 'NGN' },
          usd: { locale: 'en-US', currency: 'USD' },
          eur: { locale: 'en-IE', currency: 'EUR' },
          gbp: { locale: 'en-GB', currency: 'GBP' },
        }[settings.currency] ?? { locale: 'en-NG', currency: 'NGN' };

      return new Intl.NumberFormat(config.locale, {
        style: 'currency',
        currency: config.currency,
        minimumFractionDigits: 2,
      }).format(amount);
    },
    [settings.currency]
  );

  const getSubtotal = useCallback(() => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cart]);

  const getDiscount = useCallback(() => {
    return cart.reduce((sum, item) => {
      if (!item.discount) return sum;
      const itemTotal = item.product.price * item.quantity;
      if (item.discount.type === 'percentage') {
        return sum + (itemTotal * item.discount.value) / 100;
      }
      return sum + item.discount.value;
    }, 0);
  }, [cart]);

  const getTax = useCallback(() => {
    const taxableAmount = getSubtotal() - getDiscount();
    return taxableAmount * (settings.taxRate / 100);
  }, [getSubtotal, getDiscount, settings.taxRate]);

  const getTotal = useCallback(() => {
    return getSubtotal() - getDiscount() + getTax();
  }, [getSubtotal, getDiscount, getTax]);

  return (
    <POSContext.Provider
      value={{
        cart,
        customer,
        user,
        settings,
        setSettings,
        formatCurrency,
        addToCart,
        removeFromCart,
        updateQuantity,
        applyItemDiscount,
        clearCart,
        setCustomer,
        getSubtotal,
        getTax,
        getDiscount,
        getTotal,
      }}
    >
      {children}
    </POSContext.Provider>
  );
};

export const usePOS = () => {
  const context = useContext(POSContext);
  if (!context) {
    throw new Error('usePOS must be used within a POSProvider');
  }
  return context;
};
