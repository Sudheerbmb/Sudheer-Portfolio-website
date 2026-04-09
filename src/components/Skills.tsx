import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { 
  FaPython, FaJava, FaAws, FaDocker, FaGitAlt, FaDatabase
} from 'react-icons/fa';
import { 
  SiPostgresql, SiApacheairflow, SiSpringboot, SiFlask,
  SiFastapi, SiPytorch, SiTensorflow, SiOpencv, SiSpacy,
  SiPandas, SiScikitlearn, SiApache, SiMongodb, SiCplusplus, SiC, SiRedis
} from 'react-icons/si';

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const projects = [
    {
      id: 15,
      title: 'Insight — AI Interview Practice Partner',
      skills: ['Python', 'Flask', 'Groq API', 'Redis', 'ChromaDB'],
    },
    {
      id: 14,
      title: 'AdmitGuard: AI Admissions Governance',
      skills: ['Node.js', 'Express', 'React Native', 'Supabase', 'PostgreSQL', 'Groq', 'Socket.io', 'Google OAuth', 'Redis', 'Sentry', 'Xenova'],
    },
    {
      id: 6,
      title: 'LexEcho:Audio Transcription and Summarization Web App',
      skills: ['Python', 'Flask', 'Whisper', 'Gemini API', 'FFmpeg', 'NLTK'],
    },
    {
      id: 5,
      title: 'Medical Chatbot using Flask and Groq API',
      skills: ['Python', 'Flask', 'Groq API', 'Langchain'],
    },
    {
      id: 4,
      title: 'Weather ETL Pipeline with Apache Airflow',
      skills: ['Python', 'Apache Airflow', 'PostgreSQL', 'ETL'],
    },
    {
      id: 1,
      title: 'MCQ Generator with Flask and AWS Bedrock',
      skills: ['Python', 'Flask', 'AWS', 'EC2', 'HTML', 'CSS', 'JS'],
    },
    {
      id: 7,
      title: 'Groq Code Forge: Python Code Optimizer',
      skills: ['Python', 'Flask', 'Groq API', 'Langchain'],
    },
    {
      id: 8,
      title: 'Movie Recommendation System',
      skills: ['Python', 'Flask', 'SVD', 'TF-IDF', 'Scikit-learn', 'Surprise'],
    },
    {
      id: 2,
      title: 'Breast Cancer Detection System',
      skills: ['Python', 'SVM', 'Random Forest', 'XGBoost', 'tkinter'],
    },
    {
      id: 3,
      title: 'On Your Own Hotel Booking Analysis',
      skills: ['SQL', 'ER Modeling', 'Data Analysis'],
    },
    {
      id: 10,
      title: 'Hospital Management System API',
      skills: ['Java', 'Spring Boot', 'Spring Web', 'Spring Data JPA', 'H2 Database', 'RESTful API'],
    },
  ];

  const getProjectsForSkill = (skillName: string) => {
    if (skillName.toLowerCase() === 'c') {
      return [];
    }
    return projects.filter(project => 
      project.skills.some(skill => 
        skill.toLowerCase().includes(skillName.toLowerCase())
      )
    );
  };

  const skillCategories = [
    {
      title: "Programming Languages",
      items: [
        { name: 'Python', icon: FaPython },
        { name: 'Java', icon: FaJava },
        { name: 'C', icon: SiC },
        { name: 'C++', icon: SiCplusplus },
      ]
    },
    {
      title: "Databases & Cloud",
      items: [
        { name: 'PostgreSQL', icon: SiPostgresql },
        { name: 'MongoDB', icon: SiMongodb },
        { name: 'Redis', icon: SiRedis },
        { name: 'AWS', icon: FaAws },
      ]
    },
    {
      title: "Data Engineering & ML",
      items: [
        { name: 'Hadoop', icon: SiApache },
        { name: 'Airflow', icon: SiApacheairflow },
        { name: 'Pandas', icon: SiPandas },
        { name: 'Scikit-learn', icon: SiScikitlearn },
      ]
    }
  ];

  const frameworks = [
    { name: 'Flask', icon: SiFlask },
    { name: 'FastAPI', icon: SiFastapi },
    { name: 'Spring Boot', icon: SiSpringboot },
  ];

  const deepLearningSkills = [
    { name: 'PyTorch', icon: SiPytorch },
    { name: 'TensorFlow', icon: SiTensorflow },
    { name: 'OpenCV', icon: SiOpencv },
    { name: 'SpaCy', icon: SiSpacy },
  ];

  const softSkills = [
    'Problem-Solving & Analytical Thinking',
    'Team Collaboration',
    'Creativity & Innovation',
    'Adaptability',
    'Technical Communication'
  ];

  const SkillItem = ({ skill, icon: Icon }: { skill: string; icon: any }) => {
    const relevantProjects = getProjectsForSkill(skill);
    
    return (
      <div 
        className="relative flex flex-col items-center text-center transition-transform hover:scale-105"
        onMouseEnter={() => setHoveredSkill(skill)}
        onMouseLeave={() => setHoveredSkill(null)}
      >
        <div className="relative">
          <Icon className="w-12 h-12 mb-1.5 text-accent hover:text-primary transition-colors" />
          {hoveredSkill === skill && relevantProjects.length > 0 && (
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
            <div className="bg-background/95 border border-accent/20 rounded-lg p-3 shadow-lg min-w-[200px]">
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
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-sm uppercase tracking-wider text-accent mb-2">Expertise</h2>
          <h3 className="text-2xl md:text-3xl font-bold">
            <span className="text-gradient">My Skills</span>
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
                <h4 className="text-lg font-semibold mb-4">{category.title}</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {category.items.map((skill) => (
                    <SkillItem key={skill.name} skill={skill.name} icon={skill.icon} />
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
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {frameworks.map((framework) => (
                  <SkillItem key={framework.name} skill={framework.name} icon={framework.icon} />
                ))}
              </div>
            </div>

            {/* Deep Learning & Computer Vision */}
            <div className="glass-card rounded-xl p-5 interactive-card">
              <h4 className="text-lg font-semibold mb-4">Deep Learning & Computer Vision</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {deepLearningSkills.map((skill) => (
                  <SkillItem key={skill.name} skill={skill.name} icon={skill.icon} />
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
