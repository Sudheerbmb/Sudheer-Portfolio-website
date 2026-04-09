import React, { useState, useEffect } from 'react';
import { Heart, Clock, Github, Linkedin, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const languages = [
  { text: 'సుధీర్', lang: 'Telugu' },
  { text: 'सुधीर', lang: 'Hindi' },
  { text: 'സുധീർ', lang: 'Malayalam' },
  { text: 'சுதீர்', lang: 'Tamil' },
  { text: 'ಸುಧೀರ್', lang: 'Kannada' },
  { text: 'সুধীর', lang: 'Bengali' },
  { text: 'સુધીર', lang: 'Gujarati' },
  { text: 'ਸੁਧੀਰ', lang: 'Punjabi' },
  { text: 'ସୁଧୀର', lang: 'Odia' },
  { text: 'सुधीर', lang: 'Marathi' },
  { text: 'Sudheer', lang: 'English' }
];

const AnimatedName = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % languages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center"
        >
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            {languages[currentIndex].text}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const ECGLine = () => {
  return (
    <motion.div 
      className="relative w-32 h-8 mx-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <svg
        viewBox="0 0 120 20"
        className="absolute inset-0 w-full h-full"
      >
        <motion.path
          d="M 0,10 L 10,10 L 15,10 L 20,10 L 25,10 L 30,0 L 35,20 L 40,10 L 45,10 L 50,10 L 120,10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-primary"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: 1,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </svg>
    </motion.div>
  );
};

const TimeDisplay = ({ time }: { time: string }) => {
  const digits = time.split('');
  
  return (
    <div className="flex items-center space-x-[2px] font-mono text-lg text-foreground/80 ml-2">
      {digits.map((digit, index) => (
        <motion.span
          key={`${index}-${digit}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
            delay: index * 0.05
          }}
        >
          {digit}
        </motion.span>
      ))}
    </div>
  );
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [time, setTime] = useState<string>('');
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-background border-t border-border/20 py-4">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <AnimatedName />
            <p className="text-foreground/60 mt-1 text-sm">
              Creating digital experiences that matter.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end space-y-4">
            <motion.div
              className="flex items-center justify-center bg-background/50 backdrop-blur-sm px-6 py-3 rounded-full border border-border/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Clock size={16} className="text-primary" />
              <AnimatePresence mode="wait">
                <TimeDisplay time={time} />
              </AnimatePresence>
              <ECGLine />
              <motion.div
                className="w-2 h-2 rounded-full bg-primary"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.5, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
            
            <div className="flex items-center space-x-4 mb-4">
              <a href="https://github.com/Sudheerbmb" target="_blank" rel="noopener noreferrer" className="text-foreground/40 hover:text-primary transition-colors">
                <Github size={18} />
              </a>
              <a href="https://linkedin.com/in/sudheer-kumar-thati/" target="_blank" rel="noopener noreferrer" className="text-foreground/40 hover:text-primary transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="mailto:sudheermsdvk@gmail.com" className="text-foreground/40 hover:text-primary transition-colors">
                <Mail size={18} />
              </a>
            </div>

            <p className="text-foreground/60 text-xs flex items-center">
              Made with <Heart size={14} className="mx-1 heart-icon" fill="currentColor" /> 
              &copy; {currentYear} Sudheer Kumar. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      <style>
        {`
          .heart-icon {
            animation: heartBeat 1.5s infinite;
          }

          @keyframes heartBeat {
            0% {
              color: #ef4444;
              fill: #ef4444;
            }
            50% {
              color: #ef4444;
              fill: transparent;
            }
            100% {
              color: #ef4444;
              fill: #ef4444;
            }
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
