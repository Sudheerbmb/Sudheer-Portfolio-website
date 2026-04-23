import React, { useRef } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Download, Printer, Coffee, Calendar, Hash, User, Mail, CreditCard, Landmark, ShieldCheck } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface PaymentReceiptProps {
  isOpen: boolean;
  onClose: () => void;
  orderDetails: any;
}

const PaymentReceipt: React.FC<PaymentReceiptProps> = ({ isOpen, onClose, orderDetails }) => {
  const receiptRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    if (!receiptRef.current) return;
    
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
      pdf.save(`receipt-${orderDetails.order_id}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  if (!orderDetails) return null;

  const payment = orderDetails.payment_details || {};

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] glass-card border-white/10 text-foreground overflow-hidden p-0">
        <div ref={receiptRef} className="p-8 space-y-6 bg-white text-slate-900">
          <div className="flex justify-between items-start border-b border-slate-100 pb-6">
            <div>
              <h2 className="text-sm uppercase tracking-wider font-bold text-slate-500">Official Receipt</h2>
              <h1 className="text-2xl font-black text-slate-900">Sudheer Portfolio</h1>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-slate-400 uppercase">Status</p>
              <p className="text-green-600 font-bold flex items-center gap-1 justify-end">
                <ShieldCheck size={14} /> PAID
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 py-2">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Order Details</p>
              <div className="space-y-2">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500">Order ID</span>
                  <span className="text-xs font-mono font-bold">{orderDetails.order_id}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500">Date & Time</span>
                  <span className="text-xs font-bold">
                    {new Date(orderDetails.created_at).toLocaleString('en-IN', { 
                      day: '2-digit', month: 'short', year: 'numeric',
                      hour: '2-digit', minute: '2-digit', hour12: true 
                    })}
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Payment Details</p>
              <div className="space-y-2">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500">Payment ID</span>
                  <span className="text-xs font-mono font-bold">{payment.cf_payment_id || 'N/A'}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500">Bank Reference (UTR)</span>
                  <span className="text-xs font-mono font-bold">{payment.bank_reference || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">Customer Name</span>
              <span className="font-bold">{orderDetails.customer_details?.customer_name || 'Anonymous'}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">Customer Email</span>
              <span className="font-bold">{orderDetails.customer_details?.customer_email || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center text-sm border-t border-slate-200 pt-3">
              <span className="text-slate-500">Payment Method</span>
              <span className="font-bold uppercase flex items-center gap-1">
                {payment.payment_group === 'upi' ? 'UPI' : payment.payment_group || 'N/A'}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-end pt-4 border-t border-slate-100">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Amount Paid</p>
              <p className="text-3xl font-black text-slate-900">₹{orderDetails.order_amount.toFixed(2)}</p>
            </div>
            <div className="text-right text-[10px] text-slate-400">
              <p>Processed by Cashfree Payments</p>
              <p>Secure Transaction • 256-bit SSL</p>
            </div>
          </div>
          
          <div className="text-center pt-6 opacity-30">
            <p className="text-[8px] uppercase tracking-[0.2em] font-bold">This is an electronically generated receipt.</p>
          </div>
        </div>

        <DialogFooter className="flex sm:justify-between gap-3 p-6 pt-2">
          <Button variant="outline" onClick={() => window.print()} className="flex-1 gap-2 border-slate-200 hover:bg-slate-100 text-slate-900">
            <Printer size={18} /> Print
          </Button>
          <Button onClick={downloadPDF} className="flex-1 gap-2 bg-[#FFDD00] text-black hover:bg-[#FFDD00]/90 font-bold">
            <Download size={18} /> Download PDF
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentReceipt;
