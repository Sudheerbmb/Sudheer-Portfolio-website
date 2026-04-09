import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, ArrowRight, CalendarDays } from 'lucide-react';
import {
  FaPython, FaJava, FaAws, FaDocker, FaNodeJs, FaReact, FaFigma, FaBrain, FaDatabase, FaGitAlt,
  FaCode, FaMicrochip, FaFilePdf, FaCalculator, FaChartLine, FaDraftingCompass, FaSitemap, FaRunning,
  FaStar, FaPlug, FaNetworkWired, FaChartPie, FaChartBar
} from 'react-icons/fa';
import {
  SiPostgresql, SiApacheairflow, SiSpringboot, SiFlask,
  SiFastapi, SiPytorch, SiTensorflow, SiOpencv, SiSpacy,
  SiPandas, SiScikitlearn, SiMongodb,
  SiSnowflake, SiDbt, SiApachekafka, SiRedis, SiSupabase,
  SiTailwindcss, SiJavascript, SiTypescript, SiMeta, SiGooglegemini,
  SiOpenai, SiAnthropic, SiHuggingface, SiApachespark,
  SiMysql, SiSqlite, SiNumpy, SiScipy, SiTableau, SiHtml5, SiCss3, SiExpress,
  SiSocketdotio, SiDatabricks, SiFfmpeg, SiAmazonec2, SiLangchain
} from 'react-icons/si';
import { VscAzure, VscWindow } from 'react-icons/vsc';
import { projects, Project } from '@/data/portfolio';

const getTechIcon = (tech: string) => {
  const t = tech.toLowerCase();

  // AI / LLM / Data Science
  if (t.includes('gemini')) return <SiGooglegemini className="text-[#8E75FF]" />;
  if (t.includes('openai') || t.includes('gpt') || t.includes('whisper')) return <SiOpenai className="text-[#10a37f]" />;
  if (t.includes('anthropic') || t.includes('claude')) return <SiAnthropic className="text-[#D97757]" />;
  if (t.includes('llama') || t.includes('meta')) return <SiMeta className="text-[#0668E1]" />;
  if (t.includes('hugging') || t.includes('face')) return <SiHuggingface className="text-[#FFD21E]" />;
  if (t.includes('groq')) return <FaMicrochip className="text-[#F26522]" />;
  if (t.includes('langchain')) return <SiLangchain className="text-[#121212] dark:text-white" />;
  if (t.includes('tensorflow')) return <SiTensorflow className="text-[#FF6F00]" />;
  if (t.includes('pytorch')) return <SiPytorch className="text-[#EE4C2C]" />;
  if (t.includes('opencv')) return <SiOpencv className="text-[#5C3EE8]" />;
  if (t.includes('pandas')) return <SiPandas className="text-[#150458]" />;
  if (t.includes('scikit')) return <SiScikitlearn className="text-[#F7931E]" />;
  if (t.includes('numpy')) return <SiNumpy className="text-[#013243]" />;
  if (t.includes('scipy')) return <SiScipy className="text-[#8CAAE6]" />;
  if (t.includes('spacy')) return <SiSpacy className="text-[#09A3D5]" />;
  if (t.includes('nlp') || t.includes('nltk') || t.includes('llm') || t.includes('reasoning')) return <FaBrain className="text-[#FF6B6B]" />;
  if (t.includes('xgboost') || t.includes('random forest') || t.includes('svm') || t.includes('regression')) return <FaChartLine className="text-[#FFD700]" />;
  if (t.includes('svd') || t.includes('tfidf') || t.includes('tf-idf') || t.includes('cosine')) return <FaCalculator className="text-gray-400" />;

  // Frameworks & Languages
  if (t.includes('python')) return <FaPython className="text-[#3776AB]" />;
  if (t.includes('flask')) return <SiFlask className="text-white opacity-80" />;
  if (t.includes('fastapi')) return <SiFastapi className="text-[#05998b]" />;
  if (t.includes('spring') || t.includes('boot') || t.includes('spring web') || t.includes('spring data')) return <SiSpringboot className="text-[#6DB33F]" />;
  if (t.includes('java')) return <FaJava className="text-[#007396]" />;
  if (t.includes('node')) return <FaNodeJs className="text-[#339933]" />;
  if (t.includes('express')) return <SiExpress className="text-white opacity-80" />;
  if (t.includes('react')) return <FaReact className="text-[#61DAFB]" />;
  if (t.includes('html')) return <SiHtml5 className="text-[#E34F26]" />;
  if (t.includes('css')) return <SiCss3 className="text-[#1572B6]" />;
  if (t.includes('js') || t.includes('javascript')) return <SiJavascript className="text-[#F7DF1E]" />;
  if (t.includes('ts') || t.includes('typescript')) return <SiTypescript className="text-[#3178C6]" />;
  if (t.includes('tailwind')) return <SiTailwindcss className="text-[#06B6D4]" />;

  // Cloud & DE
  if (t.includes('azure')) return <VscAzure className="text-[#0089D6]" />;
  if (t.includes('aws') || t.includes('bedrock')) return <FaAws className="text-[#FF9900]" />;
  if (t.includes('ec2')) return <SiAmazonec2 className="text-[#FF9900]" />;
  if (t.includes('google') || t.includes('cloud') || t.includes('oauth')) return <FaGoogle className="text-[#4285F4]" />;
  if (t.includes('snowflake')) return <SiSnowflake className="text-[#29B5E8]" />;
  if (t.includes('databricks')) return <SiDatabricks className="text-[#FF3621]" />;
  if (t.includes('dbt')) return <SiDbt className="text-[#FF694B]" />;
  if (t.includes('kafka')) return <SiApachekafka className="text-white opacity-80" />;
  if (t.includes('airflow')) return <SiApacheairflow className="text-[#017CEE]" />;
  if (t.includes('spark') || t.includes('pyspark')) return <SiApachespark className="text-[#E25A1C]" />;
  if (t.includes('docker')) return <FaDocker className="text-[#2496ED]" />;
  if (t.includes('github') || t.includes('git')) return <FaGitAlt className="text-[#F05032]" />;

  // Databases & Backend
  if (t.includes('postgres')) return <SiPostgresql className="text-[#336791]" />;
  if (t.includes('mongodb')) return <SiMongodb className="text-[#47A248]" />;
  if (t.includes('redis')) return <SiRedis className="text-[#DC382D]" />;
  if (t.includes('supabase')) return <SiSupabase className="text-[#3ECF8E]" />;
  if (t.includes('mysql')) return <SiMysql className="text-[#4479A1]" />;
  if (t.includes('sqlite')) return <SiSqlite className="text-[#003B57]" />;
  if (t.includes('socket')) return <SiSocketdotio className="text-white opacity-80" />;
  if (t.includes('rest') || t.includes('api')) return <FaNetworkWired className="text-emerald-500" />;
  if (t.includes('sql') || t.includes('db')) return <FaDatabase className="text-[#336791]" />;

  // Analytics & Tools
  if (t.includes('power bi')) return <FaChartBar className="text-[#F2C811]" />;
  if (t.includes('tableau')) return <SiTableau className="text-[#E97627]" />;
  if (t.includes('figma')) return <FaFigma className="text-[#F24E1E]" />;
  if (t.includes('sentry')) return <FaExclamationTriangle className="text-[#362D59]" />;
  if (t.includes('ffmpeg')) return <SiFfmpeg className="text-[#007800]" />;
  if (t.includes('pdf') || t.includes('fpdf')) return <FaFilePdf className="text-red-500" />;
  if (t.includes('ui/ux') || t.includes('design')) return <FaDraftingCompass className="text-purple-400" />;
  if (t.includes('prototyping') || t.includes('education')) return <FaLayerGroup className="text-blue-400" />;
  if (t.includes('data analysis')) return <FaChartPie className="text-orange-400" />;
  if (t.includes('er model')) return <FaSitemap className="text-indigo-400" />;
  if (t.includes('optimization')) return <FaRunning className="text-green-400" />;
  if (t.includes('integration')) return <FaPlug className="text-yellow-500" />;
  if (t.includes('tkinter') || t.includes('gui')) return <VscWindow className="text-blue-500" />;
  if (t.includes('surprise')) return <FaStar className="text-yellow-400" />;

  return <FaCode className="text-foreground/40" />;
};

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
            <Badge className="bg-primary/10 text-primary border border-primary/20 text-[10px] px-2 py-0.5 font-bold uppercase tracking-wider rounded-md">
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
              className="bg-white/[0.03] border-white/10 text-foreground/80 text-[11px] px-2.5 py-1 flex items-center gap-1.5 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 rounded-lg group/tag"
            >
              <span className="group-hover/tag:scale-125 transition-transform duration-300">
                {getTechIcon(tag)}
              </span>
              <span>{tag}</span>
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const categories = ['All', 'AI/ML', 'Web', 'Data Science', 'DE'];
  const [activeCategory, setActiveCategory] = useState('All');
  const [showAll, setShowAll] = useState(false);

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6);

  return (
    <section id="projects" className="section-padding bg-gradient-to-b from-background/95 to-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-sm uppercase tracking-wider text-accent mb-2">Showcase</h2>
          <h3 className="text-3xl md:text-4xl font-bold">
            <span className="text-gradient">My Projects</span>
          </h3>
          <p className="mt-4 text-foreground/70 max-w-3xl mx-auto">
            Here are some of my recent projects showcasing my skills and expertise
            in different areas of development.
          </p>
        </div>

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
              onClick={() => setActiveCategory(category)}
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
