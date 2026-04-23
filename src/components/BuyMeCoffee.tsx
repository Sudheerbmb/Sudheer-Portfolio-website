import React, { useState } from 'react';
import { load } from '@cashfreepayments/cashfree-js';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Coffee, Loader2, IndianRupee } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BuyMeCoffeeProps {
  isOpen: boolean;
  onClose: () => void;
}

const BuyMeCoffee: React.FC<BuyMeCoffeeProps> = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState<string>('100');
  const [customAmount, setCustomAmount] = useState<string>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const presets = ['50', '100', '200', '500'];

  const handlePayment = async () => {
    const finalAmount = customAmount || amount;
    if (!finalAmount || isNaN(Number(finalAmount)) || Number(finalAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // 1. Create Order via our API
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Number(finalAmount),
          customerName: name,
          customerEmail: email,
          customerPhone: phone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create order');
      }

      // 2. Initialize Cashfree SDK
      const cashfree = await load({
        mode: (import.meta.env.VITE_CASHFREE_ENV || 'sandbox').toLowerCase() as 'sandbox' | 'production',
      });

      // 3. Start Checkout
      const checkoutOptions = {
        paymentSessionId: data.payment_session_id,
        redirectTarget: '_self', // Use '_modal' if you want a pop-up within the page
      };

      await cashfree.checkout(checkoutOptions);
      
      onClose();
    } catch (error: any) {
      console.error('Payment failed:', error);
      toast({
        title: "Payment Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] glass-card border-white/10 text-foreground">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-bold">
            <Coffee className="text-[#FFDD00]" />
            <span>Buy Me a Coffee</span>
          </DialogTitle>
          <DialogDescription className="text-foreground/70">
            If you like my work, consider supporting me with a small donation!
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="space-y-3">
            <Label className="text-sm font-medium">Select Amount (INR)</Label>
            <div className="grid grid-cols-4 gap-2">
              {presets.map((p) => (
                <Button
                  key={p}
                  variant={amount === p && !customAmount ? "default" : "outline"}
                  className={`font-bold transition-all ${
                    amount === p && !customAmount 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:border-primary/50"
                  }`}
                  onClick={() => {
                    setAmount(p);
                    setCustomAmount('');
                  }}
                >
                  ₹{p}
                </Button>
              ))}
            </div>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50">
                <IndianRupee size={14} />
              </div>
              <Input
                placeholder="Other Amount"
                className="pl-8"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setAmount('');
                }}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name (Optional)</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email (Optional)</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number (Optional)</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="9999999999"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button 
            className="w-full bg-[#FFDD00] text-black hover:bg-[#FFDD00]/90 font-bold h-12 text-lg shadow-lg"
            onClick={handlePayment}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>Support with ₹{customAmount || amount}</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BuyMeCoffee;
