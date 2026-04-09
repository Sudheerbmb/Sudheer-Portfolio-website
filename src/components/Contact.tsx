import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init('bhxViku3_mGqu7g9M'); // Your EmailJS public key
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // 1. Send detailed notification to YOU (Admin)
      await emailjs.send(
        'service_7dj0cbe', 
        'template_mqcankn', // Your new "Contact Us" template
        {
          name: values.name,
          email: values.email,
          title: values.subject,
          message: values.message,
        },
        'bhxViku3_mGqu7g9M'
      );

      // 2. Send nice Auto-Reply to the VISITOR
      await emailjs.send(
        'service_7dj0cbe', 
        'template_7onqixd', // Your "Auto-Reply" template
        {
          name: values.name,
          email: values.email,
          title: values.subject,
          message: values.message,
        },
        'bhxViku3_mGqu7g9M'
      );
      
      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out. I've received your message and sent you a confirmation email.",
        duration: 5000,
      });
      form.reset();
    } catch (error: any) {
      console.error('Error sending email:', error);
      toast({
        title: "Error",
        description: error.message || "There was a problem sending your message. Please try again later.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-background/95">
      <div className="container max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-sm uppercase tracking-wider text-accent mb-2">Get In Touch</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold">
            <span className="text-gradient">Contact Me</span>
          </h3>
          <p className="mt-4 text-foreground/70 max-w-3xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out!
            I'm always open to discussing new projects and opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="glass-card rounded-xl p-6 interactive-card h-full">
              <h4 className="text-xl font-bold mb-6">Contact Information</h4>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="text-primary" size={18} />
                  <div>
                    <p className="text-foreground/70 text-sm mb-1">Email</p>
                    <a href="mailto:sudheermsdvk@gmail.com" className="text-foreground hover:text-primary transition-colors">
                      sudheermsdvk@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="text-accent" size={18} />
                  <div>
                    <p className="text-foreground/70 text-sm mb-1">Phone</p>
                    <a href="tel:+917042383822" className="text-foreground hover:text-accent transition-colors">
                      +91-7042383822
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="text-secondary" size={18} />
                  <div>
                    <p className="text-foreground/70 text-sm mb-1">Location</p>
                    <p className="text-foreground">Kadapa, Andhra Pradesh, India</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="glass-card rounded-xl p-6">
              <h4 className="text-xl font-bold mb-6">Send Me a Message</h4>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Your Name" {...field} disabled={isSubmitting} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="email" placeholder="Your Email" {...field} disabled={isSubmitting} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Subject" {...field} disabled={isSubmitting} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea placeholder="Your Message" {...field} disabled={isSubmitting} className="min-h-[120px]" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span>Send Message</span>
                        <Send size={16} />
                      </div>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
