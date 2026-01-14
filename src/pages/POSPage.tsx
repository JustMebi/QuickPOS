import React from 'react';
import { ProductGrid } from '@/components/pos/ProductGrid';
import { Cart } from '@/components/pos/Cart';

const POSPage: React.FC = () => {
  return (
    <div className="flex h-full">
      {/* Product Grid */}
      <div className="flex-1 border-r border-border">
        <ProductGrid />
      </div>

      {/* Cart */}
      <div className="w-[380px] lg:w-[420px]">
        <Cart />
      </div>
    </div>
  );
};

export default POSPage;
