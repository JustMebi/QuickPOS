# 🛒 Modern POS System

A modern, web-based Point of Sale system designed for small to medium businesses. Touch-optimized, tablet-first interface with real-time inventory tracking, multi-payment support, and offline capability.

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)

## ✨ Features

### 🏪 Point of Sale
- Fast, touch-optimized checkout interface
- Product search and category filtering
- Real-time cart management with quantity adjustments
- Discount support (percentage & fixed amount)
- Auto-calculated totals and tax

### 💳 Payment Processing
- Multiple payment methods: Cash, Card, Bank Transfer, USSD, Wallet/QR
- Automatic change calculation
- Transaction status tracking

### 📦 Inventory Management
- Real-time stock tracking
- Low stock alerts
- Product categorization
- SKU-based product identification

### 👥 Customer Management
- Customer profiles with contact info
- Purchase history tracking
- Loyalty metrics (total spent, visit count)

### 📊 Reports & Analytics
- Sales summaries (daily, weekly, monthly)
- Revenue vs profit analysis
- Top-selling products
- Cashier performance metrics
- Export to CSV/PDF

### ⚙️ Settings
- Theme toggle (dark/light mode)
- Business customization (store name, currency, tax rate)
- Notification preferences
- Security settings

### 🔐 Role-Based Access
- **Admin**: Full system access
- **Manager**: Reports, inventory, refunds
- **Cashier**: Sales operations only

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ & npm

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd pos-system

# Install dependencies
npm install
```

The app will be available at `http://localhost:8080` (port configured in `vite.config.ts`).

### Run the app

```bash
# Start development server
npm run dev
```

### Rebuild artifacts

```bash
# Build production assets into dist/
npm run build

# Regenerate TypeScript incremental build files (*.tsbuildinfo)
npx tsc -b
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── dashboard/      # Dashboard widgets (charts, stats)
│   ├── pos/            # POS components (cart, products, payment)
│   └── ui/             # Reusable UI components (shadcn/ui)
├── contexts/           # React Context providers
├── data/               # Mock data for development
├── hooks/              # Custom React hooks
├── pages/              # Route page components
├── types/              # TypeScript type definitions
└── lib/                # Utility functions
```

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix primitives)
- **Charts**: Recharts
- **Routing**: React Router v6
- **State Management**: React Context API

## 📱 Responsive Design

- **Tablet-first**: Optimized for touch interfaces
- **Mobile-friendly**: Responsive layouts for all screen sizes
- **Desktop support**: Full functionality on larger screens

## 🎨 Theming

The app supports both light and dark modes with a professional navy/teal color palette. Theme can be toggled in Settings.

## 🔮 Roadmap

- [ ] Backend integration (authentication, database)
- [ ] Barcode/QR code scanning
- [ ] Offline mode with sync
- [ ] Receipt printing
- [ ] Multi-store/branch support
- [ ] Audit logging

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---
