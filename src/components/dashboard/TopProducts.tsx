import React from 'react';
import { salesStats } from '@/data/mockData';

export const TopProducts: React.FC = () => {
  const maxSold = Math.max(...salesStats.topProducts.map((p) => p.sold));

  return (
    <div className="dashboard-card">
      <h3 className="text-lg font-semibold text-foreground mb-4">Top Products</h3>
      <div className="space-y-4">
        {salesStats.topProducts.map(({ product, sold }, index) => (
          <div key={product.id} className="flex items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground w-5">
              {index + 1}
            </span>
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-lg">
              {product.isService ? '✂️' : product.category === 'beverages' ? '☕' : product.category === 'food' ? '🍽️' : '🍪'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground text-sm truncate">
                {product.name}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full transition-all duration-500"
                    style={{ width: `${(sold / maxSold) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground">{sold}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
