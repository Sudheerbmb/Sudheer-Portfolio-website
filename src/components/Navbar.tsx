import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence, useScroll } from 'framer-motion';
import Resume from './Resume';

const FuturisticSymbol = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const { scrollYProgress } = useScroll();

  const springConfig = { damping: 40, stiffness: 500 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(springY, [-50, 50], [35, -35]);
  const rotateY = useTransform(springX, [-50, 50], [-35, 35]);
  const scrollRotation = useTransform(scrollYProgress, [0, 1], [0, 1080]);
  const corePulse = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.4, 1]);

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
    className="relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center cursor-pointer overflow-visible"
    style={{ perspective: "1200px" }}
    onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
        setIsHovered(false);
      }}
    >
      <motion.div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          rotateX,
          rotateY,
          rotateZ: scrollRotation,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Layer 1: Glassmorphic Hexagon Shell */}
        <motion.div 
          className="absolute inset-0 bg-white/[0.03] backdrop-blur-[2px] border border-white/10 rounded-2xl shadow-2xl"
          animate={{
            rotateY: [0, 360],
            scale: isHovered ? 1.05 : 1
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />

        {/* Layer 2: Counter-Rotating Neon Shell */}
        <motion.div
          className="absolute inset-2 border-2 border-accent/20 rounded-full"
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />

        {/* Layer 3: Interactive Geometric Core */}
        {[0, 1, 2].map((i) => (
          <motion.svg
            key={i}
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            style={{ 
              translateZ: (i + 1) * 20,
              filter: `drop-shadow(0 0 8px ${i % 2 === 0 ? '#00F5FF' : '#9b87f5'})`
            }}
          >
            <motion.path
              d="M50 8 L90 30 L90 70 L50 92 L10 70 L10 30 Z"
              stroke={i % 2 === 0 ? "url(#neon-grad-1)" : "url(#neon-grad-2)"}
              strokeWidth={i === 1 ? "2.5" : "1"}
              fill="none"
              animate={{
                strokeDasharray: ["0, 300", "300, 0"],
                scale: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 5 - i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.svg>
        ))}

        {/* Layer 4: Floating "S" Glyph Central Identity */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ translateZ: "60px" }}
        >
          <motion.div
            className="relative w-8 h-8 flex items-center justify-center font-black text-xl text-white drop-shadow-[0_0_15px_rgba(155,135,245,0.8)]"
            animate={{ scale: isHovered ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            S
            <div className="absolute -inset-2 bg-primary/20 rounded-full blur-md animate-pulse" />
          </motion.div>
        </motion.div>

        {/* Layer 5: Dynamic Light Trail Particles */}
        <AnimatePresence>
          {isHovered && (
            <motion.div className="absolute inset-0" style={{ translateZ: "80px" }}>
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-cyan-400 blur-[1px]"
                  initial={{ opacity: 0, x: 0, y: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    x: Math.cos(i * 45 * (Math.PI / 180)) * 40,
                    y: Math.sin(i * 45 * (Math.PI / 180)) * 40,
                    scale: [0, 2, 0]
                  }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* High-Fidelity Definitions */}
      <svg className="absolute w-0 h-0">
        <defs>
          <linearGradient id="neon-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F5FF" />
            <stop offset="100%" stopColor="#9b87f5" />
          </linearGradient>
          <linearGradient id="neon-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9b87f5" />
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
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
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
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
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
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-full"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-full"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
            <button
              className="text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
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
