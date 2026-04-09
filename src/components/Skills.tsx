import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { 
  projects, skillCategories, frameworks, deepLearningSkills, softSkills 
} from '@/data/portfolio';

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const getProjectsForSkill = (skillName: string) => {
    if (skillName.toLowerCase() === 'c') {
      return [];
    }
    return projects.filter(project => 
      project.tags.some(skill => 
        skill.toLowerCase().includes(skillName.toLowerCase())
      )
    );
  };

  const SkillItem = ({ skill, icon: Icon, color }: { skill: string; icon: any; color?: string }) => {
    const relevantProjects = getProjectsForSkill(skill);
    const isHovered = hoveredSkill === skill;
    
    return (
      <div 
        className="relative flex flex-col items-center text-center transition-transform hover:scale-105"
        onMouseEnter={() => setHoveredSkill(skill)}
        onMouseLeave={() => setHoveredSkill(null)}
      >
        <div className="relative">
          <Icon 
            className={`w-12 h-12 mb-1.5 transition-all duration-300 ${!color ? 'text-accent' : ''}`}
            style={color ? { color, filter: isHovered ? `drop-shadow(0 0 8px ${color}60)` : undefined } : undefined}
          />
          {isHovered && relevantProjects.length > 0 && (
            <div className="absolute -top-1 -right-1">
              <div className="relative">
                <div className="absolute inset-0 bg-green-500/20 rounded-full blur-sm animate-pulse"></div>
                <div className="relative bg-green-500/90 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {relevantProjects.length}
                </div>
              </div>
            </div>
          )}
        </div>
        <span className="text-foreground/80 text-sm font-medium">{skill}</span>
        
        {hoveredSkill === skill && relevantProjects.length > 0 && (
          <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 z-10">
            <div className="bg-background/95 border border-accent/20 rounded-lg p-3 shadow-lg min-w-[200px] pointer-events-none">
              <h5 className="text-sm font-semibold mb-2">Used in {relevantProjects.length} project{relevantProjects.length > 1 ? 's' : ''}:</h5>
              <ul className="text-xs space-y-1">
                {relevantProjects.map(project => (
                  <li key={project.id} className="text-foreground/70">
                    {project.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="skills" className="section-padding bg-background/95">
      <div className="container max-w-6xl">
        <div className="text-center mb-10">
          <h2 className="text-sm uppercase tracking-wider text-accent mb-2">Expertise</h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold">
            <span className="text-white">My </span>
            <span className="text-accent">Skills</span>
          </h3>
          <p className="mt-3 text-foreground/70 max-w-3xl mx-auto text-sm">
            A comprehensive overview of my technical expertise and professional capabilities.
            Hover over skills to see projects where they were used.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Technical Skills Grid */}
          <div className="space-y-5">
            {skillCategories.map((category) => (
              <div key={category.title} className="glass-card rounded-xl p-5 interactive-card">
                <h4 className="text-lg font-bold mb-4">{category.title}</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {category.items.map((skill) => (
                    <SkillItem key={skill.name} skill={skill.name} icon={skill.icon} color={skill.color} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Other Skills Container */}
          <div className="space-y-5">
            {/* Frameworks */}
            <div className="glass-card rounded-xl p-5 interactive-card">
              <h4 className="text-lg font-semibold mb-4">Frameworks</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {frameworks.map((framework) => (
                  <SkillItem key={framework.name} skill={framework.name} icon={framework.icon} color={framework.color} />
                ))}
              </div>
            </div>

            {/* Deep Learning & Computer Vision */}
            <div className="glass-card rounded-xl p-5 interactive-card">
              <h4 className="text-lg font-semibold mb-4">Deep Learning & Computer Vision</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {deepLearningSkills.map((skill) => (
                  <SkillItem key={skill.name} skill={skill.name} icon={skill.icon} color={skill.color} />
                ))}
              </div>
            </div>

            {/* Soft Skills */}
            <div className="glass-card rounded-xl p-5 interactive-card">
              <h4 className="text-lg font-semibold mb-4">Soft Skills</h4>
              <div className="flex flex-wrap gap-2">
                {softSkills.map((item) => (
                  <Badge 
                    key={item} 
                    className="bg-secondary/20 hover:bg-secondary/30 text-foreground border border-secondary/30 text-sm px-2.5 py-1"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
