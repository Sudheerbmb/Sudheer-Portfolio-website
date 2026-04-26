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
import PaymentReceipt, { ReceiptData } from '@/components/PaymentReceipt';

// ─── Razorpay types ───────────────────────────────────────────────────────────
declare global {
  interface Window {
    Razorpay: any;
  }
}

interface BuyMeCoffeeProps {
  isOpen: boolean;
  onClose: () => void;
}

type Gateway = 'cashfree' | 'razorpay';

// Check that Razorpay SDK (loaded via index.html) is available
const checkRazorpayLoaded = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    let attempts = 0;
    const interval = setInterval(() => {
      if (window.Razorpay) { clearInterval(interval); resolve(true); }
      else if (++attempts > 20) { clearInterval(interval); resolve(false); }
    }, 100);
  });
};

const BuyMeCoffee: React.FC<BuyMeCoffeeProps> = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState<string>('100');
  const [customAmount, setCustomAmount] = useState<string>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [gateway, setGateway] = useState<Gateway>('razorpay');

  // Receipt state
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);

  const { toast } = useToast();

  const presets = ['50', '100', '200', '500'];

  // ── Cashfree ──────────────────────────────────────────────────────────────
  const handleCashfreePayment = async (finalAmount: string) => {
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
    if (!response.ok) throw new Error(data.message || 'Failed to create Cashfree order');

    const cashfree = await load({
      mode: (import.meta.env.VITE_CASHFREE_ENV || 'sandbox').toLowerCase() as 'sandbox' | 'production',
    });

    await cashfree.checkout({
      paymentSessionId: data.payment_session_id,
      redirectTarget: '_self',
    });

    onClose();
  };

  // ── Razorpay ──────────────────────────────────────────────────────────────
  const handleRazorpayPayment = async (finalAmount: string) => {
    const loaded = await checkRazorpayLoaded();
    if (!loaded) throw new Error('Failed to load Razorpay SDK. Check your connection.');

    const response = await fetch('/api/razorpay-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: Number(finalAmount),
        customerName: name,
        customerEmail: email,
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to create Razorpay order');

    return new Promise<void>((resolve, reject) => {
      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: 'Sudheer BMB',
        description: '☕ Buy Me a Coffee',
        order_id: data.orderId,
        prefill: {
          name: name || 'Anonymous',
          email: email || '',
          contact: phone || '',
        },
        theme: { color: '#FFDD00' },
        handler: async (rzpResponse: any) => {
          try {
            // Verify signature server-side
            const verifyRes = await fetch('/api/razorpay-verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: rzpResponse.razorpay_order_id,
                razorpay_payment_id: rzpResponse.razorpay_payment_id,
                razorpay_signature: rzpResponse.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              // Build unified receipt and show it
              const receipt: ReceiptData = {
                gateway: 'razorpay',
                orderId: rzpResponse.razorpay_order_id,
                paymentId: rzpResponse.razorpay_payment_id,
                customerName: name || 'Anonymous',
                customerEmail: email || undefined,
                amount: Number(finalAmount),
                currency: data.currency || 'INR',
                paidAt: new Date().toISOString(),
              };
              setReceiptData(receipt);
              onClose();            // close the payment dialog
              setIsReceiptOpen(true); // open the receipt dialog

              toast({
                title: '🎉 Payment Successful!',
                description: `Thank you${name ? `, ${name}` : ''}! Your support means a lot. ☕`,
              });
              resolve();
            } else {
              reject(new Error('Payment verification failed. Please contact support.'));
            }
          } catch {
            reject(new Error('Payment verification error.'));
          }
        },
        modal: {
          ondismiss: () => {
            reject(new Error('Payment cancelled.'));
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (rzpResponse: any) => {
        reject(new Error(rzpResponse.error?.description || 'Payment failed'));
      });
      rzp.open();
    });
  };

  // ── Unified handler ───────────────────────────────────────────────────────
  const handlePayment = async () => {
    const finalAmount = customAmount || amount;
    if (!finalAmount || isNaN(Number(finalAmount)) || Number(finalAmount) <= 0) {
      toast({ title: 'Invalid Amount', description: 'Please enter a valid amount.', variant: 'destructive' });
      return;
    }

    if (!phone || phone.replace(/\D/g, '').length < 10) {
      toast({ title: 'Phone Number Required', description: 'Please enter a valid 10-digit phone number.', variant: 'destructive' });
      return;
    }

    setIsLoading(true);
    try {
      if (gateway === 'cashfree') {
        await handleCashfreePayment(finalAmount);
      } else {
        await handleRazorpayPayment(finalAmount);
      }
    } catch (error: any) {
      const msg: string = error?.message || '';
      if (!msg.toLowerCase().includes('cancel')) {
        toast({ title: 'Payment Error', description: msg || 'Something went wrong. Please try again.', variant: 'destructive' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
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

            {/* ── Gateway selector ── */}
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Payment Gateway</Label>
              <div className="grid grid-cols-2 gap-2">
                {(['razorpay', 'cashfree'] as Gateway[]).map((gw) => (
                  <button
                    key={gw}
                    type="button"
                    onClick={() => setGateway(gw)}
                    className={`flex items-center justify-center gap-2 rounded-lg border py-2.5 px-3 text-xs font-semibold transition-all duration-200 ${
                      gateway === gw
                        ? 'border-primary bg-primary/10 text-primary shadow-sm'
                        : 'border-white/10 bg-white/5 text-foreground/60 hover:border-white/20 hover:bg-white/10'
                    }`}
                  >
                    {gw === 'razorpay' ? (
                      <>
                        <img src="https://razorpay.com/favicon.png" alt="Razorpay" className="h-4 w-4 rounded-sm object-contain" />
                        Razorpay
                      </>
                    ) : (
                      <>
                        <img src="https://cashfree.com/favicon.ico" alt="Cashfree" className="h-4 w-4 rounded-sm object-contain" />
                        Cashfree
                      </>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Amount presets ── */}
            <div className="space-y-2">
              <Label className="text-xs font-medium">Select Amount (INR)</Label>
              <div className="grid grid-cols-4 gap-1.5">
                {presets.map((p) => (
                  <Button
                    key={p}
                    variant={amount === p && !customAmount ? 'default' : 'outline'}
                    className={`font-bold h-9 text-xs transition-all ${
                      amount === p && !customAmount
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:border-primary/50'
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

            {/* ── Customer details ── */}
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

      {/* ── Razorpay receipt dialog (shown after successful payment) ── */}
      <PaymentReceipt
        isOpen={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
        receiptData={receiptData}
      />
    </>
  );
};

export default BuyMeCoffee;
