export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  cost?: number;
  stock: number;
  image?: string;
  isService?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  discount?: {
    type: 'percentage' | 'fixed';
    value: number;
  };
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  totalSpent: number;
  visitCount: number;
}

export interface Transaction {
  id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'pending' | 'completed' | 'failed';
  customer?: Customer;
  cashierId: string;
  createdAt: Date;
}

export type PaymentMethod = 'cash' | 'card' | 'bank_transfer' | 'ussd' | 'wallet';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'cashier';
  avatar?: string;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
}

export interface SalesStats {
  todaySales: number;
  todayTransactions: number;
  weekSales: number;
  monthSales: number;
  averageTicket: number;
  topProducts: { product: Product; sold: number }[];
}
