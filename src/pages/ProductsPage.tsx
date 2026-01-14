import React, { useState } from 'react';
import { products, categories } from '@/data/mockData';
import { Product } from '@/types/pos';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Package,
  AlertTriangle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
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

const ProductsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getStockStatus = (product: Product) => {
    if (product.isService) return null;
    if (product.stock <= 0) return { label: 'Out of Stock', variant: 'destructive' as const };
    if (product.stock <= 10) return { label: 'Low Stock', variant: 'warning' as const };
    return { label: 'In Stock', variant: 'default' as const };
  };

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Products</h1>
            <p className="text-muted-foreground">Manage your inventory and services</p>
          </div>
          <Button className="pos-btn-accent rounded-xl gap-2">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 bg-card border-border"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  'category-pill whitespace-nowrap',
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

        {/* Products Table */}
        <div className="dashboard-card p-0 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Cost</TableHead>
                <TableHead className="text-right">Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => {
                const stockStatus = getStockStatus(product);
                return (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                          <img
                            src={getCategoryImage(product)}
                            alt={product.isService ? 'Service' : product.category}
                            className="w-6 h-6 object-contain"
                          />
                        </div>
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground font-mono text-sm">
                      {product.sku}
                    </TableCell>
                    <TableCell className="capitalize">{product.category}</TableCell>
                    <TableCell className="text-right font-medium">
                      ${product.price.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {product.cost ? `$${product.cost.toFixed(2)}` : '??"'}
                    </TableCell>
                    <TableCell className="text-right">
                      {product.isService ? (
                        <span className="text-muted-foreground">?^z</span>
                      ) : (
                        <span className={cn(product.stock <= 10 && 'text-warning font-medium')}>
                          {product.stock}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {stockStatus ? (
                        <Badge
                          variant={stockStatus.variant === 'warning' ? 'outline' : stockStatus.variant}
                          className={cn(
                            stockStatus.variant === 'warning' &&
                              'border-warning text-warning bg-warning/10'
                          )}
                        >
                          {stockStatus.variant === 'warning' && (
                            <AlertTriangle className="h-3 w-3 mr-1" />
                          )}
                          {stockStatus.label}
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Service</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {filteredProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <Package className="h-12 w-12 mb-2" />
              <p>No products found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;