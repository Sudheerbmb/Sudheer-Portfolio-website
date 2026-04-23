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

    if (!phone || phone.length < 10) {
      toast({
        title: "Phone Number Required",
        description: "Please enter a valid 10-digit phone number.",
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
      <DialogContent className="sm:max-w-[425px] w-[95vw] glass-card border-white/10 text-foreground max-h-[95vh] overflow-y-auto">
        <DialogHeader className="space-y-1">
          <DialogTitle className="flex items-center gap-2 text-xl font-bold">
            <Coffee className="text-[#FFDD00]" size={20} />
            <span>Buy Me a Coffee</span>
          </DialogTitle>
          <DialogDescription className="text-foreground/70 text-xs">
            Consider supporting me with a small donation!
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="space-y-2">
            <Label className="text-xs font-medium">Select Amount (INR)</Label>
            <div className="grid grid-cols-4 gap-1.5">
              {presets.map((p) => (
                <Button
                  key={p}
                  variant={amount === p && !customAmount ? "default" : "outline"}
                  className={`font-bold h-9 text-xs transition-all ${
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
                <IndianRupee size={12} />
              </div>
              <Input
                placeholder="Other Amount"
                className="pl-8 h-9 text-xs"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setAmount('');
                }}
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-xs">Your Name (Optional)</Label>
              <Input
                id="name"
                placeholder="John Doe"
                className="h-9 text-xs"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs">Email (Optional)</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                className="h-9 text-xs"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-xs">Phone Number (Required)</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter 10-digit number"
                className="h-9 text-xs"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
        </div>

        <DialogFooter className="pt-2">
          <Button 
            className="w-full bg-[#FFDD00] text-black hover:bg-[#FFDD00]/90 font-bold h-11 text-base shadow-lg"
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
