import React from 'react';
import { CalendarDays, Briefcase, GraduationCap, MapPin } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { workExperience, education, certifications } from '@/data/portfolio';

const Experience = () => {
  return (
    <section id="experience" className="section-padding bg-background">
      <div className="container max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-sm uppercase tracking-wider text-accent mb-2">Journey</h2>
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold">
            <span className="text-gradient">Experience & Education</span>
          </h3>
          <p className="mt-4 text-foreground/70 max-w-3xl mx-auto">
            My professional experience, educational background, and certifications
            that have shaped my career in technology.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Work Experience */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="text-primary" size={24} />
              <h4 className="text-2xl font-semibold">Work Experience</h4>
            </div>

            <div className="relative">
              {/* Enhanced Timeline line with gradient and glow - Mirrored from Education */}
              <div className="absolute left-6 top-0 bottom-0 w-[3px]">
                <div className="absolute inset-0 bg-gradient-to-b from-primary via-secondary to-primary opacity-50"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-primary via-secondary to-primary blur-[2px] opacity-100"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-secondary/20 to-primary/20 blur-[6px]"></div>
                
                {/* Traveling Light Pulse */}
                <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-transparent via-white to-transparent animate-timeline-pulse"></div>
              </div>

              <div className="space-y-6">
                {workExperience.map((job) => (
                  <div key={job.id} className="relative pl-10 md:pl-12 group/item">
                    {/* Enhanced Timeline dot with futuristic design - Consistent with Education */}
                    <div className="absolute left-[16.5px] top-1/2 -translate-y-1/2 w-5 h-5 z-10 transition-transform duration-500 group-hover/item:scale-125">
                      <div className="absolute inset-0 rounded-full bg-background border-[3px] border-primary group-hover/item:border-secondary transition-colors duration-300"></div>
                      <div className="absolute inset-1.5 rounded-full bg-primary group-hover/item:bg-secondary transition-colors duration-300"></div>
                      <div className="absolute inset-0 rounded-full bg-primary/40 blur-md animate-pulse"></div>
                      
                      {/* Interactive ping effect on hover */}
                      <div className="absolute inset-[-4px] rounded-full border border-primary/20 opacity-0 group-hover/item:opacity-100 group-hover/item:animate-ping transition-opacity"></div>
                    </div>

                    <div className="glass-card rounded-xl p-6 interactive-card group hover:border-primary/30 transition-all duration-300">
                      <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-start">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-lg bg-white/5 border border-accent/20 overflow-hidden flex-shrink-0">
                              <img
                                src={job.logo}
                                alt={job.company}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <div>
                              <h5 className="text-xl font-bold group-hover:text-primary transition-colors">{job.title}</h5>
                              <p className="text-accent font-semibold">{job.company}</p>
                            </div>
                          </div>
                          <Badge className="bg-accent/20 text-foreground/90 border border-accent/30 whitespace-nowrap">
                            {job.period}
                          </Badge>
                        </div>

                        <p className="text-foreground/70 text-sm">{job.description}</p>

                        {job.details && (
                          <div className="space-y-3">
                            {job.details.map((detail, idx) => (
                              <div key={idx} className="border-l-2 border-primary/30 pl-3">
                                <h6 className="font-bold text-primary text-[13px] uppercase tracking-tight">{detail.section}</h6>
                                <p className="text-foreground/70 text-sm leading-relaxed">{detail.content}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="flex flex-wrap gap-2">
                          {job.skills.map((skill) => (
                            <Badge
                              key={skill}
                              className="bg-primary/20 hover:bg-primary/30 text-foreground/90 border border-primary/30 text-xs"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="text-secondary" size={24} />
              <h4 className="text-2xl font-semibold">Education</h4>
            </div>

            <div className="relative">
              {/* Enhanced Timeline line with gradient and glow */}
              <div className="absolute left-6 top-0 bottom-0 w-[3px]">
                <div className="absolute inset-0 bg-gradient-to-b from-primary via-secondary to-primary opacity-50"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-primary via-secondary to-primary blur-[2px] opacity-100"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-secondary/20 to-primary/20 blur-[6px]"></div>
                
                {/* Traveling Light Pulse */}
                <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-transparent via-white to-transparent animate-timeline-pulse"></div>
              </div>

              <div className="space-y-8">
                {education.map((edu) => (
                  <div key={edu.id} className="relative pl-10 md:pl-12 group/item">
                    {/* Enhanced Timeline dot with futuristic design */}
                    <div className="absolute left-[16.5px] top-1/2 -translate-y-1/2 w-5 h-5 z-10 transition-transform duration-500 group-hover/item:scale-125">
                      <div className="absolute inset-0 rounded-full bg-background border-[3px] border-primary group-hover/item:border-secondary transition-colors duration-300"></div>
                      <div className="absolute inset-1.5 rounded-full bg-primary group-hover/item:bg-secondary transition-colors duration-300"></div>
                      <div className="absolute inset-0 rounded-full bg-primary/40 blur-md animate-pulse"></div>
                      
                      {/* Interactive ping effect on hover */}
                      <div className="absolute inset-[-4px] rounded-full border border-primary/20 opacity-0 group-hover/item:opacity-100 group-hover/item:animate-ping transition-opacity"></div>
                    </div>

                    <div className="glass-card rounded-xl p-6 interactive-card group hover:border-primary/30 transition-all duration-300">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-lg bg-white/5 border border-accent/20 overflow-hidden flex-shrink-0 group-hover:border-primary/30 transition-colors">
                            <img
                              src={edu.logo}
                              alt={edu.institution}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h5 className="text-lg font-bold group-hover:text-primary transition-colors">{edu.degree}</h5>
                            <p className="text-accent font-semibold">{edu.institution}</p>
                            <p className="text-foreground/70 text-sm mt-1">{edu.description}</p>
                            <div className="flex items-center gap-1 text-foreground/60 text-xs mt-1">
                              <MapPin size={12} />
                              <span>{edu.location}</span>
                            </div>
                          </div>
                        </div>
                        <Badge className="bg-accent/20 text-foreground/90 border border-accent/30 whitespace-nowrap group-hover:bg-primary/20 group-hover:border-primary/30 transition-colors">
                          {edu.period}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-12">
          <div className="flex items-center gap-3 mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-accent"
            >
              <rect x="4" y="5" width="16" height="16" rx="2" />
              <path d="m8 3v4" />
              <path d="m16 3v4" />
              <path d="m8 11h8" />
              <path d="m8 15h5" />
            </svg>
            <h4 className="text-2xl font-semibold">Certifications</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certifications.map((cert) => (
              <a
                key={cert.id}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card rounded-xl p-6 interactive-card hover:border-accent/30 transition-all duration-300 hover:scale-[1.02] group"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-lg bg-white/5 border border-accent/20 overflow-hidden flex-shrink-0 group-hover:border-accent/40 transition-colors">
                        <img
                          src={cert.logo}
                          alt={cert.issuer}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h5 className="text-lg font-bold group-hover:text-primary transition-colors">{cert.name}</h5>
                        <p className="text-accent font-bold">{cert.issuer}</p>
                      </div>
                    </div>
                    <Badge className="bg-accent/20 text-foreground/90 border border-accent/30 whitespace-nowrap group-hover:bg-accent/30 transition-colors">
                      {cert.date}
                    </Badge>
                  </div>

                  {/* Certificate Image */}
                  <div className="relative aspect-[1.4/1] rounded-lg overflow-hidden border border-accent/20 group-hover:border-accent/30 transition-colors bg-white/5">
                    <img
                      src={cert.certificateImage}
                      alt={`${cert.name} Certificate`}
                      className="absolute inset-0 w-full h-full object-contain p-2"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;