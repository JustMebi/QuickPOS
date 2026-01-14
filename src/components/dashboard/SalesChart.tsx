import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Mon', sales: 1200 },
  { name: 'Tue', sales: 1800 },
  { name: 'Wed', sales: 1400 },
  { name: 'Thu', sales: 2200 },
  { name: 'Fri', sales: 2800 },
  { name: 'Sat', sales: 3200 },
  { name: 'Sun', sales: 2400 },
];

export const SalesChart: React.FC = () => {
  return (
    <div className="dashboard-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Weekly Sales</h3>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-sm rounded-lg bg-accent text-accent-foreground font-medium">
            Week
          </button>
          <button className="px-3 py-1 text-sm rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors">
            Month
          </button>
        </div>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(173 80% 40%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(173 80% 40%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 91%)" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(220 9% 46%)', fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(220 9% 46%)', fontSize: 12 }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(0 0% 100%)',
                border: '1px solid hsl(220 13% 91%)',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
              formatter={(value: number) => [`$${value}`, 'Sales']}
            />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="hsl(173 80% 40%)"
              strokeWidth={2}
              fill="url(#salesGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
