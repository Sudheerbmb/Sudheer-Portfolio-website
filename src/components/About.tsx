import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileText, ExternalLink, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const About = () => {
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const portfolioSlides = [
    {
      title: "LexEcho",
      description: "Audio Transcription & Summarization",
      image: "/echo.png",
      link: "https://github.com/Sudheerbmb/LexEcho"
    },
    {
      title: "Medical Chatbot",
      description: "AI-Powered Healthcare Assistant",
      image: "/bot.png",
      link: "https://github.com/Sudheerbmb/Medical-ChatBot"
    },
    {
      title: "Weather ETL Pipeline",
      description: "Data Engineering with Airflow",
      image: "/pipe.jpg",
      link: "https://github.com/Sudheerbmb/airflow-weather-pipeline"
    },
    {
      title: "MCQ Generator",
      description: "AI-Powered Quiz Creation",
      image: "/mcc.png",
      link: "https://github.com/Sudheerbmb/EduQuizAI"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % portfolioSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + portfolioSlides.length) % portfolioSlides.length);
  };

  return (
    <section id="about" className="section-padding bg-gradient-to-b from-background to-background/95">
      <div className="container">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="w-full md:w-5/12">
            <div className="relative">
              <div className="rounded-xl overflow-hidden neon-border bg-black/20 flex items-center justify-center aspect-[4/5] relative">
                {/* Blurred background for profile to fill container without cropping */}
                <div 
                  className="absolute inset-0 z-0 bg-cover bg-center blur-2xl opacity-50 scale-110"
                  style={{ backgroundImage: `url(/IMG_20251208_205117.jpg)` }}
                ></div>
                
                <img 
                  src="/IMG_20251208_205117.jpg"
                  alt="Sudheer Kumar Thati" 
                  className="relative z-10 max-w-full max-h-full object-contain rounded-xl transition-transform duration-700 hover:scale-105 shadow-2xl"
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-lg border border-neon-purple/30 glass-card -z-10"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full border border-neon-cyan/30 glass-card -z-10"></div>
            </div>
          </div>
          
          {/* Content */}
          <div className="w-full md:w-7/12 space-y-6">
            <div>
              <h2 className="text-sm uppercase tracking-wider text-accent mb-2">
                About Me
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="text-foreground">Passionate</span>{' '}
                <span className="text-gradient">Data Scientist & AI Enthusiast</span>{' '}
                {/* <span className="text-foreground">Based in</span>{' '}
                <span className="text-gradient">Kadapa, India</span> */}
              </h3>
            </div>
            
            <div className="space-y-4 text-foreground/80">
            <p>  
Data is more than numbers—it's a story waiting to be told. I decode patterns, harness AI and machine learning, and transform raw information into intelligence that drives innovation.  
 
From optimizing databases to streamlining data pipelines, I use Python, Java, and cloud computing to craft solutions that turn complexity into clarity and insights into action.  
</p>
              <p>
              When I'm not coding, I explore the latest tech, experimenting through trial and error, and pushing the boundaries of innovation.              </p>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="glass-card p-4 rounded-lg text-center">
                <p className="text-2xl md:text-3xl font-bold text-primary">2+</p>
                <p className="text-sm text-foreground/70">Years Hands-On Experience</p>
              </div>
              <div className="glass-card p-4 rounded-lg text-center">
                <p className="text-2xl md:text-3xl font-bold text-primary">15+</p>
                <p className="text-sm text-foreground/70">Projects Completed</p>
              </div>
              <div className="glass-card p-4 rounded-lg text-center">
                <p className="text-2xl md:text-3xl font-bold text-primary">5+</p>
                <p className="text-sm text-foreground/70">Certifications</p>
              </div>
              {/* <div className="glass-card p-4 rounded-lg text-center">
                <p className="text-2xl md:text-3xl font-bold text-primary">3+</p>
                <p className="text-sm text-foreground/70">Tech Stacks Mastered</p>
              </div> */}
            </div>
            
            {/* CTA */}
            <div className="flex flex-wrap gap-4 mt-8">
              <Button className="gap-2">
                <FileText size={18} />
                <a href="/Scv.pdf" download>Download CV</a>
              </Button>
            </div>
          </div>
        </div>

        {/* Portfolio Slideshow Modal */}
        <AnimatePresence>
          {showPortfolio && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowPortfolio(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative w-full max-w-4xl bg-background rounded-xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setShowPortfolio(false)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                >
                  <X size={20} className="text-white" />
                </button>

                {/* Slideshow Content */}
                <div className="relative h-[500px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ x: 300, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -300, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0"
                    >
                      <div className="h-full flex flex-col">
                        <div className="relative h-[300px] overflow-hidden">
                          <img
                            src={portfolioSlides[currentSlide].image}
                            alt={portfolioSlides[currentSlide].title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                        </div>
                        <div className="flex-1 p-6 flex flex-col justify-between">
                          <div>
                            <h3 className="text-2xl font-bold mb-2">{portfolioSlides[currentSlide].title}</h3>
                            <p className="text-foreground/70">{portfolioSlides[currentSlide].description}</p>
                          </div>
                          <div className="flex justify-between items-center mt-4">
                            <div className="flex gap-2">
                              <button
                                onClick={prevSlide}
                                className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                              >
                                ←
                              </button>
                              <button
                                onClick={nextSlide}
                                className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                              >
                                →
                              </button>
                            </div>
                            <a
                              href={portfolioSlides[currentSlide].link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:text-primary/80 transition-colors"
                            >
                              View on GitHub →
                            </a>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default About;
