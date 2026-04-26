import React, { useRef } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, ShieldCheck } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// ─── Unified receipt data shape ───────────────────────────────────────────────
// Supports both Cashfree (verify-order API) and Razorpay (handler callback)
export interface ReceiptData {
  gateway: 'cashfree' | 'razorpay';

  // Identifiers
  orderId: string;
  paymentId: string;
  bankReference?: string;  // UTR — Cashfree only

  // Customer
  customerName?: string;
  customerEmail?: string;

  // Amount & time
  amount: number;
  currency: string;
  paidAt: string;         // ISO date string

  // Method
  paymentMethod?: string; // e.g. "UPI", "Card", "Net Banking"
}

interface PaymentReceiptProps {
  isOpen: boolean;
  onClose: () => void;
  receiptData: ReceiptData | null;
}

const GATEWAY_LABEL: Record<'cashfree' | 'razorpay', string> = {
  cashfree: 'Cashfree',
  razorpay: 'Razorpay',
};

const PaymentReceipt: React.FC<PaymentReceiptProps> = ({ isOpen, onClose, receiptData }) => {
  const receiptRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    if (!receiptRef.current || !receiptData) return;
    try {
      const canvas = await html2canvas(receiptRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`receipt-${receiptData.orderId}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  if (!receiptData) return null;

  const formattedDate = (() => {
    try {
      return new Date(receiptData.paidAt).toLocaleString('en-IN', {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit', hour12: true,
      });
    } catch {
      return receiptData.paidAt;
    }
  })();

  const gatewayLabel = GATEWAY_LABEL[receiptData.gateway];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] w-[95vw] glass-card border-white/10 text-foreground overflow-hidden p-0 max-h-[95vh] flex flex-col">
        <div className="overflow-y-auto flex-1">
          <div ref={receiptRef} className="p-6 sm:p-8 space-y-6 bg-white text-slate-900">

            {/* ── Header ── */}
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-[10px] uppercase tracking-wider font-bold text-slate-500">Official Receipt</h2>
                <h1 className="text-xl font-black text-slate-900">Sudheer Portfolio</h1>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Status</p>
                <p className="text-green-600 text-xs font-bold flex items-center gap-1 justify-end">
                  <ShieldCheck size={12} /> PAID
                </p>
              </div>
            </div>

            {/* ── Order & Payment IDs ── */}
            <div className="grid grid-cols-2 gap-4 py-1">
              <div className="space-y-1">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Order Details</p>
                <div className="space-y-1.5">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-slate-500">Order ID</span>
                    <span className="text-[10px] font-mono font-bold break-all">{receiptData.orderId}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-slate-500">Date &amp; Time</span>
                    <span className="text-[10px] font-bold">{formattedDate}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Payment Details</p>
                <div className="space-y-1.5">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-slate-500">Payment ID</span>
                    <span className="text-[10px] font-mono font-bold break-all">{receiptData.paymentId || 'N/A'}</span>
                  </div>
                  {receiptData.bankReference && (
                    <div className="flex flex-col">
                      <span className="text-[9px] text-slate-500">Bank Reference (UTR)</span>
                      <span className="text-[10px] font-mono font-bold break-all">{receiptData.bankReference}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ── Customer info ── */}
            <div className="bg-slate-50 rounded-lg p-3 space-y-2">
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-500">Customer Name</span>
                <span className="font-bold">{receiptData.customerName || 'Anonymous'}</span>
              </div>
              {receiptData.customerEmail && (
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-500">Customer Email</span>
                  <span className="font-bold">{receiptData.customerEmail}</span>
                </div>
              )}
              {receiptData.paymentMethod && (
                <div className="flex justify-between items-center text-[11px] border-t border-slate-200 pt-2">
                  <span className="text-slate-500">Payment Method</span>
                  <span className="font-bold uppercase">{receiptData.paymentMethod}</span>
                </div>
              )}
            </div>

            {/* ── Amount ── */}
            <div className="flex justify-between items-end pt-3 border-t border-slate-100">
              <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase">Amount Paid</p>
                <p className="text-2xl font-black text-slate-900">
                  {receiptData.currency === 'INR' ? '₹' : receiptData.currency}
                  {receiptData.amount.toFixed(2)}
                </p>
              </div>
              <div className="text-right text-[9px] text-slate-400">
                <p>Processed by {gatewayLabel}</p>
                <p>Secure Transaction</p>
              </div>
            </div>

            <div className="text-center pt-4 opacity-30">
              <p className="text-[7px] uppercase tracking-[0.2em] font-bold">Electronically generated receipt.</p>
            </div>
          </div>
        </div>

        <DialogFooter className="p-4 pt-2 bg-slate-50 border-t border-slate-100">
          <Button
            onClick={downloadPDF}
            className="w-full h-11 text-sm gap-2 bg-[#FFDD00] text-black hover:bg-[#FFDD00]/90 font-bold shadow-md transition-all active:scale-[0.98]"
          >
            <Download size={18} /> Download Official Receipt (PDF)
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentReceipt;
