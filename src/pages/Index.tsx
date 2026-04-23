import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Blog from '@/components/Blog';
import Contact from '@/components/Contact';
import { useToast } from '@/hooks/use-toast';
import PaymentReceipt from '@/components/PaymentReceipt';

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    const orderId = searchParams.get('order_id');
    if (orderId) {
      const verifyOrder = async () => {
        try {
          const response = await fetch(`/api/verify-order?order_id=${orderId}`);
          const data = await response.json();

          if (response.ok && data.order_status === 'PAID') {
            setOrderDetails(data);
            setIsReceiptOpen(true);
            toast({
              title: "Support Received! ☕",
              description: "Thank you so much for your support. It means a lot to me!",
              duration: 5000,
            });
          } else {
            console.error('Order verification failed or not paid:', data);
          }
        } catch (error) {
          console.error('Error verifying order:', error);
        } finally {
          // Remove the order_id from the URL without reloading
          const newParams = new URLSearchParams(searchParams);
          newParams.delete('order_id');
          setSearchParams(newParams, { replace: true });
        }
      };

      verifyOrder();
    }
  }, [searchParams, setSearchParams, toast]);

  return (
    <MainLayout>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Blog />
      <Contact />
      
      <PaymentReceipt 
        isOpen={isReceiptOpen} 
        onClose={() => setIsReceiptOpen(false)} 
        orderDetails={orderDetails} 
      />
    </MainLayout>
  );
};

export default Index;
