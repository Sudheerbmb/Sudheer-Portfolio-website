import React, { useEffect } from 'react';
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

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    const orderId = searchParams.get('order_id');
    if (orderId) {
      toast({
        title: "Support Received! ☕",
        description: "Thank you so much for your support. It means a lot to me!",
        duration: 5000,
      });
      // Remove the order_id from the URL without reloading
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('order_id');
      setSearchParams(newParams, { replace: true });
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
    </MainLayout>
  );
};

export default Index;
