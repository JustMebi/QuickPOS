import React, { useState } from 'react';
import { usePOS } from '@/contexts/POSContext';
import { Minus, Plus, Trash2, Percent, User, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PaymentModal } from './PaymentModal';
import { cn } from '@/lib/utils';

export const Cart: React.FC = () => {
  const {
    cart,
    customer,
    updateQuantity,
    removeFromCart,
    getSubtotal,
    getTax,
    getDiscount,
    getTotal,
    formatCurrency,
    settings,
    clearCart,
  } = usePOS();

  const [showPayment, setShowPayment] = useState(false);

  const subtotal = getSubtotal();
  const tax = getTax();
  const discount = getDiscount();
  const total = getTotal();

  return (
    <div className="flex flex-col h-full bg-pos-cart">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-foreground" />
          <h2 className="font-semibold text-foreground">Current Order</h2>
          <span className="text-sm text-muted-foreground">
            ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)
          </span>
        </div>
        {cart.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearCart}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            Clear
          </Button>
        )}
      </div>

      {/* Customer Selection */}
      {customer && (
        <div className="px-4 py-2 bg-accent/10 border-b border-border">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-foreground">{customer.name}</span>
            <span className="text-xs text-muted-foreground">- {customer.visitCount} visits</span>
          </div>
        </div>
      )}

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <ShoppingCart className="h-12 w-12 mb-2 opacity-30" />
            <p>No items in cart</p>
            <p className="text-sm">Tap products to add them</p>
          </div>
        ) : (
          cart.map((item) => (
            <CartItemRow
              key={item.product.id}
              item={item}
              onUpdateQuantity={(qty) => updateQuantity(item.product.id, qty)}
              onRemove={() => removeFromCart(item.product.id)}
              formatCurrency={formatCurrency}
            />
          ))
        )}
      </div>

      {/* Totals */}
      <div className="border-t border-border p-4 space-y-2 bg-card">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="text-foreground">{formatCurrency(subtotal)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-success">Discount</span>
            <span className="text-success">{formatCurrency(-discount)}</span>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            Tax ({settings.taxRate}%)
          </span>
          <span className="text-foreground">{formatCurrency(tax)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
          <span>Total</span>
          <span className="text-accent">{formatCurrency(total)}</span>
        </div>

        <Button
          onClick={() => setShowPayment(true)}
          disabled={cart.length === 0}
          className="w-full h-14 text-lg font-semibold pos-btn-success rounded-xl mt-2"
        >
          Charge {formatCurrency(total)}
        </Button>
      </div>

      <PaymentModal
        open={showPayment}
        onClose={() => setShowPayment(false)}
        total={total}
      />
    </div>
  );
};

interface CartItemRowProps {
  item: {
    product: { id: string; name: string; price: number };
    quantity: number;
    discount?: { type: 'percentage' | 'fixed'; value: number };
  };
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
  formatCurrency: (amount: number) => string;
}

const CartItemRow: React.FC<CartItemRowProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
  formatCurrency,
}) => {
  const itemTotal = item.product.price * item.quantity;
  const discountAmount = item.discount
    ? item.discount.type === 'percentage'
      ? (itemTotal * item.discount.value) / 100
      : item.discount.value
    : 0;

  return (
    <div className="cart-item animate-slide-up">
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-foreground truncate">{item.product.name}</h4>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">
            {formatCurrency(item.product.price)} x {item.quantity}
          </span>
          {item.discount && (
            <span className="text-success flex items-center gap-0.5">
              <Percent className="h-3 w-3" />
              {item.discount.value}
              {item.discount.type === 'percentage' ? '%' : ''}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className={cn('font-semibold min-w-[60px] text-right', discountAmount > 0 && 'text-success')}>
          {formatCurrency(itemTotal - discountAmount)}
        </span>

        <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
          <button
            onClick={() => onUpdateQuantity(item.quantity - 1)}
            className="keypad-btn h-8 w-8 text-sm"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center font-medium text-foreground">{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.quantity + 1)}
            className="keypad-btn h-8 w-8 text-sm"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <button
          onClick={onRemove}
          className="p-2 text-muted-foreground hover:text-destructive transition-colors"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

