import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="section-padding bg-gradient-to-b from-background to-background/95">
      <div className="container max-w-7xl">
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
              <h3 className="text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">Passionate</span>{' '}
                <span className="text-gradient">Data Scientist & AI Enthusiast</span>
              </h3>
            </div>
            
            <div className="space-y-4 text-foreground/70 text-sm leading-relaxed">
              <p>  
                Data is more than numbers—it's a story waiting to be told. I decode patterns, harness AI and machine learning, and transform raw information into intelligence that drives innovation.  
              </p>
              <p>
                From optimizing databases to streamlining data pipelines, I use Python, Java, and cloud computing to craft solutions that turn complexity into clarity and insights into action.  
              </p>
              <p>
                When I'm not coding, I explore the latest tech, experimenting through trial and error, and pushing the boundaries of innovation.
              </p>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
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
            </div>
            
            {/* CTA */}
            <div className="flex flex-wrap gap-4 mt-8">
              <Button className="gap-2" asChild>
                <a href="/Scv.pdf" download>
                  <FileText size={18} />
                  Download CV
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
