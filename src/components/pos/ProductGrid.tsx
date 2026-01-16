import React, { useState } from 'react';
import { Product } from '@/types/pos';
import { usePOS } from '@/contexts/POSContext';
import { Search, Package } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { categories, products } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { images } from '@/assets/images';

const getCategoryImage = (product: Product) =>
  product.isService
    ? images.services
    : product.category === 'beverages'
      ? images.beverages
      : product.category === 'food'
        ? images.food
        : images.snacks;

export const ProductGrid: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart, formatCurrency } = usePOS();

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full">
      {/* Search Bar */}
      <div className="px-4 py-3 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search products or scan barcode..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11 bg-secondary border-0 focus-visible:ring-accent"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 py-3 border-b border-border">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                'category-pill whitespace-nowrap touch-target',
                selectedCategory === category.id
                  ? 'category-pill-active'
                  : 'category-pill-inactive'
              )}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              formatCurrency={formatCurrency}
              onClick={() => addToCart(product)}
            />
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
            <Package className="h-12 w-12 mb-2" />
            <p>No products found</p>
          </div>
        )}
      </div>
    </div>
  );
};

interface ProductCardProps {
  product: Product;
  formatCurrency: (amount: number) => string;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  formatCurrency,
  onClick,
}) => {
  const isLowStock = !product.isService && product.stock <= 10;
  const fallbackImage = getCategoryImage(product);

  return (
    <button
      onClick={onClick}
      className="product-card text-left w-full animate-fade-in"
      disabled={!product.isService && product.stock <= 0}
    >
      <div className="aspect-square rounded-lg bg-secondary mb-2 flex items-center justify-center overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={fallbackImage}
            alt={product.isService ? 'Service' : product.category}
            className="w-full h-full object-contain"
          />
        )}
      </div>
      <h3 className="font-medium text-sm text-foreground truncate">{product.name}</h3>
      <div className="flex items-center justify-between mt-1">
        <span className="text-base font-bold text-foreground">
          {formatCurrency(product.price)}
        </span>
        {isLowStock && (
          <span className="text-xs px-1.5 py-0.5 rounded bg-warning/10 text-warning font-medium">
            Low
          </span>
        )}
        {!product.isService && product.stock <= 0 && (
          <span className="text-xs px-1.5 py-0.5 rounded bg-destructive/10 text-destructive font-medium">
            Out
          </span>
        )}
      </div>
    </button>
  );
};
