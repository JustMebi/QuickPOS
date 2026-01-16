import React, { useState } from 'react';
import { Download, Calendar, TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { useToast } from '@/hooks/use-toast';

const salesData = [
  { name: 'Mon', revenue: 42000, profit: 12600 },
  { name: 'Tue', revenue: 38000, profit: 11400 },
  { name: 'Wed', revenue: 55000, profit: 16500 },
  { name: 'Thu', revenue: 47000, profit: 14100 },
  { name: 'Fri', revenue: 62000, profit: 18600 },
  { name: 'Sat', revenue: 78000, profit: 23400 },
  { name: 'Sun', revenue: 45000, profit: 13500 },
];

const monthlyData = [
  { name: 'Jan', revenue: 1200000 },
  { name: 'Feb', revenue: 980000 },
  { name: 'Mar', revenue: 1450000 },
  { name: 'Apr', revenue: 1100000 },
  { name: 'May', revenue: 1380000 },
  { name: 'Jun', revenue: 1520000 },
];

const categoryData = [
  { name: 'Food & Beverages', value: 45, color: 'hsl(var(--primary))' },
  { name: 'Snacks', value: 25, color: 'hsl(var(--accent))' },
  { name: 'Toiletries', value: 15, color: 'hsl(var(--secondary))' },
  { name: 'Electronics', value: 10, color: 'hsl(var(--muted))' },
  { name: 'Others', value: 5, color: 'hsl(var(--muted-foreground))' },
];

const topProducts = [
  { name: 'Peak Milk', sold: 245, revenue: 122500 },
  { name: 'Coca-Cola 50cl', sold: 189, revenue: 56700 },
  { name: 'Golden Morn', sold: 156, revenue: 234000 },
  { name: 'Indomie Noodles', sold: 134, revenue: 33500 },
  { name: 'Milo 400g', sold: 98, revenue: 147000 },
];

const cashierPerformance = [
  { name: 'John Doe', transactions: 156, revenue: 485000, avgTicket: 3109 },
  { name: 'Jane Smith', transactions: 142, revenue: 423000, avgTicket: 2979 },
  { name: 'Mike Johnson', transactions: 128, revenue: 398000, avgTicket: 3109 },
];

const ReportsPage: React.FC = () => {
  const [dateRange, setDateRange] = useState('week');
  const { toast } = useToast();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleExport = (format: 'csv' | 'pdf') => {
    toast({
      title: 'Export queued',
      description: `Preparing your ${format.toUpperCase()} report.`,
    });
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground">Track your business performance</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[140px]">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => handleExport('csv')}>
            <Download className="w-4 h-4 mr-2" />
            CSV
          </Button>
          <Button variant="outline" onClick={() => handleExport('pdf')}>
            <Download className="w-4 h-4 mr-2" />
            PDF
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold text-foreground">{formatCurrency(367000)}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-500">+12.5%</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Profit</p>
                <p className="text-2xl font-bold text-foreground">{formatCurrency(110100)}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-500">+8.2%</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Transactions</p>
                <p className="text-2xl font-bold text-foreground">426</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingDown className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-red-500">-3.1%</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-secondary/50 flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-secondary-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Ticket</p>
                <p className="text-2xl font-bold text-foreground">{formatCurrency(861)}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-500">+5.4%</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <Users className="w-6 h-6 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sales" className="space-y-6">
        <TabsList>
          <TabsTrigger value="sales">Sales Overview</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="cashiers">Cashiers</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Revenue vs Profit</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="name" className="text-muted-foreground" />
                      <YAxis className="text-muted-foreground" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                        formatter={(value: number) => formatCurrency(value)}
                      />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="hsl(var(--primary))"
                        fill="hsl(var(--primary) / 0.2)"
                        name="Revenue"
                      />
                      <Area
                        type="monotone"
                        dataKey="profit"
                        stroke="hsl(var(--accent))"
                        fill="hsl(var(--accent) / 0.2)"
                        name="Profit"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => `${value}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2 mt-4">
                  {categoryData.map((category) => (
                    <div key={category.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: category.color }}
                        />
                        <span className="text-muted-foreground">{category.name}</span>
                      </div>
                      <span className="font-medium text-foreground">{category.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="name" className="text-muted-foreground" />
                    <YAxis className="text-muted-foreground" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                      formatter={(value: number) => formatCurrency(value)}
                    />
                    <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={product.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-bold text-primary">{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.sold} units sold</p>
                      </div>
                    </div>
                    <p className="font-semibold text-foreground">{formatCurrency(product.revenue)}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cashiers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cashier Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">Cashier</th>
                      <th className="text-right py-3 px-4 text-muted-foreground font-medium">Transactions</th>
                      <th className="text-right py-3 px-4 text-muted-foreground font-medium">Revenue</th>
                      <th className="text-right py-3 px-4 text-muted-foreground font-medium">Avg. Ticket</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cashierPerformance.map((cashier) => (
                      <tr key={cashier.name} className="border-b border-border last:border-0">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-sm font-medium text-primary">
                                {cashier.name.charAt(0)}
                              </span>
                            </div>
                            <span className="font-medium text-foreground">{cashier.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right text-foreground">{cashier.transactions}</td>
                        <td className="py-3 px-4 text-right font-medium text-foreground">
                          {formatCurrency(cashier.revenue)}
                        </td>
                        <td className="py-3 px-4 text-right text-muted-foreground">
                          {formatCurrency(cashier.avgTicket)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsPage;
