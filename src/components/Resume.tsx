import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Mail, Phone, MapPin, Github, Linkedin, Calendar, Award, GraduationCap, Briefcase, Code2 } from 'lucide-react';
import { workExperience, projects, certifications, education, skillCategories, frameworks, deepLearningSkills } from '@/data/portfolio';

interface ResumeProps {
  isOpen: boolean;
  onClose: () => void;
}

const Resume = ({ isOpen, onClose }: ResumeProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-background/95 backdrop-blur-lg border border-accent/20">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-3xl font-bold text-gradient mb-2">SUDHEER KUMAR THATI</DialogTitle>
              <div className="flex items-center gap-2 text-foreground/70">
                <MapPin className="w-4 h-4" />
                <span>Kadapa, Andhra Pradesh 516001</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute right-4 top-4"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4" />
              <span>+91-7042383822</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4" />
              <span>sudheermsdvk@gmail.com</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Linkedin className="w-4 h-4" />
              <a 
                href="https://linkedin.com/in/sudheer-kumar-thati/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                linkedin.com/in/sudheer-kumar-thati/
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Github className="w-4 h-4" />
              <a 
                href="https://github.com/Sudheerbmb/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                github.com/Sudheerbmb/
              </a>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-8 py-6">
          {/* Internship */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-accent" />
              <h3 className="text-xl font-semibold text-accent">Internship</h3>
            </div>
            {workExperience.map((job) => (
              <div key={job.id} className="glass-card p-4">
                <h4 className="text-lg font-medium">{job.title}</h4>
                <div className="flex items-center gap-2 text-sm text-foreground/70 mt-1">
                  <Calendar className="w-4 h-4" />
                  <span>{job.company} | {job.period}</span>
                </div>
                <ul className="list-disc list-inside text-sm text-foreground/80 mt-3 space-y-2">
                  {job.details?.map((detail, idx) => (
                    <li key={idx}><strong>{detail.section}:</strong> {detail.content}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* Projects */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-accent" />
              <h3 className="text-xl font-semibold text-accent">Projects</h3>
            </div>
            <div className="space-y-4">
              {projects.slice(0, 5).map((project) => (
                <div key={project.id} className="glass-card p-4">
                  <h4 className="text-lg font-medium">{project.title}</h4>
                  <div className="flex items-center gap-2 text-sm text-foreground/70 mt-1">
                    <Calendar className="w-4 h-4" />
                    <span>{project.tags.join(', ')} | {project.timeframe}</span>
                  </div>
                  <p className="text-sm text-foreground/80 mt-2">{project.description}</p>
                  {project.links.github !== '#' && (
                    <div className="mt-2 text-xs">
                      <span className="text-foreground/60">Github: </span>
                      <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        {project.links.github}
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Certificates */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-accent" />
              <h3 className="text-xl font-semibold text-accent">Certificates</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {certifications.map((cert) => (
                <div key={cert.id} className="glass-card p-4">
                  <h4 className="text-lg font-medium">{cert.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-foreground/70 mt-1">
                    <Calendar className="w-4 h-4" />
                    <span>{cert.issuer} | {cert.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Technical Skills */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-accent" />
              <h3 className="text-xl font-semibold text-accent">Technical Skills</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="glass-card p-4">
                <h4 className="text-lg font-medium">Programming:</h4>
                <p className="text-sm text-foreground/70 mt-2">
                  {skillCategories.find(c => c.title === "Programming Languages")?.items.map(i => i.name).join(', ')}
                </p>
              </div>
              <div className="glass-card p-4">
                <h4 className="text-lg font-medium">Frameworks & Tools:</h4>
                <p className="text-sm text-foreground/70 mt-2">
                  {[...frameworks, ...deepLearningSkills].map(i => i.name).join(', ')}
                </p>
              </div>
              <div className="glass-card p-4">
                <h4 className="text-lg font-medium">Databases & Cloud:</h4>
                <p className="text-sm text-foreground/70 mt-2">
                  {skillCategories.find(c => c.title === "Databases & Cloud")?.items.map(i => i.name).join(', ')}
                </p>
              </div>
            </div>
          </section>

          {/* Education */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-accent" />
              <h3 className="text-xl font-semibold text-accent">Education</h3>
            </div>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="glass-card p-4">
                  <h4 className="text-lg font-medium">{edu.institution}</h4>
                  <div className="flex items-center gap-2 text-sm text-foreground/70 mt-1">
                    <Calendar className="w-4 h-4" />
                    <span>{edu.degree} | {edu.period}</span>
                  </div>
                  <p className="text-sm text-foreground/70 mt-1">{edu.location}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="flex justify-end pt-4">
          <Button 
            onClick={() => window.open('/Specialized.docx', '_blank')}
            className="bg-primary hover:bg-primary/90"
          >
            Download Resume
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Resume; 