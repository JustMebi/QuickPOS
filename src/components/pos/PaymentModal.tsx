import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePOS } from '@/contexts/POSContext';
import { PaymentMethod } from '@/types/pos';
import {
  Banknote,
  CreditCard,
  Building2,
  Smartphone,
  Wallet,
  Check,
  Printer,
  Mail,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  total: number;
}

const paymentMethods: { id: PaymentMethod; label: string; icon: React.ReactNode }[] = [
  { id: 'cash', label: 'Cash', icon: <Banknote className="h-6 w-6" /> },
  { id: 'card', label: 'Card', icon: <CreditCard className="h-6 w-6" /> },
  { id: 'bank_transfer', label: 'Bank Transfer', icon: <Building2 className="h-6 w-6" /> },
  { id: 'ussd', label: 'USSD', icon: <Smartphone className="h-6 w-6" /> },
  { id: 'wallet', label: 'Wallet / QR', icon: <Wallet className="h-6 w-6" /> },
];

export const PaymentModal: React.FC<PaymentModalProps> = ({
  open,
  onClose,
  total,
}) => {
  const { clearCart } = usePOS();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('cash');
  const [amountTendered, setAmountTendered] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const tenderedValue = parseFloat(amountTendered) || 0;
  const change = selectedMethod === 'cash' ? Math.max(0, tenderedValue - total) : 0;

  const handlePayment = async () => {
    if (selectedMethod === 'cash' && tenderedValue < total) {
      toast({
        title: 'Insufficient amount',
        description: 'Amount tendered is less than total',
        variant: 'destructive',
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsProcessing(false);
    setIsComplete(true);
  };

  const handleClose = () => {
    if (isComplete) {
      clearCart();
    }
    setSelectedMethod('cash');
    setAmountTendered('');
    setIsProcessing(false);
    setIsComplete(false);
    onClose();
  };

  const quickAmounts = [
    Math.ceil(total),
    Math.ceil(total / 5) * 5,
    Math.ceil(total / 10) * 10,
    Math.ceil(total / 20) * 20,
  ].filter((v, i, a) => a.indexOf(v) === i && v >= total).slice(0, 4);

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) handleClose(); }}>
      <DialogContent className="max-w-lg p-0 gap-0 overflow-hidden">
        {!isComplete ? (
          <>
            <DialogHeader className="p-6 pb-4">
              <DialogTitle className="text-2xl font-bold">Payment</DialogTitle>
              <div className="text-4xl font-bold text-accent mt-2">
                ${total.toFixed(2)}
              </div>
            </DialogHeader>

            <div className="px-6 pb-4">
              <p className="text-sm text-muted-foreground mb-3">Select payment method</p>
              <div className="grid grid-cols-5 gap-2">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={cn(
                      'flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200',
                      selectedMethod === method.id
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    )}
                  >
                    {method.icon}
                    <span className="text-xs mt-1 font-medium">{method.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {selectedMethod === 'cash' && (
              <div className="px-6 pb-4 space-y-3">
                <div>
                  <label className="text-sm text-muted-foreground">Amount Tendered</label>
                  <Input
                    type="number"
                    value={amountTendered}
                    onChange={(e) => setAmountTendered(e.target.value)}
                    placeholder="0.00"
                    className="h-14 text-2xl font-bold text-center mt-1"
                  />
                </div>
                <div className="flex gap-2">
                  {quickAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setAmountTendered(amount.toString())}
                      className="flex-1 py-2 px-3 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
                {tenderedValue >= total && (
                  <div className="flex justify-between items-center p-3 rounded-lg bg-success/10 text-success">
                    <span className="font-medium">Change</span>
                    <span className="text-xl font-bold">${change.toFixed(2)}</span>
                  </div>
                )}
              </div>
            )}

            <div className="p-6 pt-2 border-t border-border mt-2">
              <Button
                onClick={handlePayment}
                disabled={isProcessing || (selectedMethod === 'cash' && tenderedValue < total)}
                className="w-full h-14 text-lg font-semibold pos-btn-success rounded-xl"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </div>
                ) : (
                  `Complete Payment`
                )}
              </Button>
            </div>
          </>
        ) : (
          <div className="p-8 text-center animate-scale-in">
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
              <Check className="h-10 w-10 text-success" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Payment Complete!</h2>
            <p className="text-muted-foreground mb-6">
              Transaction #{Date.now().toString(36).toUpperCase()}
            </p>

            {selectedMethod === 'cash' && change > 0 && (
              <div className="p-4 rounded-xl bg-accent/10 mb-6">
                <p className="text-sm text-muted-foreground">Change Due</p>
                <p className="text-3xl font-bold text-accent">${change.toFixed(2)}</p>
              </div>
            )}

            <div className="flex gap-3 justify-center mb-6">
              <Button variant="outline" className="flex items-center gap-2">
                <Printer className="h-4 w-4" />
                Print Receipt
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Receipt
              </Button>
            </div>

            <Button
              onClick={handleClose}
              className="w-full h-12 pos-btn-primary rounded-xl"
            >
              New Sale
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

