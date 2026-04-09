import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence, useScroll } from 'framer-motion';
import Resume from './Resume';

const FuturisticSymbol = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const { scrollYProgress } = useScroll();

  const springConfig = { damping: 30, stiffness: 400 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(springY, [-50, 50], [30, -30]);
  const rotateY = useTransform(springX, [-50, 50], [-30, 30]);
  const scrollRotation = useTransform(scrollYProgress, [0, 1], [0, 720]);
  const scrollScale = useTransform(scrollYProgress, [0, 0.2, 1], [1, 1.1, 1]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <motion.div
      ref={containerRef}
      className="relative w-12 h-12 md:w-14 md:h-14 cursor-pointer perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
        setIsHovered(false);
      }}
      style={{ scale: scrollScale }}
    >
      <motion.div
        className="absolute inset-0 preserve-3d"
        style={{
          rotateX,
          rotateY,
          rotateZ: scrollRotation,
        }}
      >
        {/* Outer Geometric Ring */}
        <motion.div
          className="absolute inset-0 border-2 border-primary/40 rounded-xl"
          animate={{
            rotate: [0, 360],
            borderRadius: ["30%", "50%", "30%"],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />

        {/* Floating Hexagons */}
        {[0, 1, 2].map((i) => (
          <motion.svg
            key={i}
            className="absolute inset-0 w-full h-full opacity-70"
            viewBox="0 0 100 100"
            style={{ translateZ: i * 15 - 15 }}
          >
            <motion.path
              d="M50 5 L90 27.5 L90 72.5 L50 95 L10: 72.5 L10 27.5 Z"
              stroke={i === 1 ? "url(#grad-blue)" : "url(#grad-purple)"}
              strokeWidth="1.5"
              fill="none"
              animate={{
                strokeDasharray: ["0, 300", "300, 0"],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.svg>
        ))}

        {/* Glowing Core */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center translate-z-10"
          animate={{ scale: isHovered ? 1.2 : 1 }}
        >
          <div className="w-4 h-4 rounded-full bg-white shadow-[0_0_15px_#9b87f5,0_0_30px_#00F5FF] relative animate-pulse">
            <div className="absolute inset-0 rounded-full bg-primary blur-sm"></div>
          </div>
        </motion.div>

        {/* Orbital Particles */}
        <AnimatePresence>
          {isHovered && (
            <motion.div className="absolute inset-0">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-accent"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                    x: Math.cos(i * 60) * 30,
                    y: Math.sin(i * 60) * 30,
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* SVG Definitions */}
      <svg className="absolute w-0 h-0">
        <defs>
          <linearGradient id="grad-blue" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00F5FF" />
            <stop offset="100%" stopColor="#7B61FF" />
          </linearGradient>
          <linearGradient id="grad-purple" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7B61FF" />
            <stop offset="100%" stopColor="#FF00FF" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
};

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Scroll Spy logic
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'blog', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={cn(
          'fixed top-0 w-full z-50 transition-all duration-300',
          isScrolled
            ? 'bg-black/60 backdrop-blur-lg border-b border-white/10 py-3'
            : 'bg-transparent py-5'
        )}
      >
        <div className="container flex items-center justify-between">
          <a href="#" className="flex items-center">
            <FuturisticSymbol />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "relative text-sm font-medium transition-all duration-300",
                  activeSection === item.href.slice(1) 
                    ? "text-primary scale-110" 
                    : "text-foreground/80 hover:text-primary"
                )}
              >
                {item.name}
                {activeSection === item.href.slice(1) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary/80 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
            <Button 
              variant="outline" 
              className="neon-border"
              onClick={() => setIsResumeOpen(true)}
            >
              My Resume
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden fixed inset-0 top-16 bg-background/98 backdrop-blur-lg z-40 flex flex-col items-center pt-10 space-y-6 animate-fade-in">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-lg text-foreground/80 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <Button 
              variant="outline" 
              className="neon-border mt-4"
              onClick={() => {
                setIsMenuOpen(false);
                setIsResumeOpen(true);
              }}
            >
              Resume
            </Button>
          </nav>
        )}
      </header>

      <Resume isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </>
  );
};

export default Navbar;
