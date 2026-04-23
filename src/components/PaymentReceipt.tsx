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
import { CheckCircle2, Download, Printer, Coffee, Calendar, Hash, User, Mail } from 'lucide-react';
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
        backgroundColor: '#0a0a0a',
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] glass-card border-white/10 text-foreground overflow-hidden p-0">
        <div ref={receiptRef} className="p-8 space-y-6 bg-[#0a0a0a] text-white">
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            </div>
            <DialogTitle className="text-3xl font-bold">Payment Receipt</DialogTitle>
            <p className="text-green-500 font-medium">Successfully Processed</p>
          </div>

          <div className="space-y-4 border-y border-white/10 py-8 my-6">
            <div className="flex justify-between items-center">
              <span className="text-white/60 flex items-center gap-2"><Hash size={16} /> Order ID</span>
              <span className="font-mono text-sm font-medium">{orderDetails.order_id}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/60 flex items-center gap-2"><Coffee size={16} /> Support Amount</span>
              <span className="text-2xl font-bold text-[#FFDD00]">₹{orderDetails.order_amount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/60 flex items-center gap-2"><Calendar size={16} /> Date</span>
              <span className="font-medium">
                {new Date(orderDetails.created_at).toLocaleDateString('en-IN', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/60 flex items-center gap-2"><User size={16} /> Name</span>
              <span className="font-medium">{orderDetails.customer_details?.customer_name || 'Anonymous'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/60 flex items-center gap-2"><Mail size={16} /> Email</span>
              <span className="font-medium">{orderDetails.customer_details?.customer_email || 'N/A'}</span>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-4 text-center border border-white/5">
            <p className="text-xs text-white/40 leading-relaxed">
              Thank you for your generous contribution. This support helps me continue building open-source projects and sharing knowledge.
            </p>
          </div>
          
          <div className="flex flex-col items-center gap-1 pt-4 opacity-50">
            <p className="text-[10px] uppercase tracking-widest font-bold">Sudheer Portfolio</p>
            <div className="h-px w-12 bg-white/20"></div>
          </div>
        </div>

        <DialogFooter className="flex sm:justify-between gap-3 p-6 pt-2">
          <Button variant="outline" onClick={() => window.print()} className="flex-1 gap-2 border-white/10 hover:bg-white/5">
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
