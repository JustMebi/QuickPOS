import React from 'react';
import { recentTransactions } from '@/data/mockData';
import { formatDistanceToNow } from 'date-fns';
import { CreditCard, Banknote, Check, Clock, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePOS } from '@/contexts/POSContext';

const paymentIcons: Record<string, React.ReactNode> = {
  cash: <Banknote className="h-4 w-4" />,
  card: <CreditCard className="h-4 w-4" />,
  bank_transfer: <CreditCard className="h-4 w-4" />,
  ussd: <CreditCard className="h-4 w-4" />,
  wallet: <CreditCard className="h-4 w-4" />,
};

const statusIcons: Record<string, React.ReactNode> = {
  completed: <Check className="h-4 w-4" />,
  pending: <Clock className="h-4 w-4" />,
  failed: <AlertCircle className="h-4 w-4" />,
};

const statusColors: Record<string, string> = {
  completed: 'text-success bg-success/10',
  pending: 'text-warning bg-warning/10',
  failed: 'text-destructive bg-destructive/10',
};

export const RecentTransactions: React.FC = () => {
  const { formatCurrency } = usePOS();
  return (
    <div className="dashboard-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Recent Transactions</h3>
        <button className="text-sm text-accent hover:underline">View all</button>
      </div>
      <div className="space-y-3">
        {recentTransactions.map((txn) => (
          <div
            key={txn.id}
            className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-muted-foreground">
                {paymentIcons[txn.paymentMethod]}
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">
                  {txn.items.length} item{txn.items.length > 1 ? 's' : ''}
                  {txn.customer && ` - ${txn.customer.name}`}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(txn.createdAt, { addSuffix: true })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-foreground">{formatCurrency(txn.total)}</span>
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center',
                  statusColors[txn.paymentStatus]
                )}
              >
                {statusIcons[txn.paymentStatus]}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};



