import React, { useMemo } from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { motion } from "framer-motion";

const Hero = () => {
  // Use useMemo to generate grid cells only once or when needed
  // This is much cleaner than direct DOM manipulation
  const gridCells = useMemo(() => {
    // Generate a fixed number of cells that will be responsive via CSS grid
    // 400 cells is usually enough for a dense grid on most screens
    return Array.from({ length: 400 }).map((_, i) => {
      const random = Math.random();
      let className = "";
      
      if (random < 0.1) {
        className = 'bg-neon-purple/15 border border-neon-purple/40 rounded-md shadow-lg shadow-neon-purple/15';
      } else if (random < 0.2) {
        className = 'bg-neon-blue/15 border border-neon-blue/40 rounded-md shadow-md shadow-neon-blue/15';
      } else if (random < 0.25) {
        className = 'bg-neon-cyan/15 border border-neon-cyan/40 rounded-full shadow-md shadow-neon-cyan/15';
      } else {
        className = random < 0.4 ? 'border border-white/15 rounded-md' : '';
      }
      
      return { id: i, className };
    });
  }, []);

  const name = "SUDHEER\u00A0KUMAR";
  const letters = name.split("");

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* Animated grid background */}
      <div 
        className="absolute inset-0 grid grid-cols-[repeat(auto-fill,minmax(50px,1fr))] animate-grid-flow opacity-50"
        style={{ willChange: 'transform' }}
      >
        {gridCells.map((cell) => (
          <div key={cell.id} className={`${cell.className} h-[50px]`} />
        ))}
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-background opacity-85"></div>
      
      {/* Content */}
      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center space-y-8 animate-fade-in">
          <p className="text-accent font-medium text-xl md:text-2xl">Hello, I'm</p>
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold flex flex-wrap justify-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                className="name-letter"
                initial={{ 
                  opacity: 0,
                  y: 20,
                  scale: 0.8
                }}
                animate={{ 
                  opacity: 1,
                  y: 0,
                  scale: 1
                }}
                transition={{
                  delay: i * 0.05,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 100,
                  damping: 10
                }}
                style={{
                  '--index': i,
                } as React.CSSProperties}
              >
                {letter}
              </motion.span>
            ))}
          </motion.h1>
          <h2 className="text-2xl md:text-3xl text-foreground/90 max-w-2xl">
            I create <span className="text-neon-cyan">innovative</span> and <span className="text-neon-purple">impactful</span> digital experiences
          </h2>
          <p className="text-foreground/70 max-w-2xl">
            Data scientist specializing in deriving actionable insights from complex data. Currently, I'm focused on building AI-driven solutions for real-world challenges.
          </p>
          
          {/* Social links */}
          <div className="flex items-center space-x-6 mt-12">
            {[
              { icon: Github, href: "https://github.com/Sudheerbmb", color: "hover:text-neon-purple", label: "GitHub Profile" },
              { icon: Linkedin, href: "https://linkedin.com/in/sudheer-kumar-thati/", color: "hover:text-neon-blue", label: "LinkedIn Profile" },
              { icon: Twitter, href: "https://x.com/SudheerTruly/", color: "hover:text-neon-cyan", label: "Twitter Profile" },
              { icon: Mail, href: "mailto:sudheermsdvk@gmail.com", color: "hover:text-neon-orange", label: "Send Email" },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                title={social.label}
                className={`text-foreground/80 ${social.color} transition-colors p-2`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <social.icon size={26} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      <style>
        {`
          .name-letter {
            position: relative;
            display: inline-block;
            color: #3b82f6;
            font-family: 'Poppins', sans-serif;
            animation: colorChange 12s infinite;
            animation-delay: calc(var(--index) * 0.4s);
          }

          @keyframes colorChange {
            0% {
              color: #3b82f6;
              text-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
            }
            50% {
              color: #8b5cf6;
              text-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
            }
            100% {
              color: #3b82f6;
              text-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
            }
          }
        `}
      </style>
    </section>
  );
};

export default Hero;