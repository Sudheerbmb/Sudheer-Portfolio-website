import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Twitter, Mail, ChevronDown, Heart } from 'lucide-react';
import { motion } from "framer-motion";

const Hero = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    // Create animated background grid
    const createGrid = () => {
      grid.innerHTML = '';
      const cellSize = 50;
      const columns = Math.ceil(grid.offsetWidth / cellSize);
      const rows = Math.ceil((grid.offsetHeight * 3) / cellSize);
      
      for (let i = 0; i < rows * columns; i++) {
        const cell = document.createElement('div');
        const random = Math.random();
        
        if (random < 0.1) {
          cell.className = 'bg-neon-purple/15 border border-neon-purple/40 rounded-md shadow-lg shadow-neon-purple/15';
        } else if (random < 0.2) {
          cell.className = 'bg-neon-blue/15 border border-neon-blue/40 rounded-md shadow-md shadow-neon-blue/15';
        } else if (random < 0.25) {
          cell.className = 'bg-neon-cyan/15 border border-neon-cyan/40 rounded-full shadow-md shadow-neon-cyan/15';
        } else {
          cell.className = random < 0.4 ? 'border border-white/15 rounded-md' : '';
        }
        
        grid.appendChild(cell);
      }

      grid.style.gridTemplateColumns = `repeat(${columns}, ${cellSize}px)`;
      grid.style.gridTemplateRows = `repeat(${rows}, ${cellSize}px)`;
    };

    createGrid();
    window.addEventListener('resize', createGrid);

    return () => {
      window.removeEventListener('resize', createGrid);
    };
  }, []);

  // Split the name into individual letters for animation
  const name = "SUDHEER\u00A0KUMAR";
  const letters = name.split("");

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* Animated grid background */}
      <div 
        ref={gridRef}
        className="absolute inset-0 grid animate-grid-flow opacity-50"
        style={{ willChange: 'transform' }}
      ></div>
      
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
                  delay: i * 0.1,
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
            <a 
              href="https://github.com/Sudheerbmb" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-foreground/80 hover:text-neon-purple transition-colors"
            >
              <Github size={24} />
            </a>
            <a 
              href="https://linkedin.com/in/sudheer-kumar-thati/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-foreground/80 hover:text-neon-blue transition-colors"
            >
              <Linkedin size={24} />
            </a>
            <a 
              href="https://x.com/SudheerTruly/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-foreground/80 hover:text-neon-cyan transition-colors"
            >
              <Twitter size={24} />
            </a>
            <a 
              href="mailto:sudheermsdvk@gmail.com" 
              className="text-foreground/80 hover:text-neon-orange transition-colors"
            >
              <Mail size={24} />
            </a>
            {/* <div className="heart-container">
              <Heart className="heart-icon" size={24} />
            </div> */}
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

          .heart-container {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .heart-icon {
            color: #ef4444;
            animation: heartBeat 1.5s infinite;
          }

          @keyframes heartBeat {
            0% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.2);
              opacity: 0.8;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}
      </style>
    </section>
  );
};

export default Hero;