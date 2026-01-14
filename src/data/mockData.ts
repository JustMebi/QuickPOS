import { Product, Category, Customer, Transaction, User, SalesStats } from '@/types/pos';

export const categories: Category[] = [
  { id: 'all', name: 'All Items' },
  { id: 'beverages', name: 'Beverages' },
  { id: 'food', name: 'Food' },
  { id: 'snacks', name: 'Snacks' },
  { id: 'services', name: 'Services' },
];

export const products: Product[] = [
  { id: '1', name: 'Espresso', sku: 'BEV001', category: 'beverages', price: 3.50, cost: 0.80, stock: 999, image: '' },
  { id: '2', name: 'Cappuccino', sku: 'BEV002', category: 'beverages', price: 4.50, cost: 1.20, stock: 999, image: '' },
  { id: '3', name: 'Latte', sku: 'BEV003', category: 'beverages', price: 4.75, cost: 1.30, stock: 999, image: '' },
  { id: '4', name: 'Iced Americano', sku: 'BEV004', category: 'beverages', price: 4.00, cost: 0.90, stock: 999, image: '' },
  { id: '5', name: 'Green Tea', sku: 'BEV005', category: 'beverages', price: 3.00, cost: 0.50, stock: 50, image: '' },
  { id: '6', name: 'Fresh Orange Juice', sku: 'BEV006', category: 'beverages', price: 5.50, cost: 2.00, stock: 30, image: '' },
  { id: '7', name: 'Avocado Toast', sku: 'FOOD001', category: 'food', price: 9.50, cost: 3.50, stock: 25, image: '' },
  { id: '8', name: 'Caesar Salad', sku: 'FOOD002', category: 'food', price: 11.00, cost: 4.00, stock: 20, image: '' },
  { id: '9', name: 'Club Sandwich', sku: 'FOOD003', category: 'food', price: 12.50, cost: 4.50, stock: 15, image: '' },
  { id: '10', name: 'Veggie Wrap', sku: 'FOOD004', category: 'food', price: 10.00, cost: 3.00, stock: 18, image: '' },
  { id: '11', name: 'Chocolate Croissant', sku: 'SNK001', category: 'snacks', price: 4.00, cost: 1.00, stock: 40, image: '' },
  { id: '12', name: 'Blueberry Muffin', sku: 'SNK002', category: 'snacks', price: 3.50, cost: 0.90, stock: 35, image: '' },
  { id: '13', name: 'Cookie Pack', sku: 'SNK003', category: 'snacks', price: 5.00, cost: 1.50, stock: 50, image: '' },
  { id: '14', name: 'Energy Bar', sku: 'SNK004', category: 'snacks', price: 3.00, cost: 1.00, stock: 60, image: '' },
  { id: '15', name: 'Haircut', sku: 'SRV001', category: 'services', price: 25.00, stock: 999, isService: true, image: '' },
  { id: '16', name: 'Hair Coloring', sku: 'SRV002', category: 'services', price: 75.00, stock: 999, isService: true, image: '' },
];

export const customers: Customer[] = [
  { id: '1', name: 'John Smith', phone: '+1 234 567 8901', email: 'john@email.com', totalSpent: 245.50, visitCount: 12 },
  { id: '2', name: 'Sarah Johnson', phone: '+1 234 567 8902', email: 'sarah@email.com', totalSpent: 189.00, visitCount: 8 },
  { id: '3', name: 'Michael Brown', phone: '+1 234 567 8903', totalSpent: 567.25, visitCount: 24 },
];

export const currentUser: User = {
  id: '1',
  name: 'Alex Rivera',
  email: 'alex@store.com',
  role: 'admin',
};

export const salesStats: SalesStats = {
  todaySales: 1247.50,
  todayTransactions: 34,
  weekSales: 8456.75,
  monthSales: 32890.00,
  averageTicket: 36.69,
  topProducts: [
    { product: products[1], sold: 45 },
    { product: products[6], sold: 32 },
    { product: products[2], sold: 28 },
    { product: products[8], sold: 22 },
  ],
};

export const recentTransactions: Transaction[] = [
  {
    id: 'TXN001',
    items: [
      { product: products[1], quantity: 2 },
      { product: products[10], quantity: 1 },
    ],
    subtotal: 13.00,
    tax: 1.04,
    discount: 0,
    total: 14.04,
    paymentMethod: 'card',
    paymentStatus: 'completed',
    cashierId: '1',
    createdAt: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: 'TXN002',
    items: [
      { product: products[6], quantity: 1 },
      { product: products[3], quantity: 1 },
    ],
    subtotal: 13.50,
    tax: 1.08,
    discount: 1.35,
    total: 13.23,
    paymentMethod: 'cash',
    paymentStatus: 'completed',
    customer: customers[0],
    cashierId: '1',
    createdAt: new Date(Date.now() - 1000 * 60 * 15),
  },
];
