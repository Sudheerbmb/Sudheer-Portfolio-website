import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, ArrowRight, CalendarDays } from 'lucide-react';
import { getTechIcon } from '@/lib/icons';
import { projects, Project } from '@/data/portfolio';

const ProjectCard = ({ project }: { project: Project }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasLongDescription = project.description.length > 100;

  return (
    <div className="glass-card rounded-xl overflow-hidden interactive-card flex flex-col h-full bg-white/[0.02] border-white/5 hover:bg-white/[0.04] transition-all duration-500 shadow-2xl hover:shadow-primary/10">
      <div className="relative group overflow-hidden bg-black/40 border-b border-white/5 flex items-center justify-center p-2 min-h-[220px]">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-auto max-h-64 object-contain transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px]">
          <div className="flex gap-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <a
              href={project.links.github}
              className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-primary hover:text-white transition-all duration-300 border border-white/10 shadow-xl"
              target="_blank"
              rel="noopener noreferrer"
              title="View Source"
            >
              <Github size={22} />
            </a>
            {project.links.demo !== '#' && (
              <a
                href={project.links.demo}
                className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-primary hover:text-white transition-all duration-300 border border-white/10 shadow-xl"
                target="_blank"
                rel="noopener noreferrer"
                title="Live Demo"
              >
                <ExternalLink size={22} />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <Badge className="bg-primary/10 text-primary border border-primary/20 text-[11px] px-2.5 py-1 font-extrabold uppercase tracking-wider rounded-md">
              {project.category}
            </Badge>
            <div className="flex items-center gap-1.5 text-xs text-foreground/50 font-medium">
              <CalendarDays className="w-3.5 h-3.5 text-primary/60" />
              <span>{project.timeframe}</span>
            </div>
          </div>
          <h4 className="text-xl font-bold leading-tight text-white/90 group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h4>
        </div>

        <div className="relative">
          <p className={`text-foreground/70 text-sm leading-relaxed transition-all duration-500 ${!isExpanded && hasLongDescription ? 'line-clamp-2' : ''}`}>
            {project.description}
          </p>
          {hasLongDescription && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-primary hover:text-primary/80 text-xs font-bold mt-2 flex items-center gap-1.5 transition-all duration-300 group/btn"
            >
              <span className="border-b border-transparent group-hover/btn:border-primary">{isExpanded ? 'Show Less' : 'Read More'}</span>
              <ArrowRight size={14} className={`transition-transform duration-300 ${isExpanded ? '-rotate-90' : 'group-hover/btn:translate-x-1'}`} />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2.5 mt-auto pt-2">
          {project.tags.map((tag: string) => (
            <Badge
              key={tag}
              variant="outline"
              className="bg-white/[0.03] border-white/10 text-foreground/90 text-xs px-3 py-1.5 flex items-center gap-2 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 rounded-lg group/tag"
            >
              <span className="group-hover/tag:scale-125 transition-transform duration-300 text-base">
                {getTechIcon(tag)}
              </span>
              <span className="font-semibold">{tag}</span>
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const categories = ['All', 'AI/ML', 'Web', 'Data Science', 'DE'];
  const [searchParams, setSearchParams] = useSearchParams();
  
  const urlCategory = searchParams.get('category');
  const initialCategory = categories.includes(urlCategory || '') ? urlCategory as string : 'All';
  
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (urlCategory && categories.includes(urlCategory) && urlCategory !== activeCategory) {
      setActiveCategory(urlCategory);
    }
  }, [urlCategory]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    const params = new URLSearchParams(searchParams);
    if (category === 'All') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    setSearchParams(params, { replace: true });
  };

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6);

  return (
    <section id="projects" className="section-padding bg-gradient-to-b from-background/95 to-background">
      <div className="container max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm uppercase tracking-wider text-accent mb-2">Showcase</h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white">
            <span className="">My Project</span><span className="text-accent">s</span>
          </h3>
          <p className="mt-4 text-foreground/70 max-w-3xl mx-auto">
            Here are some of my recent projects showcasing my skills and expertise
            in different areas of development.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? 'default' : 'outline'}
              className={
                activeCategory === category
                  ? 'bg-primary hover:bg-primary/90'
                  : 'neon-border'
              }
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {filteredProjects.length > 6 && !showAll && (
          <div className="text-center mt-12">
            <Button
              onClick={() => setShowAll(true)}
              className="bg-primary hover:bg-primary/90"
            >
              See More Projects
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
