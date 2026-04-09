import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, ArrowRight, CalendarDays } from 'lucide-react';
import { 
  FaPython, FaJava, FaAws, FaDocker, FaNodeJs, FaReact, FaFigma, FaBrain, FaDatabase, FaGitAlt, 
  FaMicrosoft, FaGoogle, FaExclamationTriangle, FaBolt, FaChartBar, FaCloud, FaStream, FaCode,
  FaMicrochip, FaRobot, FaMicrophone, FaLayerGroup, FaFilePdf, FaCalculator, FaNetworkWired,
  FaChartPie, FaChartLine, FaDraftingCompass, FaSitemap, FaPlugs, FaRunning, FaStar
} from 'react-icons/fa';
import { 
  SiPostgresql, SiApacheairflow, SiSpringboot, SiFlask,
  SiFastapi, SiPytorch, SiTensorflow, SiOpencv, SiSpacy,
  SiPandas, SiScikitlearn, SiMongodb,
  SiSnowflake, SiDbt, SiApachekafka, SiRedis, SiSupabase,
  SiTailwindcss, SiJavascript, SiTypescript, SiMeta, SiGooglegemini,
  SiOpenai, SiAnthropic, SiHuggingface, SiStreamlit, SiApachespark,
  SiMysql, SiSqlite, SiNumpy, SiScipy, SiTableau, SiHtml5, SiCss3, SiExpress,
  SiSocketdotio, SiDatabricks, SiFfmpeg, SiAmazonec2, SiPostman, SiMicrosoftpowerbi
} from 'react-icons/si';
import { VscAzure, VscTerminal, VscWindow } from 'react-icons/vsc';

const getTechIcon = (tech: string) => {
  const t = tech.toLowerCase();
  
  // AI / LLM / Data Science
  if (t.includes('gemini')) return <SiGooglegemini className="text-[#8E75FF]" />;
  if (t.includes('openai') || t.includes('gpt') || t.includes('whisper')) return <SiOpenai className="text-[#10a37f]" />;
  if (t.includes('anthropic') || t.includes('claude')) return <SiAnthropic className="text-[#D97757]" />;
  if (t.includes('llama') || t.includes('meta')) return <SiMeta className="text-[#0668E1]" />;
  if (t.includes('hugging') || t.includes('face')) return <SiHuggingface className="text-[#FFD21E]" />;
  if (t.includes('groq')) return <FaMicrochip className="text-[#F26522]" />;
  if (t.includes('langchain')) return <FaRobot className="text-[#121212] dark:text-white" />;
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
  if (t.includes('integration')) return <FaPlugs className="text-yellow-500" />;
  if (t.includes('tkinter') || t.includes('gui')) return <VscWindow className="text-blue-500" />;
  if (t.includes('surprise')) return <FaStar className="text-yellow-400" />;
  
  return <FaCode className="text-foreground/40" />;
};

const ProjectCard = ({ project }: { project: any }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasLongDescription = project.description.length > 100;

  return (
    <div className="glass-card rounded-xl overflow-hidden interactive-card flex flex-col h-full bg-white/[0.02] border-white/5 hover:bg-white/[0.04] transition-all duration-500 shadow-2xl hover:shadow-primary/10">
      <div className="relative group overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-110"
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
          {project.tags.slice(0, isExpanded ? project.tags.length : 6).map((tag: string) => (
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
          {!isExpanded && project.tags.length > 6 && (
            <button 
              onClick={() => setIsExpanded(true)}
              className="text-[11px] text-primary/60 hover:text-primary self-center font-medium transition-colors"
            >
              +{project.tags.length - 6} more
            </button>
          )}
          {isExpanded && project.tags.length > 6 && (
             <button 
                onClick={() => setIsExpanded(false)}
                className="text-[11px] text-primary/60 hover:text-primary self-center font-medium transition-colors"
              >
                show less
              </button>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const categories = ['All', 'AI/ML', 'Web', 'Data Science', 'DE'];
  const [activeCategory, setActiveCategory] = useState('All');
  const [showAll, setShowAll] = useState(false);

  const projects = [
    {
      id: 15,
      title: 'Insight — AI Interview Practice Partner',
      description:
        'Flask web app for role-based mock interviews powered by a multi-agent LLM loop (profiler + grader + interviewer + feedback) with live grading and coding round UI. practice with adaptive questions, scoring, and a final feedback report.',
      category: 'AI/ML',
      tags: ['Flask', 'Groq API', 'Multi-agent LLM', 'Python', 'Web Speech API', 'Redis', 'ChromaDB'],
      image: '/Screenshot (270).png',
      timeframe: 'Apr 2025',
      links: {
        demo: '#',
        github: 'https://github.com/Sudheerbmb/Interview_Agent',
      },
    },
    {
      id: 14,
      title: 'AdmitGuard: AI Admissions Governance',
      description:
        'A distributed framework for high-integrity admissions, leveraging edge-validation, multi-stage AI reasoning, and latent semantic search to prevent identity spoofing. incorporates Google OAuth, Redis caching, Sentry tracking, and Xenova embeddings.',
      category: 'AI/ML',
      tags: ['Node.js', 'Express', 'React Native', 'Supabase', 'PostgreSQL', 'Groq', 'Socket.io', 'Google OAuth', 'Redis', 'Sentry', 'Xenova'],
      image: '/Screenshot (269).png',
      timeframe: 'Apr 2025',
      links: {
        demo: '#',
        github: 'https://github.com/Sudheerbmb/AdmitGuard',
      },
    },
    {
      id: 13,
      title: 'Education Institution UI Design',
      description:
        'Modern and responsive user interface for an educational institution designed in Figma, focusing on intuitive navigation, accessibility, and visual consistency.',
      category: 'Web',
      tags: ['Figma', 'UI/UX Design', 'Prototyping', 'Education'],
      image: '/Screenshot (42)-Picsart-AiImageEnhancer.png',
      timeframe: 'Nov 2025',
      links: {
        demo: '#',
        github: 'https://github.com/Sudheerbmb/Educational_Website_UI',
      },
    },
    {
      id: 12,
      title: 'Azure-HospitalFlow-Automated-Pipeline',
      description:
        'End-to-end real-time data engineering pipeline for healthcare, analyzing patient flow across hospital departments using Azure Event Hub, Databricks PySpark, and Azure Synapse.',
      category: 'DE',
      tags: ['Azure', 'PySpark', 'Azure Data Factory', 'Azure Synapse', 'Python', 'Databricks', 'Git'],
      image: '/Azure.png',
      timeframe: 'Feb 2025',
      links: {
        demo: '#',
        github: 'https://github.com/Sudheerbmb/Azure-Hospital-Pipeline',
      },
    },
    {
      id: 11,
      title: 'Real-Time Stocks Market Data Pipeline',
      description:
        'End-to-end real-time pipeline: Kafka streaming → Airflow orchestration → Snowflake + DBT transforms → Power BI analytics.',
      category: 'DE',
      tags: ['Snowflake', 'DBT', 'Apache Airflow', 'Apache Kafka', 'Python', 'Docker', 'Power BI'],
      image: '/pipeline.jpeg',
      timeframe: 'Oct 2025',
      links: {
        demo: '#',
        github: 'https://github.com/Sudheerbmb/Snowflake_Stockmarket',
      },
    },
    {
      id: 6,
      title: 'LexEcho:Audio Transcription and Summarization Web App',
      description:
        'Flask web app that transcribes M4A audio files using Whisper, summarizes content with Gemini API, and extracts key topics.',
      category: 'AI/ML',
      tags: ['Flask', 'Whisper', 'Gemini API', 'FFmpeg', 'NLTK', 'Python'],
      image: '/echo.png',
      timeframe: 'Feb 2025',
      links: {
        demo: '#',
        github: 'https://github.com/Sudheerbmb/LexEcho',
      },
    },
    {
      id: 5,
      title: 'Medical Chatbot using Flask and Groq API',
      description:
        'Flask-based chatbot that responds to medical-related queries using the Groq API with medical keyword filtering.',
      category: 'AI/ML',
      tags: ['Flask', 'Groq API', 'Langchain', 'Python', 'Web Interface'],
      image: '/bot.png',
      timeframe: 'July 2024',
      links: {
        demo: '#',
        github: 'https://github.com/Sudheerbmb/Medical-ChatBot',
      },
    },
    {
      id: 4,
      title: 'Weather ETL Pipeline with Apache Airflow',
      description:
        'ETL pipeline using Apache Airflow to fetch, process, and store weather data from Open-Meteo API into PostgreSQL.',
      category: 'DE',
      tags: ['Apache Airflow', 'ETL', 'PostgreSQL', 'Python', 'API Integration'],
      image: '/pipe.jpg',
      timeframe: 'Mar 2025',
      links: {
        demo: '#',
        github: 'https://github.com/Sudheerbmb/airflow-weather-pipeline',
      },
    },
    {
      id: 1,
      title: 'MCQ Generator with Flask and AWS Bedrock',
      description:
        'Flask-based MCQ Generator supporting PDF, DOCX, and TXT formats, leveraging AWS Bedrock (Llama 3-8B LLM).',
      category: 'AI/ML',
      tags: ['Flask', 'AWS Bedrock', 'EC2', 'FPDF', 'HTML', 'CSS', 'JS'],
      image: '/mcc.png',
      timeframe: 'Feb 2025',
      links: {
        demo: '#',
        github: 'https://github.com/Sudheerbmb/EduQuizAI',
      },
    },
    {
      id: 7,
      title: 'Groq Code Forge: Python Code Optimizer',
      description:
        'Web application that optimizes Python code using Groq API, providing complexity analysis and detailed explanations.',
      category: 'AI/ML',
      tags: ['Flask', 'Groq API', 'Langchain', 'Python', 'Code Optimization'],
      image: '/codeopt1.png',
      timeframe: 'Apr 2025',
      links: {
        demo: '#',
        github: 'https://github.com/Sudheerbmb/CodeOptimizer',
      },
    },
    {
      id: 8,
      title: 'Movie Recommendation System',
      description:
        'Flask-based recommendation system using Collaborative Filtering (SVD) and Content-Based Filtering (TF-IDF with cosine similarity).',
      category: 'AI/ML',
      tags: ['Flask', 'SVD', 'TF-IDF', 'Scikit-learn', 'Surprise', 'Python'],
      image: '/mv.jpg',
      timeframe: 'Dec 2024',
      links: {
        demo: '#',
        github: 'https://github.com/Sudheerbmb/Movie-Recommendation-System',
      },
    },
    {
      id: 2,
      title: 'Breast Cancer Detection System',
      description:
        'Machine learning-based breast cancer classification system using SVM, Linear Regression, and Random Forest.',
      category: 'AI/ML',
      tags: ['SVM', 'Random Forest', 'XGBoost', 'tkinter', 'Python'],
      image: '/bcc.png',
      timeframe: 'Oct 2023',
      links: {
        demo: 'https://youtu.be/ZRLmUZ4y8EQ?feature=shared',
        github: '#',
      },
    },
    {
      id: 3,
      title: 'On Your Own Hotel Booking Analysis',
      description:
        'SQL-based project analyzing customer bookings, hotel details, and payment transactions.',
      category: 'Data Science',
      tags: ['SQL', 'ER Modeling', 'Data Analysis'],
      image: '/sqq.webp',
      timeframe: 'Dec 2023',
      links: {
        demo: 'https://www.linkedin.com/posts/sudheer-kumar-thati_oyo-activity-7058820058365501440-EjDY?utm_source=share&utm_medium=member_android&rcm=ACoAAD22K6MBpe4xT0yI0p1klFV8dXo5fzPWbg4',
        github: '#',
      },
    },
    {
      id: 10,
      title: 'Hospital Management System API',
      description:
        'A comprehensive Spring Boot API for hospital management, featuring CRUD operations for patients, doctors, appointments, departments, and staff with H2 database integration.',
      category: 'Web',
      tags: ['Java', 'Spring Boot', 'Spring Web', 'Spring Data JPA', 'H2 Database', 'RESTful API'],
      image: '/sb.png',
      timeframe: 'Nov 2024',
      links: {
        demo: '#',
        github: 'https://github.com/Sudheerbmb/Hospital_Management_System',
      },
    },
  ];

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
