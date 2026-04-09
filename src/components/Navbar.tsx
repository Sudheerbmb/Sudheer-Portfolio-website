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

  const springConfig = { damping: 20, stiffness: 300 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(springY, [-100, 100], [45, -45]);
  const rotateY = useTransform(springX, [-100, 100], [-45, 45]);

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
      className="relative w-14 h-14 cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
        setIsHovered(false);
      }}
    >
      {/* Main 3D Container */}
      <motion.div
        className="absolute inset-0"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          transformPerspective: 1000,
        }}
      >
        {/* Outer Hexagon */}
        <motion.svg
          className="absolute inset-0"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M50 0 L100 25 L100 75 L50 100 L0 75 L0 25 Z"
            stroke="url(#gradient1)"
            strokeWidth="2"
            animate={{
              strokeDasharray: ["0, 300", "300, 0"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00F5FF" />
              <stop offset="50%" stopColor="#FF00FF" />
              <stop offset="100%" stopColor="#00F5FF" />
            </linearGradient>
          </defs>
        </motion.svg>

        {/* Inner Hexagon */}
        <motion.svg
          className="absolute inset-4"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M50 0 L100 25 L100 75 L50 100 L0 75 L0 25 Z"
            stroke="url(#gradient2)"
            strokeWidth="2"
            animate={{
              strokeDasharray: ["300, 0", "0, 300"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <defs>
            <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FF00FF" />
              <stop offset="50%" stopColor="#00F5FF" />
              <stop offset="100%" stopColor="#FF00FF" />
            </linearGradient>
          </defs>
        </motion.svg>

        {/* Center Symbol */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              fill="url(#gradient3)"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <defs>
              <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00F5FF" />
                <stop offset="100%" stopColor="#FF00FF" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Glowing Particles */}
        <AnimatePresence>
          {isHovered && (
            <>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    left: `${Math.cos(i * Math.PI / 3) * 20 + 25}px`,
                    top: `${Math.sin(i * Math.PI / 3) * 20 + 25}px`,
                    background: `hsl(${i * 60}, 100%, 50%)`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Ambient Glow */}
      <motion.div
        className="absolute inset-0 rounded-full blur-xl"
        style={{
          background: 'radial-gradient(circle at center, rgba(0,245,255,0.2), transparent 70%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Hover Effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle at center, rgba(255,0,255,0.1), transparent 70%)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
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

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

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
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-accent to-secondary origin-left z-50"
          style={{ scaleX }}
        />
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
