import React from 'react';
import { StatCard } from '@/components/dashboard/StatCard';
import { SalesChart } from '@/components/dashboard/SalesChart';
import { TopProducts } from '@/components/dashboard/TopProducts';
import { RecentTransactions } from '@/components/dashboard/RecentTransactions';
import { salesStats } from '@/data/mockData';
import {
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Users,
} from 'lucide-react';
import { usePOS } from '@/contexts/POSContext';

const DashboardPage: React.FC = () => {
  const { formatCurrency } = usePOS();

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your store overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Today's Sales"
            value={formatCurrency(salesStats.todaySales)}
            trend={{ value: 12.5, isPositive: true }}
            icon={<DollarSign className="h-6 w-6" />}
            variant="accent"
          />
          <StatCard
            title="Transactions"
            value={salesStats.todayTransactions.toString()}
            subtitle="Today"
            icon={<ShoppingCart className="h-6 w-6" />}
          />
          <StatCard
            title="Average Ticket"
            value={formatCurrency(salesStats.averageTicket)}
            trend={{ value: 3.2, isPositive: true }}
            icon={<TrendingUp className="h-6 w-6" />}
            variant="success"
          />
          <StatCard
            title="This Month"
            value={formatCurrency(salesStats.monthSales)}
            trend={{ value: 8.1, isPositive: true }}
            icon={<Users className="h-6 w-6" />}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SalesChart />
          </div>
          <TopProducts />
        </div>

        {/* Recent Transactions */}
        <RecentTransactions />
      </div>
    </div>
  );
};

export default DashboardPage;
